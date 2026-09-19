import { useState } from 'react'
import {
  DEFAULT_FILTERS,
  type HeroFiltersState,
} from '@/features/search/data/categories'

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
    setFilters({ ...DEFAULT_FILTERS, ...initial })
  }

  function toSearchParams() {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return
      params.set(key, value)
    })
    return params
  }

  return { filters, updateFilter, resetFilters, toSearchParams, setFilters }
}
