/**
 * Test for Security Middleware
 */

import { NextFunction, Request, Response } from 'express';
// @ts-ignore
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { authenticate } from '../src/middleware/security.js';

jest.mock('jsonwebtoken');

describe('Security Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    // @ts-ignore
    (jwt.verify as jest.Mock).mockClear();
  });

  describe('authenticate', () => {
    it('should return 401 if Authorization header is missing', () => {
      authenticate(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Token manquant ou format invalide' })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if Authorization format is invalid', () => {
      req.headers.authorization = 'IncorrectFormat Token123';

      authenticate(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() and attach user if token is valid', () => {
      req.headers.authorization = 'Bearer ValidToken123';
      const userPayload = { id: '123', role: 'USER' };

      // @ts-ignore
      (jwt.verify as jest.Mock).mockReturnValue(userPayload);

      authenticate(req as Request, res as Response, next);

      expect(jwt.verify).toHaveBeenCalledWith(
        'ValidToken123',
        process.env.JWT_SECRET || expect.any(String)
      );
      expect((req as any).user).toEqual(userPayload);
      expect(next).toHaveBeenCalled();
    });

    it('should return 401 if token verification fails', () => {
      req.headers.authorization = 'Bearer BadToken';
      // @ts-ignore
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authenticate(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'AUTH_TOKEN_INVALID' })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
