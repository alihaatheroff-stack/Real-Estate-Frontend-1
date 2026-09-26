import { InfoExclamation } from '@/components/ui/InfoExclamation'
import { glossaryForCategory } from '@/features/glossary/glossary'
import { cn } from '@/shared/lib/cn'

type FieldQaMarkProps = {
  /** Field label — used for accessibility and help copy. */
  field: string
  className?: string
}

/**
 * Info mark on a form label. Hover explains why the question is asked.
 * Learn more opens that question in the glossary.
 */
export function FieldQaMark({ field, className }: FieldQaMarkProps) {
  return (
    <InfoExclamation
      entry={glossaryForCategory(field)}
      className={cn('mt-px', className)}
    />
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
