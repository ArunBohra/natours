import { JwtPort } from '@shared/services/jwt/jwtPort';

import { container } from '@api/di/container';
import { TYPES } from '@api/di/types';
import { BookingsController } from '@api/domains/bookings/controllers/bookingsController';
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

    static getBookinsController() {
        return container.get<BookingsController>(TYPES.BookingsController);
    }
}
