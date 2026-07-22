import type { Employer, EmployerPosition, EmployerProject } from '@/entities/employer/types'
import type { Review } from '@/entities/provider/types'

export const EMPLOYER_CATEGORY_OPTIONS = [
  { label: 'Brokerage', value: 'brokerage' },
  { label: 'Property Management', value: 'property-management' },
  { label: 'Development', value: 'development' },
  { label: 'Mortgage & Finance', value: 'mortgage-finance' },
  { label: 'Legal & Title', value: 'legal-title' },
  { label: 'Architecture & Design', value: 'architecture-design' },
  { label: 'Construction & Trade', value: 'construction-trade' },
  { label: 'Marketing & Media', value: 'marketing-media' },
] as const

export const EMPLOYER_LOCATION_OPTIONS = [
  { label: 'Boston', value: 'boston' },
  { label: 'Florida', value: 'florida' },
  { label: 'Los Angeles', value: 'los-angeles' },
  { label: 'Miami', value: 'miami' },
  { label: 'New York', value: 'new-york' },
  { label: 'Fresno', value: 'fresno' },
  { label: 'Clovis', value: 'clovis' },
] as const

const CATEGORY_LABEL: Record<string, string> = {
  brokerage: 'Brokerage',
  'property-management': 'Property Management',
  development: 'Development',
  'mortgage-finance': 'Mortgage & Finance',
  'legal-title': 'Legal & Title',
  'architecture-design': 'Architecture & Design',
  'construction-trade': 'Construction & Trade',
  'marketing-media': 'Marketing & Media',
}

type EmployerSeed = {
  id: string
  name: string
  logoInitials: string
  logoColor: string
  logoUrl?: string
  coverImage?: string
  tagline: string
  category: string
  extraCategories?: string[]
  city: string
  state: string
  rating: number
  reviewCount: number
  openProjects: number
  foundedYear: number
  employees: string
  about: string
  aboutExtra?: string
  whoWeAre?: string
  whatWeDo?: string
  projectTitles?: [string, string?]
  positionTitles?: [string, string?]
}

