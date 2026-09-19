import type { LucideIcon } from 'lucide-react'

export function ProviderStatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: LucideIcon
}) {
  return (
    <div className="flex min-w-[10.5rem] flex-1 items-center gap-4">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-[4.75rem] sm:w-[4.75rem]">
        <span
          aria-hidden
          className="absolute left-1 top-2 h-[3.25rem] w-[3.25rem] rounded-full bg-freeio-cream sm:h-14 sm:w-14"
        />
        <Icon className="relative h-9 w-9 text-freeio-ink" strokeWidth={1.4} />
      </div>
      <div className="min-w-0">
        <p className="text-[15px] text-freeio-muted sm:text-base">{label}</p>
        <p className="mt-0.5 text-2xl font-bold leading-none text-freeio-ink sm:text-[1.75rem]">
          {value}
        </p>
      </div>
    </div>
  )
}

export function ProviderTimelineItem({
  letter,
  period,
  title,
  subtitle,
  description,
  isLast,
}: {
  letter: string
  period: string
  title: string
  subtitle?: string
  description: string
  isLast?: boolean
}) {
  return (
    <div className="relative flex gap-5 pb-9 last:pb-0 sm:gap-6 sm:pb-11">
      {!isLast ? (
        <span
          aria-hidden
          className="absolute bottom-0 left-[15px] top-9 border-l border-dashed border-freeio/70"
        />
      ) : null}
      <div className="relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-freeio-mint text-sm font-semibold text-freeio">
        {letter}
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full bg-freeio-tag px-3 py-1 text-xs font-medium text-freeio-coral">
          {period}
        </span>
        <h3 className="mt-3 text-lg font-bold text-freeio-ink sm:text-xl">{title}</h3>
        {subtitle ? (
          <p className="mt-1.5 text-base font-medium text-freeio">{subtitle}</p>
        ) : null}
        <p className="mt-2.5 max-w-2xl text-[15px] leading-7 text-freeio-muted">{description}</p>
      </div>
    </div>
  )
}

export function ProviderSidebarRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}) {
  return (
    <li className="flex items-center gap-3 border-b border-freeio-border-soft py-3.5 last:border-b-0">
      <Icon className="h-[18px] w-[18px] shrink-0 text-freeio-subtle" strokeWidth={1.6} />
      <span className="text-[15px] text-freeio-muted">{label}</span>
      {href ? (
        <a
          href={href}
          className="ml-auto truncate text-right text-[15px] font-medium text-freeio-ink hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="ml-auto text-right text-[15px] font-medium text-freeio-ink">{value}</span>
      )}
    </li>
  )
}
