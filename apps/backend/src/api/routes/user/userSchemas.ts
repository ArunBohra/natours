import validator from 'validator';

import { SchemaDefinition, createSchema } from '@api/middlewares/validator/createValidatorSchema';

const userSignupSchemaDefinition: SchemaDefinition = {
    name: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isLength(value as string, { min: 2 }),
                type: 'custom',
                message: 'Name should be at least 3 characters long.',
            }),
        ],
    },
    email: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isEmail(value as string),
                type: 'custom',
                message: 'Please provide a valid email.',
            }),
        ],
    },
    password: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isStrongPassword(value as string, {
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
            (value, data) => ({
                status: data?.password === value,
                type: 'custom',
                message: 'Passwords do not match.',
            }),
        ],
    },
};

export const userSignupSchema = createSchema(userSignupSchemaDefinition);

const userLoginSchemaDefinition: SchemaDefinition = {
    email: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isEmail(value as string),
                type: 'custom',
                message: 'Please provide a valid email.',
            }),
        ],
    },
    password: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isLength(value as string, { min: 8 }),
                type: 'custom',
                message: 'Password should be at least 8 characters long.',
            }),
        ],
    },
};

export const userLoginSchema = createSchema(userLoginSchemaDefinition);
