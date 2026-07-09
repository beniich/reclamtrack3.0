import { Router } from 'express';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { authenticate as protect } from '../middleware/security.js';
import { requireOrganization } from '../middleware/security.js';
import { Intervention } from '../models/Intervention.js';

const router = Router();

// Apply auth to all routes
router.use(protect, requireOrganization);

/**
 * @route   GET /api/interventions
 * @desc    Get all interventions
 * @access  Private
 */
router.get('/', async (req: any, res, next) => {
    try {
        const { status, teamId, priority } = req.query;

        const filter: Record<string, any> = {};
        if (status) filter.status = status;
        if (teamId) filter.teamId = teamId;
        if (priority) filter.priority = priority;

        const interventions = await Intervention.find(filter)
            .populate('teamId', 'name color')
            .populate('assignedTechnicians', 'name email avatar')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: interventions,
            total: interventions.length
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   GET /api/interventions/:id
 * @desc    Get intervention by ID
 * @access  Private
 */
router.get('/:id', async (req: any, res, next) => {
    try {
        const intervention = await Intervention.findById(req.params.id)
            .populate('teamId', 'name color')
            .populate('assignedTechnicians', 'name email avatar');

        if (!intervention) {
            return res.status(404).json({
                success: false,
                message: 'Intervention non trouvée'
            });
        }

        res.json({ success: true, data: intervention });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   POST /api/interventions
 * @desc    Create new intervention
 * @access  Private
 */
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Le titre est requis'),
        body('start').optional().isISO8601().toDate(),
        body('end').optional().isISO8601().toDate(),
        body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
        body('status').optional().isIn(['scheduled', 'in-progress', 'completed', 'cancelled', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'UNSCHEDULED']),
    ],
    validator,
    async (req: any, res, next) => {
        try {
            const intervention = await Intervention.create({
                ...req.body,
                // Map frontend status format to model format
                status: req.body.status === 'SCHEDULED' ? 'scheduled'
                    : req.body.status === 'IN_PROGRESS' ? 'in-progress'
                    : req.body.status === 'COMPLETED' ? 'completed'
                    : req.body.status === 'UNSCHEDULED' ? 'scheduled'
                    : req.body.status || 'scheduled',
                priority: req.body.priority?.toLowerCase() || 'medium',
                // Provide dummy values for required refs if not provided
                complaintId: req.body.complaintId || new (await import('mongoose')).default.Types.ObjectId(),
                teamId: req.body.teamId || new (await import('mongoose')).default.Types.ObjectId(),
                start: req.body.start || req.body.date ? new Date(`${req.body.date}T${req.body.startTime || '08:00'}`) : new Date(),
                end: req.body.end || req.body.date ? new Date(`${req.body.date}T${req.body.endTime || '10:00'}`) : new Date(),
            });

            res.status(201).json({
                success: true,
                data: intervention,
                message: 'Intervention créée avec succès'
            });
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @route   PUT /api/interventions/:id
 * @desc    Update intervention
 * @access  Private
 */
router.put('/:id', async (req: any, res, next) => {
    try {
        const updateData = { ...req.body };

        // Normalize status
        if (updateData.status) {
            updateData.status = updateData.status === 'SCHEDULED' ? 'scheduled'
                : updateData.status === 'IN_PROGRESS' ? 'in-progress'
                : updateData.status === 'COMPLETED' ? 'completed'
                : updateData.status === 'UNSCHEDULED' ? 'scheduled'
                : updateData.status;
        }

        const intervention = await Intervention.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: false }
        );

        if (!intervention) {
            return res.status(404).json({ success: false, message: 'Intervention non trouvée' });
        }

        res.json({ success: true, data: intervention, message: 'Intervention mise à jour' });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   DELETE /api/interventions/:id
 * @desc    Delete intervention
 * @access  Private
 */
router.delete('/:id', async (req: any, res, next) => {
    try {
        const intervention = await Intervention.findByIdAndDelete(req.params.id);

        if (!intervention) {
            return res.status(404).json({ success: false, message: 'Intervention non trouvée' });
        }

        res.json({ success: true, message: 'Intervention supprimée' });
    } catch (err) {
        next(err);
    }
});

export default router;
