import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return user?.role === 'author' || user?.role === 'admin' || user?.role === 'super-admin'
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
