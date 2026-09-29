import { forwardRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Heart, MapPin, Star, Users } from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import type { Employer } from '@/entities/employer/types'
import { employerEmployeesPath, employerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'
import { PROFILE_RESULT_CARD_FRAME } from '@/features/referrals/components/FeaturedAgentAdCard'

type EmployerMapCardProps = {
  employer: Employer
  active?: boolean
  selected?: boolean
  compact?: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

function categoryLabel(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function LogoHero({ employer, zoomed = false }: { employer: Employer; zoomed?: boolean }) {
  if (employer.logoUrl) {
    return (
      <span
        className={cn(
          'flex h-full w-full items-center justify-center overflow-hidden',
          zoomed ? 'p-0.5 sm:p-1' : 'p-1',
        )}
      >
        <img
          src={employer.logoUrl}
          alt={employer.name}
          className={cn(
            'h-full w-full object-contain object-center',
            zoomed &&
              'scale-[1.28] transition duration-500 group-hover:scale-[1.34]',
          )}
          loading="lazy"
        />
      </span>
    )
  }

  return (
    <span
      className="flex h-full w-full items-center justify-center text-4xl font-bold tracking-wide text-white sm:text-5xl"
      style={{ backgroundColor: employer.logoColor }}
      aria-hidden
    >
      {employer.logoInitials}
    </span>
  )
}

export const EmployerMapCard = forwardRef<HTMLElement, EmployerMapCardProps>(
  function EmployerMapCard(
    { employer, active, selected, compact = false, onSelect, onHover },
    ref,
  ) {
    const [saved, setSaved] = useState(false)
    const href = employerPath(employer.id)
    const projectLabel = employer.openProjects === 1 ? 'project' : 'projects'

    function selectOnMap(event?: { stopPropagation?: () => void }) {
      event?.stopPropagation?.()
      onSelect(employer.id)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        selectOnMap()
      }
    }

    if (compact) {
      return (
        <article
          ref={ref}
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label={`Show ${employer.name} on the map`}
          onClick={() => selectOnMap()}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => onHover(employer.id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            'group flex h-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border bg-white p-4 text-left shadow-[0_6px_18px_rgb(15_31_26/0.06)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:gap-4',
            selected
              ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
              : active
                ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
                : 'border-line/80 hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]',
          )}
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-mist sm:h-[4.5rem] sm:w-[4.5rem]">
            <LogoHero employer={employer} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              {categoryLabel(employer.category)}
            </p>
            <p className="mt-0.5 truncate text-base font-bold text-ink">{employer.name}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {employer.city}, {employer.state}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-ink">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
                {formatRating(employer.rating)}
                <span className="font-normal text-muted">({employer.reviewCount})</span>
              </span>
            </div>
          </div>

          <div className="ml-auto grid w-[11.5rem] shrink-0 grid-cols-2 gap-1.5 sm:w-[13.5rem] sm:gap-2 md:w-[15rem]">
            <div className="rounded-xl bg-[#F3F6F8] px-2 py-1.5 sm:px-2.5 sm:py-2">
              <p className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-muted sm:text-[10px]">
                <Briefcase className="h-3 w-3 shrink-0" aria-hidden />
                <span className="truncate">In Queue</span>
              </p>
              <p className="mt-0.5 truncate text-xs font-bold tabular-nums text-ink sm:mt-1 sm:text-sm">
                {employer.openProjects} {projectLabel}
              </p>
            </div>
            <div className="rounded-xl bg-[#F3F6F8] px-2 py-1.5 sm:px-2.5 sm:py-2">
              <p className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-muted sm:text-[10px]">
                <Users className="h-3 w-3 shrink-0" aria-hidden />
                Team
              </p>
              <Link
                to={employerEmployeesPath(employer.id)}
                onClick={(event) => event.stopPropagation()}
                className="mt-0.5 inline-block truncate text-xs font-bold text-ink underline underline-offset-2 hover:text-brand sm:mt-1 sm:text-sm"
              >
                {employer.employees}
              </Link>
            </div>
          </div>
        </article>
      )
    }

    return (
      <article
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`Show ${employer.name} on the map`}
        onClick={() => selectOnMap()}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => onHover(employer.id)}
        onMouseLeave={() => onHover(null)}
        className={cn(
          PROFILE_RESULT_CARD_FRAME,
          'group cursor-pointer text-left shadow-[0_6px_18px_rgb(15_31_26/0.06)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
          selected
            ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
            : active
              ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
              : 'border-line/80 hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]',
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <LogoHero employer={employer} zoomed />

          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation()
              setSaved((value) => !value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                event.stopPropagation()
                setSaved((value) => !value)
              }
            }}
            className="absolute left-2.5 top-2.5 z-10 inline-flex items-center justify-center text-ink/70 drop-shadow-[0_1px_3px_rgb(255_255_255_/_0.8)] transition hover:scale-110 hover:text-rose-500"
            aria-label={saved ? 'Remove from saved' : 'Save employer'}
            aria-pressed={saved}
          >
            <Heart
              className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
              strokeWidth={2.2}
            />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {categoryLabel(employer.category)}
          </p>
          <h3 className="line-clamp-2 min-h-[3.4rem] text-[19px] font-bold leading-snug text-ink group-hover:text-brand">
            <Link
              to={href}
              onClick={(event) => event.stopPropagation()}
              className="hover:underline"
            >
              {employer.name}
            </Link>
          </h3>
          <p className="line-clamp-1 text-sm text-muted">{employer.tagline}</p>

          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" aria-hidden />
            {employer.city}, {employer.state}
          </p>

          <p className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
            {formatRating(employer.rating)}
            <span className="font-normal text-muted">({employer.reviewCount})</span>
          </p>

          <div className="mt-auto grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-[#F3F6F8] px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                <Briefcase className="h-3.5 w-3.5" aria-hidden />
                In Queue
              </p>
              <p className="mt-1 text-sm font-bold tabular-nums text-ink">
                {employer.openProjects} {projectLabel}
              </p>
            </div>
            <div className="rounded-xl bg-[#F3F6F8] px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                <Users className="h-3.5 w-3.5" aria-hidden />
                Team
              </p>
              <Link
                to={employerEmployeesPath(employer.id)}
                onClick={(event) => event.stopPropagation()}
                className="mt-1 inline-block text-sm font-bold text-ink underline underline-offset-2 hover:text-brand"
              >
                {employer.employees}
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  },
)
