import { describe, expect, it } from '@jest/globals';
import { calculatePriority } from '../src/services/priorityMatrixService';

describe('GMAO Priority Matrix', () => {
    it('should return critical for critical impact and critical urgency', () => {
        expect(calculatePriority('critical', 'critical')).toBe('critical');
    });

    it('should return urgent for critical impact and medium urgency', () => {
        expect(calculatePriority('critical', 'medium')).toBe('urgent');
    });

    it('should return urgent for high impact and critical urgency', () => {
        expect(calculatePriority('high', 'critical')).toBe('critical');
    });

    it('should return low for medium impact and low urgency', () => {
        expect(calculatePriority('medium', 'low')).toBe('low');
    });

    it('should return low for low impact and low urgency', () => {
        expect(calculatePriority('low', 'low')).toBe('low');
    });

    it('should return medium for low impact and high urgency', () => {
        expect(calculatePriority('low', 'high')).toBe('medium');
    });

    it('should return medium for high impact and low urgency', () => {
        expect(calculatePriority('high', 'low')).toBe('medium');
    });

    it('should return medium as default for unknown values', () => {
        // @ts-ignore
        expect(calculatePriority('unknown', 'unknown')).toBe('medium');
    });
});
