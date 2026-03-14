import mongoose, { Document, Schema } from 'mongoose';

export interface IRoster extends Document {
  week: string; // YYYY-WW format
  organizationId?: mongoose.Types.ObjectId;
  shifts: {
    staffId: mongoose.Types.ObjectId;
    days: {
      monday?: string;
      tuesday?: string;
      wednesday?: string;
      thursday?: string;
      friday?: string;
      saturday?: string;
      sunday?: string;
    };
  }[];
}

const RosterSchema: Schema = new Schema(
  {
    week: { type: String, required: true, index: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', index: true },
    shifts: [
      {
        staffId: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
        days: {
          monday: String,
          tuesday: String,
          wednesday: String,
          thursday: String,
          friday: String,
          saturday: String,
          sunday: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Roster = mongoose.model<IRoster>('Roster', RosterSchema);
