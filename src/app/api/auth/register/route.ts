import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

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

// Register
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  try {
    const { firstName, lastName, email, password } = await req.json()

    if (!firstName || !lastName || !email || !password) {
      const res = NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 },
      )
      if (allowedOrigins.includes(origin)) {
        res.headers.set('Access-Control-Allow-Origin', origin)
        res.headers.set('Access-Control-Allow-Credentials', 'true')
      }
      return res
    }

    const existingUser = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existingUser.docs.length > 0) {
      const res = NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 },
      )
      if (allowedOrigins.includes(origin)) {
        res.headers.set('Access-Control-Allow-Origin', origin)
        res.headers.set('Access-Control-Allow-Credentials', 'true')
      }
      return res
    }

    const newUser = await payload.create({
      collection: 'users',
      data: { firstName, lastName, email, password, role: 'subscriber' },
    })

    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    const response = NextResponse.json({ success: true, user: newUser })
    response.cookies.set({
      name: 'frontendToken',
      value: loginResult.token || '',
      httpOnly: false,
      sameSite: 'none',
      secure: true, // required for cross-site cookies
      path: '/',
    })

    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    return response
  } catch (error) {
    console.error('Registration error:', error)
    const res = NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    )
    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    return res
  }
}
