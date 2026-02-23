/**
 * @file apiKeyService.ts
 * @description Service for generating, validating, and managing API keys.
 *              API keys are stored as SHA-256 hashes.
 * @module backend/services
 */

import crypto from 'crypto';
import { ApiKey, IApiKey } from '../models/ApiKey.js';
import { NotFoundAppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

const KEY_PREFIX = 'rtk_';
const RAW_KEY_BYTES = 32;

/**
 * Generate a cryptographically secure random key.
 */
const generateRawKey = (): string => {
  return KEY_PREFIX + crypto.randomBytes(RAW_KEY_BYTES).toString('base64url');
};

/**
 * Hash a raw API key for storage in the database.
 * Uses a global pepper from env if available.
 */
const hashKey = (rawKey: string): string => {
  const pepper = process.env.API_KEY_SALT ?? '';
  return crypto.createHash('sha256').update(`${rawKey}${pepper}`).digest('hex');
};

export interface GenerateKeyResult {
  /** The raw API key — this is the ONLY time it will ever be returned! */
  rawKey: string;
  keyDoc: IApiKey;
}

/**
 * Generate a new API key for an organization.
 */
export const generateApiKey = async (
  orgId: string,
  createdBy: string,
  name: string,
  scopes: string[] = ['*'],
  plan: 'starter' | 'pro' | 'enterprise' = 'starter',
  rateLimit = 60
): Promise<GenerateKeyResult> => {
  const rawKey = generateRawKey();
  const keyHash = hashKey(rawKey);
  const keyPrefixDisplay = rawKey.substring(0, 12) + '...';

  const keyDoc = await ApiKey.create({
    orgId,
    keyHash,
    keyPrefix: keyPrefixDisplay,
    name,
    scopes,
    plan,
    rateLimit,
    createdBy,
    isActive: true,
  });

  logger.info(`[ApiKeyService] Generated new API key '${name}' for org ${orgId}`);

  return { rawKey, keyDoc };
};

/**
 * Validate a raw API key provided by a client.
 * Returns the key document if valid, active, and not expired.
 * Updates the `lastUsedAt` timestamp asynchronously.
 *
 * @param rawKey - The raw API key string
 * @returns The ApiKey document or null
 */
export const validateApiKey = async (rawKey: string): Promise<IApiKey | null> => {
  if (!rawKey.startsWith(KEY_PREFIX)) {
    return null;
  }

  const keyHash = hashKey(rawKey);
  const keyDoc = await ApiKey.findOne({ keyHash, isActive: true });

  if (!keyDoc) {
    return null;
  }

  if (keyDoc.expiresAt && keyDoc.expiresAt < new Date()) {
    return null;
  }

  // Fire and forget update of lastUsedAt
  ApiKey.updateOne({ _id: keyDoc._id }, { $set: { lastUsedAt: new Date() } }).catch((err) =>
    logger.error(`[ApiKeyService] Failed to update lastUsedAt: ${err.message}`)
  );

  return keyDoc;
};

/**
 * Revoke an API key.
 */
export const revokeApiKey = async (keyId: string, orgId: string): Promise<void> => {
  const result = await ApiKey.updateOne({ _id: keyId, orgId }, { $set: { isActive: false } });

  if (result.matchedCount === 0) {
    throw new NotFoundAppError('Clé API');
  }

  logger.info(`[ApiKeyService] Revoked API key ${keyId} for org ${orgId}`);
};

/**
 * Retrieve all API keys for an organization (without the raw keys).
 */
export const getOrgApiKeys = async (orgId: string): Promise<IApiKey[]> => {
  return ApiKey.find({ orgId }).sort({ createdAt: -1 });
};
