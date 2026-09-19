import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import type {
  BillingAddressChoice,
  BusinessEmployee,
  BusinessEmployeeField,
  FieldErrorKey,
  MembershipAmenityTotalField,
} from '@/features/auth/model/registerPsp'
import type { HeroFiltersState } from '@/features/search'
import { cn } from '@/shared/lib/cn'
import { BillingAddressRadios, InlineBlankField } from './registerUi'
export function MembershipCardInformation({
  numberOfEmployees,
  employees,
  total,
  membershipGpsTotal,
  membershipAdvertiseTotal,
  membershipDealsClosedTotal,
  membershipTaxTotal,
  cardNumber,
  expirationDate,
  securityCode,
  billingAddressSameAs,
  billingPhysicalAddress,
  billingMailingAddress,
  onBillingAddressSameAsChange,
  onBillingPhysicalAddressChange,
  onBillingMailingAddressChange,
  onNumberOfEmployeesChange,
  onTotalChange,
  onAmenityTotalChange,
  onFieldChange,
  onAddEmployee,
  onUpdateEmployee,
  onRemoveEmployee,
  fieldErrors,
}: {
  numberOfEmployees: string
  employees: BusinessEmployee[]
  total: string
  membershipGpsTotal: string
  membershipAdvertiseTotal: string
  membershipDealsClosedTotal: string
  membershipTaxTotal: string
  cardNumber: string
  expirationDate: string
  securityCode: string
  billingAddressSameAs: BillingAddressChoice | null
  billingPhysicalAddress: string
  billingMailingAddress: string
  onBillingAddressSameAsChange: (choice: BillingAddressChoice) => void
  onBillingPhysicalAddressChange: (value: string) => void
  onBillingMailingAddressChange: (value: string) => void
  onNumberOfEmployeesChange: (value: string) => void
  onTotalChange: (value: string) => void
  onAmenityTotalChange: (field: MembershipAmenityTotalField, value: string) => void
  onFieldChange: <K extends keyof HeroFiltersState>(key: K, value: HeroFiltersState[K]) => void
  onAddEmployee: () => void
  onUpdateEmployee: (id: string, field: BusinessEmployeeField, value: string) => void
  onRemoveEmployee: (id: string) => void
  fieldErrors: Partial<Record<FieldErrorKey, boolean>>
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <div className="space-y-3 sm:max-w-[calc(50%-0.375rem)]">
          <InlineBlankField
            label="Number of associates:"
            name="numberOfEmployees"
            value={numberOfEmployees}
            onChange={onNumberOfEmployeesChange}
            inputMode="numeric"
            required
            invalid={Boolean(fieldErrors.numberOfEmployees)}
          />
          <p className="rounded-lg border border-brand-light bg-brand-light/40 px-3 py-2 text-sm font-semibold text-brand-dark">
            -25% discount for every associate you bring on-board
          </p>
        </div>
        {employees.map((employee, index) => (
          <div key={employee.id} className="space-y-3">
            {employees.length > 1 && (
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-ink">Associate {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => onRemoveEmployee(employee.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-paper hover:text-ink"
                  aria-label={`Remove associate ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <InlineBlankField
                label="Name:"
                name={`employeeName-${employee.id}`}
                value={employee.name}
                onChange={(value) => onUpdateEmployee(employee.id, 'name', value)}
                required
                invalid={Boolean(fieldErrors[`employee.${employee.id}.name`])}
              />
              <InlineBlankField
                label="Password:"
                name={`employeePassword-${employee.id}`}
                type="password"
                value={employee.password}
                onChange={(value) => onUpdateEmployee(employee.id, 'password', value)}
                required
                invalid={Boolean(fieldErrors[`employee.${employee.id}.password`])}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <InlineBlankField
                label="Email:"
                name={`employeeEmail-${employee.id}`}
                type="email"
                value={employee.email}
                onChange={(value) => onUpdateEmployee(employee.id, 'email', value)}
                required
                invalid={Boolean(fieldErrors[`employee.${employee.id}.email`])}
              />
              <InlineBlankField
                label="Confirm password:"
                name={`employeeConfirmPassword-${employee.id}`}
                type="password"
                value={employee.confirmPassword}
                onChange={(value) => onUpdateEmployee(employee.id, 'confirmPassword', value)}
                required
                invalid={Boolean(fieldErrors[`employee.${employee.id}.confirmPassword`])}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2 pt-1">
          <p className="text-sm font-bold text-ink">Add Another Assosiate</p>
          <button
            type="button"
            onClick={onAddEmployee}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-line text-ink transition hover:border-brand hover:bg-brand-light/40 hover:text-brand"
            aria-label="Add another associate"
          >
            <Plus className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <Input
        showQaMark
        label="Total:"
        name="membershipTotal"
        placeholder="Total"
        value={total}
        onChange={(e) => onTotalChange(e.target.value)}
        inputMode="decimal"
      />

      <MembershipPricingSummary
        membershipGpsTotal={membershipGpsTotal}
        membershipAdvertiseTotal={membershipAdvertiseTotal}
        membershipDealsClosedTotal={membershipDealsClosedTotal}
        membershipTaxTotal={membershipTaxTotal}
        onAmenityTotalChange={onAmenityTotalChange}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Input
          showQaMark
          label="Card#:"
          name="membershipCardNumber"
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => onFieldChange('cardNumber', e.target.value)}
          inputMode="numeric"
          autoComplete="cc-number"
        />
        <Input
          showQaMark
          label="Expiration Date:"
          name="membershipExpirationDate"
          placeholder="MM/YY"
          value={expirationDate}
          onChange={(e) => onFieldChange('expirationDate', e.target.value)}
          autoComplete="cc-exp"
        />
        <Input
          showQaMark
          label="Security Code:"
          name="membershipSecurityCode"
          placeholder="Security code"
          value={securityCode}
          onChange={(e) => onFieldChange('securityCode', e.target.value)}
          inputMode="numeric"
          autoComplete="cc-csc"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span
            className={cn(
              'text-sm font-bold',
              fieldErrors.billingAddressSameAs ||
                fieldErrors.billingPhysicalAddress ||
                fieldErrors.billingMailingAddress
                ? 'text-danger'
                : 'text-ink',
            )}
          >
            Billing Address:
          </span>
          <BillingAddressRadios
            name="billingAddressSameAs"
            value={billingAddressSameAs}
            onChange={onBillingAddressSameAsChange}
          />
        </div>
        {billingAddressSameAs === 'physicalAddress' && (
          <InlineBlankField
            label="Address:"
            name="billingPhysicalAddress"
            value={billingPhysicalAddress}
            onChange={onBillingPhysicalAddressChange}
            invalid={Boolean(fieldErrors.billingPhysicalAddress)}
          />
        )}
        {billingAddressSameAs === 'mailingAddress' && (
          <InlineBlankField
            label="Address:"
            name="billingMailingAddress"
            value={billingMailingAddress}
            onChange={onBillingMailingAddressChange}
            invalid={Boolean(fieldErrors.billingMailingAddress)}
          />
        )}
      </div>
    </div>
  )
}

const ASSOCIATE_SUMMARY_LABEL =
  '[__, x 25% discount rate for each additional associate]'

function formatMembershipMoney(amount: number) {
  return amount.toFixed(2)
}

function parseMembershipAmount(value: string) {
  const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function MembershipAmenityLine({
  label,
  suffix,
  value,
  onChange,
  name,
  readOnlyAmount,
  summaryRow,
}: {
  label: string
  suffix: string
  value?: string
  onChange?: (value: string) => void
  name?: string
  readOnlyAmount?: string
  summaryRow?: boolean
}) {
  const lineClass = summaryRow
    ? 'border-b-2 border-black'
    : 'border-b border-black'

  const amountLineLayoutClass = 'w-full pb-0.5'

  const amountBlock =
    readOnlyAmount != null ? (
      <div
        className={cn(
          lineClass,
          amountLineLayoutClass,
          'text-right text-[11px] font-bold text-black sm:text-xs',
        )}
      >
        {readOnlyAmount}
      </div>
    ) : onChange ? (
      <div className={cn(lineClass, amountLineLayoutClass)}>
        <input
          type="text"
          inputMode="decimal"
          name={name}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-0 bg-transparent p-0 text-right text-[11px] font-medium text-black outline-none sm:text-xs"
        />
      </div>
    ) : (
      <div className={cn(lineClass, amountLineLayoutClass)} aria-hidden />
    )

  const totalSuffixInline = (
    <div className="flex shrink-0 items-end gap-x-1">
      <span
        className={cn(
          'text-[11px] font-semibold text-black sm:text-xs',
          summaryRow && 'font-bold',
        )}
      >
        {suffix}
      </span>
      <div className="ml-1 w-[5.25rem] sm:ml-2 sm:w-[6rem]">{amountBlock}</div>
    </div>
  )

  if (summaryRow) {
    return (
      <div className="flex w-full min-w-0 justify-end overflow-hidden py-1">
        {totalSuffixInline}
      </div>
    )
  }

  return (
    <div className="flex w-full min-w-0 items-baseline gap-x-2 overflow-hidden py-1">
      {label ? (
        <span className="shrink-0 text-[11px] font-medium text-black sm:text-xs">{label}</span>
      ) : null}
      <span className="min-w-[1rem] flex-1 border-b border-dotted border-black pb-0.5" aria-hidden />
      {totalSuffixInline}
    </div>
  )
}

function MembershipPricingSummary({
  membershipGpsTotal,
  membershipAdvertiseTotal,
  membershipDealsClosedTotal,
  membershipTaxTotal,
  onAmenityTotalChange,
}: {
  membershipGpsTotal: string
  membershipAdvertiseTotal: string
  membershipDealsClosedTotal: string
  membershipTaxTotal: string
  onAmenityTotalChange: (field: MembershipAmenityTotalField, value: string) => void
}) {
  const amenityGrandTotal =
    parseMembershipAmount(membershipGpsTotal) +
    parseMembershipAmount(membershipAdvertiseTotal) +
    parseMembershipAmount(membershipDealsClosedTotal) +
    parseMembershipAmount(membershipTaxTotal)

  const amenityGrandTotalDisplay =
    amenityGrandTotal > 0 ? formatMembershipMoney(amenityGrandTotal) : ''

  const labelCellClass =
    'flex min-w-0 items-center justify-center border-b-2 border-black bg-white px-3 py-2 text-center text-xs font-semibold leading-tight text-black sm:border-b-0 sm:border-r-2 sm:border-black sm:px-4 sm:py-2.5 sm:text-sm'

  const contentCellClass =
    'min-w-0 overflow-hidden bg-white px-3 py-2 sm:px-4 sm:py-2.5'

  const boxClass =
    'isolate overflow-hidden rounded-xl border-2 border-black bg-white text-black'

  const rowGridClass =
    'grid min-w-0 grid-cols-1 sm:grid-cols-[minmax(6.5rem,1fr)_minmax(0,3fr)]'

  return (
    <div className="space-y-2" aria-label="Membership pricing summary">
      <div className={boxClass}>
        <div className={rowGridClass}>
          <div className={labelCellClass}>Monthly rate: TBD</div>
          <div className={contentCellClass}>
            <MembershipAmenityLine label={ASSOCIATE_SUMMARY_LABEL} suffix="= Total:" />
          </div>
        </div>
      </div>

      <div className={boxClass}>
        <div className={rowGridClass}>
          <div className={cn(labelCellClass, 'sm:self-stretch')}>Amenity costs:</div>
          <div className={cn(contentCellClass, 'sm:py-2')}>
            <MembershipAmenityLine
              label="GPS Google Maps API"
              suffix="= Total:"
              name="membershipGpsTotal"
              value={membershipGpsTotal}
              onChange={(value) => onAmenityTotalChange('membershipGpsTotal', value)}
            />
            <MembershipAmenityLine
              label="Advertise:"
              suffix="= Total:"
              name="membershipAdvertiseTotal"
              value={membershipAdvertiseTotal}
              onChange={(value) => onAmenityTotalChange('membershipAdvertiseTotal', value)}
            />
            <MembershipAmenityLine
              label="% Deals closed:"
              suffix="= Total:"
              name="membershipDealsClosedTotal"
              value={membershipDealsClosedTotal}
              onChange={(value) => onAmenityTotalChange('membershipDealsClosedTotal', value)}
            />
            <MembershipAmenityLine
              label="Tax:"
              suffix="= Total:"
              name="membershipTaxTotal"
              value={membershipTaxTotal}
              onChange={(value) => onAmenityTotalChange('membershipTaxTotal', value)}
            />
            <MembershipAmenityLine
              label=""
              suffix="= Total:"
              readOnlyAmount={amenityGrandTotalDisplay}
              summaryRow
            />
          </div>
        </div>
      </div>
    </div>
  )
}
