import { STOCK } from '@/features/network/data/members'
import {
  CURRENT_MEMBER_GROUP_PREFS,
  type GroupFiltersState,
  type GroupSortId,
} from '@/features/network/data/groupCategories'
import type { GroupMembership, NetworkGroup } from '@/features/network/data/types'

const DAY = 24 * 60 * 60 * 1000
const NOW = Date.UTC(2026, 8, 28, 12, 0, 0)

function ms(daysAgo: number) {
  return NOW - daysAgo * DAY
}

function memberships(
  entries: Array<{
    memberId: string
    role?: GroupMembership['role']
    status?: GroupMembership['status']
    joinedDaysAgo: number
  }>,
): GroupMembership[] {
  return entries.map((entry) => ({
    memberId: entry.memberId,
    role: entry.role ?? 'member',
    status: entry.status ?? 'active',
    joinedAt: ms(entry.joinedDaysAgo),
  }))
}

function withDerived(group: Omit<NetworkGroup, 'memberIds' | 'members'> & { members?: number }): NetworkGroup {
  const active = group.memberships.filter((m) => m.status === 'active')
  return {
    ...group,
    memberIds: active.map((m) => m.memberId),
    members: group.members ?? active.length,
  }
}

export const NETWORK_GROUPS: NetworkGroup[] = [
  withDerived({
    id: 'g-dealdesk',
    name: 'Central Valley Deal Desk',
    cover: STOCK.tower,
    privacy: 'Private',
    category: 'Off-market',
    description:
      'Quiet room for OM shares, partner asks, and capital stacks. No public blasting — vouch for guests.',
    about:
      'A vetted circle for off-market multifamily and mixed-use. Members share under NDA norms, introduce partners carefully, and keep public blasting out of the room.',
    lastActive: '4m ago',
    lastActiveAt: ms(0.003),
    createdAt: ms(420),
    industry: 'Real Estate',
    professionalRole: 'Investors',
    geography: 'Central Valley',
    strategy: 'Fundraising',
    interest: 'Investing',
    tags: ['Off-market', 'Capital', 'Multifamily'],
    rules: [
      'No public blasting of confidential OM materials.',
      'Vouch for any guest before inviting.',
      'Be clear about your role: buyer, broker, or capital.',
      'No solicitation spam — value first.',
    ],
    memberships: memberships([
      { memberId: 'maya', role: 'owner', joinedDaysAgo: 400 },
      { memberId: 'james', role: 'admin', joinedDaysAgo: 380 },
      { memberId: 'david', role: 'moderator', joinedDaysAgo: 300 },
      { memberId: 'nina', joinedDaysAgo: 200 },
      { memberId: 'amara', joinedDaysAgo: 120 },
      { memberId: 'rigo', role: 'admin', joinedDaysAgo: 45 },
    ]),
    members: 1840,
  }),
  withDerived({
    id: 'g-gc',
    name: 'Valley GC Roundtable',
    cover: STOCK.build,
    privacy: 'Public',
    category: 'Trades',
    description: 'Crew availability, material pricing, and who can actually start this month.',
    about:
      'General contractors, supers, and investors coordinating real capacity — not brochure timelines. Share crew availability, material pricing, and start windows.',
    lastActive: '22m ago',
    lastActiveAt: ms(0.015),
    createdAt: ms(360),
    industry: 'Real Estate',
    professionalRole: 'Developers',
    geography: 'Fresno',
    strategy: 'Scaling',
    interest: 'Operations',
    tags: ['GC', 'Trades', 'Scheduling'],
    rules: [
      'Post real availability and realistic start dates.',
      'No bid-shopping without disclosure.',
      'Treat crew and vendor contacts with respect.',
    ],
    memberships: memberships([
      { memberId: 'noah', role: 'owner', joinedDaysAgo: 350 },
      { memberId: 'carlos', role: 'admin', joinedDaysAgo: 310 },
      { memberId: 'chris', role: 'moderator', joinedDaysAgo: 280 },
      { memberId: 'david', joinedDaysAgo: 90 },
    ]),
    members: 612,
  }),
  withDerived({
    id: 'g-lenders',
    name: 'DSCR & Private Lenders',
    cover: STOCK.desk,
    privacy: 'Private',
    category: 'Capital',
    description: 'Rate reality, not brochures. Brokers and capital partners who close files.',
    about:
      'Private lenders, DSCR brokers, and capital partners who price to close. Rate sheets stay honest; paint-by-numbers term sheets stay outside.',
    lastActive: '1h ago',
    lastActiveAt: ms(0.04),
    createdAt: ms(500),
    industry: 'Fintech',
    professionalRole: 'Investors',
    geography: 'Central Valley',
    strategy: 'Fundraising',
    interest: 'Investing',
    tags: ['DSCR', 'Private credit', 'Brokers'],
    rules: [
      'Share current rate reality — no vanity sheets.',
      'Disclose conflicts when representing both sides.',
      'Membership requests are reviewed by admins.',
    ],
    memberships: memberships([
      { memberId: 'jordan', role: 'owner', joinedDaysAgo: 480 },
      { memberId: 'james', role: 'admin', joinedDaysAgo: 450 },
      { memberId: 'maya', role: 'moderator', joinedDaysAgo: 400 },
      { memberId: 'rigo', status: 'pending', joinedDaysAgo: 2 },
    ]),
    members: 908,
  }),
  withDerived({
    id: 'g-multifamily',
    name: 'Fresno Multifamily Operators',
    cover: STOCK.condos,
    privacy: 'Public',
    category: 'Operators',
    description: 'Occupancy, vendors, insurance, and the unglamorous work that makes deals work.',
    about:
      'Operators comparing occupancy, vendor lists, insurance renewals, and the day-to-day work that keeps multifamily cash-flowing.',
    lastActive: '3h ago',
    lastActiveAt: ms(0.12),
    createdAt: ms(280),
    industry: 'Real Estate',
    professionalRole: 'CEOs',
    geography: 'Fresno',
    strategy: 'Growth',
    interest: 'Operations',
    tags: ['Multifamily', 'Ops', 'Vendors'],
    rules: [
      'Share what worked — and what failed — with enough detail to help.',
      'No personal attacks on vendors; critique the work.',
      'Keep tenant PII out of posts.',
    ],
    memberships: memberships([
      { memberId: 'amara', role: 'owner', joinedDaysAgo: 270 },
      { memberId: 'ryan', role: 'admin', joinedDaysAgo: 250 },
      { memberId: 'aisha', role: 'moderator', joinedDaysAgo: 200 },
      { memberId: 'sarah', joinedDaysAgo: 60 },
    ]),
    members: 1244,
  }),
  withDerived({
    id: 'g-design',
    name: 'Design that Sells',
    cover: STOCK.interior,
    privacy: 'Public',
    category: 'Creative',
    description: 'Staging, photography, and finish palettes with a return attached.',
    about:
      'Designers, stagers, and marketers who treat finishes as absorption speed — light, hardware, and palettes that photograph and sell.',
    lastActive: '6h ago',
    lastActiveAt: ms(0.25),
    createdAt: ms(190),
    industry: 'Real Estate',
    professionalRole: 'Marketers',
    geography: 'Central Valley',
    strategy: 'Customer Acquisition',
    interest: 'Design',
    tags: ['Staging', 'Photography', 'Finishes'],
    rules: [
      'Show before/after when possible.',
      'Credit photographers and trades.',
      'Keep critiques constructive.',
    ],
    memberships: memberships([
      { memberId: 'elena', role: 'owner', joinedDaysAgo: 180 },
      { memberId: 'leah', role: 'admin', joinedDaysAgo: 160 },
      { memberId: 'aisha', joinedDaysAgo: 40 },
    ]),
    members: 430,
  }),
  withDerived({
    id: 'g-breakfast',
    name: 'Thursday Investor Breakfast',
    cover: STOCK.meeting,
    privacy: 'Private',
    category: 'Events',
    description: 'The in-person circle. First-timers need a member voucher.',
    about:
      'In-person breakfast for Central Valley investors. Two files, intros, coffee — first-timers need a member voucher.',
    lastActive: '1d ago',
    lastActiveAt: ms(1),
    createdAt: ms(600),
    industry: 'Real Estate',
    professionalRole: 'Investors',
    geography: 'Fresno',
    strategy: 'Growth',
    interest: 'Investing',
    tags: ['In-person', 'Networking', 'Breakfast'],
    rules: [
      'No hard pitches at the table.',
      'First-timers need a vouching member.',
      'RSVP honestly — seats are limited.',
    ],
    memberships: memberships([
      { memberId: 'chris', role: 'owner', joinedDaysAgo: 580 },
      { memberId: 'marcus', role: 'admin', joinedDaysAgo: 500 },
      { memberId: 'olivia', role: 'moderator', joinedDaysAgo: 420 },
      { memberId: 'nina', joinedDaysAgo: 100 },
    ]),
    members: 276,
  }),
  withDerived({
    id: 'g-saas-pk',
    name: 'SaaS Founders Pakistan',
    cover: STOCK.office,
    privacy: 'Public',
    category: 'SaaS',
    description: 'Community for founders building and scaling SaaS businesses.',
    about:
      'Founders across Pakistan building B2B and consumer SaaS — product, GTM, fundraising, and hiring peers who have shipped.',
    lastActive: '12m ago',
    lastActiveAt: ms(0.008),
    createdAt: ms(95),
    industry: 'SaaS',
    professionalRole: 'Founders',
    geography: 'Pakistan',
    strategy: 'Scaling',
    interest: 'Startups',
    tags: ['SaaS', 'Founders', 'Pakistan'],
    rules: [
      'Share lessons, not only announcements.',
      'No cold recruiting spam.',
      'Be specific about stage and metric when asking for advice.',
    ],
    memberships: memberships([
      { memberId: 'nina', role: 'owner', joinedDaysAgo: 90 },
      { memberId: 'jordan', role: 'admin', joinedDaysAgo: 70 },
      { memberId: 'olivia', role: 'moderator', joinedDaysAgo: 50 },
      { memberId: 'marcus', joinedDaysAgo: 20 },
      { memberId: 'sarah', joinedDaysAgo: 8 },
    ]),
    members: 1240,
  }),
  withDerived({
    id: 'g-ai-lahore',
    name: 'AI Builders Lahore',
    cover: STOCK.glass,
    privacy: 'Public',
    category: 'AI',
    description: 'Engineers and PMs shipping AI products from Lahore to global markets.',
    about:
      'Product managers and developers in Lahore collaborating on applied AI — models, UX, and go-to-market for international customers.',
    lastActive: '45m ago',
    lastActiveAt: ms(0.03),
    createdAt: ms(60),
    industry: 'AI',
    professionalRole: 'Product Managers',
    geography: 'Lahore',
    strategy: 'International Expansion',
    interest: 'Technology',
    tags: ['AI', 'Product', 'Lahore'],
    rules: [
      'Keep demos reproducible when possible.',
      'Respect IP — no leaking client data.',
      'Welcome beginners; gatekeeping stays out.',
    ],
    memberships: memberships([
      { memberId: 'elena', role: 'owner', joinedDaysAgo: 55 },
      { memberId: 'noah', role: 'moderator', joinedDaysAgo: 40 },
      { memberId: 'leah', joinedDaysAgo: 15 },
    ]),
    members: 860,
  }),
  withDerived({
    id: 'g-fintech-dubai',
    name: 'Fintech Operators Dubai',
    cover: STOCK.shake,
    privacy: 'Private',
    category: 'Fintech',
    description: 'Payments, lending, and compliance operators scaling across the GCC.',
    about:
      'Operators and founders in Dubai focused on payments, lending rails, and regulatory reality across the GCC.',
    lastActive: '2h ago',
    lastActiveAt: ms(0.08),
    createdAt: ms(140),
    industry: 'Fintech',
    professionalRole: 'CEOs',
    geography: 'Dubai',
    strategy: 'International Expansion',
    interest: 'Entrepreneurship',
    tags: ['Fintech', 'GCC', 'Compliance'],
    rules: [
      'No unlicensed product claims.',
      'Requests reviewed by moderators.',
      'Keep competitor digs factual.',
    ],
    memberships: memberships([
      { memberId: 'james', role: 'owner', joinedDaysAgo: 130 },
      { memberId: 'maya', role: 'admin', joinedDaysAgo: 110 },
      { memberId: 'jordan', joinedDaysAgo: 30 },
    ]),
    members: 540,
  }),
  withDerived({
    id: 'g-growth-uk',
    name: 'Growth Marketers UK',
    cover: STOCK.cottage,
    privacy: 'Public',
    category: 'Growth',
    description: 'Performance marketers sharing acquisition playbooks that still work.',
    about:
      'UK-based marketers exchanging customer acquisition experiments — paid, organic, and partnership channels with real CAC numbers.',
    lastActive: '5h ago',
    lastActiveAt: ms(0.2),
    createdAt: ms(220),
    industry: 'E-commerce',
    professionalRole: 'Marketers',
    geography: 'UK',
    strategy: 'Customer Acquisition',
    interest: 'Entrepreneurship',
    tags: ['Growth', 'CAC', 'UK'],
    rules: [
      'Share numbers when you ask for feedback.',
      'No affiliate dump links.',
      'Credit original frameworks.',
    ],
    memberships: memberships([
      { memberId: 'olivia', role: 'owner', joinedDaysAgo: 210 },
      { memberId: 'aisha', role: 'admin', joinedDaysAgo: 180 },
      { memberId: 'leah', role: 'moderator', joinedDaysAgo: 90 },
      { memberId: 'chris', joinedDaysAgo: 12 },
    ]),
    members: 980,
  }),
]

