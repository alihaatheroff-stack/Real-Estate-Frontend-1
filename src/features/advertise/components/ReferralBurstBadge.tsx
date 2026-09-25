import { cn } from '@/shared/lib/cn'

function toPercentLabel(percent: string | number | null | undefined) {
  try {
    return String(percent ?? '')
      .replace(/[^\d.]/g, '')
      .trim()
  } catch {
    return ''
  }
}

/** Referral % badge for ad image corners — brand colors, high contrast. */
export function ReferralBurstBadge({
  percent,
  className,
  size = 'md',
}: {
  percent?: string | number | null
  className?: string
  size?: 'sm' | 'md'
}) {
  const label = toPercentLabel(percent)
  if (!label) return null

  const isSm = size === 'sm'

  return (
    <div
      className={cn(
        'pointer-events-none absolute z-[2] flex flex-col items-center justify-center rounded-full border-2 border-accent bg-brand text-center text-white shadow-md ring-2 ring-white',
        isSm
          ? 'bottom-2 right-2 h-14 w-14'
          : 'bottom-3 right-3 h-16 w-16 sm:h-20 sm:w-20',
        className,
      )}
      aria-label={`${label}% referrals`}
    >
      <span
        className={cn(
          'font-display font-bold leading-none tracking-tight',
          isSm ? 'text-sm' : 'text-lg sm:text-xl',
        )}
      >
        {label}%
      </span>
      <span
        className={cn(
          'mt-0.5 font-sans font-semibold uppercase tracking-wide',
          isSm ? 'text-[7px]' : 'text-[8px] sm:text-[9px]',
        )}
      >
        Referrals
      </span>
    </div>
  )
}
