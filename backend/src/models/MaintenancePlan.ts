import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenancePlan extends Document {
  name: string;
  description: string;
  assetCategory?: string;
  specificAssetId?: mongoose.Types.ObjectId; // Optionnel : s'applique à un équipement précis
  
  frequency: {
    type: 'calendar' | 'counter';
    interval: number;
    unit: 'days' | 'weeks' | 'months' | 'years' | 'hours' | 'km';
  };
  
  estimatedDuration: number; // en heures
  checklist: { step: string; required: boolean }[];
  requiredParts: { partName: string; quantity: number }[]; // Simplifié pour l'instant
  skillsRequired: string[];
  classification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
  
  isActive: boolean;
  
  lastExecuted?: Date;
  nextDue?: Date;
}

const MaintenancePlanSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  assetCategory: { type: String },
  specificAssetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  
  frequency: {
    type: { type: String, enum: ['calendar', 'counter'], required: true },
    interval: { type: Number, required: true },
    unit: { type: String, enum: ['days', 'weeks', 'months', 'years', 'hours', 'km'], required: true }
  },
  
  estimatedDuration: { type: Number, default: 1 },
  
  checklist: [{
    step: String,
    required: { type: Boolean, default: true }
  }],
  
  requiredParts: [{
    partName: String,
    quantity: Number
  }],
  
  skillsRequired: [{ type: String }],
  classification: { type: String, enum: ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED'], default: 'INTERNAL' },
  
  isActive: { type: Boolean, default: true },
  lastExecuted: { type: Date },
  nextDue: { type: Date }
}, { timestamps: true });

export default mongoose.model<IMaintenancePlan>('MaintenancePlan', MaintenancePlanSchema);
