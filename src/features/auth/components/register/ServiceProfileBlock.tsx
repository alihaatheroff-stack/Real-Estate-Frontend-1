import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { RangeSlider } from '@/components/ui/RangeSlider'
import type {
  AddressFields,
  FormOfPaymentMethodEntry,
  FormOfPaymentMethodField,
} from '@/features/auth/model/registerPsp'
import {
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  type HeroFiltersState,
  type LandingFilterValues,
  AR_MEASUREMENT_TOOLS_OPTIONS,
  EDUCATION_ARCHIVE_OPTIONS,
  ENGLISH_LEVEL_OPTIONS,
  LandingFilterFields,
  PAYMENT_METHODS_TREE,
  PAYMENT_PACKET_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  TIER_SELECTION_OPTIONS,
  splitCsv,
} from '@/features/search'
import { RegisterFilterMenuProvider } from '@/features/search/components/HeroFilterSelect'
import { FormOfPaymentMethodsBlock } from './formOfPayment'
import { FormSection } from './registerUi'
import { ProfileFilterGroup, RegisterFilterSelect } from './serviceProfileControls'

function toLandingValues(filters: HeroFiltersState): LandingFilterValues {
  const findLabels = splitCsv(filters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })

  return {
    role: splitCsv(filters.role),
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
    tagSkill: splitCsv(filters.tagSkill),
    yourExperience: splitCsv(filters.yourExperience),
    experienceLevel: splitCsv(filters.experienceLevel),
    motive: splitCsv(filters.motive),
    language: splitCsv(filters.language),
    percentageShare: splitCsv(filters.percentageShare),
    willingToTrain: splitCsv(filters.willingToTrain),
    formOfPayment: splitCsv(filters.formOfPayment),
    references: splitCsv(filters.referral),
    priceBand: splitCsv(filters.priceBand),
    institution: splitCsv(filters.institution),
    purchaseExperience: splitCsv(filters.purchaseExperience),
    loanExperience: splitCsv(filters.loanExperience),
    whichService: splitCsv(filters.whichService),
    govAgencies: splitCsv(filters.govAgencies),
    charge: splitCsv(filters.charge),
    income: splitCsv(filters.income),
    dti: splitCsv(filters.dti),
    ltv: splitCsv(filters.ltv),
    loanTypes: splitCsv(filters.loanTypes),
    loanRateType: splitCsv(filters.loanRateType),
    prepaymentPenalty: splitCsv(filters.prepaymentPenalty),
    timeDuration: splitCsv(filters.timeDuration),
    lengthToClose: splitCsv(filters.lengthToClose),
    creditCheck: splitCsv(filters.creditCheck),
    prSqFt: splitCsv(filters.prSqFt),
    proof: splitCsv(filters.proof),
    legalTitle: splitCsv(filters.legalTitle),
    zip: filters.zip,
    radius: filters.radius,
  }
}

