import { useMemo } from 'react'
import type { EmployerSortKey } from '@/features/referrals/model/sort'
import { listEmployers } from '@/features/referrals/api/repository'
import { matchesZipRadius } from '@/features/referrals/lib/geo'
import { splitCsv, type HeroFiltersState } from '@/features/search'
import { shuffledCopy } from '@/shared/lib/array'
import type { Employer } from '@/entities/employer/types'

type UseEmployerResultsOptions = {
  q: string
  filters: HeroFiltersState
  sort: EmployerSortKey
}

function matchesText(haystack: string, needle: string) {
  const normalized = needle.toLowerCase().replaceAll('-', ' ').trim()
  if (!normalized) return true
  return haystack.includes(normalized)
}

export function useEmployerResults({
  q,
  filters,
  sort,
}: UseEmployerResultsOptions): Employer[] {
  return useMemo(() => {
    let list = listEmployers()

    if (q) {
      list = list.filter(
        (employer) =>
          employer.name.toLowerCase().includes(q) ||
          employer.city.toLowerCase().includes(q) ||
          employer.state.toLowerCase().includes(q) ||
          employer.about.toLowerCase().includes(q) ||
          employer.category.replaceAll('-', ' ').includes(q) ||
          employer.categories.some((category) =>
            category.replaceAll('-', ' ').includes(q),
          ),
      )
    }

    const categories = splitCsv(filters.pspCategory)
    if (categories.length) {
      list = list.filter((employer) => {
        const text = [
          employer.category,
          ...employer.categories,
          employer.about,
          employer.tagline,
        ]
          .join(' ')
          .toLowerCase()
          .replaceAll('-', ' ')
        return categories.some((category) => matchesText(text, category))
      })
    }

    if (filters.field) {
      list = list.filter((employer) => {
        const text = [
          employer.category,
          ...employer.categories,
          employer.about,
          employer.tagline,
        ]
          .join(' ')
          .toLowerCase()
          .replaceAll('-', ' ')
        return matchesText(text, filters.field)
      })
    }

    if (filters.zip) {
      list = list.filter((employer) =>
        matchesZipRadius(employer, filters.zip, filters.radius),
      )
    }

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
  }, [filters, q, sort])
}
