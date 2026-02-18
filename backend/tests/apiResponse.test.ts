/**
 * Test for API Response Utilities
 */

import { Response } from 'express';
// @ts-ignore
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  ErrorCodes,
  createdResponse,
  errorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '../src/utils/apiResponse.js';

// Mock Response object
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('API Response Utilities', () => {
  let res: Response;

  beforeEach(() => {
    res = mockResponse();
  });

  describe('successResponse', () => {
    it('should return 200 and standard success structure', () => {
      const data = { id: 1, name: 'Test' };
      successResponse(res, data);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: data,
          timestamp: expect.any(String),
        })
      );
    });

    it('should return custom status code', () => {
      successResponse(res, {}, 202);
      expect(res.status).toHaveBeenCalledWith(202);
    });
  });

  describe('errorResponse', () => {
    it('should return 500 and standard error structure by default', () => {
      const errorMsg = 'Something went wrong';
      errorResponse(res, errorMsg);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: errorMsg,
          code: 'HTTP_500',
          timestamp: expect.any(String),
        })
      );
    });

    it('should return custom status and error code', () => {
      errorResponse(res, 'Not Found', 404, ErrorCodes.NOT_FOUND);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.NOT_FOUND,
        })
      );
    });
  });

  describe('Helper Functions', () => {
    it('createdResponse should return 201', () => {
      createdResponse(res, { id: 1 });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('unauthorizedResponse should return 401', () => {
      unauthorizedResponse(res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'UNAUTHORIZED',
        })
      );
    });

    it('notFoundResponse should return 404', () => {
      notFoundResponse(res, 'User');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'User non trouvé(e)',
        })
      );
    });
  });
});
