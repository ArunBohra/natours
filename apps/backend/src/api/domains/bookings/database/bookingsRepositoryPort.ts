import { HydratedDocument } from 'mongoose';

import { IBookings, IBookingsDocument } from '@api/domains/bookings/database/bookingsModel';

export interface BookingsRepositoryPort {
    getBookingById: (
        bookingId: string,
        populate?: (keyof IBookingsDocument)[],
    ) => Promise<HydratedDocument<IBookingsDocument> | null>;
    findBookingsByTourAndUser: (
        tourId: string,
        userId: string,
    ) => Promise<HydratedDocument<IBookingsDocument>[] | null>;
    createBooking: (bookingData: IBookings) => Promise<HydratedDocument<IBookingsDocument>>;
    updateBooking: (
        orderId: string,
        updateData: Partial<IBookings>,
    ) => Promise<HydratedDocument<IBookingsDocument> | null>;
}
