import { Router } from 'express';

import { ServiceLocator } from '@api/di/serviceLocator';
import { authenticate } from '@api/middlewares/auth/authenticate';
import { requireVerification } from '@api/middlewares/auth/requireVerification';
import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { bookTourSchema } from '@api/routes/bookings/bookingsSchema';

export const bookingsRouter = Router();

const controllers = {
    bookingsController: ServiceLocator.getBookingsController(),
};

bookingsRouter.post(
    '/:tourId',
    validateRequest(bookTourSchema, 'params'),
    authenticate,
    requireVerification,
    controllers.bookingsController.bookTour,
);

// webhooks
bookingsRouter.post('/webhook/book-tour', controllers.bookingsController.bookingWebhookController);
