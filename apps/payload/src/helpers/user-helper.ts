import { ROLE_ADMIN } from '@/constants';
import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false;
  return user?.role === ROLE_ADMIN;
} 

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;

  if (user?.role === ROLE_ADMIN) {
    return true;
  }

  return {
    id: {
      equals: user?.id
    }
  };
} 