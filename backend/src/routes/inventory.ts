import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { authenticate as protect } from '../middleware/security.js';
import { requireOrganization } from '../middleware/security.js';
import InventoryItem from '../models/InventoryItem.js';
import { Requisition, RequisitionStatus } from '../models/Requisition.js';
import { eventBus } from '../services/eventBus.js';

const router = Router();

// Apply auth to all routes
router.use(protect, requireOrganization);

/**
 * @route   GET /api/inventory/items
 * @desc    Get all inventory items (optionally filtered by category/search/lowStock)
 * @access  Private
 */
router.get('/items', async (req: any, res, next) => {
    try {
        const { q, category, lowStock } = req.query;

        const filter: Record<string, any> = {};

        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { reference: { $regex: q, $options: 'i' } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (lowStock === 'true') {
            filter.$expr = { $lte: ['$currentStock', '$minStockAlert'] };
        }

        const items = await InventoryItem.find(filter).sort({ name: 1 });

        res.json({
            success: true,
            data: items,
            total: items.length
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   GET /api/inventory/items/search
 * @desc    Search items (alias for /items with q)
 * @access  Private
 */
router.get('/items/search', async (req: any, res, next) => {
    try {
        const { q, category, lowStock } = req.query;
        const filter: Record<string, any> = {};

        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { reference: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ];
        }

        if (category) filter.category = category;
        if (lowStock === 'true') filter.$expr = { $lte: ['$currentStock', '$minStockAlert'] };

        const results = await InventoryItem.find(filter);
        res.json({ success: true, data: results, total: results.length });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   GET /api/inventory/items/:id
 * @desc    Get single item
 * @access  Private
 */
router.get('/items/:id', async (req: any, res, next) => {
    try {
        const item = await InventoryItem.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   POST /api/inventory/items
 * @desc    Create new item
 * @access  Private
 */
router.post('/items', [
    body('name').notEmpty(),
    body('reference').notEmpty(),
    body('category').optional().isString(),
    body('currentStock').optional().isNumeric(),
    body('minStockAlert').optional().isNumeric(),
], validator, async (req: any, res, next) => {
    try {
        const item = await InventoryItem.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   PUT /api/inventory/items/:id
 * @desc    Update item
 * @access  Private
 */
router.put('/items/:id', async (req: any, res, next) => {
    try {
        const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
});

/**
 * @route   DELETE /api/inventory/items/:id
 * @desc    Delete item
 * @access  Private
 */
router.delete('/items/:id', async (req: any, res, next) => {
    try {
        await InventoryItem.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Item deleted' });
    } catch (err) {
        next(err);
    }
});

// Requisitions routes
router.get('/requisitions', async (req: any, res, next) => {
    try {
        const requisitions = await Requisition.find({ organizationId: req.organizationId })
            .populate('requesterId', 'name email')
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: requisitions });
    } catch (err) {
        next(err);
    }
});

router.post('/requisitions', async (req: any, res, next) => {
    try {
        const reqData = {
            ...req.body,
            organizationId: req.organizationId,
            requesterId: req.user.id,
            status: RequisitionStatus.PENDING_APPROVAL
        };
        const requisition = await Requisition.create(reqData);
        res.status(201).json({ success: true, data: requisition });
    } catch (err) {
        next(err);
    }
});

router.put('/requisitions/:id/status', async (req: any, res, next) => {
    try {
        const reqItem = await Requisition.findOneAndUpdate(
            { _id: req.params.id, organizationId: req.organizationId },
            { status: req.body.status, updatedAt: new Date() },
            { new: true }
        );
        res.json({ success: true, data: reqItem });
    } catch (err) {
        next(err);
    }
});

export default router;
