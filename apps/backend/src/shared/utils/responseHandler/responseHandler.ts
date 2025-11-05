import { Response } from 'express';

import { ErrorTypes } from '@shared/utils/errors/appError';

interface I_SuccessResponse {
    success: true;
    message?: string;
    data?: unknown;
    statusCode?: number;
    meta?: Record<string, unknown> | null;
}

interface I_ErrorDetails {
    [key: string]: unknown;
}

interface I_ErrorResponse {
    success: false;
    message?: string;
    errors?: I_ErrorDetails | I_ErrorDetails[] | null;
    stack?: string | null;
    statusCode?: number;
    errorType: ErrorTypes;
}

type ResponseOptions = I_SuccessResponse | I_ErrorResponse;

export class ResponseHandler {
    /**
     * Send a standardized success response
     */
    static success(
        res: Response,
        {
            message = 'Success!',
            data = {},
            statusCode = 200,
        }: {
            message?: string;
            data?: unknown;
            statusCode?: number;
        } = {},
    ) {
        const response: ResponseOptions = {
            success: true,
            message,
            data,
        };

        return res.status(statusCode).json(response);
    }

    /**
     * Send a standardized error response
     */
    static error(
        res: Response,
        {
            message = 'Internal Server Error',
            statusCode = 500,
            errors,
            stack,
            errorType = 'unknown-error',
        }: {
            message?: string;
            statusCode?: number;
            errors?: Record<string, unknown>[] | null;
            stack?: string | null;
            errorType: ErrorTypes;
        },
    ) {
        const response: ResponseOptions = {
            success: false,
            message,
            stack,
            errorType,
            errors: errors || [],
        };

        return res.status(statusCode).json(response);
    }
}
