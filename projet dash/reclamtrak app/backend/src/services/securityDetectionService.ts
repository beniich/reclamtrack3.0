import AuditLog from '../models/AuditLog.js';
import SecurityEvent from '../models/SecurityEvent.js';
import { logger } from '../utils/logger.js';

export class SecurityDetectionService {
    /**
     * Checks for brute force attempts based on failed logins
     * SOC 2 CC7.1 - Detection of security events
     */
    async detectBruteForce(ipAddress: string, email: string) {
        try {
            // Count failed login attempts from this IP in the last 15 minutes
            const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
            
            const failedAttempts = await AuditLog.countDocuments({
                ipAddress,
                category: 'AUTH',
                outcome: 'FAILURE',
                timestamp: { $gte: fifteenMinsAgo }
            });

            if (failedAttempts >= 5) {
                // Check if an event already exists to avoid spamming
                const existingEvent = await SecurityEvent.findOne({
                    sourceIp: ipAddress,
                    type: 'BRUTE_FORCE',
                    status: { $in: ['OPEN', 'IN_PROGRESS'] }
                });

                if (!existingEvent) {
                    const event = new SecurityEvent({
                        type: 'BRUTE_FORCE',
                        severity: failedAttempts > 20 ? 'CRITICAL' : 'HIGH',
                        sourceIp: ipAddress,
                        description: `Detected ${failedAttempts} failed login attempts from IP ${ipAddress} targeting ${email}`,
                        evidence: { failedAttempts, email, timeWindow: '15m' }
                    });
                    
                    await event.save();
                    logger.warn(`🚨 SECURITY EVENT: Brute force detected from ${ipAddress}`);
                    
                    // Phase 3 - Automated Alerts
                    const { sendSecurityAlert } = await import('./emailService.js');
                    await sendSecurityAlert(event.type, event.severity, event.description, event.evidence);
                }
            }
        } catch (error) {
            logger.error('Error in detectBruteForce:', error);
        }
    }

    /**
     * Checks for session anomalies (e.g. IP change mid-session)
     */
    async detectSessionAnomaly(userId: string, sessionId: string, currentIp: string, lastIp?: string) {
        if (lastIp && currentIp !== lastIp) {
            const event = new SecurityEvent({
                type: 'ANOMALY',
                severity: 'MEDIUM',
                affectedUsers: [userId],
                sourceIp: currentIp,
                description: `Session IP change detected: User ${userId} switched from ${lastIp} to ${currentIp} in session ${sessionId}`,
                evidence: { sessionId, previousIp: lastIp, currentIp }
            });
            await event.save();
            logger.warn(`🚨 SECURITY EVENT: Session hijacking risk (IP jump) for user ${userId}`);
        }
    }

    /**
     * Checks for access outside designated business hours or from unexpected locations
     */
    async detectAnomalousAccess(userId: string, ipAddress: string, action: string) {
        try {
            // Check for access during "Ghost Hours" (e.g., 2 AM - 5 AM) for sensitive actions
            const hour = new Date().getHours();
            if ((hour >= 2 && hour <= 5) && ['DELETE', 'DOWNLOAD_ALL'].some(a => action.includes(a))) {
                const event = new SecurityEvent({
                    type: 'ANOMALY',
                    severity: 'HIGH',
                    affectedUsers: [userId],
                    sourceIp: ipAddress,
                    description: `Sensitive action '${action}' detected during suspicious hours (Ghost Hours)`,
                    evidence: { hour, action, ipAddress }
                });
                await event.save();

                // Phase 3 - Automated Alerts
                const { sendSecurityAlert } = await import('./emailService.js');
                await sendSecurityAlert(event.type, event.severity, event.description, event.evidence);
            }
        } catch (error) {
            logger.error('Error in detectAnomalousAccess:', error);
        }
    }
}

export const securityDetectionService = new SecurityDetectionService();
