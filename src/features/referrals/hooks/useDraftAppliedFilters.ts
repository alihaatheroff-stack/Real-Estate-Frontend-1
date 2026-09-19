import { useState } from 'react'

type UseDraftAppliedFiltersOptions<TFilters> = {
  defaultFilters: TFilters
}

/**
 * Shared draft → applied filter/query state used by marketplace list screens.
 * Keeps apply/reset logic out of page/view JSX.
 */
export function useDraftAppliedFilters<TFilters>({
  defaultFilters,
}: UseDraftAppliedFiltersOptions<TFilters>) {
  const [query, setQuery] = useState('')
  const [locationQuick, setLocationQuick] = useState('')
  const [draftFilters, setDraftFilters] = useState<TFilters>(defaultFilters)
  const [appliedFilters, setAppliedFilters] = useState<TFilters>(defaultFilters)
  const [appliedQuery, setAppliedQuery] = useState('')
  const [appliedLocationQuick, setAppliedLocationQuick] = useState('')

  function apply(nextFilters: TFilters = draftFilters) {
    setAppliedFilters(nextFilters)
    setAppliedQuery(query.trim().toLowerCase())
    setAppliedLocationQuick(locationQuick.trim().toLowerCase())
  }

  function reset(nextDefaults: TFilters = defaultFilters) {
    setQuery('')
    setLocationQuick('')
    setDraftFilters(nextDefaults)
    setAppliedFilters(nextDefaults)
    setAppliedQuery('')
    setAppliedLocationQuick('')
  }

  return {
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
  }
}
