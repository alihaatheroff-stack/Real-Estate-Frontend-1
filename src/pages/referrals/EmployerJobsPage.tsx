import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Play, SlidersHorizontal, X } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { JobCard } from '@/features/referrals/components/JobCard'
import {
  JobFiltersSidebar,
  type JobFiltersState,
} from '@/features/referrals/components/JobFiltersSidebar'
import { EMPLOYER_LOCATION_OPTIONS, getEmployerById } from '@/features/referrals'
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

const DEFAULT_FILTERS: JobFiltersState = {
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

export function EmployerJobsPage() {
  const { id = '' } = useParams()
  const employer = getEmployerById(id)
  const [query, setQuery] = useState('')
  const [locationQuick, setLocationQuick] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [appliedLocationQuick, setAppliedLocationQuick] = useState('')
  const [draftFilters, setDraftFilters] = useState<JobFiltersState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<JobFiltersState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertEmail, setAlertEmail] = useState('')
  const [alertFrequency, setAlertFrequency] = useState('Daily')
  const pagePad = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

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
    setAppliedLocationQuick(locationQuick.trim().toLowerCase())
    setFiltersOpen(false)
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
            <span className="text-[#222]">Jobs</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-4xl lg:text-[2.5rem]">
              Job List
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Open positions from {employer.name}. Filter by salary, type, location, and more.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#222] transition hover:opacity-80"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md"
                style={{ backgroundColor: FREEIO_GREEN }}
              >
                <Play className="h-4 w-4 fill-white" />
              </span>
              How RE NETWORK Works
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applySearch()
              }}
              placeholder="Search jobs"
              className="h-12 min-w-0 flex-1 rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B] focus:bg-white"
            />
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280] sm:text-base">
            Showing all{' '}
            <span className="font-semibold text-[#222]">{results.length}</span> results
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#222] transition hover:border-[#5BBB7B] hover:text-[#5BBB7B]"
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
            No jobs match your filters.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((position) => (
              <JobCard key={position.id} position={position} employer={employer} />
            ))}
          </div>
        )}
      </Section>

      {filtersOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,24rem)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#eee] px-6 py-5">
              <h2 className="text-xl font-bold text-[#222]">All Filters</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: '#E7F6ED', color: FREEIO_GREEN }}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-8 pt-2">
              <JobFiltersSidebar
                embedded
                filters={draftFilters}
                onChange={setDraftFilters}
                onSearch={() => applySearch()}
                categoryOptions={filterOptions.categories}
                employmentTypeOptions={filterOptions.employmentTypes}
                locationOptions={filterOptions.locations}
                experienceOptions={filterOptions.experiences}
                industryOptions={filterOptions.industries}
                qualificationOptions={filterOptions.qualifications}
              />

              <div className="border-t border-[#eee] pt-6">
                <h3 className="text-lg font-bold text-[#222]">Job Alert</h3>
                <label className="mt-4 block text-[15px] font-medium text-[#6b7280]">
                  Title
                  <input
                    type="text"
                    value={alertTitle}
                    onChange={(event) => setAlertTitle(event.target.value)}
                    className="mt-2 h-14 w-full rounded-xl border border-[#e5e7eb] px-4 text-[15px] text-[#222] outline-none transition focus:border-[#5BBB7B]"
                  />
                </label>
                <label className="mt-4 block text-[15px] font-medium text-[#6b7280]">
                  Email
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(event) => setAlertEmail(event.target.value)}
                    className="mt-2 h-14 w-full rounded-xl border border-[#e5e7eb] px-4 text-[15px] text-[#222] outline-none transition focus:border-[#5BBB7B]"
                  />
                </label>
                <label className="mt-4 block text-[15px] font-medium text-[#6b7280]">
                  Frequency
                  <div className="relative mt-2">
                    <select
                      value={alertFrequency}
                      onChange={(event) => setAlertFrequency(event.target.value)}
                      className="h-14 w-full appearance-none rounded-xl border border-[#e5e7eb] px-4 pr-11 text-[15px] text-[#222] outline-none transition focus:border-[#5BBB7B]"
                    >
                      {['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Annually'].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                  </div>
                </label>
                <button
                  type="button"
                  className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-xl text-[15px] font-semibold text-white transition hover:brightness-95"
                  style={{ backgroundColor: FREEIO_GREEN }}
                >
                  Submit Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
