export const REFERRAL_EXCHANGE_HERO_IMAGE = '/images/stock/photo-1454165804606-c3d57bc86b40.jpg'

export const REFERRAL_EXCHANGE_HERO = {
  eyebrow: 'Referral Exchange',
  brand: 'RE Network',
  headline: 'Your Next Referral Partner Is Already in Your Network',
  subhead:
    'Exchange qualified referrals with vetted PSPs, get trained on unfamiliar deal types, and build a reputation that brings business back to you.',
  primaryCta: 'Join the Referral Network',
  secondaryCta: 'See How Referrals Work',
  profileCard: {
    name: 'Maya Chen',
    role: 'Commercial Appraiser',
    location: 'Phoenix, AZ',
    specialties: ['Retail buildout', 'Mixed-use', 'Due diligence'],
    status: 'Open to Referrals' as const,
    verified: true,
  },
  notification: {
    title: 'New referral match',
    body: 'Commercial appraiser in Phoenix seeking a contractor for retail buildout',
  },
} as const

export const REFERRAL_FILTER_OPTIONS = {
  referralType: [
    { label: 'Send a referral', value: 'send' },
    { label: 'Receive a referral', value: 'receive' },
    { label: 'Train + refer', value: 'train' },
    { label: 'Any', value: 'any' },
  ],
  specialty: [
    { label: 'Residential brokerage', value: 'residential' },
    { label: 'Commercial brokerage', value: 'commercial' },
    { label: 'Appraisal', value: 'appraisal' },
    { label: 'Contractor / buildout', value: 'contractor' },
    { label: 'Inspection', value: 'inspection' },
    { label: 'Moving / logistics', value: 'moving' },
    { label: 'Mortgage consulting', value: 'mortgage' },
  ],
  geography: [
    { label: 'Phoenix metro', value: 'phoenix' },
    { label: 'Dallas–Fort Worth', value: 'dfw' },
    { label: 'Texas statewide', value: 'texas' },
    { label: 'Arizona statewide', value: 'arizona' },
    { label: 'National', value: 'national' },
  ],
  trainingWillingness: [
    { label: 'Open to train', value: 'open' },
    { label: 'Shadow only', value: 'shadow' },
    { label: 'Recorded sessions', value: 'recorded' },
    { label: 'Not available', value: 'none' },
  ],
  reputationTier: [
    { label: 'Any tier', value: 'any' },
    { label: 'Trusted Referrer', value: 'trusted' },
    { label: 'Elite Referrer', value: 'elite' },
    { label: 'Reliable Recipient', value: 'reliable' },
    { label: 'Mentor', value: 'mentor' },
  ],
} as const

export const REFERRAL_ACTIONS = [
  {
    id: 'send',
    title: 'Send a Referral',
    lead: "Can't take a deal? Refer it to a trusted peer and stay in the loop.",
    micro: 'Track progress. Get notified when it closes.',
    visualLabel: 'Deal passed',
    visualDetail: 'Retail buildout · Plano → Jordan Lee, GC',
  },
  {
    id: 'receive',
    title: 'Receive a Referral',
    lead: "Get qualified leads from PSPs who can't take the work but trust you to handle it.",
    micro: 'See who sent it, why they trust you, and what the client needs.',
    visualLabel: 'Incoming referral',
    visualDetail: 'From Maya Chen · Verified · Needs commercial GC',
  },
  {
    id: 'train',
    title: 'Train + Refer',
    lead: 'New to a market or deal type? Refer it, shadow the work, and earn your split.',
    micro: 'Recorded and contract-documented training. Transparent for everyone.',
    visualLabel: 'Live training',
    visualDetail: 'Shadow session · Client consent on file',
  },
] as const

export const REFERRAL_ACTION_DISCLOSURE =
  'Referral exchanges are based on professional relationships and service quality. No fees are exchanged for referrals on mortgage-related transactions.'

