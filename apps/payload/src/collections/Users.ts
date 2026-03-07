import { ROLE_ADMIN, ROLE_MANAGER } from '@/constants'
import { isAdmin, isAdminOrSelf } from '@/helpers/user-helper'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    hidden: ({ user }) => user?.role !== ROLE_ADMIN,
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: ROLE_MANAGER,
      options: [
        { label: 'Admin', value: ROLE_ADMIN },
        { label: 'Manager', value: ROLE_MANAGER }
      ],
    }
  ],
  hooks: {
    afterDelete: [
      async ({ doc, req }) => {
        // `doc` is the deleted document
        // `req` contains user and other request data
        await req.payload.create({
          collection: 'audit-logs',
          data: {
            action: 'delete',
            collection: 'users',
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
