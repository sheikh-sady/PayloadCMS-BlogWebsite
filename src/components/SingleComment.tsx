'use client'
import { CommentType } from '@/context/commentContext'
import EditIcon from './EditIcon'
import { useUser } from '@/context/userContext'
import { useState } from 'react'
import { PostType } from './PostCard'
import CommentInput from './CommentInput'
export const SingleComment = ({ comment, post }: { comment: CommentType; post: PostType }) => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="p-2 rounded-md bg-gray-200  flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <p className="bg-gray-100 p-1 rounded-3xl text-sm font-bold text-gray-600">
          {comment.author.firstName} {comment.author.lastName}
        </p>
        <p className="bg-gray-100 p-1 rounded-3xl text-sm font-semibold text-gray-600">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>
      {!isOpen ? (
        <div className="flex justify-between items-center">
          <p className="text-md text-gray-600">{comment.content}</p>
          <div className="hover:cursor-pointer" onClick={() => setIsOpen(true)}>
            {user?.id === comment.author.id && <EditIcon color="gray"/>}
          </div>
        </div>
      ) : (
        <CommentInput comment={comment} setIsOpen={setIsOpen} user={user} post={post} />
      )}
    </div>
  )
}
export default SingleComment
