import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, CalendarDays, Heart, MapPin, Rocket, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Employer, EmployerProject } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

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
        'rounded-2xl border border-freeio-border-soft bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]',
        variant === 'list' ? 'p-5 sm:p-6' : 'p-5',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-freeio-border-soft bg-freeio-surface">
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
              <h3 className="text-xl font-bold text-freeio-ink transition hover:text-freeio">
                {project.title}
              </h3>
              <Link
                to={employerPath(employer.id)}
                className="mt-1.5 inline-block text-[15px] font-medium transition hover:underline text-freeio"
              >
                {employer.name}
              </Link>
            </div>
            <button
              type="button"
              aria-label={saved ? 'Remove from saved' : 'Save project'}
              onClick={() => setSaved((value) => !value)}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-freeio-border-soft text-freeio-muted transition hover:border-freeio hover:bg-freeio-soft hover:text-freeio"
            >
              <Heart className={cn('h-4 w-4', saved && 'fill-freeio text-freeio')} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-freeio-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-freeio" />
              {project.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-freeio" />
              Posted {project.postedAgo}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Rocket className="h-4 w-4 text-freeio" />
              {project.proposals} Proposals
            </span>
          </div>

          {variant === 'list' ? (
            <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-freeio-muted">
              {project.description}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-freeio-ink bg-freeio-tag"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 ? (
              <span
                className="rounded-md px-3 py-1.5 text-xs font-medium text-freeio-ink bg-freeio-tag"
              >
                +{project.skills.length - 3}
              </span>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-freeio-border-soft pt-4">
            <p className="inline-flex items-center gap-2 text-base font-bold text-freeio-ink">
              <Briefcase className="h-4 w-4 text-freeio-subtle" />
              {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}{' '}
              <span className="text-sm font-medium text-freeio-muted">{project.budgetType}</span>
            </p>
            <Button
              size="md"
              className="rounded-lg"
              leftIcon={<Send className="h-4 w-4" />}
            >
              Send Proposal
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
