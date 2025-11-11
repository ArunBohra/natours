import { Currency } from '@shared/types/types';

export interface TourBookingData {
    amount: number;
    currency: Currency;
    notes: {
        tour: string;
        user: string;
    };
}

export interface BookTourOutputDTO {
    key: string;
    amount: string | number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    callback_url: string;
    prefill: {
        name: string;
        email: string;
        contact?: string;
    };
}

export interface BookTourInputDTO {
    bookingData: TourBookingData;
    userData: { name: string; email: string };
}

export interface BookingRefsDto {
    user: string;
    tour: string;
}

export interface BookingsServicePort {
    getOneBooking: (bookingId: string) => Promise<{}>;
    bookTour: (bookingData: BookTourInputDTO, bookingRefs: BookingRefsDto) => Promise<BookTourOutputDTO>;
    verifyWebhookSignature: (rawBody: string, razorpaySignature: string, webhookSecret: string) => boolean;
    handleSuccessfulBooking: (orderId: string) => Promise<void>;
}
