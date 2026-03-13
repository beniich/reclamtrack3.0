import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Complaint from './src/models/Complaint.js';

dotenv.config();

const users = [
    {
        email: 'admin@reclamtrack.ma',
        password: 'Admin@2025',
        firstName: 'Ahmed',
        lastName: 'Benjelloun',
        role: 'admin'
    },
    {
        email: 'agent@reclamtrack.ma',
        password: 'Agent@2025',
        firstName: 'Sara',
        lastName: 'El Mansouri',
        role: 'agent'
    },
    {
        email: 'technicien@reclamtrack.ma',
        password: 'Tech@2025',
        firstName: 'Youssef',
        lastName: 'Alami',
        role: 'technician'
    }
];

const complaints = [
    {
        title: 'Fuite d\'eau majeure au bâtiment A',
        description: 'Une importante fuite d\'eau est constatée au 3ème étage du bâtiment A. L\'eau s\'écoule depuis le plafond et risque d\'endommager les équipements informatiques.',
        status: 'new',
        priority: 'urgent',
        category: 'Plomberie',
        location: 'Rabat - Agdal, Bâtiment A, 3ème étage',
        createdBy: 'system'
    },
    {
        title: 'Panne électrique - Éclairage couloir',
        description: 'Les lumières du couloir principal ne fonctionnent plus depuis ce matin. Cela pose un problème de sécurité pour les employés.',
        status: 'in-progress',
        priority: 'high',
        category: 'Électricité',
        location: 'Salé - Tabriquet, Couloir B',
        createdBy: 'system'
    },
    {
        title: 'Climatisation défectueuse salle de réunion',
        description: 'La climatisation de la salle de réunion principale ne refroidit plus correctement. Température actuelle: 28°C.',
        status: 'new',
        priority: 'medium',
        category: 'HVAC',
        location: 'Rabat - Hassan, Salle R301',
        createdBy: 'system'
    },
    {
        title: 'Nettoyage bureau demandé',
        description: 'Demande de nettoyage approfondi du bureau 204 suite à des travaux de rénovation.',
        status: 'new',
        priority: 'low',
        category: 'Entretien',
        location: 'Temara - Centre, Bureau 204',
        createdBy: 'system'
    },
    {
        title: 'Ascenseur bloqué au 5ème étage',
        description: 'L\'ascenseur principal est bloqué au 5ème étage. Personne à l\'intérieur mais nécessite intervention urgente.',
        status: 'assigned',
        priority: 'urgent',
        category: 'Ascenseur',
        location: 'Rabat - Souissi, Tour Principale',
        createdBy: 'system'
    },
    {
        title: 'Problème de chauffage',
        description: 'Le système de chauffage central ne fonctionne pas. Température mesurée: 15°C.',
        status: 'in-progress',
        priority: 'high',
        category: 'HVAC',
        location: 'Salé - Marina, Aile Est',
        createdBy: 'system'
    },
    {
        title: 'Vitre cassée fenêtre bureau',
        description: 'Une vitre de la fenêtre du bureau 102 est fissurée et nécessite un remplacement.',
        status: 'new',
        priority: 'medium',
        category: 'Vitrerie',
        location: 'Rabat - Océan, Bureau 102',
        createdBy: 'system'
    },
    {
        title: 'Fuite robinet salle de bain',
        description: 'Le robinet de la salle de bain du 2ème étage fuit continuellement.',
        status: 'resolved',
        priority: 'low',
        category: 'Plomberie',
        location: 'Rabat - Hay Riad, 2ème étage',
        createdBy: 'system'
    }
];

async function seedDatabase() {
    try {
        console.log('🔌 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reclamtrack');
        console.log('✅ Connecté à MongoDB\n');

        // Supprimer les données existantes
        console.log('🗑️  Suppression des données existantes...');
        try {
            await mongoose.connection.db.dropCollection('users');
            await mongoose.connection.db.dropCollection('complaints');
        } catch (e) {
            // Re-throw if it's not "collection not found"
            if (e.codeName !== 'NamespaceNotFound') {
                console.log('   (Note: Une erreur est survenue lors du drop, ignorant...)');
            }
        }
        console.log('✅ Données et index supprimés\n');

        // Ensure indexes are recreated based on current models
        await User.createIndexes();
        await Complaint.createIndexes();

        // Créer les utilisateurs
        console.log('👥 Création des utilisateurs...');
        const createdUsers = [];
        for (const userData of users) {
            const user = new User(userData);
            await user.save();
            createdUsers.push(user);
            console.log(`   ✓ ${user.firstName} ${user.lastName} (${user.email}) - Rôle: ${user.role}`);
        }
        console.log(`✅ ${createdUsers.length} utilisateurs créés\n`);

        // Assigner les réclamations aux agents
        console.log('🎫 Création des réclamations...');
        const agent = createdUsers.find(u => u.role === 'agent');
        const technicien = createdUsers.find(u => u.role === 'technician');

        for (let i = 0; i < complaints.length; i++) {
            const complaintData = complaints[i];

            // Assigner certaines réclamations
            if (complaintData.status === 'assigned' || complaintData.status === 'in-progress') {
                complaintData.assignedTo = i % 2 === 0 ? agent._id.toString() : technicien._id.toString();
            }

            complaintData.createdBy = createdUsers[0]._id.toString(); // Admin

            const complaint = new Complaint(complaintData);
            await complaint.save();
            console.log(`   ✓ ${complaint.title} [${complaint.priority}] - ${complaint.status}`);
        }
        console.log(`✅ ${complaints.length} réclamations créées\n`);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✨ BASE DE DONNÉES INITIALISÉE AVEC SUCCÈS ! ✨');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        console.log('📋 COMPTES UTILISATEURS CRÉÉS:');
        console.log('┌─────────────────────────────────────────────┐');
        console.log('│ 👤 ADMINISTRATEUR                           │');
        console.log('│    Email: admin@reclamtrack.ma              │');
        console.log('│    Mot de passe: Admin@2025                 │');
        console.log('├─────────────────────────────────────────────┤');
        console.log('│ 👤 AGENT                                    │');
        console.log('│    Email: agent@reclamtrack.ma              │');
        console.log('│    Mot de passe: Agent@2025                 │');
        console.log('├─────────────────────────────────────────────┤');
        console.log('│ 👤 TECHNICIEN                               │');
        console.log('│    Email: technicien@reclamtrack.ma         │');
        console.log('│    Mot de passe: Tech@2025                  │');
        console.log('└─────────────────────────────────────────────┘\n');

        console.log('🎯 PROCHAINES ÉTAPES:');
        console.log('  1. Connectez-vous avec un des comptes ci-dessus');
        console.log('  2. Testez la création de nouvelles réclamations');
        console.log('  3. Utilisez l\'analyse IA pour classifier automatiquement\n');

        await mongoose.connection.close();
        console.log('✅ Connexion MongoDB fermée');
        process.exit(0);

    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        process.exit(1);
    }
}

seedDatabase();