export const REFERRAL_FLOW_STEPS = [
  {
    id: 'profile',
    title: 'Complete Your PSP Profile',
    body: 'Set specialties, geography, referral preferences, training willingness, and commission share options when legally permissible for your role.',
    uiNote: 'Capacity toggle: Open to Referrals · Limited Capacity · Not Available',
  },
  {
    id: 'match',
    title: 'Match with Referral Partners',
    body: 'AI suggestions surface PSPs whose specialties complement yours and whose geography overlaps or extends yours.',
    uiNote:
      "Connection suggestion: You're a residential agent in Dallas. John Doe is a commercial contractor in Fort Worth with referral capacity.",
  },
  {
    id: 'exchange',
    title: 'Send or Receive a Referral',
    body: 'Senders pick a lead, choose a recipient, add context, set training preference, and send. Recipients review reputation and context, then accept or decline.',
    uiNote: 'Example context: Client needs a roofer for a 4-plex in Plano',
  },
  {
    id: 'train',
    title: 'Train (Optional)',
    body: 'If training was requested, both parties sign an in-platform Training Agreement covering scope, duration, and any compliant compensation.',
    uiNote: 'Contract-documented · Recorded when selected',
  },
  {
    id: 'close',
    title: 'Close the Loop',
    body: 'When work completes, leave private feedback and optional public endorsements. Referral history updates with badges and quarterly outcomes.',
    uiNote: 'Reliable Referrer · 3 successful referrals this quarter',
  },
] as const

export const REFERRAL_TRUST_SIGNALS = [
  {
    signal: 'Verified Badge',
    detail: 'License/credential verified via NMLS, state portal, or manual admin review',
  },
  {
    signal: 'Referral History',
    detail: 'Sent 12 referrals, 10 closed successfully',
  },
  {
    signal: 'Training Track Record',
    detail: 'Trained 5 referred PSPs on commercial zoning',
  },
  {
    signal: 'Endorsements',
    detail: '"Reliable Closer" (from 3 verified PSPs), "Great Communicator"',
  },
  {
    signal: 'Response Time',
    detail: 'Usually responds within 2 hours',
  },
  {
    signal: 'Referral Capacity',
    detail: 'Currently accepting 2 more referral partners',
  },
] as const

export const REFERRAL_TRUST_MICRO =
  'Reputation is built on verified actions, not self-reported resumes.'

export const REFERRAL_COMPLIANCE = {
  title: 'How We Keep Referrals Compliant',
  allowed: {
    title: "What's Allowed",
    items: [
      'Building referral relationships based on service quality and mutual respect',
      'Training exchanges documented in-platform',
      'Reciprocal referrals between PSPs in non-mortgage settlement services (contractors, inspectors, moving companies)',
      'Cooperative brokerage arrangements between licensed real estate brokers (subject to state rules)',
    ],
  },
  prohibited: {
    title: "What's Prohibited",
    items: [
      'Paying or receiving fees for mortgage-related referrals (RESPA Section 8)',
      'Fee-splitting with unlicensed persons for real estate brokerage activity',
      'Kickbacks disguised as "marketing fees" or "lead purchases" where the value is tied to referral volume',
    ],
  },
  protect: {
    title: 'How We Protect You',
    items: [
      'Referral exchanges are logged and auditable',
      'Training agreements are contract-documented',
      'Commission share options are role-gated (only shown for PSP types where legally permissible)',
      'Platform never processes referral fees for mortgage-related transactions',
    ],
  },
  flowchart: {
    start: 'Referral Sent',
    check: 'Legal Check (role-based)',
    mortgage: 'Mortgage-related → No fee exchange, training/reputation only',
    nonMortgage: 'Non-mortgage → Fee exchange permitted (subject to state rules)',
  },
} as const

export const REFERRAL_DASHBOARD_PREVIEW = {
  title: 'Your Referral Dashboard',
  micro: 'Your referral network is your business. Manage it like one.',
  incoming: [
    {
      sender: 'Maya Chen',
      need: 'Retail GC for Phoenix strip center',
      status: 'New',
    },
    {
      sender: 'Jordan Lee',
      need: 'Commercial appraisal · Scottsdale',
      status: 'Review',
    },
  ],
  sent: [
    {
      recipient: 'Alex Rivera',
      need: 'Roofing · 4-plex Plano',
      stage: 'In Progress',
    },
  ],
  training: [
    { label: 'Shadow · zoning walkthrough', status: 'Active' },
    { label: 'Recorded · retail TI', status: 'Pending' },
  ],
  partners: [
    { name: 'Jordan Lee', capacity: 'Open' },
    { name: 'Alex Rivera', capacity: 'Limited' },
  ],
  stats: [
    { label: 'Sent', value: '12' },
    { label: 'Received', value: '9' },
    { label: 'Close rate', value: '83%' },
    { label: 'Avg response', value: '1.4h' },
  ],
  earningsNote: 'Earnings from referral splits appear when legally permissible for your PSP role.',
} as const

