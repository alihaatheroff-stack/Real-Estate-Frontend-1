import type { Provider, Review, Service } from '@/entities/provider/types'

export const PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Maya Chen',
    title: 'Commercial Real Estate Agent',
    type: 'professional',
    specialty: 'Commercial leasing & sales',
    city: 'Fresno',
    state: 'CA',
    zip: '93728',
    lat: 36.7378,
    lng: -119.7871,
    radiusMiles: 50,
    rating: 4.9,
    reviewCount: 128,
    salesVolume: 42000000,
    dealsClosed: 86,
    referralShare: 50,
    learningIncluded: true,
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'I help owners and investors place capital into commercial and mixed-use assets across the Central Valley — with optional deal shadowing for referred partners.',
    languages: ['English', 'Mandarin'],
    englishLevel: 'Fluent',
    hourlyRateMin: 75,
    hourlyRateMax: 120,
    joinedDate: 'Jan 2019',
    skills: ['Commercial Leasing', 'Market Analysis', 'LOI Drafting', 'Deal Shadowing'],
    gender: 'Female',
    email: 'maya.chen@example.com',
    phone: '(559) 555-0142',
    projectSuccess: 86,
    totalServices: 3,
    completedServices: 72,
    inQueueServices: 4,
    education: [
      {
        period: '2008–2012',
        degree: 'B.S. Real Estate Finance',
        school: 'UC Berkeley',
        description: 'Focused on commercial asset valuation and capital markets.',
      },
      {
        period: '2012–2014',
        degree: 'M.S. Urban Planning',
        school: 'USC',
        description: 'Studied mixed-use development and regional growth strategy.',
      },
    ],
    experience: [
      {
        period: '2019 – Present',
        role: 'Commercial Agent',
        company: 'Central Valley Realty Group',
        description: 'Tenant and landlord representation for retail, office, and light industrial assets.',
      },
      {
        period: '2015 – 2019',
        role: 'Associate Broker',
        company: 'Valley Commercial Partners',
        description: 'Supported leasing campaigns and investor outreach for mid-market portfolios.',
      },
    ],
    awards: [
      {
        year: '2023',
        title: 'Top Commercial Producer',
        description: 'Recognized for highest closed commercial volume in the Central Valley region.',
      },
      {
        year: '2021',
        title: 'Mentor of the Year',
        description: 'Awarded for deal-shadowing programs that onboarded new referral partners.',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Jordan Blake',
    title: 'Mortgage Consultant',
    type: 'professional',
    specialty: 'Purchase & refinance strategy',
    city: 'Clovis',
    state: 'CA',
    zip: '93611',
    lat: 36.8252,
    lng: -119.7029,
    radiusMiles: 40,
    rating: 4.8,
    reviewCount: 94,
    salesVolume: 18000000,
    dealsClosed: 210,
    referralShare: 30,
    learningIncluded: false,
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'Credit-aware mortgage guidance for residential and light commercial buyers. Fast pre-approvals and transparent fee structures.',
    languages: ['English', 'Spanish'],
    englishLevel: 'Native Or Bilingual',
    hourlyRateMin: 45,
    hourlyRateMax: 65,
    joinedDate: 'Mar 2020',
    skills: ['Pre-Approval', 'Refinance', 'Credit Strategy', 'Rate Shopping'],
    projectSuccess: 210,
    totalServices: 2,
    completedServices: 198,
    inQueueServices: 6,
  },
  {
    id: 'p3',
    name: 'Elena Ruiz',
    title: 'Transaction Coordinator',
    type: 'professional',
    specialty: 'Escrow-ready closings',
    city: 'Fresno',
    state: 'CA',
    zip: '93721',
    lat: 36.7489,
    lng: -119.7698,
    radiusMiles: 35,
    rating: 5,
    reviewCount: 67,
    salesVolume: 0,
    dealsClosed: 312,
    referralShare: 25,
    learningIncluded: true,
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'I keep contracts clean from acceptance to keys. Ideal for agents who want white-glove coordination and training for new team members.',
    languages: ['English', 'Spanish'],
    englishLevel: 'Fluent',
    hourlyRateMin: 35,
    hourlyRateMax: 50,
    joinedDate: 'Jun 2018',
    skills: ['Escrow Coordination', 'Timeline Management', 'Agent Training', 'Disclosure Review'],
    projectSuccess: 312,
    totalServices: 2,
    completedServices: 305,
    inQueueServices: 3,
  },
  {
    id: 'p4',
    name: 'Marcus Holt',
    title: 'Flooring Specialist',
    type: 'trade',
    specialty: 'Indoor tile & hardwood',
    city: 'Madera',
    state: 'CA',
    zip: '93637',
    lat: 36.9613,
    lng: -120.0607,
    radiusMiles: 45,
    rating: 4.7,
    reviewCount: 151,
    salesVolume: 0,
    dealsClosed: 420,
    referralShare: 40,
    learningIncluded: false,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'Residential and light commercial flooring installs with per-sq-ft pricing and photo documentation for property managers.',
    languages: ['English'],
    englishLevel: 'Fluent',
    hourlyRateMin: 25,
    hourlyRateMax: 40,
    joinedDate: 'Aug 2017',
    skills: ['Tile Install', 'Hardwood', 'LVP', 'Commercial Flooring'],
    projectSuccess: 420,
    totalServices: 2,
    completedServices: 415,
    inQueueServices: 8,
  },
  {
    id: 'p5',
    name: 'Aisha Rahman',
    title: 'Real Estate Attorney',
    type: 'professional',
    specialty: 'Contracts & disputes',
    city: 'Fresno',
    state: 'CA',
    zip: '93710',
    lat: 36.8229,
    lng: -119.7677,
    radiusMiles: 60,
    rating: 4.9,
    reviewCount: 41,
    salesVolume: 0,
    dealsClosed: 190,
    referralShare: 35,
    learningIncluded: true,
    image:
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'Transaction counsel for agents, investors, and PSPs — including mentorship on risk flags before you send a referral.',
    languages: ['English', 'Urdu'],
    englishLevel: 'Professional',
    hourlyRateMin: 150,
    hourlyRateMax: 250,
    joinedDate: 'Sep 2016',
    skills: ['Contract Review', 'Risk Analysis', 'Dispute Resolution', 'Referral Terms'],
    projectSuccess: 190,
    totalServices: 2,
    completedServices: 185,
    inQueueServices: 2,
  },
  {
    id: 'p6',
    name: 'Noah Patel',
    title: 'Property Appraiser',
    type: 'professional',
    specialty: 'Residential & multi-unit',
    city: 'Visalia',
    state: 'CA',
    zip: '93277',
    lat: 36.3302,
    lng: -119.2921,
    radiusMiles: 55,
    rating: 4.6,
    reviewCount: 73,
    salesVolume: 0,
    dealsClosed: 540,
    referralShare: 25,
    learningIncluded: false,
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    verified: false,
    about:
      'Independent appraisals with clear comps and turnaround SLAs for lenders and referral partners.',
    languages: ['English', 'Hindi'],
    englishLevel: 'Fluent',
    hourlyRateMin: 55,
    hourlyRateMax: 75,
    joinedDate: 'Feb 2015',
    skills: ['Residential Appraisal', 'Multi-Unit', 'USPAP', 'Comp Analysis'],
    projectSuccess: 540,
    totalServices: 2,
    completedServices: 532,
    inQueueServices: 5,
  },
  {
    id: 'p7',
    name: 'David Kim',
    title: 'Home Inspector',
    type: 'trade',
    specialty: 'Pre-purchase & investor inspections',
    city: 'Fresno',
    state: 'CA',
    zip: '93704',
    lat: 36.8092,
    lng: -119.8121,
    radiusMiles: 40,
    rating: 4.8,
    reviewCount: 112,
    salesVolume: 0,
    dealsClosed: 890,
    referralShare: 20,
    learningIncluded: true,
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'Certified home inspections with same-day reports, drone roof scans, and investor-friendly punch lists for flips and rentals.',
    languages: ['English', 'Korean'],
    englishLevel: 'Fluent',
    hourlyRateMin: 40,
    hourlyRateMax: 55,
    joinedDate: 'Apr 2018',
    skills: ['Home Inspection', 'Roof Scan', 'Investor Reports', 'Same-Day Delivery'],
    projectSuccess: 890,
    totalServices: 1,
    completedServices: 880,
    inQueueServices: 7,
  },
  {
    id: 'p8',
    name: 'Sarah Lopez',
    title: 'Property Insurance Specialist',
    type: 'professional',
    specialty: 'Landlord & investor coverage',
    city: 'Clovis',
    state: 'CA',
    zip: '93619',
    lat: 36.8485,
    lng: -119.6856,
    radiusMiles: 50,
    rating: 4.7,
    reviewCount: 58,
    salesVolume: 0,
    dealsClosed: 340,
    referralShare: 30,
    learningIncluded: false,
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    verified: true,
    about:
      'Tailored property insurance for landlords, flippers, and small commercial owners — including umbrella and liability bundles.',
    languages: ['English', 'Spanish'],
    englishLevel: 'Native Or Bilingual',
    hourlyRateMin: 50,
    hourlyRateMax: 70,
    joinedDate: 'Nov 2019',
    skills: ['Landlord Insurance', 'Liability Bundles', 'Investor Coverage', 'Claims Support'],
    projectSuccess: 340,
    totalServices: 1,
    completedServices: 335,
    inQueueServices: 3,
  },
]

