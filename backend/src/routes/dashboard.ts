import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { Complaint } from '../models/Complaint.js';
import { Team } from '../models/Team.js';
import { Assignment } from '../models/Assignment.js';

const router = Router();

/* GET /api/dashboard */
router.get('/', protect, async (req, res, next) => {
    try {
        const totalComplaints = await Complaint.countDocuments();
        const activeComplaints = await Complaint.countDocuments({ status: { $ne: 'fermée' } });

        const teamStats = await Team.aggregate([
            {
                $lookup: {
                    from: 'assignments',
                    localField: '_id',
                    foreignField: 'teamId',
                    as: 'assignments'
                }
            },
            {
                $project: {
                    name: 1,
                    activeAssignments: {
                        $size: {
                            $filter: {
                                input: '$assignments',
                                as: 'a',
                                cond: { $ne: ['$$a.status', 'terminé'] }
                            }
                        }
                    }
                }
            }
        ]);

        res.json({
            totalComplaints,
            activeComplaints,
            teamStats
        });
    } catch (err) {
        next(err);
    }
});

export default router;
