import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { body } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { Assignment } from '../models/Assignment.js';
import { Complaint } from '../models/Complaint.js';
import { Team } from '../models/Team.js';
import { io } from '../services/socketService.js';

const router = Router();

/* POST /api/assignments */
router.post(
    '/',
    protect,
    [
        body('complaintId').isMongoId(),
        body('teamId').isMongoId()
    ],
    validator,
    async (req, res, next) => {
        try {
            const { complaintId, teamId } = req.body;

            const complaint = await Complaint.findById(complaintId);
            const team = await Team.findById(teamId);
            if (!complaint || !team) {
                return res.status(404).json({ message: 'Réclamation ou équipe introuvable' });
            }

            const assignment = await Assignment.create({
                complaintId,
                teamId,
                status: 'affecté'
            });

            complaint.status = 'en cours';
            await complaint.save();

            team.status = 'intervention';
            await team.save();

            if (io) {
                io.emit('assignment-created', { assignment, complaint, team });
            }

            res.status(201).json(assignment);
        } catch (err) {
            next(err);
        }
    }
);

/* PATCH /api/assignments/:id */
router.patch(
    '/:id',
    protect,
    [
        body('status').isIn(['affecté', 'en cours', 'terminé'])
    ],
    validator,
    async (req, res, next) => {
        try {
            const assignment = await Assignment.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
                { new: true }
            );
            if (!assignment) return res.status(404).json({ message: 'Affectation introuvable' });

            if (io) {
                io.emit('assignment-updated', assignment);
            }
            res.json(assignment);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
