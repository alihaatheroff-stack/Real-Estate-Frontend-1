import { useEffect } from 'react'
import { ArrowLeftToLine, ArrowUpRight } from 'lucide-react'
import { Select } from '@/components/ui/Select'
import {
  ENGLISH_LEVEL_OPTIONS,
  FREELANCER_CATEGORY_OPTIONS,
  FREELANCER_REGION_OPTIONS,
  FREELANCER_TYPE_OPTIONS,
  GENDER_OPTIONS,
  type HeroFiltersState,
} from '@/features/search'
import {
  FilterCheckboxGroup,
  FilterSection,
  toggleFilterValue,
} from '@/features/referrals/components/filters/filterPrimitives'

type ProviderFiltersDrawerProps = {
  open: boolean
  onClose: () => void
  filters: HeroFiltersState
  onChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  onReset: () => void
  onApply: () => void
}

function parseMulti(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function serializeMulti(values: string[]) {
  return values.join(',')
}

function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <Select
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border-freeio-border bg-white pr-10 text-[15px] text-freeio-muted"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-freeio-ink"
      >
        ▼
      </span>
    </div>
  )
}

export function ProviderFiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  onApply,
}: ProviderFiltersDrawerProps) {
  const selectedCategories = parseMulti(filters.pspCategory)
  const selectedRegions = parseMulti(filters.region)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1100] flex">
      <aside
        className="relative flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl animate-drawer-in"
        aria-label="All filters"
      >
        <div className="flex items-center justify-between border-b border-freeio-border-soft px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-freeio-ink">All Filters</h2>
            <button
              type="button"
              onClick={onReset}
              className="mt-1 text-[13px] font-medium text-freeio-muted hover:text-freeio hover:underline"
            >
              Reset all
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-freeio-soft text-freeio-muted transition"
            aria-label="Close filters"
          >
            <ArrowLeftToLine className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <FilterSection title="Categories" variant="drawer">
            <FilterCheckboxGroup
              options={FREELANCER_CATEGORY_OPTIONS}
              selected={selectedCategories}
              onToggle={(value) =>
                onChange(
                  'pspCategory',
                  serializeMulti(toggleFilterValue(selectedCategories, value)),
                )
              }
              initialVisible={5}
            />
          </FilterSection>

          <FilterSection title="Regions" variant="drawer">
            <FilterCheckboxGroup
              options={FREELANCER_REGION_OPTIONS}
              selected={selectedRegions}
              onToggle={(value) =>
                onChange(
                  'region',
                  serializeMulti(toggleFilterValue(selectedRegions, value)),
                )
              }
              initialVisible={5}
            />
          </FilterSection>

          <FilterSection title="Types" variant="drawer">
            <FilterSelect
              placeholder="Types"
              options={FREELANCER_TYPE_OPTIONS}
              value={filters.freelancerType}
              onChange={(value) => onChange('freelancerType', value)}
            />
          </FilterSection>

          <FilterSection title="Gender" variant="drawer">
            <FilterSelect
              placeholder="Gender"
              options={GENDER_OPTIONS}
              value={filters.gender}
              onChange={(value) => onChange('gender', value)}
            />
          </FilterSection>

          <FilterSection title="English Level" variant="drawer">
            <FilterSelect
              placeholder="English Level"
              options={ENGLISH_LEVEL_OPTIONS}
              value={filters.englishLevel}
              onChange={(value) => onChange('englishLevel', value)}
            />
          </FilterSection>

          <div className="px-6 py-6">
            <button
              type="button"
              onClick={() => {
                onApply()
                onClose()
              }}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-freeio text-base font-semibold text-white transition hover:brightness-95"
            >
              Find Listing
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <button
        type="button"
        className="flex-1 bg-ink/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Close filters overlay"
      />
    </div>
  )
}
