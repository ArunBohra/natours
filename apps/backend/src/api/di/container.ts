import { Container } from 'inversify';
import 'reflect-metadata';

import { JwtPort } from '@shared/services/jwt/jwtPort';
import { JwtService } from '@shared/services/jwt/jwtService';

import { TYPES } from '@api/di/types';
import { UserController } from '@api/domains/users/controllers/userController';
import { UserRepository } from '@api/domains/users/database/userRepository';
import { UserRepositoryPort } from '@api/domains/users/database/userRepositoryPort';
import { UserService } from '@api/domains/users/services/userService';
import { UserServicePort } from '@api/domains/users/services/userServicePort';

export const container = new Container();

// Shared
container.bind<JwtPort>(TYPES.JWTService).to(JwtService);

// User
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserServicePort>(TYPES.UserService).to(UserService);
container.bind<UserRepositoryPort>(TYPES.UserRepository).to(UserRepository);
