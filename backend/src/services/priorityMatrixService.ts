/**
 * Priority Matrix Service
 * Implements ITIL-standard priority calculation based on Impact and Urgency.
 */

export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent' | 'critical';

const matrix: Record<ImpactLevel, Record<UrgencyLevel, PriorityLevel>> = {
  critical: {
    critical: 'critical',
    high: 'critical',
    medium: 'urgent',
    low: 'high',
  },
  high: {
    critical: 'critical',
    high: 'urgent',
    medium: 'high',
    low: 'medium',
  },
  medium: {
    critical: 'urgent',
    high: 'high',
    medium: 'medium',
    low: 'low',
  },
  low: {
    critical: 'high',
    high: 'medium',
    medium: 'low',
    low: 'low',
  },
};

export const calculatePriority = (impact: ImpactLevel, urgency: UrgencyLevel): PriorityLevel => {
  return matrix[impact][urgency] || 'medium';
};
