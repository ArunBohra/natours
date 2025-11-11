import * as React from 'react';

export interface UserVerificationEmailProps {
    verificationUrl: string;
}

export function UserVerificationEmail({ verificationUrl }: UserVerificationEmailProps) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#222' }}>
            <h1>Verify your email address</h1>
            <p>Thank you for signing up for Natours!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <p>
                <a href={verificationUrl} style={{ color: '#007bff' }}>
                    Verify Email
                </a>
            </p>
            <p>If you did not sign up, you can ignore this email.</p>
            <hr />
            <small style={{ color: '#888' }}>&copy; {new Date().getFullYear()} Natours</small>
        </div>
    );
}
