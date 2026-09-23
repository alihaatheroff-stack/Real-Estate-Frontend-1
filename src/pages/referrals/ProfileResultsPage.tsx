import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProvidersMapView } from '@/features/referrals'
import { useProfileResults } from '@/features/referrals/hooks/useProfileResults'
import type { ProviderSortKey } from '@/features/referrals/model/sort'
import {
  DEFAULT_FILTERS,
  useProviderFilters,
  type HeroFiltersState,
} from '@/features/search'

export function ProfileResultsPage() {
  const [params] = useSearchParams()
  const { filters, updateFilter, resetFilters, toSearchParams, setFilters } =
    useProviderFilters({ find: 'profile' })
  const [sort, setSort] = useState<ProviderSortKey>('default')
  const q = params.get('q')?.toLowerCase() ?? ''

  useEffect(() => {
    const next: Partial<HeroFiltersState> = { find: 'profile' }
    for (const key of Object.keys(DEFAULT_FILTERS) as (keyof HeroFiltersState)[]) {
      const value = params.get(key)
      if (value) next[key] = value
    }
    setFilters((prev) => ({ ...prev, ...next }))
  }, [params, setFilters])

  const profileResults = useProfileResults({ q, filters, sort })

  return (
    <ProvidersMapView
      providers={profileResults}
      count={profileResults.length}
      sort={sort}
      onSortChange={setSort}
      q={q}
      filters={filters}
      onFilterChange={updateFilter}
      onResetFilters={resetFilters}
      toSearchParams={toSearchParams}
      resultLabel="results"
    />
  )
}
