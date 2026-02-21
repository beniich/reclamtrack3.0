import { Router } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/security.js';
import { validator } from '../middleware/validator.js';
import AuditLog from '../models/AuditLog.js';
import { User } from '../models/User.js';
import { eventBus } from '../services/eventBus.js';
import {
  conflictResponse,
  createdResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

const router = Router();

/* POST /api/auth/register */
router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  validator,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const exists = await User.findOne({ email });

      if (exists) {
        return conflictResponse(res, 'Email déjà utilisé');
      }

      const user = await User.create({ email, password });
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      } as jwt.SignOptions);

      // Register Route
      logger.info(`✅ Inscription - ${email}`);

      // Audit Log
      await AuditLog.create({
        action: 'REGISTER',
        userId: user._id,
        targetId: user._id.toString(),
        targetType: 'User',
        details: { email, role: user.role },
        ipAddress: req.ip,
      });

      // Kafka Event
      await eventBus.publish('auth-events', 'USER_REGISTERED', {
        userId: user._id,
        email: user.email,
        role: user.role,
        timestamp: new Date(),
      });

      return createdResponse(res, {
        token,
        user: { id: user._id, email, role: user.role },
      });
    } catch (err) {
      logger.error('[Auth Routes] Error in register:', err);
      next(err);
    }
  }
);

/* POST /api/auth/login */
router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  validator,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      logger.debug(`Login attempt for email: ${email}`);
      const user = await User.findOne({ email });

      if (!user) {
        logger.warn(`Login failed: User not found for email: ${email}`);
        return unauthorizedResponse(res, 'Identifiants invalides');
      }

      const matched = await user.comparePassword(password);

      if (!matched) {
        logger.warn(`Login failed: Password mismatch for user: ${email}`);
        return unauthorizedResponse(res, 'Identifiants invalides');
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      } as jwt.SignOptions);

      logger.info(`🔐 Connexion - ${email}`);

      // Audit Log
      await AuditLog.create({
        action: 'LOGIN',
        userId: user._id,
        targetId: user._id.toString(),
        targetType: 'Session',
        details: { email, role: user.role },
        ipAddress: req.ip,
      });

      // Kafka Event
      await eventBus.publish('auth-events', 'USER_LOGIN', {
        userId: user._id,
        email: user.email,
        role: user.role,
        timestamp: new Date(),
      });

      return successResponse(res, { token, user: { id: user._id, email, role: user.role } });
    } catch (err) {
      logger.error('[Auth Routes] Error in login:', err);
      next(err);
    }
  }
);

/* GET /api/auth/me */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) {
      return notFoundResponse(res, 'Utilisateur');
    }
    logger.info(`👤 Profil récupéré - ${user.email}`);
    return successResponse(res, { id: user._id, email: user.email, role: user.role });
  } catch (err) {
    logger.error('[Auth Routes] Error in get profile:', err);
    next(err);
  }
});

/* POST /api/auth/refresh */
router.post('/refresh', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user!.id);
    if (!user) {
      return notFoundResponse(res, 'Utilisateur');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    } as jwt.SignOptions);

    logger.info(`🔄 Token refresh - ${user.email}`);
    return successResponse(res, {
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    logger.error('[Auth Routes] Error in refresh token:', err);
    next(err);
  }
});

/* POST /api/auth/logout */
router.post('/logout', (req, res) => {
  // In a stateless JWT setup, the backend just confirms success.
  // The frontend deals with token removal.
  // In a real microservice with Redis, we would blacklist the token here.
  logger.info('🚪 User logged out');
  return successResponse(res, { message: 'Déconnexion réussie' });
});

export default router;
