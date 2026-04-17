/**
 * @file ApiKey.ts
 * @description Mongoose model for API keys (organization-scoped, hashed, with rate limits).
 * @module backend/models
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IApiKey extends Document {
  orgId: mongoose.Types.ObjectId;
  /** SHA-256 hash of the raw key — never stored raw */
  keyHash: string;
  /** Prefix of the raw key for display only (first 8 chars), e.g. "rtk_ab12" */
  keyPrefix: string;
  name: string;
  scopes: string[];
  plan: 'starter' | 'pro' | 'enterprise';
  /** Max requests per minute allowed for this key (null = plan default) */
  rateLimit: number;
  lastUsedAt?: Date;
  expiresAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    keyHash: { type: String, required: true, unique: true },
    keyPrefix: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    scopes: [{ type: String }],
    plan: { type: String, enum: ['starter', 'pro', 'enterprise'], default: 'starter' },
    rateLimit: { type: Number, default: 60 },
    lastUsedAt: { type: Date },
    expiresAt: { type: Date, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ApiKey = mongoose.model<IApiKey>('ApiKey', ApiKeySchema);
