import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import {
  CONDITION_OPTIONS,
  FIELD_OPTIONS,
  FIND_OPTIONS,
  MOTIVE_OPTIONS,
  PRICE_OPTIONS,
  PSP_CATEGORIES,
  RADIUS_OPTIONS,
  REFERRAL_OPTIONS,
  REPRESENTATION_OPTIONS,
  type HeroFiltersState,
} from '@/features/search/data/categories'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { PATHS } from '@/app/router/paths'

type ProviderFiltersProps = {
  filters: HeroFiltersState
  onChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  onReset?: () => void
  toSearchParams: () => URLSearchParams
  compact?: boolean
}

export function ProviderFilters({
  filters,
  onChange,
  onReset,
  toSearchParams,
  compact = false,
}: ProviderFiltersProps) {
  const params = toSearchParams()
  const target =
    filters.find === 'agency'
      ? PATHS.employerResults
      : filters.find === 'profile'
        ? PATHS.profileResults
        : PATHS.results
  const resultsHref = `${target}?${params.toString()}`

  return (
    <div
      className={
        compact
          ? 'space-y-3'
          : 'space-y-4 rounded-2xl border border-line/80 bg-paper/95 p-4 shadow-soft backdrop-blur sm:p-5'
      }
    >
      {!compact ? (
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Find a provider
            </p>
            <h3 className="font-display text-xl font-bold text-ink">Stop browsing. Start matching.</h3>
          </div>
          {onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="text-sm font-medium text-muted underline-offset-2 hover:text-brand hover:underline"
            >
              Reset
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Find"
          placeholder="Service"
          options={FIND_OPTIONS}
          value={filters.find}
          onChange={(e) => onChange('find', e.target.value)}
        />
        <Select
          label="A–Z PSP's Multi-Select"
          placeholder="Select category"
          options={PSP_CATEGORIES}
          value={filters.pspCategory}
          onChange={(e) => onChange('pspCategory', e.target.value)}
        />
        <Select
          label="Representation (If RE Agent Selected)"
          placeholder="Any"
          options={REPRESENTATION_OPTIONS}
          value={filters.representation}
          onChange={(e) => onChange('representation', e.target.value)}
        />
        <Select
          label="Field"
          placeholder="Any field"
          options={FIELD_OPTIONS}
          value={filters.field}
          onChange={(e) => onChange('field', e.target.value)}
        />
        <Select
          label="Condition"
          placeholder="Any"
          options={CONDITION_OPTIONS}
          value={filters.condition}
          onChange={(e) => onChange('condition', e.target.value)}
        />
        <Select
          label="Price demography"
          placeholder="Any"
          options={PRICE_OPTIONS}
          value={filters.priceBand}
          onChange={(e) => onChange('priceBand', e.target.value)}
        />
        <Select
          label="Motive"
          placeholder="Any"
          options={MOTIVE_OPTIONS}
          value={filters.motive}
          onChange={(e) => onChange('motive', e.target.value)}
        />
        <Select
          label="Referral"
          placeholder="Any"
          options={REFERRAL_OPTIONS}
          value={filters.referral}
          onChange={(e) => onChange('referral', e.target.value)}
        />
        <Input
          label="ZIP code"
          name="zip"
          value={filters.zip}
          onChange={(e) => onChange('zip', e.target.value)}
          placeholder="93728"
        />
        <Select
          label="Mile radius"
          options={RADIUS_OPTIONS}
          value={filters.radius}
          onChange={(e) => onChange('radius', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Filters apply to referrals results within your selected radius.
        </p>
        <div className="flex gap-2">
          <Link to={resultsHref} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto" size="lg">
              Search providers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
