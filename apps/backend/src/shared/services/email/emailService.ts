import { inject } from 'inversify';

import { EmailProviderPort } from '@shared/services/email/mailgun/mailgunServicePort';
import { TemplateRendererPort } from '@shared/services/email/template/templateRendererPort';

import { TYPES } from '@api/di/types';

import { EmailServicePort } from './emailServicePort';

export class EmailService implements EmailServicePort {
    constructor(
        @inject(TYPES.EmailProvider)
        private readonly emailProvider: EmailProviderPort,
        @inject(TYPES.TemplateRenderer)
        private readonly templateRenderer: TemplateRendererPort,
    ) {}

    async sendVerificationEmail(email: string, verificationUrl: string): Promise<void> {
        const html = await this.templateRenderer.renderTemplate('userVerificationEmail', {
            verificationUrl,
        });

        this.emailProvider.sendEmail({
            to: email,
            subject: 'Email Verification',
            html,
        });
    }

    async sendWelcomeEmail(email: string, userName: string): Promise<void> {
        const html = await this.templateRenderer.renderTemplate('userWelcomeEmail', {
            userName,
        });

        this.emailProvider.sendEmail({
            to: email,
            subject: 'Email Verification',
            html,
        });
    }
}
