/**
 * @file RefreshToken.ts
 * @description Mongoose model for hashed refresh tokens with rotation and family tracking.
 *              Supports detection of refresh token reuse attacks via family invalidation.
 * @module backend/models
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: mongoose.Types.ObjectId;
  /** SHA-256 hash of the raw refresh token (never stored raw) */
  tokenHash: string;
  /**
   * Family ID (UUID) — all rotations of the same token chain share a family.
   * If a revoked token from this family is presented, the ENTIRE family is revoked
   * (refresh token reuse attack detection).
   */
  family: string;
  expiresAt: Date;
  revokedAt?: Date;
  /** IP address of the client that issued this token */
  createdFromIp?: string;
  createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    family: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date, default: null },
    createdFromIp: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/** Auto-expire documents from MongoDB after expiresAt using TTL index */
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

/** Convenience virtual: is this token still valid? */
RefreshTokenSchema.virtual('isValid').get(function (this: IRefreshToken) {
  return !this.revokedAt && this.expiresAt > new Date();
});

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
