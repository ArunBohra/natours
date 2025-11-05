export const TYPES = {
    // Shared Services
    JWTService: Symbol.for('JWTService'),
    EmailService: Symbol.for('EmailService'),

    // Users
    UserController: Symbol.for('UserController'),
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService'),
    AuthService: Symbol.for('AuthService'),
} as const;
