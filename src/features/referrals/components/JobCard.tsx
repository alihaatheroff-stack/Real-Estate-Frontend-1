import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin } from 'lucide-react'
import type { Employer, EmployerPosition } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_TAG = '#FFEDE8'

const PERIOD_LABEL: Record<EmployerPosition['salaryPeriod'], string> = {
  month: 'month',
  week: 'week',
  day: 'day',
  hour: 'hour',
  year: 'year',
}

type JobCardProps = {
  position: EmployerPosition
  employer: Employer
}

export function JobCard({ position, employer }: JobCardProps) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        aria-label={saved ? 'Remove from saved' : 'Save job'}
        onClick={() => setSaved((value) => !value)}
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#eee] bg-white text-[#6b7280] transition hover:text-[#5BBB7B]"
      >
        <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
      </button>

      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-[#eee] bg-[#fafafa]">
        {position.image ? (
          <img src={position.image} alt="" className="h-full w-full object-cover" />
        ) : employer.logoUrl ? (
          <img src={employer.logoUrl} alt="" className="h-10 w-10 object-contain" />
        ) : (
          <span
            className="flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: employer.logoColor }}
          >
            {employer.logoInitials}
          </span>
        )}
      </div>

      <Link
        to={employerPath(employer.id)}
        className="mt-4 text-sm font-medium transition hover:underline"
        style={{ color: FREEIO_GREEN }}
      >
        {employer.name}
      </Link>

      <h3 className="mt-1 pr-8 text-lg font-bold text-[#222]">{position.title}</h3>

      <p className="mt-3 text-base font-bold text-[#222]">
        {formatCurrency(position.salaryMin)} - {formatCurrency(position.salaryMax)}
        <span className="text-sm font-medium text-[#6b7280]">
          {' '}
          / {PERIOD_LABEL[position.salaryPeriod]}
        </span>
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-4 text-xs text-[#6b7280]">
        <span
          className="rounded-md px-2.5 py-1 font-medium text-[#222]"
          style={{ backgroundColor: FREEIO_TAG }}
        >
          {position.category}
        </span>
        <span className="rounded-md border border-[#eee] px-2.5 py-1">
          {position.employmentType}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-[#eee] px-2.5 py-1">
          <MapPin className="h-3 w-3" style={{ color: FREEIO_GREEN }} />
          {position.city}
        </span>
      </div>
    </article>
  )
}
