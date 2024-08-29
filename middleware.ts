// lib/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken");
  const protectedPaths = [
    /\/shipping/,
    /\/payment/,
    /\/place-order/,
    /\/profile/,
    /\/order\/.*/,
    /\/admin/,
    /\/vendor/,
    /\/krish-bot/,
  ];

  const isProtectedPath = (pathname: string) => {
    if (pathname === '/vendor/register') {
      return false;
    }
    return protectedPaths.some((p) => p.test(pathname));
  };

  if (isProtectedPath(pathname) && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
