'use client';

import React, { useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { ClassificationBadge } from '@/components/AI/ClassificationBadge';
import { SuggestedActions } from '@/components/AI/SuggestedActions';

export default function TestAIPage() {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [classification, setClassification] = useState<any>(null);
    const { classifyComplaint, loading, error, testAI } = useAI();
    const [healthStatus, setHealthStatus] = useState<any>(null);

    const handleClassify = async () => {
        if (!description.trim()) return;
        try {
            const result = await classifyComplaint(description, location);
            setClassification(result);
        } catch (err) {
            console.error('Erreur:', err);
        }
    };

    const checkHealth = async () => {
        try {
            const status = await testAI();
            setHealthStatus(status);
        } catch (err) {
            setHealthStatus({ error: 'Service indisponible' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Test IA de Classification
                </h1>
                <button
                    onClick={checkHealth}
                    className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    Vérifier Santé Service IA
                </button>
            </div>

            {healthStatus && (
                <div className={`p-4 rounded-lg text-sm ${healthStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                                Description de la réclamation
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                placeholder="Ex: Une fuite d'eau importante au niveau du croisement..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                                Lieu (Optionnel)
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Ex: Quartier Centre, Rue Principale"
                            />
                        </div>

                        <button
                            onClick={handleClassify}
                            disabled={loading || !description.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <span>✨ Classifier avec l'IA</span>
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center min-h-[300px]">
                        {!classification ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <p>Les résultats de l'analyse apparaîtront ici</p>
                            </div>
                        ) : (
                            <div className="w-full space-y-6 animate-in fade-in duration-500">
                                <div className="text-center">
                                    <ClassificationBadge
                                        category={classification.category}
                                        subcategory={classification.subcategory}
                                        priority={classification.priority}
                                        confidence={classification.confidence}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wider mb-1">Score d'urgence</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{classification.urgencyScore}/100</span>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wider mb-1">Temps estimé</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{classification.estimatedResolutionTime}h</span>
                                    </div>
                                </div>

                                <SuggestedActions
                                    actions={classification.suggestedActions}
                                    estimatedTime={classification.estimatedResolutionTime}
                                    departments={classification.departmentsInvolved}
                                />

                                <div className="text-xs text-gray-400 mt-4 text-center">
                                    Analyse générée par IA • {new Date().toLocaleTimeString()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
