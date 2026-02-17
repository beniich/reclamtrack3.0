import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string; // The user ID is stored as a string or ObjectId depending on the middleware
    role?: string;
    _id?: any; // To cover all bases
  };
  organizationId?: string;
  membership?: any;
}
