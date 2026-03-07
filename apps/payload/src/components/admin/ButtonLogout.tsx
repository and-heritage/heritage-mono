'use client'

import { Button, useModal, ConfirmationModal } from '@payloadcms/ui'
import { useAuth } from '@payloadcms/ui'
import { useRouter } from 'next/navigation';

const SLUG_MODAL = 'logout-confirm';

export default function ButtonLogout() {
  const router = useRouter()
  const { openModal, closeModal } = useModal();
  const { logOut } = useAuth();

  return <>
    <Button onClick={() => openModal(SLUG_MODAL)}>Log Out</Button>
    <ConfirmationModal
      modalSlug={SLUG_MODAL}
      heading='Confirm Logout'
      body=<>Are you sure to logout?</>
      onConfirm={async () => {
        await logOut();
        router.replace('/admin/login');
      }}
      onCancel={() => closeModal}
    />
  </>
}