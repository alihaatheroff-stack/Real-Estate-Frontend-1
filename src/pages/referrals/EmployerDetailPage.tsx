import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Flag,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ProjectListCard, JobCard, ReviewsList, getEmployerById } from '@/features/referrals'
import type { Employer } from '@/entities/employer/types'
import { formatRating } from '@/shared/lib/format'
import { PATHS, employerProjectsPath, employerJobsPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_PEACH = '#FFF1ED'

const pagePad = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

function CompanyLogoMark({
  employer,
  size = 'lg',
}: {
  employer: Employer
  size?: 'md' | 'lg'
}) {
  const box = size === 'lg' ? 'h-[7.5rem] w-[7.5rem] sm:h-36 sm:w-36' : 'h-16 w-16'
  const mark = size === 'lg' ? 'h-20 w-20 text-2xl sm:h-24 sm:w-24 sm:text-3xl' : 'h-11 w-11 text-sm'
  const img = size === 'lg' ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-10 w-10'

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm ring-4 ring-white',
        box,
      )}
    >
      {employer.logoUrl ? (
        <img
          src={employer.logoUrl}
          alt={`${employer.name} logo`}
          className={cn('object-contain', img)}
        />
      ) : (
        <span
          className={cn(
            'flex items-center justify-center rounded-xl font-bold tracking-wide text-white',
            mark,
          )}
          style={{ backgroundColor: employer.logoColor }}
          aria-hidden
        >
          {employer.logoInitials}
        </span>
      )}
    </div>
  )
}

function SidebarRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}) {
  return (
    <li className="flex items-start gap-3 border-b border-[#eee] py-3.5 last:border-b-0">
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#9ca3af]" strokeWidth={1.6} />
      <span className="text-[15px] text-[#6b7280]">{label}</span>
      {href ? (
        <a
          href={href}
          className="ml-auto max-w-[55%] truncate text-right text-[15px] font-medium text-[#222] hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="ml-auto max-w-[55%] text-right text-[15px] font-medium text-[#222]">
          {value}
        </span>
      )}
    </li>
  )
}

export function EmployerDetailPage() {
  const { id = '' } = useParams()
  const employer = getEmployerById(id)
  const [saved, setSaved] = useState(false)

  if (!employer) {
    return (
      <Section containerClassName={pagePad}>
        <h1 className="font-display text-2xl font-bold">Employer not found</h1>
        <Link
          to={PATHS.employerResults}
          className="mt-4 inline-block text-brand hover:underline"
        >
          Back to employers
        </Link>
      </Section>
    )
  }

  return (
    <div className="bg-[#fafafa] pb-16">
      <div
        className="relative overflow-hidden border-b border-[#f0e4df]"
        style={{ backgroundColor: FREEIO_PEACH }}
      >
        {employer.coverImage ? (
          <div className="absolute inset-0">
            <img
              src={employer.coverImage}
              alt=""
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-[#FFF1ED]/75" />
          </div>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 55c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 25c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        <Section className="relative pb-0 pt-6 sm:pb-0 sm:pt-8" containerClassName={pagePad}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[#6b7280]">
              <Link to={PATHS.referrals} className="hover:text-[#222]">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={PATHS.employerResults} className="hover:text-[#222]">
                Employers
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#222]">{employer.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#222] transition hover:bg-white/60"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#222] transition hover:bg-white/60"
              >
                <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
                Save
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#d4a017] transition hover:bg-white/60"
                aria-label="Report employer"
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-6 sm:flex-row sm:items-center sm:gap-6 lg:pb-8 lg:pr-[23.5rem]">
            <CompanyLogoMark employer={employer} />

            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-[2.15rem]">
                {employer.name}
              </h1>
              <p className="mt-1 text-base text-[#6b7280] sm:text-lg">{employer.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#4b5563]">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-[#f5b100] text-[#f5b100]" />
                  <span className="font-medium text-[#222]">
                    {formatRating(employer.rating)}
                  </span>
                  <span className="text-[#6b7280]">
                    ({employer.reviewCount}{' '}
                    {employer.reviewCount === 1 ? 'Review' : 'Reviews'})
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
                  {employer.city}
                </span>
                <a
                  href={`mailto:${employer.email}`}
                  className="inline-flex items-center gap-1.5 transition hover:text-[#222]"
                >
                  <Mail className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
                  {employer.email}
                </a>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section className="relative py-0 sm:py-0" containerClassName={pagePad}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0 space-y-12 pt-8 lg:pt-10">
            <section>
              <h2 className="text-2xl font-bold text-[#222]">About Company</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#6b7280]">
                <p>{employer.about}</p>
                {employer.aboutExtra ? <p>{employer.aboutExtra}</p> : null}
              </div>

              {employer.whoWeAre ? (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-[#222]">Who are we?</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#6b7280]">
                    {employer.whoWeAre}
                  </p>
                </div>
              ) : null}

              {employer.whatWeDo ? (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-[#222]">What do we do?</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#6b7280]">
                    {employer.whatWeDo}
                  </p>
                </div>
              ) : null}
            </section>

            <section className="border-t border-[#eee] pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-[#222]">Projects</h2>
                <Link
                  to={employerProjectsPath(employer.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  style={{ color: FREEIO_GREEN }}
                >
                  Browse Full List
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {employer.projects.length === 0 ? (
                <p className="rounded-xl border border-[#eee] bg-white px-6 py-8 text-center text-[#6b7280]">
                  No open projects right now.
                </p>
              ) : (
                <div className="space-y-5">
                  {employer.projects.slice(0, 1).map((project) => (
                    <ProjectListCard
                      key={project.id}
                      project={project}
                      employer={employer}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="border-t border-[#eee] pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-[#222]">Open Position</h2>
                <Link
                  to={employerJobsPath(employer.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  style={{ color: FREEIO_GREEN }}
                >
                  Browse Full List
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {employer.positions.length === 0 ? (
                <p className="rounded-xl border border-[#eee] bg-white px-6 py-8 text-center text-[#6b7280]">
                  No open positions right now.
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {employer.positions.slice(0, 2).map((position) => (
                    <JobCard
                      key={position.id}
                      position={position}
                      employer={employer}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="border-t border-[#eee] pt-10">
              <h2 className="mb-5 text-2xl font-bold text-[#222]">
                {employer.reviewCount}{' '}
                {employer.reviewCount === 1 ? 'Review' : 'Reviews'}
              </h2>
              <ReviewsList
                reviews={employer.reviews}
                averageRating={employer.rating}
                reviewCount={employer.reviewCount}
              />
            </section>
          </div>

          <aside className="space-y-5 lg:-mt-40 lg:sticky lg:top-24 lg:self-start">
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-95"
              style={{ backgroundColor: FREEIO_GREEN }}
            >
              Message
            </button>

            <div className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-bold text-[#222]">About Me</h2>
              <ul className="mt-2">
                <SidebarRow
                  icon={Briefcase}
                  label="Categories"
                  value={employer.categories.join(', ')}
                />
                <SidebarRow icon={Users} label="Employees" value={employer.employees} />
                <SidebarRow
                  icon={CalendarDays}
                  label="Founded Date"
                  value={String(employer.foundedYear)}
                />
                <SidebarRow
                  icon={Mail}
                  label="Email"
                  value={employer.email}
                  href={`mailto:${employer.email}`}
                />
                <SidebarRow
                  icon={Phone}
                  label="Phone Number"
                  value={employer.phone}
                  href={`tel:${employer.phone.replace(/\D/g, '')}`}
                />
                <SidebarRow
                  icon={MapPin}
                  label="Location"
                  value={`${employer.city}, ${employer.state}`}
                />
              </ul>

              <button
                type="button"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-95"
                style={{ backgroundColor: FREEIO_GREEN }}
              >
                Contact Me
              </button>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  )
}
