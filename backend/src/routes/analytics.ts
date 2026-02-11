import { Router, Request, Response } from 'express';
import { protect as auth } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = Router();

// GET /api/analytics/satisfaction - Métriques de satisfaction
router.get('/satisfaction', auth, async (req: Request, res: Response) => {
    try {
        const { range = '30d' } = req.query;

        // Données mockées pour démonstration
        const satisfactionData = {
            averageRating: 4.2,
            satisfactionRate: 85,
            totalResponses: 1247,
            averageResponseTime: '2.3h',
            trends: {
                rating: '+0.3',
                satisfactionRate: '+5%',
                responseTime: '-15min'
            },
            distribution: [
                { name: 'Très satisfait', value: 45, color: '#22c55e' },
                { name: 'Satisfait', value: 30, color: '#84cc16' },
                { name: 'Neutre', value: 15, color: '#eab308' },
                { name: 'Insatisfait', value: 7, color: '#f97316' },
                { name: 'Très insatisfait', value: 3, color: '#ef4444' }
            ],
            categoryRatings: [
                { category: 'Eau', rating: 4.2, max: 5 },
                { category: 'Routes', rating: 3.8, max: 5 },
                { category: 'Déchets', rating: 4.5, max: 5 },
                { category: 'Électricité', rating: 4.1, max: 5 },
                { category: 'Éclairage', rating: 3.9, max: 5 }
            ],
            monthlyTrend: [
                { month: 'Jan', satisfied: 72, neutral: 18, unsatisfied: 10 },
                { month: 'Fév', satisfied: 75, neutral: 16, unsatisfied: 9 },
                { month: 'Mar', satisfied: 78, neutral: 15, unsatisfied: 7 },
                { month: 'Avr', satisfied: 80, neutral: 14, unsatisfied: 6 },
                { month: 'Mai', satisfied: 82, neutral: 13, unsatisfied: 5 },
                { month: 'Juin', satisfied: 85, neutral: 11, unsatisfied: 4 }
            ],
            feedbackKeywords: [
                { word: 'rapide', count: 234, sentiment: 'positive' },
                { word: 'professionnel', count: 198, sentiment: 'positive' },
                { word: 'efficace', count: 176, sentiment: 'positive' },
                { word: 'lent', count: 87, sentiment: 'negative' },
                { word: 'excellent', count: 145, sentiment: 'positive' },
                { word: 'retard', count: 62, sentiment: 'negative' }
            ],
            recentFeedback: [
                {
                    id: 1,
                    rating: 5,
                    comment: 'Excellent service, problème résolu rapidement!',
                    category: 'Eau',
                    date: '2025-02-08'
                },
                {
                    id: 2,
                    rating: 4,
                    comment: 'Bonne prise en charge, équipe professionnelle',
                    category: 'Routes',
                    date: '2025-02-08'
                },
                {
                    id: 3,
                    rating: 2,
                    comment: 'Délai trop long, mais bon résultat final',
                    category: 'Électricité',
                    date: '2025-02-07'
                }
            ]
        };

        res.json({
            success: true,
            data: satisfactionData,
            range
        });
    } catch (error) {
        logger.error('Erreur récupération satisfaction:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des données'
        });
    }
});

// GET /api/analytics/performance - Métriques de performance
router.get('/performance', auth, async (req: Request, res: Response) => {
    try {
        const performanceData = {
            averageResolutionTime: '4.2 jours',
            firstResponseTime: '2.3 heures',
            completionRate: 87,
            onTimeRate: 92,
            byCategory: [
                { category: 'Eau', avgTime: '3.5 jours', completionRate: 90 },
                { category: 'Routes', avgTime: '5.2 jours', completionRate: 85 },
                { category: 'Électricité', avgTime: '2.8 jours', completionRate: 95 },
                { category: 'Déchets', avgTime: '1.5 jours', completionRate: 98 }
            ],
            byTeam: [
                { team: 'Équipe A', avgTime: '3.8 jours', completionRate: 92 },
                { team: 'Équipe B', avgTime: '4.5 jours', completionRate: 88 },
                { team: 'Équipe C', avgTime: '3.2 jours', completionRate: 94 }
            ]
        };

        res.json({
            success: true,
            data: performanceData
        });
    } catch (error) {
        logger.error('Erreur récupération performance:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des données'
        });
    }
});

// GET /api/analytics/heatmap - Données pour carte de chaleur
router.get('/heatmap', auth, async (req: Request, res: Response) => {
    try {
        const { category, priority, startDate, endDate } = req.query;

        // Données mockées de points chauds
        const heatmapData = [
            {
                lat: 33.5731,
                lng: -7.5898,
                intensity: 0.8,
                complaint: {
                    id: 'c1',
                    category: 'Eau',
                    priority: 'high',
                    status: 'pending'
                }
            },
            {
                lat: 33.5751,
                lng: -7.5918,
                intensity: 0.6,
                complaint: {
                    id: 'c2',
                    category: 'Routes',
                    priority: 'medium',
                    status: 'in_progress'
                }
            },
            {
                lat: 33.5771,
                lng: -7.5938,
                intensity: 0.9,
                complaint: {
                    id: 'c3',
                    category: 'Électricité',
                    priority: 'urgent',
                    status: 'pending'
                }
            }
        ];

        res.json({
            success: true,
            data: heatmapData,
            filters: { category, priority, startDate, endDate }
        });
    } catch (error) {
        logger.error('Erreur récupération heatmap:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des données'
        });
    }
});

export default router;
