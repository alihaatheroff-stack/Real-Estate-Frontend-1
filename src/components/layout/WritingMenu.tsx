import { Link } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import { GuestAuthPopover } from '@/components/layout/GuestAuthPopover'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export function WritingMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  if (locked) {
    return (
      <GuestAuthPopover
        className={className}
        triggerLabel="Create post"
        icon={SquarePen}
      />
    )
  }

  return (
    <Link
      to={PATHS.postOffer}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
        className,
      )}
      aria-label="Create post"
    >
      <SquarePen className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" aria-hidden />
    </Link>
  )
}
