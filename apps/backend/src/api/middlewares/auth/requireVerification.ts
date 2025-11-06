import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/utils/errors/appError';

export const requireVerification = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new AppError({
            message: 'Authentication required. Please use authenticate middleware first.',
            statusCode: 500,
        });
    }

    if (!req.user.verified) {
        throw new AppError({
            message: 'Your email is not verified. Please verify your email to continue.',
            statusCode: 403,
        });
    }

    next();
};

