import type { HeroFiltersState } from '@/features/search'
import { DEFAULT_FILTERS } from '@/features/search'
import {
  createEmptyAcceptedPolicies,
  type AcceptedPolicies,
} from '@/features/auth/data/registerPolicyAgreements'
import {
  createEmptyEmergencyContact,
  createEmptyFormOfPaymentMethod,
  EMPTY_ADDRESS_FIELDS,
  EMPTY_MANUAL,
  INITIAL_REGISTER_PSP_FORM,
  type AddressFields,
  type EmergencyContact,
  type FormOfPaymentMethodEntry,
  type ManualDocFields,
  type RegisterPspFormData,
} from '@/features/auth/model/registerPsp'

export type RegisterFormMode = 'client' | 'psp'

/** Serializable registration payload (files omitted — not localStorage-safe). */
export type StoredRegistrationForm = Omit<
  RegisterPspFormData,
  | 'identificationDoc'
  | 'contractorLicenseDoc'
  | 'insuranceDoc'
  | 'additionalLicenses'
  | 'employees'
> & {
  employees: Array<{
    id: string
    name: string
    email: string
    password: string
    confirmPassword: string
  }>
  additionalLicenses: Array<{ id: string; name: string }>
}

export type RegistrationProfile = {
  mode: RegisterFormMode
  form: StoredRegistrationForm
  profileFilters: HeroFiltersState
  updatedAt: string
}

const STORAGE_KEY = 're-registration-profile'

function stripFiles(data: RegisterPspFormData): StoredRegistrationForm {
  const {
    identificationDoc: _idDoc,
    contractorLicenseDoc: _licDoc,
    insuranceDoc: _insDoc,
    additionalLicenses,
    ...rest
  } = data
  return {
    ...rest,
    additionalLicenses: (additionalLicenses ?? []).map(({ id, name }) => ({ id, name })),
    employees: (data.employees ?? []).map((employee) => ({ ...employee })),
  }
}

function reviveForm(stored: StoredRegistrationForm): RegisterPspFormData {
  return {
    ...INITIAL_REGISTER_PSP_FORM,
    ...stored,
    acceptedPolicies: {
      ...createEmptyAcceptedPolicies(),
      ...(stored.acceptedPolicies ?? {}),
    } as AcceptedPolicies,
    identification: { ...EMPTY_MANUAL, ...stored.identification },
    identificationCurrentAddress: {
      ...EMPTY_ADDRESS_FIELDS,
      ...stored.identificationCurrentAddress,
    },
    businessAddressFields: {
      ...EMPTY_ADDRESS_FIELDS,
      ...stored.businessAddressFields,
    },
    license: { ...EMPTY_MANUAL, ...stored.license },
    insurance: { ...EMPTY_MANUAL, ...stored.insurance },
    identificationDoc: null,
    contractorLicenseDoc: null,
    insuranceDoc: null,
    additionalLicenses: (stored.additionalLicenses ?? []).map((item) => ({
      ...item,
      file: null,
    })),
    employees: (stored.employees ?? []).map((employee) => ({ ...employee })),
    emergencyContacts:
      stored.emergencyContacts?.length > 0
        ? stored.emergencyContacts
        : [createEmptyEmergencyContact()],
    formOfPaymentMethods:
      stored.formOfPaymentMethods?.length > 0
        ? stored.formOfPaymentMethods
        : [createEmptyFormOfPaymentMethod()],
  }
}

