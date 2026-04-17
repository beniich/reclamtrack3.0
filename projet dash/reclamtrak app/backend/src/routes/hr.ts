import { Router } from 'express';
import staffRoutes from './staff.js';
import teamRoutes from './teams.js';
import rosterRoutes from './roster.js';
import leaveRoutes from './leave.js';

const router = Router();

// Mount all Human Resources related routes under /api/hr/*
router.use('/staff', staffRoutes);
router.use('/teams', teamRoutes);
router.use('/roster', rosterRoutes);
router.use('/leave', leaveRoutes);

export default router;
