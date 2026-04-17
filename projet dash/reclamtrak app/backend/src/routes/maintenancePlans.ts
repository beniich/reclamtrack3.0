import { Router } from 'express';
import { 
  createMaintenancePlan, 
  getMaintenancePlans, 
  getMaintenancePlanById, 
  updateMaintenancePlan, 
  deleteMaintenancePlan 
} from '../controllers/maintenancePlan.controller.js';
import { authenticate } from '../middleware/security.js';

const router = Router();

router.use(authenticate);

router.post('/', createMaintenancePlan);
router.get('/', getMaintenancePlans);
router.get('/:id', getMaintenancePlanById);
router.put('/:id', updateMaintenancePlan);
router.delete('/:id', deleteMaintenancePlan);

export default router;
