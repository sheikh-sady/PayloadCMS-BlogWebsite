import { ExtendedBlock } from '@/blocks/ExtendedBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    meta: {
      title: 'Categories',
      description: 'Collection to manage categories',
    },
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'super-admin' || user?.role === 'author',
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'super-admin' || user?.role === 'author',
    delete: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'super-admin' || user?.role === 'author',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      //required: true,
      //   admin: {
      //     description: 'Automatically generated from name if left empty',
      //     position: 'sidebar',
      //   },
      //   hooks: {
      //     beforeChange: [
      //       ({ data, originalDoc }) => {
      //         // Only set slug if this is a new document or slug is empty
      //         if (data?.name && (!originalDoc?.slug || originalDoc.slug === '')) {
      //           data.slug = data.name
      //             .toLowerCase()
      //             .replace(/ /g, '-')
      //             .replace(/[^\w-]+/g, '')
      //         }
      //         return data
      //       },
      //     ],
      //   },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    // {
    //   name: 'categoryBlock',
    //   type: 'blocks',
    //   blocks: [ExtendedBlock],
    // },
  ],
}
