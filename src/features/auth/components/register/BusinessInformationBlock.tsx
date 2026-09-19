import { FieldQaMark } from '@/components/ui/FieldQaMark'
import {
  EMPTY_DAY_HOURS,
  WEEKDAYS,
  hasCompleteDayHours,
  type AddressFields,
  type AddressSameAsChoice,
  type BusinessFieldKey,
  type DayBusinessHours,
  type FieldErrorKey,
} from '@/features/auth/model/registerPsp'
import { cn } from '@/shared/lib/cn'
import { DayHoursRangeSelect } from './DayHoursRangeSelect'
import { AddressSameAsRadios, InlineBlankField, SectionCardTitle } from './registerUi'
import { sectionCardClass } from './styles'
export function BusinessInformationBlock({
  step,
  phone,
  onPhoneChange,
  businessName,
  businessEmail,
  businessWebsite,
  businessAddressSameAs,
  businessAddressFields,
  onBusinessAddressSameAsChange,
  onBusinessAddressFieldChange,
  businessOpenDays,
  businessHoursByDay,
  bestTimesToReach,
  onChange,
  onToggleDay,
  onDayHoursChange,
  fieldErrors,
}: {
  step?: number
  phone: string
  onPhoneChange: (value: string) => void
  businessName: string
  businessEmail: string
  businessWebsite: string
  businessAddressSameAs: AddressSameAsChoice | null
  businessAddressFields: AddressFields
  onBusinessAddressSameAsChange: (choice: AddressSameAsChoice) => void
  onBusinessAddressFieldChange: (field: keyof AddressFields, value: string) => void
  businessOpenDays: string[]
  businessHoursByDay: Record<string, DayBusinessHours>
  bestTimesToReach: string
  onChange: (
    field: Extract<
      BusinessFieldKey,
      | 'businessName'
      | 'businessEmail'
      | 'businessWebsite'
      | 'bestTimesToReach'
    >,
    value: string,
  ) => void
  onToggleDay: (day: string) => void
  onDayHoursChange: (day: string, hours: DayBusinessHours) => void
  fieldErrors: Partial<Record<FieldErrorKey, boolean>>
}) {
  const daysInvalid = Boolean(fieldErrors.businessOpenDays)
  const hoursInvalid = Boolean(fieldErrors.businessOpenHours)

  return (
    <div className={sectionCardClass}>
      <SectionCardTitle step={step}>Business information</SectionCardTitle>
      <div className="space-y-3">
        <InlineBlankField
          label="Business name:"
          name="businessName"
          value={businessName}
          onChange={(value) => onChange('businessName', value)}
          required
          invalid={Boolean(fieldErrors.businessName)}
        />
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span
              className={cn(
                'text-sm font-bold',
                fieldErrors.businessAddressSameAs || fieldErrors.businessAddressFields
                  ? 'text-danger'
                  : 'text-ink',
              )}
            >
              Business address: <span className="text-danger">*</span>
            </span>
            <AddressSameAsRadios
              name="businessAddressSameAs"
              value={businessAddressSameAs}
              onChange={onBusinessAddressSameAsChange}
            />
          </div>
          {businessAddressSameAs === 'no' && (
            <>
              <InlineBlankField
                label="Address:"
                name="businessAddress"
                value={businessAddressFields.address}
                onChange={(value) => onBusinessAddressFieldChange('address', value)}
                required
                invalid={Boolean(fieldErrors.businessAddressFields)}
              />
              <div className="grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-3">
                <InlineBlankField
                  label="City / CDP:"
                  name="businessCityCdp"
                  value={businessAddressFields.cityCdp}
                  onChange={(value) => onBusinessAddressFieldChange('cityCdp', value)}
                  required
                  invalid={Boolean(fieldErrors.businessAddressFields)}
                />
                <InlineBlankField
                  label="County:"
                  name="businessCounty"
                  value={businessAddressFields.county}
                  onChange={(value) => onBusinessAddressFieldChange('county', value)}
                  required
                  invalid={Boolean(fieldErrors.businessAddressFields)}
                />
                <InlineBlankField
                  label="Region:"
                  name="businessRegion"
                  value={businessAddressFields.region}
                  onChange={(value) => onBusinessAddressFieldChange('region', value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-3">
                <InlineBlankField
                  label="State:"
                  name="businessState"
                  value={businessAddressFields.state}
                  onChange={(value) => onBusinessAddressFieldChange('state', value)}
                  required
                  invalid={Boolean(fieldErrors.businessAddressFields)}
                />
                <InlineBlankField
                  label="Zipcode:"
                  name="businessZipCode"
                  value={businessAddressFields.zipCode}
                  onChange={(value) => onBusinessAddressFieldChange('zipCode', value)}
                  required
                  invalid={Boolean(fieldErrors.businessAddressFields)}
                />
                <InlineBlankField
                  label="Country:"
                  name="businessCountry"
                  value={businessAddressFields.country}
                  onChange={(value) => onBusinessAddressFieldChange('country', value)}
                  required
                  invalid={Boolean(fieldErrors.businessAddressFields)}
                />
              </div>
            </>
          )}
        </div>
        <InlineBlankField
          label="Phone:"
          name="phone"
          type="tel"
          placeholder="+1-234-567-8910"
          value={phone}
          onChange={onPhoneChange}
          inputMode="tel"
          required
          invalid={Boolean(fieldErrors.phone)}
        />
        <InlineBlankField
          label="Email:"
          name="businessEmail"
          type="email"
          value={businessEmail}
          onChange={(value) => onChange('businessEmail', value)}
          required
          invalid={Boolean(fieldErrors.businessEmail)}
        />
        <InlineBlankField
          label="Website:"
          name="businessWebsite"
          type="url"
          value={businessWebsite}
          onChange={(value) => onChange('businessWebsite', value)}
          required
          invalid={Boolean(fieldErrors.businessWebsite)}
        />
        <div className="space-y-3 pt-1">
          <p
            className={cn(
              'inline-flex items-center gap-1 text-sm font-bold',
              daysInvalid || hoursInvalid ? 'text-danger' : 'text-ink',
            )}
          >
            Business hours: <span className="text-danger">*</span>
            <FieldQaMark field="Business hours" />
          </p>
          <div
            className={cn(
              'grid grid-cols-1 gap-3 sm:grid-cols-2',
              daysInvalid && 'rounded-xl ring-2 ring-danger/30 p-1',
            )}
          >
            {WEEKDAYS.map((day) => {
              const selected = businessOpenDays.includes(day.value)
              const dayHours = businessHoursByDay[day.value] ?? EMPTY_DAY_HOURS
              const dayHoursInvalid =
                hoursInvalid && selected && !hasCompleteDayHours(dayHours)

              return (
                <div key={day.value} className="flex min-w-0 flex-col gap-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onToggleDay(day.value)}
                      className={cn(
                        'w-16 shrink-0 rounded-xl border px-2 py-2.5 text-center text-sm font-semibold transition',
                        selected
                          ? 'border-brand bg-brand text-white shadow-sm'
                          : 'border-line bg-paper text-ink-soft hover:border-brand/40 hover:bg-brand-light/20',
                      )}
                    >
                      {day.label}
                    </button>
                    <DayHoursRangeSelect
                      dayLabel={day.label}
                      value={dayHours}
                      onChange={(hours) => onDayHoursChange(day.value, hours)}
                      invalid={dayHoursInvalid}
                    />
                  </div>
                </div>
              )
            })}
            <InlineBlankField
              label="Best times to reach you:"
              name="bestTimesToReach"
              value={bestTimesToReach}
              onChange={(value) => onChange('bestTimesToReach', value)}
              placeholder="e.g. Mornings, after 3 PM"
              required
              invalid={Boolean(fieldErrors.bestTimesToReach)}
              className="sm:self-end"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
