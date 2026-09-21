import type { NetworkForumReply, NetworkForumThread } from '@/features/network/data/types'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR
const now = Date.UTC(2026, 8, 21, 12, 0, 0)

export const NETWORK_FORUMS: NetworkForumThread[] = [
  {
    id: 'f1',
    title: 'What cap rate are you actually underwriting grocery-adjacent retail at right now?',
    category: 'Markets',
    replies: 4,
    views: 1280,
    lastPost: '12m ago',
    lastPostAt: now - 12 * 60 * 1000,
    authorId: 'maya',
    likes: 28,
    recommended: true,
    excerpt: 'I keep seeing 6.2 on broker decks and 7.4 in real LOIs. What’s clearing in the Valley?',
    body: 'Broker decks in my inbox are still printing 6-caps on grocery-adjacent retail as if 2021 never ended. Live conversations are closer to 7.25–7.75 depending on tenant credit and roof age. If you’ve closed in the last 90 days, drop the real number — strategy, not theater.',
    filters: {
      community: 'County',
      role: 'Agent',
      field: 'Commercial',
      subField: 'Retail > Strip Mall',
      language: 'English',
      priceDemography: 'Mid High',
      condition: "Passe's Inspection",
      representation: 'Selling',
      deedLienNote: 'Deed Or Note Remaining.',
      ownership: 'Corporate',
      tools: 'CRM',
      motives: 'A. Have too',
    },
  },
  {
    id: 'f2',
    title: 'DSCR gotcha list for 2–4 units in Fresno County',
    category: 'Lending',
    replies: 3,
    views: 640,
    lastPost: '41m ago',
    lastPostAt: now - 41 * 60 * 1000,
    authorId: 'jordan',
    likes: 15,
    excerpt: 'Insurance, short-term rental income, and how underwriters treat accessory units.',
    body: 'Three files died last month for the same reasons: landlord insurance quotes 40% higher than the pro forma, STR income ignored unless it has 12 months of statements, and ADUs counted as rooms not units. Let’s keep a living list so new members don’t learn this the expensive way.',
    filters: {
      community: 'City',
      role: 'Broker',
      field: 'Commercial',
      subField: 'Living Complex > Apartment',
      language: 'English',
      priceDemography: 'Mid Mid',
      condition: 'TLC',
      representation: 'Buy',
      deedLienNote: 'Lien',
      ownership: 'Mom And Pop',
      tools: 'Software',
      motives: 'B. Eventually ',
    },
  },
  {
    id: 'f3',
    title: 'Heavy rehab: cost-plus vs bid when lumber is moving weekly',
    category: 'Execution',
    replies: 3,
    views: 890,
    lastPost: '2h ago',
    lastPostAt: now - 2 * HOUR,
    authorId: 'noah',
    likes: 22,
    pinned: true,
    excerpt: 'When do you lock a bid, and when is cost-plus the only honest structure?',
    body: 'If the scope is walls-open, I won’t bid it tight. Investors still want a number. How are you structuring draws so nobody feels cheated when a panel or a slab surprises you?',
    filters: {
      community: 'State',
      role: 'Contractor',
      field: 'Commercial',
      subField: "Extra's > Office",
      language: 'Spanish',
      priceDemography: 'Mid Low',
      condition: 'Run-Down',
      representation: 'Retainer Consulting',
      deedLienNote: 'Free And Clear',
      ownership: 'JV',
      tools: "App's",
      motives: 'C. Undecisive',
    },
  },
  {
    id: 'f4',
    title: 'Anonymous: how do you verify a “private lender” who appeared in the feed?',
    category: 'Trust',
    replies: 5,
    views: 2104,
    lastPost: '5h ago',
    lastPostAt: now - 5 * HOUR,
    authorId: 'nina',
    likes: 61,
    recommended: true,
    excerpt: 'State ID, proof of funds, and the difference between a closer and a talker.',
    body: 'The product promise here is deals — which means verification. Share the checks you run before you send an OM or wire instructions. Community content is user-generated; treat counterparties like you would anywhere else.',
    filters: {
      community: 'Zip',
      role: 'Investor',
      field: 'Commercial',
      subField: 'Care > Senior Living',
      language: 'English',
      priceDemography: 'Luxury',
      condition: 'New Construction',
      representation: 'Referral Agent',
      deedLienNote: 'REO',
      ownership: 'REIT',
      tools: "Book's",
      motives: 'D. Wasting Time',
    },
  },
  {
    id: 'f5',
    title: 'Hospitality / recreational: what comps are you using for indoor parks?',
    category: 'Crowdfunding',
    replies: 2,
    views: 330,
    lastPost: '1d ago',
    lastPostAt: now - DAY,
    authorId: 'olivia',
    likes: 9,
    excerpt: 'Attendance, membership, and how to talk to investors who only speak doors and units.',
    body: 'If you only underwrite doors, recreational assets look like toys. Let’s translate attendance and membership into a language multifamily people will fund.',
    filters: {
      community: 'County',
      role: 'Agent',
      field: 'Commercial',
      subField: 'Recreational > Trampoline Park',
      language: 'English',
      priceDemography: 'Economic',
      condition: 'Burned',
      representation: 'Lease-Rental',
      deedLienNote: 'Auction',
      ownership: 'Crowdfunding',
      tools: 'Shop',
      motives: 'A. Have too',
    },
  },
  {
    id: 'f6',
    title: 'Why recreational crowdfunding is crucial for lifestyle health assets',
    category: 'Crowdfunding',
    replies: 6,
    views: 4020,
    lastPost: '8m ago',
    lastPostAt: now - 8 * 60 * 1000,
    authorId: 'olivia',
    likes: 94,
    recommended: true,
    winner: true,
    pinned: true,
    excerpt: 'Gyms, clinics, and pet-care pads need a different raise story than doors-and-units investors expect.',
    body: 'Recreational and lifestyle assets clear when you speak attendance, membership, and care utilization — not unit count. Share how you framed health clinics and gyms for crowdfunding partners who only knew multifamily.',
    filters: {
      community: 'County',
      role: 'Agent',
      field: 'Commercial',
      subField: 'Lifestyle > Health > Clinic',
      language: 'Italiano',
      priceDemography: 'Mid High',
      condition: "Passe's Inspection",
      representation: 'Sell-To-Buy',
      deedLienNote: 'Pre-Foreclosure.',
      ownership: 'Franchisee',
      tools: 'CRM',
      motives: 'B. Eventually ',
    },
  },
  {
    id: 'f7',
    title: 'Strip mall anchors: who is actually renewing in secondary California markets?',
    category: 'Markets',
    replies: 3,
    views: 512,
    lastPost: '3h ago',
    lastPostAt: now - 3 * HOUR,
    authorId: 'james',
    likes: 11,
    excerpt: 'National credit is soft. Local operators with two boxes are outbidding funds — curious if that’s your book too.',
    body: 'I’m seeing renewals at flat or slight bumps when the tenant is a regional grocer. National soft-goods are asking for kickouts. Drop your last three renewals (city + rent/sf) so we can map the Valley honestly.',
    filters: {
      community: 'County',
      role: 'Broker',
      field: 'Commercial',
      subField: 'Retail > Anchor',
      language: 'English',
      priceDemography: 'Mid Mid',
      condition: "Passe's Inspection",
      representation: 'Selling',
      deedLienNote: 'Free And Clear',
      ownership: 'Corporate',
      tools: 'Software',
      motives: 'A. Have too',
    },
  },
  {
    id: 'f8',
    title: "Single's stock: micro-units and capsule models — investor appetite or novelty?",
    category: 'Product',
    replies: 2,
    views: 218,
    lastPost: '6h ago',
    lastPostAt: now - 6 * HOUR,
    authorId: 'amara',
    likes: 7,
    excerpt: 'Japan-style capsules keep showing up in pitch decks. Who has closed one?',
    body: 'I’m underwriting a studio/capsule hybrid near a campus. Lenders want residential comps; operators want hospitality ADR. Has anyone closed a Japan Capsule or Room’s product with conventional debt?',
    filters: {
      community: 'City',
      role: 'Investor',
      field: 'Commercial',
      subField: "Single's > Japan Capsule's",
      language: 'English',
      priceDemography: 'Economic',
      condition: 'New Construction',
      representation: 'Buy',
      deedLienNote: 'Deed Or Note Remaining.',
      ownership: 'Crowdfunding',
      tools: "App's",
      motives: 'C. Undecisive',
    },
  },
]

