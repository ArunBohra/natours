import validator from 'validator';

import { createSchema } from '@api/middlewares/validator/createValidatorSchema';

export const addReviewSchema = createSchema({
    rating: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isNumeric(String(value)),
                type: 'custom',
                message: 'Please provide a valid rating from 1 to 5',
            }),
        ],
    },
    body: {
        required: false,
        rules: [
            (value) => {
                const words = (value as string).split(' ');
                return {
                    status: words.length >= 2,
                    type: 'custom',
                    message: 'Your review should be at least 2 words long',
                };
            },
        ],
    },
});

export const updateReviewSchema = createSchema({
    rating: {
        required: false,
        rules: [
            (value) => ({
                status: validator.isNumeric(String(value)),
                type: 'custom',
                message: 'Please provide a valid rating from 1 to 5',
            }),
        ],
    },
    body: {
        required: false,
        rules: [
            (value) => {
                const words = (value as string).split(' ');
                return {
                    status: words.length >= 2,
                    type: 'custom',
                    message: 'Your review should be at least 2 words long',
                };
            },
        ],
    },
});
