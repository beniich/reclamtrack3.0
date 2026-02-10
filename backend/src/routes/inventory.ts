import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { Requisition, RequisitionStatus } from '../models/Requisition.js';
import { io } from '../services/socketService.js';

const router = Router();

// GET /api/inventory/requisitions
router.get('/requisitions', protect, async (req: any, res, next) => {
    try {
        const query: any = {};

        // Filter by user role ?
        // If basic user, only see own requisitions
        if (['technician', 'staff'].includes(req.user.role)) {
            query.requesterId = req.user.id;
        }

        const requisitions = await Requisition.find(query)
            .populate('requesterId', 'name email')
            .populate('complaintId', 'number')
            .sort({ createdAt: -1 });

        res.json(requisitions);
    } catch (err) {
        next(err);
    }
});

// POST /api/inventory/requisitions
router.post(
    '/requisitions',
    protect,
    [
        body('items').isArray({ min: 1 }),
        body('items.*.description').notEmpty(),
        body('items.*.quantity').isInt({ min: 1 })
    ],
    validator,
    async (req: any, res, next) => {
        try {
            const requisition = await Requisition.create({
                ...req.body,
                requesterId: req.user.id,
                status: RequisitionStatus.DRAFT,
                history: [{
                    status: RequisitionStatus.DRAFT,
                    action: 'created',
                    userId: req.user.id,
                    timestamp: new Date()
                }]
            });

            res.status(201).json(requisition);
        } catch (err) {
            next(err);
        }
    }
);

// PATCH /api/inventory/requisitions/:id/status
router.patch(
    '/requisitions/:id/status',
    protect,
    [
        param('id').isMongoId(),
        body('status').isIn(Object.values(RequisitionStatus)),
        body('comment').optional().isString()
    ],
    validator,
    async (req: any, res, next) => {
        try {
            const { status, comment } = req.body;

            const requisition = await Requisition.findById(req.params.id);
            if (!requisition) return res.status(404).json({ message: 'Requisition not found' });

            // Add simple logic check here (e.g. only warehouse_manager can approve)
            // For now, allow loosely based on role presence, assuming frontend limits actions.

            requisition.status = status;
            requisition.history.push({
                status,
                action: 'status_change',
                userId: req.user.id,
                comment,
                timestamp: new Date()
            });

            await requisition.save();

            if (io) {
                io.emit('requisition-updated', requisition);
            }

            res.json(requisition);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
