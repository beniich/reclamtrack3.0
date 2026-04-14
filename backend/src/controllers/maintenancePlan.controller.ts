import { Request, Response } from 'express';
import MaintenancePlan from '../models/MaintenancePlan.js';

export const createMaintenancePlan = async (req: Request, res: Response) => {
  try {
    const plan = new MaintenancePlan(req.body);
    await plan.save();
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getMaintenancePlans = async (req: Request, res: Response) => {
  try {
    const plans = await MaintenancePlan.find()
      .populate('specificAssetId', 'name code')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getMaintenancePlanById = async (req: Request, res: Response) => {
  try {
    const plan = await MaintenancePlan.findById(req.params.id)
      .populate('specificAssetId', 'name code category');
    if (!plan) return res.status(404).json({ success: false, message: 'Plan de Maintenance non trouvé' });
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const updateMaintenancePlan = async (req: Request, res: Response) => {
  try {
    const plan = await MaintenancePlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan de Maintenance non trouvé' });
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteMaintenancePlan = async (req: Request, res: Response) => {
  try {
    const plan = await MaintenancePlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan de Maintenance non trouvé' });
    res.status(200).json({ success: true, message: 'Plan supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
