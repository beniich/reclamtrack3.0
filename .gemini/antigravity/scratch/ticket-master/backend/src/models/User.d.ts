import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "dispatcher" | "agent" | "technician";
    avatar: string;
    isActive: boolean;
    team?: mongoose.Types.ObjectId | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "dispatcher" | "agent" | "technician";
    avatar: string;
    isActive: boolean;
    team?: mongoose.Types.ObjectId | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "dispatcher" | "agent" | "technician";
    avatar: string;
    isActive: boolean;
    team?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "dispatcher" | "agent" | "technician";
    avatar: string;
    isActive: boolean;
    team?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "dispatcher" | "agent" | "technician";
    avatar: string;
    isActive: boolean;
    team?: mongoose.Types.ObjectId | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "dispatcher" | "agent" | "technician";
    avatar: string;
    isActive: boolean;
    team?: mongoose.Types.ObjectId | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=User.d.ts.map