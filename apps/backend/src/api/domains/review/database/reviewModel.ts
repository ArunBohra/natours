import { Model, Schema, Types, model } from 'mongoose';

import { ITourDocument } from '@api/domains/tours/database/tourModel';
import { IUserDocument } from '@api/domains/users/database/userModel';
import { IBaseDocument } from '@api/interfaces/baseDocument';

const reviewSchema = new Schema(
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
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        body: {
            type: String,
            required: false,
            min: [4, 'Review should be more than 4 characters long'],
        },
    },
    {
        timestamps: true,
    },
);

export interface IReview {
    tour: string | ITourDocument;
    user: string | IUserDocument;
    rating: number;
    body?: string;
}

export interface IReviewDocument extends IReview, IBaseDocument {}

interface IReviewModel extends Model<IReviewDocument> {}

export const reviewModel = model<IReviewDocument, IReviewModel>('Review', reviewSchema);
