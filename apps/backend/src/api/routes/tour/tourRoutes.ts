import { Router } from 'express';

import { ServiceLocator } from '@api/di/serviceLocator';
import { processTourMedia } from '@api/middlewares/upload/mediaUploadMiddleware';
import { upload } from '@api/middlewares/upload/uploadMiddleware';
import { validateRequest } from '@api/middlewares/validator/validateRequest';
import { createTourSchema, updateTourSchema } from '@api/routes/tour/tourSchemas';

const controllers = {
    tourController: ServiceLocator.getTourController(),
};

export const tourRouter = Router();

tourRouter.post(
    '/',
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'media', maxCount: 20 },
    ]),
    processTourMedia,
    validateRequest(createTourSchema, 'body'),
    controllers.tourController.createTour,
);

tourRouter.get('/', controllers.tourController.getAllTours);

tourRouter.get('/:id', controllers.tourController.getTourById);

tourRouter.get('/slug/:slug', controllers.tourController.getTourBySlug);

// not tested
tourRouter.patch('/:id', validateRequest(updateTourSchema, 'body'), controllers.tourController.updateTour);

// not tested
tourRouter.delete('/:id', controllers.tourController.deleteTour);
