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
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'items-center text-center sm:flex-col sm:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl space-y-2', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.18em] text-brand',
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-lg font-medium leading-snug text-ink/80 sm:text-xl">{subtitle}</p>
        ) : null}
        {description ? (
          <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
