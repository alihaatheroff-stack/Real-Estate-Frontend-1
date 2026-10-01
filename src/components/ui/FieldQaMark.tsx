import { InfoExclamation } from '@/components/ui/InfoExclamation'
import { FieldSaveMark } from '@/features/auth/components/FieldSaveContext'
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
 * On Account Settings, also shows a compact save icon beside it.
 */
export function FieldQaMark({ field, className }: FieldQaMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <InfoExclamation entry={glossaryForCategory(field)} className="mt-px" />
      <FieldSaveMark fieldId={field} />
    </span>
  )
}

export function FieldLabelWithQa({
  label,
  className,
  required,
  invalid,
  saveFieldId,
}: {
  label: string
  className?: string
  required?: boolean
  invalid?: boolean
  /** Stable id for per-field save (defaults to label). */
  saveFieldId?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className={cn(invalid ? 'text-danger' : undefined)}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      <InfoExclamation entry={glossaryForCategory(label)} className="mt-px" />
      <FieldSaveMark fieldId={saveFieldId ?? label} />
    </span>
  )
}
