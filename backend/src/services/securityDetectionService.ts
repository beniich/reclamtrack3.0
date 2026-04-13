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
                    
                    // In a real scenario, we might trigger a webhook/email here for CRITICAL
                }
            }
        } catch (error) {
            logger.error('Error in detectBruteForce:', error);
        }
    }

    /**
     * Checks for access outside designated business hours or impossible travel
     */
    async detectAnomalousAccess(userId: string, ipAddress: string) {
        // Implementation for behavioral analysis 
        // e.g. Accessing from a new country suddenly
        return; 
    }
}

export const securityDetectionService = new SecurityDetectionService();
