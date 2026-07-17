// src/app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  const backendRes = await fetch(
    `${process.env.BACKEND_URL}/api/auth/exchange?code=${code}`
  );
  const data = await backendRes.json(); // { accessToken, refreshToken, user }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("token", data.accessToken, { httpOnly: true, maxAge: 60 });
  response.cookies.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    path: "/api/auth/refresh",
    maxAge: 2 * 24 * 60 * 60,
  });
  return response;
}