import CategoryProvider from '@/context/categoryContext'
import { ReactNode } from 'react'

export default function PageLayout({ children }: { children: ReactNode }) {
  return <CategoryProvider>{children}</CategoryProvider>
}
