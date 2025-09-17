import type { CollectionConfig } from 'payload'

export const AdminUsers: CollectionConfig = {
  slug: 'admin-users',
  auth: true, // enables authentication for admin panel
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => user?.role ==='admin' || user?.role === 'super-admin',
    update: ({ req: { user }, id }) => user?.role === 'super-admin' || id === user?.id,
    delete: ({ req: { user } }) => user?.role === 'super-admin',
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      options: ['super-admin', 'admin'],
      defaultValue: 'admin',
      required: true,
    },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
