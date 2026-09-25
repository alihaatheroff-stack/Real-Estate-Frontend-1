import { type BannerSizeLeaf } from '@/features/advertise/data/advertiseFilterOptions'
import {
  isNetworkPlacementId,
  isPreviewPageId,
  previewPageLabel,
  previewPlacementLabel,
} from '@/features/advertise/data/advertisePreviewPlacement'
import { AdPlacementPreview } from '@/features/advertise/components/AdPlacementPreview'
import { AdRoleInfo } from '@/features/advertise/components/AdRoleInfo'
import { ReferralBurstBadge } from '@/features/advertise/components/ReferralBurstBadge'
import type { AdvertisementDraft } from '@/features/advertise/types'
import { isAdVideo, resolveReferralPercent } from '@/features/advertise/types'
import { cn } from '@/shared/lib/cn'

export type BannerSize = BannerSizeLeaf

type PreviewSize = { w: number; h: number; label: string }

/** IAB-style pixel sizes — preview scales down to fit the column. */
export const BANNER_PREVIEW_SIZE: Record<
  Exclude<BannerSize, 'Custom'>,
  PreviewSize
> = {
  Leaderboard: { w: 728, h: 90, label: '728 × 90' },
  'Medium Rectangle': { w: 300, h: 250, label: '300 × 250' },
  Skyscraper: { w: 160, h: 600, label: '160 × 600' },
  'Mobile Banner': { w: 320, h: 50, label: '320 × 50' },
  Square: { w: 250, h: 250, label: '250 × 250' },
  'Video > Clip': { w: 270, h: 480, label: '270 × 480 · Clip' },
  'Video > Video': { w: 640, h: 360, label: '640 × 360 · Video' },
  'Hover Changes Dimension by Banner Type': {
    w: 300,
    h: 250,
    label: '300 × 250 → hover expands',
  },
}

const DEFAULT_BANNER: BannerSize = 'Medium Rectangle'
const DEFAULT_CUSTOM: PreviewSize = { w: 300, h: 250, label: '300 × 250 · Custom' }

function clampDim(value: string, fallback: number) {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return fallback
  return Math.min(Math.round(n), 2000)
}

export function resolveBannerSize(selected: string[]): BannerSize {
  const match = selected.find(
    (value): value is BannerSize =>
      value === 'Custom' || value in BANNER_PREVIEW_SIZE,
  )
  return match ?? DEFAULT_BANNER
}

export function resolvePreviewSize(
  bannerSize: BannerSize,
  customWidth?: string,
  customHeight?: string,
): PreviewSize {
  if (bannerSize === 'Custom') {
    const w = clampDim(customWidth ?? '', DEFAULT_CUSTOM.w)
    const h = clampDim(customHeight ?? '', DEFAULT_CUSTOM.h)
    return { w, h, label: `${w} × ${h} · Custom` }
  }
  return BANNER_PREVIEW_SIZE[bannerSize]
}

export function AdvertisementPreview({
  draft,
  bannerSize,
  customWidth,
  customHeight,
  framed = true,
  previewPage = '',
  previewPlacement = '',
  className,
}: {
  draft: AdvertisementDraft
  bannerSize: BannerSize
  customWidth?: string
  customHeight?: string
  /** When false, omit the outer card chrome (for nesting in a shared box). */
  framed?: boolean
  /** Temporary: page context for on-site placement preview. */
  previewPage?: string
  previewPlacement?: string
  className?: string
}) {
  const size = resolvePreviewSize(bannerSize, customWidth, customHeight)
  const isHoverExpand = bannerSize === 'Hover Changes Dimension by Banner Type'
  const isWide = size.w / size.h >= 3
  const isTall = size.h / size.w >= 2
  const media = draft.images[0]
  const imageUrl = media?.previewUrl
  const mediaIsVideo = media ? isAdVideo(media) : false
  const title = (draft.title ?? '').trim() || 'Your headline'
  const description = (draft.description ?? '').trim() || 'Your ad description will show here.'
  const cta = (draft.cta ?? '').trim() ? 'Learn more' : 'Learn more'
  const showPlacementPreview =
    isPreviewPageId(previewPage) && isNetworkPlacementId(previewPlacement)
  const referralPercent =
    draft.offerReferral && draft.referralPercent
      ? resolveReferralPercent(draft.referralPercent)
      : ''

  return (
    <div
      className={cn(
        framed && 'rounded-xl border border-line bg-white p-4 shadow-sm',
        !framed && 'p-4',
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">
          {showPlacementPreview ? 'On-page preview' : 'Live preview'}
        </p>
        <p className="text-xs text-muted">
          {showPlacementPreview
            ? `${previewPageLabel(previewPage)} · ${previewPlacementLabel(previewPlacement)}`
            : `${bannerSize === 'Custom' ? 'Custom' : bannerSize} · ${size.label}`}
        </p>
      </div>

      {showPlacementPreview ? (
        <AdPlacementPreview
          draft={draft}
          page={previewPage}
          placement={previewPlacement}
        />
      ) : (
        <>
          <div className="mx-auto w-full max-w-md space-y-2">
            {draft.rolePlacement === 'above-image' ? (
              <div className="rounded-lg border border-line bg-paper/80 px-3 py-2">
                <AdRoleInfo draft={draft} />
              </div>
            ) : null}
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
                  mediaIsVideo ? (
                    <video
                      src={imageUrl}
                      className="absolute inset-0 h-full w-full object-cover"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#d8efe6_0%,#eef2f0_50%,#c5ddd2_100%)]" />
                )}

                {referralPercent ? (
                  <ReferralBurstBadge percent={referralPercent} size="sm" />
                ) : null}

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
            {draft.rolePlacement === 'below-image' ? (
              <div className="rounded-lg border border-line bg-paper/80 px-3 py-2">
                <AdRoleInfo draft={draft} />
              </div>
            ) : null}
          </div>

          <p className="mt-2 text-center text-[11px] text-muted">
            Choose a page and placement on the left to see how your ad looks on that page.
          </p>
        </>
      )}
    </div>
  )
}
