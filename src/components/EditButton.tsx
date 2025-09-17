'use client'
import Link from 'next/link'
import EditIcon from './EditIcon'
import { PostType } from './PostCard'
import { useUser } from '@/context/userContext'

export default function EditButton({ post }: { post: PostType }) {
  const { user } = useUser()
  return (
    <>
      {user?.id === post.author.id && (
        <Link
          className="flex-1 p-2 hover:bg-gray-700 justify-center flex items-center gap-3 rounded-md bg-gray-600 text-gray-100"
          href={`/posts/create/${post.id}`}
          passHref
        >
          <EditIcon color="white" />
          <p>Edit Post</p>
        </Link>
      )}
    </>
  )
}
