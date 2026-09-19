import type { EmployerPosition } from '@/entities/employer/types'
import {
  FilterAside,
  FilterCheckboxGroup,
  FilterSearchButton,
  FilterSection,
  FilterSelectField,
  toggleFilterValue,
} from '@/features/referrals/components/filters/filterPrimitives'
import { FREEIO_GREEN_HEX } from '@/shared/theme/freeio'
import { cn } from '@/shared/lib/cn'

const PRICE_MAX = 600

export type JobFiltersState = {
  categories: string[]
  salaryPeriods: EmployerPosition['salaryPeriod'][]
  priceMin: number
  priceMax: number
  employmentTypes: string[]
  locations: string[]
  experiences: string[]
  industries: string[]
  qualifications: string[]
}

type JobFiltersSidebarProps = {
  filters: JobFiltersState
  onChange: (next: JobFiltersState) => void
  onSearch: () => void
  categoryOptions: string[]
  employmentTypeOptions: string[]
  locationOptions: string[]
  experienceOptions: string[]
  industryOptions: string[]
  qualificationOptions: string[]
  className?: string
  /** Flat layout for drawer (no outer card chrome) */
  embedded?: boolean
}

const SALARY_TYPE_OPTIONS: { label: string; value: EmployerPosition['salaryPeriod'] }[] = [
  { label: 'Monthly', value: 'month' },
  { label: 'Weekly', value: 'week' },
  { label: 'Daily', value: 'day' },
  { label: 'Hourly', value: 'hour' },
  { label: 'Yearly', value: 'year' },
]

export function JobFiltersSidebar({
  filters,
  onChange,
  onSearch,
  categoryOptions,
  employmentTypeOptions,
  locationOptions,
  experienceOptions,
  industryOptions,
  qualificationOptions,
  className,
  embedded = false,
}: JobFiltersSidebarProps) {
  return (
    <FilterAside embedded={embedded} className={className}>
      <FilterSection title="Categories" className={embedded ? 'pt-0' : undefined}>
        <FilterSelectField
          value={filters.categories[0] ?? ''}
          placeholder="Categories"
          options={categoryOptions}
          onChange={(value) =>
            onChange({
              ...filters,
              categories: value ? [value] : [],
            })
          }
        />
      </FilterSection>

      <FilterSection title="Salary Type">
        <FilterCheckboxGroup
          options={SALARY_TYPE_OPTIONS.map((item) => item.label)}
          selected={filters.salaryPeriods.map(
            (period) =>
              SALARY_TYPE_OPTIONS.find((item) => item.value === period)?.label ?? period,
          )}
          onToggle={(label) => {
            const value = SALARY_TYPE_OPTIONS.find((item) => item.label === label)?.value
            if (!value) return
            onChange({
              ...filters,
              salaryPeriods: toggleFilterValue(filters.salaryPeriods, value),
            })
          }}
        />
      </FilterSection>

      <FilterSection title="Price">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex min-w-[3.5rem] items-center justify-center rounded-md bg-freeio-soft px-3 py-1.5 text-sm font-semibold text-freeio">
            ${filters.priceMin}
          </span>
          <span className="inline-flex min-w-[3.5rem] items-center justify-center rounded-md bg-freeio-soft px-3 py-1.5 text-sm font-semibold text-freeio">
            ${filters.priceMax}
          </span>
        </div>
        <div className="relative pt-1">
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            value={filters.priceMax}
            onChange={(event) => {
              const nextMax = Number(event.target.value)
              onChange({
                ...filters,
                priceMax: nextMax,
                priceMin: Math.min(filters.priceMin, nextMax),
              })
            }}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-freeio-track accent-freeio"
            style={{
              background: `linear-gradient(to right, ${FREEIO_GREEN_HEX} 0%, ${FREEIO_GREEN_HEX} ${(filters.priceMax / PRICE_MAX) * 100}%, var(--color-freeio-track) ${(filters.priceMax / PRICE_MAX) * 100}%, var(--color-freeio-track) 100%)`,
            }}
          />
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            value={filters.priceMin}
            onChange={(event) => {
              const nextMin = Number(event.target.value)
              onChange({
                ...filters,
                priceMin: nextMin,
                priceMax: Math.max(filters.priceMax, nextMin),
              })
            }}
            className="absolute left-0 top-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-freeio opacity-0"
          />
        </div>
      </FilterSection>

      <FilterSection title="Type">
        <FilterSelectField
          value={filters.employmentTypes[0] ?? ''}
          placeholder="Type"
          options={employmentTypeOptions}
          onChange={(value) =>
            onChange({
              ...filters,
              employmentTypes: value ? [value] : [],
            })
          }
        />
      </FilterSection>

      <FilterSection title="Location">
        <FilterSelectField
          value={filters.locations[0] ?? ''}
          placeholder="Location"
          options={locationOptions}
          onChange={(value) =>
            onChange({
              ...filters,
              locations: value ? [value] : [],
            })
          }
        />
      </FilterSection>

      <FilterSection title="Experience">
        <FilterSelectField
          value={filters.experiences[0] ?? ''}
          placeholder="Experience"
          options={experienceOptions}
          onChange={(value) =>
            onChange({
              ...filters,
              experiences: value ? [value] : [],
            })
          }
        />
      </FilterSection>

      <FilterSection title="Industry">
        <FilterSelectField
          value={filters.industries[0] ?? ''}
          placeholder="Industry"
          options={industryOptions}
          onChange={(value) =>
            onChange({
              ...filters,
              industries: value ? [value] : [],
            })
          }
        />
      </FilterSection>

      <FilterSection title="Qualification" className={cn('border-b-0 pb-2')}>
        <FilterSelectField
          value={filters.qualifications[0] ?? ''}
          placeholder="Qualification"
          options={qualificationOptions}
          onChange={(value) =>
            onChange({
              ...filters,
              qualifications: value ? [value] : [],
            })
          }
        />
      </FilterSection>

      <FilterSearchButton onClick={onSearch} />
    </FilterAside>
  )
}
