export const TYPES = {
    // Database
    Database: Symbol.for('Database'),

    // Repositories
    UserRepository: Symbol.for('UserRepository'),

    // Domain Services
    UserService: Symbol.for('UserService'),
    AuthService: Symbol.for('AuthService'),

    // Shared Services
    EmailService: Symbol.for('EmailService'),
} as const;
