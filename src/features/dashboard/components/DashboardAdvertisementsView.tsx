import { useState } from 'react'
import { Megaphone, Plus } from 'lucide-react'
import { ADVERTISE_MODULES } from '@/features/advertise/data/advertiseFilterOptions'
import { AdvertiseChatbotWidget } from '@/features/advertise/components/AdvertiseChatbotWidget'
import { AdvertiseCreateWorkspace } from '@/features/advertise/components/AdvertiseCreateWorkspace'
import { Button } from '@/components/ui/Button'
import {
  EMPTY_ADVERTISEMENT_DRAFT,
  type AdvertisementDraft,
} from '@/features/advertise/types'
import { getCurrentMember } from '@/features/network/data/members'
import {
  DASHBOARD_ADVERTISEMENTS,
  countAdsByModule,
} from '@/features/dashboard/data/advertisements'
import { cn } from '@/shared/lib/cn'

const STATUS_STYLES = {
  Active: 'bg-brand/10 text-brand',
  Paused: 'bg-accent/20 text-ink',
  Draft: 'bg-mist text-muted',
} as const

function createInitialDraft(): AdvertisementDraft {
  const me = getCurrentMember()
  return {
    ...EMPTY_ADVERTISEMENT_DRAFT,
    advertiserName: me?.name ?? '',
    role: me?.title ?? '',
    brokerage: me?.company ?? '',
    service: '',
    address: '',
    city: me?.city ?? '',
    zipcode: '',
    phone: '',
    offerReferral: false,
    referralPercent: '',
  }
}

function normalizeDraft(next: AdvertisementDraft): AdvertisementDraft {
  return {
    ...EMPTY_ADVERTISEMENT_DRAFT,
    ...next,
    images: next.images ?? [],
    advertiserName: next.advertiserName ?? '',
    role: next.role ?? '',
    rolePlacement: next.rolePlacement ?? 'below-image',
    brokerage: next.brokerage ?? '',
    service: next.service ?? '',
    brokerLicense: next.brokerLicense ?? '',
    address: next.address ?? '',
    city: next.city ?? '',
    zipcode: next.zipcode ?? '',
    phone: next.phone ?? '',
    offerReferral: Boolean(next.offerReferral),
    referralPercent: next.referralPercent != null ? String(next.referralPercent) : '',
    title: next.title ?? '',
    description: next.description ?? '',
    cta: next.cta ?? '',
  }
}

export function DashboardAdvertisementsView() {
  const [creating, setCreating] = useState(false)
  const [draft, setDraft] = useState<AdvertisementDraft>(createInitialDraft)
  const [reviewRequestId, setReviewRequestId] = useState(0)

  const ads = DASHBOARD_ADVERTISEMENTS
  const byModule = countAdsByModule(ads)
  const activeCount = ads.filter((ad) => ad.status === 'Active').length

  function askAiReview() {
    setReviewRequestId((id) => id + 1)
  }

  if (creating) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Create Advertisement
            </h1>
            <p className="mt-1 text-sm text-muted">
              Choose module and demographics, then build creative with AI review.
            </p>
          </div>
        </div>

        <AdvertiseCreateWorkspace
          draft={draft}
          onDraftChange={(next) => setDraft(normalizeDraft(next))}
          onAskAiReview={askAiReview}
        />

        <AdvertiseChatbotWidget draft={draft} reviewRequestId={reviewRequestId} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Advertisement
          </h1>
          <p className="mt-1 text-sm text-muted">
            How many ads you’ve created and which module each one runs on.
          </p>
        </div>
        <Button
          type="button"
          leftIcon={<Plus className="h-4 w-4" strokeWidth={2} />}
          onClick={() => setCreating(true)}
        >
          Create Advertisement
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
          <p className="text-2xl font-semibold text-ink">{ads.length}</p>
          <p className="mt-1 text-sm text-muted">Total advertisements</p>
        </div>
        <div className="rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
          <p className="text-2xl font-semibold text-ink">{activeCount}</p>
          <p className="mt-1 text-sm text-muted">Active now</p>
        </div>
        <div className="rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
          <p className="text-2xl font-semibold text-ink">{Object.keys(byModule).length}</p>
          <p className="mt-1 text-sm text-muted">Modules with ads</p>
        </div>
      </div>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
        <h2 className="text-lg font-semibold text-ink">Ads by module</h2>
        <p className="mt-0.5 text-xs text-muted">Count of advertisements placed on each platform module</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ADVERTISE_MODULES.map((module) => (
            <li
              key={module}
              className="flex items-center justify-between rounded-xl border border-line bg-mist/40 px-4 py-3"
            >
              <span className="text-sm font-medium text-ink">{module}</span>
              <span className="text-sm font-semibold text-brand">{byModule[module] ?? 0}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold text-ink">All advertisements</h2>
          <p className="mt-0.5 text-xs text-muted">
            Each row shows the ad title and the module it was created for
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-mist/60 text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Advertisement</th>
                <th className="px-5 py-3 font-semibold">Module</th>
                <th className="px-5 py-3 font-semibold">Placement</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Impressions</th>
                <th className="px-5 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-t border-line">
                  <td className="px-5 py-3.5 font-medium text-ink">{ad.title}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex rounded-lg bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
                      {ad.module}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{ad.placement}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        STATUS_STYLES[ad.status],
                      )}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 tabular-nums text-ink">
                    {ad.impressions.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-muted">{ad.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            <Megaphone className="h-4 w-4" strokeWidth={1.75} />
            Create another advertisement
          </button>
        </div>
      </section>
    </div>
  )
}
