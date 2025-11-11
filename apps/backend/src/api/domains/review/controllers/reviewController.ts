import { inject, injectable } from 'inversify';

import { catchAsync } from '@shared/utils/catchAsync/catchAsync';
import { ResponseHandler } from '@shared/utils/responseHandler/responseHandler';

import { TYPES } from '@api/di/types';
import { ReviewServicePort } from '@api/domains/review/services/reviewServicePort';

@injectable()
export class ReviewController {
    constructor(@inject(TYPES.ReviewService) private reviewService: ReviewServicePort) {}

    addReview = catchAsync(async (req, res) => {
        const { rating, body } = req.body;
        const { tourId } = req.params;
        const userId = req.user!.id;

        const review = await this.reviewService.createReview({
            rating,
            body: body || undefined,
            tour: tourId,
            user: userId,
        });

        ResponseHandler.success(res, {
            message: 'Reviewed tour successfully',
            data: review,
            statusCode: 201,
        });
    });

    updateReview = catchAsync(async (req, res) => {});

    deleteReview = catchAsync(async (req, res) => {});

    getAllReviewForTour = catchAsync(async (req, res) => {});
}
