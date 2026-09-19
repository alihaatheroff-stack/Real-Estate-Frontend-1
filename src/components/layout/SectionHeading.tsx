import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type SectionHeadingProps = {
  eyebrow?: string
  eyebrowClassName?: string
  title: string
  subtitle?: string
  description?: string
  action?: ReactNode
  className?: string
  align?: 'left' | 'center'
  /** `subsection` reads as a nested part under a parent section. */
  size?: 'section' | 'subsection'
}

export function SectionHeading({
  eyebrow,
  eyebrowClassName,
  title,
  subtitle,
  description,
  action,
  className,
  align = 'left',
  size = 'section',
}: SectionHeadingProps) {
  const isSubsection = size === 'subsection'

  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        isSubsection ? 'mb-6 gap-2' : 'mb-10',
        align === 'center' && 'items-center text-center sm:flex-col sm:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl space-y-2', isSubsection && 'space-y-1', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p
            className={cn(
              'font-semibold uppercase text-brand',
              isSubsection ? 'text-[0.65rem] tracking-[0.16em]' : 'text-xs tracking-[0.18em]',
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        {isSubsection ? (
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {title}
          </h3>
        ) : (
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
        )}
        {subtitle ? (
          <p
            className={cn(
              'leading-snug text-muted',
              isSubsection ? 'text-sm sm:text-base' : 'text-base sm:text-lg',
            )}
          >
            {subtitle}
          </p>
        ) : null}
        {description ? (
          <p
            className={cn(
              'leading-relaxed text-muted',
              isSubsection ? 'text-sm' : 'text-sm sm:text-base',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
