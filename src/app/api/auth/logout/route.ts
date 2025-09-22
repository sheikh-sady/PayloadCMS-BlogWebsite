import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'http://localhost:8100',
  'http://localhost:8000',
  'https://payload-cms-blog-website-qrdy.vercel.app',
]

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  if (allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
  return new NextResponse(null, { status: 403 })
}

// Handle logout
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const response = NextResponse.json({ success: true, message: 'Logged out' })

  // Remove frontend token cookie
  response.cookies.set({
    name: 'frontendToken',
    value: '',
    maxAge: 0,
    path: '/',
  })

  if (allowedOrigins.includes(origin)) response.headers.set('Access-Control-Allow-Origin', origin)
  return response
}
