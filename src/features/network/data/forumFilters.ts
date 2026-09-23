import type { FilterTreeNode } from '@/features/search/data/landingFilterOptions'
import {
  PRICE_DEMOGRAPHY_OPTIONS,
  PROPERTY_CONDITION_OPTIONS,
} from '@/features/search/data/landingFilterOptions'
import { SERVICE_DISTANCE_DEFAULT } from '@/features/search/data/categories'
import type { NetworkForumThread } from '@/features/network/data/types'
import type { LandingFilterValues } from '@/features/search/components/LandingFilterFields'

/**
 * Forums left-rail filter state = landing filter values
 * + taxonomy-only facets used by ForumTaxonomyPanel.
 */
export type ForumFiltersState = LandingFilterValues & {
  /** Platform module context for this forum rail. */
  module: string[]
  /** Taxonomy Sub-Field paths (commercial tree). */
  subField: string[]
  deedLienNote: string[]
  ownership: string[]
  tools: string[]
  /** Service-results tail filters (English Level → Payment Terms). */
  englishLevel: string[]
  educationArchive: string[]
  arMeasurementTools: string[]
  paymentMethods: string[]
  paymentPacket: string[]
  tierSelection: string[]
  paymentTerms: string[]
}

/** Default A–Z PSP for this commercial RE agents forum. */
export const DEFAULT_FORUM_PSP = ['Agent > Real Estate'] as const

/** Default Fields selection for this commercial RE agents forum. */
export const DEFAULT_FORUM_FIELD = ['Commercial'] as const

/** Default Experience selection for this commercial RE agents forum. */
export const DEFAULT_FORUM_EXPERIENCE = ['All Of The Above'] as const

/** Default Experience Level (1–10 scale) for forums. */
export const DEFAULT_FORUM_EXPERIENCE_LEVEL = ['5'] as const

/** Default module for forums left rail. */
export const DEFAULT_FORUM_MODULE = ['Network'] as const

/** Module choices shown above Fields. */
export const FORUM_MODULE_OPTIONS = [
  'Home',
  'Referrals',
  'Crowdfund',
  'Network',
  'Shop',
] as const

/** Shared "All Of The Above" default for several forums dropdowns. */
export const DEFAULT_FORUM_ALL = ['All Of The Above'] as const

export const EMPTY_FORUM_FILTERS: ForumFiltersState = {
  role: [],
  find: [],
  psp: [],
  representation: [],
  financing: [],
  field: [],
  clientExperience: [],
  condition: [],
  vacancy: [],
  propertyTitle: [],
  saleType: [],
  tagSkill: [],
  yourExperience: [],
  motive: [],
  language: [],
  percentageShare: [],
  willingToTrain: [],
  formOfPayment: [],
  references: [],
  priceBand: [],
  institution: [],
  purchaseExperience: [],
  loanExperience: [],
  whichService: [],
  govAgencies: [],
  charge: [],
  income: [],
  dti: [],
  ltv: [],
  loanTypes: [],
  loanRateType: [],
  prepaymentPenalty: [],
  timeDuration: [],
  lengthToClose: [],
  creditCheck: [],
  prSqFt: [],
  proof: [],
  legalTitle: [],
  zip: '',
  radius: String(SERVICE_DISTANCE_DEFAULT),
  module: [...DEFAULT_FORUM_MODULE],
  subField: [],
  deedLienNote: [],
  ownership: [],
  tools: [],
  experienceLevel: [],
  englishLevel: [],
  educationArchive: [],
  arMeasurementTools: [],
  paymentMethods: [],
  paymentPacket: [],
  tierSelection: [],
  paymentTerms: [],
}

/** Initial forums filter state with commercial defaults pre-selected. */
export const DEFAULT_FORUM_FILTERS: ForumFiltersState = {
  ...EMPTY_FORUM_FILTERS,
  module: [...DEFAULT_FORUM_MODULE],
  psp: [...DEFAULT_FORUM_PSP],
  field: [...DEFAULT_FORUM_FIELD],
  clientExperience: [...DEFAULT_FORUM_EXPERIENCE],
  experienceLevel: [...DEFAULT_FORUM_EXPERIENCE_LEVEL],
  condition: [...DEFAULT_FORUM_ALL],
  vacancy: [...DEFAULT_FORUM_ALL],
  propertyTitle: [...DEFAULT_FORUM_ALL],
  saleType: [...DEFAULT_FORUM_ALL],
  motive: [...DEFAULT_FORUM_ALL],
}

