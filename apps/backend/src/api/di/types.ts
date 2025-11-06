export const TYPES = {
    // Shared Services
    JWTService: Symbol.for('JWTService'),
    EmailService: Symbol.for('EmailService'),
    EmailProvider: Symbol.for('EmailProvider'),
    TemplateRenderer: Symbol.for('TemplateRenderer'),

    // Users
    UserController: Symbol.for('UserController'),
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService'),
    AuthService: Symbol.for('AuthService'),

    // Tours
    TourController: Symbol.for('TourController'),
    TourRepository: Symbol.for('TourRepository'),
    TourService: Symbol.for('TourService'),
} as const;