export const FORUM_REPLIES: NetworkForumReply[] = [
  {
    id: 'r1-1',
    threadId: 'f1',
    authorId: 'james',
    body: 'Closed two strip groceries outside Fresno at 7.4 and 7.55. Roof credits ate 40bps of “broker math.”',
    createdAt: '10m ago',
    createdAtMs: now - 10 * 60 * 1000,
    likes: 12,
  },
  {
    id: 'r1-2',
    threadId: 'f1',
    authorId: 'david',
    body: 'If the tenant has 3+ years left and co-tenancy is clean, I’m still at mid-7s. Anything below that needs a story.',
    createdAt: '8m ago',
    createdAtMs: now - 8 * 60 * 1000,
    likes: 5,
  },
  {
    id: 'r1-3',
    threadId: 'f1',
    authorId: 'nina',
    body: 'Watch CAM reconciliations. Two of my “7-cap” files were really 7.9 after true-ups.',
    createdAt: '5m ago',
    createdAtMs: now - 5 * 60 * 1000,
    likes: 9,
    parentId: 'r1-1',
  },
  {
    id: 'r1-4',
    threadId: 'f1',
    authorId: 'rigo',
    body: 'Thanks — I’ll post an anonymized table of last-90-day clears later today.',
    createdAt: '2m ago',
    createdAtMs: now - 2 * 60 * 1000,
    likes: 2,
  },
  {
    id: 'r2-1',
    threadId: 'f2',
    authorId: 'maya',
    body: 'Add: flood certificates and old panel swaps. Underwriters are killing files on electrical.',
    createdAt: '35m ago',
    createdAtMs: now - 35 * 60 * 1000,
    likes: 8,
  },
  {
    id: 'r2-2',
    threadId: 'f2',
    authorId: 'chris',
    body: 'STR income: we need 12 months of platform statements OR they haircut 50%. No exceptions lately.',
    createdAt: '30m ago',
    createdAtMs: now - 30 * 60 * 1000,
    likes: 14,
  },
  {
    id: 'r2-3',
    threadId: 'f2',
    authorId: 'jordan',
    body: 'Pinned that. I’ll keep the list updated as people add gotchas.',
    createdAt: '20m ago',
    createdAtMs: now - 20 * 60 * 1000,
    likes: 3,
  },
  {
    id: 'r3-1',
    threadId: 'f3',
    authorId: 'carlos',
    body: 'Cost-plus with a not-to-exceed and weekly material indexes. Bids only when scope is sealed.',
    createdAt: '90m ago',
    createdAtMs: now - 90 * 60 * 1000,
    likes: 11,
  },
  {
    id: 'r3-2',
    threadId: 'f3',
    authorId: 'noah',
    body: 'Exactly — investors hate open-ended, GCs hate fixed on walls-open. Structure is the product.',
    createdAt: '80m ago',
    createdAtMs: now - 80 * 60 * 1000,
    likes: 6,
  },
  {
    id: 'r3-3',
    threadId: 'f3',
    authorId: 'david',
    body: 'We hold 10% contingency in a joint account. Draws need photos + invoice. Cuts the drama.',
    createdAt: '70m ago',
    createdAtMs: now - 70 * 60 * 1000,
    likes: 7,
  },
  {
    id: 'r4-1',
    threadId: 'f4',
    authorId: 'james',
    body: 'Video call with government ID, escrow officer intros, and never wire from chat links.',
    createdAt: '4h ago',
    createdAtMs: now - 4 * HOUR,
    likes: 22,
  },
  {
    id: 'r4-2',
    threadId: 'f4',
    authorId: 'olivia',
    body: 'Ask for a closed-file reference from another member. Talkers vanish; closers have receipts.',
    createdAt: '3h ago',
    createdAtMs: now - 3 * HOUR,
    likes: 18,
  },
  {
    id: 'r4-3',
    threadId: 'f4',
    authorId: 'nina',
    body: 'Also: proof of funds that matches the buy box, dated within 30 days.',
    createdAt: '2h ago',
    createdAtMs: now - 2 * HOUR,
    likes: 10,
  },
  {
    id: 'r4-4',
    threadId: 'f4',
    authorId: 'amara',
    body: 'If they refuse a notary-facing intro, walk. Every time.',
    createdAt: '90m ago',
    createdAtMs: now - 90 * 60 * 1000,
    likes: 15,
    parentId: 'r4-1',
  },
  {
    id: 'r4-5',
    threadId: 'f4',
    authorId: 'rigo',
    body: 'Saving this thread — should be required reading for new members.',
    createdAt: '60m ago',
    createdAtMs: now - HOUR,
    likes: 4,
  },
  {
    id: 'r5-1',
    threadId: 'f5',
    authorId: 'maya',
    body: 'We use attendance × membership ARPU, then compare to local soft-goods retail per SF. Investors finally hear it.',
    createdAt: '20h ago',
    createdAtMs: now - 20 * HOUR,
    likes: 6,
  },
  {
    id: 'r5-2',
    threadId: 'f5',
    authorId: 'olivia',
    body: 'Add seasonality charts. Indoor parks without summer/winter splits look fake.',
    createdAt: '18h ago',
    createdAtMs: now - 18 * HOUR,
    likes: 4,
  },
  {
    id: 'r6-1',
    threadId: 'f6',
    authorId: 'james',
    body: 'This is the thread that convinced two LPs to look at clinics. Bookmarking.',
    createdAt: '6m ago',
    createdAtMs: now - 6 * 60 * 1000,
    likes: 20,
  },
  {
    id: 'r6-2',
    threadId: 'f6',
    authorId: 'nina',
    body: 'Crowdfunding narrative: utilization + waitlists > door count. Repeat it until they nod.',
    createdAt: '5m ago',
    createdAtMs: now - 5 * 60 * 1000,
    likes: 16,
  },
  {
    id: 'r6-3',
    threadId: 'f6',
    authorId: 'david',
    body: 'We raised on membership churn under 8% and a 14-month waitlist. Doors would have killed the raise.',
    createdAt: '4m ago',
    createdAtMs: now - 4 * 60 * 1000,
    likes: 11,
  },
  {
    id: 'r6-4',
    threadId: 'f6',
    authorId: 'amara',
    body: 'Pet care pads are the sleeper — same story as gyms, different comps.',
    createdAt: '3m ago',
    createdAtMs: now - 3 * 60 * 1000,
    likes: 8,
    parentId: 'r6-2',
  },
  {
    id: 'r6-5',
    threadId: 'f6',
    authorId: 'olivia',
    body: 'Winner’s circle for a reason — let’s keep examples coming.',
    createdAt: '2m ago',
    createdAtMs: now - 2 * 60 * 1000,
    likes: 5,
  },
  {
    id: 'r6-6',
    threadId: 'f6',
    authorId: 'rigo',
    body: 'Posting a one-pager template in the docs folder tonight.',
    createdAt: '1m ago',
    createdAtMs: now - 60 * 1000,
    likes: 3,
  },
  {
    id: 'r7-1',
    threadId: 'f7',
    authorId: 'maya',
    body: 'Clovis: regional grocer renewed +4%. National apparel still asking -8% or kickout.',
    createdAt: '2h ago',
    createdAtMs: now - 2 * HOUR,
    likes: 5,
  },
  {
    id: 'r7-2',
    threadId: 'f7',
    authorId: 'jordan',
    body: 'Madera boxed retail is sticky when parking is shared with QSR — weird but true.',
    createdAt: '100m ago',
    createdAtMs: now - 100 * 60 * 1000,
    likes: 3,
  },
  {
    id: 'r7-3',
    threadId: 'f7',
    authorId: 'james',
    body: 'I’ll compile renewals into a sheet if people DM anonymized rows.',
    createdAt: '90m ago',
    createdAtMs: now - 90 * 60 * 1000,
    likes: 2,
  },
  {
    id: 'r8-1',
    threadId: 'f8',
    authorId: 'olivia',
    body: 'We saw one campus-adjacent close with a mix of preferred equity + local bank. Conventional alone said no.',
    createdAt: '5h ago',
    createdAtMs: now - 5 * HOUR,
    likes: 4,
  },
  {
    id: 'r8-2',
    threadId: 'f8',
    authorId: 'amara',
    body: 'Useful — so structure first, comps second. Noted.',
    createdAt: '4h ago',
    createdAtMs: now - 4 * HOUR,
    likes: 1,
  },
]

