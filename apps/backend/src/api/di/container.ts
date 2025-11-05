import { Container } from 'inversify';
import 'reflect-metadata';

import { EmailService } from '@shared/services/email/emailService';
import { EmailServicePort } from '@shared/services/email/emailServicePort';
import { MailgunService } from '@shared/services/email/mailgun/mailgunService';
import { MailgunServicePort } from '@shared/services/email/mailgun/mailgunServicePort';
import { TemplateRenderer } from '@shared/services/email/template/templateRenderer';
import { TemplateRendererPort } from '@shared/services/email/template/templateRendererPort';
import { JwtPort } from '@shared/services/jwt/jwtPort';
import { JwtService } from '@shared/services/jwt/jwtService';

import { TYPES } from '@api/di/types';
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
container.bind<MailgunServicePort>(TYPES.EmailProvider).to(MailgunService);
container.bind<TemplateRendererPort>(TYPES.TemplateRenderer).to(TemplateRenderer);

// User
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserServicePort>(TYPES.UserService).to(UserService);
container.bind<UserRepositoryPort>(TYPES.UserRepository).to(UserRepository);
