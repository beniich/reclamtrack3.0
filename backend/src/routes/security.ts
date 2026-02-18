import express, { Response } from 'express';
import {
  authenticate,
  AuthenticatedRequest,
  rateLimiter,
  requireOrganization,
  requireRole,
} from '../middleware/security.js';
import { securityService } from '../services/securityService.js';
import {
  createdResponse,
  ErrorCodes,
  errorResponse,
  successResponse,
} from '../utils/apiResponse.js';

const router = express.Router();

// All security routes require authentication and admin role
// Rate limiting: max 100 requests per minute
router.use(
  authenticate,
  requireOrganization,
  requireRole(['ADMIN', 'OWNER']),
  rateLimiter({ max: 100, windowMs: 60000 })
);

/**
 * GET /api/security/audit/passwords
 * Run password security audit
 */
router.get('/audit/passwords', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const audit = await securityService.auditPasswordSecurity(organizationId);
    return successResponse(res, audit);
  } catch (error: any) {
    console.error('[Security Routes] Error in password audit:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/sessions/rdp
 * Get active RDP sessions
 */
router.get('/sessions/rdp', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const sessions = await securityService.getRDPSessions();
    return successResponse(res, sessions);
  } catch (error: any) {
    console.error('[Security Routes] Error in RDP sessions:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/gpo
 * Get list of Group Policy Objects
 */
router.get('/gpo', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const gpoList = await securityService.getGPOList();
    return successResponse(res, gpoList);
  } catch (error: any) {
    console.error('[Security Routes] Error in GPO list:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * POST /api/security/powershell
 * Execute a whitelisted PowerShell script
 */
router.post('/powershell', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { scriptName } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!scriptName) {
      return errorResponse(res, 'Script name is required', 400, ErrorCodes.MISSING_REQUIRED_FIELD);
    }

    if (!userId) {
      return errorResponse(res, 'User identity missing', 401, ErrorCodes.AUTH_USER_MISSING);
    }

    const result = await securityService.executePowerShellScript(scriptName, userId);
    return successResponse(res, result);
  } catch (error: any) {
    console.error('[Security Routes] Error in PowerShell execution:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/compliance
 * Generate comprehensive compliance report
 */
router.get('/compliance', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const report = await securityService.generateComplianceReport(organizationId);
    return successResponse(res, report);
  } catch (error: any) {
    console.error('[Security Routes] Error in compliance report:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * POST /api/security/pfsense/connect
 * Connect to pfSense firewall
 */
router.post('/pfsense/connect', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { host, apiKey, apiSecret, port, protocol } = req.body;

    if (!host || !apiKey || !apiSecret) {
      return errorResponse(
        res,
        'Host, API key, and API secret are required',
        400,
        ErrorCodes.MISSING_REQUIRED_FIELD
      );
    }

    const { pfSenseService } = await import('../services/pfSenseService.js');
    const connected = await pfSenseService.connect({ host, apiKey, apiSecret, port, protocol });

    if (!connected) {
      return errorResponse(
        res,
        'Failed to connect to pfSense',
        500,
        ErrorCodes.SERVICE_UNAVAILABLE
      );
    }

    return successResponse(res, { message: 'Successfully connected to pfSense' });
  } catch (error: any) {
    console.error('[Security Routes] Error in pfSense connect:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/pfsense/rules
 * Get firewall rules
 */
router.get('/pfsense/rules', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pfSenseService } = await import('../services/pfSenseService.js');
    const rules = await pfSenseService.getFirewallRules();
    return successResponse(res, rules);
  } catch (error: any) {
    console.error('[Security Routes] Error in pfSense rules:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/pfsense/logs
 * Get firewall logs
 */
router.get('/pfsense/logs', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const { pfSenseService } = await import('../services/pfSenseService.js');
    const logs = await pfSenseService.getFirewallLogs(limit);
    return successResponse(res, logs);
  } catch (error: any) {
    console.error('[Security Routes] Error in pfSense logs:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/pfsense/interfaces
 * Get interface statistics
 */
router.get('/pfsense/interfaces', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pfSenseService } = await import('../services/pfSenseService.js');
    const stats = await pfSenseService.getInterfaceStats();
    return successResponse(res, stats);
  } catch (error: any) {
    console.error('[Security Routes] Error in pfSense interfaces:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/pfsense/system
 * Get system status
 */
router.get('/pfsense/system', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pfSenseService } = await import('../services/pfSenseService.js');
    const status = await pfSenseService.getSystemStatus();
    return successResponse(res, status);
  } catch (error: any) {
    console.error('[Security Routes] Error in pfSense system:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/pfsense/traffic
 * Get traffic statistics
 */
router.get('/pfsense/traffic', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { pfSenseService } = await import('../services/pfSenseService.js');
    const traffic = await pfSenseService.getTrafficStats();
    return successResponse(res, traffic);
  } catch (error: any) {
    console.error('[Security Routes] Error in pfSense traffic:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/secrets
 * Get all secrets (without values)
 */
router.get('/secrets', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const { secretService } = await import('../services/secretService.js');
    const secrets = await secretService.getSecrets(organizationId);
    return successResponse(res, secrets);
  } catch (error: any) {
    console.error('[Security Routes] Error in get secrets:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * POST /api/security/secrets
 * Create a new secret
 */
router.post('/secrets', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = req.organizationId;
    const userId = req.user?.id || req.user?._id;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    if (!userId) {
      return errorResponse(res, 'User identity missing', 401, ErrorCodes.AUTH_USER_MISSING);
    }

    const { secretService } = await import('../services/secretService.js');
    const secret = await secretService.createSecret(req.body, userId, organizationId);
    return createdResponse(res, secret);
  } catch (error: any) {
    console.error('[Security Routes] Error in create secret:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/secrets/:id/reveal
 * Decrypt and reveal secret value
 */
router.get('/secrets/:id/reveal', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const { secretService } = await import('../services/secretService.js');
    const secret = await secretService.revealSecret(id, organizationId);
    return successResponse(res, secret);
  } catch (error: any) {
    console.error('[Security Routes] Error in reveal secret:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * DELETE /api/security/secrets/:id
 * Remove a secret
 */
router.delete('/secrets/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const { secretService } = await import('../services/secretService.js');
    await secretService.deleteSecret(id, organizationId);
    return successResponse(res, { message: 'Secret deleted' });
  } catch (error: any) {
    console.error('[Security Routes] Error in delete secret:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

/**
 * GET /api/security/secrets/stats
 * Get vault statistics
 */
router.get('/secrets/stats', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const { secretService } = await import('../services/secretService.js');
    const stats = await secretService.getSecretStats(organizationId);
    return successResponse(res, stats);
  } catch (error: any) {
    console.error('[Security Routes] Error in secret stats:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
});

export default router;
