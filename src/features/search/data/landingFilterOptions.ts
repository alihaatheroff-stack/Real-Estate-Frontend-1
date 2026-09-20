/** Landing hero filter options — from reexplained filter-s-comparison (Agent set) */

export type FilterTreeNode = {
  label: string
  children?: FilterTreeNode[]
  /** When set, renders as an external link instead of a checkbox. */
  href?: string
  /** Render children grouped under A…, B… letter headings. */
  groupByLetter?: boolean
}

/** A–Z PSP list (main rows) */
export const PSP_BY_LETTER: Record<string, string[]> = {
  A: [
    'Accountant',
    'Agent',
    'Appraiser',
    'Architect',
    "Asbesto's",
    "Attorney",
    "Worker's Comp",
  ],
  B: ['Broker', 'Bookkeeper', 'Builder'],
  C: [
    'Cleaner',
    'Concrete',
    'Contractor',
    'Construction',
    'Consultant',
    "Consultant's",
    'Crowdfunding',
  ],
  D: ['Developer (Also; see: Builder)'],
  E: ['Electrician', 'Escrow'],
  F: ['Flooring', 'Framer'],
  G: ['Gardening  (Also; see: Landscaping, Lawn Maintance)'],
  H: ['HVAC'],
  I: ['Investor'],
  J: ['Janitorial'],
  L: [
    'Landscaper',
    'Lawn [See; Yard]',
    'Loan',
    'Loan Executive',
    'Loan Originator',
    'Loan Processor',
  ],
  M: ['Mortgage', "Mover's"],
  P: [
    'Painter',
    'Pavement',
    'Pest',
    "Professional's",
    'Plumber',
    'Pool',
    'Pressure Washer',
  ],
  R: ['Real Estate', 'Roofing'],
  S: ['Sand-Blasting', 'Solar', 'Squat-Removal'],
  T: ['Taxes', 'Transaction Coordinator', 'Trash Bin Cleaner'],
  W: ['Wholesaler', 'Welder', 'Window Cleaner'],
}

/** Nested under Agent */
export const AGENT_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Escrow' },
  { label: 'Insurance' },
  { label: 'Leasing' },
  {
    label: 'Real Estate',
    children: [
      { label: 'Selling' },
      { label: 'Buying' },
      { label: 'Leasing' },
      { label: 'All' },
    ],
  },
]

export const BROKER_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Real Estate' },
  { label: 'Insurance' },
]

export const CROWDFUNDING_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Accreditation' },
  { label: 'Accredited' },
  { label: 'Non Accredited' },
]

