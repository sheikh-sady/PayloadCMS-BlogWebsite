'use client'
import { getCookie } from '@/context/userContext'
import DeleteIcon from './DeleteIcon'
import PlusIcon from './PlusIcon'
import { Button } from './ui/button'
import { PostType } from './PostCard'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/context/postContext'

export default function DraftAction({ post }: { post: PostType }) {
  const token = getCookie('frontendToken')
  const router = useRouter()
  const { setPublishedPosts, setDraftPosts } = usePosts()
  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    const response = await res.json()
    if (res.ok) {
      alert('Draft post deleted successfully...')
      setDraftPosts((prev: PostType[]) => prev.filter((p: PostType) => p.id !== post.id))
      router.push('/')
    } else console.log('Delete response : ', response)
  }
  const handleSubmit = async () => {
    const updatedPost = { ...post, status: 'published' }
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(updatedPost),
    })
    const response = await res.json()
    if (res.ok) {
      alert('Draft post published')
      setPublishedPosts((prev: PostType[]) => [post, ...prev])
      router.push('/')
    } else alert('Error publishing draft post')
    console.log('draft publish response : ', response)
  }
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button onClick={handleSubmit} className="h-12 flex-1 bg-gray-600">
        <div className="flex gap-3 items-center">
          <PlusIcon />
          <p>Publish</p>
        </div>
      </Button>
      <Button onClick={handleDelete} className="h-12 flex-1 bg-red-500">
        <div className="flex gap-3 items-center">
          <DeleteIcon />
          <p>Delete</p>
        </div>
      </Button>
    </div>
  )
}
