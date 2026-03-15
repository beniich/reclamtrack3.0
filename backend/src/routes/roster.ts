import { Router } from 'express';
import { authenticate, requireOrganization } from '../middleware/security.js';
import { Leave } from '../models/Leave.js';
import { Roster } from '../models/Roster.js';

const router = Router();

router.get('/', authenticate, requireOrganization, async (req: any, res, next) => {
  try {
    const { week } = req.query;
    const filter: any = { week, organizationId: req.organizationId };

    const roster = await Roster.findOne(filter).populate('shifts.staffId');

    if (!roster) {
      return res.json({ week, shifts: [] });
    }

    res.json(roster);
  } catch (err) {
    next(err);
  }
});

router.post('/update', authenticate, requireOrganization, async (req: any, res, next) => {
  try {
    const { week, shifts } = req.body;
    const organizationId = req.organizationId;

    // Simple validation: Check for leaves
    const staffIds = shifts.map((s: any) => s.staffId);
    const activeLeaves = await Leave.find({
      staffId: { $in: staffIds },
      status: 'Approved',
      organizationId,
    });

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

router.delete(
  '/shifts/:shiftId',
  authenticate,
  requireOrganization,
  async (req: any, res, next) => {
    try {
      const { week } = req.body;
      const organizationId = req.organizationId;

      const roster = await Roster.findOneAndUpdate(
        { week, organizationId },
        { $pull: { shifts: { _id: req.params.shiftId } } },
        { new: true }
      );
      res.json(roster);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
