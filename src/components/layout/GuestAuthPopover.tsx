import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export function GuestAuthPopover({
  className,
  triggerClassName,
  triggerLabel,
  icon: Icon,
  href = PATHS.signIn,
}: {
  className?: string
  triggerClassName?: string
  triggerLabel: string
  icon: ComponentType<{ className?: string }>
  href?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <Link
        to={href}
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
          triggerClassName,
        )}
        aria-label={triggerLabel}
      >
        <Icon className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
      </Link>
    </div>
  )
}
