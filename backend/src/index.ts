import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { createServer } from 'http';
import path from 'path';
import { connectDB } from './config/db.js';
import { envValidator } from './config/envValidator.js';
import errorHandler from './middleware/errorHandler.js';
import { initSocket } from './services/socketService.js';
import { logger } from './utils/logger.js';

import adminRoutes from './routes/admin.js';
import analyticsRoutes from './routes/analytics.js';
import assignmentRoutes from './routes/assignments.js';
import auditRoutes from './routes/audit.js';
import authRoutes from './routes/auth.js';
import billingRoutes from './routes/billing.js';
import complaintRoutes from './routes/complaints.js';
import dashboardRoutes from './routes/dashboard.js';
import dbRoutes from './routes/db.js';
import devopsRoutes from './routes/devops.js';
import feedbackRoutes from './routes/feedback.js';
import fleetRoutes from './routes/fleet.js';
import googleAuthRoutes from './routes/googleAuth.js';
import interventionRoutes from './routes/interventions.js';
import inventoryRoutes from './routes/inventory.js';
import itTicketsRoutes from './routes/it-tickets.js';
import knowledgeRoutes from './routes/knowledge.js';
import leaveRoutes from './routes/leave.js';
import memberRoutes from './routes/members.js';
import membershipRoutes from './routes/memberships.js';
import messageRoutes from './routes/messages.js';
import monitoringRoutes from './routes/monitoring.js';
import organizationRoutes from './routes/organizations.js';
import planningRoutes from './routes/planning.js';
import rosterRoutes from './routes/roster.js';
import schedulerRoutes from './routes/scheduler.js';
import staffRoutes from './routes/staff.js';
import teamRoutes from './routes/teams.js';
import uploadRoutes from './routes/upload.js';

// IT Administration Module Routes
import adRoutes from './routes/ad.js';
import itAssetsRoutes from './routes/itAssets.js';
import networkRoutes from './routes/network.js';
import securityRoutes from './routes/security.js';

// ...

// Validate environment
envValidator();

const app = express();
const httpServer = createServer(app);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow accessing images
  })
);
app.use(cors({ origin: '*' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use('/api/', limiter as any);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Swagger Documentation
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./docs/openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/interventions', interventionRoutes);
app.use('/api/scheduler', schedulerRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/roster', rosterRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/db', dbRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api', memberRoutes); // Mount at /api so paths become /api/organizations/:id/...
app.use('/api/billing', billingRoutes);

// IT Administration Module Routes
app.use('/api/it-assets', itAssetsRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/it-tickets', itTicketsRoutes);
app.use('/api/ad', adRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/devops', devopsRoutes);

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
    timestamp: new Date(),
  });

  res.json({
    success: true,
    message: 'Notification envoyée à tous les clients connectés',
  });
});

// Error handler
app.use(errorHandler);

// Initialize Socket.IO
initSocket(httpServer);

// Start server
import { startSagaConsumer } from './services/sagaConsumer.js';

// ...
// ...
app.post('/events', async (req, res) => {
  // Handling Saga Responses via HTTP
  const { topic, eventType, data } = req.body;
  console.log(`📥 [Backend HTTP] Received ${eventType} for ${data?.complaintId}`);

  // Reuse the logic from SagaConsumer? Or just duplicate for simplicty since type is different
  // Importing Component Model
  const { Complaint } = require('./models/Complaint.js');

  try {
    if (eventType === 'COMPLAINT_ASSIGNED') {
      await Complaint.findByIdAndUpdate(data.complaintId, {
        assignedTeamId: data.teamId,
        status: 'en cours',
        updatedAt: new Date(),
      });
      console.log(`✅ [Saga HTTP] Complaint ${data.complaintId} updated with Team ${data.teamId}`);
    } else if (eventType === 'ASSIGNMENT_FAILED') {
      await Complaint.findByIdAndUpdate(data.complaintId, {
        priority: 'urgent',
        updatedAt: new Date(),
      });
      console.log(`↩️ [Saga HTTP] Complaint ${data.complaintId} priority escalated.`);
    }
    res.json({ success: true });
  } catch (e: any) {
    console.error('Error in Backend HTTP Event:', e);
    res.status(500).json({ error: e.message });
  }
});

const start = async () => {
  try {
    await connectDB();

    if (process.env.DISABLE_KAFKA !== 'true') {
      await startSagaConsumer();
    } else {
      console.log('⚠️ Kafka Disabled. Backend ready for HTTP events.');
    }

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
