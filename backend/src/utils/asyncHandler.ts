/**
 * @file asyncHandler.ts
 * @description Generic wrapper that catches async errors and forwards them
 *              to the Express error-handler, eliminating boilerplate try/catch
 *              in every controller / route handler.
 *
 * @example
 * ```ts
 * router.get('/items', asyncHandler(async (req, res) => {
 *   const items = await ItemService.getAll();
 *   successResponse(res, items);
 * }));
 * ```
 */

import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Async request handler type — same signature as Express RequestHandler but
 * the function body is expected to be async (returns Promise<void>).
 */
export type AsyncRequestHandler<
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string | string[]>,
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>;

/**
 * Wraps an async route handler and catches any rejected promise,
 * forwarding it to `next()` so the global error handler processes it.
 *
 * @param fn - Async Express route handler
 * @returns Express-compatible synchronous RequestHandler
 */
export const asyncHandler =
  <P = Record<string, string>, ResBody = unknown, ReqBody = unknown, ReqQuery = Record<string, string | string[]>>(
    fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  (req, res, next): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
