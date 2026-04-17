/**
 * @file AppError.ts
 * @description Custom error class hierarchy for centralized, type-safe error handling.
 * @module backend/utils
 */

/**
 * Base operational error — thrown deliberately by application code.
 * Non-operational errors (programming bugs) should NOT use this class.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  /** True = client error (4xx), safe to expose in response. False = server error, mask details in prod. */
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    // Maintain proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/** 400 — Bad request, invalid input */
export class ValidationAppError extends AppError {
  public readonly details: unknown;
  constructor(message = 'Données invalides', details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

/** 401 — Missing or invalid authentication */
export class AuthAppError extends AppError {
  constructor(message = 'Non authentifié', code = 'UNAUTHORIZED') {
    super(message, 401, code);
  }
}

/** 401 — JWT access token has expired (client should refresh) */
export class TokenExpiredAppError extends AuthAppError {
  constructor() {
    super('Token expiré — veuillez rafraîchir votre session', 'AUTH_TOKEN_EXPIRED');
  }
}

/** 401 — JWT token is invalid / malformed */
export class TokenInvalidAppError extends AuthAppError {
  constructor() {
    super('Token invalide', 'AUTH_TOKEN_INVALID');
  }
}

/** 403 — Authenticated but not authorized */
export class ForbiddenAppError extends AppError {
  constructor(message = 'Accès refusé', code = 'FORBIDDEN') {
    super(message, 403, code);
  }
}

/** 404 — Resource not found */
export class NotFoundAppError extends AppError {
  constructor(resource = 'Ressource') {
    super(`${resource} non trouvé(e)`, 404, 'NOT_FOUND');
  }
}

/** 409 — Conflict (duplicate resource) */
export class ConflictAppError extends AppError {
  constructor(message = 'Conflit de ressource') {
    super(message, 409, 'CONFLICT');
  }
}

/** 429 — Rate limit exceeded */
export class RateLimitAppError extends AppError {
  constructor() {
    super('Trop de requêtes — réessayez plus tard', 429, 'RATE_LIMIT_EXCEEDED');
  }
}

/** 402 — Subscription limit reached */
export class SubscriptionLimitError extends AppError {
  constructor(message = 'Limite de votre abonnement atteinte', code = 'SUBSCRIPTION_LIMIT') {
    super(message, 402, code);
  }
}

/** Type guard — check if an error is an operational AppError */
export const isAppError = (err: unknown): err is AppError =>
  err instanceof AppError && err.isOperational;
