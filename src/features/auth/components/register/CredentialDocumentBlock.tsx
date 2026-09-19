import type { ReactNode } from 'react'
import { Minus, Plus } from 'lucide-react'
import { FieldLabelWithQa } from '@/components/ui/FieldQaMark'
import {
  EMPTY_ADDRESS_FIELDS,
  EMPTY_MANUAL,
  REQUIRED_MANUAL_FIELDS,
  type AddressFields,
  type EmergencyContact,
  type FieldErrorKey,
  type ManualDocFields,
  type ManualSection,
} from '@/features/auth/model/registerPsp'
import { cn } from '@/shared/lib/cn'
import { DocumentUploadField } from './DocumentUploadField'
import {
  formatDateInput,
  InlineBlankField,
  SameAsIdAddressRadios,
  SectionCardTitle,
  YesNoButtons,
} from './registerUi'
import { sectionCardClass } from './styles'
export function CredentialDocumentBlock({
  step,
  title,
  uploadLabel,
  name,
  section,
  file,
  onFileChange,
  manual,
  onManualChange,
  fieldErrors,
  currentAddressSameAsId = null,
  currentAddress = { ...EMPTY_ADDRESS_FIELDS },
  onCurrentAddressSameAsIdChange,
  onCurrentAddressChange,
  hasAllergy = null,
  allergyDetails = '',
  onHasAllergyChange,
  onAllergyDetailsChange,
  otherMedicalCondition = '',
  onOtherMedicalConditionChange,
  emergencyContacts = [],
  onAddEmergencyContact,
  onUpdateEmergencyContact,
  onRemoveEmergencyContact,
  children,
}: {
  step?: number
  title: string
  uploadLabel: string
  name: string
  section: ManualSection
  file: File | null
  onFileChange: (file: File | null) => void
  manual: ManualDocFields
  onManualChange: (field: keyof ManualDocFields, value: string) => void
  fieldErrors: Partial<Record<FieldErrorKey, boolean>>
  currentAddressSameAsId?: boolean | null
  currentAddress?: AddressFields
  onCurrentAddressSameAsIdChange?: (sameAsId: boolean) => void
  onCurrentAddressChange?: (
    field: keyof AddressFields,
    value: string,
  ) => void
  hasAllergy?: boolean | null
  allergyDetails?: string
  onHasAllergyChange?: (hasAllergy: boolean) => void
  onAllergyDetailsChange?: (value: string) => void
  otherMedicalCondition?: string
  onOtherMedicalConditionChange?: (value: string) => void
  emergencyContacts?: EmergencyContact[]
  onAddEmergencyContact?: () => void
  onUpdateEmergencyContact?: (
    id: string,
    patch: Partial<Pick<EmergencyContact, 'name' | 'phone'>>,
  ) => void
  onRemoveEmergencyContact?: (id: string) => void
  children?: ReactNode
}) {
  const fields = { ...EMPTY_MANUAL, ...manual }

  function isInvalid(field: keyof ManualDocFields) {
    return Boolean(fieldErrors[`${section}.${field}`])
  }

  function isRequired(field: keyof ManualDocFields) {
    if (
      field === 'dateOfBirth' ||
      field === 'contactNumber'
    ) {
      return section === 'identification'
    }
    if (field === 'issuerPhoneNumber') return section !== 'identification'
    return (REQUIRED_MANUAL_FIELDS as readonly string[]).includes(field)
  }

  return (
    <div className={sectionCardClass}>
      <SectionCardTitle
        step={step}
        qaField={section === 'identification' ? title : undefined}
      >
        {title}
      </SectionCardTitle>
      <DocumentUploadField
        label={uploadLabel}
        name={name}
        file={file}
        onChange={onFileChange}
        showLabel={section !== 'identification'}
      />
      <div className="space-y-3">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <span className="h-px flex-1 bg-line" aria-hidden />
          Manual input
          <span className="h-px flex-1 bg-line" aria-hidden />
        </p>
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {section === 'identification' ? (
            <div className="col-span-full grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <InlineBlankField
                label="Issued by:"
                name={`${name}IssuedBy`}
                value={fields.issuedBy}
                onChange={(value) => onManualChange('issuedBy', value)}
                required={isRequired('issuedBy')}
                invalid={isInvalid('issuedBy')}
                autoFocus
              />
              <InlineBlankField
                label="ID no:"
                name={`${name}IdNumber`}
                value={fields.idNumber}
                onChange={(value) => onManualChange('idNumber', value)}
                required={isRequired('idNumber')}
                invalid={isInvalid('idNumber')}
              />
              <InlineBlankField
                label="Issue date:"
                name={`${name}IssueDate`}
                placeholder="MM/DD/YYYY"
                value={fields.issueDate}
                onChange={(value) => onManualChange('issueDate', formatDateInput(value))}
                inputMode="numeric"
                maxLength={10}
                required={isRequired('issueDate')}
                invalid={isInvalid('issueDate')}
              />
              <InlineBlankField
                label="Expiry date:"
                name={`${name}ExpiryDate`}
                placeholder="MM/DD/YYYY"
                value={fields.expiryDate}
                onChange={(value) => onManualChange('expiryDate', formatDateInput(value))}
                inputMode="numeric"
                maxLength={10}
                required={isRequired('expiryDate')}
                invalid={isInvalid('expiryDate')}
              />
              <InlineBlankField
                label="Name as shown on ID:"
                name={`${name}FirstName`}
                value={fields.firstName}
                onChange={(value) => onManualChange('firstName', value)}
                required={isRequired('firstName')}
                invalid={isInvalid('firstName')}
              />
              <InlineBlankField
                label="Date of birth:"
                name={`${name}DateOfBirth`}
                type="date"
                placeholder="MM/DD/YYYY"
                value={fields.dateOfBirth}
                onChange={(value) => onManualChange('dateOfBirth', value)}
                required={isRequired('dateOfBirth')}
                invalid={isInvalid('dateOfBirth')}
              />
              <InlineBlankField
                label="Contact number:"
                name={`${name}ContactNumber`}
                type="tel"
                placeholder="+1-234-567-8910"
                value={fields.contactNumber}
                onChange={(value) => onManualChange('contactNumber', value)}
                inputMode="tel"
                required={isRequired('contactNumber')}
                invalid={isInvalid('contactNumber')}
              />
              <InlineBlankField
                label="Address:"
                name={`${name}Address`}
                value={fields.address}
                onChange={(value) => onManualChange('address', value)}
                required={isRequired('address')}
                invalid={isInvalid('address')}
              />
              <InlineBlankField
                label="City / CDP:"
                name={`${name}CityCdp`}
                value={fields.cityCdp}
                onChange={(value) => onManualChange('cityCdp', value)}
                required={isRequired('cityCdp')}
                invalid={isInvalid('cityCdp')}
              />
              <InlineBlankField
                label="County:"
                name={`${name}County`}
                value={fields.county}
                onChange={(value) => onManualChange('county', value)}
                required={isRequired('county')}
                invalid={isInvalid('county')}
              />
              <InlineBlankField
                label="Region:"
                name={`${name}Region`}
                value={fields.region}
                onChange={(value) => onManualChange('region', value)}
              />
              <InlineBlankField
                label="State:"
                name={`${name}State`}
                value={fields.state}
                onChange={(value) => onManualChange('state', value)}
                required={isRequired('state')}
                invalid={isInvalid('state')}
              />
              <InlineBlankField
                label="Zipcode:"
                name={`${name}ZipCode`}
                value={fields.zipCode}
                onChange={(value) => onManualChange('zipCode', value)}
                required={isRequired('zipCode')}
                invalid={isInvalid('zipCode')}
              />
              <InlineBlankField
                label="Country:"
                name={`${name}Country`}
                value={fields.country}
                onChange={(value) => onManualChange('country', value)}
                required={isRequired('country')}
                invalid={isInvalid('country')}
              />
            </div>
          ) : null}
          {section !== 'identification' ? (
            <InlineBlankField
              label={section === 'license' ? 'License / Credential #:' : 'ID#:'}
              name={`${name}IdNumber`}
              value={fields.idNumber}
              onChange={(value) => onManualChange('idNumber', value)}
              required={isRequired('idNumber')}
              invalid={isInvalid('idNumber')}
            />
          ) : null}
          {section !== 'identification' ? (
            <InlineBlankField
              label="Name issued to:"
              name={`${name}FirstName`}
              value={fields.firstName}
              onChange={(value) => onManualChange('firstName', value)}
              required={isRequired('firstName')}
              invalid={isInvalid('firstName')}
            />
          ) : null}
          {section !== 'identification' ? (
            <InlineBlankField
              label="Issued by:"
              name={`${name}IssuedBy`}
              value={fields.issuedBy}
              onChange={(value) => onManualChange('issuedBy', value)}
              required={isRequired('issuedBy')}
              invalid={isInvalid('issuedBy')}
            />
          ) : null}
          {section !== 'identification' ? (
            <InlineBlankField
              label="Issue date:"
              name={`${name}IssueDate`}
              placeholder="MM/DD/YYYY"
              value={fields.issueDate}
              onChange={(value) => onManualChange('issueDate', formatDateInput(value))}
              inputMode="numeric"
              maxLength={10}
              required={isRequired('issueDate')}
              invalid={isInvalid('issueDate')}
            />
          ) : null}
          {section !== 'identification' ? (
            <InlineBlankField
              label="Expiry date:"
              name={`${name}ExpiryDate`}
              placeholder="MM/DD/YYYY"
              value={fields.expiryDate}
              onChange={(value) => onManualChange('expiryDate', formatDateInput(value))}
              inputMode="numeric"
              maxLength={10}
              required={isRequired('expiryDate')}
              invalid={isInvalid('expiryDate')}
            />
          ) : null}
          {children}
          {section !== 'identification' ? (
            <div className="col-span-full sm:col-span-2 lg:col-span-3 space-y-3">
              <InlineBlankField
                label="Issuer Address:"
                name={`${name}Address`}
                value={fields.address}
                onChange={(value) => onManualChange('address', value)}
                required={isRequired('address')}
                invalid={isInvalid('address')}
                className="sm:col-span-2 lg:col-span-3"
              />
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                <InlineBlankField
                  label="City / CDP:"
                  name={`${name}CityCdp`}
                  value={fields.cityCdp}
                  onChange={(value) => onManualChange('cityCdp', value)}
                  required={isRequired('cityCdp')}
                  invalid={isInvalid('cityCdp')}
                />
                <InlineBlankField
                  label="County:"
                  name={`${name}County`}
                  value={fields.county}
                  onChange={(value) => onManualChange('county', value)}
                  required={isRequired('county')}
                  invalid={isInvalid('county')}
                />
                <InlineBlankField
                  label="Region:"
                  name={`${name}Region`}
                  value={fields.region}
                  onChange={(value) => onManualChange('region', value)}
                />
                <InlineBlankField
                  label="State:"
                  name={`${name}State`}
                  value={fields.state}
                  onChange={(value) => onManualChange('state', value)}
                  required={isRequired('state')}
                  invalid={isInvalid('state')}
                />
                <InlineBlankField
                  label="Zipcode:"
                  name={`${name}ZipCode`}
                  value={fields.zipCode}
                  onChange={(value) => onManualChange('zipCode', value)}
                  required={isRequired('zipCode')}
                  invalid={isInvalid('zipCode')}
                />
                <InlineBlankField
                  label="Country:"
                  name={`${name}Country`}
                  value={fields.country}
                  onChange={(value) => onManualChange('country', value)}
                  required={isRequired('country')}
                  invalid={isInvalid('country')}
                />
              </div>
            </div>
          ) : null}
          {section !== 'identification' ? (
            <InlineBlankField
              label="Issuer phone number:"
              name={`${name}IssuerPhoneNumber`}
              type="tel"
              placeholder="+1-234-567-8910"
              value={fields.issuerPhoneNumber}
              onChange={(value) => onManualChange('issuerPhoneNumber', value)}
              inputMode="tel"
              required={isRequired('issuerPhoneNumber')}
              invalid={isInvalid('issuerPhoneNumber')}
            />
          ) : null}
          {section === 'identification' && onCurrentAddressSameAsIdChange ? (
            <div className="col-span-full sm:col-span-2 lg:col-span-3 space-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span
                  className={cn(
                    'shrink-0 font-bold',
                    fieldErrors.identificationCurrentAddressSameAsId ||
                      fieldErrors.identificationCurrentAddress
                      ? 'text-danger'
                      : 'text-ink',
                  )}
                >
                  Current address:
                  <span className="text-danger"> *</span>
                </span>
                <SameAsIdAddressRadios
                  name={`${name}CurrentAddressSameAsId`}
                  value={currentAddressSameAsId ?? null}
                  onChange={onCurrentAddressSameAsIdChange}
                />
              </div>
              {currentAddressSameAsId === false && onCurrentAddressChange ? (
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  <InlineBlankField
                    label="Address:"
                    name={`${name}CurrentAddress`}
                    value={currentAddress.address}
                    onChange={(value) => onCurrentAddressChange('address', value)}
                    required
                    invalid={Boolean(fieldErrors.identificationCurrentAddress)}
                    className="sm:col-span-2 lg:col-span-3"
                  />
                  <InlineBlankField
                    label="City / CDP:"
                    name={`${name}CurrentCityCdp`}
                    value={currentAddress.cityCdp}
                    onChange={(value) => onCurrentAddressChange('cityCdp', value)}
                    required
                    invalid={Boolean(fieldErrors.identificationCurrentAddress)}
                  />
                  <InlineBlankField
                    label="County:"
                    name={`${name}CurrentCounty`}
                    value={currentAddress.county}
                    onChange={(value) => onCurrentAddressChange('county', value)}
                    required
                    invalid={Boolean(fieldErrors.identificationCurrentAddress)}
                  />
                  <InlineBlankField
                    label="Region:"
                    name={`${name}CurrentRegion`}
                    value={currentAddress.region}
                    onChange={(value) => onCurrentAddressChange('region', value)}
                  />
                  <InlineBlankField
                    label="State:"
                    name={`${name}CurrentState`}
                    value={currentAddress.state}
                    onChange={(value) => onCurrentAddressChange('state', value)}
                    required
                    invalid={Boolean(fieldErrors.identificationCurrentAddress)}
                  />
                  <InlineBlankField
                    label="Zipcode:"
                    name={`${name}CurrentZipCode`}
                    value={currentAddress.zipCode}
                    onChange={(value) => onCurrentAddressChange('zipCode', value)}
                    required
                    invalid={Boolean(fieldErrors.identificationCurrentAddress)}
                  />
                  <InlineBlankField
                    label="Country:"
                    name={`${name}CurrentCountry`}
                    value={currentAddress.country}
                    onChange={(value) => onCurrentAddressChange('country', value)}
                    required
                    invalid={Boolean(fieldErrors.identificationCurrentAddress)}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {section === 'identification' ? (
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-line" aria-hidden />
            In case of emergency
            <span className="h-px flex-1 bg-line" aria-hidden />
          </p>
          {onHasAllergyChange ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
              <div className="flex w-fit shrink-0 items-end gap-2 text-sm">
                <FieldLabelWithQa
                  label="Any allergy:"
                  required
                  invalid={Boolean(fieldErrors.hasAllergy)}
                  className={cn(
                    'shrink-0 pb-1.5 font-bold',
                    fieldErrors.hasAllergy ? 'text-danger' : 'text-ink',
                  )}
                />
                <div className="flex items-end pb-1.5">
                  <YesNoButtons
                    name={`${name}HasAllergy`}
                    value={hasAllergy}
                    onChange={onHasAllergyChange}
                    compact
                  />
                </div>
              </div>
              {onAllergyDetailsChange ? (
                <InlineBlankField
                  label="Which allergy:"
                  name={`${name}AllergyDetails`}
                  value={allergyDetails}
                  onChange={onAllergyDetailsChange}
                  placeholder="e.g Bee Sting's, Penicillin ,"
                  required={hasAllergy === true}
                  invalid={Boolean(fieldErrors.allergyDetails)}
                  className="min-w-0 flex-1"
                />
              ) : null}
            </div>
          ) : null}
          {onOtherMedicalConditionChange ? (
            <InlineBlankField
              label="Any other medical condition:"
              name={`${name}OtherMedicalCondition`}
              value={otherMedicalCondition}
              onChange={onOtherMedicalConditionChange}
              multiline
            />
          ) : null}
          {onUpdateEmergencyContact ? (
            <div className="space-y-3">
              {emergencyContacts.map((item, index) => (
                <div key={item.id} className="space-y-2">
                  <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                    <InlineBlankField
                      label="Name to contact in emergency:"
                      name={`${name}EmergencyContactName-${item.id}`}
                      value={item.name}
                      onChange={(value) =>
                        onUpdateEmergencyContact(item.id, { name: value })
                      }
                      required
                      invalid={Boolean(fieldErrors.emergencyContacts)}
                    />
                    <InlineBlankField
                      label="Emergency contact no:"
                      name={`${name}EmergencyContactPhone-${item.id}`}
                      type="tel"
                      placeholder="+1-234-567-8910"
                      value={item.phone}
                      onChange={(value) =>
                        onUpdateEmergencyContact(item.id, { phone: value })
                      }
                      inputMode="tel"
                      required
                      invalid={Boolean(fieldErrors.emergencyContacts)}
                    />
                  </div>
                  {index > 0 && onRemoveEmergencyContact ? (
                    <div className="flex justify-center pt-1">
                      <button
                        type="button"
                        onClick={() => onRemoveEmergencyContact(item.id)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-ink text-ink transition hover:border-brand hover:bg-brand-light/40 hover:text-brand"
                        aria-label="Remove emergency contact"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
              {onAddEmergencyContact ? (
                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={onAddEmergencyContact}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-ink text-ink transition hover:border-brand hover:bg-brand-light/40 hover:text-brand"
                    aria-label="Add another emergency contact"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
