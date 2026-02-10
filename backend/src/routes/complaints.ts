import { Router } from 'express';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { protect } from '../middleware/auth.js';
import { Complaint } from '../models/Complaint.js';
import { io } from '../services/socketService.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// GET /api/complaints
router.get('/', async (req, res, next) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        next(err);
    }
});

// GET /api/complaints/:id
router.get('/:id', async (req, res, next) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate('assignedTeamId', 'name')
            .populate('technicianId', 'name email');

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.json(complaint);
    } catch (err) {
        next(err);
    }
});

/* POST /api/complaints */
router.post(
    '/',
    upload.array('photos', 5), // Handle up to 5 photos
    [
        // Step 1: Info
        body('category').notEmpty().withMessage('Category is required'),
        body('subcategory').notEmpty().withMessage('Subcategory is required'),
        body('priority').isIn(['low', 'medium', 'high', 'urgent']),
        body('title').notEmpty(),
        body('description').notEmpty(),

        // Step 2: Location
        body('address').notEmpty(),
        body('city').notEmpty(),
        body('district').notEmpty(),

        // Step 4: Contact (Conditional validation could be improved)
        body('isAnonymous').optional().isBoolean(),
    ],
    validator,
    async (req: any, res: any, next: any) => {
        try {
            // Process uploaded files
            const photos = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

            const complaintData = {
                ...req.body,
                photos: photos,
                // Ensure numeric fields are parsed correctly
                latitude: req.body.latitude ? parseFloat(req.body.latitude) : undefined,
                longitude: req.body.longitude ? parseFloat(req.body.longitude) : undefined,
                isAnonymous: req.body.isAnonymous === 'true' || req.body.isAnonymous === true
            };

            const complaint = await Complaint.create(complaintData);

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
    protect, // Require auth for updates
    [
        param('id').isMongoId(),
        body('status').optional().isIn(['nouvelle', 'en cours', 'résolue', 'fermée', 'rejetée']),
        body('assignedTeamId').optional().isMongoId(),
        body('technicianId').optional().isMongoId()
    ],
    validator,
    async (req, res, next) => {
        try {
            const updated = await Complaint.findByIdAndUpdate(
                req.params.id,
                req.body,
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
