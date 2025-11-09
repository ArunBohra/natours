import { inject, injectable } from 'inversify';

import { getEnv } from '@config/env';

import { PaymentWebhookPayload } from '@shared/services/payments/paymentsProviderPort';
import { catchAsync } from '@shared/utils/catchAsync/catchAsync';
import { ResponseHandler } from '@shared/utils/responseHandler/responseHandler';

import { TYPES } from '@api/di/types';
import { BookingsService } from '@api/domains/bookings/services/bookingsService';
import { TourBookingData } from '@api/domains/bookings/services/bookingsServicePort';
import { TourService } from '@api/domains/tours/services/tourService';

@injectable()
export class BookingsController {
    constructor(
        @inject(TYPES.TourService) private tourService: TourService,
        @inject(TYPES.BookingsService) private bookingsService: BookingsService,
    ) {}

    bookTour = catchAsync(async (req, res) => {
        const tourDetails = await this.tourService.getTourById(req.params.tourId);

        const bookingData: TourBookingData = {
            amount: tourDetails.price * 100, // need to convert to smallest currency unit
            currency: 'INR', // only INR at this point
            notes: {
                tour: tourDetails.id,
                user: req.user!.id,
            },
        };

        const paymentRefs = {
            user: req.user!.id,
            tour: tourDetails.id,
        };

        const booking = await this.bookingsService.bookTour(
            {
                bookingData,
                userData: {
                    name: req.user!.name,
                    email: req.user!.email,
                },
            },
            paymentRefs,
        );

        ResponseHandler.success(res, {
            statusCode: 201,
            message: 'Booking created successfully',
            data: booking,
        });
    });

    bookingWebhookController = catchAsync(async (req, res) => {
        const reqBody: PaymentWebhookPayload = req.body;
        const { event, payload } = reqBody;

        if (!event.startsWith('order.')) {
            return ResponseHandler.success(res, {
                message: 'Webhook received successfully.',
                statusCode: 200,
            });
        }

        const isValidRazorpaySignature = this.bookingsService.verifyWebhookSignature(
            JSON.stringify(reqBody),
            req.headers['x-razorpay-signature'] as string,
            getEnv('BOOK_TOUR_WEBHOOK_SECRET'),
        );

        if (!isValidRazorpaySignature) {
            // TODO: Also log the incident
            return ResponseHandler.error(res, {
                statusCode: 400,
                message: 'Invalid Razorpay webhook signature.',
                errorType: 'app-error',
            });
        }

        if (!reqBody || !reqBody.payload) {
            return ResponseHandler.error(res, {
                statusCode: 400,
                message: 'Invalid webhook payload.',
                errorType: 'app-error',
            });
        }

        if (event === 'order.paid') {
            await this.bookingsService.handleSuccessfulBooking(payload.order.entity.id);
            ResponseHandler.success(res, {
                message: 'Webhook received successfully.',
                statusCode: 200,
            });
            return;
        }

        // Handle unsuccessful/failed or other payment events
    });
}
