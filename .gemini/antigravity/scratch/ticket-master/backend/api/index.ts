import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import complaintRoutes from '../src/routes/complaints.js';
import authRoutes from '../src/routes/auth.js';
import aiRoutes from '../src/routes/ai.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB (lazy connection for serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reclamtrack');
  isConnected = true;
};

app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: '🚀 API ReclamTrack',
    status: 'online'
  });
});

export default app;
