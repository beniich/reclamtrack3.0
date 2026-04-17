import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment extends Document {
  complaintId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  assignedAt: Date;
  completedAt?: Date;
  status: 'affecté' | 'en cours' | 'terminé';
  closureNote?: string;
  signature?: string;
  comments: { text: string; authorId: mongoose.Types.ObjectId; createdAt: Date }[];
}

const AssignmentSchema: Schema = new Schema(
  {
    complaintId: { type: Schema.Types.ObjectId, ref: 'Complaint', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    assignedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['affecté', 'en cours', 'terminé'],
      default: 'affecté',
    },
    closureNote: { type: String },
    signature: { type: String },
    completedAt: { type: Date },
    comments: [
      {
        text: { type: String, required: true },
        authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
