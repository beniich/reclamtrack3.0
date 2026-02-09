import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { Team } from '../models/Team.js';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';

const router = Router();

/* GET /api/teams */
router.get('/', async (req, res, next) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        next(err);
    }
});

/* POST /api/teams */
router.post(
    '/',
    protect,
    adminOnly,
    [
        body('name').notEmpty(),
        body('status').optional().isIn(['disponible', 'intervention', 'repos'])
    ],
    validator,
    async (req, res, next) => {
        try {
            const team = await Team.create(req.body);
            res.status(201).json(team);
        } catch (err) {
            next(err);
        }
    }
);

/* PATCH /api/teams/:id */
router.patch(
    '/:id',
    protect,
    adminOnly,
    [
        param('id').isMongoId(),
        body('status').isIn(['disponible', 'intervention', 'repos'])
    ],
    validator,
    async (req, res, next) => {
        try {
            const team = await Team.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
                { new: true }
            );
            if (!team) return res.status(404).json({ message: 'Équipe introuvable' });
            res.json(team);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
