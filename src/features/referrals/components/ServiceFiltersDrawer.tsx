import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { DualRangeSlider, RangeSlider } from '@/components/ui/RangeSlider'
import { Select } from '@/components/ui/Select'
import {
  DATE_POSTED_OPTIONS,
  DELIVERY_TIME_OPTIONS,
  ENGLISH_LEVEL_OPTIONS,
  PSP_CATEGORIES,
  REGIONS_OPTIONS,
  RESPONSE_TIME_OPTIONS,
  SERVICE_BUDGET_MAX,
  SERVICE_BUDGET_MIN,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  type HeroFiltersState,
} from '@/features/search/data/categories'
import { cn } from '@/shared/lib/cn'
import { formatCurrency } from '@/shared/lib/format'

type ServiceFiltersDrawerProps = {
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
    <section className="border-b border-line px-6 py-5">
      <h3 className="mb-4 text-lg font-semibold text-ink">{title}</h3>
      {children}
    </section>
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
    <Select
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="text-[15px] text-muted"
      labelClassName="text-[15px]"
    />
  )
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
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-line text-brand focus:ring-brand/30"
      />
      <span>{label}</span>
    </label>
  )
}

function ExpandableCheckboxList({
  options,
  selected,
  onToggle,
  initialVisible = 5,
}: {
  options: { label: string; value: string }[]
  selected: string
  onToggle: (value: string) => void
  initialVisible?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? options : options.slice(0, initialVisible)
  const hiddenCount = options.length - initialVisible

  return (
    <div>
      <div className="space-y-0.5">
        {visible.map((option) => (
          <CheckboxRow
            key={option.value}
            label={option.label}
            checked={selected === option.value}
            onChange={() => onToggle(selected === option.value ? '' : option.value)}
          />
        ))}
      </div>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:text-brand-dark"
        >
          <Plus className={cn('h-4 w-4 transition', expanded && 'rotate-45')} />
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      ) : null}
    </div>
  )
}

export function ServiceFiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  onApply,
}: ServiceFiltersDrawerProps) {
  const priceFrom = Number(filters.priceFrom || SERVICE_BUDGET_MIN)
  const priceTo = Number(filters.priceTo || SERVICE_BUDGET_MAX)
  const distance = Number(filters.radius || SERVICE_DISTANCE_MIN)

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
        className="relative flex h-full w-full max-w-[400px] flex-col bg-paper shadow-2xl animate-drawer-in"
        aria-label="All filters"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-ink">All Filters</h2>
            <button
              type="button"
              onClick={onReset}
              className="mt-1 text-[15px] font-medium text-muted hover:text-brand hover:underline"
            >
              Reset all
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-muted transition hover:text-brand"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <FilterSection title="Categories">
            <ExpandableCheckboxList
              options={PSP_CATEGORIES}
              selected={filters.pspCategory}
              onToggle={(value) => onChange('pspCategory', value)}
            />
          </FilterSection>

          <FilterSection title="Date Posted">
            <ExpandableCheckboxList
              options={DATE_POSTED_OPTIONS}
              selected={filters.datePosted}
              onToggle={(value) => onChange('datePosted', value || 'all')}
            />
          </FilterSection>

          <FilterSection title="Response Time">
            <FilterSelect
              placeholder="Response Time"
              options={RESPONSE_TIME_OPTIONS.filter((option) => option.value !== '')}
              value={filters.responseTime}
              onChange={(value) => onChange('responseTime', value)}
            />
          </FilterSection>

          <FilterSection title="Delivery Time">
            <FilterSelect
              placeholder="Delivery Time"
              options={DELIVERY_TIME_OPTIONS.filter((option) => option.value !== '')}
              value={filters.deliveryTime}
              onChange={(value) => onChange('deliveryTime', value)}
            />
          </FilterSection>

          <FilterSection title="Budget">
            <DualRangeSlider
              min={SERVICE_BUDGET_MIN}
              max={SERVICE_BUDGET_MAX}
              from={priceFrom}
              to={priceTo}
              onChange={(from, to) => {
                onChange('priceFrom', String(from))
                onChange('priceTo', String(to))
              }}
              formatLabel={(from, to) =>
                `${formatCurrency(from)} - ${formatCurrency(to)}`
              }
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

          <FilterSection title="Regions">
            <FilterSelect
              placeholder="Regions"
              options={REGIONS_OPTIONS}
              value={filters.region}
              onChange={(value) => onChange('region', value)}
            />
          </FilterSection>

          <FilterSection title="Location">
            <div className="space-y-4">
              <Input
                name="location"
                value={filters.zip}
                onChange={(e) => onChange('zip', e.target.value)}
                placeholder="Enter location or ZIP"
                className="text-[15px]"
              />

              <div>
                <p className="mb-3 text-[15px] text-muted">Distance: {distance} miles</p>
                <RangeSlider
                  min={SERVICE_DISTANCE_MIN}
                  max={SERVICE_DISTANCE_MAX}
                  value={distance}
                  onChange={(value) => onChange('radius', String(value))}
                />
              </div>

              <Button
                className="h-12 w-full rounded-xl text-base"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => {
                  onApply()
                  onClose()
                }}
              >
                Find Service
              </Button>
            </div>
          </FilterSection>
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
