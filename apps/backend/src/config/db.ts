import mongoose from 'mongoose';

import { getEnv } from '@config/env';

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(getEnv('DATABASE_URL'));
        // eslint-disable-next-line no-console
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(`Error: ${error.message}`);
        } else {
            // eslint-disable-next-line no-console
            console.error('An unknown error occurred during MongoDB connection.');
        }
        process.exit(1);
    }
};
