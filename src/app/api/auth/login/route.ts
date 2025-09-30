import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const allowedOrigins = [
  'http://localhost:8100',
  'http://localhost:8000',
  'http://localhost:3000',
  'https://payload-cms-blog-website-qrdy.vercel.app',
  'https://blog-app-12345.netlify.app', // ✅ Netlify origin added
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

// Login
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  try {
    const { email, password } = await req.json()
    const payload = await getPayload({ config })

    const { token, user } = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    const res = NextResponse.json({ success: true, user })
    res.cookies.set({
      name: 'frontendToken',
      value: token || '',
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      path: '/',
    })

    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    return res
  } catch (error) {
    console.error('Login error:', error)
    const res = NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 })
    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    return res
  }
}
