import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type ComingSoonProps = {
  children?: ReactNode
  className?: string
}

export function ComingSoon({ children = 'Coming soon', className }: ComingSoonProps) {
  return (
    <span
      className={cn(
        'rounded-md bg-mist px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
