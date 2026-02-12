import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { envValidator } from './config/envValidator.js';
import { connectDB } from './config/db.js';
import { initSocket } from './services/socketService.js';
import notificationService from './services/socketService.js';
import { logger } from './utils/logger.js';
import errorHandler from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import complaintRoutes from './routes/complaints.js';
import teamRoutes from './routes/teams.js';
import assignmentRoutes from './routes/assignments.js';
import planningRoutes from './routes/planning.js';
import dashboardRoutes from './routes/dashboard.js';
import inventoryRoutes from './routes/inventory.js';
import requisitionRoutes from './routes/requisitions.js';
import analyticsRoutes from './routes/analytics.js';
import schedulerRoutes from './routes/scheduler.js';
import fleetRoutes from './routes/fleet.js';
import messageRoutes from './routes/messages.js';
import knowledgeRoutes from './routes/knowledge.js';
import feedbackRoutes from './routes/feedback.js';
import adminRoutes from './routes/admin.js';
import staffRoutes from './routes/staff.js';
import rosterRoutes from './routes/roster.js';
import leaveRoutes from './routes/leave.js';

// Validate environment
envValidator();

const app = express();
const httpServer = createServer(app);

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow accessing images
}));
app.use(cors({ origin: '*' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requisitions', requisitionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/scheduler', schedulerRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/roster', rosterRoutes);
app.use('/api/leave', leaveRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'ReclamTrack API' });
});

// Test notification endpoint
app.post('/api/test-notification', (req, res) => {
    const notificationService = require('./services/socketService.js').default;

    notificationService.broadcast({
        type: 'success',
        title: 'Test Notification',
        message: 'Le système de notifications fonctionne parfaitement ! 🎉',
        timestamp: new Date()
    });

    res.json({
        success: true,
        message: 'Notification envoyée à tous les clients connectés'
    });
});

// Error handler
app.use(errorHandler);

// Initialize Socket.IO
initSocket(httpServer);

// Start server
const start = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5001;
        httpServer.listen(PORT, () => {
            logger.info(`🚀 API ReclamTrack écoute sur le port ${PORT}`);
        });
    } catch (err) {
        logger.error('❌ Échec démarrage serveur', err);
        process.exit(1);
    }
};

start();
