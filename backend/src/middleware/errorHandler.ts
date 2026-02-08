import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
    logger.error('❌ Erreur serveur', {
        message: err.message,
        stack: err.stack
    });

    const status = err.status || 500;
    const message = err.message || 'Erreur interne du serveur';
    res.status(status).json({ error: message });
};
