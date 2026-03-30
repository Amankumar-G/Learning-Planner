import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/signup"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route)

  if (!isPublic && !token) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
