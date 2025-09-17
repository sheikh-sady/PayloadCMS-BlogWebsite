'use client'
import { usePosts } from '@/context/postContext'
import DoneIcon from './DoneIcon'
import PostCard, { PostType } from './PostCard'
import { useUser } from '@/context/userContext'

export default function DashboardMiddle({ userPosts }: { userPosts: PostType[] }) {
  const { draftPosts } = usePosts()
  const { user } = useUser()
  const userDraftPosts = draftPosts.filter((p: PostType) => p.author.id === user.id)
  const publishedPosts: PostType[] = userPosts.filter((p: PostType) => p.status === 'published')
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <div className="w-full flex flex-col gap-2">
        <p className="text-2xl text-center text-gray-600 font-semibold">Recent Posts</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {publishedPosts.length > 0 &&
            publishedPosts.slice(0, 3).map((p: PostType) => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-2xl text-center text-gray-600 font-semibold">Drafts</p>

        {userDraftPosts.length === 0 ? (
          <div className="w-full bg-gray-200 p-2 flex justify-center gap-3 rounded-md items-center">
            <DoneIcon />
            <p className="text-xl font-bold text-gray-600">Nothing in your draft</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {userDraftPosts.slice(0, 3).map((p: PostType) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
