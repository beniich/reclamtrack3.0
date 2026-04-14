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

// GET /api/compliance/export/excel - Download compliance dossier
router.get('/export/excel', authenticate, requireOrganization, requireAdmin, async (req, res) => {
    try {
        const organizationId = (req as any).organizationId;
        const report = await complianceService.generateReport(organizationId);
        
        const ExcelJS = await import('exceljs');
        const workbook = new (ExcelJS.default || ExcelJS).Workbook();
        
        // Executive Summary Sheet
        const summarySheet = workbook.addWorksheet('Executive Summary');
        summarySheet.columns = [
            { header: 'Checklist Item', key: 'name', width: 40 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Framework', key: 'framework', width: 15 }
        ];
        
        summarySheet.addRow({ name: 'OVERALL COMPLIANCE SCORE', status: `${report.score}/100`, framework: 'Global' });
        summarySheet.addRow({}); // spacer
        
        report.controls.forEach((c: any) => {
            summarySheet.addRow(c);
        });

        // Styling
        summarySheet.getRow(1).font = { bold: true };
        summarySheet.getRow(3).font = { bold: true, color: { argb: 'FF0000FF' } };

        // Detail Sheet: IAM
        const iamSheet = workbook.addWorksheet('IAM Audit');
        iamSheet.columns = [
            { header: 'Metric', key: 'metric', width: 30 },
            { header: 'Value', key: 'value', width: 20 }
        ];
        iamSheet.addRows([
            { metric: 'Total System Users', value: report.details.iam.totalUsers },
            { metric: 'MFA Enabled Users', value: report.details.iam.mfaEnabledCount },
            { metric: 'MFA Adoption Rate', value: `${report.details.iam.mfaAdoptionRate.toFixed(1)}%` },
            { metric: 'Stale Passwords (>90d)', value: report.details.iam.stalePasswordsCount }
        ]);

        // Detail Sheet: Data Classification (Pillar 5)
        const classificationSheet = workbook.addWorksheet('Data Inventory (Pillar 5)');
        classificationSheet.columns = [
            { header: 'Classification Label', key: 'label', width: 25 },
            { header: 'Count', key: 'count', width: 15 }
        ];
        Object.entries(report.details.classification).forEach(([label, count]) => {
            classificationSheet.addRow({ label, count });
        });

        // Detail Sheet: Security Events
        const eventSheet = workbook.addWorksheet('Security Incidents');
        const { default: SecurityEvent } = await import('../models/SecurityEvent.js');
        const events = await SecurityEvent.find({ organizationId }).sort({ detectedAt: -1 });

        eventSheet.columns = [
            { header: 'Date', key: 'date', width: 20 },
            { header: 'Type', key: 'type', width: 20 },
            { header: 'Severity', key: 'severity', width: 15 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Description', key: 'description', width: 60 }
        ];

        events.forEach(e => {
            eventSheet.addRow({
                date: e.detectedAt.toISOString(),
                type: e.type,
                severity: e.severity,
                status: e.status,
                description: e.description
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=Compliance_Dossier_ISO27001_${Date.now()}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
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
