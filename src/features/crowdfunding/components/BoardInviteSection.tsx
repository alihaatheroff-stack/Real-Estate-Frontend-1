import {
  useId,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react'
import { Check, Cross } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DateInput } from '@/components/ui/DateInput'
import { TimeInput } from '@/components/ui/TimeInput'
import {
  BOARD_ACKNOWLEDGEMENTS,
  BOARD_INVITE,
} from '@/features/crowdfunding/data/loggedInCrowdfunding'
import { cn } from '@/shared/lib/cn'

function AckCheckbox({
  id,
  label,
  checked,
  onChange,
  initials,
  onInitialsChange,
  requiresInitials,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  requiresInitials?: boolean
  initials?: string
  onInitialsChange?: (value: string) => void
}) {
  return (
    <div className="flex w-full items-center gap-3">
      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-sm text-ink">
        <span
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition',
            checked
              ? 'border-brand bg-brand text-white shadow-sm'
              : 'border-ink/55 bg-white text-transparent hover:border-brand',
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="leading-snug">{label}</span>
      </label>
      {requiresInitials ? (
        <input
          name={`${id}-initials`}
          placeholder="Initials"
          value={initials ?? ''}
          onChange={(event) => onInitialsChange?.(event.target.value)}
          aria-label="Initials"
          className="h-8 w-20 shrink-0 border-0 border-b border-line bg-transparent px-1 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-brand"
        />
      ) : null}
    </div>
  )
}

type LineFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  requiredMark?: boolean
}

function LineField({
  label,
  id,
  requiredMark,
  className,
  ...props
}: LineFieldProps) {
  const fieldId = id ?? props.name

  return (
    <label className="group flex min-w-0 items-end gap-2 text-sm text-ink">
      <span className="shrink-0 whitespace-nowrap pb-2 font-semibold leading-none">
        {requiredMark ? <span className="mr-0.5 text-brand">*</span> : null}
        {label}:
      </span>
      <input
        id={fieldId}
        className={cn(
          'h-9 min-w-0 flex-1 border-0 border-b-2 border-ink/30 bg-transparent px-1 text-sm text-ink outline-none transition placeholder:text-muted/45 focus:border-brand group-hover:border-ink/45',
          className,
        )}
        {...props}
      />
    </label>
  )
}

function LineDateField({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex min-w-0 items-end gap-2 text-sm text-ink">
      <span className="shrink-0 whitespace-nowrap pb-2 font-semibold leading-none">
        {label}:
      </span>
      <DateInput
        name={name}
        value={value}
        onChange={onChange}
        variant="underline"
        className="min-w-0 flex-1"
        inputClassName="!h-9 !text-sm sm:!h-9 sm:!text-sm px-1"
        aria-label={label}
      />
    </div>
  )
}

function LineTimeField({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex min-w-0 items-end gap-2 text-sm text-ink">
      <span className="shrink-0 whitespace-nowrap pb-2 font-semibold leading-none">
        {label}:
      </span>
      <TimeInput
        name={name}
        value={value}
        onChange={onChange}
        variant="underline"
        className="min-w-0 flex-1"
        inputClassName="!h-9 !text-sm sm:!h-9 sm:!text-sm px-1"
        aria-label={label}
      />
    </div>
  )
}

export function BoardInviteSection({ className }: { className?: string }) {
  const formId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [acks, setAcks] = useState<Record<string, boolean>>({})
  const [initials, setInitials] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [tos, setTos] = useState(false)
  const [nonRefundable, setNonRefundable] = useState(false)

  function setAck(id: string, value: boolean) {
    setAcks((current) => ({ ...current, [id]: value }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-brand/20 bg-brand-light/40 px-5 py-5',
          className,
        )}
      >
        <p className="font-display text-lg font-semibold text-ink">Invitation received</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Thanks for your interest in the Board of Directors. We&apos;ll follow up soon.
        </p>
      </div>
    )
  }

  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
          <Cross className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {BOARD_INVITE.eyebrow}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {BOARD_INVITE.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{BOARD_INVITE.body}</p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft"
      >
        <div className="space-y-3 border-b border-line bg-mist/40 px-4 py-4 sm:px-5">
          <h4 className="font-display text-base font-semibold text-ink">Acknowledgements</h4>
          <div className="flex flex-col gap-3">
            {BOARD_ACKNOWLEDGEMENTS.map((item) => (
              <AckCheckbox
                key={item.id}
                id={`${formId}-${item.id}`}
                label={item.label}
                checked={Boolean(acks[item.id])}
                onChange={(value) => setAck(item.id, value)}
                requiresInitials={'requiresInitials' in item && item.requiresInitials}
                initials={initials}
                onInitialsChange={setInitials}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-3 px-4 py-4 sm:grid-cols-2 sm:px-5 sm:py-5">
          <div className="space-y-3">
            <LineField name={`${formId}-funder`} label="Funder" />
            <LineTimeField
              name={`${formId}-time`}
              label="Time"
              value={time}
              onChange={setTime}
            />
            <LineField name={`${formId}-name`} label="Name" required autoComplete="name" />
            <LineField
              name={`${formId}-address`}
              label="Address"
              autoComplete="street-address"
            />
            <LineField name={`${formId}-city`} label="City" autoComplete="address-level2" />
            <LineField name={`${formId}-state`} label="State" autoComplete="address-level1" />
            <LineField name={`${formId}-zip`} label="Zipcode" autoComplete="postal-code" />
            <LineField name={`${formId}-country`} label="Country-Code" autoComplete="country" />
          </div>

          <div className="space-y-3">
            <LineDateField
              name={`${formId}-date`}
              label="Date"
              value={date}
              onChange={setDate}
            />
            <LineField
              name={`${formId}-phone`}
              label="Phone"
              type="tel"
              required
              autoComplete="tel"
            />
            <LineField
              name={`${formId}-email`}
              label="E-Mail"
              type="email"
              required
              autoComplete="email"
            />
            <LineField
              name={`${formId}-reach`}
              label="Best time to reach"
              placeholder="e.g. Morning at 9:00 a.m"
            />
            <LineField
              name={`${formId}-interest`}
              label="Crowdfunding Interest"
            />
            <LineField
              name={`${formId}-filters`}
              label="Check Filter's"
            />
            <LineField name={`${formId}-reason`} label="Reason" />
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-3 border-t border-line px-4 py-4 sm:grid-cols-2 sm:px-5">
          <LineField
            name={`${formId}-donation`}
            label="Donation amount"
            type="number"
            min="0"
            step="1"
          />
          <LineField
            name={`${formId}-card`}
            label="Card information"
            placeholder="****"
            autoComplete="cc-number"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-line bg-mist/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex flex-col gap-3">
            <AckCheckbox
              id={`${formId}-tos`}
              label="I agree to the Terms of Service (TOS)."
              checked={tos}
              onChange={setTos}
            />
            <AckCheckbox
              id={`${formId}-nr`}
              label="I confirm this donation is non-refundable."
              checked={nonRefundable}
              onChange={setNonRefundable}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm">
              Learn About Board Opportunities →
            </Button>
            <Button type="submit" size="sm" disabled={!tos || !nonRefundable}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}
