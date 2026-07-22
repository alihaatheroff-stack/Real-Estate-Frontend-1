import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

type Option = { label: string; value: string }

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: Option[]
  placeholder?: string
  labelClassName?: string
}

export function Select({
  className,
  label,
  labelClassName,
  options,
  placeholder,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className={cn('flex w-full flex-col gap-1.5 text-sm', labelClassName)}>
      {label ? <span className="font-medium text-ink-soft">{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          'h-11 w-full appearance-none rounded-xl border border-line bg-paper px-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20',
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
