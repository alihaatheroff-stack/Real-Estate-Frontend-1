import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'
import { Select } from '@/components/ui/Select'
import {
  ENGLISH_LEVEL_OPTIONS,
  FREELANCER_CATEGORY_OPTIONS,
  FREELANCER_REGION_OPTIONS,
  FREELANCER_TYPE_OPTIONS,
  GENDER_OPTIONS,
  type HeroFiltersState,
} from '@/features/search/data/categories'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_GREEN_SOFT = '#E7F6ED'

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

type FilterSectionProps = {
  title: string
  children: ReactNode
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <section className="border-b border-[#eee] px-6 py-5">
      <h3 className="mb-4 text-lg font-bold text-[#222]">{title}</h3>
      {children}
    </section>
  )
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

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2 text-[15px] text-[#222]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[18px] w-[18px] shrink-0 rounded-[3px] border border-[#cfd4d9] accent-[#5BBB7B]"
      />
      <span>{label}</span>
    </label>
  )
}

function ExpandableCheckboxList({
  options,
  selected,
  onChange,
  initialVisible = 5,
}: {
  options: { label: string; value: string }[]
  selected: string[]
  onChange: (next: string[]) => void
  initialVisible?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? options : options.slice(0, initialVisible)
  const hiddenCount = Math.max(0, options.length - initialVisible)

  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
      return
    }
    onChange([...selected, value])
  }

  return (
    <div>
      <div>
        {visible.map((option) => (
          <CheckboxRow
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onChange={() => toggle(option.value)}
          />
        ))}
      </div>
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
        className="rounded-lg border-[#dfe3e8] bg-white pr-10 text-[15px] text-[#6b7280]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#222]"
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
        <div className="flex items-center justify-between border-b border-[#eee] px-6 py-5">
          <h2 className="text-xl font-bold text-[#222]">All Filters</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="text-sm font-medium text-[#6b7280] hover:underline"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition"
              style={{ backgroundColor: FREEIO_GREEN_SOFT, color: '#6b7280' }}
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <FilterSection title="Categories">
            <ExpandableCheckboxList
              options={FREELANCER_CATEGORY_OPTIONS}
              selected={selectedCategories}
              onChange={(next) => onChange('pspCategory', serializeMulti(next))}
              initialVisible={5}
            />
          </FilterSection>

          <FilterSection title="Regions">
            <ExpandableCheckboxList
              options={FREELANCER_REGION_OPTIONS}
              selected={selectedRegions}
              onChange={(next) => onChange('region', serializeMulti(next))}
              initialVisible={5}
            />
          </FilterSection>

          <FilterSection title="Types">
            <FilterSelect
              placeholder="Types"
              options={FREELANCER_TYPE_OPTIONS}
              value={filters.freelancerType}
              onChange={(value) => onChange('freelancerType', value)}
            />
          </FilterSection>

          <FilterSection title="Gender">
            <FilterSelect
              placeholder="Gender"
              options={GENDER_OPTIONS}
              value={filters.gender}
              onChange={(value) => onChange('gender', value)}
            />
          </FilterSection>

          <FilterSection title="English Level">
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
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base font-semibold text-white transition hover:brightness-95"
              style={{ backgroundColor: FREEIO_GREEN }}
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
