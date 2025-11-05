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
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
            return decoded;
        } catch (err) {
            throw new AppError({
                message: 'Something went wrong, please try again',
                statusCode: 500,
                type: 'unknown-error',
            });
        }
    }
}
