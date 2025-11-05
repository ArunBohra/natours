export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
}

export interface EmailProviderPort {
    sendEmail(data: SendEmailOptions): Promise<void>;
}
