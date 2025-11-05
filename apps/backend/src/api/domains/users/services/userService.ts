import crypto from 'crypto';
import { inject, injectable } from 'inversify';

import { getEnv } from '@config/env';

import { EmailServicePort } from '@shared/services/email/emailServicePort';
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
        @inject(TYPES.EmailService) private emailService: EmailServicePort,
    ) {}

    private generateVerificationToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    private getVerificationUrl(token: string): string {
        const baseUrl = getEnv('FRONTEND_URL', 'http://localhost:3000');
        return `${baseUrl}/verify-email?token=${token}`;
    }

    async createUser(userData: CreateUserDTO) {
        const existingUser = await this.userRepository.findUserByEmail(
            userData.email.toLowerCase(),
        );

        if (existingUser) {
            throw new AppError({ message: 'User with that email exists', statusCode: 401 });
        }

        const verificationToken = this.generateVerificationToken();
        const verificationTokenExpiresAt = new Date(Date.now() + 90 * 60 * 1000); // 90 minutes

        const user = await this.userRepository.createUser({
            ...userData,
            email: userData.email.toLowerCase(),
            verificationToken,
            verificationTokenExpiresAt,
        });

        const verificationUrl = this.getVerificationUrl(verificationToken);
        await this.emailService.sendVerificationEmail(user.email, verificationUrl);

        const jwt = this.jwtService.generateToken({ id: user._id.toString(), email: user.email });

        return {
            id: user._id.toString(),
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

        const jwt = this.jwtService.generateToken({ id: user._id.toString(), email: user.email });

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            jwt,
        };
    }

    async verifyUser(token: string) {
        const user = await this.userRepository.findUserByVerificationToken(token);

        if (!user) {
            throw new AppError({
                message: 'Invalid or expired verification token',
                statusCode: 400,
            });
        }

        if (user.verified) {
            throw new AppError({
                message: 'User is already verified',
                statusCode: 400,
            });
        }

        if (!user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < new Date()) {
            throw new AppError({
                message: 'Verification token has expired',
                statusCode: 400,
            });
        }

        await this.userRepository.updateUser(user._id.toString(), {
            verified: true,
            verificationToken: undefined,
            verificationTokenExpiresAt: undefined,
        });
    }

    async regenerateVerificationToken(userId: string) {
        const user = await this.userRepository.findUserById(userId);

        if (!user) {
            throw new AppError({ message: 'User not found', statusCode: 404 });
        }

        if (user.verified) {
            throw new AppError({
                message: 'User is already verified',
                statusCode: 400,
            });
        }

        const verificationToken = this.generateVerificationToken();
        const verificationTokenExpiresAt = new Date(Date.now() + 90 * 60 * 1000); // 90 minutes

        await this.userRepository.updateUser(userId, {
            verificationToken,
            verificationTokenExpiresAt,
        });

        const verificationUrl = this.getVerificationUrl(verificationToken);
        await this.emailService.sendVerificationEmail(user.email, verificationUrl);
    }
}
