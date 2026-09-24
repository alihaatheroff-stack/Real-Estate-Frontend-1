import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  AdvertiseFilterPanel,
  EMPTY_ADVERTISE_FILTERS,
  type AdvertiseFilters,
} from '@/features/advertise/components/AdvertiseFilterPanel'
import {
  AdvertisementPreview,
  resolveBannerSize,
} from '@/features/advertise/components/AdvertisementPreview'
import { CreateAdvertisementForm } from '@/features/advertise/components/CreateAdvertisementForm'
import { placementsForPage } from '@/features/advertise/data/advertisePreviewPlacement'
import type { AdvertisementDraft } from '@/features/advertise/types'
import { cn } from '@/shared/lib/cn'

/**
 * Filters on the left. Live preview + create form share one card on the right.
 * Action buttons sit inside that card so the page scrolls as one flow.
 */
export function AdvertiseCreateWorkspace({
  draft,
  onDraftChange,
  onAskAiReview,
  className,
}: {
  draft: AdvertisementDraft
  onDraftChange: (next: AdvertisementDraft) => void
  onAskAiReview: () => void
  className?: string
}) {
  const [filters, setFilters] = useState<AdvertiseFilters>(EMPTY_ADVERTISE_FILTERS)
  const [hoveredBannerSize, setHoveredBannerSize] = useState<string | null>(null)
  const [previewPage, setPreviewPage] = useState('')
  const [previewPlacement, setPreviewPlacement] = useState('')
  const [savedNote, setSavedNote] = useState(false)
  const bannerSize = resolveBannerSize(
    hoveredBannerSize ? [hoveredBannerSize] : filters.bannerSize,
  )
  const canReview = Boolean(
    draft.title.trim() || draft.description.trim() || draft.images.length,
  )

  function handlePreviewPageChange(page: string) {
    setPreviewPage(page)
    const nextPlacements = placementsForPage(page)
    setPreviewPlacement(nextPlacements[0]?.value ?? '')
  }

  return (
    <div className={cn('flex flex-col gap-4 pb-6', className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <AdvertiseFilterPanel
          className="w-full max-w-none lg:sticky lg:top-0 lg:max-h-[calc(100dvh-7.5rem)] lg:w-[21rem] lg:max-w-[21rem]"
          filters={filters}
          onFiltersChange={setFilters}
          onBannerSizeHover={setHoveredBannerSize}
          previewPage={previewPage}
          previewPlacement={previewPlacement}
          onPreviewPageChange={handlePreviewPageChange}
          onPreviewPlacementChange={setPreviewPlacement}
        />
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-2xl border border-line/90 bg-white shadow-[0_12px_40px_-28px_rgba(15,31,26,0.35),0_0_0_1px_rgba(15,31,26,0.03)]">
            <AdvertisementPreview
              draft={draft}
              bannerSize={bannerSize}
              customWidth={filters.customBannerWidth}
              customHeight={filters.customBannerHeight}
              framed={false}
              previewPage={previewPage}
              previewPlacement={previewPlacement}
            />
            <CreateAdvertisementForm
              draft={draft}
              onChange={onDraftChange}
              framed={false}
            />
            <div className="flex flex-wrap items-center gap-2 border-t border-line/80 bg-paper/60 px-4 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={onAskAiReview}
                disabled={!canReview}
              >
                Ask AI to review
              </Button>
              <Button type="button" onClick={() => setSavedNote(true)}>
                Save draft
              </Button>
              {savedNote ? (
                <p className="w-full text-xs text-muted sm:ml-auto sm:w-auto">
                  Draft saved locally for this session. Backend publish comes later.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
