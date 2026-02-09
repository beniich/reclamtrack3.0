import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            logger.warn('⚠️  MongoDB URI non configuré - mode sans base de données');
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('✅ MongoDB connecté');
    } catch (err) {
        logger.warn('⚠️  MongoDB non disponible - continuera sans DB');
        console.log(err);
        // Ne pas quitter le processus, continuer sans MongoDB
    }
};
