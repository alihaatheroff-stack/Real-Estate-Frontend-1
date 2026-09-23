import { BANNER_SIZE_OPTIONS } from '@/features/advertise/data/advertiseFilterOptions'
import type { AdvertisementDraft } from '@/features/advertise/types'
import { cn } from '@/shared/lib/cn'

export type BannerSize = (typeof BANNER_SIZE_OPTIONS)[number]

/** IAB-style pixel sizes — preview scales down to fit the column. */
export const BANNER_PREVIEW_SIZE: Record<
  BannerSize,
  { w: number; h: number; label: string }
> = {
  Leaderboard: { w: 728, h: 90, label: '728 × 90' },
  'Medium Rectangle': { w: 300, h: 250, label: '300 × 250' },
  Skyscraper: { w: 160, h: 600, label: '160 × 600' },
  'Mobile Banner': { w: 320, h: 50, label: '320 × 50' },
  Square: { w: 250, h: 250, label: '250 × 250' },
  'Hover Changes Dimension by Banner Type': {
    w: 300,
    h: 250,
    label: '300 × 250 → hover expands',
  },
}

const DEFAULT_BANNER: BannerSize = 'Medium Rectangle'

export function resolveBannerSize(selected: string[]): BannerSize {
  const match = selected.find((value): value is BannerSize => value in BANNER_PREVIEW_SIZE)
  return match ?? DEFAULT_BANNER
}

export function AdvertisementPreview({
  draft,
  bannerSize,
  className,
}: {
  draft: AdvertisementDraft
  bannerSize: BannerSize
  className?: string
}) {
  const size = BANNER_PREVIEW_SIZE[bannerSize]
  const isHoverExpand = bannerSize === 'Hover Changes Dimension by Banner Type'
  const isWide = size.w / size.h >= 3
  const isTall = size.h / size.w >= 2
  const imageUrl = draft.images[0]?.previewUrl
  const title = draft.title.trim() || 'Your headline'
  const description = draft.description.trim() || 'Your ad description will show here.'
  const cta = draft.cta.trim() ? 'Learn more' : 'Learn more'

  return (
    <div className={cn('rounded-xl border border-line bg-white p-4 shadow-sm', className)}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">Live preview</p>
        <p className="text-xs text-muted">
          {bannerSize} · {size.label}
        </p>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <div
          className={cn(
            'group relative overflow-hidden rounded-md border border-line bg-white shadow-sm transition-all duration-300',
            isHoverExpand && 'hover:w-[min(100%,28rem)] hover:max-w-[28rem]',
          )}
          style={{
            width: `min(100%, ${size.w}px)`,
            aspectRatio: `${size.w} / ${size.h}`,
            maxHeight: isTall ? '22rem' : undefined,
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#d8efe6_0%,#eef2f0_50%,#c5ddd2_100%)]" />
          )}

          <div
            className={cn(
              'absolute inset-0 flex',
              isWide
                ? 'flex-row items-center gap-3 bg-ink/55 px-3 py-2'
                : 'flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/35 to-transparent p-3',
            )}
          >
            <div className={cn('min-w-0', isWide ? 'flex-1' : '')}>
              <p
                className={cn(
                  'font-semibold leading-tight text-white',
                  isWide || size.h < 100 ? 'text-xs sm:text-sm' : 'text-sm sm:text-base',
                )}
              >
                {title}
              </p>
              {!isWide && size.h >= 120 ? (
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/85 sm:text-xs">
                  {description}
                </p>
              ) : null}
            </div>
            <span
              className={cn(
                'shrink-0 rounded-md bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]',
                !isWide && 'mt-2 self-start',
              )}
            >
              {cta}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted">
        Preview updates as you edit copy, images, and banner size.
      </p>
    </div>
  )
}
