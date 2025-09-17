'use client'
import { PostType } from '@/components/PostCard'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
export interface CommentType {
  id: string
  author: {
    firstName: string
    lastName: string
    id: string
  }
  createdAt: string
  post: PostType
  content: string
}
export const CommentContext = createContext<CommentType | any>([])

export function useComments() {
  return useContext(CommentContext)
}

export default function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<CommentType | any>([])
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch('/api/comments', {
        method: 'GET',
      })
      const response = await res.json()
      console.log('Comments response : ', response)
      if (res.ok) setComments(response.docs)
    }
    fetchComments()
  }, [])
  return (
    <CommentContext.Provider value={{ comments, setComments }}>{children}</CommentContext.Provider>
  )
}
