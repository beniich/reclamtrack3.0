import { Router } from 'express';
import { authenticate as protect } from '../middleware/security.js';
import { Leave } from '../models/Leave.js';
import { Roster } from '../models/Roster.js';

const router = Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const { week } = req.query;
    const filter: any = { week };
    if (req.user?.organizationId) {
      filter.organizationId = req.user.organizationId;
    }

    const roster = await Roster.findOne(filter).populate('shifts.staffId');

    if (!roster) {
      return res.json({ week, shifts: [] });
    }

    res.json(roster);
  } catch (err) {
    next(err);
  }
});

router.post('/update', protect, async (req, res, next) => {
  try {
    const { week, shifts } = req.body;
    const organizationId = req.user?.organizationId;

    // Simple validation: Check for leaves
    // In a real app, we'd more accurately check the specific day/time,
    // but for now let's flag if they have ANY approved leave this week.
    const staffIds = shifts.map((s: any) => s.staffId);
    const activeLeaves = await Leave.find({
      staffId: { $in: staffIds },
      status: 'Approved',
      organizationId,
    });

    // Add validation logic or warnings to the response
    // For now, we'll just allow it but we could return conflicts

    const roster = await Roster.findOneAndUpdate(
      { week, organizationId },
      { week, shifts, organizationId },
      { upsert: true, new: true }
    );
    res.json(roster);
  } catch (err) {
    next(err);
  }
});

router.delete('/shifts/:shiftId', protect, async (req, res, next) => {
  try {
    const { week } = req.body; // or query
    const organizationId = req.user?.organizationId;

    const roster = await Roster.findOneAndUpdate(
      { week, organizationId },
      { $pull: { shifts: { _id: req.params.shiftId } } },
      { new: true }
    );
    res.json(roster);
  } catch (err) {
    next(err);
  }
});

export default router;
