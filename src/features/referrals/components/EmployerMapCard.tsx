import { forwardRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Heart,
  MapPin,
  Plus,
  Star,
  Users,
} from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import type { Employer } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'
import {
  AdCornerRibbon,
  AdWatermark,
  isCornerRibbonPlacement,
  type AdBannerPlacement,
} from '@/features/referrals/components/FeaturedAgentAdCard'

type EmployerMapCardProps = {
  employer: Employer
  active?: boolean
  selected?: boolean
  compact?: boolean
  advertisement?: boolean
  bannerPlacement?: AdBannerPlacement
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

function categoryLabel(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function CompanyLogo({ employer }: { employer: Employer }) {
  if (employer.logoUrl) {
    return (
      <img
        src={employer.logoUrl}
        alt=""
        className="h-full w-full object-contain p-1.5"
        loading="lazy"
      />
    )
  }

  return (
    <span
      className="flex h-full w-full items-center justify-center text-sm font-bold tracking-wide text-white sm:text-base"
      style={{ backgroundColor: employer.logoColor }}
      aria-hidden
    >
      {employer.logoInitials}
    </span>
  )
}

function HiringBadge({ openProjects }: { openProjects: number }) {
  if (openProjects > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F6EE] px-2.5 py-1 text-[11px] font-semibold text-[#1B7A4A]">
        <Plus className="h-3 w-3" strokeWidth={2.5} aria-hidden />
        Actively hiring
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full bg-freeio-surface px-2.5 py-1 text-[11px] font-semibold text-freeio-muted">
      No open projects
    </span>
  )
}

export const EmployerMapCard = forwardRef<HTMLElement, EmployerMapCardProps>(
  function EmployerMapCard(
      { employer, active, selected, compact = false, advertisement = false, bannerPlacement = 'top-left', onSelect, onHover },
    ref,
  ) {
    const [saved, setSaved] = useState(false)
    const href = employerPath(employer.id)
    const projectLabel = employer.openProjects === 1 ? 'project' : 'projects'
    const adBanner =
      advertisement ? (
        <>
          {isCornerRibbonPlacement(bannerPlacement) ? (
            <AdCornerRibbon placement={bannerPlacement} compact={compact} />
          ) : null}
          {bannerPlacement === 'watermark' ? <AdWatermark compact={compact} /> : null}
        </>
      ) : null

    function openEmployer(event?: { stopPropagation?: () => void }) {
      event?.stopPropagation?.()
      onSelect(employer.id)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openEmployer()
      }
    }

    if (compact) {
      return (
        <article
          ref={ref}
          role="link"
          tabIndex={0}
          aria-label={
            advertisement
              ? `Sponsored office: ${employer.name}, ${formatRating(employer.rating)} rating, ${employer.city}`
              : `${employer.name}, ${formatRating(employer.rating)} rating, ${employer.city}`
          }
          onClick={() => openEmployer()}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => onHover(employer.id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            'group relative flex h-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freeio/40',
            advertisement ? 'bg-[#eef7fd]' : 'bg-white',
            selected
              ? 'border-freeio shadow-[0_14px_40px_rgba(91,187,123,0.2)] ring-2 ring-freeio/25'
              : active
                ? 'border-freeio/50 shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
                : 'border-freeio-border-soft shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:border-freeio/40 hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)]',
          )}
        >
          {adBanner}
          <div
            className="flex h-14 w-14 shrink-0 overflow-hidden rounded-2xl"
            style={{ backgroundColor: employer.logoUrl ? '#f3f4f6' : employer.logoColor }}
          >
            <CompanyLogo employer={employer} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECE8] px-2.5 py-1 text-[11px] font-semibold text-[#C45C3E]">
                <Building2 className="h-3 w-3" aria-hidden />
                {categoryLabel(employer.category)}
              </span>
              <HiringBadge openProjects={employer.openProjects} />
            </div>
            <p className="mt-1.5 truncate text-base font-bold text-freeio-ink">{employer.name}</p>
            <p className="mt-0.5 truncate text-sm text-freeio-muted">{employer.tagline}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-freeio-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-freeio-subtle" aria-hidden />
                {employer.city}, {employer.state}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-freeio-ink">
                <Star className="h-3.5 w-3.5 fill-freeio-star text-freeio-star" aria-hidden />
                {formatRating(employer.rating)}
                <span className="font-normal text-freeio-subtle">({employer.reviewCount})</span>
              </span>
            </div>
          </div>
          <span
            className={cn(
              'hidden h-10 shrink-0 translate-y-8 items-center gap-1.5 rounded-lg border border-[#2563eb] px-4 text-sm font-semibold text-[#2563eb] sm:inline-flex',
            )}
          >
            View company
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </article>
      )
    }

    return (
      <article
        ref={ref}
        role="link"
        tabIndex={0}
        aria-label={
          advertisement
            ? `Sponsored office: ${employer.name}, ${formatRating(employer.rating)} rating, ${employer.city}`
            : `${employer.name}, ${formatRating(employer.rating)} rating, ${employer.city}`
        }
        onClick={() => openEmployer()}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => onHover(employer.id)}
        onMouseLeave={() => onHover(null)}
        className={cn(
          'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border p-5 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freeio/40',
          advertisement ? 'border-[#b7d8f0] bg-[#eef7fd]' : 'bg-white',
          selected
            ? 'border-freeio shadow-[0_14px_40px_rgba(91,187,123,0.2)] ring-2 ring-freeio/25'
            : active
              ? 'border-freeio/50 shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
              : 'border-freeio-border-soft shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-freeio/40 hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)]',
        )}
      >
        {adBanner}
        <div className="flex items-start gap-3">
          <Link
            to={href}
            onClick={(event) => event.stopPropagation()}
            className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl sm:h-14 sm:w-14"
            style={{ backgroundColor: employer.logoUrl ? '#f3f4f6' : employer.logoColor }}
          >
            <CompanyLogo employer={employer} />
          </Link>

          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 pr-8">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECE8] px-2.5 py-1 text-[11px] font-semibold text-[#C45C3E]">
              <Building2 className="h-3 w-3" aria-hidden />
              {categoryLabel(employer.category)}
            </span>
            <HiringBadge openProjects={employer.openProjects} />
          </div>

          <button
            type="button"
            aria-label={saved ? 'Remove from saved' : 'Save employer'}
            onClick={(event) => {
              event.stopPropagation()
              setSaved((value) => !value)
            }}
            className="absolute right-4 top-4 z-10 text-freeio-muted transition hover:text-freeio"
          >
            <Heart className={cn('h-5 w-5', saved && 'fill-freeio text-freeio')} />
          </button>
        </div>

        <Link
          to={href}
          onClick={(event) => event.stopPropagation()}
          className="mt-4 block truncate text-lg font-bold leading-snug text-freeio-ink transition group-hover:text-freeio"
        >
          {employer.name}
        </Link>

        <p className="mt-1 line-clamp-1 text-sm text-freeio-muted">{employer.tagline}</p>

        <p className="mt-2.5 inline-flex items-center gap-1.5 text-sm text-freeio-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" aria-hidden />
          {employer.city}, {employer.state}
        </p>

        <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-freeio-ink">
          <Star className="h-3.5 w-3.5 fill-freeio-star text-freeio-star" aria-hidden />
          {formatRating(employer.rating)}
          <span className="font-normal text-freeio-subtle">({employer.reviewCount})</span>
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-[#F3F6F8] px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-freeio-subtle">
              <Briefcase className="h-3.5 w-3.5" aria-hidden />
              Open
            </p>
            <p className="mt-1 text-sm font-bold tabular-nums text-freeio-ink">
              {employer.openProjects} {projectLabel}
            </p>
          </div>
          <div className="rounded-xl bg-[#F3F6F8] px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-freeio-subtle">
              <Users className="h-3.5 w-3.5" aria-hidden />
              Team
            </p>
            <p className="mt-1 text-sm font-bold text-freeio-ink">{employer.employees}</p>
          </div>
        </div>

        <div className={cn('mt-auto pt-4', advertisement && 'pr-16 sm:pr-20')}>
          <Link
            to={href}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#2563eb] px-4 text-sm font-semibold text-[#2563eb] transition hover:bg-[#eff6ff]"
          >
            View company
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </article>
    )
  },
)
