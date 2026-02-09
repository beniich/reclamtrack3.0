import { useState } from 'react';
import api from '@/lib/api';

export interface ClassificationResult {
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    urgencyScore: number;
    confidence: number;
    suggestedActions: string[];
    estimatedResolutionTime: number;
    departmentsInvolved: string[];
}

export const useAI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const classifyComplaint = async (description: string, location?: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/ai/classify', {
                description,
                location
            });

            return response.data.classification as ClassificationResult;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur classification IA');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const generateResponse = async (classification: ClassificationResult) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/ai/response', {
                classification
            });

            return response.data.response as string;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur génération réponse');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const analyzeTrends = async (complaints: any[]) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/ai/trends', {
                complaints
            });

            return response.data.trends;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur analyse tendances');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const testAI = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get('/ai/health');
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Service IA indisponible');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        classifyComplaint,
        generateResponse,
        analyzeTrends,
        testAI,
        loading,
        error
    };
};
