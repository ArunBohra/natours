import { HydratedDocument } from 'mongoose';

import { IBookings, IBookingsDocument } from '@api/domains/bookings/database/bookingsModel';

export interface BookingsRepositoryPort {
    createBooking: (bookingData: IBookings) => Promise<HydratedDocument<IBookingsDocument>>;
}
