/** Landing hero filter options — from reexplained filter-s-comparison */

export type FilterTreeNode = {
  label: string
  children?: FilterTreeNode[]
  /** When set, renders as an external link instead of a checkbox. */
  href?: string
  /** Render children grouped under A…, B… letter headings. */
  groupByLetter?: boolean
}

/** Which elaborated filter set to show under A–Z PSP selection. */
export type PspFilterProfile =
  | 'real-estate'
  | 'executive'
  | 'mortgage'
  | 'trades'
  | null

/** A–Z labels that open the Tradespeople Labor Professional's filter set. */
const TRADE_PSP_LABELS = [
  'Tradeperson',
  "Tradespeople Labor Professional's",
  "Professional's",
  "Asbesto's",
  'Builder',
  'Cleaner',
  'Concrete',
  'Construction',
  'Contractor',
  'Developer (Also; see: Builder)',
  'Electrician',
  'Flooring',
  'Framer',
  'Gardening  (Also; see: Landscaping, Lawn Maintance)',
  'HVAC',
  'Janitorial',
  'Landscaper',
  'Lawn [See; Yard]',
  "Mover's",
  'Painter',
  'Pavement',
  'Pest',
  'Plumber',
  'Pool',
  'Pressure Washer',
  'Roofing',
  'Sand-Blasting',
  'Solar',
  'Squat-Removal',
  'Trash Bin Cleaner',
  'Welder',
  'Window Cleaner',
] as const

const MORTGAGE_PSP_MATCHERS = [
  'Mortgage',
  'Mortgage Consultant',
  'Mortgage Originator',
  'Loan Executive',
  'Loan Officer',
  'Loan Originator',
  'Loan Processor',
] as const

/** Office professionals — Executive filter set. */
const EXECUTIVE_PSP_LABELS = [
  'Executive',
  'Accountant',
  'Architect',
  'Attorney',
  'Bookkeeper',
  'Consultant',
  'Lawyer',
  'Taxes',
] as const

/** Property-side roles that were still on the generic filter set. */
const REAL_ESTATE_PSP_LABELS = [
  'Real Estate',
  'Appraiser',
  'Escrow',
  'Investor',
  'Transaction Coordinator',
  'Wholesaler',
  'Crowdfunding',
] as const

function matchesPspLabel(value: string, label: string) {
  return (
    value === label ||
    value.startsWith(`${label} >`) ||
    value.endsWith(` > ${label}`) ||
    value.includes(` > ${label} >`)
  )
}

export function getPspFilterProfile(psp: string[]): PspFilterProfile {
  const hasMortgage = psp.some(
    (value) =>
      value === 'Loan' ||
      value.startsWith('Loan >') ||
      MORTGAGE_PSP_MATCHERS.some((label) => matchesPspLabel(value, label)),
  )
  if (hasMortgage) return 'mortgage'

  const hasExecutive = psp.some(
    (value) =>
      EXECUTIVE_PSP_LABELS.some((label) => matchesPspLabel(value, label)) ||
      value === 'Agent > Insurance' ||
      value.startsWith('Agent > Insurance >') ||
      value === 'Broker > Insurance' ||
      value.startsWith('Broker > Insurance >'),
  )
  if (hasExecutive) return 'executive'

  const hasRealEstate = psp.some(
    (value) =>
      REAL_ESTATE_PSP_LABELS.some((label) => matchesPspLabel(value, label)) ||
      value === 'Agent' ||
      value === 'Agent > Real Estate' ||
      value.startsWith('Agent > Real Estate >') ||
      value === 'Agent > Escrow' ||
      value.startsWith('Agent > Escrow >') ||
      value === 'Agent > Leasing' ||
      value.startsWith('Agent > Leasing >') ||
      (value.startsWith('Agent > ') &&
        !value.startsWith('Agent > Insurance')) ||
      value === 'Broker' ||
      value === 'Broker > Real Estate' ||
      value.startsWith('Broker > Real Estate >') ||
      (value.startsWith('Broker > ') &&
        !value.startsWith('Broker > Insurance')),
  )
  if (hasRealEstate) return 'real-estate'

  const hasTrades = psp.some((value) =>
    TRADE_PSP_LABELS.some((label) => matchesPspLabel(value, label)),
  )
  if (hasTrades) return 'trades'

  return null
}

