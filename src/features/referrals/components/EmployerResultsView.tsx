import { useEffect, useState } from 'react'
import { Building2, ChevronDown, MapPin, Search, X } from 'lucide-react'
import {
  EmployersMapView,
  type EmployerSortKey,
} from '@/features/referrals/components/EmployersMapView'
import {
  MarketplaceListHeading,
  MarketplacePeachBanner,
  MarketplaceSearchButton,
  MarketplaceSearchPanel,
} from '@/features/referrals/components/marketplaceShell'
import {
  DEFAULT_EMPLOYER_FILTERS,
  useEmployerResults,
} from '@/features/referrals/hooks/useEmployerResults'
import { useDraftAppliedFilters } from '@/features/referrals/hooks/useDraftAppliedFilters'
import { getEmployerLocationOptions } from '@/features/referrals/api/repository'
import { cn } from '@/shared/lib/cn'

function countDrawerFilters(filters: typeof DEFAULT_EMPLOYER_FILTERS) {
  let count = filters.categories.length + filters.locations.length
  if (filters.foundedFrom !== DEFAULT_EMPLOYER_FILTERS.foundedFrom) count += 1
  if (filters.foundedTo !== DEFAULT_EMPLOYER_FILTERS.foundedTo) count += 1
  if (filters.radiusMiles !== DEFAULT_EMPLOYER_FILTERS.radiusMiles) count += 1
  return count
}

export function EmployerResultsView() {
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
    reset,
  } = useDraftAppliedFilters({ defaultFilters: DEFAULT_EMPLOYER_FILTERS })
  const [sort, setSort] = useState<EmployerSortKey>('default')
  const [isSearching, setIsSearching] = useState(true)

  const results = useEmployerResults({
    appliedQuery,
    appliedLocationQuick,
    appliedFilters,
    sort,
  })

  const activeFilterCount = countDrawerFilters(appliedFilters)

  useEffect(() => {
    setIsSearching(true)
    const timer = window.setTimeout(() => setIsSearching(false), 320)
    return () => window.clearTimeout(timer)
  }, [appliedQuery, appliedLocationQuick, appliedFilters, sort])

  function handleApply() {
    apply()
  }

  function clearSearch() {
    reset()
  }

  const hasAppliedSearch = Boolean(
    appliedQuery || appliedLocationQuick || activeFilterCount > 0,
  )

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <MarketplacePeachBanner size="compact" shrink className="border-b border-freeio-peach-line">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <MarketplaceListHeading
            title="Find employers"
            description="Browse agencies and companies hiring for property and referral projects."
            titleClassName="text-2xl sm:text-3xl lg:text-[1.75rem]"
            descriptionClassName="mt-1 max-w-xl text-sm leading-snug text-freeio-muted sm:text-[15px]"
          />
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-freeio-peach-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-freeio-ink sm:inline-flex">
            <Building2 className="h-3.5 w-3.5 text-freeio" aria-hidden />
            {results.length} companies nearby
          </div>
        </div>

        <MarketplaceSearchPanel className="mt-3 max-w-none gap-2 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:gap-2.5 sm:p-2.5">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleApply()
              }}
              placeholder="Search by company, category, or keyword"
              aria-label="Search employers"
              className="h-11 w-full rounded-xl border border-freeio-border bg-freeio-surface py-2 pl-10 pr-3 text-sm text-freeio-ink outline-none transition placeholder:text-freeio-subtle focus:border-freeio focus:bg-white focus:ring-2 focus:ring-freeio/15 sm:h-12"
            />
          </div>
          <div className="relative w-full sm:w-60">
            <MapPin
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle"
              aria-hidden
            />
            <select
              value={locationQuick}
              onChange={(event) => setLocationQuick(event.target.value)}
              aria-label="Filter by location"
              className="h-11 w-full appearance-none rounded-xl border border-freeio-border bg-freeio-surface py-2 pl-9 pr-9 text-sm text-freeio-ink outline-none transition focus:border-freeio focus:bg-white focus:ring-2 focus:ring-freeio/15 sm:h-12"
            >
              <option value="">All locations</option>
              {getEmployerLocationOptions().map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle" />
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <MarketplaceSearchButton
              onClick={handleApply}
              className="h-11 flex-1 px-6 sm:h-12 sm:flex-none"
            />
            {hasAppliedSearch ? (
              <button
                type="button"
                onClick={clearSearch}
                className={cn(
                  'inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-freeio-border bg-white px-3 text-sm font-semibold text-freeio-muted transition hover:border-freeio/40 hover:text-freeio-ink sm:h-12',
                )}
                aria-label="Clear search and filters"
              >
                <X className="h-4 w-4" />
                <span className="sm:inline">Clear</span>
              </button>
            ) : null}
          </div>
        </MarketplaceSearchPanel>

        {hasAppliedSearch ? (
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-freeio-subtle">
              Active
            </span>
            {appliedQuery ? (
              <span className="inline-flex items-center rounded-full border border-freeio-peach-border bg-white px-2.5 py-1 text-xs font-medium text-freeio-ink">
                “{appliedQuery}”
              </span>
            ) : null}
            {appliedLocationQuick ? (
              <span className="inline-flex items-center rounded-full border border-freeio-peach-border bg-white px-2.5 py-1 text-xs font-medium text-freeio-ink">
                {appliedLocationQuick}
              </span>
            ) : null}
            {activeFilterCount > 0 ? (
              <span className="inline-flex items-center rounded-full border border-brand/20 bg-freeio-soft px-2.5 py-1 text-xs font-semibold text-brand">
                {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'}
              </span>
            ) : null}
          </div>
        ) : null}
      </MarketplacePeachBanner>

      <div className="min-h-0 flex-1 overflow-hidden">
        <EmployersMapView
          employers={results}
          count={results.length}
          sort={sort}
          onSortChange={setSort}
          draftFilters={draftFilters}
          onFiltersChange={setDraftFilters}
          onApplySearch={apply}
          onResetFilters={reset}
          isLoading={isSearching}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </div>
  )
}
