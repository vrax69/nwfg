// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url)); // redirige al login
  }

  return NextResponse.next(); // si hay token, permite continuar
}

export const config = {
    matcher: [
      "/((?!login|$|_next/static|_next/image|favicon.ico|logo.png).*)"
    ]
  };