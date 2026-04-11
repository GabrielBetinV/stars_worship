import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = Buffer.from(process.env.JWT_SECRET || 'secret-key-too-short-change-it', 'utf8');

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Si no hay token y no es login/signup -> Redirect a login
  if (!token) {
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const role = payload.role as string;

    // 2. Si ya está logueado y va a login/signup -> Redirigir a su área
    if (pathname === '/login' || pathname === '/signup') {
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/scheduling', request.url));
      }
      return NextResponse.redirect(new URL('/musician/schedule', request.url));
    }

    // 3. Protección de Rutas de Admin
    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/musician/schedule', request.url));
    }

    // 4. Protección de Rutas de Músico
    if (pathname.startsWith('/musician') && role !== 'MUSICIAN' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (e) {
    // Si el token es inválido, borrar cookie y redirigir
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
