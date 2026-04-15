import { Router } from 'express';
import { authenticate, requireOrganization, requireAdmin } from '../middleware/security.js';
import { complianceService } from '../services/complianceService.js';
import { auditReportService } from '../services/auditReportService.js';
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

// GET /api/compliance/export/excel - Download compliance dossier
router.get('/export/excel', authenticate, requireOrganization, requireAdmin, async (req, res) => {
    try {
        const organizationId = (req as any).organizationId;
        const buffer = await auditReportService.generateExcelReport(organizationId);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=Compliance_Dossier_ISO27001_${Date.now()}.xlsx`);

        res.send(buffer);
    } catch (error) {
        logger.error('Error exporting compliance excel:', error);
        res.status(500).json({ success: false, message: 'Server error exporting report' });
    }
});

// POST /api/compliance/audit-internal - Trigger IA Internal Audit & Generate Report
router.post('/audit-internal', authenticate, requireAdmin, async (req, res) => {
    try {
        const { internalAuditService } = await import('../services/internalAuditService.js');
        const result = await internalAuditService.performAudit();
        
        res.json({
            success: true,
            message: 'Audit interne IA completed',
            data: {
                path: result.path,
                report: result.content
            }
        });
    } catch (error) {
        logger.error('Error performing internal audit:', error);
        res.status(500).json({ success: false, message: 'Internal audit failed' });
    }
});

// GET /api/compliance/reports - List archived audit reports
router.get('/reports', authenticate, requireAdmin, async (req, res) => {
    try {
        const fs = await import('fs');
        const path = await import('path');
        const reportDir = path.join(process.cwd(), 'reports', 'compliance');
        
        if (!fs.existsSync(reportDir)) {
            return res.json({ success: true, data: [] });
        }
        
        const files = fs.readdirSync(reportDir)
            .filter(f => f.endsWith('.md'))
            .map(f => ({
                name: f,
                date: f.match(/\d{4}_\d{2}/)?.[0] || 'Unknown',
                path: `/reports/compliance/${f}`
            }));
            
        res.json({ success: true, data: files });
    } catch (error) {
        logger.error('Error listing reports:', error);
        res.status(500).json({ success: false, message: 'Failed to list reports' });
    }
});

export default router;
