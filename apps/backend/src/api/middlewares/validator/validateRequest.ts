import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/utils/errors/appError';

import { createSchema } from '@api/middlewares/validator/createValidatorSchema';

export const validateRequest =
    (schema: ReturnType<typeof createSchema>, source: 'body' | 'query' | 'params' = 'body') =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (result.success) return next();

        const formatted = result.error!.issues.map((issue) => ({
            field: issue.field,
            type: issue.type,
            message: issue.message,
        }));

        throw new AppError({
            message: 'An error occoured',
            statusCode: 400,
            errors: formatted,
        });
    };
