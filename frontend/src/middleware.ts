import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match all pathnames except for
        // - API routes
        // - static files (_next, images, etc.)
        '/((?!api|_next|_vercel|.*\\..*).*)',
        // Match all localized pathnames
        '/',
        '/(fr|en)/:path*'
    ]
};
