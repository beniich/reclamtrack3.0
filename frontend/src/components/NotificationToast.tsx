'use client';

import { Toaster } from 'react-hot-toast';

export const NotificationToast = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    background: 'var(--color-card)',
                    color: 'var(--color-foreground)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                },
                success: {
                    iconTheme: {
                        primary: 'var(--color-success)',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: 'var(--color-error)',
                        secondary: 'white',
                    },
                },
            }}
        />
    );
};
