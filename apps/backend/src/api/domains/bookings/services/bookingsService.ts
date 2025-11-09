import { inject, injectable } from 'inversify';

import { getEnv } from '@config/env';

import { PaymentsProviderPort } from '@shared/services/payments/paymentsProviderPort';

import { TYPES } from '@api/di/types';
import { BookingsRepository } from '@api/domains/bookings/database/bookingsRepository';
import {
    BookTourInputDTO,
    BookTourOutputDTO,
    BookingRefsDto,
    BookingsServicePort,
} from '@api/domains/bookings/services/bookingsServicePort';

@injectable()
export class BookingsService implements BookingsServicePort {
    constructor(
        @inject(TYPES.BookingsRepository) private bookingsRepository: BookingsRepository,
        @inject(TYPES.PaymentsProvider) private paymentsProvider: PaymentsProviderPort,
    ) {}

    async bookTour(bookTourInput: BookTourInputDTO, bookingRefs: BookingRefsDto) {
        const booking = await this.paymentsProvider.createOrder(bookTourInput.bookingData);

        await this.bookingsRepository.createBooking({
            tour: bookingRefs.tour,
            user: bookingRefs.user,
            status: booking.status,
            receipt: booking.receipt,
            orderId: booking.orderId,
        });

        const checkoutData: BookTourOutputDTO = {
            key: booking.key,
            amount: booking.amount,
            currency: booking.currency,
            name: 'Natours',
            order_id: booking.orderId,
            callback_url: `${getEnv('FRONTEND_URL')}/payment-succes`,
            prefill: {
                name: bookTourInput.userData.name,
                email: bookTourInput.userData.email,
            },
        };

        return checkoutData;
    }

    verifyWebhookSignature(rawBody: string, razorpaySignature: string, webhookSecret: string) {
        return this.paymentsProvider.verifyWebhookSignature(
            rawBody,
            razorpaySignature,
            webhookSecret,
        );
    }

    async handleSuccessfulBooking(orderId: string) {
        await this.bookingsRepository.updateBooking(orderId, {
            status: 'paid',
        });
    }
}
