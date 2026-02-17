import express, { Response } from 'express';
import { auth } from '../middleware/auth.js';
import { requireOrganization, requireRole } from '../middleware/organization.js';
import { securityService } from '../services/securityService.js';
import { AuthenticatedRequest } from '../types/request.js';

const router = express.Router();

// All security routes require authentication and admin role
router.use(auth, requireOrganization, requireRole(['ADMIN', 'OWNER']));

/**
 * GET /api/security/audit/passwords
 * Run password security audit
 */
router.get('/audit/passwords', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = (req as any).organizationId;
    const audit = await securityService.auditPasswordSecurity(organizationId);

    res.json({
      success: true,
      data: audit,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/security/sessions/rdp
 * Get active RDP sessions
 */
router.get('/sessions/rdp', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const sessions = await securityService.getRDPSessions();

    res.json({
      success: true,
      data: sessions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/security/gpo
 * Get list of Group Policy Objects
 */
router.get('/gpo', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const gpoList = await securityService.getGPOList();

    res.json({
      success: true,
      data: gpoList,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/security/powershell
 * Execute a whitelisted PowerShell script
 */
router.post('/powershell', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { scriptName } = req.body;
    const userId = (req as any).user?._id;

    if (!scriptName) {
      return res.status(400).json({
        success: false,
        error: 'Script name is required',
      });
    }

    const result = await securityService.executePowerShellScript(scriptName, userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/security/compliance
 * Generate comprehensive compliance report
 */
router.get('/compliance', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const organizationId = (req as any).organizationId;
    const report = await securityService.generateComplianceReport(organizationId);

    res.json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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
      return res.status(400).json({
        success: false,
        error: 'Host, API key, and API secret are required',
      });
    }

    const { pfSenseService } = await import('../services/pfSenseService.js');
    const connected = await pfSenseService.connect({ host, apiKey, apiSecret, port, protocol });

    if (!connected) {
      return res.status(500).json({
        success: false,
        error: 'Failed to connect to pfSense',
      });
    }

    res.json({
      success: true,
      message: 'Successfully connected to pfSense',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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

    res.json({
      success: true,
      data: rules,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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

    res.json({
      success: true,
      data: logs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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

    res.json({
      success: true,
      data: status,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
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

    res.json({
      success: true,
      data: traffic,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
