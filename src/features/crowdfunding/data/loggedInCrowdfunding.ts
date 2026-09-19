export type BenefitAudience = {
  id: string
  title: string
  points: string[]
}

export const CROWDFUNDING_INTRO = {
  headline: 'Build Legacy. Invest with Purpose.',
  body: 'Democratized investing in Christian-themed recreation and entertainment venues—where your money builds places that matter.',
} as const

export const PLEDGE_SECTION = {
  lead: 'We are pursuing Reg A+ (Tier 2) qualification—allowing us to raise up to $75 million from both accredited and non-accredited investors.',
  untilApproval: 'Until approval, join our pledge and interest list to:',
  bullets: [
    'Signal demand for faith-aligned projects',
    "Stay informed on Network's progress",
    'Be first when offerings go live',
  ],
  disclaimer:
    'Not an offer to sell securities. Participation depends on regulatory approval and offering documents.',
} as const

export const DIFFERENTIATORS = [
  {
    id: 'renovate',
    title: "Renovate forgotten temporary fail recreation's",
    text: 'Bring lasting venues back where temporary recreation fell short.',
  },
  {
    id: 'saas',
    title: "SAAS membership's",
    text: 'Membership tools that keep communities engaged beyond opening day.',
  },
  {
    id: 'jobs',
    title: 'We may be together: "JOBS Act Compliant"',
    text: 'Pursuing Reg A+ (Tier 2) for up to $75 million raises.',
  },
  {
    id: 'non-accredited',
    title: 'Non-accredited welcome',
    text: 'Invest alongside accredited investors where regulations allow.',
  },
  {
    id: 'values',
    title: 'Values-aligned',
    text: 'Projects that honor God—faith-based recreation and entertainment.',
  },
  {
    id: 'community',
    title: 'Community-driven',
    text: 'You vote on what gets built—locations, features, and direction.',
  },
  {
    id: 'transparent',
    title: 'Transparent',
    text: 'See exactly where money goes and how each venture is structured.',
  },
] as const

export const BENEFIT_AUDIENCES: BenefitAudience[] = [
  {
    id: 'client',
    title: 'Client / Customer',
    points: [
      'Early access to faith-aligned venue opportunities',
      'Vote on locations, features, and project direction',
      'Transparent updates from pledge through build',
    ],
  },
  {
    id: 'psp',
    title: "PSP's",
    points: [
      'List services tied to crowdfunded recreation builds',
      'Reach members already engaged in venue demand',
      'Grow referral pipelines around community projects',
    ],
  },
  {
    id: 'platforms',
    title: "Other platform's",
    points: [
      'Partner distribution for compliant interest capture',
      'Shared visibility into upcoming Reg A+ offerings',
      'Aligned audience without competing on speculation',
    ],
  },
  {
    id: 'post',
    title: 'Post',
    points: [
      'Share progress updates with your network',
      'Highlight pledges and community votes',
      'Keep followers informed as milestones clear',
    ],
  },
  {
    id: 'create',
    title: 'Create or list a project',
    points: [
      'Propose recreational venues for community review',
      'Gather early interest before offerings go live',
      'Structure projects with transparent funding paths',
    ],
  },
  {
    id: 'jnv',
    title: 'Jesus Network Ventures LLC (JNV)',
    points: [
      'Mission-led operator for recreation crowdfunding',
      'Compliance-first path toward Reg A+ Tier 2',
      'Stewardship of legal, build, and community milestones',
    ],
  },
]

export const BOARD_INVITE = {
  title: 'Board of Directors Invitation',
  eyebrow: 'Join the board',
  body: "Want to help shape the future? Join our Board of Directors from mastermind's, too-think tank's, to make this possible for our current life's and generation's future.",
} as const

export const BOARD_ACKNOWLEDGEMENTS = [
  {
    id: 'initials',
    label: "Has to check followed with initial's",
    requiresInitials: true,
  },
  {
    id: 'not-security',
    label: 'I acknowledge it is not a security offer.',
  },
  {
    id: 'non-refundable',
    label: 'I acknowledge this donation is non-refundable.',
  },
  {
    id: 'board-signup',
    label: "Sign me up for Board of Director's.",
  },
] as const

export type CrowdfundingQaItem = {
  id: string
  label: string
  question: string
  answer: string
  whyItMatters?: string
}

export const CROWDFUNDING_QA: CrowdfundingQaItem[] = [
  {
    id: 'reg-a',
    label: "Q & A 1: What's Reg A+?",
    question: "What's Reg A+?",
    answer:
      'Allows us to raise up to $75 million from both accredited AND non-accredited investors after SEC qualification. Think of it as a "mini-IPO" for faith-based projects.',
    whyItMatters: 'Non-accredited investors (most people) can participate, not just the wealthy.',
  },
  {
    id: 'how-invest',
    label: 'Q & A 2: How do I invest?',
    question: 'How do I invest?',
    answer:
      "Join the interest list now. You'll be first to know when offerings go live after SEC approval. No commitment. No payment. Just be first in line.",
    whyItMatters: 'Low barrier. No pressure. Just get in line.',
  },
  {
    id: 'minimum',
    label: "Q & A 3: What's the minimum?",
    question: "What's the minimum?",
    answer:
      'Start with as little as $5,000 where offerings permit. Some projects may offer lower minimums. We believe faith-aligned investing should be accessible.',
    whyItMatters: 'Sets expectations. Shows accessibility.',
  },
  {
    id: 'available-now',
    label: 'Q & A 4: Is this available now?',
    question: 'Is this available now?',
    answer:
      "Not yet. We're raising $100,000 for legal fees and SEC qualification. Join the interest list to be notified when offerings go live — estimated 6–12 months.",
  },
]

export const CROWDFUNDING_INDEX = [
  {
    id: 'qa-group',
    label: "Q and A's; for:",
    children: [
      { id: 'client', label: 'Client / Customer' },
      { id: 'psp', label: "PSP'S" },
      { id: 'platforms', label: "Other Platform's" },
      { id: 'jnv', label: 'Jesus Network Ventures LLC (JNV).' },
    ],
  },
  { id: 'mission', label: 'Mission' },
  { id: 'vision', label: 'Vision' },
  {
    id: 'glossary-group',
    label: 'Glossary:',
    children: [
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
  },
] as const
