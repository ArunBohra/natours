import * as React from 'react';

export interface UserWelcomeEmailProps {
    userName: string;
}

export function UserWelcomeEmail({ userName }: { userName: string }) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#222' }}>
            <h1>Welcome, {userName}!</h1>
            <p>Thanks for signing up for Natours.</p>
            <p>We're excited to have you on board. Start booking your vacations with Natours today!</p>
            <hr />
            <small style={{ color: '#888' }}>&copy; {new Date().getFullYear()} Natours</small>
        </div>
    );
}
