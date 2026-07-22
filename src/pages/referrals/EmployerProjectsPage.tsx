import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ProjectListCard } from '@/features/referrals/components/ProjectListCard'
import {
  ProjectFiltersSidebar,
  type ProjectFiltersState,
} from '@/features/referrals/components/ProjectFiltersSidebar'
import { getEmployerById } from '@/features/referrals'
import { PATHS, employerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_PEACH = '#FFF1ED'

type SortKey = 'default' | 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'random'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Sort by (Default)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'price-desc', label: 'Highest Price' },
  { value: 'random', label: 'Random' },
]

const DEFAULT_FILTERS: ProjectFiltersState = {
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

export function EmployerProjectsPage() {
  const { id = '' } = useParams()
  const employer = getEmployerById(id)
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [draftFilters, setDraftFilters] = useState<ProjectFiltersState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<ProjectFiltersState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const pagePad = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

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

  if (!employer) {
    return (
      <Section containerClassName={pagePad}>
        <h1 className="font-display text-2xl font-bold">Employer not found</h1>
        <Link
          to={PATHS.employerResults}
          className="mt-4 inline-block text-brand hover:underline"
        >
          Back to employers
        </Link>
      </Section>
    )
  }

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Sort by (Default)'

  function applySearch(nextFilters = draftFilters) {
    setAppliedFilters(nextFilters)
    setAppliedQuery(query.trim().toLowerCase())
    setMobileFiltersOpen(false)
  }

  return (
    <div className="bg-white pb-16">
      <div
        className="relative overflow-hidden border-b border-[#f0e4df]"
        style={{ backgroundColor: FREEIO_PEACH }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 55c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 25c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />

        <Section className="relative py-6 sm:py-8" containerClassName={pagePad}>
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#6b7280]">
            <Link to={PATHS.referrals} className="hover:text-[#222]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={employerPath(employer.id)} className="hover:text-[#222]">
              {employer.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#222]">Projects List</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-4xl lg:text-[2.5rem]">
              Projects List
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Browse open projects from {employer.name}. Search by title or keywords, then refine
              with filters.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:p-3">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') applySearch()
                }}
                placeholder="Project title, keywords."
                className="h-14 w-full rounded-xl border-0 bg-transparent py-2 pl-12 pr-4 text-[15px] text-[#222] outline-none placeholder:text-[#9ca3af]"
              />
            </div>
            <button
              type="button"
              onClick={() => applySearch()}
              className="inline-flex h-14 shrink-0 items-center justify-center rounded-xl px-8 text-[15px] font-semibold text-white transition hover:brightness-95"
              style={{ backgroundColor: FREEIO_GREEN }}
            >
              Search
            </button>
          </div>
        </Section>
      </div>

      <Section className="py-6 sm:py-8" containerClassName={pagePad}>
        <div className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] xl:grid-cols-[18.5rem_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <ProjectFiltersSidebar
              filters={draftFilters}
              onChange={setDraftFilters}
              onSearch={() => applySearch()}
              categoryOptions={filterOptions.categories}
              skillOptions={filterOptions.skills}
              cityOptions={filterOptions.cities}
              className="sticky top-24"
            />
          </div>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[15px] text-[#6b7280]">
                {results.length === 1 ? (
                  'Showing the single result'
                ) : (
                  <>
                    Showing all{' '}
                    <span className="font-semibold text-[#222]">{results.length}</span> results
                  </>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#222] transition hover:border-[#5BBB7B] hover:text-[#5BBB7B] lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((open) => !open)}
                    className="inline-flex h-11 min-w-[11rem] items-center justify-between gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#222] transition hover:border-[#5BBB7B]"
                  >
                    <span className="truncate">{sortLabel}</span>
                    <ChevronDown
                      className={cn('h-4 w-4 shrink-0 transition', sortOpen && 'rotate-180')}
                    />
                  </button>
                  {sortOpen ? (
                    <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-[#eee] bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSort(option.value)
                            setSortOpen(false)
                          }}
                          className={cn(
                            'block w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f6f7f9]',
                            sort === option.value
                              ? 'font-semibold text-[#5BBB7B]'
                              : 'text-[#222]',
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {results.length === 0 ? (
              <p className="rounded-xl border border-[#eee] bg-[#fafafa] px-6 py-10 text-center text-[#6b7280]">
                No projects match your filters.
              </p>
            ) : (
              <div className="space-y-5">
                {results.map((project) => (
                  <ProjectListCard
                    key={project.id}
                    project={project}
                    employer={employer}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#eee] px-4 py-3">
              <h2 className="text-base font-bold text-[#222]">Filter</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#6b7280] transition hover:bg-[#f6f7f9]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ProjectFiltersSidebar
                filters={draftFilters}
                onChange={setDraftFilters}
                onSearch={() => applySearch()}
                categoryOptions={filterOptions.categories}
                skillOptions={filterOptions.skills}
                cityOptions={filterOptions.cities}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
