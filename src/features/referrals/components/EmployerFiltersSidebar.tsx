import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import {
  EMPLOYER_CATEGORY_OPTIONS,
  EMPLOYER_LOCATION_OPTIONS,
} from '@/features/referrals/data/employers'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const CATEGORY_VISIBLE = 5

export type EmployerFiltersState = {
  categories: string[]
  locations: string[]
  foundedFrom: number
  foundedTo: number
}

type EmployerFiltersSidebarProps = {
  filters: EmployerFiltersState
  onChange: (next: EmployerFiltersState) => void
  onSearch: () => void
  className?: string
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function EmployerFiltersSidebar({
  filters,
  onChange,
  onSearch,
  className,
}: EmployerFiltersSidebarProps) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const categories = showAllCategories
    ? EMPLOYER_CATEGORY_OPTIONS
    : EMPLOYER_CATEGORY_OPTIONS.slice(0, CATEGORY_VISIBLE)

  return (
    <aside
      className={cn(
        'rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      <div>
        <h3 className="text-base font-bold text-[#222]">Categories</h3>
        <ul className="mt-4 space-y-3">
          {categories.map((option) => {
            const checked = filters.categories.includes(option.value)
            return (
              <li key={option.value}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#6b7280]">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        categories: toggleValue(filters.categories, option.value),
                      })
                    }
                    className="h-[18px] w-[18px] shrink-0 rounded-[3px] border border-[#cfd4d9] accent-[#5BBB7B]"
                  />
                  <span className={cn(checked && 'font-medium text-[#222]')}>
                    {option.label}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
        {EMPLOYER_CATEGORY_OPTIONS.length > CATEGORY_VISIBLE ? (
          <button
            type="button"
            onClick={() => setShowAllCategories((value) => !value)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#222] transition hover:text-[#5BBB7B]"
          >
            {showAllCategories ? 'Show Less' : 'Show More'}
            <ChevronDown
              className={cn('h-4 w-4 transition', showAllCategories && 'rotate-180')}
            />
          </button>
        ) : null}
      </div>

      <div className="mt-8 border-t border-[#eee] pt-6">
        <h3 className="text-base font-bold text-[#222]">Location</h3>
        <div className="relative mt-4">
          <select
            value={filters.locations[0] ?? ''}
            onChange={(event) =>
              onChange({
                ...filters,
                locations: event.target.value ? [event.target.value] : [],
              })
            }
            className="h-12 w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 pr-10 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B]"
          >
            <option value="">Location</option>
            {EMPLOYER_LOCATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        </div>
      </div>

      <div className="mt-8 border-t border-[#eee] pt-6">
        <h3 className="text-base font-bold text-[#222]">Founded Date</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-[#6b7280]">
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
              className="mt-1.5 h-11 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B]"
            />
          </label>
          <label className="block text-xs font-medium text-[#6b7280]">
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
              className="mt-1.5 h-11 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#222] outline-none transition focus:border-[#5BBB7B]"
            />
          </label>
        </div>
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
