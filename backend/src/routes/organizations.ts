import { Response, Router } from 'express';
import { body } from 'express-validator';
import { authenticate, requireOrganization } from '../middleware/security.js';
import { validator } from '../middleware/validator.js';
import AuditLog from '../models/AuditLog.js';
import { Membership } from '../models/Membership.js';
import { Organization } from '../models/Organization.js';

const router = Router();

/**
 * @route   POST /api/organizations
 * @desc    Create a new organization
 * @access  Private
 */
router.post(
  '/',
  authenticate,
  [
    body('name').notEmpty().trim().isLength({ min: 3, max: 100 }),
    body('slug')
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 50 })
      .matches(/^[a-z0-9-]+$/),
  ],
  validator,
  async (req: any, res: Response) => {
    try {
      const { name, slug } = req.body;
      const userId = req.user.id;

      // Check if slug already exists
      const existing = await Organization.findOne({ slug });
      if (existing) {
        return res.status(409).json({ message: 'Ce slug est déjà utilisé' });
      }

      // Create organization
      const organization = await Organization.create({
        name,
        slug,
        ownerId: userId,
        subscription: {
          plan: 'FREE',
          status: 'TRIAL',
          maxUsers: 5,
          maxTickets: 100,
          // Trial expires in 14 days
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });

      // Create membership for the creator (OWNER role)
      await Membership.create({
        userId,
        organizationId: organization._id,
        roles: ['OWNER'],
        status: 'ACTIVE',
      });

      // Audit log
      await AuditLog.create({
        action: 'CREATE_ORGANIZATION',
        userId,
        targetId: organization._id.toString(),
        targetType: 'Organization',
        details: { name, slug },
        ipAddress: req.ip,
      });

      res.status(201).json({
        success: true,
        organization,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route   GET /api/organizations
 * @desc    Get all organizations the user is a member of
 * @access  Private
 */
router.get('/', authenticate, async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    // Find all memberships for this user
    const memberships = await Membership.find({
      userId,
      status: 'ACTIVE',
    }).populate('organizationId');

    const organizations = memberships
      .filter((m) => m.organizationId) // Guard against null populates
      .map((m) => ({
        ...(m.organizationId as any).toObject(),
        membership: {
          roles: m.roles,
          joinedAt: m.joinedAt,
        },
      }));

    res.json({ success: true, organizations });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/organizations/:id
 * @desc    Get organization details
 * @access  Private (must be a member)
 */
router.get('/:id', authenticate, requireOrganization, async (req: any, res: Response) => {
  try {
    const organization = await Organization.findById(req.organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organisation introuvable' });
    }

    res.json({
      success: true,
      organization,
      membership: {
        roles: req.membership.roles,
        joinedAt: req.membership.joinedAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/organizations/:id
 * @desc    Update organization settings
 * @access  Private (Admin only)
 */
router.patch('/:id', authenticate, requireOrganization, async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    // Check admin permission
    if (!req.membership.isAdmin()) {
      return res.status(403).json({ message: 'Droits insuffisants' });
    }

    const organization = await Organization.findByIdAndUpdate(
      req.organizationId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!organization) {
      return res.status(404).json({ message: 'Organisation introuvable' });
    }

    res.json({ success: true, organization });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
