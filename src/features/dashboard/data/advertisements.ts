import { ADVERTISE_MODULES } from '@/features/advertise/data/advertiseFilterOptions'

export type DashboardAdModule = (typeof ADVERTISE_MODULES)[number]

export type DashboardAdvertisement = {
  id: string
  title: string
  module: DashboardAdModule
  status: 'Active' | 'Paused' | 'Draft'
  placement: string
  createdAt: string
  impressions: number
}

/** Mock ads for dashboard — frontend-only until API is wired. */
export const DASHBOARD_ADVERTISEMENTS: DashboardAdvertisement[] = [
  {
    id: 'ad-1',
    title: 'Fresno buyer-agent intro',
    module: 'Referral',
    status: 'Active',
    placement: 'Search results · Medium rectangle',
    createdAt: '2026-03-12',
    impressions: 1840,
  },
  {
    id: 'ad-2',
    title: 'Priority Index spotlight',
    module: 'Crowdfunding',
    status: 'Active',
    placement: 'Explore feed · Campaign spotlight',
    createdAt: '2026-03-18',
    impressions: 920,
  },
  {
    id: 'ad-3',
    title: 'Deal desk community promo',
    module: 'Network',
    status: 'Paused',
    placement: 'Feed ads · Sidebar',
    createdAt: '2026-02-28',
    impressions: 2410,
  },
  {
    id: 'ad-4',
    title: 'Landing hero — PSP join',
    module: 'Home / Landing',
    status: 'Active',
    placement: 'Hero rail · Leaderboard',
    createdAt: '2026-03-01',
    impressions: 5600,
  },
  {
    id: 'ad-5',
    title: 'Shop seasonal kit (draft)',
    module: 'Shop',
    status: 'Draft',
    placement: 'Marketplace card',
    createdAt: '2026-03-20',
    impressions: 0,
  },
  {
    id: 'ad-6',
    title: 'Referral — lease review package',
    module: 'Referral',
    status: 'Active',
    placement: 'Listing detail · Skyscraper',
    createdAt: '2026-03-08',
    impressions: 1102,
  },
]

export function countAdsByModule(ads: DashboardAdvertisement[]) {
  const counts: Record<string, number> = {}
  for (const ad of ads) {
    counts[ad.module] = (counts[ad.module] ?? 0) + 1
  }
  return counts
}
