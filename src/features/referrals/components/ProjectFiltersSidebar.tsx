import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const VISIBLE = 5

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

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function CheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? options : options.slice(0, VISIBLE)

  return (
    <div>
      <h3 className="text-base font-bold text-[#222]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {visible.map((option) => {
          const checked = selected.includes(option)
          return (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#6b7280]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(option)}
                  className="h-[18px] w-[18px] shrink-0 rounded-[3px] border border-[#cfd4d9] accent-[#5BBB7B]"
                />
                <span className={cn(checked && 'font-medium text-[#222]')}>{option}</span>
              </label>
            </li>
          )
        })}
      </ul>
      {options.length > VISIBLE ? (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#222] transition hover:text-[#5BBB7B]"
        >
          {showAll ? 'Show Less' : 'Show More'}
          <ChevronDown className={cn('h-4 w-4 transition', showAll && 'rotate-180')} />
        </button>
      ) : null}
    </div>
  )
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
    <aside
      className={cn(
        'rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      <CheckboxGroup
        title="Category"
        options={categoryOptions}
        selected={filters.categories}
        onToggle={(value) =>
          onChange({ ...filters, categories: toggleValue(filters.categories, value) })
        }
      />

      <div className="mt-8 border-t border-[#eee] pt-6">
        <h3 className="text-base font-bold text-[#222]">Project type</h3>
        <div className="relative mt-4">
          <select
            value={filters.projectType}
            onChange={(event) =>
              onChange({
                ...filters,
                projectType: event.target.value as ProjectFiltersState['projectType'],
              })
            }
            className="h-12 w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 pr-10 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B]"
          >
            <option value="">Project type</option>
            <option value="Fixed">Fixed project</option>
            <option value="Hourly">Hourly Based Project</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        </div>
      </div>

      <div className="mt-8 border-t border-[#eee] pt-6">
        <h3 className="text-base font-bold text-[#222]">Price</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-[#6b7280]">
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
              className="mt-1.5 h-11 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B]"
            />
          </label>
          <label className="block text-xs font-medium text-[#6b7280]">
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
              className="mt-1.5 h-11 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B]"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 border-t border-[#eee] pt-6">
        <CheckboxGroup
          title="Skills"
          options={skillOptions}
          selected={filters.skills}
          onToggle={(value) =>
            onChange({ ...filters, skills: toggleValue(filters.skills, value) })
          }
        />
      </div>

      <div className="mt-8 border-t border-[#eee] pt-6">
        <CheckboxGroup
          title="Cities"
          options={cityOptions}
          selected={filters.cities}
          onToggle={(value) =>
            onChange({ ...filters, cities: toggleValue(filters.cities, value) })
          }
        />
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition hover:brightness-95"
        style={{ backgroundColor: FREEIO_GREEN }}
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </aside>
  )
}
