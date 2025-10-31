import { config as dotenvConfig } from 'dotenv';
import path from 'node:path';

dotenvConfig({ path: path.resolve(process.cwd(), './src/config/.env') });

const requiredEnvVars = ['JWT_SECRET', 'COOKIE_SECRET'];

// Validate required environment variables
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

/**
 * Get environment variable as a string
 * @param key - The environment variable key
 * @returns The environment variable as a string
 */
export const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key];
    if (!value && !defaultValue) {
        throw new Error(`Environment variable ${key} is not set`);
    }

    return value || defaultValue || '';
};
