import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  suffix?: ReactNode
}

export function Input({ className, label, id, suffix, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label ? <span className="font-medium text-ink-soft">{label}</span> : null}
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