export const FLOORING_TYPE_TREE: FilterTreeNode[] = [
  {
    label: 'Indoor',
    children: [{ label: 'Asphalt' }, { label: 'Tile' }],
  },
  {
    label: 'Outdoor',
    children: [
      { label: 'Asphalt' },
      { label: 'Concrete' },
      { label: 'Gravel' },
      { label: 'Rock' },
      { label: 'Stone' },
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

/** Parent PSP label → nested tree */
export const PSP_NESTED_TREES: Record<string, FilterTreeNode[]> = {
  Agent: AGENT_TYPE_TREE,
  Broker: BROKER_TYPE_TREE,
  Crowdfunding: CROWDFUNDING_TYPE_TREE,
  Flooring: FLOORING_TYPE_TREE,
  Investor: INVESTOR_TYPE_TREE,
  'Lawn [See; Yard]': LAWN_TYPE_TREE,
}

export const FIND_FILTER_OPTIONS = ['Service', 'Profile', 'Office']

/** Top-level representation (Buying details live in BUYING_TREE). */
export const REPRESENTATION_TOP_TREE: FilterTreeNode[] = [
  {
    label: 'Selling',
    children: [{ label: 'Sell-To-Buy' }],
  },
  { label: 'Buying' },
  { label: 'Mortgage' },
  { label: 'Leasing/Renting' },
  { label: 'Consulting' },
  { label: 'All of the above' },
]

/** Buying / mortgage options — shown when Representation includes Buying. */
export const BUYING_TREE: FilterTreeNode[] = [
  {
    label: 'Cash',
    children: [
      { label: "All cash: agent's" },
      { label: "Escrow officer's" },
    ],
  },
  {
    label: 'Credit',
    children: [{ label: "Mortgage consultant's filters" }],
  },
  { label: 'Crowdfunding' },
  {
    label: 'Buy-to-Sell',
    children: [
      { label: 'Cash' },
      { label: 'Owner Finance' },
      { label: 'Credit' },
      { label: 'Already Acquired Loan' },
      { label: 'Need Loan' },
    ],
  },
  { label: 'Other' },
  {
    label: 'Institution',
    children: [
      {
        label: 'Mortgage',
        children: [
          { label: 'Bank' },
          { label: 'Already Have' },
          { label: 'Crowdfunding' },
          {
            label: 'Accreditation',
            children: [
              { label: 'Non-Accredited' },
              { label: "Affiliate's" },
              { label: 'In-House' },
            ],
          },
        ],
      },
    ],
  },
]

/** Combined tree kept for drawers that still nest Buying under Representation. */
export const REPRESENTATION_TREE: FilterTreeNode[] = [
  { label: 'Selling' },
  { label: 'Sell-To-Buy' },
  { label: 'Leasing/Renting' },
  { label: 'Consulting' },
  { label: 'Buying', children: BUYING_TREE },
  { label: 'All of the above' },
]

export const PRICE_DEMOGRAPHY_OPTIONS = ['Luxury', 'Mid', 'Economic']

/** Top-level field options (sub-types live in FIELD_TREE children / SUB_FIELD). */
export const FIELD_TOP_OPTIONS = [
  'Commercial',
  'Multi-Unit',
  'Industrial',
  'Agriculture',
  'Residential',
  'Other',
  'All of the above',
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

          { label: 'Amusement Park' },
          { label: 'Bowling Alley ' },
          { label: 'Roller Rink ' },
          { label: 'Ice Rink ' },
          { label: 'Water-Park' },
          { label: 'Other' },
        ],
      },
      { label: "Business'es" },
      { label: 'Land' },

      { label: 'Other' },
    ],
  },
  {
    label: 'Multi-Unit',
    children: [
      { label: "Sky-Scraper's" },
      { label: 'Office' },
      { label: 'Living' },
      { label: 'Hospitality' },
      { label: "Hotel's" },
      { label: "Motel's" },
      { label: 'Mobile Home Park' },
      { label: 'Land' },
      { label: 'Other' },
    ],
  },
  {
    label: 'Industrial',
    groupByLetter: true,
    children: [
      { label: 'Factory' },
      { label: 'Warehouse' },
      { label: 'Land' },

      {
        label:
          "Distribution",
      },
      { label: 'Junk Yards' },
      { label: 'Other' },
    ],
  },
  {
    label: 'Agriculture',
    children: [
      { label: "Crop's" },
      { label: 'Livestock' },
      { label: "Land" },
      { label: 'Other' },
    ],
  },
  {
    label: 'Residential',
    children: [
      { label: 'House' },
      { label: "4 Unit's or Less (If more; see Multi-Unit)" },
      { label: "Condo's" },
      { label: 'Land' },

      { label: 'Other' },
    ],
  },
  {
    label: 'Other',
    children: [
      { label: 'Land' },
      { label: 'Mixed-Use' },
      { label: 'Water-Front' },
      { label: "Hills-Mountrain's" },
      { label: 'Acreage' },
      { label: 'Land Developement' },
      { label: 'All of the above' },
    ],
  },
  { label: 'All of the above' },
]

/** Sub-field trees keyed by top-level Field Option label. */
export const SUB_FIELD_BY_FIELD: Record<string, FilterTreeNode[]> = Object.fromEntries(
  FIELD_TREE.filter((node) => node.children?.length).map((node) => [
    node.label,
    node.children!,
  ]),
)

/** Flattened sub-field tree for when no field filter is set. */
export const SUB_FIELD_TREE: FilterTreeNode[] = FIELD_TREE.flatMap((node) =>
  node.children?.length
    ? [{
        label: node.label,
        children: node.children,
        groupByLetter: node.groupByLetter,
      }]
    : [],
)

/** Sub-fields for the currently selected Field Option labels. */
export function getSubFieldTree(selectedFields: string[]): FilterTreeNode[] {
  const fields = selectedFields.filter((f) => f !== 'All of the above')
  if (fields.length === 0 || selectedFields.includes('All of the above')) {
    return SUB_FIELD_TREE
  }
  return fields.flatMap((field) => {
    const match = FIELD_TREE.find((node) => node.label === field)
    const children = match?.children ?? SUB_FIELD_BY_FIELD[field]
    if (!children?.length) return []
    return [{
      label: field,
      children,
      groupByLetter: match?.groupByLetter,
    }]
  })
}

export const CLIENT_EXPERIENCE_TREE: FilterTreeNode[] = [
  {
    label: 'First-time Buyer',
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
    ],
  },
  { label: 'Repeat Seller-Buyer' },
  { label: 'Vacational' },
  { label: 'All of the above' },
]

