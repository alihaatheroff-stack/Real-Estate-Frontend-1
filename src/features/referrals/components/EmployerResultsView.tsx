import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  EmployersMapView,
  type EmployerSortKey,
} from '@/features/referrals/components/EmployersMapView'
import { useEmployerResults } from '@/features/referrals/hooks/useEmployerResults'
import {
  DEFAULT_FILTERS,
  useProviderFilters,
  type HeroFiltersState,
} from '@/features/search'

function countActiveHeroFilters(filters: HeroFiltersState) {
  return (Object.keys(DEFAULT_FILTERS) as (keyof HeroFiltersState)[]).filter((key) => {
    if (key === 'find') return false
    const value = filters[key]
    const fallback = DEFAULT_FILTERS[key]
    return Boolean(value) && value !== fallback
  }).length
}

export function EmployerResultsView() {
  const [params] = useSearchParams()
  const { filters, updateFilter, resetFilters, toSearchParams, setFilters } =
    useProviderFilters({ find: 'agency' })
  const [sort, setSort] = useState<EmployerSortKey>('default')
  const [isSearching, setIsSearching] = useState(true)
  const q = params.get('q')?.toLowerCase() ?? ''

  useEffect(() => {
    const next: Partial<HeroFiltersState> = { find: 'agency' }
    for (const key of Object.keys(DEFAULT_FILTERS) as (keyof HeroFiltersState)[]) {
      const value = params.get(key)
      if (value) next[key] = value
    }
    setFilters((prev) => ({ ...prev, ...next }))
  }, [params, setFilters])

  const results = useEmployerResults({ q, filters, sort })
  const activeFilterCount = countActiveHeroFilters(filters)

  useEffect(() => {
    setIsSearching(true)
    const timer = window.setTimeout(() => setIsSearching(false), 320)
    return () => window.clearTimeout(timer)
  }, [q, filters, sort])

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="min-h-0 flex-1 overflow-hidden">
        <EmployersMapView
          employers={results}
          count={results.length}
          sort={sort}
          onSortChange={setSort}
          q={q}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
          toSearchParams={toSearchParams}
          isLoading={isSearching}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </div>
  )
}
