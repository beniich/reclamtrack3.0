import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Membership } from '../models/Membership.js';

/**
 * Extended Request interface with user and organization context
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    _id?: string;
    role: string;
    email?: string;
  };
  organizationId?: string;
  membership?: any;
}

/**
 * JWT Payload interface
 */
interface JwtPayload {
  id: string;
  role: string;
  email?: string;
}

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void | Response => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[Auth Middleware] Missing or invalid Authorization header');
    return res.status(401).json({
      success: false,
      error: 'Token requis',
      code: 'AUTH_TOKEN_MISSING',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    console.log(`[Auth Middleware] ✅ Token valid for user ${decoded.id}`);
    next();
  } catch (err) {
    console.error(
      '[Auth Middleware] ❌ Token verification failed:',
      err instanceof Error ? err.message : 'Unknown error'
    );
    return res.status(401).json({
      success: false,
      error: 'Token invalide ou expiré',
      code: 'AUTH_TOKEN_INVALID',
    });
  }
};

/**
 * Organization membership middleware
 * Requires authenticate middleware to be called first
 * Verifies user membership in the organization specified in x-organization-id header
 */
export const requireOrganization = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      console.warn('[Org Middleware] User ID missing from request user context');
      return res.status(401).json({
        success: false,
        error: 'Non authentifié',
        code: 'AUTH_USER_MISSING',
      });
    }

    // Get organization ID from header
    const organizationId = req.headers['x-organization-id'];
    if (!organizationId) {
      return res.status(400).json({
        success: false,
        error: 'En-tête x-organization-id requis',
        code: 'ORG_HEADER_MISSING',
      });
    }

    // Check membership
    const membership = await Membership.findOne({
      userId,
      organizationId,
      status: 'ACTIVE',
    });

    if (!membership) {
      return res.status(403).json({
        success: false,
        error: 'Accès refusé à cette organisation',
        code: 'ORG_ACCESS_DENIED',
      });
    }

    // Attach organization context to request
    req.organizationId = organizationId as string;
    req.membership = membership;

    console.log(`[Org Middleware] ✅ User ${userId} has access to org ${organizationId}`);
    next();
  } catch (error: any) {
    console.error('[Org Middleware] ❌ Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      code: 'ORG_CHECK_ERROR',
    });
  }
};

/**
 * Admin role middleware
 * Requires requireOrganization middleware to be called first
 */
export const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    if (!req.membership) {
      return res.status(403).json({
        success: false,
        error: "Context d'organisation manquant",
        code: 'ORG_CONTEXT_MISSING',
      });
    }

    if (!req.membership.isAdmin()) {
      return res.status(403).json({
        success: false,
        error: 'Droits administrateur requis',
        code: 'ADMIN_REQUIRED',
      });
    }

    console.log('[Admin Middleware] ✅ User has admin rights');
    next();
  } catch (error: any) {
    console.error('[Admin Middleware] ❌ Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      code: 'ADMIN_CHECK_ERROR',
    });
  }
};

/**
 * Role-based access control middleware
 * Requires requireOrganization middleware to be called first
 * @param roles - Single role string or array of role strings
 */
export const requireRole = (roles: string | string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      if (!req.membership) {
        return res.status(403).json({
          success: false,
          error: "Context d'organisation manquant",
          code: 'ORG_CONTEXT_MISSING',
        });
      }

      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      const hasPermission = allowedRoles.some((role) => req.membership.hasRole(role));

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          error: `Rôle requis: ${allowedRoles.join(' ou ')}`,
          code: 'ROLE_REQUIRED',
        });
      }

      console.log(`[Role Middleware] ✅ User has required role: ${allowedRoles.join(' or ')}`);
      next();
    } catch (error: any) {
      console.error('[Role Middleware] ❌ Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
        code: 'ROLE_CHECK_ERROR',
      });
    }
  };
};

/**
 * Rate limiting configuration
 * Can be customized per route
 */
export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds
  max?: number; // Max requests per window
  message?: string; // Custom error message
}

/**
 * Simple in-memory rate limiter
 * For production, use Redis-based rate limiting
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (options: RateLimitOptions = {}) => {
  const windowMs = options.windowMs || 60000; // 1 minute default
  const max = options.max || 100; // 100 requests per window default
  const message = options.message || 'Trop de requêtes, réessayez plus tard';

  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const key = req.ip || 'unknown';
    const now = Date.now();

    let record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
      rateLimitStore.set(key, record);
      return next();
    }

    if (record.count >= max) {
      console.warn(`[Rate Limiter] ⚠️ Rate limit exceeded for ${key}`);
      return res.status(429).json({
        success: false,
        error: message,
        code: 'RATE_LIMIT_EXCEEDED',
      });
    }

    record.count++;
    next();
  };
};

/**
 * Security headers middleware
 * Adds common security headers to responses
 */
export const securityHeaders = (_req: Request, res: Response, next: NextFunction): void => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Strict Transport Security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );

  next();
};

/**
 * CSRF token validation middleware
 * For mutation operations (POST, PUT, DELETE, PATCH)
 */
export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const csrfToken = req.headers['x-csrf-token'] as string;
  const expectedToken = req.headers['x-csrf-expected'] as string;

  if (!csrfToken || csrfToken !== expectedToken) {
    console.warn('[CSRF] ⚠️ Invalid CSRF token');
    return res.status(403).json({
      success: false,
      error: 'Token CSRF invalide',
      code: 'CSRF_INVALID',
    });
  }

  next();
};

// Export backward compatibility aliases
export const auth = authenticate;
export const protect = authenticate;
