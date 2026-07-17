import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const backendRes = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  // read Set-Cookie from Render's response, re-set on Next.js's own domain
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("Set-Cookie", setCookie);
  }

  return response;
}