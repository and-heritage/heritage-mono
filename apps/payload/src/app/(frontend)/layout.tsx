import React from 'react'
import './styles.scss'

export const metadata = {
  description: 'Web portal management',
  title: 'Portal Management',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
