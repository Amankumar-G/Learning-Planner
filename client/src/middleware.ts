import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const AUTH_ROUTES = new Set(["/auth/login", "/auth/signup"])
const PROTECTED_ROUTE_PREFIXES = ["/tasks"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl

  const isAuthRoute = AUTH_ROUTES.has(pathname)
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/tasks", request.url))
  }

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    String.raw`/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`,
  ],
}
