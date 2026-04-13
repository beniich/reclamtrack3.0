import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  role: 'admin' | 'dispatcher' | 'staff' | 'citizen' | 'technician';
  googleId?: string;
  avatar?: string;
  isEmailVerified?: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  organizationId?: mongoose.Types.ObjectId;
  authProvider?: 'local' | 'google';
  
  // SOC 2 IAM enhancements
  mfaEnabled?: boolean;
  mfaSecret?: string;
  mfaBackupCodes?: string[];
  lastLoginAt?: Date;
  lastLoginIp?: string;
  failedLoginCount?: number;
  lockedUntil?: Date;
  passwordChangedAt?: Date;
  passwordHistory?: string[];
  activeSessions?: Array<{
    tokenHash: string;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
    lastActivityAt: Date;
  }>;
  
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: function (this: any) {
        return !this.googleId; // Password required only if not Google auth
      },
    },
    role: {
      type: String,
      enum: ['admin', 'dispatcher', 'staff', 'citizen', 'technician'],
      default: 'staff',
    },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    // SOC 2 IAM enhancements
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String },
    mfaBackupCodes: [{ type: String }],
    
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
    failedLoginCount: { type: Number, default: 0 },
    lockedUntil: { type: Date },
    
    passwordChangedAt: { type: Date },
    passwordHistory: [{ type: String }],
    
    activeSessions: [{
        tokenHash: String,
        ipAddress: String,
        userAgent: String,
        createdAt: Date,
        lastActivityAt: Date
    }]
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