export function getSeedGroup(id: string) {
  return NETWORK_GROUPS.find((group) => group.id === id)
}

/** @deprecated Prefer useNetworkGroups().getGroup — kept for static callers. */
export function getGroup(id: string) {
  return getSeedGroup(id)
}

export function syncGroupDerived(group: NetworkGroup): NetworkGroup {
  const active = group.memberships.filter((m) => m.status === 'active' && !group.archived)
  return {
    ...group,
    memberIds: active.map((m) => m.memberId),
    members: Math.max(group.members, active.length),
  }
}

function textHaystack(group: NetworkGroup) {
  return [
    group.name,
    group.description,
    group.about,
    group.category,
    group.industry,
    group.professionalRole,
    group.geography,
    group.strategy,
    group.interest,
    ...group.tags,
  ]
    .join(' ')
    .toLowerCase()
}

export function filterGroups(groups: NetworkGroup[], filters: GroupFiltersState) {
  const tokens = filters.query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  return groups.filter((group) => {
    if (group.archived) return false
    const haystack = textHaystack(group)
    if (tokens.length > 0 && !tokens.every((token) => haystack.includes(token))) return false
    if (filters.industry && group.industry !== filters.industry) return false
    if (filters.professionalRole && group.professionalRole !== filters.professionalRole) {
      return false
    }
    if (filters.geography && group.geography !== filters.geography) return false
    if (filters.strategy && group.strategy !== filters.strategy) return false
    if (filters.interest && group.interest !== filters.interest) return false
    return true
  })
}

