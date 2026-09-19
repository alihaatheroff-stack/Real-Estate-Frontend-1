import { useMemo } from 'react'
import type { ProjectFiltersState } from '@/features/referrals/components/ProjectFiltersSidebar'
import {
  LIST_SORT_OPTIONS,
  type ListSortKey,
} from '@/features/referrals/model/sort'
import type { Employer, EmployerProject } from '@/entities/employer/types'

export { LIST_SORT_OPTIONS as PROJECT_SORT_OPTIONS }
export type { ListSortKey as ProjectSortKey }

export const DEFAULT_PROJECT_FILTERS: ProjectFiltersState = {
  categories: [],
  projectType: '',
  priceMin: 0,
  priceMax: 200,
  skills: [],
  cities: [],
}

const POSTED_RANK: Record<string, number> = {
  '3 days ago': 5,
  '5 days ago': 4,
  '1 week ago': 3,
  '2 weeks ago': 2,
  '1 month ago': 1,
}

type UseEmployerProjectsOptions = {
  employer: Employer | undefined
  appliedQuery: string
  appliedFilters: ProjectFiltersState
  sort: ListSortKey
}

export function useEmployerProjects({
  employer,
  appliedQuery,
  appliedFilters,
  sort,
}: UseEmployerProjectsOptions): {
  results: EmployerProject[]
  filterOptions: {
    categories: string[]
    skills: string[]
    cities: string[]
  }
} {
  const filterOptions = useMemo(() => {
    if (!employer) {
      return { categories: [] as string[], skills: [] as string[], cities: [] as string[] }
    }
    const categories = [...new Set(employer.projects.map((project) => project.category))]
    const skills = [...new Set(employer.projects.flatMap((project) => project.skills))]
    const cities = [...new Set(employer.projects.map((project) => project.city))]
    return { categories, skills, cities }
  }, [employer])

  const results = useMemo(() => {
    if (!employer) return []
    let list = [...employer.projects]

    if (appliedQuery) {
      list = list.filter(
        (project) =>
          project.title.toLowerCase().includes(appliedQuery) ||
          project.description.toLowerCase().includes(appliedQuery) ||
          project.skills.some((skill) => skill.toLowerCase().includes(appliedQuery)) ||
          project.category.toLowerCase().includes(appliedQuery),
      )
    }

    if (appliedFilters.categories.length) {
      list = list.filter((project) =>
        appliedFilters.categories.includes(project.category),
      )
    }
    if (appliedFilters.projectType) {
      list = list.filter((project) => project.budgetType === appliedFilters.projectType)
    }
    list = list.filter(
      (project) =>
        project.budgetMax >= appliedFilters.priceMin &&
        project.budgetMin <= appliedFilters.priceMax,
    )
    if (appliedFilters.skills.length) {
      list = list.filter((project) =>
        appliedFilters.skills.some((skill) => project.skills.includes(skill)),
      )
    }
    if (appliedFilters.cities.length) {
      list = list.filter((project) => appliedFilters.cities.includes(project.city))
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
      if (sort === 'newest') {
        return (POSTED_RANK[b.postedAgo] ?? 0) - (POSTED_RANK[a.postedAgo] ?? 0)
      }
      if (sort === 'oldest') {
        return (POSTED_RANK[a.postedAgo] ?? 0) - (POSTED_RANK[b.postedAgo] ?? 0)
      }
      if (sort === 'price-asc') return a.budgetMin - b.budgetMin
      if (sort === 'price-desc') return b.budgetMax - a.budgetMax
      return b.proposals - a.proposals
    })

    return list
  }, [appliedFilters, appliedQuery, employer, sort])

  return { results, filterOptions }
}
