import { Block } from 'payload'
export const HeroBlock: Block = {
  slug: 'block',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