function myJoinedAt(group: NetworkGroup, memberId: string) {
  return group.memberships.find((m) => m.memberId === memberId && m.status === 'active')?.joinedAt
}

export function sortGroups(
  groups: NetworkGroup[],
  sort: GroupSortId,
  memberId?: string,
): NetworkGroup[] {
  const list = [...groups]
  switch (sort) {
    case 'most-members':
      return list.sort((a, b) => b.members - a.members || a.name.localeCompare(b.name))
    case 'recently-created':
      return list.sort((a, b) => b.createdAt - a.createdAt || a.name.localeCompare(b.name))
    case 'recently-active':
      return list.sort((a, b) => b.lastActiveAt - a.lastActiveAt || a.name.localeCompare(b.name))
    case 'latest-joined':
      return list.sort((a, b) => {
        // Prefer your own join time when present; otherwise most recent member join.
        const aJoin = (memberId && myJoinedAt(a, memberId)) || maxJoined(a)
        const bJoin = (memberId && myJoinedAt(b, memberId)) || maxJoined(b)
        return bJoin - aJoin || a.name.localeCompare(b.name)
      })
    case 'earliest-joined':
      return list.sort((a, b) => {
        const aJoin = (memberId && myJoinedAt(a, memberId)) || minJoined(a)
        const bJoin = (memberId && myJoinedAt(b, memberId)) || minJoined(b)
        return aJoin - bJoin || a.name.localeCompare(b.name)
      })
    default:
      return list
  }
}

