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
 * Left filters match create-form height; live preview spans full width below.
 * Action buttons sit after the preview.
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
  const formRef = useRef<HTMLDivElement>(null)
  const [formHeight, setFormHeight] = useState<number | null>(null)
  const [filters, setFilters] = useState<AdvertiseFilters>(EMPTY_ADVERTISE_FILTERS)
  const [savedNote, setSavedNote] = useState(false)
  const bannerSize = resolveBannerSize(filters.bannerSize)
  const canReview = Boolean(
    draft.title.trim() || draft.description.trim() || draft.images.length,
  )

  useEffect(() => {
    const node = formRef.current
    if (!node) return

    function measure() {
      if (!formRef.current) return
      setFormHeight(Math.round(formRef.current.getBoundingClientRect().height))
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
            formHeight
              ? { height: formHeight, maxHeight: formHeight }
              : undefined
          }
        />
        <div ref={formRef} className="min-w-0 flex-1">
          <CreateAdvertisementForm draft={draft} onChange={onDraftChange} />
        </div>
      </div>

      <AdvertisementPreview
        className="w-full"
        draft={draft}
        bannerSize={bannerSize}
      />

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
