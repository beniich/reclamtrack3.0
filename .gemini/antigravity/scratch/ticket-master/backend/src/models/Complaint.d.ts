import mongoose, { Document } from 'mongoose';
export interface IComplaint extends Document {
    title: string;
    description: string;
    status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IComplaint, {}, {}, {}, mongoose.Document<unknown, {}, IComplaint, {}, {}> & IComplaint & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Complaint.d.ts.map