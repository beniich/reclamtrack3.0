/**
 * @file auth.ts
 * @description Authentication routes: register, login, /me, /refresh (token rotation),
 *              /logout, /introspect (phantom token pattern for service-to-service).
 * @module backend/routes
 */

import crypto from 'crypto';
import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/security.js';
import { validator } from '../middleware/validator.js';
import AuditLog from '../models/AuditLog.js';
import { User } from '../models/User.js';
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from '../services/emailService.js';
import { eventBus } from '../services/eventBus.js';
import {
  introspectToken,
  issueTokenPair,
  revokeAllUserTokens,
  revokeRefreshToken,
  rotateRefreshToken,
} from '../services/tokenService.js';
import {
  conflictResponse,
  createdResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

const router = Router();

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères')
      .matches(/[A-Z]/)
      .withMessage('Le mot de passe doit contenir au moins une majuscule')
      .matches(/[0-9]/)
      .withMessage('Le mot de passe doit contenir au moins un chiffre'),
    body('name').optional().trim().isLength({ max: 100 }),
  ],
  validator,
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return conflictResponse(res, 'Email déjà utilisé');

      const verificationToken = crypto.randomBytes(32).toString('hex');
      const user = await User.create({
        email,
        password,
        name,
        emailVerificationToken: verificationToken,
      });

      await sendEmailVerification(user.email, verificationToken);

      const tokens = await issueTokenPair(user._id.toString(), user.role, user.email, req.ip);

      logger.info(`✅ Inscription — ${email}`);
      await AuditLog.create({
        action: 'REGISTER',
        userId: user._id,
        targetId: user._id.toString(),
        targetType: 'User',
        details: { email, role: user.role },
        ipAddress: req.ip,
      });

      await eventBus.publish('auth-events', 'USER_REGISTERED', {
        userId: user._id,
        email: user.email,
        role: user.role,
        timestamp: new Date(),
      });

      return createdResponse(res, {
        ...tokens,
        user: { id: user._id, email, role: user.role, organizationId: user.organizationId },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  validator,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        logger.warn(`Login failed: user not found – ${email}`);
        return unauthorizedResponse(res, 'Identifiants invalides');
      }

      const matched = await user.comparePassword(password);
      if (!matched) {
        logger.warn(`Login failed: bad password – ${email}`);
        return unauthorizedResponse(res, 'Identifiants invalides');
      }

      const tokens = await issueTokenPair(user._id.toString(), user.role, user.email, req.ip);

      logger.info(`🔐 Connexion — ${email}`);
      await AuditLog.create({
        action: 'LOGIN',
        userId: user._id,
        targetId: user._id.toString(),
        targetType: 'Session',
        details: { email, role: user.role },
        ipAddress: req.ip,
      });

      await eventBus.publish('auth-events', 'USER_LOGIN', {
        userId: user._id,
        email: user.email,
        role: user.role,
        timestamp: new Date(),
      });

      return successResponse(res, {
        ...tokens,
        user: { id: user._id, email, role: user.role, organizationId: user.organizationId },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me
// ──────────────────────────────────────────────────────────────────────────────
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) return notFoundResponse(res, 'Utilisateur');
    return successResponse(res, {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      organizationId: user.organizationId,
    });
  } catch (err) {
    next(err);
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/refresh   — Refresh token rotation
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/refresh',
  [body('refreshToken').notEmpty().withMessage('refreshToken requis')],
  validator,
  async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await rotateRefreshToken(refreshToken, req.ip);
      logger.info(`🔄 Token refresh – user rotated`);
      return successResponse(res, tokens);
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/logout
// ──────────────────────────────────────────────────────────────────────────────
router.post('/logout', [body('refreshToken').optional()], async (req, res, next) => {
  try {
    const { refreshToken, allDevices } = req.body;

    if (allDevices && req.user?.id) {
      await revokeAllUserTokens(req.user.id);
    } else if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    logger.info('🚪 User logged out');
    return successResponse(res, { message: 'Déconnexion réussie' });
  } catch (err) {
    next(err);
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/introspect  — Phantom Token pattern (service-to-service)
// Restricted to internal network / service accounts via IP or x-internal-secret header
// ──────────────────────────────────────────────────────────────────────────────
router.post('/introspect', async (req, res, next) => {
  try {
    // Validate internal secret header to restrict to backend services only
    const internalSecret = req.headers['x-internal-secret'];
    if (!process.env.INTERNAL_SECRET || internalSecret !== process.env.INTERNAL_SECRET) {
      return res.status(403).json({
        success: false,
        error: 'Accès refusé',
        code: 'FORBIDDEN',
        timestamp: new Date().toISOString(),
      });
    }

    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'token requis',
        code: 'MISSING_TOKEN',
        timestamp: new Date().toISOString(),
      });
    }

    const payload = await introspectToken(token);
    return successResponse(res, { active: !!payload, ...(payload ?? {}) });
  } catch (err) {
    next(err);
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/forgot-password
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  validator,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        // Return success even if user not found for security
        return successResponse(res, {
          message:
            'Si cet email correspond à un compte, vous recevrez un lien de réinitialisation.',
        });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
      await user.save();

      await sendPasswordResetEmail(user.email, resetToken);

      logger.info(`🔑 Demande reset password — ${email}`);
      return successResponse(res, {
        message: 'Si cet email correspond à un compte, vous recevrez un lien de réinitialisation.',
      });
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/reset-password
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/reset-password',
  [
    body('token').notEmpty(),
    body('password').isLength({ min: 8 }).withMessage('8 caractères minimum'),
  ],
  validator,
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return unauthorizedResponse(res, 'Token invalide ou expiré');
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      logger.info(`✅ Password reset — ${user.email}`);
      return successResponse(res, { message: 'Mot de passe mis à jour avec succès' });
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/auth/verify-email
// ──────────────────────────────────────────────────────────────────────────────
router.post('/verify-email', [body('token').notEmpty()], validator, async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return notFoundResponse(res, 'Token de vérification invalide');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    logger.info(`📧 Email vérifié — ${user.email}`);
    return successResponse(res, { message: 'Email vérifié avec succès' });
  } catch (err) {
    next(err);
  }
});

export default router;
