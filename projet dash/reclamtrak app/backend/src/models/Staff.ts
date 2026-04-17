import mongoose, { Document, Schema } from 'mongoose';

export interface IStaff extends Document {
  name: string;
  role: string;
  email: string;
  phone?: string;
  department?: string;
  status: 'active' | 'on_leave' | 'inactive';
  avatar?: string;
  organizationId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId; // Optional link to User model
}

const StaffSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    status: {
      type: String,
      enum: ['active', 'on_leave', 'inactive'],
      default: 'active',
    },
    avatar: { type: String },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Staff = mongoose.model<IStaff>('Staff', StaffSchema);