export function getForum(id: string) {
  return NETWORK_FORUMS.find((thread) => thread.id === id)
}

export function getForumReplies(threadId: string) {
  return FORUM_REPLIES.filter((reply) => reply.threadId === threadId).sort(
    (a, b) => a.createdAtMs - b.createdAtMs,
  )
}

export type ForumSortId =
  | 'latest'
  | 'most-comments'
  | 'most-recommended'
  | 'other-suggestive'
  | 'winners'

export function sortForumThreads(
  threads: NetworkForumThread[],
  sort: ForumSortId,
): NetworkForumThread[] {
  const copy = [...threads]
  switch (sort) {
    case 'most-comments':
      return copy.sort((a, b) => b.replies - a.replies || b.lastPostAt - a.lastPostAt)
    case 'most-recommended':
      return copy.sort((a, b) => {
        const ar = a.recommended ? 1 : 0
        const br = b.recommended ? 1 : 0
        if (br !== ar) return br - ar
        return (b.likes ?? 0) - (a.likes ?? 0) || b.lastPostAt - a.lastPostAt
      })
    case 'other-suggestive':
      return copy.sort((a, b) => {
        const aHit = a.filters?.subField?.startsWith('Recreational') || a.category === 'Crowdfunding' ? 1 : 0
        const bHit = b.filters?.subField?.startsWith('Recreational') || b.category === 'Crowdfunding' ? 1 : 0
        if (bHit !== aHit) return bHit - aHit
        return b.lastPostAt - a.lastPostAt
      })
    case 'winners':
      return copy.sort((a, b) => {
        const aw = a.winner ? 1 : 0
        const bw = b.winner ? 1 : 0
        if (bw !== aw) return bw - aw
        return (b.likes ?? 0) - (a.likes ?? 0)
      })
    case 'latest':
    default:
      return copy.sort((a, b) => {
        const ap = a.pinned ? 1 : 0
        const bp = b.pinned ? 1 : 0
        if (bp !== ap) return bp - ap
        return b.lastPostAt - a.lastPostAt
      })
  }
}
