import { RangeSlider } from '@/components/ui/RangeSlider'
import { HeroFilterSelect } from '@/features/search/components/HeroFilterSelect'
import {
  CHARGE_TREE,
  CLIENT_EXPERIENCE_TREE,
  CLIENT_MOTIVE_OPTIONS,
  CREDIT_CHECK_TREE,
  DTI_OPTIONS,
  EXECUTIVE_CLIENT_EXPERIENCE_TREE,
  EXECUTIVE_FORM_OF_PAYMENT_TREE,
  EXECUTIVE_REPRESENTATION_TOP_TREE,
  FIELD_TREE,
  FIND_FILTER_OPTIONS,
  FORM_OF_PAYMENT_TREE,
  getPspFilterProfile,
  INCOME_OPTIONS,
  INSTITUTION_OPTIONS,
  LANGUAGE_BY_LETTER,
  LENGTH_TO_CLOSE_OPTIONS,
  LOAN_EXPERIENCE_TREE,
  LOAN_RATE_TYPE_OPTIONS,
  LOAN_TYPES_OPTIONS,
  LTV_OPTIONS,
  MORTGAGE_FIELD_TREE,
  MORTGAGE_GOV_AGENCIES_OPTIONS,
  MORTGAGE_PROPERTY_CONDITION_OPTIONS,
  MORTGAGE_SALE_TYPE_TREE,
  MORTGAGE_TITLE_OPTIONS,
  MORTGAGE_VACANCY_OPTIONS,
  PERCENTAGE_SHARE_FILTER_OPTIONS,
  PREPAYMENT_PENALTY_OPTIONS,
  PRICE_DEMOGRAPHY_OPTIONS,
  PROOF_OPTIONS,
  PROPERTY_CONDITION_OPTIONS,
  PR_SQ_FT_OPTIONS,
  PSP_BY_LETTER,
  PSP_NESTED_TREES,
  PURCHASE_EXPERIENCE_TREE,
  REFERENCES_OPTIONS,
  REPRESENTATION_TOP_TREE,
  ROLE_FILTER_OPTIONS,
  SALE_TYPE_TREE,
  TAG_SKILL_TREE,
  TRADES_CLIENT_EXPERIENCE_TREE,
  TIME_DURATION_OPTIONS,
  TITLE_OPTIONS,
  VACANCY_OPTIONS,
  WHICH_SERVICE_TREE,
  WILLING_TO_TRAIN_EXECUTIVE_OPTIONS,
  WILLING_TO_TRAIN_RE_OPTIONS,
  WILLING_TO_TRAIN_TRADES_OPTIONS,
  YOUR_EXPERIENCE_OPTIONS,
} from '@/features/search/data/landingFilterOptions'
import {
  SERVICE_DISTANCE_DEFAULT,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
} from '@/features/search/data/categories'

/** Shared filter values used by landing hero + forums left rail. */
export type LandingFilterValues = {
  role: string[]
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
  tagSkill: string[]
  yourExperience: string[]
  experienceLevel: string[]
  motive: string[]
  language: string[]
  percentageShare: string[]
  willingToTrain: string[]
  formOfPayment: string[]
  references: string[]
  priceBand: string[]
  /** Tradespeople Labor Professional's */
  prSqFt: string[]
  proof: string[]
  legalTitle: string[]
  /** Mortgage Consultant / Loan Executive fields */
  institution: string[]
  purchaseExperience: string[]
  loanExperience: string[]
  whichService: string[]
  govAgencies: string[]
  charge: string[]
  income: string[]
  dti: string[]
  ltv: string[]
  loanTypes: string[]
  loanRateType: string[]
  prepaymentPenalty: string[]
  timeDuration: string[]
  lengthToClose: string[]
  creditCheck: string[]
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
  /**
   * Soft blue selected styling (forums / articles rails).
   * Keep off on landing.
   */
  highlightSelected?: boolean
  /** Forums: place Search By after Fields instead of at the top. */
  searchByAfterFields?: boolean
  /** Hide Zipcode + Mile Radius (forums moves them into the service-results tail). */
  hideLocation?: boolean
  /**
   * Render only the dropdowns that sit above Languages Spoken.
   * Service results keeps its own Languages Spoken block and everything under it.
   */
  stopBeforeLanguage?: boolean
  /** Advertisement renders Search By at the top of its own panel. */
  hideSearchBy?: boolean
  /** Advertisement renders A–Z PSP at the top of its own panel. */
  hidePsp?: boolean
}

