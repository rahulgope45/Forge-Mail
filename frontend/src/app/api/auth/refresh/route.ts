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

response.cookies.set("token", data.token, {
  httpOnly: true,
  maxAge: 60,
});

response.cookies.set("refreshToken", data.refreshToken, {
  httpOnly: true,
  path: "/api/auth/refresh",
  maxAge: 2 * 24 * 60 * 60,
});

return response;
}