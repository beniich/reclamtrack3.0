'use client';

import { CheckCircle, Brain, AlertTriangle, Sparkles } from 'lucide-react';

interface AIClassification {
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    urgencyScore: number;
    reasoning: string;
    suggestedTeam?: string;
    estimatedDuration?: string;
}

interface Props {
    classification: AIClassification;
    onOverride?: () => void;
    isLoading?: boolean;
}

export const AIClassificationIndicator = ({ classification, onOverride, isLoading }: Props) => {
    if (isLoading) {
        return (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg animate-pulse">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-blue-600">Classification en cours...</p>
                        <p className="text-xs text-gray-500 mt-1">Analyse IA de la réclamation</p>
                    </div>
                </div>
            </div>
        );
    }

    const priorityColors = {
        urgent: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        high: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
        medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        low: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    };

    const priorityLabels = {
        urgent: 'Urgente',
        high: 'Haute',
        medium: 'Moyenne',
        low: 'Basse'
    };

    const confidenceColor = classification.urgencyScore >= 80 ? 'text-green-600' :
        classification.urgencyScore >= 60 ? 'text-yellow-600' :
            'text-orange-600';

    const showWarning = classification.urgencyScore < 70;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 space-y-4 shadow-sm">
            {/* Header */}
            <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-lg shrink-0">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm flex items-center gap-2 text-gray-900 dark:text-white">
                        <span>Classification Automatique par IA</span>
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                        {classification.reasoning}
                    </p>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                        Catégorie
                    </p>
                    <p className="font-bold text-sm mt-1 text-gray-900 dark:text-white truncate">
                        {classification.category}
                    </p>
                </div>

                <div className={`rounded-lg p-3 border ${priorityColors[classification.priority]}`}>
                    <p className="text-[10px] opacity-75 uppercase font-semibold tracking-wider">
                        Priorité
                    </p>
                    <p className="font-bold text-sm mt-1 capitalize">
                        {priorityLabels[classification.priority]}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                        Confiance IA
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                        <p className={`font-bold text-sm ${confidenceColor}`}>
                            {classification.urgencyScore}%
                        </p>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-auto mb-0.5">
                            <div
                                className={`h-full rounded-full transition-all ${classification.urgencyScore >= 80 ? 'bg-green-600' :
                                        classification.urgencyScore >= 60 ? 'bg-yellow-600' :
                                            'bg-orange-600'
                                    }`}
                                style={{ width: `${classification.urgencyScore}%` }}
                            />
                        </div>
                    </div>
                </div>

                {classification.estimatedDuration && (
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
                            Durée Estimée
                        </p>
                        <p className="font-bold text-sm mt-1 text-gray-900 dark:text-white">
                            {classification.estimatedDuration}
                        </p>
                    </div>
                )}
            </div>

            {/* Suggested Team */}
            {classification.suggestedTeam && (
                <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 border border-blue-200 dark:border-blue-800/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span className="font-semibold">Équipe suggérée:</span>{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {classification.suggestedTeam}
                        </span>
                    </p>
                </div>
            )}

            {/* Warning */}
            {showWarning && (
                <div className="flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                        <span className="font-semibold">Confiance faible</span> -
                        Vérification manuelle recommandée avant traitement
                    </p>
                </div>
            )}

            {/* Override Button */}
            {onOverride && (
                <button
                    onClick={onOverride}
                    className="w-full text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                    Modifier la classification manuellement
                </button>
            )}
        </div>
    );
};
