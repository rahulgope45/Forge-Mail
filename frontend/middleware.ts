// proxy.ts (project root, same location as middleware.ts was)
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/mail-send"];
const AUTH_PATHS = ["/login"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = request.cookies.has("token");
  console.log("PROXY RAN:", pathname, "hasSession:", hasSession);

  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && hasSession) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/mail-send/:path*", "/login"],
};