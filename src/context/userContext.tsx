'use client'

import { MediaType } from '@/components/PostCard'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'


export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  avatar?:MediaType
}

export const UserContext = createContext<any>(null)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find((c) => c.startsWith(`${name}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType|null>(null)
  const [token, setToken] = useState<string | null>(getCookie('frontendToken'))

  // Utility to get a cookie by name

  // Decode JWT to get payload
  function decodeJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch {
      return null
    }
  }

  // Call this after login/logout to update the token state
  const refreshToken = () => {
    setToken(getCookie('frontendToken'))
  }

  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    const decoded = decodeJwt(token)
    if (!decoded?.email) {
      setUser(null)
      return
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me/?depth=1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: decoded.email }),
        })

        const data = await res.json()
        if (data.success) setUser(data.user)
        else setUser(null)
      } catch (err) {
        console.error('Failed to fetch user:', err)
        setUser(null)
      }
    }

    fetchUser()
  }, [token])

  return (
    <UserContext.Provider value={{ user, setUser, refreshToken }}>{children}</UserContext.Provider>
  )
}
