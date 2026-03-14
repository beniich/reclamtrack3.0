import { Router } from 'express';
import { authenticate as protect } from '../middleware/security.js';
import { Staff } from '../models/Staff.js';

const router = Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const filter: any = {};
    if (req.user?.organizationId) {
      filter.organizationId = req.user.organizationId;
    }

    const staff = await Staff.find(filter).sort({ name: 1 });
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', protect, async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      organizationId: req.user?.organizationId,
    };
    const newStaff = await Staff.create(data);
    res.status(201).json(newStaff);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStaff);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
