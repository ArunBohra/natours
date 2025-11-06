import { injectable } from 'inversify';
import { Types } from 'mongoose';

import { TourRepositoryPort } from '@api/domains/tours/database/tourRepositoryPort';

import { ITour, tourModel } from './tourModel';

@injectable()
export class TourRepository implements TourRepositoryPort {
    async createTour(tourData: ITour) {
        const tour = await tourModel.create(tourData);
        return tour;
    }

    async findTourById(tourId: string) {
        return await tourModel.findById(new Types.ObjectId(tourId)).populate('guide');
    }

    async findTourBySlug(slug: string) {
        return await tourModel.findOne({ slug }).populate('guide');
    }

    async findAllTours(filters?: { active?: boolean }) {
        const query: { active?: boolean } = {};
        if (filters?.active !== undefined) {
            query.active = filters.active;
        }
        return await tourModel.find(query).populate('guide').sort({ createdAt: -1 });
    }

    async updateTour(tourId: string, updateData: Partial<ITour>) {
        return await tourModel
            .findByIdAndUpdate(new Types.ObjectId(tourId), updateData, {
                new: true,
            })
            .populate('guide');
    }

    async deleteTour(tourId: string) {
        return await tourModel.findByIdAndDelete(new Types.ObjectId(tourId));
    }
}
