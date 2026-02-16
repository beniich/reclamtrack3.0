import { Router, Request, Response } from 'express';
import { protect as auth } from '../middleware/auth.js';
import { requireOrganization } from '../middleware/organization.js';
import { logger } from '../utils/logger.js';
import { Feedback } from '../models/Feedback.js';
import { Complaint } from '../models/Complaint.js';

const router = Router();

// Apply organization context
router.use(auth, requireOrganization);

// GET /api/analytics/satisfaction - Métriques de satisfaction
router.get('/satisfaction', async (req: Request, res: Response) => {
    try {
        const { range = '30d' } = req.query;
        // Date fltering logic can be added here based on 'range'
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // Default 30 days

        const matchStage: any = {
            createdAt: { $gte: startDate },
            organizationId: (req as any).organizationId
        };

        // 1. Calculate Average Rating & Total Responses
        const ratingStats = await Feedback.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalResponses: { $sum: 1 },
                    // Calculate satisfaction rate (ratings >= 4)
                    satisfiedCount: {
                        $sum: { $cond: [{ $gte: ['$rating', 4] }, 1, 0] }
                    }
                }
            }
        ]);

        const stats = ratingStats[0] || { averageRating: 0, totalResponses: 0, satisfiedCount: 0 };
        const satisfactionRate = stats.totalResponses > 0
            ? Math.round((stats.satisfiedCount / stats.totalResponses) * 100)
            : 0;

        // 2. Rating Distribution
        const distribution = await Feedback.aggregate([
            { $match: matchStage },
            { $group: { _id: '$rating', count: { $sum: 1 } } },
            { $sort: { _id: -1 } }
        ]);

        // Map distribution to UI format
        const distributionMap: Record<number, any> = {
            5: { name: 'Très satisfait', color: '#22c55e' },
            4: { name: 'Satisfait', color: '#84cc16' },
            3: { name: 'Neutre', color: '#eab308' },
            2: { name: 'Insatisfait', color: '#f97316' },
            1: { name: 'Très insatisfait', color: '#ef4444' }
        };

        const formattedDistribution = [5, 4, 3, 2, 1].map(rating => ({
            name: distributionMap[rating].name,
            value: distribution.find(d => d._id === rating)?.count || 0,
            color: distributionMap[rating].color
        }));

        // 3. Category Ratings
        const categoryRatings = await Feedback.aggregate([
            { $match: matchStage },
            { $group: { _id: '$category', rating: { $avg: '$rating' } } },
            { $project: { category: '$_id', rating: { $round: ['$rating', 1] }, max: { $literal: 5 } } }
        ]);

        // 4. Recent Feedback
        const recentFeedback = await Feedback.find(matchStage)
            .sort({ createdAt: -1 })
            .limit(5)
            .select('rating comment category createdAt');

        // Construct response
        const satisfactionData = {
            averageRating: stats.averageRating ? Number(stats.averageRating.toFixed(1)) : 0,
            satisfactionRate,
            totalResponses: stats.totalResponses,
            averageResponseTime: '2.3h', // Placeholder - requires specific feedback/complaint linking
            trends: {
                rating: '+0.0', // Requires comparing with previous period
                satisfactionRate: '+0%',
                responseTime: '0min'
            },
            distribution: formattedDistribution,
            categoryRatings,
            monthlyTrend: [], // Can be implemented with detailed aggregation
            feedbackKeywords: [], // Requires NLP or simple word count
            recentFeedback: recentFeedback.map(f => ({
                id: f._id,
                rating: f.rating,
                comment: f.comment,
                category: f.category,
                date: f.createdAt.toISOString().split('T')[0]
            }))
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
router.get('/performance', async (req: Request, res: Response) => {
    try {
        // 1. Completion Rate
        const organizationId = (req as any).organizationId;
        const totalComplaints = await Complaint.countDocuments({ organizationId });
        const resolvedComplaints = await Complaint.countDocuments({ organizationId, status: { $in: ['résolue', 'fermée'] } });
        const completionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;

        // 2. By Category stats
        const byCategory = await Complaint.aggregate([
            { $match: { organizationId: new mongoose.Types.ObjectId(organizationId) } },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: 1 },
                    resolved: {
                        $sum: { $cond: [{ $in: ['$status', ['résolue', 'fermée']] }, 1, 0] }
                    },
                    // Calculate avg resolution time (diff between updatedAt and createdAt for resolved)
                    totalDuration: {
                        $sum: {
                            $cond: [
                                { $in: ['$status', ['résolue', 'fermée']] },
                                { $subtract: ['$updatedAt', '$createdAt'] },
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    category: '$_id',
                    completionRate: {
                        $cond: [{ $eq: ['$total', 0] }, 0, { $multiply: [{ $divide: ['$resolved', '$total'] }, 100] }]
                    },
                    avgTimeMs: {
                        $cond: [{ $eq: ['$resolved', 0] }, 0, { $divide: ['$totalDuration', '$resolved'] }]
                    }
                }
            }
        ]);

        // Format duration
        const formatDuration = (ms: number) => {
            if (!ms) return 'N/A';
            const days = Math.round(ms / (1000 * 60 * 60 * 24));
            return `${days} jours`;
        };

        const formattedByCategory = byCategory.map(c => ({
            category: c.category,
            completionRate: Math.round(c.completionRate),
            avgTime: formatDuration(c.avgTimeMs)
        }));

        const performanceData = {
            averageResolutionTime: 'N/A', // Global avg can be calculated similarly
            firstResponseTime: 'N/A',
            completionRate,
            onTimeRate: 92, // Requires SLA logic
            byCategory: formattedByCategory,
            byTeam: [] // Requires Team aggregation
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
router.get('/heatmap', async (req: Request, res: Response) => {
    try {
        const { category, priority, startDate, endDate } = req.query;

        const filter: any = {
            latitude: { $exists: true, $ne: null },
            longitude: { $exists: true, $ne: null },
            organizationId: (req as any).organizationId
        };

        if (category) filter.category = category;
        if (priority) filter.priority = priority;

        const complaints = await Complaint.find(filter).select('latitude longitude category priority status');

        const heatmapData = complaints.map(c => ({
            lat: c.latitude,
            lng: c.longitude,
            intensity: c.priority === 'urgent' ? 1 : c.priority === 'high' ? 0.8 : 0.5,
            complaint: {
                id: c._id,
                category: c.category,
                priority: c.priority,
                status: c.status
            }
        }));

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

// GET /api/analytics/dashboard - Dashboard global metrics
router.get('/dashboard', async (req: Request, res: Response) => {
    try {
        const organizationId = (req as any).organizationId;
        // Aggregate high-level stats
        const totalComplaints = await Complaint.countDocuments({ organizationId });
        const activeComplaints = await Complaint.countDocuments({ organizationId, status: { $in: ['nouveau', 'en cours', 'attribuée'] } });
        const resolvedComplaints = await Complaint.countDocuments({ organizationId, status: { $in: ['résolue', 'fermée'] } });

        // Mock feedback avg for now if Feedback model is empty
        const avgSatisfaction = 4.2;

        res.json({
            success: true,
            data: {
                totalComplaints,
                activeComplaints,
                resolvedComplaints,
                avgSatisfaction,
                complaintsByStatus: {
                    new: await Complaint.countDocuments({ organizationId, status: 'nouveau' }),
                    assigned: await Complaint.countDocuments({ organizationId, status: 'attribuée' }),
                    inProgress: await Complaint.countDocuments({ organizationId, status: 'en cours' }),
                    resolved: await Complaint.countDocuments({ organizationId, status: 'résolue' }),
                    closed: await Complaint.countDocuments({ organizationId, status: 'fermée' })
                }
            }
        });
    } catch (error) {
        logger.error('Erreur dashboard analytics:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});

// GET /api/analytics/complaints - Detailed complaint stats
router.get('/complaints', async (req: Request, res: Response) => {
    // Redirect to performance which has similar data
    req.url = '/performance';
    router.handle(req, res);
});

// GET /api/analytics/teams - Team performance stats
router.get('/teams', async (req: Request, res: Response) => {
    // Placeholder: In a real app, this would aggregate from Team and Complaint models
    res.json({
        success: true,
        data: {
            totalTeams: 5,
            activeMembers: 12,
            avgResponseTime: '35min',
            topTeams: []
        }
    });
});

// GET /api/analytics/export/:type
router.get('/export/:type', async (req: Request, res: Response) => {
    const { type } = req.params;
    // Mock file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=report-${type}-${Date.now()}.pdf`);
    res.send('PDF Report Content Placeholder');
});

export default router;
