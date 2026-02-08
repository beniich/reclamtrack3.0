import mongoose, { Schema, Document } from 'mongoose';

export type TeamStatus = 'disponible' | 'intervention' | 'repos';

export interface ITeam extends Document {
    name: string;
    status: TeamStatus;
    location?: {
        lat: number;
        lng: number;
    };
}

const TeamSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        status: {
            type: String,
            enum: ['disponible', 'intervention', 'repos'],
            default: 'disponible'
        },
        location: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
