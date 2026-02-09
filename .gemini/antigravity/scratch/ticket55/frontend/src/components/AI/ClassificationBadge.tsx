'use client';

import React from 'react';

interface ClassificationBadgeProps {
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    confidence: number;
}

export const ClassificationBadge = ({
    category,
    subcategory,
    priority,
    confidence
}: ClassificationBadgeProps) => {
    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700';
            case 'high':
                return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'Urgente';
            case 'high': return 'Haute';
            case 'medium': return 'Moyenne';
            case 'low': return 'Basse';
            default: return priority;
        }
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 80) return 'text-green-600 dark:text-green-400';
        if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="flex flex-wrap gap-3 items-center">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${getPriorityStyles(priority)}`}>
                <span className="font-semibold">{category}</span>
                <span className="opacity-60">•</span>
                <span className="text-xs">{subcategory}</span>
                <span className="opacity-60">•</span>
                <span className="capitalize text-xs font-bold">{getPriorityLabel(priority)}</span>
            </div>

            <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`text-sm font-semibold ${getConfidenceColor(confidence)}`}>
                    {confidence}% confiance
                </span>
            </div>
        </div>
    );
};