export const SERVICES: Service[] = [
  {
    id: 's1',
    providerId: 'p1',
    title: 'Commercial lease placement within 50 miles',
    category: 'Real Estate Agent',
    subcategory: 'Leasing',
    field: 'Commercial',
    description:
      'End-to-end tenant or landlord representation for retail, office, and light industrial spaces — including market survey, tour coordination, and LOI support.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 48,
    startingPrice: 1500,
    badges: ['Referral Only', 'Learning Included'],
    featured: true,
    views: 4120,
    englishLevel: 'Fluent',
    packages: [
      {
        id: 's1b',
        name: 'Basic',
        price: 1500,
        deliveryDays: 14,
        description: 'Market survey + shortlist of 5 spaces.',
        includes: ['ZIP radius search', '5 property shortlist', 'Email support'],
      },
      {
        id: 's1s',
        name: 'Standard',
        price: 3200,
        deliveryDays: 21,
        description: 'Tours, negotiation support, and LOI draft.',
        includes: ['Everything in Basic', 'On-site tours', 'LOI draft', 'Deal shadowing call'],
      },
      {
        id: 's1p',
        name: 'Premium',
        price: 5800,
        deliveryDays: 30,
        description: 'Full representation through lease execution.',
        includes: ['Everything in Standard', 'Attorney intro', 'Closing checklist', 'Mentorship session'],
      },
    ],
  },
  {
    id: 's9',
    providerId: 'p1',
    title: 'Mixed-use investment package & underwriting review',
    category: 'Real Estate Agent',
    subcategory: 'Consulting',
    field: 'Commercial',
    description:
      'Underwrite mixed-use opportunities with rent roll analysis, comparable sales, and a clear go/no-go memo for referral partners and investors.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 31,
    startingPrice: 890,
    badges: ['Referral Only', 'Learning Included'],
    featured: true,
    views: 2280,
    englishLevel: 'Fluent',
    packages: [
      {
        id: 's9b',
        name: 'Basic',
        price: 890,
        deliveryDays: 5,
        description: 'Desktop underwriting memo for one asset.',
        includes: ['Rent roll review', 'Comps snapshot', 'Written memo'],
      },
      {
        id: 's9s',
        name: 'Standard',
        price: 1650,
        deliveryDays: 10,
        description: 'Full underwriting with sensitivity scenarios.',
        includes: ['Everything in Basic', '3 scenarios', 'Partner walkthrough call'],
      },
      {
        id: 's9p',
        name: 'Premium',
        price: 2800,
        deliveryDays: 14,
        description: 'Investment package ready for capital partners.',
        includes: ['Everything in Standard', 'Pitch deck pages', 'Deal shadowing session'],
      },
    ],
  },
  {
    id: 's10',
    providerId: 'p1',
    title: 'Retail & office tour coordination for tenant reps',
    category: 'Real Estate Agent',
    subcategory: 'Leasing',
    field: 'Commercial',
    description:
      'Coordinate multi-stop tours, landlord outreach, and follow-up summaries so tenant clients can compare spaces without the logistics headache.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 22,
    startingPrice: 650,
    badges: ['50 Mile Radius'],
    views: 1840,
    englishLevel: 'Fluent',
    packages: [
      {
        id: 's10b',
        name: 'Basic',
        price: 650,
        deliveryDays: 7,
        description: 'Half-day tour of up to 4 spaces.',
        includes: ['Space shortlist', 'Tour day logistics', 'Photo notes'],
      },
      {
        id: 's10s',
        name: 'Standard',
        price: 1200,
        deliveryDays: 14,
        description: 'Full tour week with landlord Q&A.',
        includes: ['Everything in Basic', 'Landlord outreach', 'Comparison sheet'],
      },
      {
        id: 's10p',
        name: 'Premium',
        price: 2100,
        deliveryDays: 21,
        description: 'Tours plus LOI support for shortlisted spaces.',
        includes: ['Everything in Standard', 'LOI draft', 'Negotiation notes'],
      },
    ],
  },
  {
    id: 's2',
    providerId: 'p2',
    title: 'Mortgage strategy & pre-approval sprint',
    category: 'Mortgage Consultant',
    subcategory: 'Buying',
    field: 'Residential',
    description:
      'A focused consult to map financing options, stress-test budgets, and prepare a lender-ready package for purchase or refinance.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 62,
    startingPrice: 299,
    badges: ['50 Mile Radius'],
    featured: true,
    views: 3560,
    englishLevel: 'Native Or Bilingual',
    packages: [
      {
        id: 's2b',
        name: 'Basic',
        price: 299,
        deliveryDays: 3,
        description: '60-minute consult + written option summary.',
        includes: ['Budget review', 'Product options', 'Next-step checklist'],
      },
      {
        id: 's2s',
        name: 'Standard',
        price: 599,
        deliveryDays: 5,
        description: 'Pre-approval package prep with document checklist.',
        includes: ['Everything in Basic', 'Doc checklist', 'Lender intro'],
      },
      {
        id: 's2p',
        name: 'Premium',
        price: 999,
        deliveryDays: 7,
        description: 'Full coordination until conditional approval.',
        includes: ['Everything in Standard', 'Weekly updates', 'Rate watch'],
      },
    ],
  },
  {
    id: 's3',
    providerId: 'p3',
    title: 'White-glove transaction coordination',
    category: 'Transaction Coordinator',
    subcategory: 'Consulting',
    field: 'Residential',
    description:
      'From accepted offer to close — calendars, disclosures, and party communication handled so agents can focus on clients.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    rating: 5,
    reviewCount: 39,
    startingPrice: 450,
    badges: ['Learning Included'],
    packages: [
      {
        id: 's3b',
        name: 'Basic',
        price: 450,
        deliveryDays: 30,
        description: 'Single-transaction coordination.',
        includes: ['Timeline tracker', 'Party updates', 'Doc checklist'],
      },
      {
        id: 's3s',
        name: 'Standard',
        price: 750,
        deliveryDays: 45,
        description: 'Coordination + junior agent training notes.',
        includes: ['Everything in Basic', 'Training notes', 'Escrow liaison'],
      },
      {
        id: 's3p',
        name: 'Premium',
        price: 1200,
        deliveryDays: 60,
        description: 'Team playbook + live shadowing.',
        includes: ['Everything in Standard', 'Playbook PDF', '2 live sessions'],
      },
    ],
  },
  {
    id: 's4',
    providerId: 'p4',
    title: 'Indoor flooring install — per sq ft',
    category: 'Flooring',
    subcategory: 'Trade',
    field: 'Residential',
    description:
      'Tile and hardwood installs for homes and small commercial suites. Transparent per-sq-ft pricing with photo closeout.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 88,
    startingPrice: 4,
    badges: ['Trade', 'GPS Ready'],
    featured: true,
    views: 2840,
    englishLevel: 'Fluent',
    packages: [
      {
        id: 's4b',
        name: 'Basic',
        price: 4,
        deliveryDays: 5,
        description: 'Install only — materials supplied by client.',
        includes: ['Per sq ft install', 'Debris haul-away', 'Photo closeout'],
      },
      {
        id: 's4s',
        name: 'Standard',
        price: 7,
        deliveryDays: 7,
        description: 'Materials + install for mid-tier finishes.',
        includes: ['Materials', 'Install', '1 revision pass'],
      },
      {
        id: 's4p',
        name: 'Premium',
        price: 11,
        deliveryDays: 10,
        description: 'Premium finishes + evening slots.',
        includes: ['Premium materials', 'After-hours option', 'Warranty walkthrough'],
      },
    ],
  },
  {
    id: 's5',
    providerId: 'p5',
    title: 'Contract review for referral deals',
    category: 'Attorney',
    subcategory: 'Consulting',
    field: 'Mixed-Use',
    description:
      'Risk-focused review of purchase agreements, lease LOIs, and referral collaboration terms before you commit.',
    image:
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 27,
    startingPrice: 650,
    badges: ['Referral Only', 'Learning Included'],
    packages: [
      {
        id: 's5b',
        name: 'Basic',
        price: 650,
        deliveryDays: 3,
        description: 'Single document markup.',
        includes: ['Written markup', 'Risk summary', '30-min call'],
      },
      {
        id: 's5s',
        name: 'Standard',
        price: 1100,
        deliveryDays: 5,
        description: 'Two documents + negotiation notes.',
        includes: ['Everything in Basic', '2nd document', 'Negotiation talking points'],
      },
      {
        id: 's5p',
        name: 'Premium',
        price: 1800,
        deliveryDays: 7,
        description: 'Full deal counsel through signature.',
        includes: ['Everything in Standard', 'Unlimited email', 'Mentorship hour'],
      },
    ],
  },
  {
    id: 's6',
    providerId: 'p6',
    title: 'Residential appraisal with rush option',
    category: 'Appraiser',
    subcategory: 'Consulting',
    field: 'Residential',
    description:
      'USPAP-aligned residential and small multi-unit appraisals with clear comps and lender-friendly formatting.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    reviewCount: 54,
    startingPrice: 425,
    badges: ['Verified Radius'],
    views: 1920,
    englishLevel: 'Fluent',
    packages: [
      {
        id: 's6b',
        name: 'Basic',
        price: 425,
        deliveryDays: 7,
        description: 'Standard residential appraisal.',
        includes: ['Full report', 'Comp set', 'PDF delivery'],
      },
      {
        id: 's6s',
        name: 'Standard',
        price: 575,
        deliveryDays: 4,
        description: 'Rush turnaround.',
        includes: ['Everything in Basic', '4-day rush'],
      },
      {
        id: 's6p',
        name: 'Premium',
        price: 750,
        deliveryDays: 3,
        description: 'Rush + review call with referrer.',
        includes: ['Everything in Standard', 'Review call', 'Revision pass'],
      },
    ],
  },
  {
    id: 's7',
    providerId: 'p7',
    title: 'Full home inspection with same-day report',
    category: 'Home Inspector',
    subcategory: 'Trade',
    field: 'Residential',
    description:
      'Comprehensive pre-purchase inspections covering structure, roof, HVAC, plumbing, and electrical — with photo report delivered same day.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 112,
    startingPrice: 349,
    badges: ['Trade', 'Same-Day Report'],
    featured: true,
    views: 2680,
    englishLevel: 'Fluent',
    packages: [
      {
        id: 's7b',
        name: 'Basic',
        price: 349,
        deliveryDays: 1,
        description: 'Standard single-family inspection.',
        includes: ['Full inspection', 'Photo report', 'Same-day delivery'],
      },
      {
        id: 's7s',
        name: 'Standard',
        price: 449,
        deliveryDays: 1,
        description: 'Inspection + drone roof scan.',
        includes: ['Everything in Basic', 'Drone roof scan', 'Investor punch list'],
      },
      {
        id: 's7p',
        name: 'Premium',
        price: 599,
        deliveryDays: 1,
        description: 'Multi-unit or large property inspection.',
        includes: ['Everything in Standard', 'Multi-unit coverage', 'Re-inspection pass'],
      },
    ],
  },
  {
    id: 's8',
    providerId: 'p8',
    title: 'Landlord insurance quote & policy setup',
    category: 'Insurance',
    subcategory: 'Consulting',
    field: 'Residential',
    description:
      'Compare landlord and investor insurance options, bundle liability coverage, and bind policies for rentals, flips, and small portfolios.',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 58,
    startingPrice: 199,
    badges: ['50 Mile Radius'],
    views: 1540,
    englishLevel: 'Native Or Bilingual',
    packages: [
      {
        id: 's8b',
        name: 'Basic',
        price: 199,
        deliveryDays: 2,
        description: 'Single-property quote comparison.',
        includes: ['3 carrier quotes', 'Coverage summary', 'Email support'],
      },
      {
        id: 's8s',
        name: 'Standard',
        price: 349,
        deliveryDays: 3,
        description: 'Quote + policy binding for one property.',
        includes: ['Everything in Basic', 'Policy binding', 'Liability review'],
      },
      {
        id: 's8p',
        name: 'Premium',
        price: 599,
        deliveryDays: 5,
        description: 'Portfolio review for up to 5 properties.',
        includes: ['Everything in Standard', 'Portfolio audit', 'Umbrella options'],
      },
    ],
  },
]

