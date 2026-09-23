import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AdvertiseChatbotWidget } from '@/features/advertise/components/AdvertiseChatbotWidget'
import { AdvertiseCreateWorkspace } from '@/features/advertise/components/AdvertiseCreateWorkspace'
import { AdvertiseFilterPanel } from '@/features/advertise/components/AdvertiseFilterPanel'
import { Button } from '@/components/ui/Button'
import {
  EMPTY_ADVERTISEMENT_DRAFT,
  type AdvertisementDraft,
} from '@/features/advertise/types'

export function AdvertisePage() {
  const [creating, setCreating] = useState(false)
  const [draft, setDraft] = useState<AdvertisementDraft>(EMPTY_ADVERTISEMENT_DRAFT)
  const [reviewRequestId, setReviewRequestId] = useState(0)

  function askAiReview() {
    setReviewRequestId((id) => id + 1)
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[linear-gradient(180deg,#f4f7f5_0%,#eef2f0_45%,#f7f8f7_100%)]">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-3 pt-4 sm:px-4 sm:pt-5 lg:px-5">
        <h1 className="text-left font-display text-3xl font-semibold tracking-tight text-ink underline decoration-ink underline-offset-4 sm:text-4xl">
          Advertising:
        </h1>
        {!creating ? (
          <Button
            type="button"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" strokeWidth={2} />}
            onClick={() => setCreating(true)}
          >
            Create
          </Button>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-4 sm:px-4 lg:px-5">
        {creating ? (
          <AdvertiseCreateWorkspace
            draft={draft}
            onDraftChange={setDraft}
            onAskAiReview={askAiReview}
          />
        ) : (
          <AdvertiseFilterPanel className="max-h-full w-full max-w-[21rem] overflow-y-auto network-hide-scroll" />
        )}
      </div>

      <AdvertiseChatbotWidget draft={draft} reviewRequestId={reviewRequestId} />
    </div>
  )
}
