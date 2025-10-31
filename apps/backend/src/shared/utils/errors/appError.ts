export type ErrorTypes = 'app-error' | 'user-error' | 'internal-server-error' | 'unknown-error';

export class AppError extends Error {
    public meta?: Record<string, unknown>;
    public statusCode: number;
    public errors?: Record<string, unknown>[];
    public type: ErrorTypes = 'app-error';

    constructor({
        message,
        statusCode,
        meta,
        errors,
        type = 'app-error',
    }: {
        message: string;
        statusCode: number;
        meta?: Record<string, unknown>;
        errors?: Record<string, unknown>[];
        type?: ErrorTypes;
    }) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;

        // Store developer-specific information (e.g., stack trace, internal details)
        this.meta = meta;
        this.type = type;

        Error.captureStackTrace(this, this.constructor);
    }
}
