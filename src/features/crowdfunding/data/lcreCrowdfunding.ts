import { PATHS } from '@/app/router/paths'

export const LCRE_HERO = {
  brand: 'LCRE Crowdfunding',
  eyebrow: 'Life Coordination Real Estate Crowdfunding',
  tagline: 'Faith-Aligned. Community-Driven. Recreation Real Estate.',
  lead: 'Building the next generation of recreational spaces — together.',
} as const

export const LCRE_UPDATES = {
  title: 'Latest Updates',
  body: "Follow LCREC's progress toward SEC qualification and our first recreational real estate projects.",
  cta: 'Read Updates',
} as const

export const LCRE_ABOUT = {
  title: 'About LCREC',
  body: 'Life Coordination Real Estate Crowdfunding (LCREC) is a faith-aligned real estate initiative in collaboration with:',
  partners: ['LC Outdoors', 'LifeCoordination.com', 'Jesus Network Ventures LLC (JNV)'],
} as const

export const LCRE_DIFFERENTIATORS = [
  {
    id: 'values',
    title: 'Values-Aligned',
    text: 'Projects that honor God through faith-based recreation and entertainment.',
  },
  {
    id: 'community',
    title: 'Community-Driven',
    text: 'You vote on locations, features, and direction.',
  },
  {
    id: 'transparent',
    title: 'Transparent',
    text: 'See exactly where money goes and how each venture is structured.',
  },
  {
    id: 'recreation',
    title: 'Recreational Focus',
    text: 'Bowling alleys, ice rinks, water parks, and more.',
  },
] as const

export const LCRE_SEC_NOTICE =
  'All investment activity is contingent on SEC approval. LCREC is not currently offering or selling securities.'

export const LCRE_LEGAL_PREP = {
  title: 'Legal Preparation for SEC Approval',
  body: 'Legal team will help present the package for approval from the Securities and Exchange Commission (SEC). Toward Reg A+ (Tier II) filings. Legal preparation. Determination of SEC approval. Strictly to hire legal team to prepare the package presentation for SEC approval.',
  cta: 'Contribute to Legal Fund',
} as const

export const LCRE_LEGAL_FUND = {
  title: 'Legal & Compliance Fund',
  body: 'LCREC is raising $200,000 to retain securities counsel and prepare a Regulation A+ (Tier II) offering package for SEC review.',
  raised: 0,
  goal: 200_000,
  important: [
    'This is a non-refundable donation, not an investment.',
    'Donations do not purchase securities, equity, or future returns.',
    'This fund supports legal preparation only. It is not an offer to sell securities.',
  ],
  donateCta: 'Donate to Legal Fund',
  processors: ['Stripe', 'Square'] as const,
  disclaimer:
    'Donations are non-refundable regardless of SEC outcome. Consult your own advisor before contributing.',
} as const

export const LCRE_LONG_TERM = {
  title: 'Our Long-Term Goal',
  body: 'Once SEC-qualified under Reg A+ (Tier II), LCREC intends to raise up to $75 million from both accredited and non-accredited investors — subject to regulatory approval and offering documents.',
  notice: 'No securities are being offered or sold at this time.',
} as const

export const LCRE_PHASE_ONE = {
  title: 'Phase I: Build the Interest List',
  body: 'Before we can open a Reg A+ offering, we need two things:',
  requirements: [
    'SEC qualification (funded by the Legal Fund)',
    'A demonstrated community of interested investors',
  ],
  close: 'Join the Interest List to signal demand and be first when offerings go live.',
  cta: 'Join the Interest List',
} as const

export const LCRE_BENEFITS = {
  title: 'Investor Benefits (Once SEC-Qualified)',
  rows: [
    { benefit: 'Access to Reg A+ offerings', accredited: true, nonAccredited: true },
    { benefit: 'Community voting on projects', accredited: true, nonAccredited: true },
    { benefit: 'Transparent use-of-funds reporting', accredited: true, nonAccredited: true },
    { benefit: 'Early access to new deals', accredited: true, nonAccredited: true },
    { benefit: 'Board eligibility', accredited: true, nonAccredited: true },
  ],
  note: 'Benefits subject to final offering terms and SEC qualification.',
} as const