/** A–Z PSP list (main rows) */
export const PSP_BY_LETTER: Record<string, string[]> = {
  A: [
    'Accountant',
    'Agent',
    'Appraiser',
    'Architect',
    "Asbesto's",
    'Attorney',
  ],
  B: ['Broker', 'Bookkeeper', 'Builder'],
  C: [
    'Cleaner',
    'Concrete',
    'Contractor',
    'Construction',
    'Consultant',
    'Crowdfunding',
  ],
  D: ['Developer (Also; see: Builder)'],
  E: ['Electrician', 'Escrow', 'Executive'],
  F: ['Flooring', 'Framer'],
  G: ['Gardening  (Also; see: Landscaping, Lawn Maintance)'],
  H: ['HVAC'],
  I: ['Investor'],
  J: ['Janitorial'],
  K: [],
  L: [
    'Landscaper',
    'Lawyer',
    'Lawn [See; Yard]',
    'Loan',
    'Loan Executive',
    'Loan Originator',
    'Loan Processor',
  ],
  M: ['Mortgage', "Mover's"],
  N: [],
  O: [],
  P: [
    'Painter',
    'Pavement',
    'Pest',
    "Professional's",
    'Plumber',
    'Pool',
    'Pressure Washer',
  ],
  Q: [],
  R: ['Real Estate', 'Roofing'],
  S: ['Sand-Blasting', 'Solar', 'Squat-Removal'],
  T: [
    'Tradeperson',
    "Tradespeople Labor Professional's",
    'Taxes',
    'Transaction Coordinator',
    'Trash Bin Cleaner',
  ],
  U: [],
  V: [],
  W: ['Wholesaler', 'Welder', 'Window Cleaner'],
  X: [],
  Y: [],
  Z: [],
}

/** Nested under Agent — Real Estate is a leaf; Representation opens below. */
export const AGENT_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Escrow' },
  { label: 'Insurance' },
  { label: 'Leasing' },
  { label: 'Real Estate' },
]

export const BROKER_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Real Estate' },
  { label: 'Insurance' },
]

export const ATTORNEY_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Insurance' },
  { label: 'Title' },
  { label: 'Workers Compensation' },
]

export const LAWYER_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Insurance' },
  { label: 'Title' },
  { label: 'Workers Compensation' },
]

export const CROWDFUNDING_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Accredited' },
  { label: 'Non Accredited' },
]

export const FLOORING_TYPE_TREE: FilterTreeNode[] = [
  {
    label: 'Indoor',
    children: [{ label: 'Asphalt' }, { label: 'Tile' }, { label: 'Other' }],
  },
  {
    label: 'Outdoor',
    children: [
      { label: 'Asphalt' },
      { label: 'Concrete' },
      { label: 'Gravel' },
      { label: 'Rock' },
      { label: 'Stone' },
      { label: 'Other' },
    ],
  },
]

export const LAWN_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Lawn Maintenance' },
  { label: 'Lawn Service' },
]

export const INVESTOR_TYPE_TREE: FilterTreeNode[] = [
  { label: "BRRRR's" },
  { label: 'Fix & Flip' },
  { label: 'Foreclosures' },
  { label: 'House Hacking' },
  {
    label: 'Leads',
    children: [
      { label: 'BatchLeads' },
      { label: 'Propstream' },
      { label: 'REDX' },
      { label: 'Vulcan7' },
    ],
  },
  { label: 'Lease-Options' },
  { label: 'Long Term Rentals' },
  { label: 'Multi-Family or Apartments' },
  { label: 'Short Sale' },
  { label: "Subject-To's" },
  { label: 'Wholesaling' },
]

/** Mortgage / Loan roles that share the same 20+ filter set. */
export const MORTGAGE_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Mortgage Consultant' },
  { label: 'Mortgage Originator' },
]

export const LOAN_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Loan Executive' },
  { label: 'Loan Officer' },
  { label: 'Loan Originator' },
  { label: 'Loan Processor' },
]

/** Parent PSP label → nested tree */
export const PSP_NESTED_TREES: Record<string, FilterTreeNode[]> = {
  Agent: AGENT_TYPE_TREE,
  Attorney: ATTORNEY_TYPE_TREE,
  Broker: BROKER_TYPE_TREE,
  Crowdfunding: CROWDFUNDING_TYPE_TREE,
  Flooring: FLOORING_TYPE_TREE,
  Investor: INVESTOR_TYPE_TREE,
  Lawyer: LAWYER_TYPE_TREE,
  'Lawn [See; Yard]': LAWN_TYPE_TREE,
  Loan: LOAN_TYPE_TREE,
  Mortgage: MORTGAGE_TYPE_TREE,
}

