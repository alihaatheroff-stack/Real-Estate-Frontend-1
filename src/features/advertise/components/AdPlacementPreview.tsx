import { Star } from 'lucide-react'
import { AdRoleInfo } from '@/features/advertise/components/AdRoleInfo'
import { ReferralBurstBadge } from '@/features/advertise/components/ReferralBurstBadge'
import type { AdvertisementDraft } from '@/features/advertise/types'
import { isAdVideo, resolveReferralPercent } from '@/features/advertise/types'
import type {
  NetworkPlacementId,
  PreviewPageId,
  PreviewPlacementId,
} from '@/features/advertise/data/advertisePreviewPlacement'
import { isNetworkNewsfeedPage } from '@/features/advertise/data/advertisePreviewPlacement'
import { cn } from '@/shared/lib/cn'

function draftCopy(draft: AdvertisementDraft) {
  return {
    title: (draft.title ?? '').trim() || 'Your headline',
    description: (draft.description ?? '').trim() || 'Your ad description will show here.',
    media: draft.images?.[0],
  }
}

function referralBadgeFor(draft: AdvertisementDraft) {
  if (!draft.offerReferral || !draft.referralPercent) return null
  const percent = resolveReferralPercent(draft.referralPercent)
  if (!percent) return null
  return percent
}

function FeedMedia({
  imageUrl,
  mediaIsVideo,
  referralPercent,
}: {
  imageUrl?: string
  mediaIsVideo: boolean
  referralPercent?: string | null
}) {
  return (
    <div className="relative w-full overflow-hidden bg-ink">
      {imageUrl ? (
        mediaIsVideo ? (
          <video
            src={imageUrl}
            className="max-h-[420px] w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          <img src={imageUrl} alt="" className="max-h-[420px] w-full object-cover" />
        )
      ) : (
        <div className="flex h-[280px] w-full items-center justify-center bg-[linear-gradient(135deg,#d8efe6_0%,#c5ddd2_100%)] text-sm text-ink-soft">
          Your image appears here
        </div>
      )}
      {referralPercent ? <ReferralBurstBadge percent={referralPercent} /> : null}
    </div>
  )
}

