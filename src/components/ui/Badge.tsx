import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type BadgeProps = {
  children: ReactNode
  tone?: 'brand' | 'accent' | 'muted' | 'ink'
  className?: string
}

const tones = {
  brand: 'bg-brand-light text-brand-dark',
  accent: 'bg-accent-soft text-ink',
  muted: 'bg-mist text-muted',
  ink: 'bg-ink text-paper',
}

export function Badge({ children, tone = 'brand', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
