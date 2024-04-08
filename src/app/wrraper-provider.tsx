'use client'

import '@/app/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function WrapperProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
