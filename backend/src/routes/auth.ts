import { Router } from 'express';
import { body } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

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

            logger.info(`✅ Inscription - ${email}`);
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
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

            const matched = await user.comparePassword(password);
            if (!matched) return res.status(401).json({ message: 'Identifiants invalides' });

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
            );

            logger.info(`🔐 Connexion - ${email}`);
            res.json({ token, user: { id: user._id, email, role: user.role } });
        } catch (err) {
            next(err);
        }
    }
);

export default router;
