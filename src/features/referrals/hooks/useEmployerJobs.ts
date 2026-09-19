import { useMemo } from 'react'
import type { JobFiltersState } from '@/features/referrals/components/JobFiltersSidebar'
import {
  LIST_SORT_OPTIONS,
  type ListSortKey,
} from '@/features/referrals/model/sort'
import type { Employer, EmployerPosition } from '@/entities/employer/types'

export { LIST_SORT_OPTIONS as JOB_SORT_OPTIONS }
export type { ListSortKey as JobSortKey }

export const DEFAULT_JOB_FILTERS: JobFiltersState = {
  categories: [],
  salaryPeriods: [],
  priceMin: 0,
  priceMax: 600,
  employmentTypes: [],
  locations: [],
  experiences: [],
  industries: [],
  qualifications: [],
}

type UseEmployerJobsOptions = {
  employer: Employer | undefined
  appliedQuery: string
  appliedLocationQuick: string
  appliedFilters: JobFiltersState
  sort: ListSortKey
}

export function useEmployerJobs({
  employer,
  appliedQuery,
  appliedLocationQuick,
  appliedFilters,
  sort,
}: UseEmployerJobsOptions): {
  results: EmployerPosition[]
  filterOptions: {
    categories: string[]
    employmentTypes: string[]
    locations: string[]
    experiences: string[]
    industries: string[]
    qualifications: string[]
  }
} {
  const filterOptions = useMemo(() => {
    if (!employer) {
      return {
        categories: [] as string[],
        employmentTypes: [] as string[],
        locations: [] as string[],
        experiences: [] as string[],
        industries: [] as string[],
        qualifications: [] as string[],
      }
    }
    return {
      categories: [...new Set(employer.positions.map((job) => job.category))],
      employmentTypes: [...new Set(employer.positions.map((job) => job.employmentType))],
      locations: [...new Set(employer.positions.map((job) => job.city))],
      experiences: [
        ...new Set(
          employer.positions.map((job) => job.experience).filter(Boolean) as string[],
        ),
      ],
      industries: [
        ...new Set(
          employer.positions.map((job) => job.industry).filter(Boolean) as string[],
        ),
      ],
      qualifications: [
        ...new Set(
          employer.positions.map((job) => job.qualification).filter(Boolean) as string[],
        ),
      ],
    }
  }, [employer])

  const results = useMemo(() => {
    if (!employer) return []
    let list = [...employer.positions]

    if (appliedQuery) {
      list = list.filter(
        (job) =>
          job.title.toLowerCase().includes(appliedQuery) ||
          job.category.toLowerCase().includes(appliedQuery),
      )
    }
    if (appliedLocationQuick) {
      list = list.filter((job) => job.city.toLowerCase().includes(appliedLocationQuick))
    }
    if (appliedFilters.categories.length) {
      list = list.filter((job) => appliedFilters.categories.includes(job.category))
    }
    if (appliedFilters.salaryPeriods.length) {
      list = list.filter((job) => appliedFilters.salaryPeriods.includes(job.salaryPeriod))
    }
    list = list.filter(
      (job) =>
        job.salaryMax >= appliedFilters.priceMin &&
        job.salaryMin <= appliedFilters.priceMax,
    )
    if (appliedFilters.employmentTypes.length) {
      list = list.filter((job) =>
        appliedFilters.employmentTypes.includes(job.employmentType),
      )
    }
    if (appliedFilters.locations.length) {
      list = list.filter((job) => appliedFilters.locations.includes(job.city))
    }
    if (appliedFilters.experiences.length) {
      list = list.filter(
        (job) => job.experience && appliedFilters.experiences.includes(job.experience),
      )
    }
    if (appliedFilters.industries.length) {
      list = list.filter(
        (job) => job.industry && appliedFilters.industries.includes(job.industry),
      )
    }
    if (appliedFilters.qualifications.length) {
      list = list.filter(
        (job) =>
          job.qualification && appliedFilters.qualifications.includes(job.qualification),
      )
    }

    if (sort === 'random') {
      const shuffled = [...list]
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    list.sort((a, b) => {
      if (sort === 'newest' || sort === 'oldest') {
        const diff = a.id.localeCompare(b.id)
        return sort === 'newest' ? -diff : diff
      }
      if (sort === 'price-asc') return a.salaryMin - b.salaryMin
      if (sort === 'price-desc') return b.salaryMax - a.salaryMax
      return a.title.localeCompare(b.title)
    })

    return list
  }, [appliedFilters, appliedLocationQuick, appliedQuery, employer, sort])

  return { results, filterOptions }
}
