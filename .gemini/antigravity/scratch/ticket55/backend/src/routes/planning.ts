import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { PlanningSlot } from '../models/PlanningSlot.js';

const router = Router();

/* GET /api/planning/slots */
router.get('/slots', async (req, res, next) => {
    try {
        const slots = await PlanningSlot.find()
            .populate('teamId', 'name')
            .populate('complaintId', 'number')
            .sort({ start: 1 });

        // Transform to include teamName for frontend
        const transformed = slots.map(slot => ({
            _id: slot._id,
            teamId: slot.teamId._id,
            teamName: (slot.teamId as any).name,
            start: slot.start,
            end: slot.end,
            complaintNumber: slot.complaintId ? (slot.complaintId as any).number : null
        }));

        res.json(transformed);
    } catch (err) {
        next(err);
    }
});

/* POST /api/planning/slots */
router.post(
    '/slots',
    protect,
    adminOnly,
    [
        body('teamId').isMongoId(),
        body('start').isISO8601(),
        body('end').isISO8601(),
        body('complaintId').optional().isMongoId()
    ],
    validator,
    async (req, res, next) => {
        try {
            const slot = await PlanningSlot.create(req.body);
            res.status(201).json(slot);
        } catch (err) {
            next(err);
        }
    }
);

/* DELETE /api/planning/slots/:id */
router.delete(
    '/slots/:id',
    protect,
    adminOnly,
    [param('id').isMongoId()],
    validator,
    async (req, res, next) => {
        try {
            await PlanningSlot.findByIdAndDelete(req.params.id);
            res.json({ message: 'Créneau supprimé' });
        } catch (err) {
            next(err);
        }
    }
);

export default router;
