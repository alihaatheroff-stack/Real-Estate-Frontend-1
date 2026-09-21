import type { FilterTreeNode } from '@/features/search/data/landingFilterOptions'
import {
  CLIENT_MOTIVE_OPTIONS,
  FIELD_TOP_OPTIONS,
  LANGUAGE_BY_LETTER,
  PSP_BY_LETTER,
} from '@/features/search/data/landingFilterOptions'
import type { NetworkForumThread } from '@/features/network/data/types'

/**
 * Commercial agent forum filters — order from commercial-forum-s:
 * Communitie's → ROLE; → Field → Sub-Field (nested tree) →
 * Price Demography → Representation → Condition → DEED, LIEN, NOTE →
 * Ownership → Tool's → LANGUAGE → Motive's
 */

export type ForumFiltersState = {
  community: string[]
  role: string[]
  field: string[]
  subField: string[]
  priceDemography: string[]
  representation: string[]
  condition: string[]
  deedLienNote: string[]
  ownership: string[]
  tools: string[]
  language: string[]
  motives: string[]
}

export const EMPTY_FORUM_FILTERS: ForumFiltersState = {
  community: [],
  role: [],
  field: [],
  subField: [],
  priceDemography: [],
  representation: [],
  condition: [],
  deedLienNote: [],
  ownership: [],
  tools: [],
  language: [],
  motives: [],
}

/** Communitie's Based On Your Search Result's */
export const FORUM_COMMUNITY_OPTIONS = [
  'County',
  'City',
  'State',
  'Zip',
  'Nationwide',
] as const

/** ROLE; — PSP roles (Agent selected on source page) */
export const FORUM_ROLE_OPTIONS = Object.values(PSP_BY_LETTER)
  .flat()
  .filter(Boolean)

/** Field * */
export const FORUM_FIELD_OPTIONS = [...FIELD_TOP_OPTIONS] as const

/**
 * Commercial Sub-Field nested tree — one dropdown with full hierarchy.
 * Living Complex and Single's are separate branches.
 */
export const FORUM_COMMERCIAL_SUB_FIELD_TREE: FilterTreeNode[] = [
  {
    label: 'Recreational',
    children: [
      { label: 'Water Park' },
      { label: 'Ice Rink' },
      { label: 'Trampoline Park' },
      { label: 'Roller Rink' },
      { label: 'Obstacle Course' },
      { label: 'Other' },
    ],
  },
  {
    label: 'Retail',
    children: [
      { label: 'Indoor Mall' },
      { label: 'Strip Mall' },
      { label: 'Anchor' },
      { label: 'Singular' },
    ],
  },
  {
    label: 'Lifestyle',
    children: [
      { label: 'Gym' },
      { label: 'Barber' },
      {
        label: 'Health',
        children: [
          { label: 'Hospital' },
          { label: 'Clinic' },
          { label: 'Dorms' },
          { label: 'Pet Care' },
        ],
      },
    ],
  },
  {
    label: 'Care',
    children: [
      { label: 'Childcare' },
      { label: 'Senior Living' },
      { label: 'Pet Care' },
    ],
  },
  {
    label: 'Living Complex',
    children: [
      { label: 'Apartment' },
      { label: 'Town House' },
    ],
  },
  {
    label: "Single's",
    children: [
      { label: 'Camps' },
      { label: "Closet's" },
      { label: "Boat's" },
      { label: 'Dorms' },
      { label: "Japan Capsule's" },
      { label: "Studio's" },
      { label: 'Halfway House' },
      { label: 'Recovery House' },
      { label: 'Refuge, Go More' },
      { label: "Room's" },
      { label: 'Other' },
    ],
  },
  {
    label: "Extra's",
    children: [
      { label: 'Land' },
      { label: 'Office' },
      { label: 'Singular' },
      { label: 'Skyscraper' },
      { label: 'Hospitality' },
      { label: 'Business For Sale' },
    ],
  },
  {
    label: 'Other',
    children: [{ label: 'So, And So:' }],
  },
]

/** Fallback Sub-Field trees for non-commercial Field selections */
const MULTI_UNIT_SUB: FilterTreeNode[] = [
  { label: "Sky-Scraper's" },
  { label: 'Office' },
  { label: 'Living' },
  { label: 'Hospitality' },
  { label: "Hotel's" },
  { label: "Motel's" },
  { label: 'Mobile Home Park' },
  { label: 'Land' },
  { label: 'Other' },
]

const INDUSTRIAL_SUB: FilterTreeNode[] = [
  { label: 'Factory' },
  { label: 'Warehouse' },
  { label: 'Land' },
  { label: 'Distribution' },
  { label: 'Junk Yards' },
  { label: 'Other' },
]

const AGRICULTURE_SUB: FilterTreeNode[] = [
  { label: "Crop's" },
  { label: 'Livestock' },
  { label: 'Land' },
  { label: 'Other' },
]

const RESIDENTIAL_SUB: FilterTreeNode[] = [
  { label: 'House' },
  { label: "4 Unit's Or Less (If More; See Multi-Unit)" },
  { label: "Condo's" },
  { label: 'Land' },
  { label: 'Other' },
]

const OTHER_SUB: FilterTreeNode[] = [
  { label: 'Land' },
  { label: 'Mixed-Use' },
  { label: 'Water-Front' },
  { label: "Hills-Mountrain's" },
  { label: 'Acreage' },
  { label: 'Land Developement' },
  { label: 'All Of The Above' },
]

