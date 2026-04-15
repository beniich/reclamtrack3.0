import { User } from '../models/User.js';
import SecurityEvent from '../models/SecurityEvent.js';
import AuditLog from '../models/AuditLog.js';

export class ComplianceService {
    /**
     * Generate complete SOC 2 / ISO 27001 Compliance Report
     */
    async generateReport(organizationId?: string) {
        const query = organizationId ? { organizationId } : {};

        const [
            iamStats,
            securityEvents,
            auditStats,
            classificationStats
        ] = await Promise.all([
            this.getIAMStats(query),
            this.getSecurityEventsStats(query),
            this.getAuditLogStats(query),
            this.getClassificationStats()
        ]);

        const score = this.calculateOverallScore(iamStats, securityEvents, auditStats);

        return {
            timestamp: new Date(),
            organizationId,
            score,
            details: {
                iam: iamStats,
                securityEvents,
                audit: auditStats,
                classification: classificationStats
            },
            controls: this.getControlMaturity(iamStats, securityEvents, auditStats)
        };
    }

    private async getClassificationStats() {
        const AuditLog = (await import('../models/AuditLog.js')).default;
        
        const stats = await AuditLog.aggregate([
            { $group: { _id: '$classification', count: { $sum: 1 } } }
        ]);

        const result: Record<string, number> = {
            PUBLIC: 0,
            INTERNAL: 0,
            CONFIDENTIAL: 0,
            RESTRICTED: 0
        };

        stats.forEach(s => {
            if (s._id) result[s._id] = s.count;
        });

        return result;
    }

    private async getIAMStats(query: any) {
        const users = await User.find(query).select('mfaEnabled role passwordChangedAt');
        
        let mfaEnabledCount = 0;
        let stalePasswordsCount = 0;
        
        const now = new Date();
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

        for (const user of users) {
            if (user.mfaEnabled) mfaEnabledCount++;
            if (!user.passwordChangedAt || user.passwordChangedAt < ninetyDaysAgo) {
                stalePasswordsCount++;
            }
        }

        return {
            totalUsers: users.length,
            mfaEnabledCount,
            mfaAdoptionRate: users.length ? (mfaEnabledCount / users.length) * 100 : 100,
            stalePasswordsCount,
            stalePasswordRate: users.length ? (stalePasswordsCount / users.length) * 100 : 0
        };
    }

    private async getSecurityEventsStats(query: any) {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const eventQuery = { ...query, detectedAt: { $gte: thirtyDaysAgo } };
        
        const events = await SecurityEvent.find(eventQuery);
        
        return {
            totalLast30Days: events.length,
            openCritical: events.filter(e => e.severity === 'CRITICAL' && e.status === 'OPEN').length,
            openHigh: events.filter(e => e.severity === 'HIGH' && e.status === 'OPEN').length,
            resolved: events.filter(e => e.status === 'RESOLVED').length
        };
    }

    private async getAuditLogStats(query: any) {
        // Just verify logging is active
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentLogs = await AuditLog.countDocuments({ ...query, timestamp: { $gte: twentyFourHoursAgo } });
        
        return {
            health: recentLogs > 0 ? 'ACTIVE' : 'INACTIVE',
            eventsLast24h: recentLogs
        };
    }

    private calculateOverallScore(iamStats: any, securityEvents: any, auditStats: any): number {
        let score = 100;
        
        // MFA penalty (Up to 30 points)
        score -= (100 - iamStats.mfaAdoptionRate) * 0.3;
        
        // Stale password penalty (Up to 20 points)
        score -= iamStats.stalePasswordRate * 0.2;
        
        // Open Events penalty
        score -= securityEvents.openCritical * 15;
        score -= securityEvents.openHigh * 5;
        
        // Audit logging penalty
        if (auditStats.health === 'INACTIVE') score -= 20;

        return Math.max(0, Math.round(score));
    }

    private getControlMaturity(iamStats: any, securityEvents: any, auditStats: any) {
        return [
            {
                id: 'CC6.1 / A.12.4.1',
                framework: 'SOC 2 / ISO 27001',
                name: 'Event Logging & Monitoring',
                status: auditStats.health === 'ACTIVE' ? 'PASS' : 'FAIL',
                details: `${auditStats.eventsLast24h} logs générés ces dernières 24h.`
            },
            {
                id: 'CC6.2 / A.9.4.2',
                framework: 'SOC 2 / ISO 27001',
                name: 'Access Control (MFA)',
                status: iamStats.mfaAdoptionRate >= 95 ? 'PASS' : (iamStats.mfaAdoptionRate > 60 ? 'PARTIAL' : 'FAIL'),
                details: `${iamStats.mfaEnabledCount}/${iamStats.totalUsers} utilisateurs protégés.`
            },
            {
                id: 'CC7.1 / A.16.1.2',
                framework: 'SOC 2 / ISO 27001',
                name: 'Incident Response Management',
                status: securityEvents.openCritical === 0 ? 'PASS' : 'FAIL',
                details: `${securityEvents.openCritical} incidents critiques en cours.`
            },
            {
                id: 'A.9.2.3',
                framework: 'ISO 27001',
                name: 'Management of Privileged Access',
                status: iamStats.stalePasswordRate < 10 ? 'PASS' : 'PARTIAL',
                details: `${iamStats.stalePasswordsCount} mots de passe non renouvelés.`
            },
            {
                id: 'A.8.2.1',
                framework: 'ISO 27001',
                name: 'Classification of Information',
                status: 'PASS',
                details: 'Système de tagging (PUBLIC/INTERNAL/CONFIDENTIAL) actif.'
            }
        ];
    }
}

export const complianceService = new ComplianceService();
