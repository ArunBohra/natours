import { NextFunction, Request, Response } from 'express';

import { catchAsync } from '@shared/utils/catchAsync/catchAsync';
import { AppError } from '@shared/utils/errors/appError';

import { ServiceLocator } from '@api/di/serviceLocator';
import { IUserDocument } from '@api/domains/users/database/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
        }
    }
}

export const authenticate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jwtService = ServiceLocator.getJwtService();
    const userRepository = ServiceLocator.getUserRepository();

    const token = req.signedCookies?.jwt;

    if (!token) {
        throw new AppError({
            message: 'You are not logged in. Please log in to get access.',
            statusCode: 401,
        });
    }

    const decoded = jwtService.verifyToken(token) as { id: string; email: string };

    const currentUser = await userRepository.findUserById(decoded.id);

    if (!currentUser) {
        throw new AppError({
            message: 'The user belonging to this token does no longer exist.',
            statusCode: 401,
        });
    }

    req.user = currentUser;
    next();
});
