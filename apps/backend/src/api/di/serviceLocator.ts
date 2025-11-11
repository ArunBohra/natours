import { JwtPort } from '@shared/services/jwt/jwtPort';

import { container } from '@api/di/container';
import { TYPES } from '@api/di/types';
import { BookingsController } from '@api/domains/bookings/controllers/bookingsController';
import { ReviewController } from '@api/domains/review/controllers/reviewController';
import { TourController } from '@api/domains/tours/controllers/tourController';
import { UserController } from '@api/domains/users/controllers/userController';
import { UserRepository } from '@api/domains/users/database/userRepository';

export class ServiceLocator {
    static getUserController() {
        return container.get<UserController>(TYPES.UserController);
    }

    static getUserRepository() {
        return container.get<UserRepository>(TYPES.UserRepository);
    }

    static getJwtService() {
        return container.get<JwtPort>(TYPES.JWTService);
    }

    static getTourController() {
        return container.get<TourController>(TYPES.TourController);
    }

    static getBookingsController() {
        return container.get<BookingsController>(TYPES.BookingsController);
    }

    static getReviewController() {
        return container.get<ReviewController>(TYPES.ReviewController);
    }
}
