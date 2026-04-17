import mongoose, { Document, Schema } from 'mongoose';

export interface ITechnicalSchema extends Document {
  name: string;
  description?: string;
  projectData: string; // The JSON exported from Paper.js
  thumbnailData?: string; // Optional SVG or base64 preview
  createdBy: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TechnicalSchemaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez nommer ce schéma technique'],
      trim: true,
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      maxlength: [500, 'La description ne peut pas dépasser 500 caractères'],
    },
    projectData: {
      type: String,
      required: [true, 'Les données du schéma sont requises'],
    },
    thumbnailData: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITechnicalSchema>('TechnicalSchema', TechnicalSchemaSchema);
