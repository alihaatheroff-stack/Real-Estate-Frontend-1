import type { InputHTMLAttributes, ReactNode } from 'react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { cn } from '@/shared/lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode
  suffix?: ReactNode
  /** Show trailing info icon for QA / why-this-question help. */
  showQaMark?: boolean
}

export function Input({ className, label, id, suffix, showQaMark = false, ...props }: InputProps) {
  const inputId = id ?? props.name
  const qaField = typeof label === 'string' ? label : props.name ?? 'field'

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label ? (
        <span className="inline-flex items-center gap-1 font-bold text-ink">
          {label}
          {showQaMark ? <FieldQaMark field={qaField} /> : null}
        </span>
      ) : null}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'h-11 w-full rounded-xl border border-line bg-paper px-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20',
            suffix && 'pr-11',
            className,
          )}
          {...props}
        />
        {suffix ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted">
            {suffix}
          </div>
        ) : null}
      </div>
    </label>
  )
}
