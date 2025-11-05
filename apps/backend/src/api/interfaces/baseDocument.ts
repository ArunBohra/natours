import { Document, Types } from 'mongoose';

// Base interface for all models
export interface IBaseDocument extends Document {
    _id: Types.ObjectId;
}
