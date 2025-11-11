import { Router } from 'express';

import { ServiceLocator } from '@api/di/serviceLocator';
import { authenticate } from '@api/middlewares/auth/authenticate';
import { requireVerification } from '@api/middlewares/auth/requireVerification';
import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { addReviewSchema } from '@api/routes/review/reviewSchema';

export const reviewRouter = Router();

const reviewController = ServiceLocator.getReviewController();

// get all reviews for a tour
reviewRouter.get('/:tourId', authenticate);

reviewRouter.post(
    '/:tourId',
    validateRequest(addReviewSchema),
    authenticate,
    requireVerification,
    reviewController.addReview,
);
