/**
 * @file tokenService.ts
 * @description Service for issuing, rotating, and revoking JWT token pairs.
 *              Implements:
 *              - Short-lived access tokens (15 min)
 *              - Long-lived refresh tokens (7d), stored as SHA-256 hash in DB
 *              - Refresh token rotation with family-based reuse attack detection
 *              - Phantom token introspection endpoint support
 * @module backend/services
 */

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from '../models/RefreshToken.js';
import { User } from '../models/User.js';
import {
  AuthAppError,
  NotFoundAppError,
  TokenExpiredAppError,
  TokenInvalidAppError,
} from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

// ──────────────────────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────────────────────

const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN ?? '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 7;
const REFRESH_TOKEN_EXPIRY_MS = REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Hash a raw token to the value stored in DB.
 */
const hashToken = (raw: string): string => crypto.createHash('sha256').update(raw).digest('hex');

/**
 * Generate a cryptographically secure opaque refresh token (48 bytes → 96 hex chars).
 */
const generateRawRefreshToken = (): string => crypto.randomBytes(48).toString('hex');

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds until access token expires
}

// ──────────────────────────────────────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Issue a fresh access + refresh token pair for the given user.
 * Creates a new refresh token family.
 *
 * @param userId - MongoDB ObjectId string of the authenticated user
 * @param role - User role embedded in JWT payload
 * @param email - User email embedded in JWT payload
 * @param ip - Client IP address for audit trail
 */
export const issueTokenPair = async (
  userId: string,
  role: string,
  email: string,
  ip?: string
): Promise<TokenPair> => {
  const accessToken = jwt.sign({ id: userId, role, email }, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  } as jwt.SignOptions);

  const rawRefresh = generateRawRefreshToken();
  const family = uuidv4();

  await RefreshToken.create({
    userId,
    tokenHash: hashToken(rawRefresh),
    family,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
    createdFromIp: ip,
  });

  logger.info(`[TokenService] Issued token pair for user ${userId}`, { family });

  // Parse expiry from access token string to get exact seconds
  const decoded = jwt.decode(accessToken) as { exp: number };
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  return { accessToken, refreshToken: rawRefresh, expiresIn };
};

/**
 * Rotate a refresh token: validates the current one, revokes it,
 * issues a new pair in the same family.
 *
 * 🔒 If the presented token is already revoked, the ENTIRE family is revoked
 * (reuse attack detection — "refresh token theft" mitigation).
 *
 * @param rawRefreshToken - Raw refresh token string from the client
 * @param ip - Client IP address
 * @throws TokenExpiredAppError | TokenInvalidAppError | AuthAppError
 */
export const rotateRefreshToken = async (
  rawRefreshToken: string,
  ip?: string
): Promise<TokenPair> => {
  const tokenHash = hashToken(rawRefreshToken);
  const record = await RefreshToken.findOne({ tokenHash });

  if (!record) {
    throw new TokenInvalidAppError();
  }

  // Reuse attack: token already revoked → revoke entire family
  if (record.revokedAt) {
    logger.warn(
      `[TokenService] 🚨 Refresh token REUSE detected — revoking family ${record.family}`
    );
    await RefreshToken.updateMany(
      { family: record.family, revokedAt: null },
      { revokedAt: new Date() }
    );
    throw new AuthAppError(
      'Session compromise détectée — reconnectez-vous',
      'AUTH_SESSION_COMPROMISED'
    );
  }

  // Expired
  if (record.expiresAt < new Date()) {
    record.revokedAt = new Date();
    await record.save();
    throw new TokenExpiredAppError();
  }

  // Revoke current token
  record.revokedAt = new Date();
  await record.save();

  // Load user to get latest role/email (in case they changed)
  const user = await User.findById(record.userId).select('role email');
  if (!user) {
    throw new NotFoundAppError('Utilisateur');
  }

  // Issue new pair in the same family
  const rawNew = generateRawRefreshToken();
  await RefreshToken.create({
    userId: record.userId,
    tokenHash: hashToken(rawNew),
    family: record.family,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
    createdFromIp: ip,
  });

  const accessToken = jwt.sign(
    { id: user._id.toString(), role: user.role, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );

  const decoded = jwt.decode(accessToken) as { exp: number };
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  logger.info(`[TokenService] Rotated refresh token for user ${record.userId}`, {
    family: record.family,
  });

  return { accessToken, refreshToken: rawNew, expiresIn };
};

/**
 * Revoke a specific refresh token (logout).
 * Does NOT cascade-revoke the family — only the presented token is invalidated.
 */
export const revokeRefreshToken = async (rawRefreshToken: string): Promise<void> => {
  const tokenHash = hashToken(rawRefreshToken);
  const result = await RefreshToken.updateOne(
    { tokenHash, revokedAt: null },
    { revokedAt: new Date() }
  );
  logger.info(`[TokenService] Revoked refresh token (matched: ${result.matchedCount})`);
};

/**
 * Revoke ALL active refresh tokens for a user (logout from all devices).
 */
export const revokeAllUserTokens = async (userId: string): Promise<void> => {
  await RefreshToken.updateMany({ userId, revokedAt: null }, { revokedAt: new Date() });
  logger.info(`[TokenService] Revoked all tokens for user ${userId}`);
};

/**
 * Phantom Token introspection — validates a raw (opaque) refresh token
 * and returns the associated user payload. Used for service-to-service calls.
 *
 * @param rawToken - Opaque refresh token
 * @returns User payload or null if token is invalid/expired/revoked
 */
export const introspectToken = async (
  rawToken: string
): Promise<{ userId: string; role: string; email: string } | null> => {
  const tokenHash = hashToken(rawToken);
  const record = await RefreshToken.findOne({ tokenHash }).populate<{
    userId: { _id: string; role: string; email: string };
  }>('userId', 'role email');

  if (!record || record.revokedAt || record.expiresAt < new Date()) {
    return null;
  }

  const user = record.userId as any;
  return {
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  };
};