export const SERVICE_FAQS = [
  {
    question: 'What payment methods are supported?',
    answer:
      'We accept major credit cards and ACH transfers. Invoices are issued after you select a package and confirm scope with the provider.',
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      'You may cancel before work begins for a full refund. After the provider starts, cancellation terms follow the package you selected.',
  },
  {
    question: 'How do I get a receipt for my purchase?',
    answer:
      'A receipt is emailed automatically after payment. You can also download invoices from your dashboard once booking is confirmed.',
  },
  {
    question: 'How do I get access after purchase?',
    answer:
      'After payment clears, the provider receives your booking details and will contact you within the stated response window to begin delivery.',
  },
] as const

const GALLERY_FALLBACKS = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
]

export function getMinDeliveryDays(service: Service) {
  return Math.min(...service.packages.map((pkg) => pkg.deliveryDays))
}

export function getServiceGallery(service: Service) {
  if (service.gallery?.length) return service.gallery
  return [service.image, ...GALLERY_FALLBACKS].slice(0, 4)
}

export function getServiceAddons(service: Service) {
  if (service.addons?.length) return service.addons
  return service.packages.slice(1).map((pkg) => ({
    id: pkg.id,
    title: `${pkg.name} upgrade (+${pkg.deliveryDays} days)`,
    description: pkg.description,
    price: Math.max(pkg.price - service.startingPrice, 0) || pkg.price,
    extraDays: pkg.deliveryDays,
  }))
}

