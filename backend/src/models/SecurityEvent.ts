import mongoose, { Schema, Document } from 'mongoose';

export interface ISecurityEvent extends Document {
    type: 'BRUTE_FORCE' | 'UNAUTHORIZED_ACCESS' | 'DATA_EXFILTRATION' | 'CONFIG_TAMPERING' | 'ANOMALY';
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'FALSE_POSITIVE';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    
    // Impact Assessment
    affectedUsers?: mongoose.Types.ObjectId[];
    organizationId?: mongoose.Types.ObjectId;
    
    // Threat Details
    sourceIp?: string;
    description: string;
    evidence: any;
    
    // Workflow
    assignedTo?: mongoose.Types.ObjectId;
    resolutionNotes?: string;
    
    // Times
    detectedAt: Date;
    resolvedAt?: Date;
}

const SecurityEventSchema: Schema = new Schema({
    type: {
        type: String,
        enum: ['BRUTE_FORCE', 'UNAUTHORIZED_ACCESS', 'DATA_EXFILTRATION', 'CONFIG_TAMPERING', 'ANOMALY'],
        required: true
    },
    status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'FALSE_POSITIVE'],
        default: 'OPEN'
    },
    severity: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        required: true
    },
    
    affectedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    
    sourceIp: { type: String },
    description: { type: String, required: true },
    evidence: { type: Schema.Types.Mixed },
    
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    resolutionNotes: { type: String },
    
    detectedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date }
});

SecurityEventSchema.index({ status: 1, severity: -1 });
SecurityEventSchema.index({ detectedAt: -1 });

export default mongoose.model<ISecurityEvent>('SecurityEvent', SecurityEventSchema);
