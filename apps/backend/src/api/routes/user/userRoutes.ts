import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { userSignupSchema } from '@api/routes/user/userSchemas';
import { Router } from 'express';

export const userRouter = Router();

userRouter.post('/signup', validateRequest(userSignupSchema, 'body'), (req, res, next) => {
    const { body } = req;

    // eslint-disable-next-line
    console.log(body);

    res.send('Hello');
    return {
        type: '',
    };
});
