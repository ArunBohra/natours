import { injectable } from 'inversify';

import { IBookings, bookingsModel } from '@api/domains/bookings/database/bookingsModel';
import { BookingsRepositoryPort } from '@api/domains/bookings/database/bookingsRepositoryPort';

@injectable()
export class BookingsRepository implements BookingsRepositoryPort {
    async createBooking(bookingData: IBookings) {
        return await bookingsModel.create(bookingData);
    }

    async updateBooking(orderId: string, updateData: Partial<IBookings>) {
        return await bookingsModel.findOneAndUpdate({ orderId }, updateData, {
            new: true,
        });
    }
}
