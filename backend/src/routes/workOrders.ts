import { Router } from 'express';
import { createWorkOrder, getWorkOrders, getWorkOrderById, updateWorkOrder, deleteWorkOrder, convertComplaintToWorkOrder } from '../controllers/workOrder.controller.js';
import { authenticate } from '../middleware/security.js';

const router = Router();

// L'authentification est requise pour toutes les routes WorkOrder
router.use(authenticate);

router.post('/', createWorkOrder);
router.get('/', getWorkOrders);
router.get('/:id', getWorkOrderById);
router.put('/:id', updateWorkOrder);
router.delete('/:id', deleteWorkOrder);
router.post('/convert/:complaintId', convertComplaintToWorkOrder);

export default router;
