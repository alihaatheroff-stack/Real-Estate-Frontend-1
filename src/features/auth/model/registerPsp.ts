export const REGISTER_FIND_OPTIONS = ['Profile', 'Office']

export const WEEKDAYS = [
  { label: 'Mon', value: 'monday' },
  { label: 'Tue', value: 'tuesday' },
  { label: 'Wed', value: 'wednesday' },
  { label: 'Thu', value: 'thursday' },
  { label: 'Fri', value: 'friday' },
  { label: 'Sat', value: 'saturday' },
  { label: 'Sun', value: 'sunday' },
] as const

export type DayBusinessHours = { start: string; end: string }

export const EMPTY_DAY_HOURS: DayBusinessHours = { start: '', end: '' }

export function hasCompleteDayHours(hours: DayBusinessHours | undefined) {
  return Boolean(hours?.start && hours?.end)
}

export type ManualDocFields = {
  dateOfBirth: string
  idNumber: string
  firstName: string
  address: string
  cityCdp: string
  county: string
  country: string
  region: string
  state: string
  zipCode: string
  issueDate: string
  expiryDate: string
  issuedBy: string
  issuerPhoneNumber: string
  contactNumber: string
}

export const MANUAL_ADDRESS_FIELDS = [
  'address',
  'cityCdp',
  'county',
  'region',
  'state',
  'zipCode',
  'country',
] as const satisfies readonly (keyof ManualDocFields)[]

export type ManualAddressField = (typeof MANUAL_ADDRESS_FIELDS)[number]

export type AddressSameAsChoice = 'sameAsId' | 'sameAsCurrent' | 'no'

export type BillingAddressChoice = 'sameAsId' | 'physicalAddress' | 'mailingAddress'

export type AddressFields = Pick<ManualDocFields, ManualAddressField>

export const EMPTY_ADDRESS_FIELDS: AddressFields = {
  address: '',
  cityCdp: '',
  county: '',
  region: '',
  state: '',
  zipCode: '',
  country: '',
}

export function pickManualAddressFields(
  fields: Pick<ManualDocFields, ManualAddressField>,
): AddressFields {
  return {
    address: fields.address,
    cityCdp: fields.cityCdp,
    county: fields.county,
    region: fields.region,
    state: fields.state,
    zipCode: fields.zipCode,
    country: fields.country,
  }
}

export type AdditionalLicense = {
  id: string
  name: string
  file: File | null
}

export type EmergencyContact = {
  id: string
  name: string
  phone: string
}

export function createEmptyEmergencyContact(): EmergencyContact {
  return { id: crypto.randomUUID(), name: '', phone: '' }
}

export type BusinessEmployee = {
  id: string
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type BusinessEmployeeField = keyof Omit<BusinessEmployee, 'id'>

export const EMPTY_BUSINESS_EMPLOYEE_FIELDS: Omit<BusinessEmployee, 'id'> = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function createEmptyBusinessEmployee(): BusinessEmployee {
  return { id: crypto.randomUUID(), ...EMPTY_BUSINESS_EMPLOYEE_FIELDS }
}

export type FormOfPaymentMethodType =
  | 'Direct Deposit'
  | 'Stripe'
  | 'PayPal'
  | 'Square'
  | 'Zelle'
  | 'Venmo'
  | 'CashApp'
  | 'Check'
  | 'Other'

export type FormOfPaymentMethodField =
  | 'type'
  | 'routingNumber'
  | 'accountNumber'
  | 'link'
  | 'zelleEmail'
  | 'zellePhone'
  | 'sameAsBusiness'
  | 'otherName'
  | 'otherRoutingNumber'
  | 'otherUrl'

export type FormOfPaymentMethodEntry = {
  id: string
  type: FormOfPaymentMethodType | ''
  routingNumber: string
  accountNumber: string
  link: string
  zelleEmail: string
  zellePhone: string
  sameAsBusiness: boolean
  otherName: string
  otherRoutingNumber: string
  otherUrl: string
}

export function createEmptyFormOfPaymentMethod(): FormOfPaymentMethodEntry {
  return {
    id: crypto.randomUUID(),
    type: '',
    routingNumber: '',
    accountNumber: '',
    link: '',
    zelleEmail: '',
    zellePhone: '',
    sameAsBusiness: true,
    otherName: '',
    otherRoutingNumber: '',
    otherUrl: '',
  }
}

export type RegisterPspFormData = {
  registrationTime: string
  registrationDate: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptedPrivacyPolicy: boolean
  acceptedTermsOfService: boolean
  businessName: string
  businessEmail: string
  businessWebsite: string
  businessAddressSameAs: AddressSameAsChoice | null
  businessAddressFields: AddressFields
  businessOpenDays: string[]
  businessHoursByDay: Record<string, DayBusinessHours>
  bestTimesToReach: string
  numberOfEmployees: string
  employees: BusinessEmployee[]
  identification: ManualDocFields
  identificationDoc: File | null
  identificationCurrentAddressSameAsId: boolean | null
  identificationCurrentAddress: AddressFields
  hasAllergy: boolean | null
  allergyDetails: string
  otherMedicalCondition: string
  emergencyContacts: EmergencyContact[]
  license: ManualDocFields
  contractorLicenseDoc: File | null
  insurance: ManualDocFields
  insuranceInfo: string
  insuranceDoc: File | null
  additionalLicenses: AdditionalLicense[]
  formOfPaymentMethods: FormOfPaymentMethodEntry[]
  membershipAssociates: string
  membershipTotal: string
  membershipGpsTotal: string
  membershipAdvertiseTotal: string
  membershipDealsClosedTotal: string
  membershipTaxTotal: string
  billingAddressSameAs: BillingAddressChoice | null
  billingPhysicalAddress: string
  billingMailingAddress: string
}

export type MembershipAmenityTotalField =
  | 'membershipGpsTotal'
  | 'membershipAdvertiseTotal'
  | 'membershipDealsClosedTotal'
  | 'membershipTaxTotal'

export const EMPTY_MANUAL: ManualDocFields = {
  dateOfBirth: '',
  idNumber: '',
  firstName: '',
  address: '',
  cityCdp: '',
  county: '',
  country: '',
  region: '',
  state: '',
  zipCode: '',
  issueDate: '',
  expiryDate: '',
  issuedBy: '',
  issuerPhoneNumber: '',
  contactNumber: '',
}

export function formatNow() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    date: `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()}`,
  }
}

