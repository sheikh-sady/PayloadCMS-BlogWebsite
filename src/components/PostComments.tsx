'use client'
import { useEffect, useState } from 'react'
import { PostType } from './PostCard'
import { CommentType, useComments } from '@/context/commentContext'
import SingleComment from './SingleComment'

const PostComments = ({ post }: { post: PostType }) => {
  const [currentComments, setCurrentComments] = useState<CommentType | any>([])
  const [showComments, setShowComments] = useState<boolean>(false)
  const { comments } = useComments()
  console.log('Comments in page: ', comments)

  useEffect(() => {
    if (comments.length === 0) return
    const commentArray = comments.filter((c: CommentType) => c.post.id === post.id)
    setCurrentComments(commentArray)
  }, [comments])

  return (
    <>
      <div
        onClick={() => setShowComments((prev) => !prev)}
        className="p-2 rounded-md hover:cursor-pointer hover:bg-gray-300 text-xl bg-gray-200 text-gray-600 font-semibold text-center"
      >
        Comments ({currentComments.length})
      </div>
      {showComments && (
        <div className="p-2 rounded-md max-h-48 bg-gray-300 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {currentComments.map((c: CommentType, index: number) => (
              <SingleComment key={index} comment={c} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default PostComments
