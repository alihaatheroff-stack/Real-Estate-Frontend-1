import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Flag,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/layout/Section'
import { ProjectListCard } from '@/features/referrals/components/ProjectListCard'
import { JobCard } from '@/features/referrals/components/JobCard'
import { ReviewsList } from '@/features/referrals/components/ReviewsList'
import type { Employer } from '@/entities/employer/types'
import { formatRating } from '@/shared/lib/format'
import { PATHS, employerProjectsPath, employerJobsPath, employerEmployeesPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'


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
        'relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
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
  to,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  to?: string
}) {
  const valueClass =
    'min-w-0 flex-1 text-right text-[15px] font-medium leading-snug wrap-anywhere text-freeio-ink'

  return (
    <li className="flex items-start gap-3 border-b border-freeio-border-soft py-3.5 last:border-b-0">
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-freeio-subtle" strokeWidth={1.6} />
      <span className="shrink-0 pt-px text-[15px] text-freeio-muted">{label}</span>
      {to ? (
        <Link to={to} className={cn(valueClass, 'underline underline-offset-2 hover:text-freeio')}>
          {value}
        </Link>
      ) : href ? (
        <a href={href} className={cn(valueClass, 'hover:underline')}>
          {value}
        </a>
      ) : (
        <span className={valueClass}>{value}</span>
      )}
    </li>
  )
}

export function EmployerDetailView({ employer }: { employer: Employer }) {
  const [saved, setSaved] = useState(false)
  const coverSrc = employer.coverImage

  return (
    <div className="bg-freeio-surface pb-16">
      <Section className="relative pb-0 pt-5 sm:pb-0 sm:pt-6" containerClassName={pagePad}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-freeio-muted">
            <Link to={PATHS.home} className="hover:text-freeio-ink">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={PATHS.employerResults} className="hover:text-freeio-ink">
              Employers
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-freeio-ink">{employer.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-freeio-ink transition hover:bg-black/5"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button
              type="button"
              onClick={() => setSaved((value) => !value)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-freeio-ink transition hover:bg-black/5"
            >
              <Heart className={cn('h-4 w-4', saved && 'fill-freeio text-freeio')} />
              Save
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-accent transition hover:bg-black/5"
              aria-label="Report employer"
            >
              <Flag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Section>

      {/* Cover banner — only the logo overlaps; name/actions stay on white */}
      <div className="relative">
        <div
          className={cn(
            'relative h-44 overflow-hidden sm:h-56 md:h-64 lg:h-72',
            !coverSrc && 'border-y border-freeio-peach-line bg-freeio-peach',
          )}
        >
          {coverSrc ? (
            <img
              src={coverSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 55c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 25c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3C/svg%3E")`,
              }}
            />
          )}
        </div>

        <Section className="relative py-0 sm:py-0" containerClassName={pagePad}>
          <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-start sm:gap-6 sm:pb-8">
            <div className="-mt-12 shrink-0 sm:-mt-14 lg:-mt-16">
              <CompanyLogoMark employer={employer} />
            </div>

            <div className="min-w-0 flex-1 pt-2 sm:pt-3">
              <h1 className="text-3xl font-bold tracking-tight text-freeio-ink sm:text-[2.15rem]">
                {employer.name}
              </h1>
              <p className="mt-1 text-base text-freeio-muted sm:text-lg">{employer.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-freeio-gray sm:mt-4">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-freeio-star text-freeio-star" />
                  <span className="font-medium text-freeio-ink">
                    {formatRating(employer.rating)}
                  </span>
                  <span className="text-freeio-muted">
                    ({employer.reviewCount}{' '}
                    {employer.reviewCount === 1 ? 'Review' : 'Reviews'})
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-freeio" />
                  {employer.city}
                </span>
                <a
                  href={`mailto:${employer.email}`}
                  className="inline-flex items-center gap-1.5 transition hover:text-freeio-ink"
                >
                  <Mail className="h-4 w-4 text-freeio" />
                  {employer.email}
                </a>
              </div>
            </div>

            <div className="hidden w-full shrink-0 pt-2 lg:block lg:w-[340px] lg:pt-3">
              <Button
                size="lg"
                className="w-full rounded-lg"
                leftIcon={<MessageCircle className="h-4 w-4" />}
              >
                Message
              </Button>
            </div>
          </div>
        </Section>
      </div>

      <Section className="relative py-0 sm:py-0" containerClassName={pagePad}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0 space-y-12 pt-2 lg:pt-4">
            <section>
              <h2 className="text-2xl font-bold text-freeio-ink">About Company</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-freeio-muted">
                <p>{employer.about}</p>
                {employer.aboutExtra ? <p>{employer.aboutExtra}</p> : null}
              </div>

              {employer.whoWeAre ? (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-freeio-ink">Who are we?</h3>
                  <p className="mt-3 text-[15px] leading-7 text-freeio-muted">
                    {employer.whoWeAre}
                  </p>
                </div>
              ) : null}

              {employer.whatWeDo ? (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-freeio-ink">What do we do?</h3>
                  <p className="mt-3 text-[15px] leading-7 text-freeio-muted">
                    {employer.whatWeDo}
                  </p>
                </div>
              ) : null}
            </section>

            <section className="border-t border-freeio-border-soft pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-freeio-ink">Projects</h2>
                <Link
                  to={employerProjectsPath(employer.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline text-freeio"
                >
                  Browse Full List
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {employer.projects.length === 0 ? (
                <p className="rounded-xl border border-freeio-border-soft bg-white px-6 py-8 text-center text-freeio-muted">
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

            <section className="border-t border-freeio-border-soft pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-freeio-ink">Open Position</h2>
                <Link
                  to={employerJobsPath(employer.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline text-freeio"
                >
                  Browse Full List
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {employer.positions.length === 0 ? (
                <p className="rounded-xl border border-freeio-border-soft bg-white px-6 py-8 text-center text-freeio-muted">
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

            <section className="border-t border-freeio-border-soft pt-10">
              <h2 className="mb-5 text-2xl font-bold text-freeio-ink">
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

          <aside className="space-y-5 lg:-mt-[3.25rem] lg:sticky lg:top-24 lg:self-start">
            <Button
              size="lg"
              className="w-full rounded-lg lg:hidden"
              leftIcon={<MessageCircle className="h-4 w-4" />}
            >
              Message
            </Button>

            <div className="rounded-2xl border border-freeio-border-soft bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-bold text-freeio-ink">About Me</h2>
              <ul className="mt-2">
                <SidebarRow
                  icon={Briefcase}
                  label="Categories"
                  value={employer.categories.join(', ')}
                />
                <SidebarRow
                  icon={Users}
                  label="Employees"
                  value={employer.employees}
                  to={employerEmployeesPath(employer.id)}
                />
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

              <Button
                variant="outline"
                size="lg"
                className="mt-5 w-full rounded-lg border-2 border-brand text-brand hover:border-brand hover:bg-brand hover:text-white"
                leftIcon={<Mail className="h-4 w-4" />}
              >
                Contact Me
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  )
}
