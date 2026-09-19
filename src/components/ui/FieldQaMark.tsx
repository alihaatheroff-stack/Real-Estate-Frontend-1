import type { MouseEvent } from 'react'
import { cn } from '@/shared/lib/cn'

type FieldQaMarkProps = {
  /** Field label — used for accessibility and future QA routing. */
  field: string
  className?: string
}

/**
 * Trailing info icon (ⓘ) on form field labels. Wire `onClick` / routing to the QA page
 * when that page is ready (why this question is asked).
 */
export function FieldQaMark({ field, className }: FieldQaMarkProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    // TODO: route to QA page, e.g. navigate(`${PATHS.qa}?field=${encodeURIComponent(field)}`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Why is “${field.replace(/:\s*$/, '')}” asked?`}
      title="Why is this question asked?"
      className={cn(
        'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ink bg-white text-[0.65rem] font-normal leading-none text-ink transition',
        'hover:bg-mist hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20',
        className,
      )}
    >
      i
    </button>
  )
}

export function FieldLabelWithQa({
  label,
  className,
  required,
  invalid,
}: {
  label: string
  className?: string
  required?: boolean
  invalid?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className={cn(invalid ? 'text-danger' : undefined)}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      <FieldQaMark field={label} />
    </span>
  )
}
