'use client'
import { CommentType } from '@/context/commentContext'
import PlusIcon from './PlusIcon'
import { PostType } from './PostCard'
import { useState } from 'react'
import CommentInput from './CommentInput'
import { useUser } from '@/context/userContext'

export default function AddComment({ post }: { post: PostType }) {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      {user && (
        <div className='flex-1'>
          {!isOpen ? (
            <div
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-700 flex gap-3 justify-center items-center bg-gray-600 text-gray-100"
            >
              <PlusIcon color = "white"/>
              <div>Add Comment</div>
            </div>
          ) : (
            <CommentInput user={user} post={post} setIsOpen={setIsOpen} />
          )}
        </div>
      )}
    </>
  )
}
