import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
  const {nextUrl, cookies} = request;

  const refreshToken = cookies.get("refreshToken")?.value;
  const pathname = nextUrl.pathname;

  // Пропускаем API-маршруты и статические файлы
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname === "/cities"
  ) {
    return NextResponse.next();
  }
  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  // Если пользователь авторизован и пытается попасть на страницы входа/регистрации
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }
  // Если пользователь не авторизован и пытается попасть на защищенные страницы
  if (!isAuthPage && !refreshToken) {
    const loginUrl = new URL("/login", nextUrl);
    // loginUrl.searchParams.set('from', pathname); // Сохраняем исходный URL
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
