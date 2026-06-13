import { NextRequest, NextResponse } from "next/server";

export const COOKIES_NAME = {
    accessToken: "__secure-atkn",
    refreshToken: "__secure-rtkn",
} as const;

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get(COOKIES_NAME.refreshToken)?.value;
    // console.log('token:', token)
    // console.log('pathname:', pathname)

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
