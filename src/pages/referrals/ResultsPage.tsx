import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ServicesMapView } from '@/features/referrals'
import { useServiceResults, type ServiceSortKey } from '@/features/referrals/hooks/useServiceResults'
import { useProviderFilters, type HeroFiltersState } from '@/features/search'

export function ResultsPage() {
  const [params] = useSearchParams()
  const { filters, updateFilter, resetFilters, toSearchParams, setFilters } =
    useProviderFilters({ find: 'service' })
  const [sort, setSort] = useState<ServiceSortKey>('rating')
  const q = params.get('q')?.toLowerCase() ?? ''

  useEffect(() => {
    const next: Partial<HeroFiltersState> = { find: 'service' }
    ;(
      [
        'pspCategory',
        'representation',
        'financing',
        'field',
        'condition',
        'priceBand',
        'subField',
        'motive',
        'language',
        'referral',
        'zip',
        'radius',
        'datePosted',
        'responseTime',
        'deliveryTime',
        'priceFrom',
        'priceTo',
        'englishLevel',
        'region',
      ] as const
    ).forEach((key) => {
      const value = params.get(key)
      if (value) next[key] = value
    })
    setFilters((prev) => ({ ...prev, ...next }))
  }, [params, setFilters])

  const serviceResults = useServiceResults({ q, filters, sort })

  return (
    <ServicesMapView
      services={serviceResults}
      count={serviceResults.length}
      sort={sort}
      onSortChange={setSort}
      q={q}
      zip={filters.zip}
      filters={filters}
      onFilterChange={updateFilter}
      onResetFilters={resetFilters}
      toSearchParams={toSearchParams}
    />
  )
}
