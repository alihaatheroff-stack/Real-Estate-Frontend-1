import { RangeSlider } from '@/components/ui/RangeSlider'
import { ReferralShareInput } from '@/components/ui/ReferralShareInput'
import { HeroFilterSelect } from '@/features/search/components/HeroFilterSelect'
import {
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
  TITLE_OPTIONS,
  VACANCY_OPTIONS,
  YOUR_EXPERIENCE_OPTIONS,
} from '@/features/search/data/landingFilterOptions'
import {
  SERVICE_DISTANCE_DEFAULT,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
} from '@/features/search/data/categories'

/** Shared filter values used by landing hero + forums left rail. */
export type LandingFilterValues = {
  find: string[]
  psp: string[]
  representation: string[]
  financing: string[]
  field: string[]
  clientExperience: string[]
  condition: string[]
  vacancy: string[]
  propertyTitle: string[]
  saleType: string[]
  yourExperience: string[]
  motive: string[]
  language: string[]
  percentageShare: string
  formOfPayment: string[]
  priceBand: string[]
  zip: string
  radius: string
}

export const EXPERIENCE_LEVEL_OPTIONS = [
  '1 — Low experience',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10 — High experience',
] as const

type LandingFilterFieldsProps = {
  value: LandingFilterValues
  onChange: <K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) => void
  /** Hide Representation + Buying cascade (forums left rail). */
  hideRepresentation?: boolean
  /** Hide Recipient Experience dropdown (forums left rail). */
  hideRecipientExperience?: boolean
  /** Override Client Experience label (forums uses "Experience:"). */
  experienceLabel?: string
  /** Forums-only: Experience Level 1–10 under Experience. */
  showExperienceLevel?: boolean
  experienceLevel?: string[]
  onExperienceLevelChange?: (next: string[]) => void
  /** Prefix before selected values (forums; not applied to A–Z PSP's). */
  selectedPrefix?: string
  /** Forums: place Search By after Fields instead of at the top. */
  searchByAfterFields?: boolean
  /** Hide Zipcode + Mile Radius (forums moves them into the service-results tail). */
  hideLocation?: boolean
}

/**
 * Canonical filter stack from the landing hero panel.
 * Forums and landing both render this so categories / dropdowns / styling stay in sync.
 */
