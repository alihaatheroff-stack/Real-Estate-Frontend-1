import { TimeInput } from '@/components/ui/TimeInput'
import type { DayBusinessHours } from '@/features/auth/model/registerPsp'
import { cn } from '@/shared/lib/cn'
export function DayHoursRangeSelect({
  dayLabel,
  value,
  onChange,
  invalid = false,
}: {
  dayLabel: string
  value: DayBusinessHours
  onChange: (next: DayBusinessHours) => void
  invalid?: boolean
}) {
  const timeClass = cn(
    'h-11 w-[10.5rem] shrink-0',
    invalid && 'border-danger focus-within:border-danger focus-within:ring-danger/20',
  )

  return (
    <div className="inline-flex items-center gap-2" aria-label={`${dayLabel} hours`}>
      <TimeInput
        value={value.start}
        onChange={(start) => onChange({ ...value, start })}
        aria-label={`${dayLabel} start time`}
        aria-invalid={invalid}
        className="shrink-0"
        inputClassName={timeClass}
      />
      <span className="shrink-0 text-xs font-bold tracking-wide text-ink-soft">TO</span>
      <TimeInput
        value={value.end}
        onChange={(end) => onChange({ ...value, end })}
        aria-label={`${dayLabel} end time`}
        aria-invalid={invalid}
        className="shrink-0"
        inputClassName={timeClass}
      />
    </div>
  )
}
