import { Router, Request, Response } from 'express';
import { protect as auth } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import { Requisition, RequisitionStatus } from '../models/Requisition.js';

const router = Router();

// GET /api/requisitions - Liste des réquisitions
router.get('/', auth, async (req: any, res: Response) => {
    try {
        const { status, requesterId } = req.query;
        const query: any = {};

        if (status) query.status = status;

        // Si pas admin/manager, voir seulement ses propres requêtes
        if (['technician', 'staff'].includes(req.user.role)) {
            query.requesterId = req.user.id;
        } else if (requesterId) {
            query.requesterId = requesterId;
        }

        const requisitions = await Requisition.find(query)
            .populate('requesterId', 'name email')
            .populate('complaintId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: requisitions,
            total: requisitions.length
        });
    } catch (error) {
        logger.error('Erreur récupération réquisitions:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des réquisitions'
        });
    }
});

// GET /api/requisitions/:id - Détails d'une réquisition
router.get('/:id', auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const requisition = await Requisition.findById(id)
            .populate('requesterId', 'name email role')
            .populate('complaintId');

        if (!requisition) {
            return res.status(404).json({
                success: false,
                message: 'Réquisition introuvable'
            });
        }

        res.json({
            success: true,
            data: requisition
        });
    } catch (error) {
        logger.error('Erreur récupération réquisition:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de la réquisition'
        });
    }
});

// POST /api/requisitions - Créer une réquisition
router.post('/', auth, async (req: any, res: Response) => {
    try {
        const { items, complaintId, notes } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Articles requis'
            });
        }

        const newRequisition = new Requisition({
            requesterId: req.user.id,
            complaintId,
            items,
            notes,
            status: RequisitionStatus.DRAFT,
            history: [{
                status: RequisitionStatus.DRAFT,
                action: 'created',
                userId: req.user.id,
                timestamp: new Date()
            }]
        });

        await newRequisition.save();

        logger.info(`Réquisition créée par ${req.user.name}`);

        res.status(201).json({
            success: true,
            message: 'Réquisition créée avec succès',
            data: newRequisition
        });
    } catch (error) {
        logger.error('Erreur création réquisition:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création de la réquisition'
        });
    }
});

// PUT /api/requisitions/:id - Modifier une réquisition
router.put('/:id', auth, async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const requisition = await Requisition.findById(id);

        if (!requisition) {
            return res.status(404).json({
                success: false,
                message: 'Réquisition introuvable'
            });
        }

        // Vérifier droits (propriétaire ou admin/manager)
        if (requisition.requesterId.toString() !== req.user.id && !['admin', 'manager'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        // Ne permettre la modification que si status = draft ou pending (sauf pour admin)
        if (![RequisitionStatus.DRAFT, RequisitionStatus.PENDING].includes(requisition.status as RequisitionStatus) && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cette réquisition ne peut plus être modifiée'
            });
        }

        // Mettre à jour les champs autorisés
        if (updates.items) requisition.items = updates.items;
        if (updates.notes) requisition.notes = updates.notes;
        if (updates.complaintId) requisition.complaintId = updates.complaintId;

        await requisition.save();

        logger.info(`Réquisition modifiée: ${id}`);

        res.json({
            success: true,
            message: 'Réquisition mise à jour',
            data: requisition
        });
    } catch (error) {
        logger.error('Erreur modification réquisition:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la modification'
        });
    }
});

// POST /api/requisitions/:id/transition - Changer le statut
router.post('/:id/transition', auth, async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { action, comment } = req.body; // action: 'submit', 'approve', 'reject', etc.

        const requisition = await Requisition.findById(id);

        if (!requisition) {
            return res.status(404).json({
                success: false,
                message: 'Réquisition introuvable'
            });
        }

        let newStatus: RequisitionStatus = requisition.status;


        switch (action) {
            case 'submit':
                if (requisition.status === RequisitionStatus.DRAFT) newStatus = RequisitionStatus.PENDING;
                break;
            case 'approve':
                // Vérifier rôle manager/admin
                if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ message: 'Non autorisé' });
                if (requisition.status === RequisitionStatus.PENDING) newStatus = RequisitionStatus.APPROVED;
                break;
            case 'reject':
                if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ message: 'Non autorisé' });
                if (requisition.status === RequisitionStatus.PENDING) newStatus = RequisitionStatus.REJECTED;
                break;
            case 'fulfill':
                // Vérifier rôle warehouse/admin
                if (!['admin', 'manager', 'warehouse'].includes(req.user.role)) return res.status(403).json({ message: 'Non autorisé' });
                if (requisition.status === RequisitionStatus.APPROVED) newStatus = RequisitionStatus.DELIVERED;
                break;
            case 'cancel':
                if (requisition.requesterId.toString() === req.user.id || ['admin', 'manager'].includes(req.user.role)) {
                    newStatus = RequisitionStatus.CANCELLED;
                } else {
                    return res.status(403).json({ message: 'Non autorisé' });
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Action invalide'
                });
        }

        requisition.status = newStatus;
        requisition.history.push({
            status: newStatus,
            action: action,
            userId: req.user.id,
            comment: comment,
            timestamp: new Date()
        });

        await requisition.save();

        logger.info(`Réquisition ${id}: ${action} -> ${newStatus}`);

        res.json({
            success: true,
            message: `Statut mis à jour: ${newStatus}`,
            data: requisition
        });
    } catch (error) {
        logger.error('Erreur transition réquisition:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors du changement de statut'
        });
    }
});

// DELETE /api/requisitions/:id - Supprimer une réquisition
router.delete('/:id', auth, async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const requisition = await Requisition.findById(id);

        if (!requisition) {
            return res.status(404).json({
                success: false,
                message: 'Réquisition introuvable'
            });
        }

        // Ne permettre la suppression que si status = draft
        if (req.user.role !== 'admin' && requisition.status !== RequisitionStatus.DRAFT) {
            return res.status(403).json({
                success: false,
                message: 'Seuls les brouillons peuvent être supprimés'
            });
        }

        // Vérifier propriétaire
        if (req.user.role !== 'admin' && requisition.requesterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        await Requisition.deleteOne({ _id: id });
        logger.info(`Réquisition supprimée: ${id}`);

        res.json({
            success: true,
            message: 'Réquisition supprimée'
        });
    } catch (error) {
        logger.error('Erreur suppression réquisition:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression'
        });
    }
});

export default router;
