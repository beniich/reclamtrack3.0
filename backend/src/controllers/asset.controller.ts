import { Request, Response } from 'express';
import Asset from '../models/Asset.js';

export const createAsset = async (req: Request, res: Response) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json({ success: true, data: asset });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await Asset.find().populate('parentAsset');
    res.status(200).json({ success: true, data: assets });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getAssetById = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findById(req.params.id).populate('parentAsset');
    if (!asset) return res.status(404).json({ success: false, message: 'Asset non trouvé' });
    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const updateAsset = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!asset) return res.status(404).json({ success: false, message: 'Asset non trouvé' });
    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ success: false, message: 'Asset non trouvé' });
    res.status(200).json({ success: true, message: 'Asset supprimé' });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
