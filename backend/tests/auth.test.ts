import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import authRouter from '../src/routes/auth.js';

// Mock dependencies
jest.mock('../src/models/User.js', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('../src/models/AuditLog.js', () => ({
  default: {
    create: jest.fn(),
  },
}));

jest.mock('../src/services/tokenService.js', () => ({
  issueTokenPair: jest.fn(),
}));

jest.mock('../src/services/emailService.js', () => ({
  sendWelcomeEmail: jest.fn(),
  sendEmailVerification: jest.fn(), // missing in previous mock setup but needed by route
}));

jest.mock('../src/services/eventBus.js', () => ({
  eventBus: {
    publish: jest.fn(),
  },
}));

import { User } from '../src/models/User.js';
import { issueTokenPair } from '../src/services/tokenService.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

// Global Error Handler mock to prevent supertest 500 html pages
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode || 500).json({ success: false, error: err.message });
});

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should return 409 if email already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ _id: '123' });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'Password123!', name: 'Test User' });

      expect(res.status).toBe(409);
    });

    it('should return 201 on successful registration', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue({
        _id: 'user123',
        email: 'new@example.com',
        role: 'USER',
        organizationId: 'org123',
      });
      (issueTokenPair as jest.Mock).mockResolvedValue({
        accessToken: 'access',
        refreshToken: 'refresh',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'new@example.com', password: 'Password123!', name: 'Test User' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBe('access');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 401 on invalid credentials', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'Password123!' });

      expect(res.status).toBe(401);
    });

    it('should return 200 on successful login', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com',
        role: 'USER',
        organizationId: 'org123',
        comparePassword: jest.fn().mockResolvedValue(true),
      });
      (issueTokenPair as jest.Mock).mockResolvedValue({
        accessToken: 'access',
        refreshToken: 'refresh',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'Password123!' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBe('access');
    });
  });
});
