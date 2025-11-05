import { container } from '@api/di/container';
import { TYPES } from '@api/di/types';
import { UserController } from '@api/domains/users/controllers/userController';
import { UserRepository } from '@api/domains/users/database/userRepository';
import { JwtPort } from '@shared/services/jwt/jwtPort';

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
}
