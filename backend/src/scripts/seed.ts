import mongoose from 'mongoose';
import { config } from 'dotenv';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Complaint } from '../models/Complaint.js';
import { Staff } from '../models/Staff.js';
import { logger } from '../utils/logger.js';


config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI not defined in .env');
        }

        await mongoose.connect(mongoUri);
        logger.info('✅ Connected to MongoDB for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Team.deleteMany({});
        await Complaint.deleteMany({});
        await Staff.deleteMany({});
        logger.info('🗑️  Cleared existing data');

        // Create Admin User
        const adminUser = await User.create({
            email: 'admin@reclamtrack.com',
            password: 'Admin123!', // Will be hashed by the model
            name: 'Admin System',
            role: 'admin',
            isEmailVerified: true
        });
        logger.info('👤 Created admin user');

        // Create Teams
        const teams = await Team.create([
            {
                name: 'Équipe Électricité',
                description: 'Gestion des pannes électriques',
                specialization: 'Électricité',
                isActive: true
            },
            {
                name: 'Équipe Plomberie',
                description: 'Réparation des fuites et canalisations',
                specialization: 'Plomberie',
                isActive: true
            },
            {
                name: 'Équipe Voirie',
                description: 'Entretien des routes et trottoirs',
                specialization: 'Voirie',
                isActive: true
            }
        ]);
        logger.info(`👥 Created ${teams.length} teams`);

        // Create Staff Members
        const staff = await Staff.create([
            {
                name: 'Jean Dupont',
                email: 'jean.dupont@reclamtrack.com',
                role: 'Technicien Électricité'
            },
            {
                name: 'Marie Martin',
                email: 'marie.martin@reclamtrack.com',
                role: 'Technicienne Plomberie'
            },
            {
                name: 'Pierre Bernard',
                email: 'pierre.bernard@reclamtrack.com',
                role: 'Superviseur Voirie'
            }
        ]);
        logger.info(`🔧 Created ${staff.length} staff members`);

        // Create Sample Complaints
        const complaints = await Complaint.create([
            {
                category: 'Électricité',
                subcategory: 'Panne de courant',
                priority: 'urgent',
                title: 'Panne électrique rue Victor Hugo',
                description: 'Coupure de courant depuis 2 heures dans tout le quartier',
                address: '15 Rue Victor Hugo',
                city: 'Paris',
                district: '16ème',
                postalCode: '75016',
                latitude: 48.8566,
                longitude: 2.3522,
                isAnonymous: false,
                firstName: 'Sophie',
                lastName: 'Dubois',
                email: 'sophie.dubois@example.com',
                phone: '+33612345678',
                status: 'en cours',
                assignedTeamId: teams[0]._id,
                technicianId: staff[0]._id
            },
            {
                category: 'Plomberie',
                subcategory: 'Fuite d\'eau',
                priority: 'high',
                title: 'Fuite importante avenue des Champs',
                description: 'Fuite d\'eau visible sur la chaussée, risque d\'inondation',
                address: '42 Avenue des Champs-Élysées',
                city: 'Paris',
                district: '8ème',
                postalCode: '75008',
                latitude: 48.8698,
                longitude: 2.3078,
                isAnonymous: true,
                status: 'nouvelle'
            },
            {
                category: 'Voirie',
                subcategory: 'Nid de poule',
                priority: 'medium',
                title: 'Nid de poule boulevard Saint-Germain',
                description: 'Trou important sur la chaussée, dangereux pour les véhicules',
                address: '120 Boulevard Saint-Germain',
                city: 'Paris',
                district: '6ème',
                postalCode: '75006',
                latitude: 48.8534,
                longitude: 2.3364,
                isAnonymous: false,
                firstName: 'Marc',
                lastName: 'Leroy',
                email: 'marc.leroy@example.com',
                phone: '+33698765432',
                status: 'résolue',
                assignedTeamId: teams[2]._id,
                technicianId: staff[2]._id
            }
        ]);
        logger.info(`📋 Created ${complaints.length} sample complaints`);

        logger.info('✅ Database seeding completed successfully!');
        logger.info('\n📊 Summary:');
        logger.info(`   - Users: ${await User.countDocuments()}`);
        logger.info(`   - Teams: ${await Team.countDocuments()}`);
        logger.info(`   - Staff: ${await Staff.countDocuments()}`);
        logger.info(`   - Complaints: ${await Complaint.countDocuments()}`);

        process.exit(0);
    } catch (error) {
        logger.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
