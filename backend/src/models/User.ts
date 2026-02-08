import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'dispatcher' | 'staff';
    comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'dispatcher', 'staff'],
            default: 'staff'
        }
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
