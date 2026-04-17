/**
 * @file Subscription.ts
 * @description Mongoose model for organization subscriptions (synced from Stripe).
 * @module backend/models
 */

import mongoose, { Document, Schema } from 'mongoose';

export type PlanName = 'starter' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';

/** Feature flags — controls what each plan can access */
export const PLAN_FEATURES: Record<PlanName, string[]> = {
  starter: ['complaints', 'basic_reporting', 'email_support'],
  pro: ['complaints', 'advanced_analytics', 'api_access', 'priority_support', 'sso'],
  enterprise: [
    'complaints',
    'advanced_analytics',
    'api_access',
    'priority_support',
    'sso',
    'custom_integrations',
    'dedicated_support',
    'sla',
    'audit_logs',
  ],
};

export const PLAN_MAX_USERS: Record<PlanName, number> = {
  starter: 5,
  pro: 20,
  enterprise: Infinity,
};

export interface ISubscription extends Document {
  orgId: mongoose.Types.ObjectId;
  plan: PlanName;
  status: SubscriptionStatus;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCustomerId?: string;
  maxUsers: number;
  features: string[];
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      unique: true,
      index: true,
    },
    plan: { type: String, enum: ['starter', 'pro', 'enterprise'], default: 'starter' },
    status: {
      type: String,
      enum: ['active', 'past_due', 'canceled', 'trialing', 'incomplete'],
      default: 'active',
    },
    stripeSubscriptionId: { type: String, unique: true, sparse: true },
    stripePriceId: { type: String },
    stripeCustomerId: { type: String },
    maxUsers: { type: Number, default: 5 },
    features: [{ type: String }],
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
    cancelAtPeriodEnd: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
