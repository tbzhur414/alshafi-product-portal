import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options })
        },
      },
    },
  )

  // Refresh session if expired - required for Server Components
  // and to ensure that the session is always up to date
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } else if (request.nextUrl.pathname.startsWith("/login")) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
