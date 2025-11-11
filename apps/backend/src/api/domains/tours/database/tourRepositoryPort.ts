import { HydratedDocument } from 'mongoose';

import { ITour, ITourDocument } from '@api/domains/tours/database/tourModel';

export interface TourRepositoryPort {
    createTour: (tourData: ITour) => Promise<HydratedDocument<ITourDocument>>;
    findTourById: (tourId: string) => Promise<HydratedDocument<ITourDocument> | null>;
    findTourBySlug: (slug: string) => Promise<HydratedDocument<ITourDocument> | null>;
    findAllTours: (filters?: { active?: boolean }) => Promise<HydratedDocument<ITourDocument>[]>;
    updateTour: (
        tourId: string,
        tourData: Partial<ITour>,
    ) => Promise<HydratedDocument<ITourDocument> | null>;
    deleteTour: (tourId: string) => Promise<HydratedDocument<ITourDocument> | null>;
}
