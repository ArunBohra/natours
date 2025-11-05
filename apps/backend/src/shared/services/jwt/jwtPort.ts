import { JwtPayload } from 'jsonwebtoken';

export interface JwtPort {
    generateToken: (data: string | Buffer | object) => string;
    verifyToken: (token: string) => string | JwtPayload;
}
