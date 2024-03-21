'use client'

import '@/app/globals.css'
import { AppPrivateLayout } from '@/components/layout/AppPrivateLayout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppPrivateLayout>{children}</AppPrivateLayout>
}
