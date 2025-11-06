import { inject, injectable } from 'inversify';

import { getEnv } from '@config/env';

import { catchAsync } from '@shared/utils/catchAsync/catchAsync';
import { ResponseHandler } from '@shared/utils/responseHandler/responseHandler';
import { AppError } from '@shared/utils/errors/appError';

import { TYPES } from '@api/di/types';

import { UserService } from '../services/userService';

@injectable()
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    signup = catchAsync(async (req, res) => {
        const { name, email, password } = req.body;

        const user = await this.userService.createUser({
            name,
            email,
            password,
        });

        res.cookie('jwt', user.jwt, {
            httpOnly: true,
            secure: getEnv('NODE_ENV') === 'production',
            sameSite: 'strict',
            signed: true,
        });

        ResponseHandler.success(res, {
            message: 'Signup successful.',
            statusCode: 201,
            data: user,
        });
    });

    login = catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const user = await this.userService.loginUser({ email, password });

        res.cookie('jwt', user.jwt, {
            httpOnly: true,
            secure: getEnv('NODE_ENV') === 'production',
            sameSite: 'strict',
            signed: true,
        });

        ResponseHandler.success(res, {
            message: 'Login successful',
            statusCode: 200,
            data: user,
        });
    });

    logout = catchAsync(async (req, res) => {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        ResponseHandler.success(res, {
            message: 'Logout successful',
            statusCode: 200,
        });
    });

    verifyEmail = catchAsync(async (req, res) => {
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            throw new AppError({
                message: 'Verification token is required',
                statusCode: 400,
            });
        }

        await this.userService.verifyUser(token);

        ResponseHandler.success(res, {
            message: 'Email verified successfully',
            statusCode: 200,
        });
    });

    regenerateVerificationToken = catchAsync(async (req, res) => {
        if (!req.user) {
            throw new AppError({
                message: 'User not authenticated',
                statusCode: 401,
            });
        }

        await this.userService.regenerateVerificationToken(req.user._id.toString());

        ResponseHandler.success(res, {
            message: 'Verification email sent successfully',
            statusCode: 200,
        });
    });
}
