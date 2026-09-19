import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftToLine, Search, Users } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import {
  MarketplaceListHeading,
  MarketplacePeachBanner,
} from '@/features/referrals/components/marketplaceShell'
import type { Employer } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

type EmployerEmployeesViewProps = {
  employer: Employer
}

export function EmployerEmployeesView({ employer }: EmployerEmployeesViewProps) {
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const filteredTeam = employer.team.filter(
    (member) =>
      member.name.toLowerCase().includes(normalizedQuery) ||
      member.role.toLowerCase().includes(normalizedQuery),
  )

  return (
    <div className="bg-white pb-16">
      <MarketplacePeachBanner size="medium">
        <MarketplaceListHeading
          title="Employees"
          description={`Meet the team at ${employer.name}. Browse names and roles across the company.`}
          titleClassName="lg:text-4xl"
          descriptionClassName="mt-2 whitespace-nowrap text-sm sm:text-base"
        />
        <div className="relative mt-4 w-full">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle sm:h-5 sm:w-5"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employees by name or role..."
            aria-label="Search employees"
            className="h-10 w-full rounded-xl border border-freeio-peach-border bg-white pl-11 pr-4 text-sm text-freeio-ink outline-none transition placeholder:text-freeio-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 sm:h-11 sm:text-[15px]"
          />
        </div>
      </MarketplacePeachBanner>

      <Section className="py-6 sm:py-8" containerClassName={MARKETPLACE_PAGE_PAD}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-freeio-muted">
            Showing{' '}
            <span className="font-semibold text-freeio-ink">{filteredTeam.length}</span> employees
            <span className="text-freeio-subtle"> · range {employer.employees}</span>
          </p>
          <Link
            to={employerPath(employer.id)}
            className="inline-flex items-center gap-2 text-sm font-medium text-freeio-muted transition hover:text-freeio-ink"
          >
            <ArrowLeftToLine className="h-4 w-4" />
            Back to company
          </Link>
        </div>

        {filteredTeam.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-freeio-border bg-freeio-surface px-6 py-16 text-center">
            <Users className="mx-auto h-10 w-10 text-freeio-faint" strokeWidth={1.4} />
            <p className="mt-3 text-[15px] text-freeio-muted">
              {query ? 'No employees match your search.' : 'No employees listed yet.'}
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTeam.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-4 rounded-2xl border border-freeio-border-soft bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-freeio-ring"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: employer.logoColor }}
                    aria-hidden
                  >
                    {member.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-freeio-ink">{member.name}</p>
                  <p className="mt-0.5 truncate text-sm text-freeio-muted">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  )
}
