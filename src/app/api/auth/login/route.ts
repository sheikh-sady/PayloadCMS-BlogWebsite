import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

// Handle login
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  try {
    const { email, password } = await req.json()
    const payload = await getPayload({ config })

    const { token, user } = await payload.login({
      collection: 'users', // frontend users
      data: { email, password },
    })

    const res = NextResponse.json({ user })

    // Set frontend token cookie
    res.cookies.set({
      name: 'frontendToken',
      value: token || '',
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
    })

    if (allowedOrigins.includes(origin)) res.headers.set('Access-Control-Allow-Origin', origin)
    return res
  } catch (error) {
    console.error('Login error:', error)
    const res = NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 })
    if (allowedOrigins.includes(origin)) res.headers.set('Access-Control-Allow-Origin', origin)
    return res
  }
}