export function LandingFilterFields({
  value,
  onChange,
  hideRepresentation = false,
  hideRecipientExperience = false,
  experienceLabel = 'Client Experience:',
  showExperienceLevel = false,
  experienceLevel = [],
  onExperienceLevelChange,
  selectedPrefix,
  searchByAfterFields = false,
  hideLocation = false,
}: LandingFilterFieldsProps) {
  const showRepresentation =
    !hideRepresentation &&
    value.psp.some((item) => item === 'Agent' || item.startsWith('Agent > '))
  const showBuying =
    showRepresentation &&
    value.representation.some((item) => item === 'Buying' || item === 'Mortgage')
  const radiusMiles = Number(value.radius || SERVICE_DISTANCE_DEFAULT)

  const searchByField = (
    <HeroFilterSelect
      compact
      selectedPrefix={selectedPrefix}
      label="Search By: "
      placeholder="Ex. (Service, Profile, Office)"
      options={FIND_FILTER_OPTIONS}
      value={value.find}
      onChange={(next) => onChange('find', next)}
    />
  )

  const pspField = (
    <>
      <HeroFilterSelect
        compact
        label="A-Z Psp's: "
        placeholder="Ex. (Agent, Architect, Real Estate, etc.,)"
        optionsByLetter={PSP_BY_LETTER}
        nestedTrees={PSP_NESTED_TREES}
        showLetterSuggest
        value={value.psp}
        onChange={(next) => onChange('psp', next)}
      />

      {showRepresentation ? (
        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          label="Representation (If RE Agent Selected): *"
          placeholder="Ex. (Buying, Mortgage, etc.,)"
          tree={REPRESENTATION_TOP_TREE}
          value={value.representation}
          onChange={(next) => onChange('representation', next)}
        />
      ) : null}

      {showBuying ? (
        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          label="Buying (If Buying, Mortgage get Selected):"
          placeholder="Ex. (Buying, Mortgage, etc.,)"
          tree={BUYING_TREE}
          value={value.financing}
          onChange={(next) => onChange('financing', next)}
        />
      ) : null}
    </>
  )

  const fieldsField = (
    <HeroFilterSelect
      compact
      selectedPrefix={selectedPrefix}
      label="Fields: "
      placeholder="Ex. (Commercial, Agriculture, etc.,)"
      tree={FIELD_TREE}
      value={value.field}
      onChange={(next) => onChange('field', next)}
    />
  )

  return (
    <div className="flex flex-col gap-1">
      {searchByAfterFields ? null : searchByField}
      {searchByAfterFields ? fieldsField : pspField}
      {searchByAfterFields ? pspField : fieldsField}
      {searchByAfterFields ? searchByField : null}

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label={experienceLabel}
        placeholder="Ex. (Beginner, Intermediate, Expert etc.,)"
        tree={CLIENT_EXPERIENCE_TREE}
        value={value.clientExperience}
        onChange={(next) => onChange('clientExperience', next)}
      />

      {showExperienceLevel ? (
        <HeroFilterSelect
          compact
          singleSelect
          selectedPrefix={selectedPrefix}
          label="Experience Level:"
          placeholder="Ex ( 1= Low, 10=High)"
          options={[...EXPERIENCE_LEVEL_OPTIONS]}
          value={experienceLevel}
          onChange={(next) => onExperienceLevelChange?.(next)}
        />
      ) : null}

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Property Condition:"
        placeholder="Ex. (New Construction, Burned down, etc.,)"
        options={PROPERTY_CONDITION_OPTIONS}
        value={value.condition}
        onChange={(next) => onChange('condition', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Vacancy:"
        placeholder="Ex. (Vacant, Tenant-Occupied, etc.,)"
        options={VACANCY_OPTIONS}
        value={value.vacancy}
        onChange={(next) => onChange('vacancy', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Title:"
        placeholder="Ex. (Partnership, Tenancy, Sole,  etc.,)"
        options={TITLE_OPTIONS}
        value={value.propertyTitle}
        onChange={(next) => onChange('propertyTitle', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Sale Type:"
        placeholder="Ex. (Standard, Clear, Lien, etc.,)"
        tree={SALE_TYPE_TREE}
        value={value.saleType}
        onChange={(next) => onChange('saleType', next)}
      />

      {hideRecipientExperience ? null : (
        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          label="Recipient Experience:"
          placeholder="Ex. (Expert, Intermediate, Beginner, etc.,)"
          options={YOUR_EXPERIENCE_OPTIONS}
          value={value.yourExperience}
          onChange={(next) => onChange('yourExperience', next)}
        />
      )}

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Motive's:"
        placeholder="Ex. (A.Have to, D.Wasting Time, etc.,)"
        options={CLIENT_MOTIVE_OPTIONS}
        value={value.motive}
        onChange={(next) => onChange('motive', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        letterHeading="underline"
        label="Languages Spoken:"
        placeholder="Ex. (Mandrin, English, Spanish, etc.,)"
        optionsByLetter={LANGUAGE_BY_LETTER}
        value={value.language}
        onChange={(next) => onChange('language', next)}
      />

      <ReferralShareInput
        compact
        label="Referral Share:"
        value={value.percentageShare}
        onChange={(next) => onChange('percentageShare', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Form Of Payment:"
        placeholder="Ex. (Cash, Check, Credit Card etc.,)"
        tree={FORM_OF_PAYMENT_TREE}
        value={value.formOfPayment}
        onChange={(next) => onChange('formOfPayment', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Price Demography: "
        placeholder="Ex. (Affordable, Mid-Range, Luxury etc.,)"
        options={PRICE_DEMOGRAPHY_OPTIONS}
        value={value.priceBand}
        onChange={(next) => onChange('priceBand', next)}
      />

      {hideLocation ? null : (
        <>
          <div className="relative shrink-0 overflow-visible">
            <label className="block truncate text-xs font-bold leading-4 text-black">
              Zipcode
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={value.zip}
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
              onChange={(miles) => onChange('radius', String(miles))}
              className="mt-1 space-y-0 px-1.5 py-0.5"
            />
          </div>
        </>
      )}
    </div>
  )
}
