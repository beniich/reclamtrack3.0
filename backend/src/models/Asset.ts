import mongoose, { Schema, Document } from 'mongoose';

export interface IAsset extends Document {
  code: string;
  name: string;
  category: string;
  location: {
    site: string;
    zone: string;
    position: string;
  };
  status: 'operational' | 'faulty' | 'maintenance' | 'decommissioned';
  criticality: 'A' | 'B' | 'C';
  classification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
  specs: Record<string, string>;
  documents: string[];
  qrCode: string;
  installDate: Date;
  warrantyExpiry?: Date;
  parentAsset?: mongoose.Types.ObjectId;
}

const AssetSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: {
    site: { type: String },
    zone: { type: String },
    position: { type: String }
  },
  status: { type: String, enum: ['operational', 'faulty', 'maintenance', 'decommissioned'], default: 'operational' },
  criticality: { type: String, enum: ['A', 'B', 'C'], default: 'B' },
  classification: { type: String, enum: ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED'], default: 'INTERNAL' },
  specs: { type: Map, of: String, default: {} },
  documents: [{ type: String }],
  qrCode: { type: String },
  installDate: { type: Date },
  warrantyExpiry: { type: Date },
  parentAsset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }
}, { timestamps: true });

export default mongoose.model<IAsset>('Asset', AssetSchema);
