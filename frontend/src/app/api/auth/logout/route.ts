// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const backendRes = await fetch(`${process.env.BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: { Cookie: `refreshToken=${refreshToken}` },
  });

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  response.cookies.delete("token");
  response.cookies.delete("refreshToken");

  return response;
}