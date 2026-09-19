import { Plus, X } from 'lucide-react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { Input } from '@/components/ui/Input'
import type {
  AddressFields,
  FormOfPaymentMethodEntry,
  FormOfPaymentMethodField,
  FormOfPaymentMethodType,
  RegisterPspFormData as FormData,
} from '@/features/auth/model/registerPsp'
import { EMPTY_ADDRESS_FIELDS, pickManualAddressFields } from '@/features/auth/model/registerPsp'
import { FORM_OF_PAYMENT_OPTIONS } from '@/features/search'
import { cn } from '@/shared/lib/cn'
function PaymentTypeCheckboxGroup({
  entryId,
  value,
  onChange,
}: {
  entryId: string
  value: FormOfPaymentMethodType | ''
  onChange: (type: FormOfPaymentMethodType | '') => void
}) {
  return (
    <div className="space-y-2">
      <span className="inline-flex items-center gap-1 text-sm font-bold leading-snug text-ink">
        Payment type:
        <FieldQaMark field="Payment type:" />
      </span>
      <div className="flex flex-col gap-2">
        {FORM_OF_PAYMENT_OPTIONS.map((option) => {
          const checked = value === option
          return (
            <label
              key={`${entryId}-${option}`}
              className="flex w-full cursor-pointer items-center gap-2 text-sm text-ink-soft hover:text-ink"
            >
              <input
                type="checkbox"
                name={`formOfPaymentType-${entryId}`}
                checked={checked}
                onChange={() => onChange(checked ? '' : (option as FormOfPaymentMethodType))}
                className="h-3.5 w-3.5 rounded border-ink/25 accent-brand focus:ring-brand/30"
              />
              <span className={cn(checked && 'font-medium text-ink')}>{option}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export function getResolvedBusinessAddress(data: FormData): AddressFields {
  if (data.businessAddressSameAs === 'sameAsId') {
    return pickManualAddressFields(data.identification)
  }
  if (data.businessAddressSameAs === 'sameAsCurrent') {
    if (data.identificationCurrentAddressSameAsId === true) {
      return pickManualAddressFields(data.identification)
    }
    return pickManualAddressFields(data.identificationCurrentAddress)
  }
  if (data.businessAddressSameAs === 'no') {
    return pickManualAddressFields(data.businessAddressFields)
  }
  return { ...EMPTY_ADDRESS_FIELDS }
}

function getPaymentLinkMeta(type: FormOfPaymentMethodType) {
  switch (type) {
    case 'Stripe':
      return { label: 'Stripe Link:', placeholder: 'https://stripe.com/...' }
    case 'PayPal':
      return { label: 'PayPal Link:', placeholder: 'https://paypal.me/...' }
    case 'Square':
      return { label: 'Square Link:', placeholder: 'https://squareup.com/...' }
    case 'Venmo':
      return { label: 'Venmo Link:', placeholder: 'https://venmo.com/...' }
    case 'CashApp':
      return { label: 'CashApp Link:', placeholder: 'https://cash.app/...' }
    default:
      return { label: 'Link:', placeholder: 'https://...' }
  }
}

function FormOfPaymentMethodFields({
  entry,
  onUpdate,
  businessName,
  businessAddress,
}: {
  entry: FormOfPaymentMethodEntry
  onUpdate: (field: FormOfPaymentMethodField, value: string | boolean) => void
  businessName: string
  businessAddress: AddressFields
}) {
  if (!entry.type) return null

  if (entry.type === 'Direct Deposit') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          showQaMark
          label="Routing Number:"
          name={`routingNumber-${entry.id}`}
          placeholder="Routing number"
          value={entry.routingNumber}
          onChange={(e) => onUpdate('routingNumber', e.target.value)}
          inputMode="numeric"
          autoComplete="off"
        />
        <Input
          showQaMark
          label="Account Number:"
          name={`accountNumber-${entry.id}`}
          placeholder="Account number"
          value={entry.accountNumber}
          onChange={(e) => onUpdate('accountNumber', e.target.value)}
          inputMode="numeric"
          autoComplete="off"
        />
      </div>
    )
  }

  if (
    entry.type === 'Stripe' ||
    entry.type === 'PayPal' ||
    entry.type === 'Square' ||
    entry.type === 'Venmo' ||
    entry.type === 'CashApp'
  ) {
    const { label, placeholder } = getPaymentLinkMeta(entry.type)
    return (
      <Input
        showQaMark
        label={label}
        name={`paymentLink-${entry.id}`}
        type="url"
        placeholder={placeholder}
        value={entry.link}
        onChange={(e) => onUpdate('link', e.target.value)}
        autoComplete="url"
      />
    )
  }

  if (entry.type === 'Zelle') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          showQaMark
          label="Zelle Email:"
          name={`zelleEmail-${entry.id}`}
          type="email"
          placeholder="example@domain.com"
          value={entry.zelleEmail}
          onChange={(e) => onUpdate('zelleEmail', e.target.value)}
          autoComplete="email"
        />
        <Input
          showQaMark
          label="Zelle Phone:"
          name={`zellePhone-${entry.id}`}
          type="tel"
          placeholder="Phone number"
          value={entry.zellePhone}
          onChange={(e) => onUpdate('zellePhone', e.target.value)}
          inputMode="tel"
          autoComplete="tel"
        />
      </div>
    )
  }

  if (entry.type === 'Check') {
    return (
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft hover:text-ink">
          <input
            type="checkbox"
            checked={entry.sameAsBusiness}
            onChange={(e) => onUpdate('sameAsBusiness', e.target.checked)}
            className="h-3.5 w-3.5 rounded border-ink/25 accent-brand focus:ring-brand/30"
          />
          <span className={cn(entry.sameAsBusiness && 'font-medium text-ink')}>
            Same as Business information
          </span>
          <FieldQaMark field="Same as Business information" />
        </label>

        {entry.sameAsBusiness ? (
          <div className="space-y-3 rounded-lg border border-line/80 bg-mist/20 p-3">
            <Input
              label="Business name:"
              name={`checkBusinessName-${entry.id}`}
              value={businessName}
              readOnly
              className="bg-mist/40 text-ink-soft"
            />
            <Input
              label="Address:"
              name={`checkBusinessAddress-${entry.id}`}
              value={businessAddress.address}
              readOnly
              className="bg-mist/40 text-ink-soft"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Input
                label="City / CDP:"
                name={`checkBusinessCity-${entry.id}`}
                value={businessAddress.cityCdp}
                readOnly
                className="bg-mist/40 text-ink-soft"
              />
              <Input
                label="County:"
                name={`checkBusinessCounty-${entry.id}`}
                value={businessAddress.county}
                readOnly
                className="bg-mist/40 text-ink-soft"
              />
              <Input
                label="Region:"
                name={`checkBusinessRegion-${entry.id}`}
                value={businessAddress.region}
                readOnly
                className="bg-mist/40 text-ink-soft"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Input
                label="State:"
                name={`checkBusinessState-${entry.id}`}
                value={businessAddress.state}
                readOnly
                className="bg-mist/40 text-ink-soft"
              />
              <Input
                label="Zip Code:"
                name={`checkBusinessZip-${entry.id}`}
                value={businessAddress.zipCode}
                readOnly
                className="bg-mist/40 text-ink-soft"
              />
              <Input
                label="Country:"
                name={`checkBusinessCountry-${entry.id}`}
                value={businessAddress.country}
                readOnly
                className="bg-mist/40 text-ink-soft"
              />
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  if (entry.type === 'Other') {
    return (
      <div className="space-y-3">
        <Input
          showQaMark
          label="Name:"
          name={`otherName-${entry.id}`}
          placeholder="Name"
          value={entry.otherName}
          onChange={(e) => onUpdate('otherName', e.target.value)}
          autoComplete="name"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            showQaMark
            label="Routing Number:"
            name={`otherRoutingNumber-${entry.id}`}
            placeholder="Routing number"
            value={entry.otherRoutingNumber}
            onChange={(e) => onUpdate('otherRoutingNumber', e.target.value)}
            inputMode="numeric"
            autoComplete="off"
          />
          <Input
            showQaMark
            label="URL:"
            name={`otherUrl-${entry.id}`}
            type="url"
            placeholder="https://..."
            value={entry.otherUrl}
            onChange={(e) => onUpdate('otherUrl', e.target.value)}
            autoComplete="url"
          />
        </div>
      </div>
    )
  }

  return null
}

export function FormOfPaymentMethodsBlock({
  entries,
  onAdd,
  onUpdate,
  onRemove,
  businessName,
  businessAddress,
}: {
  entries: FormOfPaymentMethodEntry[]
  onAdd: () => void
  onUpdate: (id: string, field: FormOfPaymentMethodField, value: string | boolean) => void
  onRemove: (id: string) => void
  businessName: string
  businessAddress: AddressFields
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={cn('space-y-3', index > 0 && 'border-t border-line/80 pt-4')}
          >
            {entries.length > 1 ? (
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-ink">Payment method {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => onRemove(entry.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-paper hover:text-ink"
                  aria-label={`Remove payment method ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            <PaymentTypeCheckboxGroup
              entryId={entry.id}
              value={entry.type}
              onChange={(type) => onUpdate(entry.id, 'type', type)}
            />

            <FormOfPaymentMethodFields
              entry={entry}
              businessName={businessName}
              businessAddress={businessAddress}
              onUpdate={(field, value) => onUpdate(entry.id, field, value)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 pt-1">
        <p className="text-sm font-bold text-ink">Add Another Payment Method</p>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-line text-ink transition hover:border-brand hover:bg-brand-light/40 hover:text-brand"
          aria-label="Add another payment method"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
