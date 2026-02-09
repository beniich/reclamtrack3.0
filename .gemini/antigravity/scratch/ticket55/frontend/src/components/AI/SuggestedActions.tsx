'use client';

import React from 'react';
import { Lightbulb, Clock } from 'lucide-react';

interface SuggestedActionsProps {
    actions: string[];
    estimatedTime: number;
    departments?: string[];
}

export const SuggestedActions = ({
    actions,
    estimatedTime,
    departments = []
}: SuggestedActionsProps) => {
    if (!actions || actions.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mt-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Actions Suggérées par l'IA
                </h3>
            </div>

            <ul className="space-y-2.5 mb-4">
                {actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full  bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                            {action}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="pt-4 border-t border-blue-200 dark:border-blue-800 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                        Temps estimé de résolution:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {estimatedTime} heure{estimatedTime > 1 ? 's' : ''}
                    </span>
                </div>

                {departments && departments.length > 0 && (
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        <span className="text-gray-600 dark:text-gray-400">Services concernés:</span>
                        {departments.map((dept, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                            >
                                {dept}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
