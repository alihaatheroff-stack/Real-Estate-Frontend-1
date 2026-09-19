import { useState } from 'react'
import { Search } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ProjectListCard } from '@/features/referrals/components/ProjectListCard'
import { ProjectFiltersSidebar } from '@/features/referrals/components/ProjectFiltersSidebar'
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
} from '@/features/referrals/components/marketplaceShell'
import {
  DEFAULT_PROJECT_FILTERS,
  PROJECT_SORT_OPTIONS,
  useEmployerProjects,
} from '@/features/referrals/hooks/useEmployerProjects'
import { useDraftAppliedFilters } from '@/features/referrals/hooks/useDraftAppliedFilters'
import type { ListSortKey } from '@/features/referrals/model/sort'
import type { Employer } from '@/entities/employer/types'
import { PATHS, employerPath } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

type EmployerProjectsViewProps = {
  employer: Employer
}

export function EmployerProjectsView({ employer }: EmployerProjectsViewProps) {
  const {
    query,
    setQuery,
    draftFilters,
    setDraftFilters,
    appliedFilters,
    appliedQuery,
    apply,
  } = useDraftAppliedFilters({ defaultFilters: DEFAULT_PROJECT_FILTERS })
  const [sort, setSort] = useState<ListSortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { results, filterOptions } = useEmployerProjects({
    employer,
    appliedQuery,
    appliedFilters,
    sort,
  })

  function applySearch(nextFilters = draftFilters) {
    apply(nextFilters)
    setMobileFiltersOpen(false)
  }

  const countLabel =
    results.length === 1 ? (
      'Showing the single result'
    ) : (
      <>
        Showing all <span className="font-semibold text-freeio-ink">{results.length}</span> results
      </>
    )

  return (
    <div className="bg-white pb-16">
      <MarketplacePeachBanner>
        <MarketplaceBreadcrumbs
          crumbs={[
            { label: 'Home', to: PATHS.home },
            { label: employer.name, to: employerPath(employer.id) },
            { label: 'Projects List' },
          ]}
        />
        <MarketplaceListHeading
          title="Projects List"
          description={`Browse open projects from ${employer.name}. Search by title or keywords, then refine with filters.`}
        />
        <MarketplaceSearchPanel className="p-2.5 sm:p-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-freeio-subtle" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applySearch()
              }}
              placeholder="Project title, keywords."
              className="h-14 w-full rounded-xl border-0 bg-transparent py-2 pl-12 pr-4 text-[15px] text-freeio-ink outline-none placeholder:text-freeio-subtle"
            />
          </div>
          <MarketplaceSearchButton
            onClick={() => applySearch()}
            className="h-14 px-8 text-[15px]"
          />
        </MarketplaceSearchPanel>
      </MarketplacePeachBanner>

      <Section className="py-6 sm:py-8" containerClassName={MARKETPLACE_PAGE_PAD}>
        <div className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] xl:grid-cols-[18.5rem_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <ProjectFiltersSidebar
              filters={draftFilters}
              onChange={setDraftFilters}
              onSearch={() => applySearch()}
              categoryOptions={filterOptions.categories}
              skillOptions={filterOptions.skills}
              cityOptions={filterOptions.cities}
              className="sticky top-24"
            />
          </div>

          <div>
            <MarketplaceResultsToolbar
              countLabel={<span className="text-[15px]">{countLabel}</span>}
              onFilterClick={() => setMobileFiltersOpen(true)}
              filterButtonClassName="lg:hidden"
              sortSlot={
                <MarketplaceListSortMenu
                  value={sort}
                  options={PROJECT_SORT_OPTIONS}
                  open={sortOpen}
                  onOpenChange={setSortOpen}
                  onChange={setSort}
                />
              }
            />

            {results.length === 0 ? (
              <MarketplaceEmptyState>No projects match your filters.</MarketplaceEmptyState>
            ) : (
              <div className="space-y-5">
                {results.map((project) => (
                  <ProjectListCard
                    key={project.id}
                    project={project}
                    employer={employer}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <MarketplaceFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filter"
        variant="simple"
        mobileOnly
        panelWidthClassName="w-[min(100%,22rem)]"
      >
        <ProjectFiltersSidebar
          filters={draftFilters}
          onChange={setDraftFilters}
          onSearch={() => applySearch()}
          categoryOptions={filterOptions.categories}
          skillOptions={filterOptions.skills}
          cityOptions={filterOptions.cities}
        />
      </MarketplaceFilterDrawer>
    </div>
  )
}
