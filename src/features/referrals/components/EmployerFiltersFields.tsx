import { ChevronDown, Search } from 'lucide-react'
import { RangeSlider } from '@/components/ui/RangeSlider'
import {
  getEmployerCategoryOptions,
  getEmployerLocationOptions,
} from '@/features/referrals/api/repository'
import {
  FilterCheckboxGroup,
  FilterSearchButton,
  FilterSection,
  toggleFilterValue,
} from '@/features/referrals/components/filters/filterPrimitives'
import {
  EMPLOYER_DISTANCE_DEFAULT,
  EMPLOYER_DISTANCE_MAX,
  EMPLOYER_DISTANCE_MIN,
  type EmployerFiltersState,
} from '@/features/referrals/model/employerFilters'
import { cn } from '@/shared/lib/cn'

type EmployerFiltersFieldsProps = {
  variant: 'sidebar' | 'drawer'
  filters: EmployerFiltersState
  onChange: (next: EmployerFiltersState) => void
  onSearch: () => void
}

/**
 * Shared employer filter fields. Sidebar vs drawer keep their original
 * typography/spacing via `variant` so UI stays identical.
 */
export function EmployerFiltersFields({
  variant,
  filters,
  onChange,
  onSearch,
}: EmployerFiltersFieldsProps) {
  const categoryOptions = getEmployerCategoryOptions()
  const locationOptions = getEmployerLocationOptions()
  const isDrawer = variant === 'drawer'

  const categoriesList = (
    <FilterCheckboxGroup
      title={isDrawer ? undefined : 'Categories'}
      options={categoryOptions.map((option) => ({
        label: option.label,
        value: option.value,
      }))}
      selected={filters.categories}
      onToggle={(value) =>
        onChange({
          ...filters,
          categories: toggleFilterValue(filters.categories, value),
        })
      }
      initialVisible={5}
      expandStyle="chevron"
      density={isDrawer ? 'comfortable' : 'compact'}
    />
  )

  const locationSelect = (
    <div className={cn('relative', !isDrawer && 'mt-4')}>
      <select
        value={filters.locations[0] ?? ''}
        onChange={(event) =>
          onChange({
            ...filters,
            locations: event.target.value ? [event.target.value] : [],
          })
        }
        className="h-12 w-full appearance-none rounded-lg border border-freeio-border bg-white px-4 pr-10 text-sm text-freeio-ink outline-none transition focus:border-freeio"
      >
        <option value="">Location</option>
        {locationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle" />
    </div>
  )

  const distanceBlock = (
    <div className={cn(!isDrawer && 'mt-5')}>
      <p
        className={cn(
          'mb-3 text-freeio-muted',
          isDrawer ? 'text-[15px]' : 'text-sm',
        )}
      >
        Distance: {filters.radiusMiles || EMPLOYER_DISTANCE_DEFAULT} miles
      </p>
      <RangeSlider
        min={EMPLOYER_DISTANCE_MIN}
        max={EMPLOYER_DISTANCE_MAX}
        value={filters.radiusMiles || EMPLOYER_DISTANCE_DEFAULT}
        onChange={(value) =>
          onChange({
            ...filters,
            radiusMiles: value,
          })
        }
      />
    </div>
  )

  const foundedFields = (
    <div className={cn('grid grid-cols-2 gap-3', !isDrawer && 'mt-4')}>
      <label className="block text-xs font-medium text-freeio-muted">
        From
        <input
          type="number"
          min={1885}
          max={filters.foundedTo}
          value={filters.foundedFrom}
          onChange={(event) =>
            onChange({
              ...filters,
              foundedFrom: Number(event.target.value) || 1885,
            })
          }
          className="mt-1.5 h-11 w-full rounded-lg border border-freeio-border px-3 text-sm text-freeio-ink outline-none transition focus:border-freeio"
        />
      </label>
      <label className="block text-xs font-medium text-freeio-muted">
        To
        <input
          type="number"
          min={filters.foundedFrom}
          max={2026}
          value={filters.foundedTo}
          onChange={(event) =>
            onChange({
              ...filters,
              foundedTo: Number(event.target.value) || 2026,
            })
          }
          className="mt-1.5 h-11 w-full rounded-lg border border-freeio-border px-3 text-sm text-freeio-ink outline-none transition focus:border-freeio"
        />
      </label>
    </div>
  )

  if (isDrawer) {
    return (
      <>
        <FilterSection title="Categories" variant="drawer">
          {categoriesList}
        </FilterSection>
        <FilterSection title="Location" variant="drawer">
          <div className="space-y-5">
            {locationSelect}
            {distanceBlock}
          </div>
        </FilterSection>
        <FilterSection title="Founded Date" variant="drawer">
          {foundedFields}
        </FilterSection>
        <div className="px-6 py-6">
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-freeio text-base font-semibold text-white transition hover:brightness-95"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div>{categoriesList}</div>
      <div className="mt-8 border-t border-freeio-border-soft pt-6">
        <h3 className="text-base font-bold text-freeio-ink">Location</h3>
        {locationSelect}
        {distanceBlock}
      </div>
      <div className="mt-8 border-t border-freeio-border-soft pt-6">
        <h3 className="text-base font-bold text-freeio-ink">Founded Date</h3>
        {foundedFields}
      </div>
      <FilterSearchButton onClick={onSearch} size="md" className="mt-8" />
    </>
  )
}
