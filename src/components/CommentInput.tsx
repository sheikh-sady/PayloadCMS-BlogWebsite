import { ReactHTMLElement } from 'react'
import CancelIcon from './CancelIcon'
import SendIcon from './SendIcon'
import { Input } from './ui/input'
import { PostType } from './PostCard'
import { CommentType, useComments } from '@/context/commentContext'

export default function CommentInput({
  user,
  post,
  setIsOpen,
  comment,
}: {
  setIsOpen: any
  post: PostType
  user: any
  comment?: CommentType
}) {
  const { setComments } = useComments()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const content = formData.get('content')
    console.log('Comment is : ', content)
    const endpoint = comment ? `/api/comments/${comment.id}` : '/api/comments'
    const res = await fetch(endpoint, {
      method: `${comment ? 'PATCH' : 'POST'}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        author: user,
        post,
        approved: true,
      }),
    })
    if (!res.ok) console.log('Error adding comment')
    else {
      const response = await res.json()
      if (!comment) setComments((prev: CommentType[]) => [response.doc, ...prev])
      else {
        setComments((prev: CommentType[]) =>
          prev.map((comment) => (comment.id === response.doc.id ? response.doc : comment)),
        )
      }
    }
    form.reset()
    setIsOpen(false)
  }
  return (
    <form className="flex gap-3 items-center" onSubmit={handleSubmit}>
      <Input
        defaultValue={comment?.content}
        name="content"
        placeholder="Write Something"
        className="bg-gray-100 flex-1 text-xs text-black"
      />
      <div className="hover:cursor-pointer" onClick={() => setIsOpen(false)}>
        <CancelIcon />
      </div>
      <button type="submit">
        <SendIcon />
      </button>
    </form>
  )
}
