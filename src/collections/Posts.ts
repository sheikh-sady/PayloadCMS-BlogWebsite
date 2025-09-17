import { CollectionConfig } from 'payload'
import { deleteAccess } from './accessrules/PostsAccess'
import { tr } from 'payload/i18n/tr'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      user?.role === 'author' || user?.role === 'admin' || user?.role === 'super-admin',
    // this update logic needs to be chnaged.. pore korbo
    update: async ({ req, id, data }) =>
      req.user?.role === 'admin' || req.user?.role === 'super-admin' || req.user?.role === 'author',

    delete: deleteAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // {
    //   name: 'slug',
    //   type: 'text',
    //   required: true,
    //   admin: {
    //     description: 'Automatically generated from title if left empty',
    //   },
    //   hooks: {
    //     beforeChange: [
    //       ({ data }) => {
    //         if (data.title && !data.slug) {
    //           data.slug = data.title
    //             .toLowerCase()
    //             .replace(/ /g, '-')
    //             .replace(/[^\w-]+/g, '')
    //         }
    //         return data
    //       },
    //     ],
    //   },
    // },
    {
      name: 'content',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}
