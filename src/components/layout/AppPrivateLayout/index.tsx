import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'

/**
 * props
 */
interface LayoutProps {
  children: ReactNode
}

/**
 * Layout
 */
export function AppPrivateLayout({ children }: LayoutProps) {
  return (
    <>
      <div>
        <form action={signOut}>
          <Button>サインアウト</Button>
        </form>
      </div>
      {children}
    </>
  )
}
