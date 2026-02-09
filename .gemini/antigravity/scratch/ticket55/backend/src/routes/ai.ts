import express from 'express';
import { AIController } from '../controllers/aiController';

const router = express.Router();

// Route publique pour health check
router.get('/health', AIController.healthCheck);

// Routes protégées (authentification requise)
// Uncomment when auth middleware is ready
// import { authenticate } from '../middleware/auth';
// router.use(authenticate);

router.post('/classify', AIController.classifyComplaint);
router.post('/response', AIController.generateResponse);
router.post('/trends', AIController.analyzeTrends);

export default router;
