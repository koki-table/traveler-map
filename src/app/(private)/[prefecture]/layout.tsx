'use client'

import { PrefectureContextProvider } from '@/features/prefecture/contexts/PrefectureContext'
import { ReactNode } from 'react'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <PrefectureContextProvider>{children}</PrefectureContextProvider>
}
