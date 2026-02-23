/**
 * @file api-keys.ts
 * @description Routes for managing Organization API Keys.
 *              Allows administrators to generate, list, and revoke keys.
 * @module backend/routes
 */

import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import {
  authenticate,
  requireAdmin,
  requireOrganization,
  requireSubscription,
} from '../middleware/security.js';
import { validator } from '../middleware/validator.js';
import { generateApiKey, getOrgApiKeys, revokeApiKey } from '../services/apiKeyService.js';
import { createdResponse, successResponse } from '../utils/apiResponse.js';

const router = Router();

// All routes require authentication, org context, admin rights, and the 'api_access' plan feature
router.use(authenticate);
router.use(requireOrganization);
router.use(requireAdmin);
router.use(requireSubscription('api_access'));

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/api-keys
// List all active and revoked API keys for the current organization
// ──────────────────────────────────────────────────────────────────────────────
router.get('/', async (req: Request, res: Response, next) => {
  try {
    const keys = await getOrgApiKeys(req.organizationId!);
    return successResponse(res, keys);
  } catch (err) {
    next(err);
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/api-keys
// Generate a new API key (returns the raw key ONLY ONCE)
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Le nom de la clé est requis')
      .isLength({ max: 100 }),
    body('scopes').optional().isArray().withMessage('Les scopes doivent être un tableau'),
  ],
  validator,
  async (req: Request, res: Response, next) => {
    try {
      const { name, scopes } = req.body;
      const createdBy = req.user!.id;
      const orgId = req.organizationId!;

      // Default rate limit 60 req/min for starter, 300 for pro, 1000 for enterprise
      // In a real app we would read this from the org's Subscription model
      const { rawKey, keyDoc } = await generateApiKey(
        orgId,
        createdBy,
        name,
        scopes ?? ['*'],
        'pro',
        300
      );

      return createdResponse(res, {
        rawKey, // IMPORTANT: The client must copy this immediately!
        keyId: keyDoc._id,
        name: keyDoc.name,
        keyPrefix: keyDoc.keyPrefix,
        expiresAt: keyDoc.expiresAt,
        createdAt: keyDoc.createdAt,
      });
    } catch (err) {
      next(err);
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// DELETE /api/api-keys/:id
// Revoke an active API key
// ──────────────────────────────────────────────────────────────────────────────
router.delete('/:id', async (req: Request, res: Response, next) => {
  try {
    const keyId = req.params.id;
    await revokeApiKey(keyId, req.organizationId!);
    return successResponse(res, { message: 'Clé API révoquée avec succès' });
  } catch (err) {
    next(err);
  }
});

export default router;
