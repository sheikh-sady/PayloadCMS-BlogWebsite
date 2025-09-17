'use client'
import PostCard, { PostType } from './PostCard'
import { usePosts } from '@/context/postContext'

export default function PostsGroup({ filteredPosts }: { filteredPosts?: PostType[] }) {
  const { publishedPosts, loading } = usePosts()

  return (
    <>
      {loading ? (
        <p className="text-xl font-bold text-gray-800">Fetching Blogs...</p>
      ) : filteredPosts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {
            filteredPosts.map((p: PostType) => <PostCard key={p.id} post={p} />)
          }
        </div>
        // ✅ Render filtered posts if provided
        
      ) : (
        // ✅ Otherwise show published posts
        <>
          <p className="text-black text-3xl font-bold">Featured Blogs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {publishedPosts.map((post: PostType) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
