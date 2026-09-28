import { Search, X } from 'lucide-react'
import {
  EMPTY_GROUP_FILTERS,
  GROUP_GEOGRAPHIES,
  GROUP_INDUSTRIES,
  GROUP_INTERESTS,
  GROUP_PROFESSIONAL_ROLES,
  GROUP_SORT_OPTIONS,
  GROUP_STRATEGIES,
  groupFiltersActive,
  type GroupFiltersState,
  type GroupSortId,
} from '@/features/network/data/groupCategories'
import { cn } from '@/shared/lib/cn'

type GroupsFilterBarProps = {
  filters: GroupFiltersState
  onChange: (next: GroupFiltersState) => void
  className?: string
  resultCount?: number
}

const selectClass =
  'h-10 w-full rounded-lg border border-transparent bg-[#F0F2F5] px-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'

function FilterSelect({
  label,
  value,
  onChange,
  placeholder,
  options,
  allowEmpty = true,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: readonly string[] | { label: string; value: string }[]
  allowEmpty?: boolean
}) {
  const normalized = options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option,
  )

  return (
    <label className="flex min-w-0 flex-col gap-1 text-xs font-semibold text-muted">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
        aria-label={label}
      >
        {allowEmpty ? <option value="">{placeholder}</option> : null}
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function GroupsFilterBar({
  filters,
  onChange,
  className,
  resultCount,
}: GroupsFilterBarProps) {
  const active = groupFiltersActive(filters)

  function patch<K extends keyof GroupFiltersState>(key: K, value: GroupFiltersState[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={filters.query}
          onChange={(event) => patch('query', event.target.value)}
          placeholder="Search by group name or keywords"
          className="h-11 w-full rounded-xl bg-[#F0F2F5] pl-10 pr-10 text-sm outline-none ring-brand/30 focus:ring-2"
          aria-label="Search groups"
        />
        {filters.query ? (
          <button
            type="button"
            onClick={() => patch('query', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-white hover:text-ink"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <FilterSelect
          label="Industry"
          placeholder="All industries"
          options={GROUP_INDUSTRIES}
          value={filters.industry}
          onChange={(value) => patch('industry', value)}
        />
        <FilterSelect
          label="Professional role"
          placeholder="All roles"
          options={GROUP_PROFESSIONAL_ROLES}
          value={filters.professionalRole}
          onChange={(value) => patch('professionalRole', value)}
        />
        <FilterSelect
          label="Geography"
          placeholder="All geographies"
          options={GROUP_GEOGRAPHIES}
          value={filters.geography}
          onChange={(value) => patch('geography', value)}
        />
        <FilterSelect
          label="Strategy"
          placeholder="All strategies"
          options={GROUP_STRATEGIES}
          value={filters.strategy}
          onChange={(value) => patch('strategy', value)}
        />
        <FilterSelect
          label="Interest"
          placeholder="All interests"
          options={GROUP_INTERESTS}
          value={filters.interest}
          onChange={(value) => patch('interest', value)}
        />
        <FilterSelect
          label="Sort by"
          placeholder="Sort by"
          allowEmpty={false}
          options={GROUP_SORT_OPTIONS.map((option) => ({
            label: option.label,
            value: option.id,
          }))}
          value={filters.sort}
          onChange={(value) => patch('sort', value as GroupSortId)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted">
          {typeof resultCount === 'number'
            ? `${resultCount} group${resultCount === 1 ? '' : 's'} match`
            : 'Search, filter, and sort update the list below instantly'}
        </p>
        {active ? (
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_GROUP_FILTERS, sort: filters.sort })}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
