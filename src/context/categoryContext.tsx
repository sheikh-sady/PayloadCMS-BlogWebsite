'use client'
import { CategoryType } from '@/components/PostCard'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export const CategoryContext = createContext<CategoryType | any>([])

export function useCategories() {
  return useContext(CategoryContext)
}

export default function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryType | any>([])
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories', {
        method: 'GET',
      })
      const response = await res.json()
      console.log('Categories response : ', response)
      if (res.ok) setCategories(response.docs)
    }
    fetchCategories()
  }, [])
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}