const SUB_FIELD_BY_FIELD: Record<string, FilterTreeNode[]> = {
  Commercial: FORUM_COMMERCIAL_SUB_FIELD_TREE,
  'Multi-Unit': MULTI_UNIT_SUB,
  Industrial: INDUSTRIAL_SUB,
  Agriculture: AGRICULTURE_SUB,
  Residential: RESIDENTIAL_SUB,
  Other: OTHER_SUB,
}

export const FORUM_PRICE_DEMOGRAPHY_OPTIONS = [
  'Luxury',
  'Mid High',
  'Mid Mid',
  'Mid Low',
  'Economic',
] as const

export const FORUM_REPRESENTATION_OPTIONS = [
  'Selling',
  'Sell-To-Buy',
  'Retainer Consulting',
  'Lease-Rental',
  'Buy',
  'Referral Agent',
] as const

export const FORUM_CONDITION_OPTIONS = [
  "Passe's Inspection",
  'TLC',
  'Run-Down',
  'Burned',
  'New Construction',
] as const

export const FORUM_DEED_LIEN_NOTE_OPTIONS = [
  'Free And Clear',
  'Deed Or Note Remaining.',
  'Lien',
  'Pre-Foreclosure.',
  'Auction',
  'REO',
  'HUD',
] as const

export const FORUM_OWNERSHIP_OPTIONS = [
  'Mom And Pop',
  'JV',
  'Franchisee',
  'Crowdfunding',
  'REIT',
  'Corporate',
] as const

/** Tool's — App's / Book's / Software / CRM / Shop */
export const FORUM_TOOLS_OPTIONS = [
  "App's",
  "Book's",
  'Software',
  'CRM',
  'Shop',
] as const

export const FORUM_MOTIVE_OPTIONS = CLIENT_MOTIVE_OPTIONS

export const FORUM_LANGUAGE_BY_LETTER = LANGUAGE_BY_LETTER

export const FORUM_SUGGESTED_TOPIC_GROUPS = [
  {
    id: 'latest',
    label: 'Latest',
    topics: ['Why Recreational Crowdfunding Is Crucial'],
  },
  {
    id: 'most-comments',
    label: "Most Comment's",
    topics: ['Why Recreational Crowdfunding Is Crucial'],
  },
  {
    id: 'most-recommended',
    label: 'Most Recommended',
    topics: ['Why Recreational Crowdfunding Is Crucial'],
  },
  {
    id: 'other-suggestive',
    label: 'Other Suggestive Field',
    topics: ['Why Recreational Crowdfunding Is Crucial'],
  },
  {
    id: 'winners',
    label: "Winner's",
    topics: ['Why Recreational Crowdfunding Is Crucial'],
  },
] as const

function collectTreePaths(nodes: FilterTreeNode[], prefix = ''): string[] {
  return nodes.flatMap((node) => {
    const path = prefix ? `${prefix} > ${node.label}` : node.label
    return [path, ...(node.children?.length ? collectTreePaths(node.children, path) : [])]
  })
}

/** Nested Sub-Field tree for the currently selected Field(s). */
export function getForumSubFieldTree(selectedFields: string[]): FilterTreeNode[] {
  const selected = selectedFields.filter((f) => f !== 'All of the above')
  if (selected.length === 0 || selectedFields.includes('All of the above')) {
    return Object.entries(SUB_FIELD_BY_FIELD).map(([label, children]) => ({
      label,
      children,
    }))
  }
  return selected.flatMap((field) => SUB_FIELD_BY_FIELD[field] ?? [])
}

/** All valid Sub-Field path values for cascade pruning when Field changes. */
export function getForumSubFieldPaths(selectedFields: string[]): string[] {
  return collectTreePaths(getForumSubFieldTree(selectedFields))
}

export function forumFiltersActive(filters: ForumFiltersState): boolean {
  return Object.values(filters).some((value) => value.length > 0)
}

function matchesFacet(
  selected: string[],
  threadValue: string | undefined,
): boolean {
  if (selected.length === 0) return true
  if (!threadValue) return false
  return selected.includes(threadValue)
}

/** Parent selection matches its nested children (e.g. Recreational matches Recreational > Water Park). */
function matchesSubField(
  selected: string[],
  threadValue: string | undefined,
): boolean {
  if (selected.length === 0) return true
  if (!threadValue) return false
  return selected.some(
    (value) =>
      threadValue === value ||
      threadValue.startsWith(`${value} > `) ||
      value.startsWith(`${threadValue} > `),
  )
}

export function filterForumThreads(
  threads: NetworkForumThread[],
  filters: ForumFiltersState,
): NetworkForumThread[] {
  if (!forumFiltersActive(filters)) return threads

  return threads.filter((thread) => {
    const f = thread.filters
    if (!f) return false
    return (
      matchesFacet(filters.community, f.community) &&
      matchesFacet(filters.role, f.role) &&
      matchesFacet(filters.field, f.field) &&
      matchesSubField(filters.subField, f.subField) &&
      matchesFacet(filters.priceDemography, f.priceDemography) &&
      matchesFacet(filters.representation, f.representation) &&
      matchesFacet(filters.condition, f.condition) &&
      matchesFacet(filters.deedLienNote, f.deedLienNote) &&
      matchesFacet(filters.ownership, f.ownership) &&
      matchesFacet(filters.tools, f.tools) &&
      matchesFacet(filters.language, f.language) &&
      matchesFacet(filters.motives, f.motives)
    )
  })
}
