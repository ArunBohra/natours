import { injectable } from 'inversify';

import { IBookings, IBookingsDocument, bookingsModel } from '@api/domains/bookings/database/bookingsModel';
import { BookingsRepositoryPort } from '@api/domains/bookings/database/bookingsRepositoryPort';

@injectable()
export class BookingsRepository implements BookingsRepositoryPort {
    async getBookingById(bookingId: string, populate?: (keyof IBookingsDocument)[]) {
        const booking = await bookingsModel.findById(bookingId);

        if (booking && populate?.length) {
            booking.populate(populate);
        }

        return booking;
    }

    async findBookingsByTourAndUser(tourId: string, userId: string) {
        const booking = await bookingsModel.find({ tour: tourId, user: userId });
        return booking;
    }

    async createBooking(bookingData: IBookings) {
        return await bookingsModel.create(bookingData);
    }

    async updateBooking(orderId: string, updateData: Partial<IBookings>) {
        return await bookingsModel.findOneAndUpdate({ orderId }, updateData, {
            new: true,
        });
    }
}
