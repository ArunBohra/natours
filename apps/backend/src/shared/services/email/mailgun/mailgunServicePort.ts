export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
}

export interface MailgunServicePort {
    sendEmail(data: SendEmailOptions): Promise<void>;
}
