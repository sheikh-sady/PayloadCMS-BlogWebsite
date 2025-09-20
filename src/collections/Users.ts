import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users', // frontend users
  auth: true, // enable login/signup
  admin: {
    meta: {
      title: 'Users',
      description: 'Collection to manage users',
    },
    useAsTitle: 'email',
  },
  access: {
    // Anyone (anonymous or logged-in) can read users
    read: () => true,

    // Only anonymous users can register
    create: ({ req: { user } }) => !user || user.role === 'super-admin' || user.role === 'admin',

    // Update rules:
    // - Users can update themselves
    // - Admins and moderators can update any frontend user
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (id === user.id) return true
      if (user.role === 'admin' || user.role === 'super-admin') return true
      return false
    },

    // Delete rules:
    // - Only admin or moderator can delete frontend users
    delete: ({ req: { user } }) => !!user && (user.role === 'admin' || user.role === 'super-admin'),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: ['subscriber', 'author'],
      defaultValue: 'subscriber',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
