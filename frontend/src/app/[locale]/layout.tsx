import DebugWidget from '@/components/DebugWidget';
import JsonLd from '@/components/seo/JsonLd';
import { MiniMcLarenLoader } from '@/components/mini-mclarenloader';
import { NotificationToast } from '@/components/NotificationToast';
import { routing } from '@/i18n/routing';
import { AuthProvider } from '@/providers/AuthProvider';
import { CallProvider } from '@/providers/CallProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import '@/styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Sora } from 'next/font/google';
import { notFound } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

const sora = Sora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sora'
});

export const metadata: Metadata = {
    title: {
        template: '%s | CloudIndustre LTD',
        default: 'CloudIndustre LTD — Industrial Cloud Solutions & Ecosystem Architecture',
    },
    description: 'CloudIndustre LTD provides high-performance, secure, and modular cloud solutions for healthcare, industry, and governance. Built for the future of industrial intelligence.',
    keywords: ['industrial cloud', 'SaaS ecosystem', 'UK business solutions', 'Doctic Care', 'MecanicPro', 'Enterprise ERP'],
    authors: [{ name: 'CloudIndustre LTD' }],
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: 'https://cloudindustre.co.uk',
        siteName: 'CloudIndustre LTD',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'CloudIndustre LTD — Industrial Intelligence',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CloudIndustre LTD — Industrial Cloud Solutions',
        description: 'Engineering Industrial Intelligence. Sovereign, Secure, Modular.',
        images: ['/og-image.jpg'],
    },
};

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
        <html lang={locale} className="dark" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
                />
                <link rel="icon" type="image/jpeg" href="/logo.jpg" />
                <link rel="apple-touch-icon" href="/logo.jpg" />
            </head>
            <body className={`${inter.variable} ${sora.variable} font-sans antialiased text-slate-100 bg-brand-midnight min-h-screen`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <JsonLd
                        data={{
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "CloudIndustre LTD",
                            "url": "https://cloudindustre.co.uk",
                            "logo": "https://cloudindustre.co.uk/logo.jpg",
                            "sameAs": [
                                "https://www.linkedin.com/company/cloudindustre",
                                "https://facebook.com/cloudindustre"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+44-000-000-000",
                                "contactType": "customer service",
                                "areaServed": "GB",
                                "availableLanguage": ["en", "fr"]
                            }
                        }}
                    />
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                        <QueryProvider>
                            <AuthProvider>
                                <CallProvider>
                                    <NextTopLoader
                                        color="var(--pumpkin-spice)"
                                        initialPosition={0.08}
                                        crawlSpeed={200}
                                        height={3}
                                        crawl={true}
                                        showSpinner={false}
                                        easing="ease"
                                        speed={200}
                                        shadow="0 0 10px var(--pumpkin-spice),0 0 5px var(--pumpkin-spice)"
                                        zIndex={1600}
                                        showAtBottom={false}
                                    />
                                    {children}
                                    <NotificationToast />
                                    <DebugWidget />
                                    <MiniMcLarenLoader />
                                </CallProvider>
                            </AuthProvider>
                        </QueryProvider>
                    </GoogleOAuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
