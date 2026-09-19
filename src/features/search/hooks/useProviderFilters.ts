import { useState } from 'react'
import {
  DEFAULT_FILTERS,
  type HeroFiltersState,
} from '@/features/search/data/categories'

const SERVICE_FILTER_KEYS: (keyof HeroFiltersState)[] = [
  'radius',
]

export function useProviderFilters(initial?: Partial<HeroFiltersState>) {
  const [filters, setFilters] = useState<HeroFiltersState>({
    ...DEFAULT_FILTERS,
    ...initial,
  })

  function updateFilter<K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  function toSearchParams() {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return
      if (SERVICE_FILTER_KEYS.includes(key as keyof HeroFiltersState) && value === '') return
      params.set(key, value)
    })

    for (const key of SERVICE_FILTER_KEYS) {
      const value = filters[key]
      if (value !== '' && !params.has(key)) {
        params.set(key, value)
      }
    }

    if (filters.radius && !params.has('radius')) params.set('radius', filters.radius)

    return params
  }

  return { filters, updateFilter, resetFilters, toSearchParams, setFilters }
}
