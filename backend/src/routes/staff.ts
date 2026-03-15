import { Router } from 'express';
import { authenticate, requireOrganization } from '../middleware/security.js';
import { Staff } from '../models/Staff.js';

const router = Router();

// Apply global middleware
router.use(authenticate, requireOrganization);

router.get('/', async (req, res, next) => {
  try {
    const staff = await Staff.find({ organizationId: req.organizationId }).sort({ name: 1 });
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const staff = await Staff.findOne({
      _id: req.params.id,
      organizationId: req.organizationId,
    });
    if (!staff) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      organizationId: req.organizationId,
    };
    const newStaff = await Staff.create(data);
    res.status(201).json(newStaff);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedStaff = await Staff.findOneAndUpdate(
      { _id: req.params.id, organizationId: req.organizationId },
      req.body,
      { new: true }
    );
    if (!updatedStaff) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(updatedStaff);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Staff.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.organizationId,
    });
    if (!deleted) return res.status(404).json({ message: 'Employé non trouvé' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
