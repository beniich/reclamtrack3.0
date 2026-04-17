import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer | null = null;

export const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI;

        if (!mongoUri || mongoUri.includes('username:password') || process.env.USE_MEMORY_DB === 'true') {
            logger.info('🧠 Initialisation de MongoDB en mémoire (Mode Temporaire)...');
            mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            (global as any).IS_MEMORY_DB = true;
        }

        await mongoose.connect(mongoUri);
        logger.info(`✅ MongoDB connecté (${(global as any).IS_MEMORY_DB ? 'MEMOIRE' : 'PERSISTANT'})`);
    } catch (err) {
        (global as any).IS_DEMO_MODE = true;
        logger.warn('⚠️  Impossible de se connecter à MongoDB - Mode DÉMO activé');
        logger.warn('💡 Erreur:', err instanceof Error ? err.message : err);
    }
};


export const disconnectDB = async () => {
    await mongoose.disconnect();
    if (mongod) {
        await mongod.stop();
    }
};

