import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { JobCard } from '@/features/referrals/components/JobCard'
import { JobFiltersSidebar } from '@/features/referrals/components/JobFiltersSidebar'
import {
  MarketplaceBreadcrumbs,
  MarketplaceEmptyState,
  MarketplaceFilterDrawer,
  MarketplaceListHeading,
  MarketplaceListSortMenu,
  MarketplacePeachBanner,
  MarketplaceResultsToolbar,
  MarketplaceSearchButton,
  MarketplaceSearchPanel,
  MarketplaceShowingCount,
} from '@/features/referrals/components/marketplaceShell'
import {
  DEFAULT_JOB_FILTERS,
  JOB_SORT_OPTIONS,
  useEmployerJobs,
} from '@/features/referrals/hooks/useEmployerJobs'
import { useDraftAppliedFilters } from '@/features/referrals/hooks/useDraftAppliedFilters'
import type { ListSortKey } from '@/features/referrals/model/sort'
import type { Employer } from '@/entities/employer/types'
import { getEmployerLocationOptions } from '@/features/referrals/api/repository'
import { PATHS, employerPath } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

type EmployerJobsViewProps = {
  employer: Employer
}

export function EmployerJobsView({ employer }: EmployerJobsViewProps) {
  const {
    query,
    setQuery,
    locationQuick,
    setLocationQuick,
    draftFilters,
    setDraftFilters,
    appliedFilters,
    appliedQuery,
    appliedLocationQuick,
    apply,
  } = useDraftAppliedFilters({ defaultFilters: DEFAULT_JOB_FILTERS })
  const [sort, setSort] = useState<ListSortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertEmail, setAlertEmail] = useState('')
  const [alertFrequency, setAlertFrequency] = useState('Daily')

  const { results, filterOptions } = useEmployerJobs({
    employer,
    appliedQuery,
    appliedLocationQuick,
    appliedFilters,
    sort,
  })

  function applySearch(nextFilters = draftFilters) {
    apply(nextFilters)
    setFiltersOpen(false)
  }

  return (
    <div className="bg-white pb-16">
      <MarketplacePeachBanner>
        <MarketplaceBreadcrumbs
          crumbs={[
            { label: 'Home', to: PATHS.home },
            { label: employer.name, to: employerPath(employer.id) },
            { label: 'Jobs' },
          ]}
        />
        <MarketplaceListHeading
          title="Job List"
          description={`Open positions from ${employer.name}. Filter by salary, type, location, and more.`}
          showHowItWorks
        />
        <MarketplaceSearchPanel>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') applySearch()
            }}
            placeholder="Search jobs"
            className="h-12 min-w-0 flex-1 rounded-xl border border-freeio-border bg-freeio-surface px-4 text-sm text-freeio-ink outline-none transition focus:border-freeio focus:bg-white"
          />
          <div className="relative w-full sm:w-52">
            <select
              value={locationQuick}
              onChange={(event) => setLocationQuick(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-freeio-border bg-freeio-surface px-4 pr-10 text-sm text-freeio-ink outline-none transition focus:border-freeio focus:bg-white"
            >
              <option value="">City, state, or zip</option>
              {getEmployerLocationOptions().map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle" />
          </div>
          <MarketplaceSearchButton onClick={() => applySearch()} />
        </MarketplaceSearchPanel>
      </MarketplacePeachBanner>

      <Section className="py-6 sm:py-8" containerClassName={MARKETPLACE_PAGE_PAD}>
        <MarketplaceResultsToolbar
          countLabel={<MarketplaceShowingCount count={results.length} />}
          onFilterClick={() => setFiltersOpen(true)}
          sortSlot={
            <MarketplaceListSortMenu
              value={sort}
              options={JOB_SORT_OPTIONS}
              open={sortOpen}
              onOpenChange={setSortOpen}
              onChange={setSort}
            />
          }
        />

        {results.length === 0 ? (
          <MarketplaceEmptyState>No jobs match your filters.</MarketplaceEmptyState>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((position) => (
              <JobCard key={position.id} position={position} employer={employer} />
            ))}
          </div>
        )}
      </Section>

      <MarketplaceFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="All Filters"
      >
        <JobFiltersSidebar
          embedded
          filters={draftFilters}
          onChange={setDraftFilters}
          onSearch={() => applySearch()}
          categoryOptions={filterOptions.categories}
          employmentTypeOptions={filterOptions.employmentTypes}
          locationOptions={filterOptions.locations}
          experienceOptions={filterOptions.experiences}
          industryOptions={filterOptions.industries}
          qualificationOptions={filterOptions.qualifications}
        />

        <div className="border-t border-freeio-border-soft pt-6">
          <h3 className="text-lg font-bold text-freeio-ink">Job Alert</h3>
          <label className="mt-4 block text-[15px] font-medium text-freeio-muted">
            Title
            <input
              type="text"
              value={alertTitle}
              onChange={(event) => setAlertTitle(event.target.value)}
              className="mt-2 h-14 w-full rounded-xl border border-freeio-border px-4 text-[15px] text-freeio-ink outline-none transition focus:border-freeio"
            />
          </label>
          <label className="mt-4 block text-[15px] font-medium text-freeio-muted">
            Email
            <input
              type="email"
              value={alertEmail}
              onChange={(event) => setAlertEmail(event.target.value)}
              className="mt-2 h-14 w-full rounded-xl border border-freeio-border px-4 text-[15px] text-freeio-ink outline-none transition focus:border-freeio"
            />
          </label>
          <label className="mt-4 block text-[15px] font-medium text-freeio-muted">
            Frequency
            <div className="relative mt-2">
              <select
                value={alertFrequency}
                onChange={(event) => setAlertFrequency(event.target.value)}
                className="h-14 w-full appearance-none rounded-xl border border-freeio-border px-4 pr-11 text-[15px] text-freeio-ink outline-none transition focus:border-freeio"
              >
                {['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Annually'].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-freeio-subtle" />
            </div>
          </label>
          <button
            type="button"
            className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-xl text-[15px] font-semibold text-white transition hover:brightness-95 bg-freeio"
          >
            Submit Listing
          </button>
        </div>
      </MarketplaceFilterDrawer>
    </div>
  )
}
