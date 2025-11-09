import { ITour } from '@api/domains/tours/database/tourModel';

export interface CreateTourDTO extends Omit<ITour, 'slug' | 'active'> {}

export interface UpdateTourDTO extends Partial<CreateTourDTO> {}

export interface TourOutputDTO {
    id: string;
    name: string;
    slug: string;
    description: string;
    location: ITour['location'];
    mapLink?: string;
    startLocation: ITour['startLocation'];
    endLocation?: ITour['endLocation'];
    minGroupSize: number;
    maxGroupSize: number;
    media: ITour['media'];
    price: number;
    duration: number;
    durationUnit: 'hours' | 'days';
    notes?: string;
    guide?: {
        id: string;
        name?: string;
        [key: string]: unknown;
    };
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TourServicePort {
    createTour: (tourData: CreateTourDTO) => Promise<TourOutputDTO>;
    getTourById: (tourId: string) => Promise<TourOutputDTO>;
    getTourBySlug: (slug: string) => Promise<TourOutputDTO | null>;
    getAllTours: (filters?: { active?: boolean }) => Promise<TourOutputDTO[]>;
    updateTour: (tourId: string, tourData: UpdateTourDTO) => Promise<TourOutputDTO | null>;
    deleteTour: (tourId: string) => Promise<void>;
}
