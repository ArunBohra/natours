import { Router } from 'express';

import { ServiceLocator } from '@api/di/serviceLocator';
import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { authenticate } from '@api/middlewares/auth/authenticate';
import { userSignupSchema, userLoginSchema } from '@api/routes/user/userSchemas';

const controllers = {
    userController: ServiceLocator.getUserController(),
};

export const userRouter = Router();

userRouter.post(
    '/signup',
    validateRequest(userSignupSchema, 'body'),
    controllers.userController.signup,
);

userRouter.post(
    '/login',
    validateRequest(userLoginSchema, 'body'),
    controllers.userController.login,
);

userRouter.post('/logout', controllers.userController.logout);

userRouter.get('/verify-email', controllers.userController.verifyEmail);

userRouter.post(
    '/regenerate-verification',
    authenticate,
    controllers.userController.regenerateVerificationToken,
);
