import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { AuditLogs } from './collections/AuditLogs'
import { Trails } from './collections/Trails'
import { GuidedTours } from './collections/GuidedTours'
import { RovingExhibitions } from './collections/RovingExhibitions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      logout: {
        Button: '/components/admin/ButtonLogout'
      }
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [AuditLogs, Users, Media, Trails, GuidedTours, RovingExhibitions],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL as string
    }
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'uploads/media',
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            return [`${process.env.EXT_S3_MEDIA_ENDPOINT}`, prefix, filename].filter(Boolean).join('/')
          }
        }
      },
      bucket: process.env.EXT_S3_BUCKET!,
      config: {
        region: process.env.EXT_AWS_REGION,
        credentials: {
          accessKeyId: process.env.EXT_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.EXT_AWS_SECRET_ACCESS_KEY!,
        }
      }
    })
  ],
})