/** Demo seed so Settings works after Skip / Sign in without a prior registration. */
export function createDemoRegistrationProfile(
  mode: RegisterFormMode = 'client',
): RegistrationProfile {
  const identification: ManualDocFields = {
    ...EMPTY_MANUAL,
    firstName: 'Rigoberto Peraza',
    dateOfBirth: '1988-04-12',
    idNumber: 'D1234567',
    address: '1247 Palm Avenue',
    cityCdp: 'Fresno',
    county: 'Fresno',
    region: 'Central Valley',
    state: 'CA',
    zipCode: '93728',
    country: 'United States',
    issueDate: '2020-01-15',
    expiryDate: '2028-01-15',
    issuedBy: 'CA DMV',
    issuerPhoneNumber: '(800) 777-0133',
    contactNumber: '(559) 555-0142',
  }
  const currentAddress: AddressFields = {
    address: identification.address,
    cityCdp: identification.cityCdp,
    county: identification.county,
    region: identification.region,
    state: identification.state,
    zipCode: identification.zipCode,
    country: identification.country,
  }
  const emergencyContacts: EmergencyContact[] = [
    { id: 'ec-demo-1', name: 'Maria Peraza', phone: '(559) 555-0198' },
  ]
  const formOfPaymentMethods: FormOfPaymentMethodEntry[] = [
    {
      ...createEmptyFormOfPaymentMethod(),
      id: 'pay-demo-1',
      type: 'Direct Deposit',
      routingNumber: '121000248',
      accountNumber: '••••4521',
    },
  ]

  const form: StoredRegistrationForm = {
    ...stripFiles({
      ...INITIAL_REGISTER_PSP_FORM,
      registrationDate: '03/15/2025',
      registrationTime: '10:30:00',
      email: 'rigoberto@example.com',
      phone: '(559) 555-0142',
      password: '••••••••',
      confirmPassword: '••••••••',
      acceptedPolicies: Object.fromEntries(
        Object.keys(createEmptyAcceptedPolicies()).map((id) => [id, true]),
      ) as AcceptedPolicies,
      identification,
      identificationCurrentAddressSameAsId: true,
      identificationCurrentAddress: currentAddress,
      hasAllergy: false,
      allergyDetails: '',
      otherMedicalCondition: '',
      emergencyContacts,
      formOfPaymentMethods,
      businessName: mode === 'psp' ? 'Peraza Property Services' : '',
      businessEmail: mode === 'psp' ? 'office@perazaproperty.com' : '',
      businessWebsite: mode === 'psp' ? 'https://perazaproperty.com' : '',
      businessAddressSameAs: mode === 'psp' ? 'sameAsId' : null,
      businessAddressFields: mode === 'psp' ? { ...currentAddress } : { ...EMPTY_ADDRESS_FIELDS },
      license: mode === 'psp' ? { ...identification, idNumber: 'BRE-0184721' } : { ...EMPTY_MANUAL },
      insurance: mode === 'psp' ? { ...identification, idNumber: 'INS-992341' } : { ...EMPTY_MANUAL },
      insuranceInfo: mode === 'psp' ? 'General liability $1M / $2M aggregate' : '',
      numberOfEmployees: mode === 'psp' ? '1' : '',
      employees:
        mode === 'psp'
          ? [
              {
                id: 'emp-demo-1',
                name: 'Rigoberto Peraza',
                email: 'rigoberto@example.com',
                password: '••••••••',
                confirmPassword: '••••••••',
              },
            ]
          : [],
      membershipTotal: mode === 'psp' ? '49' : '',
      billingAddressSameAs: mode === 'psp' ? 'sameAsId' : null,
    }),
  }

  return {
    mode,
    form,
    profileFilters: { ...DEFAULT_FILTERS },
    updatedAt: new Date().toISOString(),
  }
}

export function saveRegistrationProfile(
  mode: RegisterFormMode,
  data: RegisterPspFormData,
  profileFilters: HeroFiltersState,
) {
  const profile: RegistrationProfile = {
    mode,
    form: stripFiles(data),
    profileFilters: { ...profileFilters },
    updatedAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  return profile
}

export function readRegistrationProfile(): RegistrationProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as RegistrationProfile
    if (!parsed?.form || (parsed.mode !== 'client' && parsed.mode !== 'psp')) {
      return null
    }
    return {
      ...parsed,
      profileFilters: { ...DEFAULT_FILTERS, ...parsed.profileFilters },
    }
  } catch {
    return null
  }
}

/** Persist a demo profile for the chosen registration path (e.g. Skip on PSP form). */
export function seedRegistrationProfile(mode: RegisterFormMode) {
  const profile = createDemoRegistrationProfile(mode)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  return profile
}

/** Load saved profile, or a demo seed for signed-in users without one. */
export function getRegistrationProfileForEdit(
  fallbackMode: RegisterFormMode = 'client',
): { profile: RegistrationProfile; formData: RegisterPspFormData } {
  const profile = readRegistrationProfile() ?? createDemoRegistrationProfile(fallbackMode)
  return {
    profile,
    formData: reviveForm(profile.form),
  }
}

export function clearRegistrationProfile() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage failures.
  }
}
