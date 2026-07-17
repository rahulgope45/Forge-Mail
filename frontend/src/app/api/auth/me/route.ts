// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const backendRes = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
    headers: { Cookie: `token=${token}` },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}