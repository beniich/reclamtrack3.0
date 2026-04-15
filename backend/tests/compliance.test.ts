import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { ComplianceService } from '../src/services/complianceService';

const mockUser = {
  find: jest.fn(),
};

const mockSecurityEvent = {
  find: jest.fn(),
  aggregate: jest.fn(),
};

const mockAuditLog = {
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
};

// Mock models
jest.mock('../src/models/User', () => ({ User: mockUser }));
jest.mock('../src/models/SecurityEvent', () => ({ default: mockSecurityEvent }));

describe('ComplianceService', () => {
    let service: ComplianceService;

    beforeEach(() => {
        service = new ComplianceService();
        jest.clearAllMocks();
    });

    describe('calculateOverallScore', () => {
        it('should return 100 for perfect stats', () => {
            const iamStats = { mfaAdoptionRate: 100, stalePasswordRate: 0 };
            const securityEvents = { openCritical: 0, openHigh: 0 };
            const auditStats = { health: 'ACTIVE' };

            // @ts-ignore - accessing private method for test
            const score = service.calculateOverallScore(iamStats, securityEvents, auditStats);
            expect(score).toBe(100);
        });

        it('should reduce score for low MFA adoption', () => {
            const iamStats = { mfaAdoptionRate: 50, stalePasswordRate: 0 };
            const securityEvents = { openCritical: 0, openHigh: 0 };
            const auditStats = { health: 'ACTIVE' };

            // 100 - (50 * 0.3) = 100 - 15 = 85
            // @ts-ignore
            const score = service.calculateOverallScore(iamStats, securityEvents, auditStats);
            expect(score).toBe(85);
        });

        it('should reduce score for open critical events', () => {
            const iamStats = { mfaAdoptionRate: 100, stalePasswordRate: 0 };
            const securityEvents = { openCritical: 2, openHigh: 0 };
            const auditStats = { health: 'ACTIVE' };

            // 100 - (2 * 15) = 70
            // @ts-ignore
            const score = service.calculateOverallScore(iamStats, securityEvents, auditStats);
            expect(score).toBe(70);
        });

        it('should reduce score for inactive audit logging', () => {
            const iamStats = { mfaAdoptionRate: 100, stalePasswordRate: 0 };
            const securityEvents = { openCritical: 0, openHigh: 0 };
            const auditStats = { health: 'INACTIVE' };

            // 100 - 20 = 80
            // @ts-ignore
            const score = service.calculateOverallScore(iamStats, securityEvents, auditStats);
            expect(score).toBe(80);
        });
    });

    describe('getControlMaturity', () => {
        it('should return PASS status for active logging', () => {
            const iamStats = { mfaAdoptionRate: 100, stalePasswordRate: 0 };
            const securityEvents = { openCritical: 0, openHigh: 0 };
            const auditStats = { health: 'ACTIVE', eventsLast24h: 10 };

            // @ts-ignore
            const controls = service.getControlMaturity(iamStats, securityEvents, auditStats);
            const loggingControl = controls.find((c: any) => c.name === 'Event Logging & Monitoring');
            expect(loggingControl?.status).toBe('PASS');
        });

        it('should return FAIL status for low MFA', () => {
            const iamStats = { mfaAdoptionRate: 20, totalUsers: 10, mfaEnabledCount: 2 };
            const securityEvents = { openCritical: 0 };
            const auditStats = { health: 'ACTIVE' };

            // @ts-ignore
            const controls = service.getControlMaturity(iamStats, securityEvents, auditStats);
            const mfaControl = controls.find((c: any) => c.name === 'Access Control (MFA)');
            expect(mfaControl?.status).toBe('FAIL');
        });
    });
});
