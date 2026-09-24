import { useState } from 'react'
import { AdvertiseChatbotWidget } from '@/features/advertise/components/AdvertiseChatbotWidget'
import { AdvertiseCreateWorkspace } from '@/features/advertise/components/AdvertiseCreateWorkspace'
import {
  EMPTY_ADVERTISEMENT_DRAFT,
  type AdvertisementDraft,
} from '@/features/advertise/types'

export function AdvertisePage() {
  const [draft, setDraft] = useState<AdvertisementDraft>(EMPTY_ADVERTISEMENT_DRAFT)
  const [reviewRequestId, setReviewRequestId] = useState(0)

  function askAiReview() {
    setReviewRequestId((id) => id + 1)
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[linear-gradient(165deg,#f3f7f5_0%,#e8efeb_38%,#f6f8f7_100%)]">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-3 pt-4 sm:px-4 sm:pt-5 lg:px-5">
        <div>
          <h1 className="text-left font-display text-3xl font-semibold tracking-tight text-ink underline decoration-ink underline-offset-4 sm:text-4xl">
            Advertising:
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Choose placement, craft your creative, and watch the live preview update as you go.
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-8 pt-4 sm:px-4 lg:px-5">
        <AdvertiseCreateWorkspace
          draft={draft}
          onDraftChange={setDraft}
          onAskAiReview={askAiReview}
        />
      </div>

      <AdvertiseChatbotWidget draft={draft} reviewRequestId={reviewRequestId} />
    </div>
  )
}
