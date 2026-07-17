// src/app/api/mail/mail-jobs/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const search = request.nextUrl.search; // preserves ?page=1&pageSize=20

  const backendRes = await fetch(`${process.env.BACKEND_URL}/api/mail/mail-jobs${search}`, {
    headers: { Cookie: `token=${token}` },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}