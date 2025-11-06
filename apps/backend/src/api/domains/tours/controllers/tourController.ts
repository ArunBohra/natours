import { inject, injectable } from 'inversify';

import { catchAsync } from '@shared/utils/catchAsync/catchAsync';
import { AppError } from '@shared/utils/errors/appError';
import { ResponseHandler } from '@shared/utils/responseHandler/responseHandler';

import { TYPES } from '@api/di/types';

import { TourService } from '../services/tourService';

@injectable()
export class TourController {
    constructor(@inject(TYPES.TourService) private tourService: TourService) {}

    createTour = catchAsync(async (req, res) => {
        const tour = await this.tourService.createTour(req.body);

        ResponseHandler.success(res, {
            message: 'Tour created successfully',
            statusCode: 201,
            data: tour,
        });
    });

    getTourById = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const tour = await this.tourService.getTourById(id);

        if (!tour) {
            return next(new AppError({ message: 'Tour not found', statusCode: 404 }));
        }

        ResponseHandler.success(res, {
            message: 'Tour retrieved successfully',
            statusCode: 200,
            data: tour,
        });
    });

    getTourBySlug = catchAsync(async (req, res, next) => {
        const { slug } = req.params;

        const tour = await this.tourService.getTourBySlug(slug);

        if (!tour) {
            return next(new AppError({ message: 'Tour not found', statusCode: 404 }));
        }

        ResponseHandler.success(res, {
            message: 'Tour retrieved successfully',
            statusCode: 200,
            data: tour,
        });
    });

    getAllTours = catchAsync(async (req, res) => {
        const { active } = req.query;
        const filters =
            active !== undefined ? { active: active === 'true' || active === '1' } : undefined;

        const tours = await this.tourService.getAllTours(filters);

        ResponseHandler.success(res, {
            message: 'Tours retrieved successfully',
            statusCode: 200,
            data: tours,
        });
    });

    updateTour = catchAsync(async (req, res) => {
        const { id } = req.params;

        const tour = await this.tourService.updateTour(id, req.body);

        ResponseHandler.success(res, {
            message: 'Tour updated successfully',
            statusCode: 200,
            data: tour,
        });
    });

    deleteTour = catchAsync(async (req, res) => {
        const { id } = req.params;

        await this.tourService.deleteTour(id);

        ResponseHandler.success(res, {
            message: 'Tour deleted successfully',
            statusCode: 200,
        });
    });
}
