import { injectable } from 'inversify';

import { IReview, reviewModel } from '@api/domains/review/database/reviewModel';
import { ReviewRepositoryPort } from '@api/domains/review/database/reviewRepositoryPort';

@injectable()
export class ReviewRepository implements ReviewRepositoryPort {
    async getReviews(findQuery: Partial<IReview>) {
        return await reviewModel.find({ ...findQuery });
    }

    async findReviewById(reviewId: string) {
        return await reviewModel.findById(reviewId);
    }

    async addReview(reviewData: IReview) {
        return await reviewModel.create(reviewData);
    }

    async updateReview(id: string, updateData: Partial<IReview>) {
        return await reviewModel.findOneAndUpdate({ id }, updateData, {
            new: true,
        });
    }
}
