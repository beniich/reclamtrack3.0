import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/security.js';
import { InternalAuditAgent } from '../services/auditAgent.service.js';
import { successResponse } from '../utils/apiResponse.js';

const router = Router();

/**
 * @route POST /api/audit-agent/trigger
 * @desc Déclenche manuellement l'analyse de l'IA et génère un rapport
 */
router.post('/trigger', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const result = await InternalAuditAgent.generateMonthlyAuditReport();
        return successResponse(res, {
            message: "Rapport d'audit généré avec succès par l'agent IA",
            data: result
        });
    } catch (err) {
        next(err);
    }
});

export default router;
