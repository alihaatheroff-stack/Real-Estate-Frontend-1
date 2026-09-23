import { useEffect } from 'react'
import { ArrowLeftToLine, ArrowUpRight } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { ResultsBelowLanguageFields } from '@/features/referrals/components/filters/ResultsBelowLanguageFields'
import {
  LandingFilterFields,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  joinCsv,
  splitCsv,
  type HeroFiltersState,
  type LandingFilterValues,
} from '@/features/search'

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

function toLandingValues(filters: HeroFiltersState): LandingFilterValues {
  const findLabels = splitCsv(filters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })

  return {
    role: splitCsv(filters.role ?? ''),
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
    tagSkill: splitCsv(filters.tagSkill ?? ''),
    yourExperience: splitCsv(filters.yourExperience),
    experienceLevel: splitCsv(filters.experienceLevel ?? ''),
    motive: splitCsv(filters.motive),
    language: splitCsv(filters.language),
    percentageShare: splitCsv(filters.percentageShare),
    willingToTrain: splitCsv(filters.willingToTrain),
    formOfPayment: splitCsv(filters.formOfPayment),
    references: splitCsv(filters.referral),
    priceBand: splitCsv(filters.priceBand),
    institution: splitCsv(filters.institution ?? ''),
    purchaseExperience: splitCsv(filters.purchaseExperience ?? ''),
    loanExperience: splitCsv(filters.loanExperience ?? ''),
    whichService: splitCsv(filters.whichService ?? ''),
    govAgencies: splitCsv(filters.govAgencies ?? ''),
    charge: splitCsv(filters.charge ?? ''),
    income: splitCsv(filters.income ?? ''),
    dti: splitCsv(filters.dti ?? ''),
    ltv: splitCsv(filters.ltv ?? ''),
    loanTypes: splitCsv(filters.loanTypes ?? ''),
    loanRateType: splitCsv(filters.loanRateType ?? ''),
    prepaymentPenalty: splitCsv(filters.prepaymentPenalty ?? ''),
    timeDuration: splitCsv(filters.timeDuration ?? ''),
    lengthToClose: splitCsv(filters.lengthToClose ?? ''),
    creditCheck: splitCsv(filters.creditCheck ?? ''),
    prSqFt: splitCsv(filters.prSqFt ?? ''),
    proof: splitCsv(filters.proof ?? ''),
    legalTitle: splitCsv(filters.legalTitle ?? ''),
    zip: filters.zip,
    radius: filters.radius,
  }
}

function isMortgagePsp(list: string[]) {
  return list.some(
    (value) =>
      value === 'Mortgage' ||
      value.startsWith('Mortgage >') ||
      value === 'Mortgage Consultant' ||
      value.startsWith('Mortgage Consultant') ||
      value === 'Mortgage Originator' ||
      value.startsWith('Mortgage Originator') ||
      value === 'Loan' ||
      value.startsWith('Loan >') ||
      value === 'Loan Executive' ||
      value.startsWith('Loan Executive') ||
      value === 'Loan Officer' ||
      value.startsWith('Loan Officer') ||
      value === 'Loan Originator' ||
      value.startsWith('Loan Originator') ||
      value === 'Loan Processor' ||
      value.startsWith('Loan Processor'),
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
  function clearMortgageFields() {
    onChange('institution', '')
    onChange('purchaseExperience', '')
    onChange('loanExperience', '')
    onChange('whichService', '')
    onChange('govAgencies', '')
    onChange('charge', '')
    onChange('income', '')
    onChange('dti', '')
    onChange('ltv', '')
    onChange('loanTypes', '')
    onChange('loanRateType', '')
    onChange('prepaymentPenalty', '')
    onChange('timeDuration', '')
    onChange('lengthToClose', '')
    onChange('creditCheck', '')
  }

  function handleLandingChange<K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) {
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
      const stillAgentProfile = list.some(
        (value) =>
          value === 'Agent' ||
          value.startsWith('Agent > ') ||
          value === 'Broker' ||
          value.startsWith('Broker > ') ||
          value === 'Real Estate' ||
          value.startsWith('Real Estate >') ||
          value === 'Executive' ||
          value.startsWith('Executive >'),
      )
      if (!stillAgentProfile) {
        onChange('representation', '')
        onChange('financing', '')
        onChange('tagSkill', '')
      }
      if (!isMortgagePsp(list)) clearMortgageFields()
      return
    }

    if (key === 'representation') {
      onChange('representation', joinCsv(list))
      onChange('financing', '')
      return
    }

    const heroKey =
      key === 'references' ? 'referral' : (key as keyof HeroFiltersState)
    onChange(heroKey, joinCsv(list) as HeroFiltersState[typeof heroKey])
  }

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
          <div className="px-6 py-2">
            <LandingFilterFields
              value={toLandingValues(filters)}
              onChange={handleLandingChange}
              hideLocation
            />
          </div>
          <ResultsBelowLanguageFields filters={filters} onChange={onChange} />
        </div>

        <div className="shrink-0 space-y-3 border-t border-freeio-border-soft bg-white px-6 py-4">
          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-ink">Zipcode</h3>
            <Input
              name="location"
              value={filters.zip}
              onChange={(e) => onChange('zip', e.target.value)}
              placeholder="Enter location or ZIP"
              className="text-[13px]"
            />
          </div>

          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-ink">Mile Radius</h3>
            <p className="mb-3 text-[13px] text-muted">Distance: {distance} miles</p>
            <RangeSlider
              min={SERVICE_DISTANCE_MIN}
              max={SERVICE_DISTANCE_MAX}
              value={distance}
              onChange={(value) => onChange('radius', String(value))}
            />
          </div>

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
