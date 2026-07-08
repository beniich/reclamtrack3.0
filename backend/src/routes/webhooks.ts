/**
 * @file webhooks.ts
 * @description Routes for managing outgoing webhooks.
 * @module backend/routes
 */

import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticate, requireAdmin } from '../middleware/security.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { registerWebhook, unregisterWebhook, getWebhooks, triggerWebhooks } from '../services/webhookService.js';
import { successResponse, createdResponse } from '../utils/apiResponse.js';
import { body } from 'express-validator';
import { validator } from '../middleware/validator.js';

const router = Router();

router.use(authenticate);
router.use(requireAdmin);

/**
 * GET /api/webhooks
 * List registered webhooks.
 */
router.get('/', asyncHandler(async (_req, res) => {
  const webhooks = getWebhooks();
  successResponse(res, webhooks);
}));

/**
 * POST /api/webhooks
 * Register a new webhook.
 */
router.post('/', 
  [
    body('url').isURL(),
    body('events').isArray(),
    body('secret').optional().isString(),
  ],
  validator,
  asyncHandler(async (req, res) => {
  const id = uuidv4();
  registerWebhook(id, req.body);
  createdResponse(res, { id, ...req.body });
}));

/**
 * DELETE /api/webhooks/:id
 * Unregister a webhook.
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  unregisterWebhook(req.params.id);
  successResponse(res, { message: 'Webhook deleted' });
}));

/**
 * POST /api/webhooks/:id/test
 * Trigger a test event for a specific webhook.
 */
router.post('/:id/test', asyncHandler(async (req, res) => {
  // In a real implementation, we would look up the specific webhook and trigger it directly.
  // For demonstration, we'll just trigger a general test event.
  await triggerWebhooks('ping', { message: 'Test webhook event' });
  successResponse(res, { message: 'Test event triggered' });
}));

export default router;
