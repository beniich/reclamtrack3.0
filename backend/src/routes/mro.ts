import { Router } from 'express';
import { 
  createInventoryItem, 
  getInventoryItems, 
  getInventoryItemById, 
  updateInventoryItem, 
  deleteInventoryItem,
  adjustStock
} from '../controllers/inventory.controller.js';
import { authenticate } from '../middleware/security.js';

const router = Router();

router.use(authenticate);

// Gestion MRO Base de données (Séparé du mock existant)
router.post('/', createInventoryItem);
router.get('/', getInventoryItems);
router.get('/:id', getInventoryItemById);
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);
router.post('/:id/adjust', adjustStock);

export default router;
