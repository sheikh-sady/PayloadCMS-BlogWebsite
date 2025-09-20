import { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
     meta: {
      title: 'Comments',
      description: 'Collection to manage comments',
    },
    useAsTitle: 'content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    // both the update and delete logic needs to be changed.. pore korbo
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user }, id }) =>
      user?.role === 'admin' || id === user?.id || user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}
