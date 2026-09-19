import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { DateInput } from '@/components/ui/DateInput'
import { FieldQaMark, FieldLabelWithQa } from '@/components/ui/FieldQaMark'
import { TimeInput } from '@/components/ui/TimeInput'
import type { AddressSameAsChoice, BillingAddressChoice } from '@/features/auth/model/registerPsp'
import { cn } from '@/shared/lib/cn'
import { sectionTitleClass } from './styles'
export function FormSection({
  title,
  hint,
  step,
  children,
}: {
  title: string
  hint?: string
  step?: number
  children: ReactNode
}) {
  return (
    <section className="space-y-3 border-t border-line pt-6 first:border-t-0 first:pt-0">
      <div className="space-y-1">
        <h2 className="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-ink">
          {step != null ? <SectionStepBadge step={step} /> : null}
          <span>{title}</span>
        </h2>
        {hint ? (
          <p className={cn('text-sm text-muted', step != null && 'pl-12')}>{hint}</p>
        ) : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function SectionStepBadge({ step }: { step: number }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-display text-base font-bold text-white shadow-sm"
      aria-hidden
    >
      {step}
    </span>
  )
}

export function SectionCardTitle({
  children,
  step,
  qaField,
}: {
  children: string
  step?: number
  qaField?: string
}) {
  return (
    <div className="border-b border-line/80 pb-3">
      <h3 className={cn(sectionTitleClass, 'flex items-center gap-3')}>
        {step != null ? <SectionStepBadge step={step} /> : null}
        <span className="inline-flex items-center gap-1.5">
          {children}
          {qaField ? <FieldQaMark field={qaField} /> : null}
        </span>
      </h3>
    </div>
  )
}

export function formatDateInput(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function UnderlineField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string
  name: string
  type: 'time' | 'text' | 'date'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputMode?: 'numeric' | 'text'
}) {
  if (type === 'date') {
    return (
      <label className="flex w-full flex-col gap-1.5">
        <span className="inline-flex items-center gap-1 text-base font-bold text-ink sm:text-lg">
          {label}
          <FieldQaMark field={label} />
        </span>
        <DateInput
          name={name}
          value={value}
          onChange={onChange}
          variant="underline"
        />
      </label>
    )
  }

  if (type === 'time') {
    return (
      <label className="flex w-full flex-col gap-1.5">
        <span className="inline-flex items-center gap-1 text-base font-bold text-ink sm:text-lg">
          {label}
          <FieldQaMark field={label} />
        </span>
        <TimeInput
          name={name}
          value={value}
          onChange={onChange}
          variant="underline"
          showSeconds
          live
        />
      </label>
    )
  }

  return (
    <label className="flex w-full flex-col gap-1.5">
      <span className="inline-flex items-center gap-1 text-base font-bold text-ink sm:text-lg">
        {label}
        <FieldQaMark field={label} />
      </span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={type === 'text' ? 10 : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full border-0 border-b-2 border-ink/30 bg-transparent px-2 text-base text-ink outline-none transition placeholder:text-muted/50 focus:border-brand sm:h-14 sm:text-lg"
      />
    </label>
  )
}

export function SameAsIdAddressRadios({
  name,
  value,
  onChange,
}: {
  name: string
  value: boolean | null
  onChange: (sameAsId: boolean) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 pb-1.5">
      <label
        className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft"
        onMouseEnter={() => {
          if (value !== false) onChange(false)
        }}
      >
        <input
          type="radio"
          name={name}
          checked={value === false}
          onChange={() => onChange(false)}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        No
      </label>
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft">
        <input
          type="radio"
          name={name}
          checked={value === true}
          onChange={() => onChange(true)}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Same as ID
      </label>
    </div>
  )
}

export function YesNoButtons({
  name,
  value,
  onChange,
  compact = false,
}: {
  name: string
  value: boolean | null
  onChange: (next: boolean) => void
  compact?: boolean
}) {
  const buttonClass = compact
    ? 'min-w-14 rounded-lg border px-3 py-1 text-sm font-semibold transition'
    : 'min-w-16 rounded-xl border px-3 py-2 text-sm font-semibold transition'

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={name}>
      <button
        type="button"
        aria-pressed={value === true}
        onClick={() => onChange(true)}
        className={cn(
          buttonClass,
          value === true
            ? 'border-brand bg-brand text-white shadow-sm'
            : 'border-line bg-paper text-ink-soft hover:border-brand/40 hover:bg-brand-light/20',
        )}
      >
        Yes
      </button>
      <button
        type="button"
        aria-pressed={value === false}
        onClick={() => onChange(false)}
        className={cn(
          buttonClass,
          value === false
            ? 'border-brand bg-brand text-white shadow-sm'
            : 'border-line bg-paper text-ink-soft hover:border-brand/40 hover:bg-brand-light/20',
        )}
      >
        No
      </button>
    </div>
  )
}

export function BillingAddressRadios({
  name,
  value,
  onChange,
}: {
  name: string
  value: BillingAddressChoice | null
  onChange: (choice: BillingAddressChoice) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 pb-1.5">
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft">
        <input
          type="radio"
          name={name}
          checked={value === 'sameAsId'}
          onChange={() => onChange('sameAsId')}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Same as ID
      </label>
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft">
        <input
          type="radio"
          name={name}
          checked={value === 'physicalAddress'}
          onChange={() => onChange('physicalAddress')}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Physical address
      </label>
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft">
        <input
          type="radio"
          name={name}
          checked={value === 'mailingAddress'}
          onChange={() => onChange('mailingAddress')}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Mailing address
      </label>
    </div>
  )
}

export function AddressSameAsRadios({
  name,
  value,
  onChange,
}: {
  name: string
  value: AddressSameAsChoice | null
  onChange: (choice: AddressSameAsChoice) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 pb-1.5">
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft">
        <input
          type="radio"
          name={name}
          checked={value === 'sameAsId'}
          onChange={() => onChange('sameAsId')}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Same as ID
      </label>
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft">
        <input
          type="radio"
          name={name}
          checked={value === 'sameAsCurrent'}
          onChange={() => onChange('sameAsCurrent')}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Same as Current Address
      </label>
      <label
        className="flex cursor-pointer items-center gap-1.5 text-sm font-normal text-ink-soft"
        onMouseEnter={() => {
          if (value !== 'no') onChange('no')
        }}
      >
        <input
          type="radio"
          name={name}
          checked={value === 'no'}
          onChange={() => onChange('no')}
          className="h-[18px] w-[18px] shrink-0 accent-brand"
        />
        Different Address
      </label>
    </div>
  )
}

export function InlineBlankField({
  label,
  name,
  value,
  onChange,
  placeholder,
  inputMode,
  maxLength,
  type = 'text',
  autoFocus = false,
  required = false,
  invalid = false,
  readOnly = false,
  className,
  trailing,
  multiline = false,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputMode?: 'numeric' | 'text' | 'tel' | 'email'
  maxLength?: number
  type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'date'
  autoFocus?: boolean
  required?: boolean
  invalid?: boolean
  readOnly?: boolean
  className?: string
  trailing?: ReactNode
  multiline?: boolean
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const multilineLinePx = 24

  useLayoutEffect(() => {
    if (!multiline) return
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(multilineLinePx, el.scrollHeight)}px`
  }, [multiline, value])

  const controlClass = cn(
    'min-w-0 flex-1 border-0 border-b-2 bg-transparent pb-1.5 outline-none transition placeholder:text-muted/50 focus-visible:outline-none',
    readOnly && 'cursor-not-allowed text-muted',
    invalid
      ? 'border-danger text-danger focus:border-danger'
      : 'border-ink/30 text-ink focus:border-brand',
  )

  const field = (
    <>
      <FieldLabelWithQa
        label={label}
        required={required}
        invalid={invalid}
        className={cn(
          'shrink-0 font-bold',
          multiline ? 'h-6 leading-6' : 'pb-1.5',
          invalid ? 'text-danger' : 'text-ink',
        )}
      />
      {type === 'date' ? (
        <DateInput
          name={name}
          value={value}
          onChange={onChange}
          variant="inline"
          placeholder={placeholder ?? 'MM/DD/YYYY'}
          required={required}
          disabled={readOnly}
          aria-label={label}
          aria-invalid={invalid}
        />
      ) : multiline ? (
        <textarea
          ref={textareaRef}
          name={name}
          rows={1}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-invalid={invalid}
          required={required}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'min-w-0 flex-1 resize-none overflow-hidden border-0 bg-transparent py-0 leading-6 outline-none transition placeholder:text-muted/50 focus-visible:outline-none',
            '[background-image:repeating-linear-gradient(to_bottom,transparent,transparent_calc(1.5rem-2px),var(--blank-line)_calc(1.5rem-2px),var(--blank-line)_1.5rem)]',
            readOnly && 'cursor-not-allowed text-muted',
            invalid
              ? 'text-danger [--blank-line:var(--color-danger)]'
              : 'text-ink [--blank-line:color-mix(in_srgb,var(--color-ink)_30%,transparent)] focus:[--blank-line:var(--color-brand)]',
          )}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          autoFocus={autoFocus}
          aria-invalid={invalid}
          required={required}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          className={controlClass}
        />
      )}
    </>
  )

  if (!trailing) {
    return (
      <label
        className={cn(
          'flex w-full gap-1 text-sm',
          multiline ? 'items-start' : 'items-end',
          className,
        )}
      >
        {field}
      </label>
    )
  }

  return (
    <div
      className={cn(
        'flex w-full gap-1.5 text-sm',
        multiline ? 'items-start' : 'items-end',
        className,
      )}
    >
      <label
        className={cn(
          'flex min-w-0 flex-1 gap-1',
          multiline ? 'items-start' : 'items-end',
        )}
      >
        {field}
      </label>
      {trailing}
    </div>
  )
}
