import type { DashboardListItem, StatusTone } from '@/features/dashboard/data/sectionDummyData'
import { cn } from '@/shared/lib/cn'

const TONE_CLASS: Record<StatusTone, string> = {
  success: 'bg-brand/10 text-brand',
  warn: 'bg-accent/25 text-ink',
  muted: 'bg-mist text-muted',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-[#e8f2ff] text-[#1d4f91]',
}

export function DashboardDataList({ items }: { items: DashboardListItem[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => (
        <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-ink">{item.title}</p>
            {item.subtitle ? <p className="mt-0.5 text-sm text-muted">{item.subtitle}</p> : null}
            {item.meta ? <p className="mt-1 text-xs text-muted">{item.meta}</p> : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {item.amount ? (
              <span className="text-sm font-semibold tabular-nums text-ink">{item.amount}</span>
            ) : null}
            {item.status ? (
              <span
                className={cn(
                  'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
                  TONE_CLASS[item.tone ?? 'muted'],
                )}
              >
                {item.status}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