export const FIND_FILTER_OPTIONS = ['Service', 'Profile', 'Office']

/** Tradespeople — price per square foot bands. */
export const PR_SQ_FT_OPTIONS = [
  'Under $100',
  '$100–$200',
  '$200–$400',
  '$400+',
  'All Of The Above',
]

export const PROOF_OPTIONS = ['Ownership', 'Tenancy']

/** Tradespeople Labor Professional's — client experience. */
export const TRADES_CLIENT_EXPERIENCE_TREE: FilterTreeNode[] = [
  { label: 'Never Hired Tradeperson' },
  { label: 'Have Hired Tradeperson' },
  { label: 'Vacational' },
  {
    label: 'Investment',
    children: [{ label: "Suggestion PSP's of same Zipcode" }],
  },
  { label: 'All Of The Above' },
]

export const WILLING_TO_TRAIN_TRADES_OPTIONS = [
  'Yes; recorded and contract documented (of my demographic price range)',
  "Yes; via live conference call with client's he she could listen in (transparency) recorded and contract documented (of my demographic price range)",
  'Reach out',
  "Read contract's and save them",
  'Any of the above',
]

export const ROLE_FILTER_OPTIONS = ['Client', 'Property Service Provider (PSP)']

/** Buying details nested under Representation → Buying. */
export const BUYING_TREE: FilterTreeNode[] = [
  { label: 'Buy-to-sell:' },
  { label: 'Cash' },
  { label: 'Credit' },
  { label: 'Both; Cash + Credit:' },
  { label: 'All Of The Above' },
]

const REPRESENTATION_CROWDFUNDING: FilterTreeNode = {
  label: 'Crowdfunding',
  children: [
    { label: 'Accredidation:' },
    { label: 'Non-accredited' },
  ],
}

/** Real Estate Agent — Representation's (full nest, matches filter-s-comparison). */
export const REPRESENTATION_TOP_TREE: FilterTreeNode[] = [
  {
    label: 'Selling',
    children: [{ label: 'Sell-to-buy' }],
  },
  { label: 'For Sale By Owner:' },
  { label: 'Leasing/Renting' },
  { label: 'Consulting:' },
  { label: 'Buying', children: BUYING_TREE },
  {
    label: 'Owner finance',
    children: [{ label: 'Partial owner finance' }],
  },
  {
    label: 'Lease with option to buy',
    children: [{ label: 'Partial with lease option' }],
  },
  {
    label: 'Subject to:',
    children: [{ label: 'Partial subject to:' }],
  },
  REPRESENTATION_CROWDFUNDING,
  { label: 'All Of The Above' },
]

/** Executive Property Service Provider — Representation. */
export const EXECUTIVE_REPRESENTATION_TOP_TREE: FilterTreeNode[] = [
  {
    label: "Seller's",
    children: [{ label: "Sell-to-buyer's" }],
  },
  { label: "Leaser's/renter's" },
  { label: 'You do consulting' },
  { label: 'Buying', children: BUYING_TREE },
  { label: 'All Of The Above' },
]

/** Combined tree kept for drawers that still nest Buying under Representation. */
export const REPRESENTATION_TREE: FilterTreeNode[] = [
  {
    label: 'Selling',
    children: [{ label: 'Sell-to-buy' }],
  },
  { label: 'For Sale By Owner:' },
  { label: 'Leasing/Renting' },
  { label: 'Consulting:' },
  { label: 'Buying', children: BUYING_TREE },
  {
    label: 'Owner finance',
    children: [{ label: 'Partial owner finance' }],
  },
  {
    label: 'Lease with option to buy',
    children: [{ label: 'Partial with lease option' }],
  },
  {
    label: 'Subject to:',
    children: [{ label: 'Partial subject to:' }],
  },
  REPRESENTATION_CROWDFUNDING,
  { label: 'All Of The Above' },
]

export const PRICE_DEMOGRAPHY_OPTIONS = ['Luxury', 'Mid', 'Economic']

