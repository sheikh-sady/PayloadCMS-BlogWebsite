import CategoryProvider from '@/context/categoryContext'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <CategoryProvider>{children}</CategoryProvider>
}
