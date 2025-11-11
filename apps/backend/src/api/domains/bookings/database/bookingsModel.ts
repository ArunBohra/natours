import { Model, Schema, Types, model } from 'mongoose';
import { Orders } from 'razorpay/dist/types/orders';

import { ITourDocument } from '@api/domains/tours/database/tourModel';
import { IUserDocument } from '@api/domains/users/database/userModel';
import { IBaseDocument } from '@api/interfaces/baseDocument';

const bookingsSchema = new Schema(
    {
        tour: {
            type: Types.ObjectId,
            ref: 'Tour',
            required: true,
        },
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        receipt: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['created', 'attempted', 'paid'],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export interface IBookings {
    tour: string | ITourDocument;
    user: string | IUserDocument;
    status: Orders.RazorpayOrder['status'];
    receipt: string;
    orderId: string;
}

export interface IBookingsDocument extends IBookings, IBaseDocument {
    isPasswordCorrect: (candidatePassword: string) => Promise<boolean>;
}

interface IBookingsModel extends Model<IBookingsDocument> {}

export const bookingsModel = model<IBookingsDocument, IBookingsModel>('Bookings', bookingsSchema);
