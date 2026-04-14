import { Request, Response } from 'express';
import InventoryItem from '../models/InventoryItem.js';

export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const item = new InventoryItem(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getInventoryItems = async (req: Request, res: Response) => {
  try {
    // Optionally handle low stock filtering
    const { lowStock } = req.query;
    let query = {};
    if (lowStock === 'true') {
      query = { $expr: { $lte: ['$currentStock', '$minStockAlert'] } };
    }

    const items = await InventoryItem.find(query).sort({ currentStock: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getInventoryItemById = async (req: Request, res: Response) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Pièce non trouvée' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Pièce non trouvée' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Pièce non trouvée' });
    res.status(200).json({ success: true, message: 'Pièce supprimée' });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

// Route spéciale d'ajustement de stock rapide (Entrée/Sortie magasin)
export const adjustStock = async (req: Request, res: Response) => {
  try {
    const { quantityChange } = req.body; // e.g. -2 for consuming, +10 for receiving
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Pièce non trouvée' });

    item.currentStock += quantityChange;
    await item.save();

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
