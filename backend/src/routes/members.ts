import { Response, Router } from 'express';
import { body } from 'express-validator';
import { authenticate, requireAdmin, requireOrganization } from '../middleware/security.js';
import { validator } from '../middleware/validator.js';
import { Membership } from '../models/Membership.js';
import { User } from '../models/User.js';

const router = Router();

/**
 * @route   GET /api/organizations/:id/members
 * @desc    List all members of an organization
 * @access  Private (Member)
 */
router.get(
  '/organizations/:id/members',
  authenticate,
  requireOrganization,
  async (req: any, res: Response) => {
    try {
      const members = await Membership.find({ organizationId: req.organizationId })
        .populate('userId', 'name email avatar')
        .populate('invitedBy', 'name');

      res.json({
        success: true,
        data: members.map((m) => ({
          id: m._id,
          user: m.userId,
          roles: m.roles,
          status: m.status,
          joinedAt: m.joinedAt,
          invitedBy: m.invitedBy,
        })),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route   POST /api/organizations/:id/members
 * @desc    Invite a user to the organization
 * @access  Private (Admin)
 */
router.post(
  '/organizations/:id/members',
  authenticate,
  requireOrganization,
  requireAdmin,
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('role').isIn(['ADMIN', 'MEMBER', 'TECHNICIAN']).withMessage('Rôle invalide'),
  ],
  validator,
  async (req: any, res: Response) => {
    try {
      const { email, role } = req.body;
      const inviterId = req.user.id;

      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé avec cet email' });
      }

      // Check if already a member
      const existingMembership = await Membership.findOne({
        userId: user._id,
        organizationId: req.organizationId,
      });

      if (existingMembership) {
        return res.status(409).json({ message: 'Cet utilisateur est déjà membre ou invité' });
      }

      // Create membership
      const membership = await Membership.create({
        userId: user._id,
        organizationId: req.organizationId,
        roles: [role],
        status: 'INVITED',
        invitedBy: inviterId,
      });

      res.status(201).json({
        success: true,
        message: 'Invitation envoyée',
        membership,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route   PATCH /api/organizations/:id/members/:membershipId
 * @desc    Update member role
 * @access  Private (Admin)
 */
router.patch(
  '/organizations/:id/members/:membershipId',
  authenticate,
  requireOrganization,
  requireAdmin,
  [body('roles').isArray().withMessage('Roles doit être un tableau')],
  validator,
  async (req: any, res: Response) => {
    try {
      const { membershipId } = req.params;
      const { roles } = req.body;

      const membership = await Membership.findOneAndUpdate(
        { _id: membershipId, organizationId: req.organizationId },
        { $set: { roles } },
        { new: true }
      );

      if (!membership) {
        return res.status(404).json({ message: 'Membre introuvable' });
      }

      res.json({ success: true, membership });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route   DELETE /api/organizations/:id/members/:membershipId
 * @desc    Remove member from organization
 * @access  Private (Admin)
 */
router.delete(
  '/organizations/:id/members/:membershipId',
  authenticate,
  requireOrganization,
  requireAdmin,
  async (req: any, res: Response) => {
    try {
      const { membershipId } = req.params;

      const deleted = await Membership.findOneAndDelete({
        _id: membershipId,
        organizationId: req.organizationId,
      });

      if (!deleted) return res.status(404).json({ message: 'Membre introuvable' });

      res.json({ success: true, message: 'Membre retiré' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