export function ServiceProfileBlock({
  step = 5,
  profileFilters,
  setProfileFilter,
  setProfileFilterList,
  applyLandingFilterChange,
  distance,
  formOfPaymentMethods,
  businessName,
  businessAddress,
  onAddFormOfPaymentMethod,
  onUpdateFormOfPaymentMethod,
  onRemoveFormOfPaymentMethod,
  pspCategoryInvalid,
}: {
  step?: number
  profileFilters: HeroFiltersState
  setProfileFilter: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  setProfileFilterList: (key: keyof HeroFiltersState, next: string[]) => void
  applyLandingFilterChange: <K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) => void
  distance: number
  formOfPaymentMethods: FormOfPaymentMethodEntry[]
  businessName: string
  businessAddress: AddressFields
  onAddFormOfPaymentMethod: () => void
  onUpdateFormOfPaymentMethod: (
    id: string,
    field: FormOfPaymentMethodField,
    value: string | boolean,
  ) => void
  onRemoveFormOfPaymentMethod: (id: string) => void
  pspCategoryInvalid?: boolean
}) {
  return (
    <FormSection title="Service profile" step={step}>
      <RegisterFilterMenuProvider>
      <div className="flex flex-col gap-3">
        <LandingFilterFields
          hideLocation
          pspInvalid={pspCategoryInvalid}
          value={toLandingValues(profileFilters)}
          onChange={applyLandingFilterChange}
          groupSections={(sections) => (
            <>
              <ProfileFilterGroup title="Role & category">{sections.role}</ProfileFilterGroup>
              <ProfileFilterGroup title="Property focus">{sections.property}</ProfileFilterGroup>
              <ProfileFilterGroup title="Experience">
                {sections.experience}
                <RegisterFilterSelect
                  label="English Level:"
                  placeholder="Ex. (Low, Middle, High, etc.,)"
                  options={ENGLISH_LEVEL_OPTIONS.map((option) => option.label)}
                  value={splitCsv(profileFilters.englishLevel)}
                  onChange={(next) => setProfileFilterList('englishLevel', next)}
                />
              </ProfileFilterGroup>
              <ProfileFilterGroup title="Tools & education">
          <RegisterFilterSelect
            label="EDUCATION + ARCHIVE + video playlists based on search:"
            placeholder="Ex. (Negotiation's, Hiring Appraisers)"
            options={EDUCATION_ARCHIVE_OPTIONS}
            value={splitCsv(profileFilters.educationArchive)}
            onChange={(next) => setProfileFilterList('educationArchive', next)}
          />

          <RegisterFilterSelect
            className="[&_label_span]:underline"
            label="AR MEASUREMENT TOOLS"
            placeholder="Ex. (Doors, Windows, Land, etc.,)"
            options={AR_MEASUREMENT_TOOLS_OPTIONS}
            value={splitCsv(profileFilters.arMeasurementTools)}
            onChange={(next) => setProfileFilterList('arMeasurementTools', next)}
          />
              </ProfileFilterGroup>
              <ProfileFilterGroup title="Payments & terms">
                {sections.payments}
          <RegisterFilterSelect
            label="Payment Methods:"
            placeholder="Ex. (Cash, Credit)"
            tree={PAYMENT_METHODS_TREE}
            value={splitCsv(profileFilters.paymentMethods)}
            onChange={(next) => setProfileFilterList('paymentMethods', next)}
          />

          <RegisterFilterSelect
            label="Payment Packet:"
            placeholder="Ex. (Monthly, Yearly, etc.,)"
            options={PAYMENT_PACKET_OPTIONS}
            value={splitCsv(profileFilters.paymentPacket)}
            onChange={(next) => setProfileFilterList('paymentPacket', next)}
          />

          <RegisterFilterSelect
            label="Tier Selection:"
            placeholder="Ex. (Basic-Lux Tier)"
            options={TIER_SELECTION_OPTIONS}
            value={splitCsv(profileFilters.tierSelection)}
            onChange={(next) => setProfileFilterList('tierSelection', next)}
          />

          <RegisterFilterSelect
            label="Payment Terms:"
            placeholder="Ex. (Before, After, etc.,)"
            options={PAYMENT_TERMS_OPTIONS}
            value={splitCsv(profileFilters.paymentTerms)}
            onChange={(next) => setProfileFilterList('paymentTerms', next)}
          />

          <FormOfPaymentMethodsBlock
            entries={formOfPaymentMethods}
            businessName={businessName}
            businessAddress={businessAddress}
            onAdd={onAddFormOfPaymentMethod}
            onUpdate={onUpdateFormOfPaymentMethod}
            onRemove={onRemoveFormOfPaymentMethod}
          />
              </ProfileFilterGroup>
              <ProfileFilterGroup title="Service area">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                    Mile Radius
                    <FieldQaMark field="Mile Radius" />
                  </span>
                  <p className="text-sm text-muted">Distance: {distance} miles</p>
                  <RangeSlider
                    min={SERVICE_DISTANCE_MIN}
                    max={SERVICE_DISTANCE_MAX}
                    value={distance}
                    onChange={(value) => setProfileFilter('radius', String(value))}
                  />
                </div>
              </ProfileFilterGroup>
            </>
          )}
        />
      </div>
      </RegisterFilterMenuProvider>
    </FormSection>
  )
}
