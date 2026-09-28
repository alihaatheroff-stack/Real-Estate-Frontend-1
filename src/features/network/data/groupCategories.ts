/** Extensible taxonomy for community Groups (separate from Forums / Articles). */

export const GROUP_INDUSTRIES = [
  'SaaS',
  'Fintech',
  'E-commerce',
  'AI',
  'Real Estate',
  'Healthcare',
] as const

export const GROUP_PROFESSIONAL_ROLES = [
  'Founders',
  'CEOs',
  'Investors',
  'Marketers',
  'Product Managers',
  'Developers',
] as const

export const GROUP_GEOGRAPHIES = [
  'Pakistan',
  'Lahore',
  'Karachi',
  'Dubai',
  'UK',
  'Fresno',
  'Central Valley',
] as const

export const GROUP_STRATEGIES = [
  'Growth',
  'Fundraising',
  'Customer Acquisition',
  'International Expansion',
  'Scaling',
] as const

export const GROUP_INTERESTS = [
  'Startups',
  'Technology',
  'Investing',
  'Entrepreneurship',
  'Operations',
  'Design',
] as const

export type GroupIndustry = (typeof GROUP_INDUSTRIES)[number]
export type GroupProfessionalRole = (typeof GROUP_PROFESSIONAL_ROLES)[number]
export type GroupGeography = (typeof GROUP_GEOGRAPHIES)[number]
export type GroupStrategy = (typeof GROUP_STRATEGIES)[number]
export type GroupInterest = (typeof GROUP_INTERESTS)[number]

export type GroupSortId =
  | 'latest-joined'
  | 'earliest-joined'
  | 'recently-created'
  | 'most-members'
  | 'recently-active'

export const GROUP_SORT_OPTIONS: { id: GroupSortId; label: string }[] = [
  { id: 'latest-joined', label: 'Latest Joined' },
  { id: 'earliest-joined', label: 'Earliest Joined' },
  { id: 'recently-created', label: 'Recently Created' },
  { id: 'most-members', label: 'Most Members' },
  { id: 'recently-active', label: 'Recently Active' },
]

export type GroupFiltersState = {
  query: string
  industry: string
  professionalRole: string
  geography: string
  strategy: string
  interest: string
  sort: GroupSortId
}

export const EMPTY_GROUP_FILTERS: GroupFiltersState = {
  query: '',
  industry: '',
  professionalRole: '',
  geography: '',
  strategy: '',
  interest: '',
  sort: 'recently-active',
}

export function groupFiltersActive(filters: GroupFiltersState) {
  return Boolean(
    filters.query.trim() ||
      filters.industry ||
      filters.professionalRole ||
      filters.geography ||
      filters.strategy ||
      filters.interest,
  )
}

/** Non-sensitive prefs used for Recommended Groups scoring. */
export const CURRENT_MEMBER_GROUP_PREFS = {
  industry: 'Real Estate',
  professionalRole: 'Investors',
  geography: 'Fresno',
  interests: ['Investing', 'Entrepreneurship', 'Operations'] as string[],
  strategies: ['Growth', 'Fundraising'] as string[],
}
