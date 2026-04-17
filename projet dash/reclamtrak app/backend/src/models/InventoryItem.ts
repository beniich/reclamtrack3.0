import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryItem extends Document {
  reference: string;
  name: string;
  category: 'mechanics' | 'electrical' | 'hvac' | 'consumable' | 'tools' | 'other';
  description: string;
  
  // Magasin & Stock
  location: string; // Ex: Rayon A, Étagère 3
  currentStock: number;
  minStockAlert: number;
  maxStock: number;
  unit: 'piece' | 'kg' | 'liter' | 'meter' | 'box';
  
  // Achat & Coût
  supplier: string;
  manufacturerCode?: string;
  unitPrice: number;
  currency: string;
  
  isActive: boolean;
}

const InventoryItemSchema: Schema = new Schema({
  reference: { type: String, required: true, unique: true }, // ex: ROULEM-6204-ZZ
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['mechanics', 'electrical', 'hvac', 'consumable', 'tools', 'other'],
    default: 'other'
  },
  description: { type: String },
  
  location: { type: String },
  currentStock: { type: Number, default: 0 },
  minStockAlert: { type: Number, default: 5 },
  maxStock: { type: Number },
  unit: { type: String, enum: ['piece', 'kg', 'liter', 'meter', 'box'], default: 'piece' },
  
  supplier: { type: String },
  manufacturerCode: { type: String },
  unitPrice: { type: Number, default: 0 },
  currency: { type: String, default: 'EUR' },
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);
