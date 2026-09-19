import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { setAuthenticated } from '@/features/auth/session'
import {
  EMPTY_DAY_HOURS,
  hasCompleteDayHours,
  type ManualDocFields,
  type AdditionalLicense,
  type EmergencyContact,
  type RegisterPspFormData as FormData,
  EMPTY_MANUAL,
  formatNow,
  INITIAL_REGISTER_PSP_FORM as INITIAL,
  MANUAL_ADDRESS_FIELDS,
  EMPTY_ADDRESS_FIELDS,
  pickManualAddressFields,
  type AddressSameAsChoice,
  type BillingAddressChoice,
  type AddressFields,
  type ManualSection,
  type BusinessFieldKey,
  type BusinessEmployeeField,
  type FieldErrorKey,
  createEmptyBusinessEmployee,
  createEmptyEmergencyContact,
  createEmptyFormOfPaymentMethod,
  type FormOfPaymentMethodField,
  type FormOfPaymentMethodType,
  getMissingManualFields,
  isManualComplete,
  type DayBusinessHours,
} from '@/features/auth/model/registerPsp'
import {
  DEFAULT_FILTERS,
  SERVICE_DISTANCE_MIN,
  type HeroFiltersState,
  joinCsv,
  splitCsv,
} from '@/features/search'
import { getResolvedBusinessAddress } from '@/features/auth/components/register/formOfPayment'

