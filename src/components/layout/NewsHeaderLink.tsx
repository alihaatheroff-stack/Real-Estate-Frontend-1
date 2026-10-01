import { Newspaper } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export function NewsHeaderLink({
  className,
  iconClassName,
  onNavigate,
  tourId,
}: {
  className?: string
  iconClassName?: string
  onNavigate?: () => void
  tourId?: string
}) {
  return (
    <NavLink
      to={PATHS.news}
      data-tour-id={tourId}
      aria-label="News and updates"
      title="News and updates"
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
          isActive && 'bg-mist text-brand',
          className,
        )
      }
    >
      <Newspaper
        className={cn('h-[1.35rem] w-[1.35rem] stroke-[1.5]', iconClassName)}
        aria-hidden
      />
    </NavLink>
  )
}
