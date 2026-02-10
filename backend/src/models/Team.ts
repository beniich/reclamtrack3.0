import mongoose, { Schema, Document } from 'mongoose';

export type TeamStatus = 'disponible' | 'intervention' | 'repos';

export interface ITeam extends Document {
    name: string;
    color: string; // for calendar UI
    status: TeamStatus;
    location?: {
        lat: number;
        lng: number;
    };
    members: mongoose.Types.ObjectId[]; // Array of User IDs
    leaderId?: mongoose.Types.ObjectId;
}

const TeamSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        color: { type: String, default: '#3b82f6' },
        status: {
            type: String,
            enum: ['disponible', 'intervention', 'repos'],
            default: 'disponible'
        },
        location: {
            lat: { type: Number },
            lng: { type: Number }
        },
        members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        leaderId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
