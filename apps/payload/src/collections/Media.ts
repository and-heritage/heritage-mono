import type { CollectionConfig } from 'payload'

/**
 * When `upload` property is enabled:
 * - filename is automatically available
 * - alt must be defined manually
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    listSearchableFields: ['alt', 'filename']
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternate text for this media'
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description for this media',
      validate: (value) => {
        if (typeof value === 'string' && value?.trim()?.length > 255) {
          return 'Maximum length is 255 characters';
        }

        return true;
      }
    }
  ],
  upload: {
    /**
     * Note that `withoutEnalrgement: false` will force the system to generate
     * that specific image size even if the original image's resolution is 
     * smaller than what was defined within specific item within `imageSizes`
     */
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        crop: 'center',
        withoutEnlargement: false
      },
      {
        name: 'medium',
        width: 768,
        height: undefined,
        withoutEnlargement: false
      }
    ]
  },
  hooks: {
    afterDelete: [
      async ({ doc, req }) => {
        // `doc` is the deleted document
        // `req` contains user and other request data
        await req.payload.create({
          collection: 'audit-logs',
          data: {
            action: 'delete',
            collection: 'media',
            docID: doc.id,
            deletedBy: req.user?.id,
            timestamp: new Date().toISOString(),
            data: doc
          }
        });
      }
    ]
  }
}
