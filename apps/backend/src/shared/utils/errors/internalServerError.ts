import { AppError } from './appError';

export class InternalServerError extends AppError {
    constructor({ message, meta }: { message?: string; meta?: Record<string, unknown> }) {
        super({
            statusCode: 500,
            message: message || 'Internal Server Error! Please try again.',
            meta,
            type: 'internal-server-error',
        });
    }
}
