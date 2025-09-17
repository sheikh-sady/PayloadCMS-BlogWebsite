'use client'

import { useUser } from '@/context/userContext'

export default function UserPhoto() {
  const { user } = useUser()
  console.log('user from profile: ', user)
  return (
    <div className="max-w-96">
      {user ? (
        user.avatar ? (
          <img className="rounded-full" src={user.avatar.url} />
        ) : (
          <img className="rounded-full" src="/assets/default-profile.jpg" />
        )
      ) : (
        <p>Loading profile pic...</p>
      )}
    </div>
  )
}
