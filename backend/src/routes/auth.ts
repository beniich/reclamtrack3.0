import { Router } from 'express';
import { body } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { protect } from '../middleware/auth.js';
import { User } from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';
import { eventBus } from '../services/eventBus.js';

const router = Router();

/* POST /api/auth/register */
router.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ],
    validator,
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const exists = await User.findOne({ email });
            if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });

            const user = await User.create({ email, password });
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
            );

            // Register Route
            logger.info(`✅ Inscription - ${email}`);

            // Audit Log
            await AuditLog.create({
                action: 'REGISTER',
                userId: user._id,
                targetId: user._id.toString(),
                targetType: 'User',
                details: { email, role: user.role },
                ipAddress: req.ip
            });

            // Kafka Event
            await eventBus.publish('auth-events', 'USER_REGISTERED', {
                userId: user._id,
                email: user.email,
                role: user.role,
                timestamp: new Date()
            });

            res.status(201).json({ token, user: { id: user._id, email, role: user.role } });
        } catch (err) {
            next(err);
        }
    }
);

/* POST /api/auth/login */
router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').exists()
    ],
    validator,
    async (req, res, next) => {
        try {
            const { email, password } = req.body;

            logger.debug(`Unknown login attempt for email: ${email}`);
            const user = await User.findOne({ email });

            if (!user) {
                logger.warn(`Login failed: User not found for email: ${email}`);
                return res.status(401).json({ message: 'Identifiants invalides' });
            }

            const matched = await user.comparePassword(password);

            if (!matched) {
                logger.warn(`Login failed: Password mismatch for user: ${email}`);
                return res.status(401).json({ message: 'Identifiants invalides' });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
            );

            logger.info(`🔐 Connexion - ${email}`);

            // Audit Log
            await AuditLog.create({
                action: 'LOGIN',
                userId: user._id,
                targetId: user._id.toString(),
                targetType: 'Session',
                details: { email, role: user.role },
                ipAddress: req.ip
            });

            // Kafka Event
            await eventBus.publish('auth-events', 'USER_LOGIN', {
                userId: user._id,
                email: user.email,
                role: user.role,
                timestamp: new Date()
            });

            res.json({ token, user: { id: user._id, email, role: user.role } });
        } catch (err) {
            next(err);
        }
    }
);

/* GET /api/auth/me */
router.get('/me', protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.user!.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        logger.info(`👤 Profil récupéré - ${user.email}`);
        res.json({ id: user._id, email: user.email, role: user.role });
    } catch (err) {
        next(err);
    }
});

/* POST /api/auth/refresh */
router.post('/refresh', protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.user!.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
        );

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        next(err);
    }
});

/* POST /api/auth/logout */
router.post('/logout', (req, res) => {
    // In a stateless JWT setup, the backend just confirms success.
    // The frontend deals with token removal.
    // In a real microservice with Redis, we would blacklist the token here.
    res.status(200).json({ message: 'Déconnexion réussie' });
});

export default router;
