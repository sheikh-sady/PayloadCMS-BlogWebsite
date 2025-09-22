import UserProvider from '@/context/userContext'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
