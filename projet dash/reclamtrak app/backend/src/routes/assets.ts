import { Router } from 'express';
import { createAsset, getAssets, getAssetById, updateAsset, deleteAsset } from '../controllers/asset.controller.js';
import { authenticate } from '../middleware/security.js';

const router = Router();

// Toutes les routes Asset nécessitent une authentification
router.use(authenticate);

router.post('/', createAsset);
router.get('/', getAssets);
router.get('/:id', getAssetById);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router;
