import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'
import {
  LandingFilterFields,
  joinCsv,
  splitCsv,
  type HeroFiltersState,
  type LandingFilterValues,
} from '@/features/search'
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

function toLandingValues(filters: HeroFiltersState): LandingFilterValues {
  const findLabels = splitCsv(filters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })

  return {
    find: findLabels,
    psp: splitCsv(filters.pspCategory),
    representation: splitCsv(filters.representation),
    financing: splitCsv(filters.financing),
    field: splitCsv(filters.field),
    clientExperience: splitCsv(filters.clientExperience),
    condition: splitCsv(filters.condition),
    vacancy: splitCsv(filters.vacancy),
    propertyTitle: splitCsv(filters.propertyTitle),
    saleType: splitCsv(filters.saleType),
    yourExperience: splitCsv(filters.yourExperience),
    motive: splitCsv(filters.motive),
    language: splitCsv(filters.language),
    percentageShare: filters.percentageShare,
    formOfPayment: splitCsv(filters.formOfPayment),
    priceBand: splitCsv(filters.priceBand),
    zip: filters.zip,
    radius: filters.radius,
  }
}

export function HeroFilterPanel({
  filters,
  onChange,
  toSearchParams,
  className,
}: HeroFilterPanelProps) {
  const [saveAsDefault, setSaveAsDefault] = useState(false)

  const params = toSearchParams()
  const values = toLandingValues(filters)
  const target = values.find.includes('Office')
    ? PATHS.employerResults
    : values.find.includes('Profile')
      ? PATHS.profileResults
      : PATHS.results
  const resultsHref = `${target}?${params.toString()}`

  function handleChange<K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) {
    if (key === 'percentageShare') {
      onChange('percentageShare', next as string)
      return
    }
    if (key === 'zip') {
      onChange('zip', next as string)
      return
    }
    if (key === 'radius') {
      onChange('radius', next as string)
      return
    }

    const list = next as string[]

    if (key === 'find') {
      const mapped = list.map((label) => {
        if (label === 'Service') return 'service'
        if (label === 'Profile') return 'profile'
        if (label === 'Office') return 'agency'
        return label
      })
      onChange('find', joinCsv(mapped))
      return
    }

    if (key === 'psp') {
      onChange('pspCategory', joinCsv(list))
      const stillAgent = list.some(
        (value) => value === 'Agent' || value.startsWith('Agent > '),
      )
      if (!stillAgent) {
        onChange('representation', '')
        onChange('financing', '')
      }
      return
    }

    if (key === 'representation') {
      onChange('representation', joinCsv(list))
      const stillBuying = list.some(
        (value) => value === 'Buying' || value === 'Mortgage',
      )
      if (!stillBuying) onChange('financing', '')
      return
    }

    const heroKey = key as keyof HeroFiltersState
    onChange(heroKey, joinCsv(list) as HeroFiltersState[typeof heroKey])
  }

  return (
    <div
      className={cn(
        'animate-hero-panel-in flex w-full flex-col overflow-hidden rounded-lg border border-white/50 bg-white/35 shadow-sm backdrop-blur-md',
        className,
      )}
    >
      <div className="landing-scroll-pane max-h-[28.5rem] overflow-x-hidden overflow-y-auto px-1.5 pt-1 pb-1.5">
        <LandingFilterFields value={values} onChange={handleChange} />
      </div>

      <div className="relative z-30 shrink-0 space-y-1 border-t border-ink/15 bg-white/95 px-1.5 pb-1.5 pt-1.5">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={saveAsDefault}
            onChange={(e) => setSaveAsDefault(e.target.checked)}
            className="h-3.5 w-3.5 rounded-none border-ink/40 accent-brand"
          />
          <span className="text-xs font-medium text-black">Save as default</span>
        </label>
        <Link to={resultsHref} className="block">
          <Button
            className="h-8 w-full rounded-md text-xs tracking-wide"
            size="sm"
            leftIcon={<Search className="h-3.5 w-3.5" />}
          >
            SEARCH
          </Button>
        </Link>
      </div>
    </div>
  )
}