export const PROPERTY_CONDITION_OPTIONS = [
  'New Construction',
  'Renovations',
  'TLC Distressed Properties',
  'Run down',
  'Burned',
  'All of the above',
]

export const VACANCY_OPTIONS = [
  'Tenant Occupied',
  'Owner Occupied',
  'Vacant',
  'All of the above',
]

export const TITLE_OPTIONS = [
  'Partnership ownership',
  'Joint tenancy',
  'Tenancy in common',
  'Sole ownership',
  'Tenancy by the entirety',
  'Community property with right of survivorship',
  'Corporate ownership',

  'All of the above',
]

export const SALE_TYPE_TREE: FilterTreeNode[] = [
  { label: 'Standard, Free, Clear, Traditional' },
  { label: 'Loan; deed, note remaining' },
  {
    label: 'Lien',
    children: [
      { label: 'Loan' },
      { label: 'Purchase' },
      { label: 'Refinance' },
      { label: 'Contractor.' },
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
  { label: 'REO' },
  { label: 'Auction' },
  { label: 'HUD' },
  { label: 'Open listing.' },
  {
    label: 'Gov agencies',
    children: [
      { label: 'HUD' },
      { label: 'FBI' },
      { label: 'ICE' },
      { label: 'DEA' },
      { label: 'Other' },
    ],
  },
  { label: 'All of the above.' },
]

export const GOV_AGENCIES_OPTIONS = [
  'HUD',
  'FBI',
  'ICE',
  'DEA',
  'Other',
]

export const YOUR_EXPERIENCE_OPTIONS = [
  "Expert experience based of sale's closed",
  'Mature',
  'Seasonal',
  'New',
]

export const CLIENT_MOTIVE_OPTIONS = [
  'A. Have too',
  'B. Eventually ',
  'C. Undecisive',
  'D. Wasting Time',
]

/** A–Z languages (same letter + indent pattern as PSP_BY_LETTER). */
export const LANGUAGE_BY_LETTER: Record<string, string[]> = {
  A: ['Arabic'],
  E: ['English'],
  F: ['French'],
  G: ['German', 'Gujarati'],
  H: ['Hindi'],
  J: ['Japanese'],
  K: ['Korean'],
  M: ['Mandarin'],
  O: ['Other'],
  P: ['Portuguese', 'Punjabi'],
  R: ['Russian'],
  S: ['Spanish'],
  T: ['Tagalog'],
  U: ['Urdu'],
  V: ['Vietnamese'],
}

export const LANGUAGE_SPOKEN_OPTIONS = Object.values(LANGUAGE_BY_LETTER).flat()

export const PERCENTAGE_SHARE_FILTER_OPTIONS = [
  'Zilch',
  '20%',
  '30%',
  '40%',
  '50%',
  'Other',
]

const WILLING_TO_TRAIN_TREE_LABELS = [
  'Yes; Recorded and contract documented',
  'Yes; Via live conference call (transparency) recorded and contract documented',
  'Reach out',
  'Any of the above',
]

export const PERCENTAGE_SHARE_TREE: FilterTreeNode[] = [
  {
    label: 'Are You willing to train',
    children: WILLING_TO_TRAIN_TREE_LABELS.map((label) => ({ label })),
  },
  {
    label: 'Percentage To Share',
    children: PERCENTAGE_SHARE_FILTER_OPTIONS.map((label) => ({ label })),
  },
]

export const FORM_OF_PAYMENT_OPTIONS = [
  'Direct Deposit',
  'Stripe',
  'PayPal',
  'Square',
  'Zelle',
  'Venmo',
  'CashApp',
  'Check',
  'Other',
]

/** Selecting one clears the others — each shows only its own detail fields. */
export const FORM_OF_PAYMENT_EXCLUSIVE_OPTIONS = [
  'Direct Deposit',
  'Stripe',
  'PayPal',
  'Square',
  'Zelle',
  'Venmo',
  'CashApp',
  'Check',
] as const

export const FORM_OF_PAYMENT_TREE: FilterTreeNode[] = [
  { label: 'Cash' },
  {
    label: 'Card',
    children: [{ label: 'Connect your Stripe account.' }],
  },
  {
    label: 'Finance',
    children: [
      {
        label:
          "Hearth",
      },
    ],
  },
]

export const FORM_OF_PAYMENT_DEFAULT = '[Default] Directly to Broker, Admin'

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
  'Yes — Send',
  'Yes — Receive',
  'Bring someone onboard (affiliate / free months)',
  'No referral',
]

export const MILE_RADIUS_OPTIONS = [
  '10 miles',
  '25 miles',
  '50 miles',
  '100 miles',
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

