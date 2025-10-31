import { globalErrorHandler } from '@api/middlewares/errors/globalErrorHandler';
import { userRouter } from '@api/routes/user/userRoutes';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import { getEnv } from '@config/env';

export const initApi = (): Express => {
    const api = express();

    api.use(express.json());
    api.use(cookieParser(getEnv('COOKIE_SECRET')));

    api.use('/api/v1', userRouter);

    api.use(globalErrorHandler);

    return api;
};
