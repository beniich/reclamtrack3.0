/**
 * @file pagination.ts
 * @description Shared pagination helpers — parse query params and build
 *              standardised paginated response metadata.
 *              Centralises the pagination logic that was duplicated across
 *              many route files.
 *
 * @example
 * ```ts
 * const { page, limit, skip } = parsePaginationParams(req.query);
 * const [data, total] = await Promise.all([
 *   Model.find(filter).skip(skip).limit(limit),
 *   Model.countDocuments(filter),
 * ]);
 * return sendPaginatedResponse(res, data, { page, limit, total });
 * ```
 */

import type { Response } from 'express';
import { successResponse } from './apiResponse.js';

// ─── Constants ───────────────────────────────────────────────────────────────

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 200,
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PaginationParams {
  /** Current page number (1-based) */
  page: number;
  /** Items per page */
  limit: number;
  /** MongoDB / SQL offset */
  skip: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse and sanitize pagination query parameters.
 * Falls back to safe defaults if values are missing or invalid.
 *
 * @param query - Express `req.query` (or any object with `page` / `limit`)
 * @returns Sanitized `{ page, limit, skip }`
 */
export const parsePaginationParams = (
  query: Record<string, string | string[] | undefined>,
): PaginationParams => {
  const rawPage = parseInt(String(query['page'] ?? PAGINATION_DEFAULTS.PAGE), 10);
  const rawLimit = parseInt(String(query['limit'] ?? PAGINATION_DEFAULTS.LIMIT), 10);

  const page = isNaN(rawPage) || rawPage < 1 ? PAGINATION_DEFAULTS.PAGE : rawPage;
  const limit =
    isNaN(rawLimit) || rawLimit < 1
      ? PAGINATION_DEFAULTS.LIMIT
      : Math.min(rawLimit, PAGINATION_DEFAULTS.MAX_LIMIT);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

/**
 * Build pagination metadata from current page info and total count.
 */
export const buildPaginationMeta = (
  page: number,
  limit: number,
  total: number,
): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});

/**
 * Send a standardised paginated response.
 *
 * @param res    - Express Response
 * @param data   - Array of items for the current page
 * @param meta   - `{ page, limit, total }` — totalPages + hasNext/hasPrev derived automatically
 */
export const sendPaginatedResponse = <T>(
  res: Response,
  data: T[],
  meta: { page: number; limit: number; total: number },
): Response => {
  return successResponse(res, data, 200, buildPaginationMeta(meta.page, meta.limit, meta.total));
};
