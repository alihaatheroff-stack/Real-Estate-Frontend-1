export type ClientHireBenefit = {
  title: string
  description: string
  image: string
}

export type ClientHireAward = {
  title: string
  subtitle: string
}

export type ClientHireCriterion = {
  label: string
  example: string
}

export type ClientHireNetworkLink = {
  title: string
  description: string
  href: string
}

export type ClientHirePendingItem = {
  title: string
  detail: string
}

export const CLIENT_HIRE_HERO_IMAGE = '/images/hire/hero.jpg'
export const CLIENT_HIRE_VERIFIED_IMAGE = '/images/hire/verified.jpg'
export const CLIENT_HIRE_EDUCATION_IMAGE = '/images/hire/education.jpg'
export const CLIENT_HIRE_TOOLS_IMAGE = '/images/hire/measure-tools.jpg'
export const CLIENT_HIRE_PAYMENT_IMAGE = '/images/hire/payment-packets.jpg'
export const CLIENT_HIRE_SIDE_IMAGE = '/images/hire/site.jpg'
export const CLIENT_HIRE_INTERIOR_IMAGE = '/images/hire/interior.jpg'
export const CLIENT_HIRE_NETWORK_IMAGE = '/images/hire/education.jpg'

export const CLIENT_HIRE_CRITERIA: readonly ClientHireCriterion[] = [
  {
    label: 'Client Representation',
    example: 'Ex. (Selling, Leasing, Consulting, Buying, Investment, etc.,)',
  },
  {
    label: 'Client Experience',
    example: 'Ex. (First-time, Repeat, Investment, etc.,)',
  },
  {
    label: 'Property Condition',
    example: 'Ex. (New Construction, Burned, etc.,)',
  },
  {
    label: 'Vacancy',
    example: 'Ex. (Vacant, Tenant Occupied, etc.,)',
  },
  {
    label: 'Title',
    example: 'Ex. (Sole ownership, Joint tenancy, etc.,)',
  },
  {
    label: 'Sale Type',
    example: 'Ex. (Standard, Lien, Short Sale, etc.,)',
  },
  {
    label: 'Experience Level',
    example: 'Ex (1= Low, 10=High)',
  },
  {
    label: 'Your Experience',
    example: 'Ex. (Expert, Mature, Seasonal, New)',
  },
  {
    label: "Motive's",
    example: 'Ex. (A; Have Too…, C …Wasting Time)',
  },
  {
    label: 'Languages Spoken',
    example: 'Ex. (English, Mandarin, Spanish, etc)',
  },
  {
    label: 'Percentage Share',
    example: 'Ex. (50%, 40%, 30%, 20%, Zilch)',
  },
  {
    label: 'Form Of Payment',
    example: 'Ex. (Cash, Card, Finance, etc)',
  },
  {
    label: 'Price Demography',
    example: 'Ex. (Luxury, Mid, Economic)',
  },
  {
    label: 'Zipcode',
    example: 'Enter service zipcode',
  },
  {
    label: 'Mile Radius',
    example: 'Search distance from zipcode',
  },
]

export const CLIENT_HIRE_BENEFITS: ClientHireBenefit[] = [
  {
    title: 'Local & Remote',
    description:
      'Find professionals nearby or from nearly everywhere in the World Internationally.',
    image: '/images/hire/local-remote.jpg',
  },
  {
    title: 'Fast Response',
    description:
      'Most professionals respond within 24 hours with detailed proposals.',
    image: '/images/hire/fast-response.jpg',
  },
  {
    title: 'GPS Navigation',
    description: 'Location-based search and matching.',
    image: '/images/hire/gps.jpg',
  },
  {
    title: 'Transparent Pricing',
    description:
      "See upfront costs with no hidden fees. Only pay when you're satisfied.",
    image: '/images/hire/pricing-clear.jpg',
  },
  {
    title: 'Payment Protection',
    description:
      'Your funds are held in escrow until work is completed to your satisfaction.',
    image: '/images/hire/payment-escrow.jpg',
  },
]

export const CLIENT_HIRE_MEASURE = [
  { title: 'Out-Doors', image: '/images/hire/measure-tools.jpg' },
  { title: 'In-Doors', image: '/images/hire/interior.jpg' },
] as const

