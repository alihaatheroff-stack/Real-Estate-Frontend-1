/** Temporary preview-context filters — separate from targeting / Ad-Type options. */

export type PreviewPageId =
  | 'Hire > Welcome'
  | 'Hire > Service Results'
  | 'Hire > Profile Results'
  | 'Hire > Office Results'
  | 'Referral > Welcome'
  | 'Referral > Service Results'
  | 'Referral > Service Results > Service Suggested Dedicated Page'
  | 'Referral > Profile Results'
  | 'Referral > Profile Results > Profile Suggested Dedicated Page'
  | 'Referral > Office Results'
  | 'Referral > Office Results > Office Suggested Dedicated Page'
  | 'Crowdfund > Results Page'
  | 'Network > Newsfeed'
  | 'Network > Articles'
  | 'Network > Forums'
  | 'Network > Groups'

/** Network newsfeed sidebar / feed slots (on-page mock). */
export type NetworkPlacementId = 'top-left' | 'top-right' | 'in-between-posts'

/** In-card ads on referral / hire results grids. */
export type InCardPlacementId =
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'watermark'

export type PreviewPlacementId = string

export type PreviewPageOption = {
  value: PreviewPageId
  label: string
  /** Extra nest level under the module optgroup (0 = direct child). */
  depth?: number
}

export type PreviewPageGroup = {
  label: string
  pages: PreviewPageOption[]
}

export type PreviewPlacementOption = {
  value: PreviewPlacementId
  label: string
}

/** Nested page groups for the Choose Page dropdown (parent → sub-pages). */
export const PREVIEW_PAGE_GROUPS: PreviewPageGroup[] = [
  {
    label: 'Hire',
    pages: [
      { value: 'Hire > Welcome', label: 'Welcome' },
      { value: 'Hire > Service Results', label: 'Service Results' },
      { value: 'Hire > Profile Results', label: 'Profile Results' },
      { value: 'Hire > Office Results', label: 'Office Results' },
    ],
  },
  {
    label: 'Referral',
    pages: [
      { value: 'Referral > Welcome', label: 'Welcome' },
      { value: 'Referral > Service Results', label: 'Service Results' },
      {
        value: 'Referral > Service Results > Service Suggested Dedicated Page',
        label: 'Service Suggested Dedicated Page',
        depth: 1,
      },
      { value: 'Referral > Profile Results', label: 'Profile Results' },
      {
        value: 'Referral > Profile Results > Profile Suggested Dedicated Page',
        label: 'Profile Suggested Dedicated Page',
        depth: 1,
      },
      { value: 'Referral > Office Results', label: 'Office Results' },
      {
        value: 'Referral > Office Results > Office Suggested Dedicated Page',
        label: 'Office Suggested Dedicated Page',
        depth: 1,
      },
    ],
  },
  {
    label: 'Crowdfund',
    pages: [{ value: 'Crowdfund > Results Page', label: 'Results Page' }],
  },
  {
    label: 'Network',
    pages: [
      { value: 'Network > Newsfeed', label: 'Newsfeed' },
      { value: 'Network > Articles', label: 'Articles' },
      { value: 'Network > Forums', label: 'Forums' },
      { value: 'Network > Groups', label: 'Groups' },
    ],
  },
]

const ALL_PREVIEW_PAGE_IDS = new Set<string>(
  PREVIEW_PAGE_GROUPS.flatMap((group) => group.pages.map((page) => page.value)),
)

/** Welcome / hero rails (Hire + Referral welcome). */
const WELCOME_PLACEMENTS: PreviewPlacementOption[] = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'right-promo', label: 'Right Promo' },
]

/** Results grids — same in-card slots as Referral featured ads. */
const IN_CARD_PLACEMENTS: PreviewPlacementOption[] = [
  { value: 'top-left', label: 'In Card · Top Left' },
  { value: 'top-right', label: 'In Card · Top Right' },
  { value: 'bottom-right', label: 'In Card · Bottom Right' },
  { value: 'watermark', label: 'In Card · Watermark' },
]

