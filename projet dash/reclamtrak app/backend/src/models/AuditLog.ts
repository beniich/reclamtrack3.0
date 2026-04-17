import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IAuditLog extends Document {
    action: string;
    userId?: mongoose.Types.ObjectId; // Optional for system events
    organizationId?: mongoose.Types.ObjectId;
    targetId?: string;
    targetType?: string;
    category: 'AUTH' | 'DATA_ACCESS' | 'CONFIG_CHANGE' | 'SECURITY' | 'COMPLIANCE' | 'SYSTEM';
    severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    classification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
    outcome: 'SUCCESS' | 'FAILURE' | 'BLOCKED';
    
    // Context
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
    requestId?: string;
    // Data Changes (Diff)
    previousValue?: any;
    newValue?: any;
    details?: any;
    
    // Multi-Tenancy Monitoring
    tenantDbUri?: string; // (Masqué/Haché pour sécurité)
    executionTimeMs?: number;
    
    // Compliance
    timestamp: Date;
    retentionUntil: Date;
    integrityHash?: string;
    
    generateIntegrityHash(): string;
}

const AuditLogSchema: Schema = new Schema({
    action: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    targetId: { type: String },
    targetType: { type: String },
    
    category: { 
        type: String, 
        enum: ['AUTH', 'DATA_ACCESS', 'CONFIG_CHANGE', 'SECURITY', 'COMPLIANCE', 'SYSTEM'],
        default: 'SYSTEM'
    },
    severity: {
        type: String,
        enum: ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'INFO'
    },
    outcome: {
        type: String,
        enum: ['SUCCESS', 'FAILURE', 'BLOCKED'],
        default: 'SUCCESS'
    },
    classification: {
        type: String,
        enum: ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED'],
        default: 'INTERNAL'
    },

    ipAddress: { type: String },
    userAgent: { type: String },
    sessionId: { type: String },
    requestId: { type: String },
    previousValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    details: { type: Schema.Types.Mixed },

    tenantDbUri: { type: String }, // Sera haché avant insertion si sensible
    executionTimeMs: { type: Number },

    timestamp: { type: Date, default: Date.now },
    retentionUntil: { type: Date },
    integrityHash: { type: String }
});

// Calculate retention date (7 years for SOC 2)
AuditLogSchema.pre<IAuditLog>('save', function(next) {
    if (!this.retentionUntil) {
        const retentionDate = new Date(this.timestamp);
        retentionDate.setFullYear(retentionDate.getFullYear() + 7);
        this.retentionUntil = retentionDate;
    }
    
    // Generate integrity hash before saving manually
    if (!this.integrityHash) {
         this.integrityHash = this.generateIntegrityHash();
    }
    next();
});

// Generate SHA-256 hash for tamper-proofing
AuditLogSchema.methods.generateIntegrityHash = function(): string {
    const dataString = `${this.action}|${this.userId}|${this.targetId}|${this.timestamp.toISOString()}|${JSON.stringify(this.details || {})}`;
    return crypto.createHash('sha256').update(dataString).digest('hex');
};

// Indexes for performance and retention
AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ userId: 1 });
AuditLogSchema.index({ organizationId: 1 });
AuditLogSchema.index({ action: 1 });
AuditLogSchema.index({ category: 1, severity: 1 });
// TTL index for auto-deletion after retention period
AuditLogSchema.index({ retentionUntil: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
