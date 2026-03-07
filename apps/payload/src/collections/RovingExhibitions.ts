import { CollectionConfig } from 'payload';
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

export const RovingExhibitions: CollectionConfig = {
  slug: 'roving-exhibitions',
  admin: {
    useAsTitle: 'title'
  },
  versions: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Sub-title'
    },
    {
      label: 'Additional Information',
      type: 'collapsible',
      admin: {
        initCollapsed: false
      },
      fields: [
        {
          name: 'startDate',
          type: 'date'
        },
        {
          name: 'endDate',
          type: 'date',
          validate: (value, { data }: { data: any }) => {
            if (!value || !data?.startDate) return true

            const start = new Date(data.startDate)
            const end = new Date(value)

            if (end <= start) {
              return 'End date must be greater than start date'
            }

            return true
          },
        },
        {
          name: 'time',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'h:mm:ss a',
            },
          }
        },
        {
          name: 'venue',
          type: 'text'
        },
        {
          name: 'admission',
          type: 'text'
        }
      ]
    },
    {
      label: 'Media',
      type: 'collapsible',
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          label: 'Images',
          name: 'images',
          type: 'array',
          fields: [
            { name: 'file', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text' },
          ],
        },
      ]
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
