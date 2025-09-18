import { buildConfig } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { AdminUsers } from './collections/AdminUsers'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Comments } from './collections/Comments'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: { baseDir: path.resolve(dirname) },
    user: AdminUsers.slug, // admin panel uses AdminUsers only
  },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),

  collections: [AdminUsers, Users, Posts, Categories, Media, Comments],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  cors: [
    'https://payload-cms-blog-website-qrdy.vercel.app',
    'http://localhost:8100',
    'http://localhost:8000',
  ],
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
