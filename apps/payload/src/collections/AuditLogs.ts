import { isAdmin } from '@/helpers/user-helper';
import { CollectionConfig } from 'payload';

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action'
  },
  access: {
    read: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'action',
      type: 'text'
    },
    {
      name: 'collection',
      type: 'text'
    },
    {
      name: 'docID',
      type: 'text'
    },
    {
      name: 'deletedBy',
      type: 'relationship',
      relationTo: 'users',
      required: false
    },
    {
      name: 'timestamp',
      type: 'date'
    },
    {
      name: 'data',
      type: 'json'
    }
  ]
};