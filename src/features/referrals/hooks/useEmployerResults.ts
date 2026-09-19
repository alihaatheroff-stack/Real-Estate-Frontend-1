import { useMemo } from 'react'
import {
  EMPLOYER_DISTANCE_DEFAULT,
  type EmployerFiltersState,
} from '@/features/referrals/model/employerFilters'
import type { EmployerSortKey } from '@/features/referrals/model/sort'
import { listEmployers } from '@/features/referrals/api/repository'
import { getCityCoords, milesBetween } from '@/features/referrals/lib/geo'
import { shuffledCopy } from '@/shared/lib/array'
import type { Employer } from '@/entities/employer/types'

export const DEFAULT_EMPLOYER_FILTERS: EmployerFiltersState = {
  categories: [],
  locations: [],
  radiusMiles: EMPLOYER_DISTANCE_DEFAULT,
  foundedFrom: 1885,
  foundedTo: 2026,
}

function matchesLocation(city: string, state: string, locationValue: string) {
  const normalized = locationValue.replaceAll('-', ' ')
  const cityLower = city.toLowerCase()
  const stateLower = state.toLowerCase()
  return (
    cityLower.includes(normalized) ||
    stateLower.includes(normalized) ||
    cityLower.includes(locationValue)
  )
}

type UseEmployerResultsOptions = {
  appliedQuery: string
  appliedLocationQuick: string
  appliedFilters: EmployerFiltersState
  sort: EmployerSortKey
}

export function useEmployerResults({
  appliedQuery,
  appliedLocationQuick,
  appliedFilters,
  sort,
}: UseEmployerResultsOptions): Employer[] {
  return useMemo(() => {
    let list = listEmployers()

    if (appliedQuery) {
      list = list.filter(
        (employer) =>
          employer.name.toLowerCase().includes(appliedQuery) ||
          employer.city.toLowerCase().includes(appliedQuery) ||
          employer.state.toLowerCase().includes(appliedQuery) ||
          employer.about.toLowerCase().includes(appliedQuery) ||
          employer.category.replaceAll('-', ' ').includes(appliedQuery),
      )
    }

    const originKey = appliedFilters.locations[0] || appliedLocationQuick
    const origin = originKey ? getCityCoords(originKey) : null
    const radius = appliedFilters.radiusMiles || EMPLOYER_DISTANCE_DEFAULT

    if (origin) {
      list = list.filter(
        (employer) => milesBetween(origin, [employer.lat, employer.lng]) <= radius,
      )
    } else if (appliedLocationQuick) {
      list = list.filter(
        (employer) =>
          employer.city.toLowerCase().includes(appliedLocationQuick) ||
          employer.state.toLowerCase().includes(appliedLocationQuick),
      )
    } else if (appliedFilters.locations.length) {
      list = list.filter((employer) =>
        appliedFilters.locations.some((location) =>
          matchesLocation(employer.city, employer.state, location),
        ),
      )
    }

    if (appliedFilters.categories.length) {
      list = list.filter((employer) =>
        appliedFilters.categories.includes(employer.category),
      )
    }

    list = list.filter(
      (employer) =>
        employer.foundedYear >= appliedFilters.foundedFrom &&
        employer.foundedYear <= appliedFilters.foundedTo,
    )

    if (sort === 'random') {
      return shuffledCopy(list)
    }

    list.sort((a, b) => {
      if (sort === 'newest') return b.foundedYear - a.foundedYear
      if (sort === 'oldest') return a.foundedYear - b.foundedYear
      if (sort === 'projects-asc') return a.openProjects - b.openProjects
      if (sort === 'projects-desc') return b.openProjects - a.openProjects
      return b.rating - a.rating
    })

    return list
  }, [appliedFilters, appliedLocationQuick, appliedQuery, sort])
}
