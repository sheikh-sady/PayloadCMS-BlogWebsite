import { ReactNode } from 'react'
import CommentProvider from '@/context/commentContext'
const PostsLayout = ({ children }: { children: ReactNode }) => {
  return <CommentProvider>{children}</CommentProvider>
}
export default PostsLayout
