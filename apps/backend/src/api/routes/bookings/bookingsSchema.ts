import { createSchema } from '@api/middlewares/validator/createValidatorSchema';

export const bookTourSchema = createSchema({
    tourId: {
        required: true,
    },
});