/** All Register PSP form state, updaters, and validation — keeps the view thin. */
export function useRegisterPspForm() {
  const navigate = useNavigate()
  const [data, setData] = useState<FormData>(() => {
    const now = formatNow()
    return {
      ...INITIAL,
      registrationTime: now.time,
      registrationDate: now.date,
      employees: [createEmptyBusinessEmployee()],
      additionalLicenses: [],
      emergencyContacts: [createEmptyEmergencyContact()],
      formOfPaymentMethods: [createEmptyFormOfPaymentMethod()],
    }
  })
  useEffect(() => {
    let intervalId = 0
    const applyNow = () => {
      const now = formatNow()
      setData((prev) =>
        prev.registrationTime === now.time
          ? prev
          : { ...prev, registrationTime: now.time },
      )
    }
    applyNow()
    const timeoutId = window.setTimeout(() => {
      applyNow()
      intervalId = window.setInterval(applyNow, 1000)
    }, Math.max(0, 1000 - (Date.now() % 1000)))
    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [])

  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldErrorKey, boolean>>>({})
  const [profileFilters, setProfileFilters] = useState<HeroFiltersState>({
    ...DEFAULT_FILTERS,
  })
  const additionalLicenses = data.additionalLicenses ?? []
  const employees = data.employees ?? []
  const formOfPaymentMethods = data.formOfPaymentMethods ?? []
  const resolvedBusinessAddress = getResolvedBusinessAddress(data)

  const findLabels = splitCsv(profileFilters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })
  const selectedPsp = splitCsv(profileFilters.pspCategory)
  const selectedFields = splitCsv(profileFilters.field)
  const representation = splitCsv(profileFilters.representation)
  const showRepresentation = selectedPsp.some(
    (value) => value === 'Agent' || value.startsWith('Agent > '),
  )
  const showBuying = representation.some(
    (value) => value === 'Buying' || value === 'Mortgage',
  )
  const distance = Number(profileFilters.radius || SERVICE_DISTANCE_MIN)

  function setProfileFilter<K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) {
    setProfileFilters((prev) => ({ ...prev, [key]: value }))
    setError('')
    if (key === 'pspCategory') clearFieldError('pspCategory')
  }

  function setProfileFilterList(key: keyof HeroFiltersState, next: string[]) {
    if (key === 'find') {
      const mapped = next.map((label) => {
        if (label === 'Service') return 'service'
        if (label === 'Profile') return 'profile'
        if (label === 'Office') return 'agency'
        return label
      })
      setProfileFilter('find', joinCsv(mapped))
      return
    }
    if (key === 'pspCategory') {
      setProfileFilter('pspCategory', joinCsv(next))
      const stillAgent = next.some(
        (value) => value === 'Agent' || value.startsWith('Agent > '),
      )
      if (!stillAgent) {
        setProfileFilters((prev) => ({
          ...prev,
          pspCategory: joinCsv(next),
          representation: '',
          financing: '',
        }))
      }
      return
    }
    if (key === 'representation') {
      setProfileFilter('representation', joinCsv(next))
      const stillBuying = next.some(
        (value) => value === 'Buying' || value === 'Mortgage',
      )
      if (!stillBuying) setProfileFilter('financing', '')
      return
    }
    setProfileFilter(key, joinCsv(next))
  }

  function clearFieldError(key: FieldErrorKey) {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setError('')
    if (key === 'insuranceInfo') clearFieldError('insuranceInfo')
    if (
      key === 'businessName' ||
      key === 'businessEmail' ||
      key === 'businessWebsite' ||
      key === 'businessAddressSameAs' ||
      key === 'businessAddressFields' ||
      key === 'phone' ||
      key === 'bestTimesToReach' ||
      key === 'numberOfEmployees' ||
      key === 'billingAddressSameAs' ||
      key === 'billingPhysicalAddress' ||
      key === 'billingMailingAddress' ||
      key === 'hasAllergy' ||
      key === 'allergyDetails' ||
      key === 'otherMedicalCondition'
    ) {
      clearFieldError(key)
    }
  }

  function setHasAllergy(hasAllergy: boolean) {
    setData((prev) => ({
      ...prev,
      hasAllergy,
      allergyDetails: hasAllergy ? prev.allergyDetails : '',
    }))
    setError('')
    clearFieldError('hasAllergy')
    if (!hasAllergy) clearFieldError('allergyDetails')
  }

  function addEmergencyContact() {
    setData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...(prev.emergencyContacts ?? [createEmptyEmergencyContact()]),
        createEmptyEmergencyContact(),
      ],
    }))
    setError('')
  }

  function updateEmergencyContact(
    id: string,
    patch: Partial<Pick<EmergencyContact, 'name' | 'phone'>>,
  ) {
    setData((prev) => ({
      ...prev,
      emergencyContacts: (prev.emergencyContacts ?? []).map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }))
    setError('')
    clearFieldError('emergencyContacts')
  }

  function removeEmergencyContact(id: string) {
    setData((prev) => {
      const next = (prev.emergencyContacts ?? []).filter((item) => item.id !== id)
      return {
        ...prev,
        emergencyContacts: next.length > 0 ? next : [createEmptyEmergencyContact()],
      }
    })
    setError('')
  }

  function updateManual(
    key: ManualSection,
    field: keyof ManualDocFields,
    value: string,
  ) {
    setData((prev) => {
      const next = {
        ...prev,
        [key]: { ...EMPTY_MANUAL, ...prev[key], [field]: value },
      }
      if (
        key === 'identification' &&
        (MANUAL_ADDRESS_FIELDS as readonly string[]).includes(field)
      ) {
        const idAddress = pickManualAddressFields(next.identification)
        if (prev.businessAddressSameAs === 'sameAsId') {
          next.businessAddressFields = idAddress
        } else if (
          prev.businessAddressSameAs === 'sameAsCurrent' &&
          prev.identificationCurrentAddressSameAsId === true
        ) {
          next.businessAddressFields = idAddress
        }
      }
      return next
    })
    setError('')
    clearFieldError(`${key}.${field}`)
  }

  function resolveAddressForChoice(
    prev: FormData,
    choice: AddressSameAsChoice,
  ): AddressFields {
    if (choice === 'sameAsId') {
      return pickManualAddressFields(prev.identification)
    }
    if (choice === 'sameAsCurrent') {
      if (prev.identificationCurrentAddressSameAsId === true) {
        return pickManualAddressFields(prev.identification)
      }
      return pickManualAddressFields(prev.identificationCurrentAddress)
    }
    return { ...EMPTY_ADDRESS_FIELDS }
  }

  function setIdentificationCurrentAddressSameAsId(sameAsId: boolean) {
    setData((prev) => {
      const identificationCurrentAddress = sameAsId
        ? { ...EMPTY_ADDRESS_FIELDS }
        : prev.identificationCurrentAddress
      const next: FormData = {
        ...prev,
        identificationCurrentAddressSameAsId: sameAsId,
        identificationCurrentAddress,
      }
      const currentResolved = resolveAddressForChoice(next, 'sameAsCurrent')
      if (prev.businessAddressSameAs === 'sameAsCurrent') {
        next.businessAddressFields = currentResolved
      }
      return next
    })
    setError('')
    clearFieldError('identificationCurrentAddress')
    clearFieldError('identificationCurrentAddressSameAsId')
  }

  function updateIdentificationCurrentAddress(
    field: keyof FormData['identificationCurrentAddress'],
    value: string,
  ) {
    setData((prev) => {
      const identificationCurrentAddress = {
        ...prev.identificationCurrentAddress,
        [field]: value,
      }
      const next: FormData = { ...prev, identificationCurrentAddress }
      if (
        prev.businessAddressSameAs === 'sameAsCurrent' &&
        prev.identificationCurrentAddressSameAsId !== true
      ) {
        next.businessAddressFields = pickManualAddressFields(identificationCurrentAddress)
      }
      return next
    })
    setError('')
    clearFieldError('identificationCurrentAddress')
  }

  function setBusinessAddressSameAs(choice: AddressSameAsChoice) {
    setData((prev) => ({
      ...prev,
      businessAddressSameAs: choice,
      businessAddressFields: resolveAddressForChoice(prev, choice),
    }))
    setError('')
    clearFieldError('businessAddressSameAs')
    clearFieldError('businessAddressFields')
  }

  function setBillingAddressSameAs(choice: BillingAddressChoice) {
    setData((prev) => ({
      ...prev,
      billingAddressSameAs: choice,
    }))
    clearFieldError('billingAddressSameAs')
    clearFieldError('billingPhysicalAddress')
    clearFieldError('billingMailingAddress')
    setError('')
  }

  function updateBillingPhysicalAddress(value: string) {
    setData((prev) => ({ ...prev, billingPhysicalAddress: value }))
    clearFieldError('billingPhysicalAddress')
    setError('')
  }

  function updateBillingMailingAddress(value: string) {
    setData((prev) => ({ ...prev, billingMailingAddress: value }))
    clearFieldError('billingMailingAddress')
    setError('')
  }

  function updateBusinessAddress(
    field: keyof FormData['businessAddressFields'],
    value: string,
  ) {
    setData((prev) => ({
      ...prev,
      businessAddressFields: { ...prev.businessAddressFields, [field]: value },
    }))
    setError('')
    clearFieldError('businessAddressFields')
  }

  function toggleBusinessDay(day: string) {
    setData((prev) => {
      const selected = prev.businessOpenDays.includes(day)
      const businessOpenDays = selected
        ? prev.businessOpenDays.filter((d) => d !== day)
        : [...prev.businessOpenDays, day]
      const businessHoursByDay = { ...prev.businessHoursByDay }
      if (selected) {
        delete businessHoursByDay[day]
      } else {
        businessHoursByDay[day] = businessHoursByDay[day] ?? { ...EMPTY_DAY_HOURS }
      }
      return { ...prev, businessOpenDays, businessHoursByDay }
    })
    setError('')
    clearFieldError('businessOpenDays')
    clearFieldError('businessOpenHours')
  }

  function setDayHours(day: string, hours: DayBusinessHours) {
    setData((prev) => ({
      ...prev,
      businessHoursByDay: { ...prev.businessHoursByDay, [day]: hours },
    }))
    setError('')
    clearFieldError('businessOpenHours')
  }

  function addAdditionalLicense() {
    setData((prev) => ({
      ...prev,
      additionalLicenses: [
        ...(prev.additionalLicenses ?? []),
        { id: crypto.randomUUID(), name: '', file: null },
      ],
    }))
    setError('')
  }

  function updateAdditionalLicense(
    id: string,
    patch: Partial<Pick<AdditionalLicense, 'name' | 'file'>>,
  ) {
    setData((prev) => ({
      ...prev,
      additionalLicenses: (prev.additionalLicenses ?? []).map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }))
    setError('')
  }

  function removeAdditionalLicense(id: string) {
    setData((prev) => ({
      ...prev,
      additionalLicenses: (prev.additionalLicenses ?? []).filter((item) => item.id !== id),
    }))
    setError('')
  }

  function addEmployee() {
    setData((prev) => ({
      ...prev,
      employees: [...(prev.employees ?? []), createEmptyBusinessEmployee()],
    }))
    setError('')
  }

  function updateEmployee(
    id: string,
    field: BusinessEmployeeField,
    value: string,
  ) {
    setData((prev) => ({
      ...prev,
      employees: (prev.employees ?? []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }))
    setError('')
    clearFieldError(`employee.${id}.${field}`)
    if (field === 'password' || field === 'confirmPassword') {
      clearFieldError(`employee.${id}.confirmPassword`)
    }
  }

  function removeEmployee(id: string) {
    setData((prev) => {
      const next = (prev.employees ?? []).filter((item) => item.id !== id)
      return {
        ...prev,
        employees: next.length > 0 ? next : [createEmptyBusinessEmployee()],
      }
    })
    setError('')
  }

  function addFormOfPaymentMethod() {
    setData((prev) => ({
      ...prev,
      formOfPaymentMethods: [
        ...(prev.formOfPaymentMethods ?? []),
        createEmptyFormOfPaymentMethod(),
      ],
    }))
    setError('')
  }

  function updateFormOfPaymentMethod(
    id: string,
    field: FormOfPaymentMethodField,
    value: string | boolean,
  ) {
    setData((prev) => ({
      ...prev,
      formOfPaymentMethods: (prev.formOfPaymentMethods ?? []).map((item) => {
        if (item.id !== id) return item
        if (field === 'type') {
          const type = value as FormOfPaymentMethodType | ''
          return {
            ...item,
            type,
            routingNumber: '',
            accountNumber: '',
            link: '',
            zelleEmail: '',
            zellePhone: '',
            sameAsBusiness: type === 'Check',
            otherName: '',
            otherRoutingNumber: '',
            otherUrl: '',
          }
        }
        return { ...item, [field]: value }
      }),
    }))
    setError('')
  }

  function removeFormOfPaymentMethod(id: string) {
    setData((prev) => {
      const next = (prev.formOfPaymentMethods ?? []).filter((item) => item.id !== id)
      return {
        ...prev,
        formOfPaymentMethods:
          next.length > 0 ? next : [createEmptyFormOfPaymentMethod()],
      }
    })
    setError('')
  }

  function validateForm(): boolean {
    const nextErrors: Partial<Record<FieldErrorKey, boolean>> = {}

    function markManualErrors(section: ManualSection, fields: ManualDocFields) {
      for (const field of getMissingManualFields(fields, section)) {
        nextErrors[`${section}.${field}`] = true
      }
    }

    markManualErrors('identification', data.identification)
    markManualErrors('license', data.license)
    markManualErrors('insurance', data.insurance)

    if (!data.insuranceInfo.trim()) nextErrors.insuranceInfo = true

    if (!data.email.trim() || !data.email.includes('@')) {
      setError('Enter a valid email address.')
      setFieldErrors(nextErrors)
      return false
    }
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters.')
      setFieldErrors(nextErrors)
      return false
    }
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match.')
      setFieldErrors(nextErrors)
      return false
    }
    if (!data.acceptedPrivacyPolicy || !data.acceptedTermsOfService) {
      if (!data.acceptedPrivacyPolicy) nextErrors.acceptedPrivacyPolicy = true
      if (!data.acceptedTermsOfService) nextErrors.acceptedTermsOfService = true
      setError('Please accept the Privacy Policy and Terms of Service.')
      setFieldErrors(nextErrors)
      return false
    }
    if (!data.identificationDoc) {
      setError('Upload an identification document.')
      setFieldErrors(nextErrors)
      return false
    }
    if (!isManualComplete(data.identification, 'identification')) {
      setError('Please fill all required identification fields.')
      setFieldErrors(nextErrors)
      return false
    }
    if (data.identificationCurrentAddressSameAsId === null) {
      nextErrors.identificationCurrentAddressSameAsId = true
    }
    const currentAddrFields = data.identificationCurrentAddress
    const currentAddrIncomplete =
      data.identificationCurrentAddressSameAsId === false &&
      !(
        currentAddrFields.address.trim() &&
        currentAddrFields.cityCdp.trim() &&
        currentAddrFields.county.trim() &&
        currentAddrFields.state.trim() &&
        currentAddrFields.zipCode.trim() &&
        currentAddrFields.country.trim()
      )
    if (currentAddrIncomplete) {
      nextErrors.identificationCurrentAddress = true
    }
    if (data.identificationCurrentAddressSameAsId === null || currentAddrIncomplete) {
      setError('Please complete the current address section.')
      setFieldErrors(nextErrors)
      return false
    }
    if (data.hasAllergy === null) {
      nextErrors.hasAllergy = true
      setError('Please indicate if you have any allergy.')
      setFieldErrors(nextErrors)
      return false
    }
    if (data.hasAllergy && !data.allergyDetails.trim()) {
      nextErrors.allergyDetails = true
      setError('Please enter the name of your allergy.')
      setFieldErrors(nextErrors)
      return false
    }
    if (
      (data.emergencyContacts ?? []).length === 0 ||
      (data.emergencyContacts ?? []).some(
        (item) => !item.name.trim() || !item.phone.trim(),
      )
    ) {
      nextErrors.emergencyContacts = true
      setError('Please complete the in case of emergency section.')
      setFieldErrors(nextErrors)
      return false
    }
    const businessTextFields: Array<
      Extract<
        BusinessFieldKey,
        | 'businessName'
        | 'businessEmail'
        | 'businessWebsite'
        | 'phone'
        | 'bestTimesToReach'
      >
    > = [
        'businessName',
        'businessEmail',
        'businessWebsite',
        'phone',
        'bestTimesToReach',
      ]
    for (const field of businessTextFields) {
      if (!data[field].trim()) nextErrors[field] = true
    }
    if (data.businessAddressSameAs === null) {
      nextErrors.businessAddressSameAs = true
    } else if (data.businessAddressSameAs === 'no') {
      const af = data.businessAddressFields
      if (!af.address.trim() || !af.cityCdp.trim() || !af.county.trim() || !af.state.trim() || !af.zipCode.trim() || !af.country.trim()) {
        nextErrors.businessAddressFields = true
      }
    }
    if (data.businessOpenDays.length === 0) nextErrors.businessOpenDays = true
    if (
      data.businessOpenDays.some((day) => !hasCompleteDayHours(data.businessHoursByDay[day]))
    ) {
      nextErrors.businessOpenHours = true
    }
    if (
      businessTextFields.some((field) => !data[field].trim()) ||
      nextErrors.businessAddressSameAs ||
      nextErrors.businessAddressFields ||
      data.businessOpenDays.length === 0 ||
      data.businessOpenDays.some((day) => !hasCompleteDayHours(data.businessHoursByDay[day]))
    ) {
      setError('Please fill all required business information fields.')
      setFieldErrors(nextErrors)
      return false
    }
    if (!profileFilters.pspCategory.trim()) {
      nextErrors.pspCategory = true
      setError('Select a primary PSP category.')
      setFieldErrors(nextErrors)
      return false
    }
    if (!isManualComplete(data.license, 'license')) {
      setError('Please fill all required license fields.')
      setFieldErrors(nextErrors)
      return false
    }
    if (
      !isManualComplete(data.insurance, 'insurance') ||
      !data.insuranceInfo.trim()
    ) {
      setError('Please fill all required insurance fields.')
      setFieldErrors(nextErrors)
      return false
    }
    if (!data.numberOfEmployees.trim()) nextErrors.numberOfEmployees = true
    let associatePasswordsMismatch = false
    for (const employee of data.employees ?? []) {
      if (!employee.name.trim()) nextErrors[`employee.${employee.id}.name`] = true
      if (!employee.email.trim()) nextErrors[`employee.${employee.id}.email`] = true
      if (!employee.password.trim()) nextErrors[`employee.${employee.id}.password`] = true
      if (!employee.confirmPassword.trim()) {
        nextErrors[`employee.${employee.id}.confirmPassword`] = true
      } else if (employee.password !== employee.confirmPassword) {
        nextErrors[`employee.${employee.id}.confirmPassword`] = true
        associatePasswordsMismatch = true
      }
    }
    if (associatePasswordsMismatch) {
      setError('Associate passwords do not match.')
      setFieldErrors(nextErrors)
      return false
    }
    if (
      !data.numberOfEmployees.trim() ||
      (data.employees ?? []).some(
        (employee) =>
          !employee.name.trim() ||
          !employee.email.trim() ||
          !employee.password.trim() ||
          !employee.confirmPassword.trim(),
      )
    ) {
      setError('Please fill all required membership associate fields.')
      setFieldErrors(nextErrors)
      return false
    }
    setFieldErrors({})
    setError('')
    return true
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateForm()) return
    // UI-only — wire to registration API when backend is ready.
    setAuthenticated(true)
    navigate(PATHS.home)
  }

  return {
    data,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
    profileFilters,
    additionalLicenses,
    employees,
    formOfPaymentMethods,
    resolvedBusinessAddress,
    findLabels,
    selectedPsp,
    selectedFields,
    representation,
    showRepresentation,
    showBuying,
    distance,
    setProfileFilter,
    setProfileFilterList,
    update,
    setHasAllergy,
    addEmergencyContact,
    updateEmergencyContact,
    removeEmergencyContact,
    updateManual,
    setIdentificationCurrentAddressSameAsId,
    updateIdentificationCurrentAddress,
    setBusinessAddressSameAs,
    setBillingAddressSameAs,
    updateBillingPhysicalAddress,
    updateBillingMailingAddress,
    updateBusinessAddress,
    toggleBusinessDay,
    setDayHours,
    addAdditionalLicense,
    updateAdditionalLicense,
    removeAdditionalLicense,
    addEmployee,
    updateEmployee,
    removeEmployee,
    addFormOfPaymentMethod,
    updateFormOfPaymentMethod,
    removeFormOfPaymentMethod,
    handleSubmit,
  }
}
