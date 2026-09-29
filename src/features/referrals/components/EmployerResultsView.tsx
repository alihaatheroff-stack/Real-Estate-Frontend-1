import { useEffect, useState } from 'react'
import {
  EmployersMapView,
  type EmployerSortKey,
} from '@/features/referrals/components/EmployersMapView'
import {
  DEFAULT_EMPLOYER_FILTERS,
  useEmployerResults,
} from '@/features/referrals/hooks/useEmployerResults'
import { useDraftAppliedFilters } from '@/features/referrals/hooks/useDraftAppliedFilters'

function countDrawerFilters(filters: typeof DEFAULT_EMPLOYER_FILTERS) {
  let count = filters.categories.length + filters.locations.length
  if (filters.foundedFrom !== DEFAULT_EMPLOYER_FILTERS.foundedFrom) count += 1
  if (filters.foundedTo !== DEFAULT_EMPLOYER_FILTERS.foundedTo) count += 1
  if (filters.radiusMiles !== DEFAULT_EMPLOYER_FILTERS.radiusMiles) count += 1
  return count
}

export function EmployerResultsView() {
  const {
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

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
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