export function getServiceProvidedList(service: Service) {
  if (service.servicesProvided?.length) return service.servicesProvided
  return service.packages[0]?.includes ?? []
}

export function getServiceTagGroups(service: Service) {
  if (service.tagGroups?.length) return service.tagGroups
  return [
    { label: 'Category', values: [service.category, service.subcategory] },
    { label: 'Field', values: [service.field] },
    {
      label: 'Delivery',
      values: [`From ${getMinDeliveryDays(service)} day(s)`],
    },
  ]
}

export function getRelatedServices(serviceId: string, limit = 4) {
  const current = getServiceById(serviceId)
  if (!current) return SERVICES.slice(0, limit)
  return SERVICES.filter((s) => s.id !== serviceId)
    .sort((a, b) => {
      const sameCategory = Number(b.category === current.category) - Number(a.category === current.category)
      if (sameCategory !== 0) return sameCategory
      return b.rating - a.rating
    })
    .slice(0, limit)
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Admin',
    rating: 4,
    date: 'November 9, 2022',
    comment:
      'Clear communication and the learning session after the referral was genuinely useful. Scope was exactly as described.',
    avatar: 'https://i.pravatar.cc/96?img=12',
  },
  {
    id: 'r2',
    author: 'Priya N.',
    rating: 5,
    date: 'February 12, 2026',
    comment: 'Felt like Fiverr-level packaging but built for real property work. Would hire again.',
    avatar: 'https://i.pravatar.cc/96?img=5',
  },
  {
    id: 'r3',
    author: 'Chris D.',
    rating: 4,
    date: 'January 3, 2026',
    comment: 'Strong within the 50-mile radius. Pricing packages made scope decisions easy.',
    avatar: 'https://i.pravatar.cc/96?img=33',
  },
]

export { REFERRAL_CATEGORIES } from '@/features/referrals/data/categories'

export function getProviderById(id: string) {
  return PROVIDERS.find((p) => p.id === id)
}

export function getServiceById(id: string) {
  return SERVICES.find((s) => s.id === id)
}

export function getServicesByProvider(providerId: string) {
  return SERVICES.filter((s) => s.providerId === providerId)
}

export function getProviderForService(service: Service) {
  return getProviderById(service.providerId)
}
