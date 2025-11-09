import formData from 'form-data';
import Mailgun from 'mailgun.js';

import { getEnv } from '@config/env';

import { EmailProviderPort, SendEmailOptions } from '@shared/services/email/emailProviderPort';

export class MailgunService implements EmailProviderPort {
    private readonly mailgunDomain = getEnv('MAILGUN_DOMAIN');
    private readonly mailgunApiKey = getEnv('MAILGUN_SENDING_KEY');

    private mailgunClient: ReturnType<Mailgun['client']>;

    constructor() {
        if (!this.mailgunApiKey || !this.mailgunDomain) {
            throw new Error('Mailgun API key or domain is not set in environment variables.');
        }

        const mailgun = new Mailgun(formData);

        this.mailgunClient = mailgun.client({
            username: 'api',
            key: this.mailgunApiKey,
        });
    }

    async sendEmail({ to, subject, text, html, from }: SendEmailOptions) {
        const data = {
            from: from || `Natours <no-reply@${this.mailgunDomain}>`,
            to,
            subject,
            text: text ? text : '',
            html: html ? html : '',
        };

        await this.mailgunClient.messages.create(this.mailgunDomain, data);
    }
}
