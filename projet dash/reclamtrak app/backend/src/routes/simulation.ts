import { Router } from 'express';
import { TrafficSimulationService } from '../services/trafficSimulation.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { authenticate } from '../middleware/security.js';

const router = Router();

/**
 * @route POST /api/admin/simulation/start
 */
router.post('/start', authenticate, (req, res) => {
    TrafficSimulationService.startSimulation();
    return successResponse(res, { status: 'Simulation started' });
});

/**
 * @route POST /api/admin/simulation/stop
 */
router.post('/stop', authenticate, (req, res) => {
    TrafficSimulationService.stopSimulation();
    return successResponse(res, { status: 'Simulation stopped' });
});

export default router;
