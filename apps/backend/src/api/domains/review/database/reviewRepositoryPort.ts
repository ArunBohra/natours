import { HydratedDocument } from 'mongoose';

import { IReview, IReviewDocument } from '@api/domains/review/database/reviewModel';

export interface ReviewRepositoryPort {
    getReviews: (findQuery: Partial<IReview>) => Promise<HydratedDocument<IReviewDocument>[]>;
    addReview: (reviewData: IReview) => Promise<HydratedDocument<IReviewDocument>>;
    updateReview: (id: string, updateData: Partial<IReview>) => Promise<HydratedDocument<IReviewDocument> | null>;
    findReviewById: (reviewId: string) => Promise<HydratedDocument<IReviewDocument> | null>;
}