/**
 * Canonical filter stack from the landing hero panel.
 * Forums and landing both render this so categories / dropdowns / styling stay in sync.
 *
 * Real Estate / Agent → 16+ agent categories.
 * Executive → executive categories.
 * Mortgage Consultant / Loan Executive / Originator → 20+ mortgage categories.
 * Tradeperson / trades / Professional's → tradespeople categories.
 */
export function LandingFilterFields({
  value,
  onChange,
  hideRepresentation = false,
  hideRecipientExperience = false,
  experienceLabel,
  showExperienceLevel = false,
  experienceLevel = [],
  onExperienceLevelChange,
  selectedPrefix,
  highlightSelected = false,
  searchByAfterFields = false,
  hideLocation = false,
  stopBeforeLanguage = false,
  hideSearchBy = false,
  hidePsp = false,
}: LandingFilterFieldsProps) {
  const profile = getPspFilterProfile(value.psp)
  const isExecutive = profile === 'executive'
  const isRealEstate = profile === 'real-estate'
  const isMortgage = profile === 'mortgage'
  const isTrades = profile === 'trades'
  const showProfileFilters = isRealEstate || isExecutive
  const showMortgageFilters = isMortgage
  const showTradesFilters = isTrades

  const showRepresentation = !hideRepresentation && showProfileFilters

  const representationTree = isExecutive
    ? EXECUTIVE_REPRESENTATION_TOP_TREE
    : REPRESENTATION_TOP_TREE
  const clientExperienceTree = isExecutive
    ? EXECUTIVE_CLIENT_EXPERIENCE_TREE
    : CLIENT_EXPERIENCE_TREE
  const formOfPaymentTree = isExecutive
    ? EXECUTIVE_FORM_OF_PAYMENT_TREE
    : FORM_OF_PAYMENT_TREE
  const willingToTrainOptions = isTrades
    ? WILLING_TO_TRAIN_TRADES_OPTIONS
    : isExecutive
      ? WILLING_TO_TRAIN_EXECUTIVE_OPTIONS
      : WILLING_TO_TRAIN_RE_OPTIONS

  const resolvedExperienceLabel =
    experienceLabel ??
    (isExecutive ? 'Client experience to find you:' : 'Client experience:')

  const tagSkillLabel = isExecutive
    ? "Tag; skill: (extra cirriculum you want to be found)"
    : 'Tag; skill: (optional)'

  const radiusMiles = Number(value.radius || SERVICE_DISTANCE_DEFAULT)

  const locationFields = hideLocation ? null : (
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
          className="mt-0.5 h-9 w-full rounded-xl border-2 border-ink/15 bg-white px-2 text-sm text-ink outline-none placeholder:text-sm placeholder:text-ink-soft focus:border-brand focus:ring-2 focus:ring-brand/25"
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
  )

  const roleField = (
    <HeroFilterSelect
      compact
      wrapLabel
      selectedPrefix={selectedPrefix}
      highlightSelected={highlightSelected}
      label="Role: "
      placeholder="Ex. (Client, Property Service Provider)"
      options={ROLE_FILTER_OPTIONS}
      value={value.role}
      onChange={(next) => onChange('role', next)}
    />
  )

  const searchByField = (
    <HeroFilterSelect
      compact
      selectedPrefix={selectedPrefix}
      highlightSelected={highlightSelected}
      label="Search By: "
      placeholder="Ex. (Service, Profile, Office)"
      options={FIND_FILTER_OPTIONS}
      value={value.find}
      onChange={(next) => onChange('find', next)}
    />
  )

  const pspField = (
    <HeroFilterSelect
      compact
      highlightSelected={highlightSelected}
      label="A-Z Psp's: "
      placeholder="Ex. (Architect, Lawn Service, etc)"
      optionsByLetter={PSP_BY_LETTER}
      nestedTrees={PSP_NESTED_TREES}
      showLetterSuggest
      value={value.psp}
      onChange={(next) => onChange('psp', next)}
    />
  )

  const fieldsField = (
    <HeroFilterSelect
      compact
      showSuggest
      selectedPrefix={selectedPrefix}
      highlightSelected={highlightSelected}
      label="Fields: "
      placeholder="Ex. (Commercial, Agriculture, etc.,)"
      tree={FIELD_TREE}
      value={value.field}
      onChange={(next) => onChange('field', next)}
    />
  )

  /** Mortgage Consultant / Loan Executive — 20+ categories. */
  const mortgageCategoryFields = showMortgageFilters ? (
    <>
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Institution:"
        placeholder="Ex. (Bank, Brokerage)"
        options={INSTITUTION_OPTIONS}
        value={value.institution}
        onChange={(next) => onChange('institution', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Purchase Experience:"
        placeholder="Ex. (Repeat, First-Time, FHA, VA)"
        tree={PURCHASE_EXPERIENCE_TREE}
        value={value.purchaseExperience}
        onChange={(next) => onChange('purchaseExperience', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Loan Experience:"
        placeholder="Ex. (From Broker, From Bank)"
        tree={LOAN_EXPERIENCE_TREE}
        value={value.loanExperience}
        onChange={(next) => onChange('loanExperience', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Which Serveice:"
        placeholder="Ex. (Refinance Way's, Purchase Way's)"
        tree={WHICH_SERVICE_TREE}
        value={value.whichService}
        onChange={(next) => onChange('whichService', next)}
      />

      {searchByAfterFields ? null : (
        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Field's:"
          placeholder="Ex. (Commercial, Residential, Etc.,)"
          tree={MORTGAGE_FIELD_TREE}
          value={value.field}
          onChange={(next) => onChange('field', next)}
        />
      )}

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Property Condition:"
        placeholder="Ex. (New Construction, Burned, Etc.,)"
        options={MORTGAGE_PROPERTY_CONDITION_OPTIONS}
        value={value.condition}
        onChange={(next) => onChange('condition', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Vacancy: Restriction's:"
        placeholder="Ex. (Owner Occupied, Vacant, None)"
        options={MORTGAGE_VACANCY_OPTIONS}
        value={value.vacancy}
        onChange={(next) => onChange('vacancy', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Title:"
        placeholder="Ex. (Sole Ownership, Joint Tenancy, Etc.,)"
        options={MORTGAGE_TITLE_OPTIONS}
        value={value.propertyTitle}
        onChange={(next) => onChange('propertyTitle', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Sale Type:"
        placeholder="Ex. (Standard, Lien, Short Sale, Etc.,)"
        tree={MORTGAGE_SALE_TYPE_TREE}
        value={value.saleType}
        onChange={(next) => onChange('saleType', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Gov Agencies:"
        placeholder="Ex. (HUD, FBI, ICE, DEA)"
        options={MORTGAGE_GOV_AGENCIES_OPTIONS}
        value={value.govAgencies}
        onChange={(next) => onChange('govAgencies', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Charge:"
        placeholder="Ex. (Front, Back, Doesn't Matter)"
        tree={CHARGE_TREE}
        value={value.charge}
        onChange={(next) => onChange('charge', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Income:"
        placeholder="Ex. (Stated, Non-Stated)"
        options={INCOME_OPTIONS}
        value={value.income}
        onChange={(next) => onChange('income', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Debt To Income Ratio's (DTI):"
        placeholder="Ex. (Under 36%, 36% – 43%)"
        options={DTI_OPTIONS}
        value={value.dti}
        onChange={(next) => onChange('dti', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Loan To Value Ratio's (LTV):"
        placeholder="Ex. (Under 80%, 80% – 90%)"
        options={LTV_OPTIONS}
        value={value.ltv}
        onChange={(next) => onChange('ltv', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Type's Of Loan's:"
        placeholder="Ex. (Conventional, Jumbo, Hard Money)"
        options={LOAN_TYPES_OPTIONS}
        value={value.loanTypes}
        onChange={(next) => onChange('loanTypes', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Type: Fixed, ARM:"
        placeholder="Ex. (Fixed, ARM)"
        options={LOAN_RATE_TYPE_OPTIONS}
        value={value.loanRateType}
        onChange={(next) => onChange('loanRateType', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Prepayment Penalty:"
        placeholder="Ex. (Yes, No)"
        options={PREPAYMENT_PENALTY_OPTIONS}
        value={value.prepaymentPenalty}
        onChange={(next) => onChange('prepaymentPenalty', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Time Duration: To Pay Back:"
        placeholder="Ex. (Month's, Year, 5 Years)"
        options={TIME_DURATION_OPTIONS}
        value={value.timeDuration}
        onChange={(next) => onChange('timeDuration', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Length Of Time To Close:"
        placeholder="Ex. (5 Day's, 30-45 Day's)"
        options={LENGTH_TO_CLOSE_OPTIONS}
        value={value.lengthToClose}
        onChange={(next) => onChange('lengthToClose', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Credit Check:"
        placeholder="Ex. (500+, 580-620, 620-740, 740+)"
        tree={CREDIT_CHECK_TREE}
        value={value.creditCheck}
        onChange={(next) => onChange('creditCheck', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Price Demography:"
        placeholder="Ex. (Luxury, Mid, Economic)"
        options={PRICE_DEMOGRAPHY_OPTIONS}
        value={value.priceBand}
        onChange={(next) => onChange('priceBand', next)}
      />

      {locationFields}
    </>
  ) : null

  /** 16 categories under Real Estate / Executive (order from filter-s-comparison). */
  const profileCategoryFields = showProfileFilters ? (
    <>
      {/* 2. Representation */}
      {showRepresentation ? (
        <HeroFilterSelect
          compact
          showSuggest={isRealEstate}
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label={
            isExecutive
              ? "Representation's:"
              : "Representation's:"
          }
          placeholder="Ex. (Selling, Buying, Leasing, etc.,)"
          tree={representationTree}
          value={value.representation}
          onChange={(next) => onChange('representation', next)}
        />
      ) : null}

      {/* Field — forums already places Fields above A–Z */}
      {searchByAfterFields ? null : fieldsField}

      {/* 5. Client Experience */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label={resolvedExperienceLabel}
        placeholder="Ex. (First-time, Repeat, Investment, etc.,)"
        tree={clientExperienceTree}
        value={value.clientExperience}
        onChange={(next) => onChange('clientExperience', next)}
      />

      {showExperienceLevel ? (
        <HeroFilterSelect
          compact
          singleSelect
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Experience Level:"
          placeholder="Ex ( 1= Low, 10=High)"
          options={[...EXPERIENCE_LEVEL_OPTIONS]}
          value={experienceLevel}
          onChange={(next) => onExperienceLevelChange?.(next)}
        />
      ) : null}

      {/* 6. Property Condition */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label={
          isExecutive
            ? "Property condition's you want to be found:"
            : 'Property condition:'
        }
        placeholder="Ex. (New construction, Burned, etc.,)"
        options={PROPERTY_CONDITION_OPTIONS}
        value={value.condition}
        onChange={(next) => onChange('condition', next)}
      />

      {/* 7. Vacancy */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label={
          isExecutive
            ? "Vacancy: check which of the following vacancie's you want to be found:"
            : 'Vacancy:'
        }
        placeholder="Ex. (Vacant, Tenant occupied, etc.,)"
        options={VACANCY_OPTIONS}
        value={value.vacancy}
        onChange={(next) => onChange('vacancy', next)}
      />

      {/* 8. Title */}
      <HeroFilterSelect
        compact
        showSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Title:"
        placeholder="Ex. (Sole ownership, Joint tenancy, etc.,)"
        options={TITLE_OPTIONS}
        value={value.propertyTitle}
        onChange={(next) => onChange('propertyTitle', next)}
      />

      {/* 9. Sale's Type */}
      <HeroFilterSelect
        compact
        showSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Sale type:"
        placeholder="Ex. (Standard, Lien, Short sale, etc.,)"
        tree={SALE_TYPE_TREE}
        value={value.saleType}
        onChange={(next) => onChange('saleType', next)}
      />

      {/* Tag; Skill (elaborated under Sale Type) */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label={tagSkillLabel}
        placeholder="Ex. (Property valuation, Staging, etc.,)"
        tree={TAG_SKILL_TREE}
        value={value.tagSkill}
        onChange={(next) => onChange('tagSkill', next)}
      />

      {/* 10. Experience Level + Your Experience */}
      {hideRecipientExperience ? null : (
        <>
          <HeroFilterSelect
            compact
            singleSelect
            selectedPrefix={selectedPrefix}
            highlightSelected={highlightSelected}
            label="Experience Level:"
            placeholder="Ex ( 1= Low, 10=High)"
            options={[...EXPERIENCE_LEVEL_OPTIONS]}
            value={value.experienceLevel}
            onChange={(next) => onChange('experienceLevel', next)}
          />
          <HeroFilterSelect
            compact
            selectedPrefix={selectedPrefix}
            highlightSelected={highlightSelected}
            label="Your experience:"
            placeholder="Ex. (Expert, Mature, Seasonal, New)"
            options={YOUR_EXPERIENCE_OPTIONS}
            value={value.yourExperience}
            onChange={(next) => onChange('yourExperience', next)}
          />
        </>
      )}

      {/* 11. Client Motive's */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label={
          isExecutive
            ? 'Motive: motive type of client you to be found'
            : 'Motive:'
        }
        placeholder="Ex. (A; Have Too…, C …Wasting Time)"
        options={CLIENT_MOTIVE_OPTIONS}
        value={value.motive}
        onChange={(next) => onChange('motive', next)}
      />

      {stopBeforeLanguage ? null : (
        <>
      {/* 12. Language Spoken */}
      <HeroFilterSelect
        compact
        showLetterSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        letterHeading="underline"
        label="Languages spoken:"
        placeholder="Ex. (English, Mandarin, Spanish, etc)"
        optionsByLetter={LANGUAGE_BY_LETTER}
        value={value.language}
        onChange={(next) => onChange('language', next)}
      />

      {/* 13. Percentage Share + Are You willing to train */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label={isRealEstate ? 'Percentage:' : "Percentage amount's you give for refferal's you receive:"}
        placeholder="Ex. (50%, 40%, 30%, 20%, Zilch)"
        options={PERCENTAGE_SHARE_FILTER_OPTIONS}
        value={value.percentageShare}
        onChange={(next) => onChange('percentageShare', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Are you willing to train your referreed party:"
        placeholder="Ex. (Yes; recorded…, Reach out)"
        options={willingToTrainOptions}
        value={value.willingToTrain}
        onChange={(next) => onChange('willingToTrain', next)}
      />

      {/* 14. Form Of Payment */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Form of payment:"
        placeholder="Ex. (Cash, Card, Finance)"
        tree={formOfPaymentTree}
        value={value.formOfPayment}
        onChange={(next) => onChange('formOfPayment', next)}
      />

      {/* 15. Refference's */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Refference's:"
        placeholder="Ex. (Send, Receive, Bring onboard)"
        options={REFERENCES_OPTIONS}
        value={value.references}
        onChange={(next) => onChange('references', next)}
      />

      {/* Price Demography — just before Zipcode */}
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Price demography: "
        placeholder="Ex. (Luxury, Mid, Economic)"
        options={PRICE_DEMOGRAPHY_OPTIONS}
        value={value.priceBand}
        onChange={(next) => onChange('priceBand', next)}
      />

      {/* Zipcode + Mile Radius */}
      {locationFields}
        </>
      )}
    </>
  ) : null

  /** Tradespeople Labor Professional's — comparison-page categories. */
  const tradesCategoryFields = showTradesFilters ? (
    <>
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Pr. Sq. Ft.:"
        placeholder="Ex. (Under $100, $100–$200, etc)"
        options={PR_SQ_FT_OPTIONS}
        value={value.prSqFt}
        onChange={(next) => onChange('prSqFt', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Price Demography:"
        placeholder="Ex. (Luxury, Mid, Economic)"
        options={PRICE_DEMOGRAPHY_OPTIONS}
        value={value.priceBand}
        onChange={(next) => onChange('priceBand', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Proof:"
        placeholder="Ex. (Ownership, Tenancy)"
        options={PROOF_OPTIONS}
        value={value.proof}
        onChange={(next) => onChange('proof', next)}
      />

      {searchByAfterFields ? null : fieldsField}

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Client Experience:"
        placeholder="Ex. (Never Hired, Have Hired, etc)"
        tree={TRADES_CLIENT_EXPERIENCE_TREE}
        value={value.clientExperience}
        onChange={(next) => onChange('clientExperience', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Property Condition:"
        placeholder="Ex. (New Construction, Burned, etc.,)"
        options={PROPERTY_CONDITION_OPTIONS}
        value={value.condition}
        onChange={(next) => onChange('condition', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Vacancy:"
        placeholder="Ex. (Vacant, Tenant Occupied, etc.,)"
        options={VACANCY_OPTIONS}
        value={value.vacancy}
        onChange={(next) => onChange('vacancy', next)}
      />

      <HeroFilterSelect
        compact
        showSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Title:"
        placeholder="Ex. (Sole ownership, Joint tenancy, etc.,)"
        options={TITLE_OPTIONS}
        value={value.propertyTitle}
        onChange={(next) => onChange('propertyTitle', next)}
      />

      <HeroFilterSelect
        compact
        showSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Sale Type:"
        placeholder="Ex. (Standard, Lien, Short Sale, etc.,)"
        tree={SALE_TYPE_TREE}
        value={value.saleType}
        onChange={(next) => onChange('saleType', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Tag; Skill:"
        placeholder="Ex. (Property valuation, Staging, etc.,)"
        tree={TAG_SKILL_TREE}
        value={value.tagSkill}
        onChange={(next) => onChange('tagSkill', next)}
      />

      <HeroFilterSelect
        compact
        showSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Legal Title:"
        placeholder="Ex. (Sole ownership, Joint tenancy, etc.,)"
        options={TITLE_OPTIONS}
        value={value.legalTitle}
        onChange={(next) => onChange('legalTitle', next)}
      />

      {hideRecipientExperience ? null : (
        <>
          <HeroFilterSelect
            compact
            singleSelect
            selectedPrefix={selectedPrefix}
            highlightSelected={highlightSelected}
            label="Experience Level:"
            placeholder="Ex ( 1= Low, 10=High)"
            options={[...EXPERIENCE_LEVEL_OPTIONS]}
            value={value.experienceLevel}
            onChange={(next) => onChange('experienceLevel', next)}
          />
          <HeroFilterSelect
            compact
            selectedPrefix={selectedPrefix}
            highlightSelected={highlightSelected}
            label="Your Experience:"
            placeholder="Ex. (Expert, Mature, Seasonal, New)"
            options={YOUR_EXPERIENCE_OPTIONS}
            value={value.yourExperience}
            onChange={(next) => onChange('yourExperience', next)}
          />
        </>
      )}

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Motive:"
        placeholder="Ex. (A; Have Too…, C …Wasting Time)"
        options={CLIENT_MOTIVE_OPTIONS}
        value={value.motive}
        onChange={(next) => onChange('motive', next)}
      />

      {stopBeforeLanguage ? null : (
        <>
      <HeroFilterSelect
        compact
        showLetterSuggest
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        letterHeading="underline"
        label="Languages Spoken:"
        placeholder="Ex. (English, Mandarin, Spanish, etc)"
        optionsByLetter={LANGUAGE_BY_LETTER}
        value={value.language}
        onChange={(next) => onChange('language', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Percentage:"
        placeholder="Ex. (50%, 40%, 30%, 20%, Zilch)"
        options={PERCENTAGE_SHARE_FILTER_OPTIONS}
        value={value.percentageShare}
        onChange={(next) => onChange('percentageShare', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Are you willing to train your referreed party:"
        placeholder="Ex. (Yes; recorded…, Reach out)"
        options={willingToTrainOptions}
        value={value.willingToTrain}
        onChange={(next) => onChange('willingToTrain', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Form Of Payment:"
        placeholder="Ex. (Cash, Card, Finance)"
        tree={FORM_OF_PAYMENT_TREE}
        value={value.formOfPayment}
        onChange={(next) => onChange('formOfPayment', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Refference's:"
        placeholder="Ex. (Send, Receive, Bring onboard)"
        options={REFERENCES_OPTIONS}
        value={value.references}
        onChange={(next) => onChange('references', next)}
      />

      {locationFields}
        </>
      )}
    </>
  ) : null

  /** Non–Real Estate / Executive / Mortgage / Trades: shared core filters. */
  const genericCategoryFields =
    !showProfileFilters && !showMortgageFilters && !showTradesFilters ? (
      <>
        {searchByAfterFields ? null : fieldsField}

        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label={experienceLabel ?? 'Client Experience:'}
          placeholder="Ex. (First-time, Repeat, Investment, etc.,)"
          tree={CLIENT_EXPERIENCE_TREE}
          value={value.clientExperience}
          onChange={(next) => onChange('clientExperience', next)}
        />

        {showExperienceLevel ? (
          <HeroFilterSelect
            compact
            singleSelect
            selectedPrefix={selectedPrefix}
            highlightSelected={highlightSelected}
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
          highlightSelected={highlightSelected}
          label="Property Condition:"
          placeholder="Ex. (New Construction, Burned, etc.,)"
          options={PROPERTY_CONDITION_OPTIONS}
          value={value.condition}
          onChange={(next) => onChange('condition', next)}
        />

        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Vacancy:"
          placeholder="Ex. (Vacant, Tenant Occupied, etc.,)"
          options={VACANCY_OPTIONS}
          value={value.vacancy}
          onChange={(next) => onChange('vacancy', next)}
        />

        <HeroFilterSelect
          compact
          showSuggest
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Title:"
          placeholder="Ex. (Sole ownership, Joint tenancy, etc.,)"
          options={TITLE_OPTIONS}
          value={value.propertyTitle}
          onChange={(next) => onChange('propertyTitle', next)}
        />

        <HeroFilterSelect
          compact
          showSuggest
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Sale Type:"
          placeholder="Ex. (Standard, Lien, Short Sale, etc.,)"
          tree={SALE_TYPE_TREE}
          value={value.saleType}
          onChange={(next) => onChange('saleType', next)}
        />

        {hideRecipientExperience ? null : (
          <>
            <HeroFilterSelect
              compact
              singleSelect
              selectedPrefix={selectedPrefix}
              highlightSelected={highlightSelected}
              label="Experience Level:"
              placeholder="Ex ( 1= Low, 10=High)"
              options={[...EXPERIENCE_LEVEL_OPTIONS]}
              value={value.experienceLevel}
              onChange={(next) => onChange('experienceLevel', next)}
            />
            <HeroFilterSelect
              compact
              selectedPrefix={selectedPrefix}
              highlightSelected={highlightSelected}
              label="Your Experience:"
              placeholder="Ex. (Expert, Mature, Seasonal, New)"
              options={YOUR_EXPERIENCE_OPTIONS}
              value={value.yourExperience}
              onChange={(next) => onChange('yourExperience', next)}
            />
          </>
        )}

        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Motive's:"
          placeholder="Ex. (A; Have Too…, C …Wasting Time)"
          options={CLIENT_MOTIVE_OPTIONS}
          value={value.motive}
          onChange={(next) => onChange('motive', next)}
        />

        {stopBeforeLanguage ? null : (
          <>
        <HeroFilterSelect
          compact
          showLetterSuggest
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          letterHeading="underline"
          label="Languages Spoken:"
          placeholder="Ex. (English, Mandarin, Spanish, etc)"
          optionsByLetter={LANGUAGE_BY_LETTER}
          value={value.language}
          onChange={(next) => onChange('language', next)}
        />

        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Percentage Share:"
          placeholder="Ex. (50%, 40%, 30%, 20%, Zilch)"
          options={PERCENTAGE_SHARE_FILTER_OPTIONS}
          value={value.percentageShare}
          onChange={(next) => onChange('percentageShare', next)}
        />

        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Form Of Payment:"
          placeholder="Ex. (Cash, Card, Finance, etc)"
          tree={FORM_OF_PAYMENT_TREE}
          value={value.formOfPayment}
          onChange={(next) => onChange('formOfPayment', next)}
        />

        <HeroFilterSelect
          compact
          selectedPrefix={selectedPrefix}
          highlightSelected={highlightSelected}
          label="Price Demography: "
          placeholder="Ex. (Luxury, Mid, Economic)"
          options={PRICE_DEMOGRAPHY_OPTIONS}
          value={value.priceBand}
          onChange={(next) => onChange('priceBand', next)}
        />

        {locationFields}
          </>
        )}
      </>
    ) : null

  return (
    <div className="flex flex-col gap-1">
      {searchByAfterFields ? null : roleField}
      {searchByAfterFields || hideSearchBy ? null : searchByField}
      {searchByAfterFields ? fieldsField : hidePsp ? null : pspField}
      {searchByAfterFields && !hidePsp ? pspField : null}
      {searchByAfterFields ? roleField : null}
      {searchByAfterFields && !hideSearchBy ? searchByField : null}

      {showMortgageFilters
        ? mortgageCategoryFields
        : showProfileFilters
          ? profileCategoryFields
          : showTradesFilters
            ? tradesCategoryFields
            : genericCategoryFields}
    </div>
  )
}
