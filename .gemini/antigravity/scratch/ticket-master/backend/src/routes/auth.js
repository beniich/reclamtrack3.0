import express from 'express';
import { check } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { register, login, getMe } from '../controllers/authController.js';
const router = express.Router();
router.post('/register', [
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], register);
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], login);
router.get('/me', protect, getMe);
export default router;
//# sourceMappingURL=auth.js.map