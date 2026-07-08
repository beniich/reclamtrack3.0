/**
 * @file middleware.test.ts
 * @description Unit tests for core Express middlewares:
 *              errorHandler, asyncHandler, and pagination helpers.
 */

import { jest } from '@jest/globals';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import request from 'supertest';

// ─── asyncHandler ─────────────────────────────────────────────────────────────
import { asyncHandler } from '../src/utils/asyncHandler.js';

// ─── pagination ───────────────────────────────────────────────────────────────
import {
  buildPaginationMeta,
  PAGINATION_DEFAULTS,
  parsePaginationParams,
} from '../src/utils/pagination.js';

// ─── AppError ─────────────────────────────────────────────────────────────────
import {
  AppError,
  ForbiddenAppError,
  NotFoundAppError,
  ValidationAppError,
} from '../src/utils/AppError.js';

// ─── errorHandler ─────────────────────────────────────────────────────────────
import errorHandler from '../src/middleware/errorHandler.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Build a minimal Express app with one route and the global error handler. */
function buildApp(
  handler: (req: Request, res: Response, next: NextFunction) => void,
) {
  const app = express();
  app.use(express.json());
  app.get('/test', handler);
  // @ts-expect-error errorHandler has 4-arg signature
  app.use(errorHandler);
  return app;
}

// ─────────────────────────────────────────────────────────────────────────────
// asyncHandler
// ─────────────────────────────────────────────────────────────────────────────

describe('asyncHandler', () => {
  it('forwards async errors to next()', async () => {
    const app = buildApp(
      asyncHandler(async (_req, _res) => {
        throw new AppError('boom', 400, 'TEST_ERROR');
      }),
    );

    const res = await request(app).get('/test');
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ success: false, code: 'TEST_ERROR' });
  });

  it('does not interfere with successful async handlers', async () => {
    const app = express();
    app.use(express.json());
    app.get(
      '/ok',
      asyncHandler(async (_req, res) => {
        res.json({ success: true, data: 'ok' });
      }),
    );
    // @ts-expect-error errorHandler has 4-arg signature
    app.use(errorHandler);

    const res = await request(app).get('/ok');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// errorHandler
// ─────────────────────────────────────────────────────────────────────────────

describe('errorHandler', () => {
  it('handles AppError with correct statusCode and code', async () => {
    const app = buildApp((_req, _res, next) => {
      next(new AppError('not found', 404, 'NOT_FOUND'));
    });
    const res = await request(app).get('/test');
    expect(res.status).toBe(404);
    expect(res.body.code).toBe('NOT_FOUND');
  });

  it('handles NotFoundAppError (404)', async () => {
    const app = buildApp((_req, _res, next) => {
      next(new NotFoundAppError('Ticket'));
    });
    const res = await request(app).get('/test');
    expect(res.status).toBe(404);
    expect(res.body.code).toBe('NOT_FOUND');
  });

  it('handles ForbiddenAppError (403)', async () => {
    const app = buildApp((_req, _res, next) => {
      next(new ForbiddenAppError());
    });
    const res = await request(app).get('/test');
    expect(res.status).toBe(403);
    expect(res.body.code).toBe('FORBIDDEN');
  });

  it('handles ValidationAppError (400) with details', async () => {
    const app = buildApp((_req, _res, next) => {
      next(new ValidationAppError('invalid input', [{ field: 'email' }]));
    });
    const res = await request(app).get('/test');
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('returns 500 for unknown errors', async () => {
    const app = buildApp((_req, _res, next) => {
      next(new Error('something went wrong'));
    });
    const res = await request(app).get('/test');
    expect(res.status).toBe(500);
    expect(res.body.code).toBe('INTERNAL_ERROR');
  });

  it('handles malformed JSON body (SyntaxError with status 400)', async () => {
    const app = express();
    app.use(express.json());
    app.post('/test', (_req, res) => res.json({ ok: true }));
    // @ts-expect-error errorHandler has 4-arg signature
    app.use(errorHandler);

    const res = await request(app)
      .post('/test')
      .set('Content-Type', 'application/json')
      .send('{ invalid json }');
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('INVALID_JSON');
  });

  it('response envelope always contains success, error, code, timestamp', async () => {
    const app = buildApp((_req, _res, next) => {
      next(new AppError('test', 422, 'TEST'));
    });
    const res = await request(app).get('/test');
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('error');
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('timestamp');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// parsePaginationParams
// ─────────────────────────────────────────────────────────────────────────────

describe('parsePaginationParams', () => {
  it('returns defaults when no params are provided', () => {
    const result = parsePaginationParams({});
    expect(result.page).toBe(PAGINATION_DEFAULTS.PAGE);
    expect(result.limit).toBe(PAGINATION_DEFAULTS.LIMIT);
    expect(result.skip).toBe(0);
  });

  it('parses valid page and limit', () => {
    const result = parsePaginationParams({ page: '3', limit: '10' });
    expect(result.page).toBe(3);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(20);
  });

  it('clamps limit to MAX_LIMIT', () => {
    const result = parsePaginationParams({ page: '1', limit: '9999' });
    expect(result.limit).toBe(PAGINATION_DEFAULTS.MAX_LIMIT);
  });

  it('falls back to defaults for invalid (non-numeric) params', () => {
    const result = parsePaginationParams({ page: 'abc', limit: 'xyz' });
    expect(result.page).toBe(PAGINATION_DEFAULTS.PAGE);
    expect(result.limit).toBe(PAGINATION_DEFAULTS.LIMIT);
  });

  it('falls back to page=1 for page < 1', () => {
    const result = parsePaginationParams({ page: '-5', limit: '10' });
    expect(result.page).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// buildPaginationMeta
// ─────────────────────────────────────────────────────────────────────────────

describe('buildPaginationMeta', () => {
  it('calculates totalPages correctly', () => {
    const meta = buildPaginationMeta(1, 20, 55);
    expect(meta.totalPages).toBe(3);
  });

  it('sets hasNext = true when more pages remain', () => {
    const meta = buildPaginationMeta(1, 10, 25);
    expect(meta.hasNext).toBe(true);
  });

  it('sets hasNext = false on last page', () => {
    const meta = buildPaginationMeta(3, 10, 25);
    expect(meta.hasNext).toBe(false);
  });

  it('sets hasPrev = false on first page', () => {
    const meta = buildPaginationMeta(1, 10, 25);
    expect(meta.hasPrev).toBe(false);
  });

  it('sets hasPrev = true on page > 1', () => {
    const meta = buildPaginationMeta(2, 10, 25);
    expect(meta.hasPrev).toBe(true);
  });

  it('handles edge case: total = 0', () => {
    const meta = buildPaginationMeta(1, 20, 0);
    expect(meta.totalPages).toBe(0);
    expect(meta.hasNext).toBe(false);
  });
});
