import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { NotificationToast } from '@/components/NotificationToast';
import { QueryProvider } from '@/providers/QueryProvider';
import DebugWidget from '@/components/DebugWidget';
import { MiniMcLarenLoader } from '@/components/mini-mclarenloader';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/providers/AuthProvider';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "fr")) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className="light" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                />
            </head>
            <body className={`${inter.variable} font-sans antialiased text-slate-900 dark:text-slate-100 bg-white dark:bg-[#0a0a0f]`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                        <QueryProvider>
                            <AuthProvider>
                                {children}
                                <NotificationToast />
                                <DebugWidget />
                                <MiniMcLarenLoader />
                            </AuthProvider>
                        </QueryProvider>
                    </GoogleOAuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
