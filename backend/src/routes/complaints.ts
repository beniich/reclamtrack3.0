import { Router } from 'express';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { protect } from '../middleware/auth.js';
import { Complaint } from '../models/Complaint.js';
import { io } from '../services/socketService.js';

const router = Router();

/* GET /api/complaints */
router.get('/', async (req, res, next) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        next(err);
    }
});

/* POST /api/complaints */
router.post(
    '/',
    [
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('address').notEmpty(),
        body('phone').notEmpty(),
        body('leakType').notEmpty()
    ],
    validator,
    async (req, res, next) => {
        try {
            const complaint = await Complaint.create(req.body);
            // Emit real-time event
            if (io) {
                io.emit('new-complaint', complaint);
            }
            res.status(201).json(complaint);
        } catch (err) {
            next(err);
        }
    }
);

/* PATCH /api/complaints/:id */
router.patch(
    '/:id',
    [
        param('id').isMongoId(),
        body('status').isIn(['nouvelle', 'en cours', 'résolue', 'fermée'])
    ],
    validator,
    async (req, res, next) => {
        try {
            const updated = await Complaint.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
                { new: true }
            );
            if (!updated) return res.status(404).json({ message: 'Réclamation introuvable' });

            if (io) {
                io.emit('complaint-updated', updated);
            }
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
