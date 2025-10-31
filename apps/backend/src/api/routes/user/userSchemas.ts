import { createSchema } from '@api/middlewares/validator/createValidatorSchema';
import validator from 'validator';

export const userSignupSchema = createSchema({
    name: {
        required: true,
        rules: [
            (value: string) => ({
                status: validator.isLength(value, { min: 2 }),
                type: 'custom',
                message: 'Name should be at least 3 characters long.',
            }),
        ],
    },
    email: {
        required: true,
        rules: [
            (value: string) => ({
                status: validator.isEmail(value),
                type: 'custom',
                message: 'Please provide a valid email.',
            }),
        ],
    },
    password: {
        required: true,
        rules: [
            (value: string) => ({
                status: validator.isStrongPassword(value, {
                    minLength: 8,
                    minUppercase: 0,
                    minNumbers: 0,
                    minSymbols: 0,
                }),
                type: 'custom',
                message: 'Password should be at least 8 characters long.',
            }),
        ],
    },
    confirmPassword: {
        required: true,
        rules: [
            (value: string, data) => ({
                status: data?.password === value,
                type: 'custom',
                message: 'Passwords do not match.',
            }),
        ],
    },
});
