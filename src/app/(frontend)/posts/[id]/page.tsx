import AddComment from '@/components/AddComment'
import DeleteIcon from '@/components/DeleteIcon'
import DraftAction from '@/components/DraftAction'
import EditButton from '@/components/EditButton'
import GalleryIcon from '@/components/GalleryIcon'
import PlusIcon from '@/components/PlusIcon'
import { CategoryType } from '@/components/PostCard'
import PostComments from '@/components/PostComments'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type ParamsShape = { id: string }

export default async function SinglePostPage({
  params,
}: {
  // accept either the plain params object or a Promise of params (matches generated PageProps)
  params: ParamsShape | Promise<ParamsShape>
}) {
  // await whether params is a Promise or a plain object
  const { id } = (await params) as ParamsShape

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${id}`, // ✅ Use absolute URL
    {
      method: 'GET',
      cache: 'no-store',
    },
  )

  if (!res.ok) return notFound()

  const post = await res.json()

  const categoryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/${post.categories?.id}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  )

  let category: CategoryType | null
  if (!categoryResponse.ok) category = null
  else category = await categoryResponse.json()

  return (
    <div className="flex flex-col items-center p-2 w-full gap-3">
      <div className="w-[90%] sm:w-[80%] flex flex-col gap-5">
        <div className="p-2 ">
          {post.featuredImage ? (
            <img
              className="w-full"
              src={post.featuredImage?.url}
              alt={post.featuredImage?.alt || post.title}
            />
          ) : (
            <div className="flex gap-2 justify-center items-center w-full h-[280px] bg-gray-200 border-2 border-dashed">
              <GalleryIcon />
              <p className="text-gray-400 font-bold text-sm">No image</p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col text-sm font-bold text-gray-600 gap-3">
          <div className="flex flex-col justify-center sm:flex-row gap-2 sm:items-center">
            <p className="flex-1 text-center p-2 bg-gray-200 rounded-3xl text-sm font-semibold text-gray-600">
              By {post.author.firstName} {post.author.lastName}
            </p>
            <div className="flex-1 text-center p-2 rounded-2xl bg-gray-200 text-md font-semibold">
              {category ? category.name : 'Unknown'}
            </div>
          </div>

          <p className="bg-gray-200 p-2 rounded-2xl text-sm font-semibold text-gray-600 text-center">
            Created at {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="w-[90%] sm:w-[80%] flex flex-col gap-3">
        <div className="flex flex-col gap-5">
          <p className="text-xl font-semibold text-gray-600">{post.title}</p>
          <p className="p-2 text-md bg-gray-200 rounded-md font-medium text-gray-600">
            {post.content}
          </p>
        </div>
        {post.status === 'published' ? (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <EditButton post={post} />
              <AddComment post={post} />
            </div>
            <PostComments post={post} />
          </>
        ) : (
          <DraftAction post={post} />
        )}
      </div>
    </div>
  )
}
