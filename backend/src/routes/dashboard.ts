import { Router } from 'express';
import mongoose from 'mongoose';
import { authenticate as protect, requireOrganization } from '../middleware/security.js';
import { Complaint } from '../models/Complaint.js';
import { Team } from '../models/Team.js';

const router = Router();

/* GET /api/dashboard */
router.get('/', protect, requireOrganization, async (req: any, res, next) => {
  try {
    const organizationId = new mongoose.Types.ObjectId(req.organizationId);

    // 1. Basic Stats
    const totalComplaints = await Complaint.countDocuments({ organizationId });
    const activeComplaints = await Complaint.countDocuments({
      organizationId,
      status: { $in: ['nouvelle', 'en cours'] },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const resolvedToday = await Complaint.countDocuments({
      organizationId,
      status: { $in: ['résolue', 'fermée'] },
      updatedAt: { $gte: today },
    });

    const activeTeams = await Team.countDocuments({
      organizationId,
      status: { $in: ['disponible', 'intervention'] },
      isActive: true,
    });

    // 2. Distribution by Status
    const statusStats = await Complaint.aggregate([
      { $match: { organizationId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // 3. Distribution by Category
    const categoryStats = await Complaint.aggregate([
      { $match: { organizationId } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    // 4. Distribution by Priority
    const priorityStats = await Complaint.aggregate([
      { $match: { organizationId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    // 5. Evolution Trend (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendStats = await Complaint.aggregate([
      { $match: { organizationId, createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 6. Team Detailed Stats
    const teamStats = await Team.aggregate([
      { $match: { organizationId } },
      {
        $lookup: {
          from: 'assignments',
          localField: '_id',
          foreignField: 'teamId',
          as: 'assignments',
        },
      },
      {
        $project: {
          name: 1,
          color: 1,
          status: 1,
          activeAssignments: {
            $size: {
              $filter: {
                input: '$assignments',
                as: 'a',
                cond: { $ne: ['$$a.status', 'terminé'] },
              },
            },
          },
        },
      },
    ]);

    res.json({
      totalComplaints,
      activeComplaints,
      resolvedToday,
      activeTeams,
      // Keep legacy keys for compatibility if needed
      total: totalComplaints,
      byStatus: statusStats.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr._id]: curr.count }),
        {}
      ),
      byCategory: categoryStats,
      byPriority: priorityStats,
      trends: trendStats,
      teamStats,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
