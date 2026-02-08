import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        logger.info('✅ MongoDB connecté');
    } catch (err) {
        logger.error('❌ Erreur connexion MongoDB', err);
        process.exit(1);
    }
};
