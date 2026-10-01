import { Link } from 'react-router-dom'
import { SITE } from '@/shared/config/site'
import { cn } from '@/shared/lib/cn'

type SiteLogoProps = {
  to: string
  showTagline?: boolean
  className?: string
  markClassName?: string
  titleClassName?: string
  /** Fires before navigation (e.g. switch home to marketing landing). */
  onNavigate?: () => void
}

export function SiteLogo({
  to,
  showTagline = true,
  className,
  markClassName,
  titleClassName,
  onNavigate,
}: SiteLogoProps) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn('flex min-w-0 shrink-0 items-center gap-2.5', className)}
    >
      <img
        src={SITE.logoSrc}
        alt=""
        aria-hidden
        className={cn(
          'h-11 w-11 shrink-0 rounded-lg object-contain sm:h-12 sm:w-12',
          markClassName,
        )}
      />
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            'block font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl',
            titleClassName,
          )}
        >
          {SITE.name}
        </span>
        {showTagline ? (
          <span className="hidden truncate text-[11px] text-muted sm:block">{SITE.tagline}</span>
        ) : null}
      </span>
    </Link>
  )
}