export const LCRE_ACKNOWLEDGEMENTS = [
  { id: 'not-securities', label: 'I understand this is not a securities offering.', required: true },
  { id: 'non-refundable', label: 'I understand this donation is non-refundable.', required: true },
  {
    id: 'no-equity',
    label: 'I understand donations do not purchase equity or future returns.',
    required: true,
  },
  {
    id: 'board',
    label: 'I would like to be considered for the Board of Directors.',
    required: false,
  },
  { id: 'updates', label: 'I agree to receive updates from LCREC.', required: false },
] as const

export const LCRE_SUPPORTERS = [
  { id: '1', name: 'Anonymous', amount: 250, when: '2h ago' },
  { id: '2', name: 'M. Rivera', amount: 100, when: '5h ago' },
  { id: '3', name: 'J. Okada', amount: 500, when: '1d ago' },
  { id: '4', name: 'Anonymous', amount: 75, when: '2d ago' },
] as const

export const LCRE_BOARD = {
  title: 'Join the Board of Directors',
  body: "Help shape LCREC's direction. We're seeking advisors, operators, and thinkers from mastermind and think-tank communities to guide this work for today's generation and the next.",
  cta: 'Learn About Board Opportunities',
} as const

export const LCRE_INDEX = {
  title: 'Index',
  items: [
    { id: 'az', label: 'A–Z Index', note: 'Half page' },
    {
      id: 'explore',
      label: 'Explore Priority Index',
      note: 'Other page',
      href: PATHS.crowdfunding,
    },
  ],
} as const

export const LCRE_QA = [
  {
    id: 'general',
    category: 'General',
    question: 'What is LCREC and how does it work?',
    answer:
      'Life Coordination Real Estate Crowdfunding (LCREC) is a faith-aligned initiative building recreational real estate with community voting, transparent structure, and a path toward Reg A+ (Tier II) after SEC qualification.',
  },
  {
    id: 'legal-fund',
    category: 'Legal Fund',
    question: 'Where do donations go and why are they non-refundable?',
    answer:
      'Donations fund securities counsel and Reg A+ package preparation for SEC review. They are non-refundable donations — not investments — and do not purchase equity or future returns, regardless of SEC outcome.',
  },
  {
    id: 'crowdfunding',
    category: 'Crowdfunding',
    question: 'What is Reg A+ and when will offerings open?',
    answer:
      'Regulation A+ (Tier II) can allow raises of up to $75 million from accredited and non-accredited investors after SEC qualification. Offerings open only after qualification and offering documents are complete. Nothing is offered or sold today.',
  },
  {
    id: 'voting',
    category: 'Community Voting',
    question: 'How do I help choose projects?',
    answer:
      'Join the interest list and participate in community votes on locations, features, and project direction as LCREC advances toward qualified offerings.',
  },
  {
    id: 'board',
    category: 'Board of Directors',
    question: 'What does board service involve?',
    answer:
      'Board members help guide strategy, stewardship, and long-term direction — advisors, operators, and thinkers shaping recreational projects for this generation and the next.',
  },
] as const

export const LCRE_JOIN = {
  title: 'Join Us',
  links: [
    { id: 'mission', label: 'Mission', href: PATHS.about },
    { id: 'vision', label: 'Vision', href: PATHS.about },
    { id: 'contact', label: 'Contact', href: PATHS.contact },
  ],
} as const

export const LCRE_PROJECTS = {
  title: 'Projects Coming Soon',
  browseCta: 'Browse All Projects',
  items: [
    {
      id: 'faith-lanes',
      project: 'Faith Lanes',
      location: 'TBD',
      type: 'Bowling & Entertainment',
      status: 'In Development',
    },
    {
      id: 'ice-rink',
      project: 'Your next project',
      location: 'TBD',
      type: 'Ice Rink',
      status: 'Concept',
    },
    {
      id: 'water-park',
      project: 'Your next project',
      location: 'TBD',
      type: 'Water Park',
      status: 'Concept',
    },
  ],
} as const

export const LCRE_FINE_PRINT =
  'Legal Fund donations support SEC qualification and Reg A+ Tier II preparation only. Donations are non-refundable and are not investments. No securities are offered or sold. Payment processing via Stripe and Square. LCREC makes no guarantee of SEC approval or future offerings.'
