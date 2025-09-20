'use client'
import { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getCookie, useUser } from '@/context/userContext'
import { MediaType, PostType } from '@/components/PostCard'
import DropdownComponent from '@/components/DropdownComponent'
import { CategoryType } from '@/components/PostCard'
import { useCategories } from '@/context/categoryContext'
import { usePosts } from '@/context/postContext'
import {
  hasOnlyDigits,
  hasSpecialChars,
  isLengthEnough,
} from '@/app/(frontend)/services/validationService'
import ErrorMessage from '@/components/ErrorMessage'
import { extractPlainText } from '@/app/(frontend)/services/converter'

export default function CreateOrEditPostPage({ params }: { params: { id?: string } }) {
  const { id } = params
  const router = useRouter()
  const { user } = useUser()
  const token = getCookie('frontendToken')

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [existingImage, setExistingImage] = useState<MediaType | null>(null)
  const [draftClicked, setDraftClicked] = useState<boolean>(false)
  const [errorTitle, setErrorTitle] = useState<boolean>(false)
  const [errorContent, setErrorContent] = useState<boolean>(false)
  // ✅ Categories from context
  const { categories } = useCategories()
  const { setPublishedPosts, setDraftPosts } = usePosts()

  // ✅ Local state for selected categories
  const [selectedCategories, setSelectedCategories] = useState<CategoryType | null>(null)

  const categoryOptions: CategoryType[] = categories

  // ✅ Fetch existing post when editing
  useEffect(() => {
    if (!id || id === 'new') return

    const fetchPost = async () => {
      setLoading(true)
      const res = await fetch(`/api/posts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setTitle(data.title)
        setContent(extractPlainText(data.content.root))
        setSelectedCategories(data.categories || null)
        setExistingImage(data.featuredImage || null)
      }
      setLoading(false)
    }

    fetchPost()
  }, [id, token])

  useEffect(() => {
    if (hasSpecialChars(title) || hasOnlyDigits(title)) setErrorTitle(true)
    else setErrorTitle(false)
    if (!isLengthEnough(content) || hasOnlyDigits(content)) setErrorContent(true)
    else setErrorContent(false)
  }, [title, content])

  // ✅ Submit handler

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    let imageData: MediaType | null = existingImage

    if (featuredImage && featuredImage.size > 0) {
      // 🔹 Compress the image first
      const compressedImage = await imageCompression(featuredImage, {
        maxSizeMB: 0.2, // maximum size in MB
        maxWidthOrHeight: 1200, // resize if larger
        useWebWorker: true, // use a web worker for performance
      })

      const imageForm = new FormData()
      imageForm.append('file', compressedImage) // field name must match collection
      imageForm.append('alt', compressedImage.name || featuredImage.name)

      const imageRes = await fetch('/api/media', {
        method: 'POST',
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: imageForm,
      })

      const imageResponse = await imageRes.json()
      console.log('Image res:', imageResponse)
      imageData = imageResponse.doc
    }

    const postBody = {
      title,
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: content }],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      categories: selectedCategories,
      status: draftClicked ? 'draft' : 'published',
      publishedAt: new Date().toISOString(),
      author: user,
      featuredImage: imageData,
    }

    const endpoint = id === 'new' ? '/api/posts' : `/api/posts/${id}`
    const method = id === 'new' ? 'POST' : 'PATCH'

    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(postBody),
    })

    const data = await res.json()
    console.log(id === 'new' ? 'Post created:' : 'Post updated:', data)

    setLoading(false)
    if (res.ok) {
      if (id === 'new') setPublishedPosts((prev: PostType[]) => [data.doc, ...prev])
      else {
        if (draftClicked) {
          setDraftPosts((prev: PostType[]) => prev.filter((p: PostType) => p.id !== data.doc.id))
          setPublishedPosts((prev: PostType[]) => [data.doc, ...prev])
        } else {
          setPublishedPosts((prev: PostType[]) =>
            prev.map((p: PostType) => (p.id === data.doc.id ? data.doc : p)),
          )
        }
      }
    }

    router.push(`/posts/${data.doc?.id || id}`)
  }

  return (
    <div className="w-auto h-screen flex justify-center items-center font-sans">
      <div className="bg-white p-5 my-2 flex flex-col gap-6 w-96 shadow-xl rounded-xl">
        <div className="text-start">
          <p className="text-xl font-bold text-gray-600">
            {id === 'new' ? 'Create New Post' : 'Edit Post'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-600 font-bold">Title</p>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
            {errorTitle && <ErrorMessage />}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-600 font-bold">Content</p>
            <Textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              required
            />
            {content && errorContent && (
              <p className="text-gray-400 font-bold text-xs">Content must have 140 characters</p>
            )}
          </div>

          <p className="text-xs font-bold text-gray-600">Select Category</p>
          <DropdownComponent
            caption="Select category"
            itemsArray={categoryOptions}
            selected={selectedCategories}
            onSelect={(value) => setSelectedCategories(value)}
          />

          {existingImage && !featuredImage && (
            <div className="mb-2">
              <img
                src={existingImage.url}
                alt="Featured"
                className="h-32 w-auto rounded-md border"
              />
              <p className="text-sm text-gray-600">Current image</p>
            </div>
          )}

          <Input
            type="file"
            name="featuredImage"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={loading || errorContent || errorTitle}
              className="flex-1 bg-gray-600"
            >
              {loading
                ? !draftClicked
                  ? 'Saving...'
                  : 'Publish Post'
                : id === 'new'
                  ? 'Publish Post'
                  : 'Update Post'}
            </Button>
            {id === 'new' && (
              <Button
                onClick={() => {
                  setDraftClicked(true)
                  handleSubmit
                }}
                type="submit"
                disabled={loading || errorContent || errorTitle}
                className="bg-gray-600"
              >
                {loading ? (draftClicked ? 'Saving...' : 'Save as draft') : 'Save as Draft'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
