export interface EmailServicePort {
    sendVerificationEmail(email: string, verificationUrl: string): Promise<void>;
    sendWelcomeEmail(email: string, userName: string): Promise<void>;
}
