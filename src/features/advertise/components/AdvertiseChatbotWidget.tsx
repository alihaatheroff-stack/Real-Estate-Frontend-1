import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { AdvertiseChatbot } from '@/features/advertise/components/AdvertiseChatbot'
import type { AdvertisementDraft } from '@/features/advertise/types'
import { cn } from '@/shared/lib/cn'

/**
 * Website-style floating AI assistant — circular FAB opens the chat panel.
 */
export function AdvertiseChatbotWidget({
  draft,
  reviewRequestId = 0,
}: {
  draft: AdvertisementDraft
  reviewRequestId?: number
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (reviewRequestId > 0) setOpen(true)
  }, [reviewRequestId])

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div
          className={cn(
            'pointer-events-auto flex h-[min(70vh,32rem)] w-[min(calc(100vw-1.5rem),22.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_rgba(15,31,26,0.22)]',
          )}
        >
          <div className="flex items-center justify-between border-b border-line bg-brand px-3 py-2.5 text-white">
            <p className="text-sm font-semibold">AI ad assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              aria-label="Close AI assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <AdvertiseChatbot
            draft={draft}
            reviewRequestId={reviewRequestId}
            className="min-h-0 flex-1 rounded-none border-0 shadow-none"
            compactHeader
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_12px_28px_rgba(11,31,58,0.45)] transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2',
          open && 'ring-2 ring-white/80',
        )}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" strokeWidth={2} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.75} />}
      </button>
    </div>
  )
}
