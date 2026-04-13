import { Router } from 'express';
import { authenticate, requireOrganization, requireAdmin } from '../middleware/security.js';
import { complianceService } from '../services/complianceService.js';
import { logger } from '../utils/logger.js';

const router = Router();

// GET /api/compliance/report - Get full SOC 2 / ISO 27001 report
router.get('/report', authenticate, requireOrganization, requireAdmin, async (req, res) => {
    try {
        const organizationId = (req as any).organizationId;
        const report = await complianceService.generateReport(organizationId);
        
        res.json({
            success: true,
            data: report
        });
    } catch (error) {
        logger.error('Error generating compliance report:', error);
        res.status(500).json({ success: false, message: 'Server error generating report' });
    }
});

// GET /api/compliance/events - Get security incidents
router.get('/events', authenticate, requireOrganization, requireAdmin, async (req, res) => {
    try {
        const { default: SecurityEvent } = await import('../models/SecurityEvent.js');
        const organizationId = (req as any).organizationId;
        const events = await SecurityEvent.find({ organizationId }).sort({ detectedAt: -1 }).limit(50);
        
        res.json({
            success: true,
            data: events
        });
    } catch (error) {
        logger.error('Error fetching security events:', error);
        res.status(500).json({ success: false, message: 'Server error fetching events' });
    }
});

export default router;
