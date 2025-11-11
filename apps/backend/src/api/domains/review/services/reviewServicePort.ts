import { IReview } from '@api/domains/review/database/reviewModel';

export interface CreateReviewInputDTO extends IReview {
    tour: string;
    user: string;
}

export interface CreateReviewOutputDTO extends IReview {
    id: string;
}

export interface ReviewServicePort {
    createReview: (reviewData: CreateReviewInputDTO) => Promise<CreateReviewOutputDTO>;
}