function slugEmail(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@example.com`
}

const EXTRA_PROJECT_TEMPLATES: Array<{
  title: string
  category: string
  skills: string[]
  budgetMin: number
  budgetMax: number
  budgetType: 'Fixed' | 'Hourly'
  postedAgo: string
  proposals: number
  description: string
}> = [
  {
    title: 'Virtual tour + photo package for new listing',
    category: 'Marketing & Media',
    skills: ['Photography', 'Drone', 'Editing'],
    budgetMin: 75,
    budgetMax: 150,
    budgetType: 'Fixed',
    postedAgo: '3 days ago',
    proposals: 2,
    description:
      'Need a clean media set for a new residential listing, including stills and a short walkthrough edit.',
  },
  {
    title: 'Comp book and pricing recommendation',
    category: 'Brokerage',
    skills: ['Market Analysis', 'Comps', 'Presentation'],
    budgetMin: 35,
    budgetMax: 55,
    budgetType: 'Hourly',
    postedAgo: '5 days ago',
    proposals: 4,
    description:
      'Build a short comparable sales package and pricing recommendation for a mid-market property.',
  },
  {
    title: 'Lease abstract for retail suite',
    category: 'Legal & Title',
    skills: ['Contracts', 'Research', 'Summary Writing'],
    budgetMin: 45,
    budgetMax: 90,
    budgetType: 'Fixed',
    postedAgo: '1 week ago',
    proposals: 1,
    description:
      'Summarize key lease terms, options, and dates into a one-page abstract for internal review.',
  },
  {
    title: 'Social campaign for open-house weekend',
    category: 'Digital Marketing',
    skills: ['Social Media', 'Copywriting', 'Ads'],
    budgetMin: 20,
    budgetMax: 40,
    budgetType: 'Hourly',
    postedAgo: '2 weeks ago',
    proposals: 6,
    description:
      'Plan and schedule posts plus light paid boost for a weekend open-house event.',
  },
]

function defaultProjects(
  id: string,
  city: string,
  categoryLabel: string,
  titles: [string, string?] = [
    'Listing coordinator for multi-unit portfolio',
    'Market research for investor package',
  ],
): EmployerProject[] {
  const [first, second] = titles
  const list: EmployerProject[] = [
    {
      id: `${id}-proj-1`,
      title: first,
      city,
      category: categoryLabel,
      postedAgo: '2 weeks ago',
      proposals: 3,
      description:
        'Looking for a detail-oriented partner to support listing prep, comps, and outreach for our active inventory.',
      skills: ['Market Analysis', 'Listing Prep', 'CRM', 'Client Communication'],
      budgetMin: 29,
      budgetMax: 59,
      budgetType: 'Fixed',
    },
  ]
  if (second) {
    list.push({
      id: `${id}-proj-2`,
      title: second,
      city,
      category: categoryLabel,
      postedAgo: '1 month ago',
      proposals: 5,
      description:
        'Need concise investor-facing research and packaging for a mixed-use opportunity in our pipeline.',
      skills: ['Research', 'Underwriting', 'Presentation'],
      budgetMin: 40,
      budgetMax: 80,
      budgetType: 'Hourly',
    })
  }

  EXTRA_PROJECT_TEMPLATES.forEach((template, index) => {
    list.push({
      id: `${id}-proj-${index + 3}`,
      title: template.title,
      city,
      category: template.category,
      postedAgo: template.postedAgo,
      proposals: template.proposals,
      description: template.description,
      skills: template.skills,
      budgetMin: template.budgetMin,
      budgetMax: template.budgetMax,
      budgetType: template.budgetType,
    })
  })

  return list
}

const EXTRA_POSITION_TEMPLATES: Array<{
  title: string
  category: string
  employmentType: string
  salaryMin: number
  salaryMax: number
  salaryPeriod: EmployerPosition['salaryPeriod']
  experience: string
  industry: string
  qualification: string
}> = [
  {
    title: 'Showing Assistant',
    category: 'Brokerage',
    employmentType: 'Part Time',
    salaryMin: 280,
    salaryMax: 320,
    salaryPeriod: 'month',
    experience: 'Fresh',
    industry: 'Management',
    qualification: 'Associate Degree',
  },
  {
    title: 'Marketing Coordinator',
    category: 'Digital Marketing',
    employmentType: 'Full Time',
    salaryMin: 420,
    salaryMax: 480,
    salaryPeriod: 'month',
    experience: '2 Year',
    industry: 'Seo',
    qualification: 'Bachelor Degree',
  },
  {
    title: 'Junior Underwriter',
    category: 'Mortgage & Finance',
    employmentType: 'Internship',
    salaryMin: 18,
    salaryMax: 22,
    salaryPeriod: 'hour',
    experience: '1 Year',
    industry: 'Finance',
    qualification: 'Bachelor Degree',
  },
  {
    title: 'Site Superintendent',
    category: 'Construction & Trade',
    employmentType: 'Freelance',
    salaryMin: 500,
    salaryMax: 600,
    salaryPeriod: 'week',
    experience: '5 Year',
    industry: 'Development',
    qualification: 'Certificate',
  },
]

function defaultPositions(
  id: string,
  city: string,
  companyCategory: string,
  titles: [string, string?] = ['Transaction Coordinator', 'Junior Analyst'],
): EmployerPosition[] {
  const categoryLabel = CATEGORY_LABEL[companyCategory] ?? 'Brokerage'
  const [first, second] = titles
  const list: EmployerPosition[] = [
    {
      id: `${id}-job-1`,
      title: first,
      salaryMin: 350,
      salaryMax: 380,
      salaryPeriod: 'month',
      category: categoryLabel,
      employmentType: 'Temporary',
      city,
      experience: '2 Year',
      industry: 'Management',
      qualification: 'Bachelor Degree',
    },
  ]
  if (second) {
    list.push({
      id: `${id}-job-2`,
      title: second,
      salaryMin: 400,
      salaryMax: 450,
      salaryPeriod: 'month',
      category: categoryLabel,
      employmentType: 'Contract',
      city,
      experience: '1 Year',
      industry: 'Finance',
      qualification: 'Associate Degree',
    })
  }

  EXTRA_POSITION_TEMPLATES.forEach((template, index) => {
    list.push({
      id: `${id}-job-${index + 3}`,
      title: template.title,
      salaryMin: template.salaryMin,
      salaryMax: template.salaryMax,
      salaryPeriod: template.salaryPeriod,
      category: template.category,
      employmentType: template.employmentType,
      city,
      experience: template.experience,
      industry: template.industry,
      qualification: template.qualification,
    })
  })

  return list
}

function defaultReviews(rating: number): Review[] {
  return [
    {
      id: 'er1',
      author: 'Jordan Lee',
      rating: Math.max(1, Math.round(rating) || 4),
      date: 'November 10, 2024',
      comment:
        'Clear communication and a professional team. Project scope was well defined and payments were on time.',
    },
  ]
}

function buildEmployer(seed: EmployerSeed): Employer {
  const categoryLabel = CATEGORY_LABEL[seed.category] ?? seed.category
  const categories = [categoryLabel, ...(seed.extraCategories ?? [])]
  const projects = defaultProjects(seed.id, seed.city, categoryLabel, seed.projectTitles)
  const positions = defaultPositions(
    seed.id,
    seed.city,
    seed.category,
    seed.positionTitles,
  )

  return {
    id: seed.id,
    name: seed.name,
    logoInitials: seed.logoInitials,
    logoColor: seed.logoColor,
    logoUrl: seed.logoUrl,
    coverImage: seed.coverImage,
    tagline: seed.tagline,
    category: seed.category,
    categories,
    city: seed.city,
    state: seed.state,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    openProjects: projects.length,
    foundedYear: seed.foundedYear,
    employees: seed.employees,
    email: slugEmail(seed.name),
    phone: '(555) 123-4567',
    about:
      seed.about +
      ' Over the years we have built a reputation for clear communication, careful underwriting, and partnerships that last beyond a single transaction. Our team works side by side with agents, investors, and specialists so every listing, project, or placement moves forward with the right people and the right process.',
    aboutExtra:
      seed.aboutExtra ??
      'We believe great real estate outcomes come from preparation and trust. That means thorough market research, honest timelines, and a referral culture where every partner is set up to succeed. From first conversation to closing, we stay available, document decisions carefully, and keep owners and collaborators informed at every step. Whether you are posting a short project or hiring for an open role, you can expect the same professional standards we bring to our own deals.',
    whoWeAre:
      seed.whoWeAre ??
      'We are operators, advisors, and builders who came together because the industry needed a more collaborative way to work. Our people bring field experience from brokerage, development, lending, and property operations — not just theory. That mix helps us understand what freelancers and specialists need on a job, and what companies need to stay competitive. We hire carefully, mentor generously, and treat every engagement as a chance to strengthen our network across the region.',
    whatWeDo:
      seed.whatWeDo ??
      'We publish projects and open positions for coordinators, analysts, marketers, designers, and trade professionals who want meaningful real estate work. Day to day that can mean listing support, research packages, media production, lease abstracts, or on-site coordination. We also invest in clear scopes, fair budgets, and timely feedback so contributors can do their best work. If you are ready to collaborate with a company that values craft and community, explore our projects and roles — we would love to work with you.',
    projects,
    positions,
    reviews: defaultReviews(seed.rating),
  }
}

export const EMPLOYERS: Employer[] = [
  buildEmployer({
    id: 'e1',
    name: 'Valley Realty Group',
    logoInitials: 'VR',
    logoColor: '#1B6B4F',
    tagline: 'Southern California brokerage & referrals',
    category: 'brokerage',
    extraCategories: ['Residential'],
    city: 'Los Angeles',
    state: 'CA',
    rating: 4.0,
    reviewCount: 1,
    openProjects: 1,
    foundedYear: 1998,
    employees: '30-50',
    about:
      'Commercial and residential brokerage serving Southern California with a strong focus on referral partnerships.',
    projectTitles: ['Listing support for Westside inventory'],
    positionTitles: ['Buyer Agent Assistant', 'Marketing Coordinator'],
  }),
  buildEmployer({
    id: 'e2',
    name: 'Harbor Capital Partners',
    logoInitials: 'HC',
    logoColor: '#1E3A5F',
    tagline: 'Development & investor relations',
    category: 'development',
    city: 'New York',
    state: 'NY',
    rating: 5.0,
    reviewCount: 1,
    openProjects: 0,
    foundedYear: 2005,
    employees: '50-100',
    about: 'Mixed-use development and investor relations across the Northeast.',
    positionTitles: ['Acquisitions Analyst', 'Project Manager'],
  }),
  buildEmployer({
    id: 'e3',
    name: 'Summit Property Mgmt',
    logoInitials: 'SP',
    logoColor: '#0F766E',
    tagline: 'Multifamily & retail operations',
    category: 'property-management',
    city: 'New York',
    state: 'NY',
    rating: 5.0,
    reviewCount: 1,
    openProjects: 0,
    foundedYear: 1992,
    employees: '100-200',
    about: 'Full-service multifamily and retail property management.',
    positionTitles: ['Property Accountant', 'Leasing Specialist'],
  }),
  buildEmployer({
    id: 'e4',
    name: 'Pacific Title Advisors',
    logoInitials: 'PT',
    logoColor: '#334155',
    tagline: 'Title, escrow & closings',
    category: 'legal-title',
    city: 'New York',
    state: 'NY',
    rating: 3.5,
    reviewCount: 2,
    openProjects: 1,
    foundedYear: 1988,
    employees: '20-30',
    about: 'Title, escrow, and closing coordination for complex deals.',
    projectTitles: ['Escrow package review for portfolio sale'],
    positionTitles: ['Escrow Officer', 'Title Examiner'],
  }),
  buildEmployer({
    id: 'e5',
    name: 'Blueprint Studio RE',
    logoInitials: 'BS',
    logoColor: '#B45309',
    tagline: 'Architecture for adaptive reuse',
    category: 'architecture-design',
    city: 'New York',
    state: 'NY',
    rating: 4.0,
    reviewCount: 1,
    openProjects: 1,
    foundedYear: 2010,
    employees: '10-20',
    about: 'Architecture and interior design for adaptive reuse projects.',
    projectTitles: ['Concept package for warehouse conversion'],
    positionTitles: ['Junior Architect', 'Interior Designer'],
  }),
  buildEmployer({
    id: 'e6',
    name: 'Coastline Mortgage Co',
    logoInitials: 'CM',
    logoColor: '#0369A1',
    tagline: 'Commercial lending partners',
    category: 'mortgage-finance',
    city: 'Los Angeles',
    state: 'CA',
    rating: 5.0,
    reviewCount: 1,
    openProjects: 0,
    foundedYear: 2001,
    employees: '30-50',
    about: 'Commercial lending and refinance packages for investors.',
    positionTitles: ['Loan Processor', 'Underwriting Assistant'],
  }),
  buildEmployer({
    id: 'e7',
    name: 'Forge Build Partners',
    logoInitials: 'FB',
    logoColor: '#9A3412',
    tagline: 'Tenant improvements & GC',
    category: 'construction-trade',
    city: 'New York',
    state: 'NY',
    rating: 0,
    reviewCount: 0,
    openProjects: 1,
    foundedYear: 2015,
    employees: '20-30',
    about: 'General contracting for tenant improvements and light industrial.',
    projectTitles: ['TI bid set for retail suite'],
    positionTitles: ['Site Superintendent', 'Estimator'],
  }),
  buildEmployer({
    id: 'e8',
    name: 'Listing Lab Media',
    logoInitials: 'LL',
    logoColor: '#7C3AED',
    tagline: 'Listing media & campaigns',
    category: 'marketing-media',
    city: 'New York',
    state: 'NY',
    rating: 0,
    reviewCount: 0,
    openProjects: 1,
    foundedYear: 2018,
    employees: '10-20',
    about: 'Listing media, drone, and campaign creative for brokerages.',
    projectTitles: ['Drone + photo package for luxury listing'],
    positionTitles: ['Video Editor', 'Social Media Lead'],
  }),
  buildEmployer({
    id: 'e9',
    name: 'Central Valley Homes',
    logoInitials: 'CV',
    logoColor: '#15803D',
    tagline: 'Central Valley brokerage',
    category: 'brokerage',
    city: 'Fresno',
    state: 'CA',
    rating: 4.6,
    reviewCount: 18,
    openProjects: 3,
    foundedYear: 1995,
    employees: '50-100',
    about: 'Residential and small commercial brokerage across the Central Valley.',
    projectTitles: ['Open house support for Clovis listings', 'Buyer tour scheduling'],
    positionTitles: ['Showing Assistant', 'Transaction Coordinator'],
  }),
  buildEmployer({
    id: 'e10',
    name: 'Miami Shore Estates',
    logoInitials: 'MS',
    logoColor: '#0E7490',
    tagline: 'Waterfront luxury brokerage',
    category: 'brokerage',
    extraCategories: ['Lifestyle'],
    city: 'Miami',
    state: 'FL',
    rating: 4.8,
    reviewCount: 9,
    openProjects: 2,
    foundedYear: 2008,
    employees: '20-30',
    about: 'Luxury residential and waterfront brokerage.',
    projectTitles: ['Lifestyle content for waterfront listing', 'Private showing coordination'],
    positionTitles: ['Luxury Listing Assistant', 'Client Concierge'],
  }),
  buildEmployer({
    id: 'e11',
    name: 'Beacon Legal Group',
    logoInitials: 'BL',
    logoColor: '#1E40AF',
    tagline: 'Real estate counsel',
    category: 'legal-title',
    city: 'Boston',
    state: 'MA',
    rating: 4.2,
    reviewCount: 6,
    openProjects: 0,
    foundedYear: 1985,
    employees: '30-50',
    about: 'Real estate counsel for acquisitions and joint ventures.',
    positionTitles: ['Paralegal – Real Estate', 'Contracts Associate'],
  }),
  buildEmployer({
    id: 'e12',
    name: 'Clovis Asset Care',
    logoInitials: 'CA',
    logoColor: '#BE185D',
    tagline: 'HOA & rental portfolios',
    category: 'property-management',
    city: 'Clovis',
    state: 'CA',
    rating: 4.4,
    reviewCount: 11,
    openProjects: 2,
    foundedYear: 2003,
    employees: '10-20',
    about: 'HOA and rental portfolio management for local owners.',
    projectTitles: ['HOA board packet preparation', 'Turnover inspection checklist'],
    positionTitles: ['Community Manager', 'Maintenance Coordinator'],
  }),
]

export function getEmployerById(id: string) {
  return EMPLOYERS.find((employer) => employer.id === id)
}

export function categoryLabel(value: string) {
  return CATEGORY_LABEL[value] ?? value
}