/** Top-level field options (sub-types live in FIELD_TREE children / SUB_FIELD). */
export const FIELD_TOP_OPTIONS = [
  'Commercial',
  "Multi-unit 4+ unit's",
  'Industrial',
  'Agriculture',
  'Residential',
  'Other',
  'All Of The Above',
]

export const FIELD_TREE: FilterTreeNode[] = [
  {
    label: 'Commercial',
    children: [
      {
        label: 'Retail',
        children: [
          { label: 'Single' },
          { label: 'Anchor' },
          {
            label: 'Mall',
            children: [
              { label: 'Strip' },
              { label: 'Out-door' },
              { label: 'In-door' },
            ],
          },
        ],
      },
      {
        label: 'Recreational',
        children: [
          { label: 'Water-park' },
          { label: 'Amusement park' },
        ],
      },
      { label: "Business'es" },
      { label: 'All Of The Above' },
    ],
  },
  {
    label: "Multi-unit 4+ unit's",
    children: [
      { label: "Sky-scraper's" },
      { label: 'Office' },
      { label: 'Living' },
      { label: 'Hospitality' },
      { label: "Hotel's" },
      { label: "Motel's" },
      { label: 'Mobile home park' },
      { label: 'All Of The Above' },
    ],
  },
  {
    label: 'Industrial',
    children: [
      { label: 'A Grade ' },
      { label: 'B Grade ' },
      { label: 'C Grade' },
      { label: 'D Grade' },
      { label: 'Factory' },
      { label: "Fabrication" },
      { label: 'Warehouse' },
      { label: 'Distribution' },
      { label: 'Junk yard' },
      { label: 'All Of The Above' },
    ],
  },
  {
    label: 'Agriculture',
    children: [
      { label: "Crop" },
      { label: 'Livestock' },
      {
        label: "Acreage ",
      },
      { label: 'All Of The Above' },
    ],
  },
  {
    label: 'Residential',
    children: [
      { label: 'House' },
      { label: "-4 unit's (or less; if more, see Multi-Unit)" },
      { label: "Condo" },
      { label: 'All Of The Above' },
    ],
  },
  {
    label: 'Other',
    children: [
      { label: 'Land' },
      { label: 'Mixed-Use' },
      { label: 'Water-Front' },
      { label: "Hills-Mountrain" },
      { label: 'Acreage' },
      { label: 'Land Developement' },
      { label: 'Higher And Best Use' },
      { label: 'All Of The Above' },
    ],
  },
  { label: 'All Of The Above' },
]

/** Sub-field trees keyed by top-level Field Option label. */
export const SUB_FIELD_BY_FIELD: Record<string, FilterTreeNode[]> =
  Object.fromEntries(
    FIELD_TREE.filter((node) => node.children?.length).map((node) => [
      node.label,
      node.children!,
    ]),
  )

/** Flattened sub-field tree for when no field filter is set. */
export const SUB_FIELD_TREE: FilterTreeNode[] = FIELD_TREE.flatMap((node) =>
  node.children?.length
    ? [
      {
        label: node.label,
        children: node.children,
        groupByLetter: node.groupByLetter,
      },
    ]
    : [],
)

/** Sub-fields for the currently selected Field Option labels. */
export function getSubFieldTree(selectedFields: string[]): FilterTreeNode[] {
  const fields = selectedFields.filter((f) => f !== 'All Of The Above')
  if (fields.length === 0 || selectedFields.includes('All Of The Above')) {
    return SUB_FIELD_TREE
  }
  return fields.flatMap((field) => {
    const match = FIELD_TREE.find((node) => node.label === field)
    const children = match?.children ?? SUB_FIELD_BY_FIELD[field]
    if (!children?.length) return []
    return [
      {
        label: field,
        children,
        groupByLetter: match?.groupByLetter,
      },
    ]
  })
}

/** Real Estate Agent — Client Experience. */
export const CLIENT_EXPERIENCE_TREE: FilterTreeNode[] = [
  {
    label: 'First-time',
    children: [
      {
        label: 'Seller',
        children: [{ label: 'Sell-to-buy' }],
      },
      {
        label: 'Buyer',
        children: [
          { label: 'Cash' },
          {
            label: 'Credit',
            children: [
              {
                label: 'If Buyer',
                children: [
                  {
                    label: 'If Residential',
                    children: [
                      { label: 'FHA' },
                      { label: 'USDA' },
                      { label: 'VA' },
                    ],
                  },
                ],
              },
            ],
          },
          { label: 'Buy-To-Sell' },
        ],
      },
    ],
  },
  {
    label: 'Repeat',
    children: [{ label: 'Seller' }, { label: 'Buyer' }],
  },
  { label: 'Vacational' },
  {
    label: 'Investment',
  },
  { label: 'All Of The Above' },
]

