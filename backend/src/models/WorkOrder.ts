import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkOrder extends Document {
  number: string;
  title: string;
  description: string;
  type: 'corrective' | 'preventive' | 'improvement' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'planned' | 'assigned' | 'in_progress' | 'closed' | 'validated';
  
  // Relations
  assetId?: mongoose.Types.ObjectId;
  complaintId?: mongoose.Types.ObjectId; // Si généré depuis une réclamation
  assignedTeamId?: mongoose.Types.ObjectId; // Pool de techniciens
  technicianIds: mongoose.Types.ObjectId[]; // Techniciens assignés
  
  // Exécution
  scheduledStartDate?: Date;
  scheduledEndDate?: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  
  // Coûts et temps
  estimatedHours: number;
  actualHours: number;
  
  // Checklist et Preuves
  checklist: { step: string; isCompleted: boolean; completedAt?: Date }[];
  attachments: string[]; // Photos, signature électronique URL
  partsUsed: { partId: mongoose.Types.ObjectId; quantity: number }[]; // Lien futur vers Stock MRO
  
  // Validation
  supervisorSignature?: string;
  technicianSignature?: string;
  notes?: string;
}

const WorkOrderSchema: Schema = new Schema({
  number: { type: String, unique: true }, // ex: WO-2026-0001
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['corrective', 'preventive', 'improvement', 'inspection'], required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['draft', 'planned', 'assigned', 'in_progress', 'closed', 'validated'], default: 'draft' },
  
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' },
  assignedTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  technicianIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  scheduledStartDate: { type: Date },
  scheduledEndDate: { type: Date },
  actualStartDate: { type: Date },
  actualEndDate: { type: Date },
  
  estimatedHours: { type: Number, default: 0 },
  actualHours: { type: Number, default: 0 },
  
  checklist: [{
    step: String,
    isCompleted: { type: Boolean, default: false },
    completedAt: Date
  }],
  attachments: [{ type: String }],
  partsUsed: [{
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }, // Assuming an inventory tracking later
    quantity: Number
  }],
  
  supervisorSignature: { type: String },
  technicianSignature: { type: String },
  notes: { type: String }
}, { timestamps: true });

// Auto-generate unique WO number
WorkOrderSchema.pre<IWorkOrder>('save', function (next) {
  if (this.isNew && !this.number) {
    const year = new Date().getFullYear();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    this.number = `WO-${year}-${randomPart}`;
  }
  next();
});

export default mongoose.model<IWorkOrder>('WorkOrder', WorkOrderSchema);