export const REFERRAL_TRIBE_GROUPS = [
  {
    id: 'tx-commercial',
    title: 'Commercial Referral Exchange — Texas',
    members: '214 members',
    focus: 'Deal handoffs across DFW & Houston',
  },
  {
    id: 'training',
    title: 'Training-Friendly PSPs',
    members: '168 members',
    focus: 'Shadow and recorded sessions welcome',
  },
  {
    id: 'mentors',
    title: 'New PSPs Seeking Mentors',
    members: '97 members',
    focus: 'Pairing early-career providers with mentors',
  },
  {
    id: 'phoenix',
    title: 'Referral Reciprocity Circle — Phoenix',
    members: '141 members',
    focus: 'Local reciprocal intros, no cold outreach',
  },
] as const

export const REFERRAL_FINAL_CTA = {
  headline: 'Stop hunting for referrals. Start building a network that brings them to you.',
  joinCta: 'Join as a PSP',
  rulesCta: 'See Referral Rules for My Role',
  footerNote:
    'Referral exchange availability varies by PSP role and state law. Platform facilitates connections; it does not guarantee referrals or outcomes.',
} as const

export const REFERRAL_ROLE_RULES = [
  {
    id: 'mortgage',
    label: 'Mortgage consultant',
    summary:
      'Training and reputation-based referrals only. Referral fees for mortgage-related business are prohibited (RESPA).',
  },
  {
    id: 'agent',
    label: 'Real estate agent / broker',
    summary:
      'Relationship referrals and cooperative brokerage where state rules allow. Fee-splits with unlicensed persons are prohibited.',
  },
  {
    id: 'title',
    label: 'Escrow / title',
    summary:
      'Training + reputation pathways only for settlement-related referrals. No fee exchange for mortgage-tied intros.',
  },
  {
    id: 'contractor',
    label: 'Contractor / inspector / mover',
    summary:
      'Fee exchange may be permitted for non-mortgage settlement services, subject to state law. Full split options can appear after role verification.',
  },
] as const

export const REFERRAL_CAPACITY_OPTIONS = [
  { id: 'open', label: 'Open to Referrals', tone: 'open' as const },
  { id: 'limited', label: 'Limited Capacity', tone: 'limited' as const },
  { id: 'unavailable', label: 'Not Available', tone: 'unavailable' as const },
] as const

export const REFERRAL_TRAINING_OPTIONS = [
  { id: 'none', label: 'None', detail: 'Just send the referral' },
  { id: 'shadow', label: 'Shadow', detail: 'Recipient can observe, no compensation' },
  { id: 'recorded', label: 'Recorded', detail: 'Documented session, contract-signed' },
  { id: 'live', label: 'Live Conference', detail: 'Client can listen in (transparency)' },
] as const

export const REFERRAL_BADGES = [
  { tier: 'Trusted Referrer', rule: '5+ successful sends' },
  { tier: 'Elite Referrer', rule: '20+ successful sends' },
  { tier: 'Reliable Recipient', rule: '95%+ acceptance' },
  { tier: 'Fast Responder', rule: '<2hr average response' },
  { tier: 'Mentor', rule: 'Trained 5+ PSPs' },
  { tier: 'Master Mentor', rule: 'Trained 20+ PSPs' },
] as const

export const REFERRAL_TIMELINE = [
  'Sent',
  'Viewed',
  'Accepted',
  'In Progress',
  'Completed',
  'Feedback Left',
] as const

export const RESPA_BANNER = {
  title: 'RESPA Notice',
  body: 'Referral fees for mortgage-related business are prohibited. This platform facilitates relationship-based referrals and training.',
  learnMore: 'Learn More',
} as const
