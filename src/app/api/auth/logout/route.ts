// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });

  // Remove frontend token cookie
  response.cookies.set({
    name: 'frontendToken',
    value: '',
    maxAge: 0, // immediately expire
    path: '/',
  });

  return response;
}