export const CLIENT_PAYMENT_SAVINGS = [
  'Yearly Savings',
  'Monthly Savings',
  'Weekly Savings',
  'Daily Savings',
] as const

export const CLIENT_PAYMENT_TIERS = [
  'Basic Tier',
  'Standard Tier',
  'Advanced Tier',
  'Lux Tier',
] as const

export const CLIENT_PAYMENT_TERMS = [
  'Before Service',
  'Half Now Half After Service',
  'After Service',
] as const

/** @deprecated Prefer CLIENT_PAYMENT_SAVINGS */
export const CLIENT_PAYMENT_PACKETS = CLIENT_PAYMENT_SAVINGS

/** @deprecated Prefer CLIENT_PAYMENT_TIERS / CLIENT_PAYMENT_TERMS */
export const CLIENT_PAYMENT_META = ['Tier Selection', 'Payment Terms'] as const

export const CLIENT_REAL_ESTATE_TOOLS = [
  'Measure',
  'Out-Doors',
  'In-Doors',
] as const

export const CLIENT_EDUCATION_LINKS = [
  'Articles',
  'Forums',
  'Groups',
  "Soon: With Consent Pre-Recorded Convo's",
] as const

export const CLIENT_TRUST_POINTS = [
  "Check for this to verify your provider went through LCRE's rigorous verification process.",
  'Background checks ensuring right quality and reliability.',
  "JN's vetted network of top-rated real estate professionals ready to help you succeed.",
  'Pre-vetted experts with tracked performance metrics.',
  'Earn rewards and get trained as you refer.',
] as const

export const CLIENT_HIRE_AWARDS: ClientHireAward[] = [
  { title: 'Best Real Estate Platform', subtitle: 'Industry Report' },
  { title: 'Fastest Growing Marketplace', subtitle: 'Industry Report' },
  { title: 'Most Trusted by Professionals', subtitle: 'Customer Choice' },
  { title: 'Excellence in Service', subtitle: 'Business Excellence' },
]

export const CLIENT_HIRE_NETWORK_LINKS: readonly ClientHireNetworkLink[] = [
  {
    title: 'Newsfeed',
    description:
      'Stay signed in. Open your network feed — posts, conversations, and deal-oriented updates from RE Network members.',
    href: '/network/feed',
  },
  {
    title: 'Articles & blogs',
    description:
      'Long-form insights, case studies, and market takes from people in the field.',
    href: '/network/articles',
  },
  {
    title: "Forum's",
    description:
      'Threaded discussions on strategy, markets, and execution—not scattered group chaos.',
    href: '/network/forums',
  },
  {
    title: "Group's",
    description:
      'Find your tribe by strategy, geography, or role. Filter by latest joined, earliest joined, or search by name.',
    href: '/network/groups',
  },
]

export const CLIENT_HIRE_NETWORK_CHANNELS = [
  'Micro-communities.',
  'Masterminds,',
  'Think tanks,',
] as const

export const CLIENT_HIRE_PENDING_ITEMS: readonly ClientHirePendingItem[] = [
  {
    title: 'Q and A\'s after login',
    detail:
      'Previously viewed (Fiverr-style), or route to dashboard — still pending.',
  },
  {
    title: 'Shared customer / PSP info',
    detail:
      "Will customers share the same info of PSP's across hire surfaces?",
  },
  {
    title: 'Other customer / client hire pages',
    detail:
      'Service results, service dedicated page, profile results, profile dedicated page, office results, office dedicated page.',
  },
  {
    title: 'Profile & education',
    detail: 'Education. Live unscripted videos. Events. Settings. Dashboard.',
  },
]

export const CLIENT_HIRE_GAP_SUGGESTIONS: readonly string[] = [
  'Interactive filter UI wired to these criteria (zipcode + mile radius search submit).',
  'Reviews / ratings strip and sample proposals before hire.',
  'Escrow dispute / refund policy and insurance / bonding callouts.',
  'Scheduling / availability calendar CTA after match.',
  'Clear path from Listing Services / Profile Specialty / Office Specialty into results pages.',
  'Cancelation terms and who pays percentage share on completed jobs.',
]

export const CLIENT_HIRE_TAGLINE =
  'Quality work and comparative pricing — hire verified providers with escrow protection, GPS matching, and clear upfront costs.'