/** Executive — Client Experience to find you. */
export const EXECUTIVE_CLIENT_EXPERIENCE_TREE: FilterTreeNode[] = [
  {
    label: 'First-time Buyer',
    children: [
      { label: 'Cash' },
      {
        label: 'Credit',
        children: [
          {
            label: 'If buyer',
            children: [
              {
                label: 'If residential',
                children: [
                  { label: 'FHA' },
                  { label: 'USDA' },
                  { label: 'VA' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { label: 'Repeat Seller-Buyer' },
  { label: 'Vacational' },
  {
    label: 'Investment',
  },
  { label: 'All Of The Above' },
]

export const PROPERTY_CONDITION_OPTIONS = [
  'New Construction',
  'Renovation',
  'TLC Distressed Property',
  'Run Down',
  'Burned',
  'All Of The Above',
]

export const VACANCY_OPTIONS = [
  'Owner Occupied',
  'Tenant Occupied',
  'Vacant',
  'Unsure (Squat Removal, Homeless, etc.)',
  'All Of The Above',
]

export const TITLE_OPTIONS = [
  'Sole Ownership',
  'Tenancy In Common',
  'Joint Tenancy',
  'Tenancy By The Entirety',
  'Community Property With Right Of Survivorship',
  'Corporate Ownership',
  'Partnership Ownership',
  'All Of The Above',
]

export const SALE_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Standard; or free and clear (traditional)' },
  { label: 'Loan; deed, or note remaining' },
  {
    label: 'Lien',
    children: [
      {
        label: 'Loan',
        children: [{ label: 'Purchase' }, { label: 'Refinance' }],
      },
      { label: 'Contractor' },
    ],
  },
  {
    label: 'Short Sale',
    children: [
      { label: 'Pre-Foreclosure' },
      { label: 'Foreclosure' },
      { label: 'Auction' },
    ],
  },
  { label: 'Real Estate Owned (REO)' },
  { label: 'Auction' },
  { label: 'HUD' },
  { label: 'Open Listing' },
  {
    label: 'Government Agencies',
    children: [
      { label: 'HUD' },
      { label: 'FBI' },
      { label: 'ICE' },
      { label: 'DEA' },
      { label: 'Other' },
    ],
  },
  { label: 'All Of The Above' },
]

/** Tag; Skill — optional extra curriculum (both profiles). */
export const TAG_SKILL_TREE: FilterTreeNode[] = [
  { label: 'Property valuation' },
  { label: 'Market analysis' },
  { label: 'Contract management' },
  { label: 'Staging' },
  { label: 'Open house' },
  { label: 'Client communication' },
  { label: 'Marketing and advertising' },
  { label: 'Negotiation' },
  {
    label: "New developement's",
    children: [
      { label: 'Luxury' },
      { label: 'Equestrian' },
      { label: 'Mixed use' },
      { label: 'Water-front' },
      { label: "Hill's, mountain's" },
      { label: 'Acreage' },
      { label: "Elderly senior's" },
      { label: 'Closing coordination' },
    ],
  },
  { label: 'All recorded' },
  { label: 'All Of The Above' },
]

export const GOV_AGENCIES_OPTIONS = [
  'HUD',
  'FBI',
  'ICE',
  'DEA',
  'Other',
  'All Of The Above',
]

export const YOUR_EXPERIENCE_OPTIONS = [
  "Expert experience based of sale's closed",
  'Mature',
  'Seasonal',
  'New',
]

export const CLIENT_MOTIVE_OPTIONS = [
  'A; Have Too…',
  'B; Eventually; Sometime…',
  'C …Wasting Time',
  'D.',
  'Any of the above',
]

/** A–Z languages (same letter + indent pattern as PSP_BY_LETTER). */
export const LANGUAGE_BY_LETTER: Record<string, string[]> = {
  A: ['Arabic'],
  B: [],
  C: ['Chinese'],
  D: [],
  E: ['English'],
  F: ['French'],
  G: ['German', 'Gujarati'],
  H: ['Hindi'],
  I: ['Italiano'],
  J: ['Japanese'],
  K: ['Korean'],
  L: [],
  M: ['Mandarin'],
  N: [],
  O: ['Other'],
  P: ['Portuguese', 'Punjabi'],
  Q: [],
  R: ['Russian'],
  S: ['Spanish'],
  T: ['Tagalog'],
  U: ['Urdu'],
  V: ['Vietnamese'],
  W: [],
  X: [],
  Y: [],
  Z: [],
}

/** Languages Spoken — filter-s-comparison short list. */
export const LANGUAGE_SPOKEN_RE_OPTIONS = [
  'English',
  'Spanish',
  'Chinese',
  'French',
  'Other',
]

export const LANGUAGE_SPOKEN_OPTIONS = Object.values(LANGUAGE_BY_LETTER).flat()

export const PERCENTAGE_SHARE_FILTER_OPTIONS = [
  '50%',
  '40%',
  '30%',
  '20%',
  'Zilch',
]

export const WILLING_TO_TRAIN_RE_OPTIONS = [
  'Yes; recorded and contract documented (of my demographic price range)',
  "Yes; via live conference call with client's he she could listen in (transparency) recorded and contract documented (of my demographic price range)",
  'Reach out',
  'Any of the above',
]

export const WILLING_TO_TRAIN_EXECUTIVE_OPTIONS = [
  'Yes; recorded and contract documented (of my demographic price range)',
  "Yes; via live conference call with client's he she could listen in (transparency) recorded and contract documented (of my demographic price range)",
  'Reach out',
  "Read contract's and save them",
  'Any of the above',
]

const WILLING_TO_TRAIN_TREE_LABELS = WILLING_TO_TRAIN_RE_OPTIONS

export const PERCENTAGE_SHARE_TREE: FilterTreeNode[] = [
  {
    label: 'Are you willing to train',
    children: WILLING_TO_TRAIN_TREE_LABELS.map((label) => ({ label })),
  },
  {
    label: 'Percentage to share',
    children: PERCENTAGE_SHARE_FILTER_OPTIONS.map((label) => ({ label })),
  },
]

export const FORM_OF_PAYMENT_OPTIONS = [
  'Direct deposit',
  'Stripe',
  'Paypal',
  'Square',
  'Zelle',
  'Venmo',
  'Cashapp',
  'Check',
  'Other',
]

/** Selecting one clears the others — each shows only its own detail fields. */
export const FORM_OF_PAYMENT_EXCLUSIVE_OPTIONS = [
  'Direct deposit',
  'Stripe',
  'Paypal',
  'Square',
  'Zelle',
  'Venmo',
  'Cashapp',
  'Check',
] as const

/** Real Estate Agent — Form Of Payment. */
export const FORM_OF_PAYMENT_TREE: FilterTreeNode[] = [
  { label: 'Cash' },
  { label: 'Card' },
  {
    label: 'Finance',
    children: [{ label: "Hearth, other's" }],
  },
]

/** Executive — Form Of Payment (Stripe under Card). */
export const EXECUTIVE_FORM_OF_PAYMENT_TREE: FilterTreeNode[] = [
  { label: 'Cash' },
  {
    label: 'Card',
    children: [{ label: 'Connect your stripe account' }],
  },
  {
    label: 'Finance',
    children: [
      {
        label: "Hearth (not if they are competitor's; no), other's",
      },
    ],
  },
]

export const FORM_OF_PAYMENT_DEFAULT = '[Default] Directly to broker, admin'

/** Refference's / network onboard. */
export const REFERENCES_OPTIONS = [
  'Yes — send',
  'Yes — receive',
  'Bring someone onboard (2-3 months free / affiliate)',
  'No referral',
]

export const PAYMENT_PACKET_OPTIONS = [
  'Weekly',
  'Bi-Weekly',
  'Monthly',
  'Yearly',
]

export const TIER_SELECTION_OPTIONS = [
  'Basic Tier',
  'Standard Tier',
  'Advanced Tier',
  'Lux Tier',
]

export const EDUCATION_ARCHIVE_OPTIONS = [
  'Different demographics',
  'Referring clients to another Geographical place',
  "Negotiation's",
  'Hiring Appraisers',
  'Learning from experts based of category',
  'More',
]

export const AR_MEASUREMENT_TOOLS_OPTIONS = [
  'Doors',
  'Windows',
  'Land / Map area',
]

export const PAYMENT_METHODS_OPTIONS = ['1. Cash', '2. Credit']

export const PAYMENT_METHODS_TREE: FilterTreeNode[] = [
  { label: '1. Cash' },
  {
    label: '2. Credit',
    children: [
      {
        label: '1. Slice® by FNBO',
        href: 'https://www.fnbo.com/pos-lending/slice',
      },
      { label: '2. Wisetack', href: 'https://www.wisetack.com' },
    ],
  },
]

export const PAYMENT_TERMS_OPTIONS = [
  '1. Before Service',
  '2. Half now, half after service',
  '3. After service',
]

export const REFERRAL_FILTER_OPTIONS = [
  'Yes — send',
  'Yes — receive',
  'Bring someone onboard (affiliate / free months)',
  'No referral',
]

export const MILE_RADIUS_OPTIONS = [
  '10 miles',
  '25 miles',
  '50 miles',
  '100 miles',
]

/* ─── Mortgage Consultant / Loan Executive (20+ categories) ─── */

export const INSTITUTION_OPTIONS = ['Bank', 'Brokerage']

export const PURCHASE_EXPERIENCE_TREE: FilterTreeNode[] = [
  { label: 'Experience' },
  { label: 'Repeat' },
  {
    label: 'First-Time',
    children: [{ label: 'FHA USDA' }, { label: 'VA' }],
  },
]

export const LOAN_EXPERIENCE_TREE: FilterTreeNode[] = [
  {
    label: 'From Where',
    children: [{ label: 'From Broker' }, { label: 'From Bank' }],
  },
]

export const WHICH_SERVICE_TREE: FilterTreeNode[] = [
  {
    label: "Refinance Way's",
    children: [
      { label: 'Cash-Out' },
      { label: 'Pay Interest' },
      { label: 'Buy Another Property' },
      { label: 'HELOC' },
    ],
  },
  { label: "Purchase Way's" },
]

/** Mortgage Fields — Commercial first, Residential nearly last. */
export const MORTGAGE_FIELD_TREE: FilterTreeNode[] = [
  {
    label: 'Commercial',
    children: [
      { label: 'Retail' },
      {
        label:
          'Mixed-use (connected to the residential filter as well of mixed-use)',
      },
    ],
  },
  {
    label: 'Multi-unit with fcred because of higher and best use',
    children: [
      { label: "4+ unit's" },
      {
        label: "Sky-scraper's",
        children: [
          { label: 'Office' },
          { label: 'Living' },
          { label: 'Hospitality' },
          { label: "Hotel's" },
          { label: "Motel's" },
          { label: 'Mobile home park' },
        ],
      },
    ],
  },
  {
    label: 'Industrial',
    children: [
      { label: 'Factories' },
      { label: "Fabrication's" },
      { label: 'Warehouse' },
      { label: "Distribution's" },
      { label: 'Junk yards' },
    ],
  },
  {
    label: 'Agriculture',
    children: [
      { label: "Crop's" },
      { label: 'Livestock' },
      {
        label: "Acreage (connected to other; and all other field's)",
      },
    ],
  },
  {
    label: 'Residential',
    children: [
      { label: 'House' },
      {
        label: "-4 unit's",
        children: [{ label: "Condo's" }],
      },
    ],
  },
  {
    label: 'Other',
    children: [
      { label: 'Land' },
      { label: 'Mixed-use' },
      { label: 'Water-front' },
      { label: "Hills-mountrain's" },
      {
        label: 'Acreage',
        children: [{ label: 'Land developement' }],
      },
      { label: "Business'es" },
    ],
  },
]

export const MORTGAGE_PROPERTY_CONDITION_OPTIONS = [
  'New Construction',
  'Renovations',
  'TLC Distressed Properties',
  'Run Down',
  'Burned',
]

export const MORTGAGE_VACANCY_OPTIONS = [
  'Owner Occupied',
  'Non-Owner Occupied',
  'Tenant Occupied',
  'Vacant',
  'None',
]

export const MORTGAGE_TITLE_OPTIONS = [
  'Sole Ownership',
  'Tenancy In Common',
  'Joint Tenancy',
  'Tenancy By The Entirety',
  'Community Property With Right Of Survivorship',
  'Corporate Ownership',
  'Partnership Ownership',
]

export const MORTGAGE_SALE_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Standard; Or Free And Clear (Traditional)' },
  { label: 'Loan; Deed, Or Note Remaining' },
  {
    label: 'Lien',
    children: [
      { label: 'Loan' },
      { label: 'Purchase' },
      { label: 'Refinance' },
      { label: 'Contractor' },
      { label: 'Short Sale' },
      { label: 'Pre-Foreclosure' },
      { label: 'Foreclosure' },
      { label: 'Auction' },
      { label: 'REO' },
    ],
  },
]

export const MORTGAGE_GOV_AGENCIES_OPTIONS = [
  'HUD',
  'FBI',
  'ICE',
  'DEA',
]

export const CHARGE_TREE: FilterTreeNode[] = [
  {
    label: 'Front Ex.: 1%, 2%, O',
    children: [{ label: "Front; No More Than 2 Point's Example" }],
  },
  {
    label:
      'Back O, 1%, 2%, + (More Traditionally With Hard Money, Commercial, Etcetera, Other Than Residential)',
    children: [
      { label: "Back; No More Than 2 Points Example No Limit's" },
    ],
  },
  { label: "Doesn't Matter" },
]

export const INCOME_OPTIONS = ['Stated', 'Non-Stated', "Doesn't Matter"]

export const DTI_OPTIONS = [
  'Under 36%',
  '36% – 43%',
  '43% – 50%',
  'Over 50%',
  "Doesn't Matter",
]

export const LTV_OPTIONS = [
  'Under 80%',
  '80% – 90%',
  '90% – 95%',
  'Over 95%',
  "Doesn't Matter",
]

export const LOAN_TYPES_OPTIONS = [
  'Conventional',
  'Investor; Hard Money',
  'Jumbo',
  'Conforming',
  'Non-Conf',
  'Water-Front',
  'Itin',
  'New Construction',
  "Hill's-Mountain's",
]

export const LOAN_RATE_TYPE_OPTIONS = ['Fixed', 'ARM']

export const PREPAYMENT_PENALTY_OPTIONS = ['Yes', 'No']

export const TIME_DURATION_OPTIONS = [
  "Month's (Traditionally With Hard Money, Re-Fi (He-Loc, Etc.))",
  'Year (Traditionally With Hard Money, Re-Fi (He-Loc, Etc.))',
  "Year's (Traditionally With Hard Money, Re-Fi (He-Loc, Etc.))",
  '5 Years',
  "30-45 Year's",
]

export const LENGTH_TO_CLOSE_OPTIONS = [
  "5 Day's (Hard Money, Investor Loan's)",
  "30-45 Day's",
]

export const CREDIT_CHECK_TREE: FilterTreeNode[] = [
  {
    label: "Credit Score's",
    children: [
      { label: '500+' },
      { label: '580-620' },
      { label: '620-740' },
      { label: '740+' },
    ],
  },
]

export function splitCsv(value: string): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

export function joinCsv(values: string[]): string {
  return values.join(', ')
}

export function collectTreeLabels(nodes: FilterTreeNode[]): string[] {
  return nodes.flatMap((node) => [
    node.label,
    ...(node.children ? collectTreeLabels(node.children) : []),
  ])
}

/** Backward-compatible flat aliases (ServiceFiltersDrawer) */
export const AGENT_NESTED_OPTIONS = AGENT_TYPE_TREE.map((n) => n.label)
export const AGENT_REAL_ESTATE_OPTIONS =
  AGENT_TYPE_TREE.find((n) => n.label === 'Real Estate')?.children?.map(
    (n) => n.label,
  ) ?? []
export const BROKER_NESTED_OPTIONS = BROKER_TYPE_TREE.map((n) => n.label)
export const CROWDFUNDING_NESTED_OPTIONS = CROWDFUNDING_TYPE_TREE.map(
  (n) => n.label,
)
export const LAWN_NESTED_OPTIONS = LAWN_TYPE_TREE.map((n) => n.label)
export const FLOORING_INDOOR_OPTIONS =
  FLOORING_TYPE_TREE.find((n) => n.label === 'Indoor')?.children?.map(
    (n) => n.label,
  ) ?? []
export const FLOORING_OUTDOOR_OPTIONS =
  FLOORING_TYPE_TREE.find((n) => n.label === 'Outdoor')?.children?.map(
    (n) => n.label,
  ) ?? []
