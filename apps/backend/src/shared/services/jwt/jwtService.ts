import { injectable } from 'inversify';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

import { getEnv } from '@config/env';

import { JwtPort } from '@shared/services/jwt/jwtPort';
import { AppError } from '@shared/utils/errors/appError';

interface JwtConfig {
    secret: string;
    expiresIn: SignOptions['expiresIn'];
}

@injectable()
export class JwtService implements JwtPort {
    private config: JwtConfig;

    constructor() {
        this.config = {
            secret: getEnv('JWT_SECRET'),
            expiresIn: '90d',
        };
    }

    generateToken(data: string | Buffer | object) {
        const token = jsonwebtoken.sign(data, this.config.secret, {
            expiresIn: this.config.expiresIn,
        });
        return token;
    }

    verifyToken(token: string) {
        try {
            const decoded = jsonwebtoken.verify(token, this.config.secret);
            return decoded;
        } catch (err) {
            if (err instanceof jsonwebtoken.TokenExpiredError) {
                throw new AppError({
                    message: 'Your session has expired. Please log in again.',
                    statusCode: 401,
                    type: 'user-error',
                });
            }
            if (err instanceof jsonwebtoken.JsonWebTokenError) {
                throw new AppError({
                    message: 'Invalid session. Please log in again.',
                    statusCode: 401,
                    type: 'user-error',
                });
            }
            throw new AppError({
                message: 'Something went wrong, please try again',
                statusCode: 500,
                type: 'unknown-error',
            });
        }
    }
}
