import { Request, Response, NextFunction } from 'express';
import { Membership } from '../models/Membership.js';

/**
 * Middleware to check if user is a member of the organization specified in header
 * Requires protect middleware to be called first
 */
export const requireOrganization = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: 'Non authentifié' });
        }

        // Get organization ID from header
        const organizationId = req.headers['x-organization-id'];
        if (!organizationId) {
            return res.status(400).json({
                message: 'En-tête x-organization-id requis'
            });
        }

        // Check membership
        const membership = await Membership.findOne({
            userId,
            organizationId,
            status: 'ACTIVE'
        });

        if (!membership) {
            return res.status(403).json({
                message: 'Accès refusé à cette organisation'
            });
        }

        // Attach organization context to request
        req.organizationId = organizationId;
        req.membership = membership;

        next();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Middleware to check if user has admin rights in the organization
 */
export const requireAdmin = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.membership) {
            return res.status(403).json({ message: 'Context d\'organisation manquant' });
        }

        if (!req.membership.isAdmin()) {
            return res.status(403).json({
                message: 'Droits administrateur requis'
            });
        }

        next();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Middleware to check if user has a specific role
 */
export const requireRole = (role: string) => {
    return async (req: any, res: Response, next: NextFunction) => {
        try {
            if (!req.membership) {
                return res.status(403).json({ message: 'Context d\'organisation manquant' });
            }

            if (!req.membership.hasRole(role)) {
                return res.status(403).json({
                    message: `Rôle ${role} requis`
                });
            }

            next();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
};
