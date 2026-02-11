import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Requisition, RequisitionStatus } from '../models/Requisition.js';
import { KnowledgeBase } from '../models/Knowledge.js';
import { Feedback } from '../models/Feedback.js';
import { Message } from '../models/Message.js';
import { Vehicle } from '../models/Vehicle.js';
import { ShiftType } from '../models/Scheduler.js';

// Charger les variables d'environnement
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/reclamtrack';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connecté à MongoDB pour le seed');

        // 1. Nettoyer la base (optionnel, commenté pour sécurité)
        // await mongoose.connection.db.dropDatabase();
        // console.log('🗑️ Base de données nettoyée');

        // 2. Créer Utilisateurs
        const admin = await User.findOneAndUpdate(
            { email: 'admin@reclamtrack.com' },
            {
                name: 'Admin Principal',
                email: 'admin@reclamtrack.com',
                password: 'password123', // Hashage géré par le modèle si implémenté
                role: 'admin'
            },
            { upsert: true, new: true }
        );

        const tech = await User.findOneAndUpdate(
            { email: 'tech@reclamtrack.com' },
            {
                name: 'Technicien Senior',
                email: 'tech@reclamtrack.com',
                password: 'password123',
                role: 'technician'
            },
            { upsert: true, new: true }
        );
        console.log('👥 Utilisateurs créés/mis à jour');

        // 3. Créer Réquisitions
        if (await Requisition.countDocuments() === 0) {
            await Requisition.create([
                {
                    requesterId: tech._id,
                    items: [
                        { description: 'Tuyau PVC 32mm', quantity: 10, justification: 'Stock épuisé' },
                        { description: 'Colle PVC', quantity: 5 }
                    ],
                    status: RequisitionStatus.PENDING,
                    history: [{ status: RequisitionStatus.PENDING, action: 'created', userId: tech._id, timestamp: new Date() }]
                },
                {
                    requesterId: tech._id,
                    items: [
                        { description: 'Câble électrique 3G2.5', quantity: 100 },
                        { description: 'Domino', quantity: 50 }
                    ],
                    status: RequisitionStatus.APPROVED,
                    history: [{ status: RequisitionStatus.APPROVED, action: 'approved', userId: admin._id, timestamp: new Date() }]
                }
            ]);
            console.log('📦 Réquisitions créées');
        }

        // 4. Créer SOPs (Knowledge Base)
        if (await KnowledgeBase.countDocuments() === 0) {
            await KnowledgeBase.create([
                {
                    title: 'Procédure d\'intervention Fuite d\'Eau',
                    category: 'Plomberie',
                    content: '1. Sécuriser la zone.\n2. Couper l\'arrivée d\'eau principale.\n3. Identifier la fuite.\n4. Réparer ou remplacer la pièce défectueuse.',
                    author: 'Chef Plombier',
                    tags: ['urgence', 'fuite', 'eau'],
                    isActive: true
                },
                {
                    title: 'Remplacement Ampoule Réverbère',
                    category: 'Éclairage Public',
                    content: '1. Baliser la zone d\'intervention avec des cônes.\n2. Couper l\'alimentation du secteur.\n3. Utiliser la nacelle pour atteindre le luminaire.\n4. Remplacer l\'ampoule et vérifier le ballast.',
                    author: 'Resp. Sécurité',
                    tags: ['électricité', 'hauteur', 'maintenance'],
                    isActive: true
                }
            ]);
            console.log('📚 Base de connaissances peuplée');
        }

        // 5. Créer Feedback
        if (await Feedback.countDocuments() === 0) {
            await Feedback.create([
                { rating: 5, comment: 'Intervention rapide et efficace !', source: 'mobile', status: 'reviewed' },
                { rating: 3, comment: 'Le technicien est arrivé en retard.', source: 'web', status: 'new' },
                { rating: 4, comment: 'Application très pratique.', source: 'web', status: 'addressed' }
            ]);
            console.log('💬 Feedbacks créés');
        }

        // 6. Créer Messages
        if (await Message.countDocuments() === 0) {
            await Message.create([
                { senderId: admin._id, senderName: admin.name, recipientId: tech._id, content: 'Bienvenue dans l\'équipe !', type: 'text' },
                { senderId: 'system', senderName: 'Système', groupId: 'general', content: 'Maintenance prévue ce soir à 23h.', type: 'system' }
            ]);
            console.log('📨 Messages créés');
        }

        // 7. Véhicules et Shifts (gérés par les routes, mais on peut forcer ici)
        // ... (optionnel)

        console.log('✅ Seed terminé avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    }
};

seedData();
