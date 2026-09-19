import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export function NetworkCard({
  children,
  className,
  padded = true,
}: {
  children: ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <section
      className={cn(
        'overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(15,31,26,0.04)]',
        padded && 'p-4',
        className,
      )}
    >
      {children}
    </section>
  )
}
