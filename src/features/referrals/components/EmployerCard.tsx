import { useState } from 'react'
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

type EmployerCardProps = {
  employer: Employer
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
        alt={`${employer.name} logo`}
        className="h-full w-full object-contain p-1.5"
        loading="lazy"
      />
    )
  }

  return (
    <span
      className="flex h-full w-full items-center justify-center text-base font-bold tracking-wide text-white"
      style={{ backgroundColor: employer.logoColor }}
      aria-hidden
    >
      {employer.logoInitials}
    </span>
  )
}

export function EmployerCard({ employer }: EmployerCardProps) {
  const [saved, setSaved] = useState(false)
  const projectLabel = employer.openProjects === 1 ? 'project' : 'projects'
  const href = employerPath(employer.id)

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-freeio-border-soft bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
      <div className="flex items-start gap-3">
        <Link
          to={href}
          className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl"
          style={{ backgroundColor: employer.logoUrl ? '#f3f4f6' : employer.logoColor }}
        >
          <CompanyLogo employer={employer} />
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 pr-8">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECE8] px-2.5 py-1 text-[11px] font-semibold text-[#C45C3E]">
            <Building2 className="h-3 w-3" aria-hidden />
            {categoryLabel(employer.category)}
          </span>
          {employer.openProjects > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F6EE] px-2.5 py-1 text-[11px] font-semibold text-[#1B7A4A]">
              <Plus className="h-3 w-3" strokeWidth={2.5} aria-hidden />
              Actively hiring
            </span>
          ) : null}
        </div>

        <button
          type="button"
          aria-label={saved ? 'Remove from saved' : 'Save employer'}
          onClick={() => setSaved((value) => !value)}
          className="absolute right-4 top-4 z-10 text-freeio-muted transition hover:text-freeio"
        >
          <Heart className={cn('h-5 w-5', saved && 'fill-freeio text-freeio')} />
        </button>
      </div>

      <Link to={href} className="mt-4 block">
        <h3 className="truncate text-lg font-bold text-freeio-ink transition hover:text-freeio">
          {employer.name}
        </h3>
      </Link>

      <p className="mt-1 line-clamp-1 text-sm text-freeio-muted">{employer.tagline}</p>

      <p className="mt-2.5 inline-flex items-center gap-1.5 text-sm text-freeio-muted">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" />
        {employer.city}, {employer.state}
      </p>

      <p className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-freeio-ink">
        <Star className="h-3.5 w-3.5 fill-freeio-star text-freeio-star" />
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

      <Link
        to={href}
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        View company
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  )
}
