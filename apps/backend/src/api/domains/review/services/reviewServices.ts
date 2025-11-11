import { inject, injectable } from 'inversify';

import { AppError } from '@shared/utils/errors/appError';

import { TYPES } from '@api/di/types';
import { BookingsRepositoryPort } from '@api/domains/bookings/database/bookingsRepositoryPort';
import { ReviewRepositoryPort } from '@api/domains/review/database/reviewRepositoryPort';
import { CreateReviewInputDTO, ReviewServicePort } from '@api/domains/review/services/reviewServicePort';

@injectable()
export class ReviewService implements ReviewServicePort {
    constructor(
        @inject(TYPES.BookingsRepository) private bookingsRepository: BookingsRepositoryPort,
        @inject(TYPES.ReviewRepository) private reviewRepository: ReviewRepositoryPort,
    ) {}

    async createReview(reviewData: CreateReviewInputDTO) {
        const bookings =
            (await this.bookingsRepository.findBookingsByTourAndUser(reviewData.tour, reviewData.user)) || [];

        let hasBaughtTourBefore = false;

        for (const booking of bookings) {
            if (booking.status === 'paid') {
                hasBaughtTourBefore = true;
                break;
            }
        }

        if (!hasBaughtTourBefore) {
            throw new AppError({
                message: 'You need to buy a tour before you can review it',
                statusCode: 403,
            });
        }

        const prevReviews = await this.reviewRepository.getReviews({
            user: reviewData.user,
            tour: reviewData.tour,
        });

        if (prevReviews.length) {
            throw new AppError({
                message: 'You can only provide 1 review per tour',
                statusCode: 403,
            });
        }

        const review = await this.reviewRepository.addReview(reviewData);

        return {
            id: review._id.toString(),
            tour: review.tour,
            user: review.user,
            rating: review.rating,
            body: review.body,
        };
    }
}
