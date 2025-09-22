import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'http://localhost:8100',
  'http://localhost:8000',
  'https://payload-cms-blog-website-qrdy.vercel.app',
]

// CORS preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  if (allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  }
  return new NextResponse(null, { status: 403 })
}

// Logout
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const response = NextResponse.json({ success: true, message: 'Logged out' })

  // Remove frontend token cookie
  response.cookies.set({
    name: 'frontendToken',
    value: '',
    maxAge: 0,
    sameSite: 'none',
    secure: true,
    path: '/',
  })

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}
