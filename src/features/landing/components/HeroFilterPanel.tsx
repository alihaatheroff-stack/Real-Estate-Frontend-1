import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { ReferralShareInput } from '@/components/ui/ReferralShareInput'
import { PATHS } from '@/app/router/paths'
import {
  HeroFilterSelect,
  BUYING_TREE,
  CLIENT_EXPERIENCE_TREE,
  CLIENT_MOTIVE_OPTIONS,
  FIELD_TREE,
  FIND_FILTER_OPTIONS,
  FORM_OF_PAYMENT_TREE,
  LANGUAGE_BY_LETTER,
  PRICE_DEMOGRAPHY_OPTIONS,
  PROPERTY_CONDITION_OPTIONS,
  PSP_BY_LETTER,
  PSP_NESTED_TREES,
  REPRESENTATION_TOP_TREE,
  SALE_TYPE_TREE,
  SERVICE_DISTANCE_DEFAULT,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  TITLE_OPTIONS,
  VACANCY_OPTIONS,
  YOUR_EXPERIENCE_OPTIONS,
  joinCsv,
  splitCsv,
  type HeroFiltersState,
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

export function HeroFilterPanel({
  filters,
  onChange,
  toSearchParams,
  className,
}: HeroFilterPanelProps) {
  const [saveAsDefault, setSaveAsDefault] = useState(false)

  const params = toSearchParams()
  const findLabels = splitCsv(filters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })
  const target = findLabels.includes('Office')
    ? PATHS.employerResults
    : findLabels.includes('Profile')
      ? PATHS.profileResults
      : PATHS.results
  const resultsHref = `${target}?${params.toString()}`

  const representation = splitCsv(filters.representation)
  const selectedPsp = splitCsv(filters.pspCategory)
  const selectedFields = splitCsv(filters.field)
  const showRepresentation = selectedPsp.some(
    (value) => value === 'Agent' || value.startsWith('Agent > '),
  )
  const showBuying = representation.some(
    (value) => value === 'Buying' || value === 'Mortgage',
  )
  const radiusMiles = Number(filters.radius || SERVICE_DISTANCE_DEFAULT)

  function setFilterList(key: keyof HeroFiltersState, next: string[]) {
    if (key === 'find') {
      const mapped = next.map((label) => {
        if (label === 'Service') return 'service'
        if (label === 'Profile') return 'profile'
        if (label === 'Office') return 'agency'
        return label
      })
      onChange(key, joinCsv(mapped) as HeroFiltersState[typeof key])
      return
    }
    if (key === 'pspCategory') {
      onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
      const stillAgent = next.some(
        (value) => value === 'Agent' || value.startsWith('Agent > '),
      )
      if (!stillAgent) {
        onChange('representation', '')
        onChange('financing', '')
      }
      return
    }
    if (key === 'representation') {
      onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
      const stillBuying = next.some(
        (value) => value === 'Buying' || value === 'Mortgage',
      )
      if (!stillBuying) onChange('financing', '')
      return
    }
    onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
  }

  return (
    <div
      className={cn(
        'animate-hero-panel-in flex w-full flex-col overflow-hidden rounded-lg border border-white/50 bg-white/35 shadow-sm backdrop-blur-md',
        className,
      )}
    >
      <div className="landing-scroll-pane max-h-[28.5rem] overflow-x-hidden overflow-y-auto px-1.5 pt-1 pb-1.5">
        <div className="flex flex-col gap-1">
          <HeroFilterSelect
            compact
            label="Search By: "
            placeholder="Ex. (Service, Profile, Office)"
            options={FIND_FILTER_OPTIONS}
            value={findLabels}
            onChange={(next) => setFilterList('find', next)}
          />

          <HeroFilterSelect
            compact
            label="A-Z Psp's: "
            placeholder="Ex. (Agent, Architect, Real Estate, etc.,)"
            optionsByLetter={PSP_BY_LETTER}
            nestedTrees={PSP_NESTED_TREES}
            showLetterSuggest
            value={selectedPsp}
            onChange={(next) => setFilterList('pspCategory', next)}
          />

          {showRepresentation ? (
            <HeroFilterSelect
              compact
              label="Representation (If RE Agent Selected): *"
              placeholder="Ex. (Buying, Mortgage, etc.,)"
              tree={REPRESENTATION_TOP_TREE}
              value={representation}
              onChange={(next) => setFilterList('representation', next)}
            />
          ) : null}
          {showBuying ? (
            <HeroFilterSelect
              compact
              label="Buying (If Buying, Mortgage get Selected):"
              placeholder="Ex. (Buying, Mortgage, etc.,)"
              tree={BUYING_TREE}
              value={splitCsv(filters.financing)}
              onChange={(next) => setFilterList('financing', next)}
            />
          ) : null}
          <HeroFilterSelect
            compact
            label="Fields: "
            placeholder="Ex. (Commercial, Agriculture, etc.,)"
            tree={FIELD_TREE}
            value={selectedFields}
            onChange={(next) => setFilterList('field', next)}
          />

          <HeroFilterSelect
            compact
            label="Client Experience:"
            placeholder="Ex. (Beginner, Intermediate, Expert etc.,)"
            tree={CLIENT_EXPERIENCE_TREE}
            value={splitCsv(filters.clientExperience)}
            onChange={(next) => setFilterList('clientExperience', next)}
          />



          <HeroFilterSelect
            compact
            label="Property Condition:"
            placeholder="Ex. (New Construction, Burned down, etc.,)"
            options={PROPERTY_CONDITION_OPTIONS}
            value={splitCsv(filters.condition)}
            onChange={(next) => setFilterList('condition', next)}
          />

          <HeroFilterSelect
            compact
            label="Vacancy:"
            placeholder="Ex. (Vacant, Tenant-Occupied, etc.,)"
            options={VACANCY_OPTIONS}
            value={splitCsv(filters.vacancy)}
            onChange={(next) => setFilterList('vacancy', next)}
          />

          <HeroFilterSelect
            compact
            label="Title:"
            placeholder="Ex. (Partnership, Tenancy, Sole,  etc.,)"
            options={TITLE_OPTIONS}
            value={splitCsv(filters.propertyTitle)}
            onChange={(next) => setFilterList('propertyTitle', next)}
          />

          <HeroFilterSelect
            compact
            label="Sale Type:"
            placeholder="Ex. (Standard, Clear, Lien, etc.,)"
            tree={SALE_TYPE_TREE}
            value={splitCsv(filters.saleType)}
            onChange={(next) => setFilterList('saleType', next)}
          />

          <HeroFilterSelect
            compact
            label="Recipient Experience:"
            placeholder="Ex. (Expert, Intermediate, Beginner, etc.,)"
            options={YOUR_EXPERIENCE_OPTIONS}
            value={splitCsv(filters.yourExperience)}
            onChange={(next) => setFilterList('yourExperience', next)}
          />

          <HeroFilterSelect
            compact
            label="Motive's:"
            placeholder="Ex. (A.Have to, D.Wasting Time, etc.,)"
            options={CLIENT_MOTIVE_OPTIONS}
            value={splitCsv(filters.motive)}
            onChange={(next) => setFilterList('motive', next)}
          />
          <HeroFilterSelect
            compact
            letterHeading="underline"
            label="Languages Spoken:"
            placeholder="Ex. (Mandrin, English, Spanish, etc.,)"
            optionsByLetter={LANGUAGE_BY_LETTER}
            value={splitCsv(filters.language)}
            onChange={(next) => setFilterList('language', next)}
          />

          <ReferralShareInput
            compact
            label="Referral Share:"
            value={filters.percentageShare}
            onChange={(value) => onChange('percentageShare', value)}
          />

          <HeroFilterSelect
            compact
            label="Form Of Payment:"
            placeholder="Ex. (Cash, Check, Credit Card etc.,)"
            tree={FORM_OF_PAYMENT_TREE}
            value={splitCsv(filters.formOfPayment)}
            onChange={(next) => setFilterList('formOfPayment', next)}
          />

          <HeroFilterSelect
            compact
            label="Price Demography: "
            placeholder="Ex. (Affordable, Mid-Range, Luxury etc.,)"
            options={PRICE_DEMOGRAPHY_OPTIONS}
            value={splitCsv(filters.priceBand)}
            onChange={(next) => setFilterList('priceBand', next)}
          />

          <div className="relative shrink-0 overflow-visible">
            <label className="block truncate text-xs font-bold leading-4 text-black">
              Zipcode
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={filters.zip}
              onChange={(e) => onChange('zip', e.target.value)}
              placeholder="Zipcode..."
              className="mt-0.5 h-7 w-full rounded-md border border-black bg-white px-2 text-[11px] text-ink outline-none placeholder:text-[11px] placeholder:text-ink/55 focus:ring-1 focus:ring-brand/30"
            />
          </div>

          <div className="relative shrink-0 overflow-visible">
            <div className="flex items-baseline justify-between gap-2">
              <label className="block truncate text-xs font-bold leading-4 text-black">
                Mile Radius
              </label>
              <span className="shrink-0 text-[11px] font-medium text-ink/70">
                {radiusMiles} mi
              </span>
            </div>
            <RangeSlider
              variant="freeio"
              min={SERVICE_DISTANCE_MIN}
              max={SERVICE_DISTANCE_MAX}
              value={radiusMiles}
              onChange={(value) => onChange('radius', String(value))}
              className="mt-1 space-y-0 px-1.5 py-0.5"
            />
          </div>
        </div>
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
