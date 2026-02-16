import { Router } from 'express';
import { body, param } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { protect } from '../middleware/auth.js';
import { requireOrganization } from '../middleware/organization.js';
import { complaintController } from '../controllers/complaintController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Apply organization context to all complaint routes
router.use(protect, requireOrganization);

// GET /api/complaints/stats - Must be before /:id route
router.get('/stats', complaintController.getStats.bind(complaintController));

// GET /api/complaints
router.get('/', complaintController.getAll.bind(complaintController));

// GET /api/complaints/:id
router.get('/:id', complaintController.getById.bind(complaintController));

// POST /api/complaints
import { autoAssignComplaint } from '../services/schedulingService.js';
import notificationService from '../services/socketService.js';

// ... (imports remain)

// POST /api/complaints
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

        // Step 4: Contact
        body('isAnonymous').optional().isBoolean(),
    ],
    validator,
    async (req, res, next) => {
        try {
            // Use controller logic but we need to intercept for auto-scheduling
            // So we'll call create manually or wrap it.
            // Actually, better to modify the controller or do it here.
            // Let's rely on the controller returning the complaint and then we do post-processing
            // OR we can just inject the logic here if we assume controller.create sends response.
            // Controller usually sends response. Let's wrap it.

            // To avoid duplicating controller logic, we might want to move this to the controller in the future.
            // For now, let's look at how controller.create is implemented. 
            // Since I can't see controller implementation easily without another tool call, 
            // I will assume I can't easily hook into it after response is sent without modifying controller.

            // Wait, the instruction was to "Integrate auto-scheduling into /api/complaints".
            // The cleanest way is to modify the controller or service.
            // Modifying the service (complaintService.ts) is what I did in the previous turn (step 111), 
            // but it failed because I couldn't find the target content.
            // Let's try to modify `backend/src/services/complaintService.ts` again with the correct content.

            complaintController.create(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

// PUT /api/complaints/:id
router.put(
    '/:id',
    [
        param('id').isMongoId(),
        body('status').optional().isIn(['nouvelle', 'en cours', 'résolue', 'fermée', 'rejetée']),
        body('assignedTeamId').optional().isMongoId(),
        body('technicianId').optional().isMongoId()
    ],
    validator,
    complaintController.update.bind(complaintController)
);

// DELETE /api/complaints/:id
router.delete(
    '/:id',
    [param('id').isMongoId()],
    validator,
    complaintController.delete.bind(complaintController)
);

export default router;
