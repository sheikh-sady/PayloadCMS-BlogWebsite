'use client'
import { PostType } from '@/components/PostCard'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export const PostContext = createContext<PostType | any>([])

export function usePosts() {
  return useContext(PostContext)
}

export default function PostProvider({ children }: { children: ReactNode }) {
  const [publishedPosts, setPublishedPosts] = useState<PostType | any>([])
  const [draftPosts, setDraftPosts] = useState<PostType | any>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await res.json()
      console.log('post response', response)
      if (res.ok) {
        setPublishedPosts(response.docs.filter((p: PostType) => p.status === 'published'))
        setDraftPosts(response.docs.filter((p: PostType) => p.status === 'draft'))
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])
  return (
    <PostContext.Provider
      value={{ publishedPosts, setPublishedPosts, draftPosts, setDraftPosts, loading, setLoading }}
    >
      {children}
    </PostContext.Provider>
  )
}
