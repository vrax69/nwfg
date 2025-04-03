// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// ⚠️ Es mejor usar variables de entorno para secretos
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "Nwp");
const ADMIN_ONLY_ROUTES = ['/rates-db'];

// Rutas que requieren autenticación
const PROTECTED_ROUTES = ['/dashboard', '/rates-db'];

function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decodificando JWT:', e);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('🛡️ Middleware ejecutándose para', path);
  
  // 🔍 Comprobamos si la ruta requiere autenticación
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    path.startsWith(route)
  );
  
  // Si no es una ruta protegida, permitimos el acceso inmediatamente
  if (!isProtectedRoute) {
    console.log('✅ Ruta pública, acceso permitido');
    return NextResponse.next();
  }
  
  // Obtenemos el token de las cookies
  const token = request.cookies.get("token")?.value;
  console.log('🍪 Token presente:', !!token);

  if (token) {
    console.log('🔍 Contenido del token:', decodeJwt(token));
  }

  // 🔒 Si no hay token, redirige a login (home)
  if (!token) {
    console.log('❌ No hay token, redirigiendo a login');
    return NextResponse.redirect(new URL("/", request.url));
  }

  let payload: any;

  try {
    // 🧠 Verificamos el token JWT
    const verified = await jwtVerify(token, JWT_SECRET);
    payload = verified.payload;
    
    // 🔍 Log detallado del payload para diagnóstico
    console.log('✅ Token verificado, payload completo:', JSON.stringify(payload));
    
    // Comprueba si está el rol en diferentes formatos posibles
    const userRole = payload.role || payload.rol || 'Usuario';
    console.log('👤 Rol del usuario detectado:', userRole);
  } catch (err) {
    // 🔴 Token inválido → login
    console.error('❌ Error al verificar token:', err);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Solo aquí validamos el rol SI la ruta requiere admin
  const isAdminRoute = ADMIN_ONLY_ROUTES.some(route =>
    path.startsWith(route)
  );

  // Comprueba si está el rol en diferentes formatos posibles
  const userRole = payload.role || payload.rol || 'Usuario';
  
  if (isAdminRoute && userRole !== 'Administrador') {
    console.log('🚫 Usuario no tiene permisos de administrador. Rol actual:', userRole);
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Todo OK, continuamos
  console.log('✅ Acceso permitido a ruta protegida:', path);
  return NextResponse.next();
}

// 👇 Aplica middleware solo a rutas específicas
export const config = {
  matcher: [
    // Solo aplica a rutas protegidas específicas
    '/dashboard/:path*',
    '/rates-db/:path*',
    '/profile/:path*'
  ]
};
