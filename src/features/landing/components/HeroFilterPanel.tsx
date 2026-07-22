import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { PATHS } from '@/app/router/paths'
import {
  CONDITION_OPTIONS,
  FIELD_OPTIONS,
  FIND_OPTIONS,
  FINANCING_OPTIONS,
  LANGUAGE_OPTIONS,
  MOTIVE_OPTIONS,
  PRICE_OPTIONS,
  PSP_CATEGORIES,
  RADIUS_OPTIONS,
  REPRESENTATION_OPTIONS,
  SUB_FIELD_OPTIONS,
  type HeroFiltersState,
} from '@/features/search/data/categories'
import { cn } from '@/shared/lib/cn'

type HeroFilterPanelProps = {
  filters: HeroFiltersState
  onChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  toSearchParams: () => URLSearchParams
  className?: string
}

type FilterKey = keyof HeroFiltersState

const ROWS: {
  key: FilterKey
  label: string
  options?: { label: string; value: string }[]
  placeholder?: string
  type?: 'select' | 'input'
  defaultLabel?: string
}[] = [
  {
    key: 'find',
    label: 'Find',
    options: FIND_OPTIONS,
    placeholder: 'Service',
    defaultLabel: 'Save as Default Opt',
  },
  {
    key: 'pspCategory',
    label: "A–Z PSP's Multi-Select",
    options: PSP_CATEGORIES,
    placeholder: 'Real Estate Agent…',
  },
  {
    key: 'representation',
    label: 'Representation (If RE Agent Selected)',
    options: REPRESENTATION_OPTIONS,
    placeholder: 'Selling…',
  },
  {
    key: 'financing',
    label: 'Buying / Mortgage',
    options: FINANCING_OPTIONS,
    placeholder: 'Cash or mortgage',
  },
  {
    key: 'field',
    label: 'Field options',
    options: FIELD_OPTIONS,
    placeholder: 'Commercial…',
  },
  {
    key: 'priceBand',
    label: 'Price demography',
    options: PRICE_OPTIONS,
    placeholder: 'Luxury / Mid…',
  },
  {
    key: 'subField',
    label: 'Sub-field',
    options: SUB_FIELD_OPTIONS,
    placeholder: 'As many as needed',
  },
  {
    key: 'motive',
    label: "Motive's",
    options: MOTIVE_OPTIONS,
    placeholder: 'Urgency',
  },
  {
    key: 'condition',
    label: 'Condition',
    options: CONDITION_OPTIONS,
    placeholder: 'New construction…',
  },
  {
    key: 'language',
    label: 'Language',
    options: LANGUAGE_OPTIONS,
    placeholder: 'Preferred language',
  },
  {
    key: 'zip',
    label: 'ZIP code',
    type: 'input',
  },
  {
    key: 'radius',
    label: 'Mile radius',
    options: RADIUS_OPTIONS,
    placeholder: 'Select mile radius',
  },
]

export function HeroFilterPanel({
  filters,
  onChange,
  toSearchParams,
  className,
}: HeroFilterPanelProps) {
  const [defaults, setDefaults] = useState<Record<string, boolean>>({})
  const params = toSearchParams()
  const target =
    filters.find === 'agency'
      ? PATHS.employerResults
      : filters.find === 'profile'
        ? PATHS.profileResults
        : PATHS.results
  const resultsHref = `${target}?${params.toString()}`

  function toggleDefault(key: string) {
    setDefaults((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div
      className={cn(
        'animate-hero-panel-in flex max-h-[min(70vh,36rem)] w-full flex-col overflow-hidden rounded-2xl border border-white/25 bg-paper/95 shadow-[var(--shadow-panel)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="border-b border-line/80 bg-gradient-to-r from-brand-light/40 to-transparent px-4 py-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
          Find
        </p>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          Filter providers
        </h2>
      </div>

      <div className="landing-scroll-pane flex-1 space-y-3 overflow-y-auto px-3.5 py-3.5">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-end gap-2.5">
            <div className="min-w-0 flex-1">
              {row.type === 'input' ? (
                <Input
                  label={row.label}
                  name={row.key}
                  value={filters[row.key]}
                  onChange={(e) => onChange(row.key, e.target.value)}
                  placeholder="Enter ZIP code"
                  className="h-10 rounded-lg border-line/90 bg-white text-sm"
                />
              ) : (
                <Select
                  label={row.label}
                  options={row.options ?? []}
                  placeholder={row.placeholder ?? 'Any'}
                  value={filters[row.key]}
                  onChange={(e) => onChange(row.key, e.target.value)}
                  className="h-10 rounded-lg border-line/90 bg-white text-sm"
                />
              )}
            </div>
            <label className="mb-1.5 flex min-h-10 max-w-[4.5rem] shrink-0 flex-col items-center justify-center gap-1 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide text-muted">
              {row.defaultLabel ?? 'Default'}
              <input
                type="checkbox"
                checked={Boolean(defaults[row.key])}
                onChange={() => toggleDefault(row.key)}
                className="h-3.5 w-3.5 rounded border-line accent-brand"
                aria-label={`Save ${row.label} as default`}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="border-t border-line/80 bg-mist/40 p-3.5">
        <Link to={resultsHref} className="block">
          <Button className="w-full" size="lg" leftIcon={<Search className="h-4 w-4" />}>
            Search
          </Button>
        </Link>
      </div>
    </div>
  )
}
