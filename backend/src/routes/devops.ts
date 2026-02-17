import express, { Response } from 'express';
import { auth } from '../middleware/auth.js';
import { requireOrganization, requireRole } from '../middleware/organization.js';
import { healthService } from '../services/healthService.js';
import { AuthenticatedRequest } from '../types/request.js';

const router = express.Router();

// DevOps routes require highest privileges
router.use(auth, requireOrganization, requireRole(['OWNER', 'ADMIN']));

/**
 * GET /api/devops/services/health
 * Get health status of microservices
 */
router.get('/services/health', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const services = await healthService.getServicesHealth();
    const metrics = healthService.getSystemMetrics();

    res.json({
      success: true,
      data: {
        services,
        metrics,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/devops/services/:id/restart
 * Restart a microservice (Simulated)
 */
router.post('/services/:id/restart', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Mock restart logic
    await new Promise((resolve) => setTimeout(resolve, 2000));

    res.json({
      success: true,
      message: `Service ${id} restarted successfully.`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
