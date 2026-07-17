// src/app/api/mail/send-mail/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = request.cookies.get("token")?.value;

  const backendRes = await fetch(`${process.env.BACKEND_URL}/api/mail/send-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}