/** Matches Network feed / sidebar ad cards after publish. */
function PlacementAdCreative({
  draft,
  variant,
}: {
  draft: AdvertisementDraft
  variant: 'sidebar' | 'feed'
}) {
  const { title, description, media } = draftCopy(draft)
  const imageUrl = media?.previewUrl
  const mediaIsVideo = media ? isAdVideo(media) : false
  const roleAbove = draft.rolePlacement === 'above-image'
  const referralPercent = referralBadgeFor(draft)

  if (variant === 'feed') {
    return (
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(15,31,26,0.04)] ring-2 ring-brand/70 ring-offset-2 ring-offset-[#eef2f0]">
        <div className="flex items-center gap-3 px-4 pt-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Star className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-ink">Sponsored</span>
            <span className="block text-[13px] text-muted">Advertisement</span>
          </span>
        </div>
        <p className="px-4 py-3 text-[15px] leading-relaxed text-ink">{description}</p>
        {roleAbove ? (
          <div className="border-y border-line/70 bg-paper/80 px-4 py-2.5">
            <AdRoleInfo draft={draft} />
          </div>
        ) : null}
        <FeedMedia
          imageUrl={imageUrl}
          mediaIsVideo={mediaIsVideo}
          referralPercent={referralPercent}
        />
        {!roleAbove ? (
          <div className="border-t border-line/70 bg-paper/80 px-4 py-2.5">
            <AdRoleInfo draft={draft} />
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-3 border-t border-line/80 bg-[#F7F8F9] px-4 py-3">
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Advertisement
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-ink">{title}</span>
          </span>
          <span className="shrink-0 rounded-md bg-mist px-3 py-1.5 text-sm font-semibold text-ink">
            Learn more
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(15,31,26,0.04)] ring-2 ring-brand/70 ring-offset-1 ring-offset-[#eef2f0]">
      {roleAbove ? (
        <div className="border-b border-line/70 px-2.5 py-2">
          <AdRoleInfo draft={draft} size="sm" />
        </div>
      ) : null}
      <div className="relative h-28 w-full overflow-hidden bg-mist sm:h-36">
        {imageUrl ? (
          mediaIsVideo ? (
            <video
              src={imageUrl}
              className="h-full w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          )
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#d8efe6_0%,#c5ddd2_100%)]" />
        )}
        <span className="absolute left-2 top-2 z-[3] rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-ink shadow-sm">
          Ad
        </span>
        {referralPercent ? <ReferralBurstBadge percent={referralPercent} size="sm" /> : null}
      </div>
      <div className="p-3">
        {!roleAbove ? (
          <div className="mb-2">
            <AdRoleInfo draft={draft} size="sm" />
          </div>
        ) : null}
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Sponsored</p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink">{title}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  )
}

function FakePost({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-xl border border-line/70 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-8 w-8 rounded-full bg-line" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <span className="block h-2 w-24 rounded bg-line" />
          <span className="block h-1.5 w-14 rounded bg-mist" />
        </div>
      </div>
      <div className="mb-1 h-2 w-full rounded bg-mist" />
      <div className="mb-2 h-2 w-4/5 rounded bg-mist" />
      <div className={cn('rounded-lg bg-mist/80', compact ? 'h-16' : 'h-28')} />
    </div>
  )
}

function FakeSidebarBlock({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-line/80 bg-white/70 px-1.5 py-2 text-center text-[8px] text-muted">
      {label}
    </div>
  )
}

function NetworkPageMock({
  draft,
  placement,
}: {
  draft: AdvertisementDraft
  placement: NetworkPlacementId
}) {
  const leftActive = placement === 'top-left'
  const feedActive = placement === 'in-between-posts'

  if (feedActive) {
    return (
      <div className="overflow-hidden rounded-xl border border-line bg-[#eef2f0]">
        <div className="flex items-center gap-2 border-b border-line/80 bg-white px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <p className="text-[11px] font-semibold text-ink">Network · Newsfeed</p>
          <p className="ml-auto text-[10px] text-muted">Between posts</p>
        </div>

        <div className="mx-auto max-w-[520px] space-y-3 p-3 sm:p-4">
          <FakePost compact />
          <PlacementAdCreative draft={draft} variant="feed" />
          <FakePost compact />
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#eef2f0]">
      <div className="flex items-center gap-2 border-b border-line/80 bg-white px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-brand" />
        <p className="text-[11px] font-semibold text-ink">Network · Newsfeed</p>
        <p className="ml-auto text-[10px] text-muted">
          {leftActive ? 'Top left rail' : 'Top right rail'}
        </p>
      </div>

      <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4 sm:p-4">
        {leftActive ? (
          <>
            <div className="space-y-2">
              <FakeSidebarBlock label="Nav" />
              <PlacementAdCreative draft={draft} variant="sidebar" />
              <FakeSidebarBlock label="Birthdays" />
            </div>
            <div className="space-y-2 opacity-60">
              <FakePost />
              <FakePost compact />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2 opacity-50">
              <FakeSidebarBlock label="Trends" />
              <FakeSidebarBlock label="People" />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_9rem] gap-3">
              <div className="space-y-2 opacity-60">
                <FakePost />
                <FakePost compact />
              </div>
              <div className="space-y-2">
                <FakeSidebarBlock label="Trends" />
                <PlacementAdCreative draft={draft} variant="sidebar" />
                <FakeSidebarBlock label="People" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function AdPlacementPreview({
  draft,
  page,
  placement,
  className,
}: {
  draft: AdvertisementDraft
  page: PreviewPageId
  placement: PreviewPlacementId
  className?: string
}) {
  if (isNetworkNewsfeedPage(page)) {
    return (
      <div className={cn(className)}>
        <NetworkPageMock draft={draft} placement={placement as NetworkPlacementId} />
        <p className="mt-2 text-center text-[11px] text-muted">
          Highlighted card matches how your ad looks after it posts.
        </p>
      </div>
    )
  }

  return null
}
