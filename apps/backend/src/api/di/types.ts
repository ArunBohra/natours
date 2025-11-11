export const TYPES = {
    // Shared Services
    JWTService: Symbol.for('JWTService'),
    EmailService: Symbol.for('EmailService'),
    EmailProvider: Symbol.for('EmailProvider'),
    TemplateRenderer: Symbol.for('TemplateRenderer'),
    PaymentsProvider: Symbol.for('PaymentsProvider'),

    // Users
    UserController: Symbol.for('UserController'),
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService'),
    AuthService: Symbol.for('AuthService'),

    // Tours
    TourController: Symbol.for('TourController'),
    TourRepository: Symbol.for('TourRepository'),
    TourService: Symbol.for('TourService'),

    // Media
    MediaStorage: Symbol.for('MediaStorage'),

    // Bookings
    BookingsController: Symbol.for('BookingsController'),
    BookingsService: Symbol.for('BookingsService'),
    BookingsRepository: Symbol.for('BookingsRepository'),

    // Reviews
    ReviewController: Symbol.for('ReviewController'),
    ReviewService: Symbol.for('ReviewService'),
    ReviewRepository: Symbol.for('ReviewRepository'),
} as const;
