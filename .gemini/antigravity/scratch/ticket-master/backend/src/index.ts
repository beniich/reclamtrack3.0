import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import notificationService from './socket/index.js';
import complaintRoutes from './routes/complaints.js';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Initialiser Socket.IO
notificationService.init(server);

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reclamtrack')
    .then(() => console.log('🔗 Connecté à MongoDB'))
    .catch(err => console.error('❌ Erreur MongoDB:', err));

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.json({
        message: '🚀 API ReclamTrack - Notifications en temps réel',
        status: 'online'
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📡 WebSocket disponible sur ws://localhost:${PORT}`);
});
