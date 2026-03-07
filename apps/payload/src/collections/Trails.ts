import { CollectionConfig } from 'payload';
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

export const Trails: CollectionConfig = {
  slug: 'trails',
  admin: {
    useAsTitle: 'title'
  },
  versions: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title of the Trail',
      required: true
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Sub-title of the Trail'
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true
    },
    {
      label: 'Trail Information',
      type: 'collapsible',
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          name: 'location',
          type: 'text'
        },
        {
          name: 'completion',
          type: 'text'
        },
        {
          name: 'architect',
          type: 'text'
        },
        {
          name: 'yearsOfUse',
          type: 'text'
        },
        {
          name: 'nameToday',
          type: 'text'
        },
        {
          name: 'otherHistoricalNames',
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
          name: 'trailImage',
          type: 'upload',
          relationTo: 'media'
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media'
        },
        {
          label: '3D Objects',
          name: '3dObjects',
          type: 'array',
          fields: [
            { name: 'file', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text' },
          ],
        },
      ]
    },
    {
      label: 'Hotspot Configuration',
      type: 'collapsible',
      admin: {
        initCollapsed: true
      },
      fields: [
        {
          name: 'coordinatesGroup',
          type: 'group',
          label: 'Coordinates for the hotspot',
          fields: [
            {
              label: 'X coordinate',
              name: 'x',
              type: 'number',
              defaultValue: 0,
              required: true,
            },
            {
              label: 'Y coordinate',
              name: 'y',
              type: 'number',
              defaultValue: 0,
              required: true,
            },
          ],
        }
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
