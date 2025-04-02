// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode("Nwp"); // ⚠️ Asegúrate que coincida con backend
const ADMIN_ONLY_ROUTES = ['/rates-db'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // 🔒 Si no hay token, redirige a login (home)
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  let payload: any;

  try {
    // 🧠 Verificamos el token JWT
    const verified = await jwtVerify(token, JWT_SECRET);
    payload = verified.payload;
  } catch (err) {
    // 🔴 Token inválido → login
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Solo aquí validamos el rol SI la ruta requiere admin
  const isAdminRoute = ADMIN_ONLY_ROUTES.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAdminRoute && payload.role !== 'Administrador') {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// 👇 Aplica middleware a todas las rutas, excepto login, unauthorized, y archivos públicos
export const config = {
  matcher: [
    "/((?!login|unauthorized|$|_next/static|_next/image|favicon.ico|logo.png).*)"
  ]
};
