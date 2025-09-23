import { GlobalConfig } from 'payload'
export const HeroSection: GlobalConfig = {
  slug: 'heroSection',
  admin: {
    meta: {
      title: 'Hero section admin',
      description: 'Gloabal to manage Hero section contents',
    },
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroTitle',
      type: 'text',
    },
    {
      name: 'heroDescription',
      type: 'text',
    },
  ],
}
