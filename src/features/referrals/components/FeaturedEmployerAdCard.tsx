import { forwardRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Heart, MapPin, Star, Users } from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import { employerEmployeesPath, employerPath } from '@/app/router/paths'
import {
  PROFILE_RESULT_CARD_FRAME,
  type AdBannerPlacement,
} from '@/features/referrals/components/FeaturedAgentAdCard'
import type { EmployerResultAd } from '@/features/referrals/data/employerResultAds'
import type { Employer } from '@/entities/employer/types'
import { cn } from '@/shared/lib/cn'

type FeaturedEmployerAdCardProps = {
  ad: EmployerResultAd
  employer: Employer
  /** Kept for call-site compatibility; ads use the vertical side label. */
  bannerPlacement?: AdBannerPlacement
  active?: boolean
  selected?: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

function categoryLabel(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export const FeaturedEmployerAdCard = forwardRef<HTMLElement, FeaturedEmployerAdCardProps>(
  function FeaturedEmployerAdCard(
    { ad, employer, active, selected, onSelect, onHover },
    ref,
  ) {
    const [saved, setSaved] = useState(false)
    const href = employerPath(employer.id)
    const projectLabel = employer.openProjects === 1 ? 'project' : 'projects'
    const logoSrc = ad.companyLogo || employer.logoUrl

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

    return (
      <div className="relative h-full w-full">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-5 top-1/2 z-20 select-none font-display text-[15px] font-bold uppercase tracking-[0.22em] text-sky-500 drop-shadow-[0_1px_1px_rgb(15_31_26_/_0.18)] sm:-left-6 sm:text-[17px]"
          style={{
            writingMode: 'vertical-rl',
            transform: 'translateY(-50%) rotate(180deg)',
          }}
        >
          Advertiser
        </span>

        <article
          ref={ref}
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label={`Sponsored listing: show ${employer.name} on the map`}
          onClick={() => selectOnMap()}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => onHover(employer.id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            PROFILE_RESULT_CARD_FRAME,
            'group cursor-pointer text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
            selected
              ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
              : active
                ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
                : 'border-line/80 hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]',
          )}
        >
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-mist">
            {logoSrc ? (
              <span className="flex h-full w-full items-center justify-center overflow-hidden p-0.5 sm:p-1">
                <img
                  src={logoSrc}
                  alt={employer.name}
                  className="h-full w-full scale-[1.28] object-contain object-center transition duration-500 group-hover:scale-[1.34]"
                  loading="lazy"
                />
              </span>
            ) : (
              <span
                className="flex h-full w-full items-center justify-center text-4xl font-bold tracking-wide text-white sm:text-5xl"
                style={{ backgroundColor: employer.logoColor }}
                aria-hidden
              >
                {employer.logoInitials}
              </span>
            )}

            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold leading-none text-ink shadow-sm">
              Ad
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setSaved((value) => !value)
              }}
              className="absolute right-2.5 top-2.5 z-10 inline-flex items-center justify-center text-ink/70 transition hover:scale-110 hover:text-rose-500"
              aria-label={
                saved
                  ? `Remove ${employer.name} from favorites`
                  : `Save ${employer.name} to favorites`
              }
              aria-pressed={saved}
            >
              <Heart
                className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
                strokeWidth={2.2}
              />
            </button>
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
      </div>
    )
  },
)
