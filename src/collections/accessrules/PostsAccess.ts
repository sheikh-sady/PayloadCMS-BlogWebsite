import type { Access, PayloadRequest } from 'payload'

export const updateAccess: Access = async ({ req, id }) => {
  const user = req.user
  if (!user) return false

  // ✅ Admins & super-admins can update anything
  if (user.role === 'admin' || user.role === 'super-admin') {
    return true
  }

  // ✅ Must have a valid id
  if (!id || typeof id !== 'string') return false

  // ✅ Fetch the existing post
  let post
  try {
    post = await req.payload.findByID({
      collection: 'posts',
      id,
    })
  } catch (err) {
    return false // If post doesn't exist or query fails
  }

  if (!post) return false

  // ✅ Normalize author id (handles both populated objects & plain ids)
  const postAuthorId =
    typeof post.author === 'string' ? post.author : (post.author?.id ?? post.author?.id ?? null)

  // ✅ Allow authors to update their own posts
  if (user.role === 'author' && postAuthorId === user.id) {
    return true
  }

  return false
}

export const deleteAccess: Access = async ({ req, id }) => {
  const user = req.user
  if (!user) return false

  // ✅ Admins & super-admins can delete anything
  if (user.role === 'admin' || user.role === 'super-admin') {
    return true
  }

  // ✅ Must have a valid id
  if (!id || typeof id !== 'string') return false

  // ✅ Fetch the existing post
  let post
  try {
    post = await req.payload.findByID({
      collection: 'posts', // your collection slug
      id,
    })
  } catch (err) {
    return false // If post doesn't exist or query fails
  }

  if (!post) return false

  // ✅ Normalize author id (handles both populated objects & plain ids)
  const postAuthorId =
    typeof post.author === 'string' ? post.author : (post.author?.id ?? post.author?.id ?? null)

  // ✅ Allow author to delete their own drafts
  if (user.role === 'author' && post.status === 'draft' && postAuthorId === user.id) {
    return true
  }

  return false
}
