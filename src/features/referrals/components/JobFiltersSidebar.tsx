import { useState, type ReactNode } from 'react'
import { ChevronDown, Plus, Search } from 'lucide-react'
import type { EmployerPosition } from '@/entities/employer/types'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_GREEN_SOFT = '#E7F6ED'
const VISIBLE = 4
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

function toggleValue<T extends string>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function FilterSection({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('border-b border-[#eee] py-6', className)}>
      <h3 className="mb-4 text-lg font-bold text-[#222]">{title}</h3>
      {children}
    </section>
  )
}

function SelectField({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string
  placeholder: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white px-4 pr-11 text-[15px] text-[#222] outline-none transition focus:border-[#5BBB7B]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
    </div>
  )
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? options : options.slice(0, VISIBLE)
  const hiddenCount = Math.max(0, options.length - VISIBLE)

  return (
    <div>
      <ul className="space-y-1">
        {visible.map((option) => {
          const checked = selected.includes(option)
          return (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3 py-2 text-[15px] text-[#222]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(option)}
                  className="h-5 w-5 shrink-0 rounded-[3px] border border-[#cfd4d9] accent-[#5BBB7B]"
                />
                <span className={cn(checked && 'font-medium')}>{option}</span>
              </label>
            </li>
          )
        })}
      </ul>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-medium transition hover:opacity-80"
          style={{ color: FREEIO_GREEN }}
        >
          <Plus className={cn('h-4 w-4 transition', expanded && 'rotate-45')} />
          {expanded ? 'Show less' : 'Show More'}
        </button>
      ) : null}
    </div>
  )
}

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
    <aside
      className={cn(
        embedded
          ? 'bg-white'
          : 'rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      <FilterSection title="Categories" className={embedded ? 'pt-0' : undefined}>
        <SelectField
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
        <CheckboxGroup
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
              salaryPeriods: toggleValue(filters.salaryPeriods, value),
            })
          }}
        />
      </FilterSection>

      <FilterSection title="Price">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className="inline-flex min-w-[3.5rem] items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: FREEIO_GREEN_SOFT, color: FREEIO_GREEN }}
          >
            ${filters.priceMin}
          </span>
          <span
            className="inline-flex min-w-[3.5rem] items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: FREEIO_GREEN_SOFT, color: FREEIO_GREEN }}
          >
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
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#e8ecef] accent-[#5BBB7B]"
            style={{
              background: `linear-gradient(to right, ${FREEIO_GREEN} 0%, ${FREEIO_GREEN} ${(filters.priceMax / PRICE_MAX) * 100}%, #e8ecef ${(filters.priceMax / PRICE_MAX) * 100}%, #e8ecef 100%)`,
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
            className="absolute left-0 top-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-[#5BBB7B] opacity-0"
          />
        </div>
      </FilterSection>

      <FilterSection title="Type">
        <SelectField
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
        <SelectField
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
        <SelectField
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
        <SelectField
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

      <FilterSection title="Qualification" className="border-b-0 pb-2">
        <SelectField
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

      <button
        type="button"
        onClick={onSearch}
        className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white transition hover:brightness-95"
        style={{ backgroundColor: FREEIO_GREEN }}
      >
        <Search className="h-5 w-5" />
        Search
      </button>
    </aside>
  )
}
