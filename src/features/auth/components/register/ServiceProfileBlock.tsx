import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { ReferralShareInput } from '@/components/ui/ReferralShareInput'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { REGISTER_FIND_OPTIONS } from '@/features/auth/model/registerPsp'
import type {
  AddressFields,
  FormOfPaymentMethodEntry,
  FormOfPaymentMethodField,
} from '@/features/auth/model/registerPsp'
import {
  ENGLISH_LEVEL_OPTIONS,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  type HeroFiltersState,
  AR_MEASUREMENT_TOOLS_OPTIONS,
  BUYING_TREE,
  CLIENT_EXPERIENCE_TREE,
  CLIENT_MOTIVE_OPTIONS,
  EDUCATION_ARCHIVE_OPTIONS,
  FIELD_TREE,
  LANGUAGE_BY_LETTER,
  PAYMENT_METHODS_TREE,
  PAYMENT_PACKET_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  PRICE_DEMOGRAPHY_OPTIONS,
  PROPERTY_CONDITION_OPTIONS,
  PSP_BY_LETTER,
  PSP_NESTED_TREES,
  REPRESENTATION_TOP_TREE,
  SALE_TYPE_TREE,
  TIER_SELECTION_OPTIONS,
  TITLE_OPTIONS,
  VACANCY_OPTIONS,
  YOUR_EXPERIENCE_OPTIONS,
  splitCsv,
} from '@/features/search'
import { FormOfPaymentMethodsBlock } from './formOfPayment'
import { FormSection } from './registerUi'
import {
  ProfileFilterGroup,
  RegisterFilterSelect,
  WillingToTrainSelect,
} from './serviceProfileControls'

export function ServiceProfileBlock({
  step = 5,
  profileFilters,
  setProfileFilter,
  setProfileFilterList,
  findLabels,
  selectedPsp,
  selectedFields,
  representation,
  showRepresentation,
  showBuying,
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
  findLabels: string[]
  selectedPsp: string[]
  selectedFields: string[]
  representation: string[]
  showRepresentation: boolean
  showBuying: boolean
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
      <div className="flex flex-col gap-3">
        <ProfileFilterGroup title="Role & category">
          <RegisterFilterSelect
            label="Role:"
            placeholder="Ex. (Profile, Office)"
            options={REGISTER_FIND_OPTIONS}
            value={findLabels.filter((label) => label !== 'Service')}
            onChange={(next) => setProfileFilterList('find', next)}
          />

          <RegisterFilterSelect
            label="A-Z Psp: "
            placeholder="Ex. (Agent, Architect, Real Estate, etc.,)"
            optionsByLetter={PSP_BY_LETTER}
            nestedTrees={PSP_NESTED_TREES}
            value={selectedPsp}
            onChange={(next) => setProfileFilterList('pspCategory', next)}
            invalid={pspCategoryInvalid}
          />

          {showRepresentation ? (
            <RegisterFilterSelect
              label="Representation: "
              placeholder="Ex. (Buying, Mortgage, etc.,)"
              tree={REPRESENTATION_TOP_TREE}
              value={representation}
              onChange={(next) => setProfileFilterList('representation', next)}
            />
          ) : null}

          {showBuying ? (
            <RegisterFilterSelect
              label="Buying:"
              placeholder="Ex. (Buying, Mortgage, etc.,)"
              tree={BUYING_TREE}
              value={splitCsv(profileFilters.financing)}
              onChange={(next) => setProfileFilterList('financing', next)}
            />
          ) : null}
        </ProfileFilterGroup>

        <ProfileFilterGroup title="Property focus">
          <RegisterFilterSelect
            label="Price Demography: "
            placeholder="Ex. (Affordable, Mid-Range, Luxury etc.,)"
            options={PRICE_DEMOGRAPHY_OPTIONS}
            value={splitCsv(profileFilters.priceBand)}
            onChange={(next) => setProfileFilterList('priceBand', next)}
          />

          <RegisterFilterSelect
            label="Field Specialty: "
            placeholder="Ex. (Commercial, Agriculture, etc.,)"
            tree={FIELD_TREE}
            value={selectedFields}
            onChange={(next) => setProfileFilterList('field', next)}
          />

          <RegisterFilterSelect
            label="Property Condition Specialty:"
            placeholder="Ex. (New Construction, Burned down, etc.,)"
            options={PROPERTY_CONDITION_OPTIONS}
            value={splitCsv(profileFilters.condition)}
            onChange={(next) => setProfileFilterList('condition', next)}
          />

          <RegisterFilterSelect
            label="Vacancy Specialty:"
            placeholder="Ex. (Vacant, Tenant-Occupied, etc.,)"
            options={VACANCY_OPTIONS}
            value={splitCsv(profileFilters.vacancy)}
            onChange={(next) => setProfileFilterList('vacancy', next)}
          />

          <RegisterFilterSelect
            label="Title Experiences:"
            placeholder="Ex. (Partnership, Tenancy, Sole,  etc.,)"
            options={TITLE_OPTIONS}
            value={splitCsv(profileFilters.propertyTitle)}
            onChange={(next) => setProfileFilterList('propertyTitle', next)}
          />

          <RegisterFilterSelect
            label="Sale Type Experience:"
            placeholder="Ex. (Standard, Clear, Lien, etc.,)"
            tree={SALE_TYPE_TREE}
            value={splitCsv(profileFilters.saleType)}
            onChange={(next) => setProfileFilterList('saleType', next)}
          />
        </ProfileFilterGroup>

        <ProfileFilterGroup title="Experience">
          <RegisterFilterSelect
            label="Experience:"
            placeholder="Ex. (Beginner, Intermediate, Expert etc.,)"
            tree={CLIENT_EXPERIENCE_TREE}
            value={splitCsv(profileFilters.clientExperience)}
            onChange={(next) => setProfileFilterList('clientExperience', next)}
          />

          <RegisterFilterSelect
            label="Recipient Experience:"
            placeholder="Ex. (Expert, Intermediate, Beginner, etc.,)"
            options={YOUR_EXPERIENCE_OPTIONS}
            value={splitCsv(profileFilters.yourExperience)}
            onChange={(next) => setProfileFilterList('yourExperience', next)}
          />

          <RegisterFilterSelect
            label="Motive Experience:"
            placeholder="Ex. (A.Have to, D.Wasting Time, etc.,)"
            options={CLIENT_MOTIVE_OPTIONS}
            value={splitCsv(profileFilters.motive)}
            onChange={(next) => setProfileFilterList('motive', next)}
          />

          <RegisterFilterSelect
            label="Language Experience:"
            placeholder="Ex. (Mandrin, English, Spanish, etc.,)"
            optionsByLetter={LANGUAGE_BY_LETTER}
            value={splitCsv(profileFilters.language)}
            onChange={(next) => setProfileFilterList('language', next)}
          />

          <RegisterFilterSelect
            label="English Level:"
            placeholder="Ex. (Low, Middle, High, etc.,)"
            options={ENGLISH_LEVEL_OPTIONS.map((option) => option.label)}
            value={splitCsv(profileFilters.englishLevel)}
            onChange={(next) => setProfileFilterList('englishLevel', next)}
          />

          <ReferralShareInput
            showQaMark
            label="Referral Share:"
            name="percentageShare"
            value={profileFilters.percentageShare}
            onChange={(value) => setProfileFilter('percentageShare', value)}
          />

          <WillingToTrainSelect
            value={profileFilters.willingToTrain}
            onChange={(value) => setProfileFilter('willingToTrain', value)}
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
      </div>
    </FormSection>
  )
}