export const INITIAL_REGISTER_PSP_FORM: RegisterPspFormData = {
  registrationTime: '',
  registrationDate: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptedPrivacyPolicy: false,
  acceptedTermsOfService: false,
  businessName: '',
  businessEmail: '',
  businessWebsite: '',
  businessAddressSameAs: null,
  businessAddressFields: { ...EMPTY_ADDRESS_FIELDS },
  businessOpenDays: [],
  businessHoursByDay: {},
  bestTimesToReach: '',
  numberOfEmployees: '',
  employees: [],
  identification: { ...EMPTY_MANUAL },
  identificationDoc: null,
  identificationCurrentAddressSameAsId: null,
  identificationCurrentAddress: { ...EMPTY_ADDRESS_FIELDS },
  hasAllergy: null,
  allergyDetails: '',
  otherMedicalCondition: '',
  emergencyContacts: [],
  license: { ...EMPTY_MANUAL },
  contractorLicenseDoc: null,
  insurance: { ...EMPTY_MANUAL },
  insuranceInfo: '',
  insuranceDoc: null,
  additionalLicenses: [],
  formOfPaymentMethods: [],
  membershipAssociates: '',
  membershipTotal: '',
  membershipGpsTotal: '',
  membershipAdvertiseTotal: '',
  membershipDealsClosedTotal: '',
  membershipTaxTotal: '',
  billingAddressSameAs: null,
  billingPhysicalAddress: '',
  billingMailingAddress: '',
}

export const REQUIRED_MANUAL_FIELDS = [
  'dateOfBirth',
  'idNumber',
  'firstName',
  'address',
  'cityCdp',
  'county',
  'country',
  'state',
  'zipCode',
  'issueDate',
  'expiryDate',
  'issuedBy',
  'issuerPhoneNumber',
  'contactNumber',
] as const satisfies readonly (keyof ManualDocFields)[]

export type ManualSection = 'identification' | 'license' | 'insurance'

export type BusinessFieldKey =
  | 'businessName'
  | 'businessEmail'
  | 'businessWebsite'
  | 'businessAddressSameAs'
  | 'businessAddressFields'
  | 'billingAddressSameAs'
  | 'billingPhysicalAddress'
  | 'billingMailingAddress'
  | 'phone'
  | 'businessOpenDays'
  | 'businessOpenHours'
  | 'bestTimesToReach'
  | 'numberOfEmployees'

export type FieldErrorKey =
  | `${ManualSection}.${keyof ManualDocFields}`
  | 'identificationCurrentAddress'
  | 'identificationCurrentAddressSameAsId'
  | 'hasAllergy'
  | 'allergyDetails'
  | 'otherMedicalCondition'
  | 'emergencyContacts'
  | 'insuranceInfo'
  | 'acceptedPrivacyPolicy'
  | 'acceptedTermsOfService'
  | 'pspCategory'
  | BusinessFieldKey
  | `employee.${string}.${BusinessEmployeeField}`

export function getMissingManualFields(
  fields: ManualDocFields,
  section: ManualSection,
): (keyof ManualDocFields)[] {
  const merged = { ...EMPTY_MANUAL, ...fields }
  return REQUIRED_MANUAL_FIELDS.filter((key) => {
    if (key === 'dateOfBirth' && section !== 'identification') return false
    if (key === 'issuerPhoneNumber' && section === 'identification') return false
    if (key === 'contactNumber' && section !== 'identification') return false
    return !merged[key].trim()
  })
}

export function isManualComplete(fields: ManualDocFields, section: ManualSection) {
  return getMissingManualFields(fields, section).length === 0
}
