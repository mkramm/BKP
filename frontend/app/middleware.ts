import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url))
  }
}

export const config = {
  matcher: ['/'], // Matcht nur die Root-URL "/"
}