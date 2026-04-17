import { Response } from 'express';

/**
 * Standard API Response Interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  timestamp: string;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  };
}

/**
 * Error Response Interface
 */
export interface ErrorResponse {
  success: false;
  error: string;
  code: string;
  timestamp: string;
  details?: any;
}

/**
 * Success response helper
 * @param res - Express Response object
 * @param data - Data to send
 * @param statusCode - HTTP status code (default: 200)
 * @param metadata - Optional metadata (pagination, etc.)
 */
export const successResponse = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  metadata?: ApiResponse['metadata']
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...(metadata && { metadata }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Error response helper
 * @param res - Express Response object
 * @param error - Error message
 * @param statusCode - HTTP status code (default: 500)
 * @param code - Error code
 * @param details - Additional error details
 */
export const errorResponse = (
  res: Response,
  error: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): Response => {
  const response: ErrorResponse = {
    success: false,
    error,
    code: code || `HTTP_${statusCode}`,
    timestamp: new Date().toISOString(),
    ...(details && { details }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Validation error response helper
 * @param res - Express Response object
 * @param errors - Validation errors
 */
export const validationErrorResponse = (res: Response, errors: any[]): Response => {
  return errorResponse(res, 'Erreur de validation', 422, 'VALIDATION_ERROR', errors);
};

/**
 * Unauthorized response helper
 * @param res - Express Response object
 * @param message - Optional custom message
 */
export const unauthorizedResponse = (
  res: Response,
  message: string = 'Non authentifié'
): Response => {
  return errorResponse(res, message, 401, 'UNAUTHORIZED');
};

/**
 * Forbidden response helper
 * @param res - Express Response object
 * @param message - Optional custom message
 */
export const forbiddenResponse = (res: Response, message: string = 'Accès refusé'): Response => {
  return errorResponse(res, message, 403, 'FORBIDDEN');
};

/**
 * Not found response helper
 * @param res - Express Response object
 * @param resource - Resource name
 */
export const notFoundResponse = (res: Response, resource: string = 'Ressource'): Response => {
  return errorResponse(res, `${resource} non trouvé(e)`, 404, 'NOT_FOUND');
};

/**
 * Conflict response helper
 * @param res - Express Response object
 * @param message - Conflict message
 */
export const conflictResponse = (
  res: Response,
  message: string = 'Conflit de ressource'
): Response => {
  return errorResponse(res, message, 409, 'CONFLICT');
};

/**
 * Rate limit response helper
 * @param res - Express Response object
 */
export const rateLimitResponse = (res: Response): Response => {
  return errorResponse(res, 'Trop de requêtes, réessayez plus tard', 429, 'RATE_LIMIT_EXCEEDED');
};

/**
 * Paginated response helper
 * @param res - Express Response object
 * @param data - Data array
 * @param page - Current page
 * @param limit - Items per page
 * @param total - Total items
 */
export const paginatedResponse = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number
): Response => {
  return successResponse(res, data, 200, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  });
};

/**
 * No content response helper (204)
 * @param res - Express Response object
 */
export const noContentResponse = (res: Response): Response => {
  return res.status(204).send();
};

/**
 * Created response helper (201)
 * @param res - Express Response object
 * @param data - Created resource data
 */
export const createdResponse = <T>(res: Response, data: T): Response => {
  return successResponse(res, data, 201);
};

/**
 * Accepted response helper (202)
 * @param res - Express Response object
 * @param message - Optional message
 */
export const acceptedResponse = (
  res: Response,
  message: string = 'Requête acceptée pour traitement'
): Response => {
  return successResponse(res, { message }, 202);
};

/**
 * Error code constants
 */
export const ErrorCodes = {
  // Authentication
  AUTH_TOKEN_MISSING: 'AUTH_TOKEN_MISSING',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_CREDENTIALS_INVALID: 'AUTH_CREDENTIALS_INVALID',

  // Authorization
  FORBIDDEN: 'FORBIDDEN',
  ROLE_REQUIRED: 'ROLE_REQUIRED',
  ADMIN_REQUIRED: 'ADMIN_REQUIRED',
  ORG_ACCESS_DENIED: 'ORG_ACCESS_DENIED',
  ORG_CONTEXT_MISSING: 'ORG_CONTEXT_MISSING',
  ORG_HEADER_MISSING: 'ORG_HEADER_MISSING',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',

  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',

  // Rate Limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // Security
  CSRF_INVALID: 'CSRF_INVALID',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
