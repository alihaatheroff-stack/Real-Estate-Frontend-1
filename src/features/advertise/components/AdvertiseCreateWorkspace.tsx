import { useEffect, useRef, useState } from 'react'
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
import type { AdvertisementDraft } from '@/features/advertise/types'
import { cn } from '@/shared/lib/cn'

/**
 * Vertical dropdowns stay on the left. Live preview sits at the top of the
 * right column, with the create form underneath. Action buttons sit after both.
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
  const columnRef = useRef<HTMLDivElement>(null)
  const [columnHeight, setColumnHeight] = useState<number | null>(null)
  const [filters, setFilters] = useState<AdvertiseFilters>(EMPTY_ADVERTISE_FILTERS)
  const [savedNote, setSavedNote] = useState(false)
  const bannerSize = resolveBannerSize(filters.bannerSize)
  const canReview = Boolean(
    draft.title.trim() || draft.description.trim() || draft.images.length,
  )

  useEffect(() => {
    const node = columnRef.current
    if (!node) return

    function measure() {
      if (!columnRef.current) return
      setColumnHeight(Math.round(columnRef.current.getBoundingClientRect().height))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <AdvertiseFilterPanel
          className="w-full max-w-none lg:w-[21rem] lg:max-w-[21rem]"
          filters={filters}
          onFiltersChange={setFilters}
          style={
            columnHeight
              ? { height: columnHeight, maxHeight: columnHeight }
              : undefined
          }
        />
        <div ref={columnRef} className="flex min-w-0 flex-1 flex-col gap-4">
          <AdvertisementPreview draft={draft} bannerSize={bannerSize} />
          <CreateAdvertisementForm draft={draft} onChange={onDraftChange} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line pt-4">
        <Button type="button" variant="outline" onClick={onAskAiReview} disabled={!canReview}>
          Ask AI to review
        </Button>
        <Button type="button" onClick={() => setSavedNote(true)}>
          Save draft
        </Button>
      </div>
      {savedNote ? (
        <p className="text-xs text-muted">
          Draft saved locally for this session. Backend publish comes later.
        </p>
      ) : null}
    </div>
  )
}
