import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { EmployerCard } from '@/features/referrals/components/EmployerCard'
import {
  EmployerFiltersSidebar,
  type EmployerFiltersState,
} from '@/features/referrals/components/EmployerFiltersSidebar'
import {
  EMPLOYERS,
  EMPLOYER_LOCATION_OPTIONS,
} from '@/features/referrals/data/employers'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_PEACH = '#FFF1ED'

type SortKey = 'default' | 'newest' | 'oldest' | 'projects-asc' | 'projects-desc' | 'random'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Sort by (Default)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'projects-asc', label: 'Lowest Projects' },
  { value: 'projects-desc', label: 'Highest Projects' },
  { value: 'random', label: 'Random' },
]

const DEFAULT_FILTERS: EmployerFiltersState = {
  categories: [],
  locations: [],
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

export function EmployerResultsPage() {
  const [query, setQuery] = useState('')
  const [locationQuick, setLocationQuick] = useState('')
  const [draftFilters, setDraftFilters] = useState<EmployerFiltersState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<EmployerFiltersState>(DEFAULT_FILTERS)
  const [appliedQuery, setAppliedQuery] = useState('')
  const [appliedLocationQuick, setAppliedLocationQuick] = useState('')
  const [sort, setSort] = useState<SortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const pagePad = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

  function applySearch(nextFilters = draftFilters) {
    setAppliedFilters(nextFilters)
    setAppliedQuery(query.trim().toLowerCase())
    setAppliedLocationQuick(locationQuick.trim().toLowerCase())
    setMobileFiltersOpen(false)
  }

  const results = useMemo(() => {
    let list = [...EMPLOYERS]

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

    if (appliedLocationQuick) {
      list = list.filter(
        (employer) =>
          employer.city.toLowerCase().includes(appliedLocationQuick) ||
          employer.state.toLowerCase().includes(appliedLocationQuick),
      )
    }

    if (appliedFilters.categories.length) {
      list = list.filter((employer) =>
        appliedFilters.categories.includes(employer.category),
      )
    }

    if (appliedFilters.locations.length) {
      list = list.filter((employer) =>
        appliedFilters.locations.some((location) =>
          matchesLocation(employer.city, employer.state, location),
        ),
      )
    }

    list = list.filter(
      (employer) =>
        employer.foundedYear >= appliedFilters.foundedFrom &&
        employer.foundedYear <= appliedFilters.foundedTo,
    )

    if (sort === 'random') {
      const shuffled = [...list]
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
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

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Sort by (Default)'
  const showingFrom = results.length ? 1 : 0
  const showingTo = results.length

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
            <span className="text-[#222]">Employers Layout v1</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-4xl lg:text-[2.5rem]">
              Employer List
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Browse agencies and companies hiring for property and referral projects.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') applySearch()
                }}
                placeholder="Search employers"
                className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-[#fafafa] py-2 pl-10 pr-3 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B] focus:bg-white"
              />
            </div>
            <div className="relative w-full sm:w-52">
              <select
                value={locationQuick}
                onChange={(event) => setLocationQuick(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 pr-10 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B] focus:bg-white"
              >
                <option value="">City, state, or zip</option>
                {EMPLOYER_LOCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            </div>
            <button
              type="button"
              onClick={() => applySearch()}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition hover:brightness-95"
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
            <EmployerFiltersSidebar
              filters={draftFilters}
              onChange={setDraftFilters}
              onSearch={() => applySearch()}
              className="sticky top-24"
            />
          </div>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-[#6b7280] sm:text-base">
                Showing{' '}
                <span className="font-semibold text-[#222]">
                  {showingFrom} – {showingTo}
                </span>{' '}
                of <span className="font-semibold text-[#222]">{results.length}</span>{' '}
                results
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
                No employers match your filters.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((employer) => (
                  <EmployerCard key={employer.id} employer={employer} />
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
              <EmployerFiltersSidebar
                filters={draftFilters}
                onChange={setDraftFilters}
                onSearch={() => applySearch()}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
