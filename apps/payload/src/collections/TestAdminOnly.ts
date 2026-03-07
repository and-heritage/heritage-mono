import { isAdmin } from '@/helpers/user-helper'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload'

export const TestAdminOnly: CollectionConfig = { 
  versions: true,
  labels: {
    singular: 'Test Admin Only',
    plural: 'Test Admin Only'
  },
  slug: 'test-admin-only',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        disableListColumn: true
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature()
        ]
      })
    }
  ]
};