/** Suggested dedicated detail pages. */
const DEDICATED_PAGE_PLACEMENTS: PreviewPlacementOption[] = [
  { value: 'header-banner', label: 'Header Banner' },
  { value: 'in-content', label: 'In Content' },
  { value: 'sidebar', label: 'Sidebar' },
]

const CROWDFUND_PLACEMENTS: PreviewPlacementOption[] = [
  { value: 'priority-index', label: 'Priority Index' },
  { value: 'explore-feed', label: 'Explore Feed' },
  { value: 'campaign-spotlight', label: 'Campaign Spotlight' },
]

const NETWORK_NEWSFEED_PLACEMENTS: PreviewPlacementOption[] = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'in-between-posts', label: 'In Between Posts' },
]

const NETWORK_SECTION_PLACEMENTS: PreviewPlacementOption[] = [
  { value: 'feed', label: 'Feed' },
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'header-banner', label: 'Header Banner' },
]

export const PREVIEW_PLACEMENTS_BY_PAGE: Record<
  PreviewPageId,
  PreviewPlacementOption[]
> = {
  'Hire > Welcome': WELCOME_PLACEMENTS,
  'Hire > Service Results': IN_CARD_PLACEMENTS,
  'Hire > Profile Results': IN_CARD_PLACEMENTS,
  'Hire > Office Results': IN_CARD_PLACEMENTS,
  'Referral > Welcome': WELCOME_PLACEMENTS,
  'Referral > Service Results': IN_CARD_PLACEMENTS,
  'Referral > Service Results > Service Suggested Dedicated Page':
    DEDICATED_PAGE_PLACEMENTS,
  'Referral > Profile Results': IN_CARD_PLACEMENTS,
  'Referral > Profile Results > Profile Suggested Dedicated Page':
    DEDICATED_PAGE_PLACEMENTS,
  'Referral > Office Results': IN_CARD_PLACEMENTS,
  'Referral > Office Results > Office Suggested Dedicated Page':
    DEDICATED_PAGE_PLACEMENTS,
  'Crowdfund > Results Page': CROWDFUND_PLACEMENTS,
  'Network > Newsfeed': NETWORK_NEWSFEED_PLACEMENTS,
  'Network > Articles': NETWORK_SECTION_PLACEMENTS,
  'Network > Forums': NETWORK_SECTION_PLACEMENTS,
  'Network > Groups': NETWORK_SECTION_PLACEMENTS,
}

export function placementsForPage(page: string): PreviewPlacementOption[] {
  if (page in PREVIEW_PLACEMENTS_BY_PAGE) {
    return PREVIEW_PLACEMENTS_BY_PAGE[page as PreviewPageId]
  }
  return []
}

export function isPreviewPageId(value: string): value is PreviewPageId {
  return ALL_PREVIEW_PAGE_IDS.has(value)
}

export function isNetworkNewsfeedPage(value: string): boolean {
  return value === 'Network > Newsfeed'
}

export function isNetworkPlacementId(value: string): value is NetworkPlacementId {
  return NETWORK_NEWSFEED_PLACEMENTS.some((option) => option.value === value)
}

export function previewPageLabel(page: string): string {
  for (const group of PREVIEW_PAGE_GROUPS) {
    for (const option of group.pages) {
      if (option.value === page) {
        return `${group.label} · ${option.label}`
      }
    }
  }
  return page
}

export function previewPlacementLabel(placement: string, page?: string): string {
  if (page) {
    const match = placementsForPage(page).find((option) => option.value === placement)
    if (match) return match.label
  }
  for (const options of Object.values(PREVIEW_PLACEMENTS_BY_PAGE)) {
    const match = options.find((option) => option.value === placement)
    if (match) return match.label
  }
  return placement
}
