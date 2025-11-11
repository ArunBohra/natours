import { Container } from 'inversify';
import 'reflect-metadata';

import { EmailProviderPort } from '@shared/services/email/emailProviderPort';
import { EmailService } from '@shared/services/email/emailService';
import { EmailServicePort } from '@shared/services/email/emailServicePort';
import { MailgunService } from '@shared/services/email/mailgun/mailgunService';
import { TemplateRenderer } from '@shared/services/email/template/templateRenderer';
import { TemplateRendererPort } from '@shared/services/email/template/templateRendererPort';
import { JwtPort } from '@shared/services/jwt/jwtPort';
import { JwtService } from '@shared/services/jwt/jwtService';
import { CloudinaryMediaService } from '@shared/services/media/cloudinary/cloudinaryService';
import { MediaStoragePort } from '@shared/services/media/mediaStoragePort';
import { PaymentsProviderPort } from '@shared/services/payments/paymentsProviderPort';
import { RazorpayService } from '@shared/services/payments/razorpay/razorpayService';

import { TYPES } from '@api/di/types';
import { BookingsController } from '@api/domains/bookings/controllers/bookingsController';
import { BookingsRepository } from '@api/domains/bookings/database/bookingsRepository';
import { BookingsRepositoryPort } from '@api/domains/bookings/database/bookingsRepositoryPort';
import { BookingsService } from '@api/domains/bookings/services/bookingsService';
import { BookingsServicePort } from '@api/domains/bookings/services/bookingsServicePort';
import { ReviewController } from '@api/domains/review/controllers/reviewController';
import { ReviewRepository } from '@api/domains/review/database/reviewRepository';
import { ReviewRepositoryPort } from '@api/domains/review/database/reviewRepositoryPort';
import { ReviewServicePort } from '@api/domains/review/services/reviewServicePort';
import { ReviewService } from '@api/domains/review/services/reviewServices';
import { TourController } from '@api/domains/tours/controllers/tourController';
import { TourRepository } from '@api/domains/tours/database/tourRepository';
import { TourRepositoryPort } from '@api/domains/tours/database/tourRepositoryPort';
import { TourService } from '@api/domains/tours/services/tourService';
import { TourServicePort } from '@api/domains/tours/services/tourServicePort';
import { UserController } from '@api/domains/users/controllers/userController';
import { UserRepository } from '@api/domains/users/database/userRepository';
import { UserRepositoryPort } from '@api/domains/users/database/userRepositoryPort';
import { UserService } from '@api/domains/users/services/userService';
import { UserServicePort } from '@api/domains/users/services/userServicePort';

export const container = new Container();

// JWT
container.bind<JwtPort>(TYPES.JWTService).to(JwtService);

// Email
container.bind<EmailServicePort>(TYPES.EmailService).to(EmailService);
container.bind<EmailProviderPort>(TYPES.EmailProvider).to(MailgunService);
container.bind<TemplateRendererPort>(TYPES.TemplateRenderer).to(TemplateRenderer);

// Media
container.bind<MediaStoragePort>(TYPES.MediaStorage).to(CloudinaryMediaService);

// User
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserServicePort>(TYPES.UserService).to(UserService);
container.bind<UserRepositoryPort>(TYPES.UserRepository).to(UserRepository);

// Tours
container.bind<TourController>(TYPES.TourController).to(TourController);
container.bind<TourServicePort>(TYPES.TourService).to(TourService);
container.bind<TourRepositoryPort>(TYPES.TourRepository).to(TourRepository);

// Bookings
container.bind<BookingsController>(TYPES.BookingsController).to(BookingsController);
container.bind<BookingsServicePort>(TYPES.BookingsService).to(BookingsService);
container.bind<BookingsRepositoryPort>(TYPES.BookingsRepository).to(BookingsRepository);

// Payments
container.bind<PaymentsProviderPort>(TYPES.PaymentsProvider).to(RazorpayService);

// Reviews
container.bind<ReviewController>(TYPES.ReviewController).to(ReviewController);
container.bind<ReviewServicePort>(TYPES.ReviewService).to(ReviewService);
container.bind<ReviewRepositoryPort>(TYPES.ReviewRepository).to(ReviewRepository);
