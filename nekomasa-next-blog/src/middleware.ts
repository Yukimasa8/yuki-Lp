import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Handle old site URL structure: /article.html?slug=...
    if (request.nextUrl.pathname === '/article.html') {
        const slug = request.nextUrl.searchParams.get('slug');
        if (slug) {
            // Redirect to new article URL
            return NextResponse.redirect(new URL(`/articles/${slug}`, request.url), 301);
        }
        // Fallback to home if no slug
        return NextResponse.redirect(new URL('/', request.url), 301);
    }

    // Handle old site URL structure: /tags.html?slug=...
    if (request.nextUrl.pathname === '/tags.html') {
        const slug = request.nextUrl.searchParams.get('slug');
        if (slug) {
            return NextResponse.redirect(new URL(`/tags/${slug}`, request.url), 301);
        }
        return NextResponse.redirect(new URL('/', request.url), 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
