'use client'
import { useUser } from '@/context/userContext'
import ExitIcon from './ExitIcon'
import EnterIcon from './EnterIcon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AuthButton() {
  const { user, refreshToken } = useUser()
  const [loading,setLoading] = useState<boolean>(false)
  const router = useRouter()
  const handleLogout = async () => {
    setLoading(true)
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    refreshToken()
    router.push('/')
    setLoading(false)
  }
  return (
    <div className="p-1 hover:bg-gray-400 flex items-center gap-5 rounded-md">
      {user ? (
        <>
          <ExitIcon color="white" />
          <button disabled={loading} onClick={handleLogout} className="text-md font-medium ">
            {loading?"loading...":"Sign out"}
          </button>
        </>
      ) : (
        <>
          <EnterIcon color="white" />
          <Link href="/auth" passHref>
            Sign in
          </Link>
        </>
      )}
    </div>
  )
}
