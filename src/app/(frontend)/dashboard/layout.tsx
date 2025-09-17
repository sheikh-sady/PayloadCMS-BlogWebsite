import CommentProvider from '@/context/commentContext'
import PostProvider from '@/context/postContext'
import UserProvider from '@/context/userContext'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <PostProvider>
        <CommentProvider>{children}</CommentProvider>
      </PostProvider>
    </UserProvider>
  )
}
export default DashboardLayout
