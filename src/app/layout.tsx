import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import WrapperProvider from './wrraper-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'travel',
  description: 'travel app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <WrapperProvider>{children}</WrapperProvider>
      </body>
    </html>
  )
}
