import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const PROTECTED_ROUTES = ["/tasks"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Re-enable once login page is ready: ["/tasks/:path*"]
  matcher: [],
}
