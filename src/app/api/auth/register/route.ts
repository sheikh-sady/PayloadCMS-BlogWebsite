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

    // Initialize Payload instance
    const payload = await getPayload({ config })

    // Check if user exists
    const existingUser = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true, // allow access without auth
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

    // Create new user
    const newUser = await payload.create({
      collection: 'users',
      data: { firstName, lastName, email, password, role: 'subscriber' },
      overrideAccess: true, // allow access without auth
    })

    const response = NextResponse.json({ success: true, user: newUser })

    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    return response
  } catch (error: any) {
    console.error('Registration error:', error)
    const res = NextResponse.json(
      { success: false, message: error.message || 'Unknown error' },
      { status: 500 },
    )
    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    return res
  }
}
