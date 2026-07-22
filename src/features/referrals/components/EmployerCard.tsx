import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Star } from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import type { Employer } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'

type EmployerCardProps = {
  employer: Employer
}

function CompanyLogo({ employer }: { employer: Employer }) {
  if (employer.logoUrl) {
    return (
      <img
        src={employer.logoUrl}
        alt={`${employer.name} logo`}
        className="h-12 w-12 object-contain"
        loading="lazy"
      />
    )
  }

  return (
    <span
      className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold tracking-wide text-white shadow-sm"
      style={{ backgroundColor: employer.logoColor }}
      aria-hidden
    >
      {employer.logoInitials}
    </span>
  )
}

export function EmployerCard({ employer }: EmployerCardProps) {
  const [saved, setSaved] = useState(false)
  const projectLabel =
    employer.openProjects === 1 ? 'Open Project' : 'Open Projects'
  const href = employerPath(employer.id)

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-[#eee] bg-white p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        aria-label={saved ? 'Remove from saved' : 'Save employer'}
        onClick={() => setSaved((value) => !value)}
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#eee] bg-white text-[#6b7280] transition hover:text-[#5BBB7B]"
      >
        <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
      </button>

      <Link to={href} className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#f0f0f0] bg-[#fafafa] transition hover:border-[#5BBB7B]/40">
        <CompanyLogo employer={employer} />
      </Link>

      <Link to={href} className="mt-5 block">
        <h3 className="truncate text-lg font-bold text-[#222] transition hover:text-[#5BBB7B]">
          {employer.name}
        </h3>
      </Link>

      <div className="mt-2.5 inline-flex items-center justify-center gap-1 text-sm">
        <Star className="h-3.5 w-3.5 fill-[#f5b100] text-[#f5b100]" />
        <span className="font-medium text-[#222]">{formatRating(employer.rating)}</span>
        <span className="text-[#9ca3af]">
          {employer.reviewCount}{' '}
          {employer.reviewCount === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>

      <p className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm text-[#6b7280]">
        <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: FREEIO_GREEN }} />
        {employer.city}
      </p>

      <p className="mt-3 text-sm font-medium text-[#222]">
        {projectLabel} - {employer.openProjects}
      </p>
    </article>
  )
}
