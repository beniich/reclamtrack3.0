/**
 * @file ssh-management.ts
 * @description Routes for remote SSH server administration.
 *              Allows administrators to rotate service account passwords
 *              and monitor active ssh sessions remotely.
 * @module backend/routes
 */

import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, requireAdmin, requireOrganization } from '../middleware/security.js';
import { validator } from '../middleware/validator.js';
import AuditLog from '../models/AuditLog.js';
import {
  enforcePasswordPolicy,
  getActiveSessions,
  rotatePassword,
} from '../services/sshService.js';
import { successResponse } from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

const router = Router();

// All SSH management routes require highest privileges
router.use(authenticate);
router.use(requireOrganization);
router.use(requireAdmin);

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/ssh/sessions
// Audit active SSH sessions on the target server
// ──────────────────────────────────────────────────────────────────────────────
router.get('/sessions', async (req: Request, res: Response, next) => {
  try {
    const output = await getActiveSessions();
    return successResponse(res, { sessions: output });
  } catch (err) {
    next(err);
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/ssh/rotate-password
// Rotate the password of a Unix user on the remote server
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/rotate-password',
  [
    body('targetUser')
      .trim()
      .notEmpty()
      .withMessage("Le nom d'utilisateur cible est requis")
      .matches(/^[a-z_][a-z0-9_-]*[$]?$/)
      .withMessage("Format d'utilisateur système invalide"),
    body('newPassword')
      .isLength({ min: 12 })
      .withMessage('Mots de passe système nécessitent 12 chars minimum')
      .matches(/[A-Z]/)
      .matches(/[a-z]/)
      .matches(/[0-9]/)
      .matches(/[^a-zA-Z0-9]/)
      .withMessage('Le mot de passe doit contenir majuscules, minuscules, chiffres et symboles'),
  ],
  validator,
  async (req: Request, res: Response, next) => {
    try {
      const { targetUser, newPassword } = req.body;
      const adminId = req.user!.id;
      const orgId = req.organizationId!;

      await rotatePassword(targetUser, newPassword);

      // MANDATORY AUDIT LOG FOR SSH ACTIONS
      await AuditLog.create({
        action: 'SSH_PASSWORD_ROTATION',
        userId: adminId,
        targetId: targetUser,
        targetType: 'RemoteUser',
        details: { orgId, host: process.env.SSH_HOST },
        ipAddress: req.ip,
      });

      logger.warn(
        `[SSH API] 🔐 Admin ${adminId} rotated password for ${targetUser}@${process.env.SSH_HOST}`
      );
      return successResponse(res, { message: `Mot de passe roté avec succès pour ${targetUser}` });
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/ssh/:targetUser/policy
// Enforce max password age policy on the remote server
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/:targetUser/policy',
  [
    param('targetUser')
      .trim()
      .matches(/^[a-z_][a-z0-9_-]*[$]?$/),
    body('maxDays').isInt({ min: 1, max: 365 }).toInt(),
  ],
  validator,
  async (req: Request, res: Response, next) => {
    try {
      const targetUser = req.params.targetUser as string;
      const { maxDays } = req.body;

      await enforcePasswordPolicy(targetUser, maxDays);

      return successResponse(res, {
        message: `Politique de ${maxDays} jours appliquée à l'utilisateur ${targetUser} via chage`,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