/**
 * Commercial Sub-Field tree for the right-side taxonomy panel.
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
    children: [{ label: 'Apartment' }, { label: 'Town House' }],
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

const FORUM_REPRESENTATION_OPTIONS = [
  'Selling',
  'Sell-To-Buy',
  'Retainer Consulting',
  'Lease-Rental',
  'Buy',
  'Referral Agent',
] as const

const FORUM_DEED_LIEN_NOTE_OPTIONS = [
  'Free And Clear',
  'Deed Or Note Remaining.',
  'Lien',
  'Pre-Foreclosure.',
  'Auction',
  'REO',
  'HUD',
] as const

const FORUM_OWNERSHIP_OPTIONS = [
  'Mom And Pop',
  'JV',
  'Franchisee',
  'Crowdfunding',
  'REIT',
  'Corporate',
] as const

const FORUM_TOOLS_TAXONOMY_OPTIONS = ["App's", "Book's", 'Software', 'CRM'] as const

/**
 * Right-side DEMOGRAPHIC columns.
 * Deed/Lien/Note is shown as the first OWNERSHIP column under DEMOGRAPHIC.
 */
export const FORUM_DEMOGRAPHIC_COLUMNS = [
  {
    id: 'representation',
    title: 'Representation',
    filterKey: 'representation' as const,
    options: [...FORUM_REPRESENTATION_OPTIONS],
  },
  {
    id: 'priceBand',
    title: 'Price Demographic',
    filterKey: 'priceBand' as const,
    options: [...PRICE_DEMOGRAPHY_OPTIONS],
  },
  {
    id: 'condition',
    title: 'Condition',
    filterKey: 'condition' as const,
    options: [...PROPERTY_CONDITION_OPTIONS],
  },
  {
    id: 'deedLienNote',
    title: 'Ownership',
    filterKey: 'deedLienNote' as const,
    options: [...FORUM_DEED_LIEN_NOTE_OPTIONS],
  },
  {
    id: 'ownership',
    title: 'Ownership',
    filterKey: 'ownership' as const,
    options: [...FORUM_OWNERSHIP_OPTIONS],
  },
  {
    id: 'tools',
    title: "Tool's",
    filterKey: 'tools' as const,
    options: [...FORUM_TOOLS_TAXONOMY_OPTIONS],
  },
  {
    id: 'shop',
    title: 'Shop',
    filterKey: 'tools' as const,
    options: ['Shop'] as string[],
  },
  {
    id: 'extras',
    title: "Extra's",
    filterKey: null,
    options: [] as string[],
  },
] as const

function sameStringList(a: string[] | undefined, b: readonly string[]): boolean {
  if (!a) return b.length === 0
  return a.length === b.length && b.every((value) => a.includes(value))
}

/** Left-rail dropdown keys that must be filled before posting a new topic. */
const FORUM_COMPOSE_REQUIRED_ARRAYS: {
  key: keyof ForumFiltersState
  label: string
}[] = [
  { key: 'field', label: 'Fields' },
  { key: 'psp', label: "A–Z PSP's" },
  { key: 'find', label: 'Search By' },
  { key: 'clientExperience', label: 'Experience' },
  { key: 'experienceLevel', label: 'Experience Level' },
  { key: 'condition', label: 'Property Condition' },
  { key: 'vacancy', label: 'Vacancy' },
  { key: 'propertyTitle', label: 'Title' },
  { key: 'saleType', label: 'Sale Type' },
  { key: 'motive', label: "Motive's" },
  { key: 'language', label: 'Languages Spoken' },
  { key: 'englishLevel', label: 'English Level' },
  { key: 'willingToTrain', label: 'Willing to Train' },
  { key: 'educationArchive', label: 'Education / Archive' },
  { key: 'arMeasurementTools', label: 'AR Measurement Tools' },
  { key: 'paymentMethods', label: 'Payment Methods' },
  { key: 'paymentPacket', label: 'Payment Packet' },
  { key: 'tierSelection', label: 'Tier Selection' },
  { key: 'paymentTerms', label: 'Payment Terms' },
]

