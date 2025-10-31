import { ErrorRequestHandler, Response } from 'express';

import { AppError } from '@shared/utils/errors/appError';
import { InternalServerError } from '@shared/utils/errors/internalServerError';
import { ResponseHandler } from '@shared/utils/responseHandler/responseHandler';

const handleErrorsDev = (res: Response, err: AppError) => {
    ResponseHandler.error(res, {
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
        errors: err?.errors,
        errorType: err.type,
    });

    // eslint-disable-next-line no-console
    console.log('Error: ', err);
};

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let error: AppError = err;
    // TODO: Handle other errors eg. err coming from db
    if (!(err instanceof AppError)) {
        // TODO: Need to log these unknown errors
        // eslint-disable-next-line no-console
        console.error('Unknown error: ', err);

        error = new InternalServerError({
            message: 'Sorry, something went wrong. Please try again.',
        });
        error.type = 'unknown-error';
    }

    if (process.env.NODE_ENV === 'development') {
        handleErrorsDev(res, error);
        return;
    }

    ResponseHandler.error(res, {
        message: error.message,
        statusCode: error.statusCode,
        errors: error?.errors,
        errorType: error.type,
    });
    return;
};
