import { Router } from 'express';

import { ServiceLocator } from '@api/di/serviceLocator';
import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { userSignupSchema } from '@api/routes/user/userSchemas';

const controllers = {
    userController: ServiceLocator.getUserController(),
};

export const userRouter = Router();

userRouter.post(
    '/signup',
    validateRequest(userSignupSchema, 'body'),
    controllers.userController.signup,
);

userRouter.post('/logout', controllers.userController.logout);
