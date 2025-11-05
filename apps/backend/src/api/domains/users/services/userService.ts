import { inject, injectable } from 'inversify';

import { JwtService } from '@shared/services/jwt/jwtService';
import { AppError } from '@shared/utils/errors/appError';

import { TYPES } from '@api/di/types';
import { UserRepository } from '@api/domains/users/database/userRepository';
import { CreateUserDTO, UserServicePort } from '@api/domains/users/services/userServicePort';

@injectable()
export class UserService implements UserServicePort {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.JWTService) private jwtService: JwtService,
    ) {}

    async createUser(userData: CreateUserDTO) {
        const existingUser = await this.userRepository.findUserByEmail(
            userData.email.toLowerCase(),
        );

        if (existingUser) {
            throw new AppError({ message: 'User with that email exists', statusCode: 401 });
        }

        const user = await this.userRepository.createUser({
            ...userData,
            email: userData.email.toLowerCase(),
        });

        const jwt = this.jwtService.generateToken({ id: user.id, email: user.email });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            jwt,
        };
    }

    async loginUser({ email, password }: { email: string; password: string }) {
        const user = await this.userRepository.findUserByEmail(email.toLowerCase());

        if (!user) {
            throw new AppError({ message: 'Invalid credentials', statusCode: 401 });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new AppError({ message: 'Invalid credentials', statusCode: 401 });
        }

        const jwt = this.jwtService.generateToken({ id: user.id, email: user.email });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            jwt,
        };
    }
}
