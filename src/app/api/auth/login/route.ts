// app/api/auth/login.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const payload = await getPayload({ config })
  const { token, user } = await payload.login({
    collection: 'users', // frontend users
    data: { email, password },
  })

  const res = NextResponse.json({ user })

  // set custom cookie for frontend users
  res.cookies.set({
    name: 'frontendToken',
    value: token || '', // make sure value is not undefined
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
  })

  return res
}
