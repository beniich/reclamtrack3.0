import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';

// Use jest.unstable_mockModule to mock ES modules if needed, or jest.mock to mock correctly for ts-jest
jest.mock('../src/middleware/security.js', () => ({
  authenticate: (req: any, res: any, next: any) => {
    req.user = { id: 'user123', organizationId: 'org123' };
    next();
  },
  requireOrganization: (req: any, res: any, next: any) => {
    req.organizationId = 'org123';
    next();
  },
  requireAdmin: (req: any, res: any, next: any) => {
    next();
  },
}));

jest.mock('../src/models/Staff.js', () => ({
  Staff: {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

import { Staff } from '../src/models/Staff.js';
import staffRouter from '../src/routes/staff.js';

const app = express();
app.use(express.json());
app.use('/api/staff', staffRouter);

describe('Staff Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/staff', () => {
    it('should return staff members', async () => {
      const mockStaff = [{ _id: '1', name: 'John Doe' }];
      // @ts-expect-error - Staff.find().sort result is not correctly inferred as a mock
      (Staff.find().sort as jest.Mock).mockResolvedValue(mockStaff);

      const res = await request(app).get('/api/staff');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockStaff);
    });
  });

  describe('POST /api/staff', () => {
    it('should create new staff member', async () => {
      const mockNewStaff = { _id: '2', name: 'Jane Doe', organizationId: 'org123' };
      (Staff.create as jest.Mock).mockResolvedValue(mockNewStaff as never);

      const res = await request(app).post('/api/staff').send({ name: 'Jane Doe' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockNewStaff);
    });
  });
});
