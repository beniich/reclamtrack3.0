import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = ['/login', '/register', '/forgot-password', '/'];

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Vérifier si la route est publique (en excluant le préfixe de locale)
    const isPublicRoute = publicRoutes.some(route => {
        const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, '');
        return pathWithoutLocale === route || pathWithoutLocale === '';
    });

    // Si ce n'est pas une route publique, vérifier l'authentification
    if (!isPublicRoute) {
        const token = request.cookies.get('reclamtrack-auth-storage')?.value;

        // Si pas de token et pas sur la page de login, rediriger vers login
        if (!token && !pathname.includes('/login')) {
            const locale = pathname.split('/')[1] || 'fr';
            const loginUrl = new URL(`/${locale}/login`, request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Appliquer le middleware d'internationalisation
    return intlMiddleware(request);
}

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
