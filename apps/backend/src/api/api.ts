import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import helmet from 'helmet';

import { connectDB } from '@config/db';
import { getEnv } from '@config/env';

import { ResponseHandler } from '@shared/utils/responseHandler/responseHandler';

import { globalErrorHandler } from '@api/middlewares/errors/globalErrorHandler';
import { tourRouter } from '@api/routes/tour/tourRoutes';
import { userRouter } from '@api/routes/user/userRoutes';

export const initApi = (): Express => {
    (async () => await connectDB())();

    const api = express();

    api.use(express.urlencoded({ extended: true }));
    api.use(express.json());

    api.use(cookieParser(getEnv('COOKIE_SECRET')));

    api.use(helmet());

    api.use('/api/v1/users', userRouter);
    api.use('/api/v1/tours', tourRouter);

    api.use((req, res) => {
        ResponseHandler.error(res, {
            statusCode: 404,
            message: `Can't ${req.method} at ${req.path} on this server.`,
            errorType: 'app-error',
        });
    });

    api.use(globalErrorHandler);

    return api;
};
