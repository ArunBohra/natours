import { Router } from 'express';

import { ServiceLocator } from '@api/di/serviceLocator';
import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { createTourSchema, updateTourSchema } from '@api/routes/tour/tourSchemas';

const controllers = {
    tourController: ServiceLocator.getTourController(),
};

export const tourRouter = Router();

tourRouter.post(
    '/',
    validateRequest(createTourSchema, 'body'),
    controllers.tourController.createTour,
);

tourRouter.get('/', controllers.tourController.getAllTours);

tourRouter.get('/:id', controllers.tourController.getTourById);

tourRouter.get('/slug/:slug', controllers.tourController.getTourBySlug);

// not tested
tourRouter.patch(
    '/:id',
    validateRequest(updateTourSchema, 'body'),
    controllers.tourController.updateTour,
);

// not tested
tourRouter.delete('/:id', controllers.tourController.deleteTour);
