import { inject, injectable } from 'inversify';
import { HydratedDocument } from 'mongoose';

import { AppError } from '@shared/utils/errors/appError';

import { TYPES } from '@api/di/types';
import { ITourDocument } from '@api/domains/tours/database/tourModel';
import { TourRepositoryPort } from '@api/domains/tours/database/tourRepositoryPort';
import {
    CreateTourDTO,
    TourOutputDTO,
    TourServicePort,
    UpdateTourDTO,
} from '@api/domains/tours/services/tourServicePort';

@injectable()
export class TourService implements TourServicePort {
    constructor(@inject(TYPES.TourRepository) private tourRepository: TourRepositoryPort) {}

    private mapTourToDTO(tour: HydratedDocument<ITourDocument>): TourOutputDTO {
        return {
            id: tour._id.toString(),
            name: tour.name,
            slug: tour.slug!,
            description: tour.description,
            location: tour.location,
            mapLink: tour.mapLink,
            startLocation: tour.startLocation,
            endLocation: tour.endLocation,
            minGroupSize: tour.minGroupSize,
            maxGroupSize: tour.maxGroupSize,
            media: tour.media,
            price: tour.price,
            duration: tour.duration,
            durationUnit: tour.durationUnit || 'days',
            notes: tour.notes,
            // Implement guides later
            guide: {
                id: String(tour.guide),
            },
            active: tour.active ?? true,
            createdAt: tour.createdAt,
            updatedAt: tour.updatedAt,
        };
    }

    async createTour(tourData: CreateTourDTO): Promise<TourOutputDTO> {
        const tour = await this.tourRepository.createTour({
            ...tourData,
            active: true,
        });

        return this.mapTourToDTO(tour);
    }

    async getTourById(tourId: string): Promise<TourOutputDTO> {
        const tour = await this.tourRepository.findTourById(tourId);

        if (!tour) {
            throw new AppError({
                statusCode: 404,
                message: "Couldn't find the tour details.",
            });
        }

        return this.mapTourToDTO(tour);
    }

    async getTourBySlug(slug: string): Promise<TourOutputDTO | null> {
        const tour = await this.tourRepository.findTourBySlug(slug);

        if (!tour) {
            return null;
        }

        return this.mapTourToDTO(tour);
    }

    async getAllTours(filters?: { active?: boolean }): Promise<TourOutputDTO[]> {
        const tours = await this.tourRepository.findAllTours(filters);
        return tours.map((tour) => this.mapTourToDTO(tour));
    }

    async updateTour(tourId: string, tourData: UpdateTourDTO): Promise<TourOutputDTO | null> {
        const tour = await this.tourRepository.updateTour(tourId, tourData);

        if (!tour) {
            throw new AppError({ message: 'Tour not found', statusCode: 404 });
        }

        return this.mapTourToDTO(tour);
    }

    async deleteTour(tourId: string): Promise<void> {
        const tour = await this.tourRepository.deleteTour(tourId);

        if (!tour) {
            throw new AppError({ message: 'Tour not found', statusCode: 404 });
        }
    }
}
