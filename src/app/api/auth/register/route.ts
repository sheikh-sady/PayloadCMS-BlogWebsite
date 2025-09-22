import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

const allowedOrigins = [
  'http://localhost:8100',
  'http://localhost:8000',
  'https://payload-cms-blog-website-qrdy.vercel.app',
]

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  return new NextResponse(null, { status: 403 }) // not allowed
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'users', // frontend users collection
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existingUser.docs.length > 0) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 })
    }

    // Create new frontend user
    const newUser = await payload.create({
      collection: 'users',
      data: { firstName, lastName, email, password, role: 'subscriber' },
    })

    // Log in the newly created user to get the token
    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    // Set frontend token cookie
    const response = NextResponse.json({ success: true, user: newUser })
    response.cookies.set({
      name: 'frontendToken',
      value: loginResult.token || '', // token from loginResult
      httpOnly: false, // set to false if you want JS access
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
