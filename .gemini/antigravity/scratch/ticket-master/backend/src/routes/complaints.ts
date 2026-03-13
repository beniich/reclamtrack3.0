import express from 'express';
import Complaint from '../models/Complaint.js';
import notificationService from '../socket/index.js';

const router = express.Router();

// Récupérer toutes les réclamations
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une réclamation par ID
router.get('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ error: 'Réclamation non trouvée' });
        }
        res.json(complaint);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle réclamation
router.post('/', async (req, res) => {
    try {
        const complaint = new Complaint(req.body);
        await complaint.save();

        // Envoyer notification aux admins
        notificationService.sendToGroup('admins', {
            type: 'success',
            title: 'Nouvelle réclamation',
            message: `Nouvelle réclamation créée: ${complaint.title}`
        });

        res.status(201).json(complaint);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Mettre à jour une réclamation
router.put('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ error: 'Réclamation non trouvée' });
        }

        // Envoyer notification à l'utilisateur concerné
        if (complaint.assignedTo) {
            notificationService.sendToUser(complaint.assignedTo, {
                type: 'info',
                title: 'Réclamation mise à jour',
                message: `La réclamation "${complaint.title}" a été mise à jour`
            });
        }

        // Notification globale pour les admins
        notificationService.broadcast({
            type: 'info',
            title: 'Réclamation modifiée',
            message: `Réclamation ${complaint.title} (${complaint.status})`
        });

        res.json(complaint);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Changer le statut d'une réclamation
router.patch('/:id/status', async (req, res) => {
    try {
        const { status, userId } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: new Date() },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ error: 'Réclamation non trouvée' });
        }

        let message = '';
        let notificationType: 'info' | 'success' | 'warning' | 'error' = 'info';

        switch (status) {
            case 'resolved':
                message = `Réclamation résolue: ${complaint.title}`;
                notificationType = 'success';
                break;
            case 'assigned':
                message = `Réclamation assignée: ${complaint.title}`;
                notificationType = 'info';
                break;
            case 'in-progress':
                message = `Traitement en cours: ${complaint.title}`;
                notificationType = 'warning';
                break;
            default:
                message = `Statut changé: ${complaint.title} -> ${status}`;
        }

        // Notifier l'utilisateur assigné
        if (complaint.assignedTo) {
            notificationService.sendToUser(complaint.assignedTo, {
                type: notificationType,
                title: 'Statut mis à jour',
                message
            });
        }

        // Notification globale
        notificationService.broadcast({
            type: notificationType,
            title: 'Statut réclamation',
            message
        });

        res.json(complaint);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
