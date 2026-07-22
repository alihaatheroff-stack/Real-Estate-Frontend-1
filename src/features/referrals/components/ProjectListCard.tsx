import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, CalendarDays, Heart, MapPin, Rocket } from 'lucide-react'
import type { Employer, EmployerProject } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_TAG = '#FFEDE8'

type ProjectListCardProps = {
  project: EmployerProject
  employer: Employer
  variant?: 'list' | 'compact'
}

export function ProjectListCard({
  project,
  employer,
  variant = 'list',
}: ProjectListCardProps) {
  const [saved, setSaved] = useState(false)

  return (
    <article
      className={cn(
        'rounded-2xl border border-[#eee] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]',
        variant === 'list' ? 'p-5 sm:p-6' : 'p-5',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#eee] bg-[#fafafa]">
          {project.image ? (
            <img src={project.image} alt="" className="h-full w-full object-cover" />
          ) : employer.logoUrl ? (
            <img
              src={employer.logoUrl}
              alt=""
              className="h-10 w-10 object-contain"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-base font-bold text-white"
              style={{ backgroundColor: employer.logoColor }}
            >
              {employer.logoInitials}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-[#222] transition hover:text-[#5BBB7B]">
                {project.title}
              </h3>
              <Link
                to={employerPath(employer.id)}
                className="mt-1.5 inline-block text-[15px] font-medium transition hover:underline"
                style={{ color: FREEIO_GREEN }}
              >
                {employer.name}
              </Link>
            </div>
            <button
              type="button"
              aria-label={saved ? 'Remove from saved' : 'Save project'}
              onClick={() => setSaved((value) => !value)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#eee] text-[#6b7280] transition hover:text-[#5BBB7B]"
            >
              <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-[#6b7280]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
              {project.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
              Posted {project.postedAgo}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Rocket className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
              {project.proposals} Proposals
            </span>
          </div>

          {variant === 'list' ? (
            <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-[#6b7280]">
              {project.description}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-[#222]"
                style={{ backgroundColor: FREEIO_TAG }}
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 ? (
              <span
                className="rounded-md px-3 py-1.5 text-xs font-medium text-[#222]"
                style={{ backgroundColor: FREEIO_TAG }}
              >
                +{project.skills.length - 3}
              </span>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#eee] pt-4">
            <p className="inline-flex items-center gap-2 text-base font-bold text-[#222]">
              <Briefcase className="h-4 w-4 text-[#9ca3af]" />
              {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}{' '}
              <span className="text-sm font-medium text-[#6b7280]">{project.budgetType}</span>
            </p>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition hover:brightness-95"
              style={{ backgroundColor: FREEIO_GREEN }}
            >
              Send Proposal
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
