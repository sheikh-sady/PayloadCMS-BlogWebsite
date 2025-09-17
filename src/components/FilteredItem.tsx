import Link from 'next/link'
import { PostType } from './PostCard'

const FilteredItem = ({ post }: { post: PostType }) => {
  return (
    <Link href={`/posts/${post.id}`} passHref>
      <div className="h-28 flex p-2 sm:h-24 items-center bg-gray-200 rounded-md gap-3">
        <div className="w-20 h-20 ">
          <img className="w-full h-full rounded-full" src={post.featuredImage?.url} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xl font-bold text-gray-600">{post.title.substring(0, 20) + '...'}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <p className="text-md font-semibold text-gray-400">
              {post.author.firstName} {post.author.lastName}
            </p>
            <p className="text-md font-semibold text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default FilteredItem