function maxJoined(group: NetworkGroup) {
  return Math.max(...group.memberships.map((m) => m.joinedAt), group.createdAt)
}

function minJoined(group: NetworkGroup) {
  return Math.min(...group.memberships.map((m) => m.joinedAt), group.createdAt)
}

export function scoreGroupRecommendation(group: NetworkGroup, joinedIds: Set<string>) {
  if (joinedIds.has(group.id) || group.archived) return -1
  const prefs = CURRENT_MEMBER_GROUP_PREFS
  let score = 0
  if (group.industry === prefs.industry) score += 4
  if (group.professionalRole === prefs.professionalRole) score += 3
  if (group.geography === prefs.geography) score += 3
  if (prefs.interests.includes(group.interest)) score += 2
  if (prefs.strategies.includes(group.strategy)) score += 2
  if (group.tags.some((tag) => prefs.interests.includes(tag))) score += 1
  // Slight boost for public groups that are easy to join
  if (group.privacy === 'Public') score += 0.5
  return score
}

export function recommendGroups(groups: NetworkGroup[], joinedIds: Set<string>, limit = 4) {
  return [...groups]
    .map((group) => ({ group, score: scoreGroupRecommendation(group, joinedIds) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || b.group.members - a.group.members)
    .slice(0, limit)
    .map((row) => row.group)
}

export function roleLabel(role: GroupMembership['role']) {
  switch (role) {
    case 'owner':
      return 'Owner'
    case 'admin':
      return 'Admin'
    case 'moderator':
      return 'Moderator'
    default:
      return 'Member'
  }
}

export function canManageGroup(role: GroupMembership['role'] | null | undefined) {
  return role === 'owner' || role === 'admin'
}

export function canModerateGroup(role: GroupMembership['role'] | null | undefined) {
  return role === 'owner' || role === 'admin' || role === 'moderator'
}
