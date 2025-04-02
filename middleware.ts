// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "Nwp"; // Clave directamente en código
const ADMIN_ONLY_ROUTES = ['/rates-db'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url)); // redirige al login
  }

  // Verifica si la ruta requiere ser administrador
  const isAdminRoute = ADMIN_ONLY_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAdminRoute) {
    try {
      // Decodifica el token
      const decoded: any = jwt.verify(token, JWT_SECRET);
      
      // Verifica si el usuario es administrador
      if (decoded.role !== 'Administrador') {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      // Si hay un error en la verificación del token
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next(); // si hay token, permite continuar
}

export const config = {
  matcher: [
    "/((?!login|unauthorized|$|_next/static|_next/image|favicon.ico|logo.png).*)"
  ]
};