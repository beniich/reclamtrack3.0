import { Request, Response, NextFunction } from 'express';
import AuditLog from '../models/AuditLog.js';
import { logger } from '../utils/logger.js';

export const auditTrail = (category: 'AUTH' | 'DATA_ACCESS' | 'CONFIG_CHANGE' | 'SECURITY' | 'COMPLIANCE' | 'SYSTEM' = 'DATA_ACCESS', severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'INFO') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Intercept response to capture status code
        const originalSend = res.send;
        let outcome: 'SUCCESS' | 'FAILURE' | 'BLOCKED' = 'SUCCESS';

        res.send = function (body) {
            if (res.statusCode >= 400 && res.statusCode < 500) outcome = 'BLOCKED';
            if (res.statusCode >= 500) outcome = 'FAILURE';
            return originalSend.call(this, body);
        };

        res.on('finish', async () => {
             // Exclude OPTIONS & basic GET (unless it's a specific HIGH/CRITICAL data access like exports)
             if (req.method === 'OPTIONS') return;
             if (req.method === 'GET' && severity === 'INFO') return; // Don't spam DB with every GET

             try {
                 const log = new AuditLog({
                     action: `${req.method} ${req.route?.path || req.path}`,
                     userId: (req as any).user?._id || (req as any).user?.id,
                     organizationId: (req as any).organizationId,
                     category,
                     severity,
                     outcome,
                     ipAddress: req.ip,
                     userAgent: req.get('user-agent'),
                     sessionId: req.headers['x-session-id'] || null,
                     requestId: (req as any).id, // From pino-http
                     details: {
                         body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? maskSensitiveData(req.body) : undefined,
                         query: req.query,
                         params: req.params,
                         statusCode: res.statusCode
                     }
                 });
                 await log.save();
             } catch (error) {
                 logger.error('Failed to save audit log:', error);
                 // We don't block the response if audit fails, but we loudly complain in server logs
             }
        });

        next();
    };
};

// Basic data masking to prevent sensitive info in DB
const maskSensitiveData = (body: any) => {
    if (!body) return body;
    const masked = { ...body };
    const sensitiveKeys = ['password', 'token', 'secret', 'creditCard', 'apiKey'];
    
    for (const key of Object.keys(masked)) {
        if (sensitiveKeys.some(k => key.toLowerCase().includes(k))) {
            masked[key] = '***MASKED***';
        }
    }
    return masked;
};
