'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import GalleryIcon from './GalleryIcon'

export interface MediaType {
  id: string
  alt: string
  filename: string
  mimeType: string
  filesize?: number
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
  url: string
}
export interface CategoryType {
  id: string
  name: string
  description: string
}
export interface PostType {
  id: string
  title: string
  content: string
  author: {
    firstName: string
    lastName: string
    id: string
  }
  status: 'published' | 'draft'
  categories: CategoryType
  publishedAt: string
  featuredImage?: MediaType
}

export const getImageUrl = (image?: MediaType): string => {
  if (!image) return '/placeholder-image.jpg'
  return image.url
}

export default function PostCard({ post }: { post: PostType }) {
  return (
    <Link href={`/posts/${post.id}`} passHref>
      <Card className="max-w-88 h-[420px] lg:h-[400px] cursor-pointer hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-600">
            {post.featuredImage ? (
              <img
                src={getImageUrl(post.featuredImage)}
                alt={post.featuredImage?.alt || post.title}
                className="rounded-lg w-full h-48 md:h-36 lg:h-40 object-cover"
              />
            ) : (
              <div className="flex gap-2 justify-center items-center w-full h-48 md:h-36 lg:h-40 bg-gray-200 border-2 border-dashed rounded-lg">
                <GalleryIcon />
                <p className="text-gray-400 font-bold text-sm">No image</p>
              </div>
            )}
            <p className="mt-3">
              {post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title}
            </p>
          </CardTitle>

          <CardDescription className="text-sm font-bold text-gray-600">
            <p>
              By {post.author.firstName} {post.author.lastName}
            </p>
            <p>Created at {new Date(post.publishedAt).toLocaleDateString()}</p>
          </CardDescription>
        </CardHeader>

        <CardContent className="text-sm font-medium text-gray-500">
          {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
        </CardContent>

        {/* <CardFooter>
          <p className="text-blue-500 underline">Read more</p>
        </CardFooter> */}
      </Card>
    </Link>
  )
}