/** Labels for vertical dropdowns still missing when composing a topic. */
export function missingForumComposeFilters(filters: ForumFiltersState): string[] {
  const missing: string[] = []

  for (const { key, label } of FORUM_COMPOSE_REQUIRED_ARRAYS) {
    const value = filters[key]
    if (!Array.isArray(value) || value.length === 0) missing.push(label)
  }

  if (!filters.percentageShare.length) missing.push('Referral Share')
  if (!filters.zip.trim()) missing.push('Zipcode')
  if (!String(filters.radius ?? '').trim()) missing.push('Mile Radius')

  return missing
}

/** True when every forums left-rail filter required to post a topic is set. */
export function forumComposeFiltersComplete(filters: ForumFiltersState): boolean {
  return missingForumComposeFilters(filters).length === 0
}

/** True when forums filters differ from the built-in commercial defaults. */
export function forumFiltersActive(filters: ForumFiltersState): boolean {
  const baseline = DEFAULT_FORUM_FILTERS

  for (const key of Object.keys(baseline) as (keyof ForumFiltersState)[]) {
    const current = filters[key]
    const expected = baseline[key]

    if (typeof expected === 'string') {
      if ((current as string | undefined) !== expected) return true
      continue
    }

    if (Array.isArray(expected)) {
      if (!sameStringList(current as string[] | undefined, expected)) return true
    }
  }

  return false
}

function matchesFacet(
  selected: string[] | undefined,
  threadValue: string | undefined,
): boolean {
  if (!selected || selected.length === 0) return true
  // "All" means no constraint for this facet.
  if (selected.some((value) => value === 'All' || value.toLowerCase() === 'all')) {
    return true
  }
  if (!threadValue) return false
  return selected.some(
    (value) =>
      value === threadValue ||
      value.startsWith(`${threadValue} > `) ||
      threadValue.startsWith(`${value} > `) ||
      value.split(' > ')[0] === threadValue ||
      threadValue.split(' > ')[0] === value.split(' > ')[0],
  )
}

/** Parent selection matches nested children (e.g. Recreational matches Recreational > Water Park). */
function matchesSubField(
  selected: string[] | undefined,
  threadValue: string | undefined,
): boolean {
  if (!selected || selected.length === 0) return true
  if (!threadValue) return false
  return selected.some(
    (value) =>
      threadValue === value ||
      threadValue.startsWith(`${value} > `) ||
      value.startsWith(`${threadValue} > `) ||
      // Leaf-only selection still matches full path tags.
      threadValue.endsWith(` > ${value}`) ||
      threadValue.split(' > ').includes(value),
  )
}

export function filterForumThreads(
  threads: NetworkForumThread[],
  filters: ForumFiltersState,
): NetworkForumThread[] {
  if (!forumFiltersActive(filters)) return threads

  const hasSubField = filters.subField.length > 0

  return threads.filter((thread) => {
    const f = thread.filters
    if (!f) return false

    // Fields taxonomy is the primary browse control — when a Fields
    // category is selected, match on that path (and commercial field).
    if (hasSubField) {
      return (
        matchesFacet(filters.field, f.field) &&
        matchesSubField(filters.subField, f.subField)
      )
    }

    return (
      matchesFacet(filters.psp, f.psp ?? f.role) &&
      matchesFacet(filters.field, f.field) &&
      matchesFacet(filters.priceBand, f.priceDemography) &&
      matchesFacet(filters.representation, f.representation) &&
      matchesFacet(filters.condition, f.condition) &&
      matchesFacet(filters.deedLienNote, f.deedLienNote) &&
      matchesFacet(filters.ownership, f.ownership) &&
      matchesFacet(filters.tools, f.tools) &&
      matchesFacet(filters.language, f.language) &&
      matchesFacet(filters.motive, f.motives)
    )
  })
}
