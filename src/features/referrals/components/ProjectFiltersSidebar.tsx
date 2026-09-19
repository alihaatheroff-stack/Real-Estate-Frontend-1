import { ChevronDown } from 'lucide-react'
import {
  FilterAside,
  FilterCheckboxGroup,
  FilterSearchButton,
  toggleFilterValue,
} from '@/features/referrals/components/filters/filterPrimitives'

export type ProjectFiltersState = {
  categories: string[]
  projectType: '' | 'Fixed' | 'Hourly'
  priceMin: number
  priceMax: number
  skills: string[]
  cities: string[]
}

type ProjectFiltersSidebarProps = {
  filters: ProjectFiltersState
  onChange: (next: ProjectFiltersState) => void
  onSearch: () => void
  categoryOptions: string[]
  skillOptions: string[]
  cityOptions: string[]
  className?: string
}

export function ProjectFiltersSidebar({
  filters,
  onChange,
  onSearch,
  categoryOptions,
  skillOptions,
  cityOptions,
  className,
}: ProjectFiltersSidebarProps) {
  return (
    <FilterAside className={className}>
      <FilterCheckboxGroup
        title="Category"
        options={categoryOptions}
        selected={filters.categories}
        onToggle={(value) =>
          onChange({ ...filters, categories: toggleFilterValue(filters.categories, value) })
        }
        initialVisible={5}
        expandStyle="chevron"
        density="compact"
      />

      <div className="mt-8 border-t border-freeio-border-soft pt-6">
        <h3 className="text-base font-bold text-freeio-ink">Project type</h3>
        <div className="relative mt-4">
          <select
            value={filters.projectType}
            onChange={(event) =>
              onChange({
                ...filters,
                projectType: event.target.value as ProjectFiltersState['projectType'],
              })
            }
            className="h-12 w-full appearance-none rounded-lg border border-freeio-border bg-white px-4 pr-10 text-sm text-freeio-ink outline-none transition focus:border-freeio"
          >
            <option value="">Project type</option>
            <option value="Fixed">Fixed project</option>
            <option value="Hourly">Hourly Based Project</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-freeio-subtle" />
        </div>
      </div>

      <div className="mt-8 border-t border-freeio-border-soft pt-6">
        <h3 className="text-base font-bold text-freeio-ink">Price</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-freeio-muted">
            Min
            <input
              type="number"
              min={0}
              max={filters.priceMax}
              value={filters.priceMin}
              onChange={(event) =>
                onChange({
                  ...filters,
                  priceMin: Number(event.target.value) || 0,
                })
              }
              className="mt-1.5 h-11 w-full rounded-lg border border-freeio-border px-3 text-sm text-freeio-ink outline-none transition focus:border-freeio"
            />
          </label>
          <label className="block text-xs font-medium text-freeio-muted">
            Max
            <input
              type="number"
              min={filters.priceMin}
              max={500}
              value={filters.priceMax}
              onChange={(event) =>
                onChange({
                  ...filters,
                  priceMax: Number(event.target.value) || 200,
                })
              }
              className="mt-1.5 h-11 w-full rounded-lg border border-freeio-border px-3 text-sm text-freeio-ink outline-none transition focus:border-freeio"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 border-t border-freeio-border-soft pt-6">
        <FilterCheckboxGroup
          title="Skills"
          options={skillOptions}
          selected={filters.skills}
          onToggle={(value) =>
            onChange({ ...filters, skills: toggleFilterValue(filters.skills, value) })
          }
          initialVisible={5}
          expandStyle="chevron"
          density="compact"
        />
      </div>

      <div className="mt-8 border-t border-freeio-border-soft pt-6">
        <FilterCheckboxGroup
          title="Cities"
          options={cityOptions}
          selected={filters.cities}
          onToggle={(value) =>
            onChange({ ...filters, cities: toggleFilterValue(filters.cities, value) })
          }
          initialVisible={5}
          expandStyle="chevron"
          density="compact"
        />
      </div>

      <FilterSearchButton onClick={onSearch} size="md" />
    </FilterAside>
  )
}
