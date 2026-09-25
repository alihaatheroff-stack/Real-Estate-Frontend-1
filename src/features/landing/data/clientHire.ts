export type ClientHireBenefit = {
  title: string
  description: string
  image: string
}

export type ClientHireAward = {
  title: string
  subtitle: string
}

export const CLIENT_HIRE_HERO_IMAGE = '/images/hire/hero.jpg'
export const CLIENT_HIRE_VERIFIED_IMAGE = '/images/hire/verified.jpg'
export const CLIENT_HIRE_EDUCATION_IMAGE = '/images/hire/education.jpg'
export const CLIENT_HIRE_TOOLS_IMAGE = '/images/hire/measure-tools.jpg'
export const CLIENT_HIRE_PAYMENT_IMAGE = '/images/hire/payment-packets.jpg'
export const CLIENT_HIRE_SIDE_IMAGE = '/images/hire/site.jpg'

export const CLIENT_HIRE_BENEFITS: ClientHireBenefit[] = [
  {
    title: 'Payment Protection',
    description:
      'Your funds are held in escrow until work is completed to your satisfaction.',
    image: '/images/hire/payment-escrow.jpg',
  },
  {
    title: 'Verified Professionals',
    description:
      'All providers go through a rigorous vetting process and background checks.',
    image: '/images/hire/verified-pro.jpg',
  },
  {
    title: 'Local & Remote',
    description:
      'Find professionals nearby or work with experts from anywhere in the world.',
    image: '/images/hire/local-remote.jpg',
  },
  {
    title: 'GPS Navigation',
    description: 'Location-based search and matching.',
    image: '/images/hire/gps.jpg',
  },
  {
    title: 'Fast Response',
    description:
      'Most professionals respond within 24 hours with detailed proposals.',
    image: '/images/hire/fast-response.jpg',
  },
  {
    title: 'Transparent Pricing',
    description:
      "See upfront costs with no hidden fees. Only pay when you're satisfied.",
    image: '/images/hire/pricing-clear.jpg',
  },
]

export const CLIENT_HIRE_AWARDS: ClientHireAward[] = [
  { title: 'Best Freelance Platform 2024', subtitle: 'Tech Awards' },
  { title: 'Fastest Growing Marketplace', subtitle: 'Industry Report' },
  { title: 'Most Trusted by Professionals', subtitle: 'Customer Choice' },
  { title: 'Excellence in Service', subtitle: 'Business Excellence' },
]

export const CLIENT_EDUCATION_LINKS = [
  'Articles',
  'Forums',
  'Groups',
  "Soon: With Consent Pre-Recorded Convo's",
] as const

export const CLIENT_REAL_ESTATE_TOOLS = [
  'Measure',
  'Out-Doors',
  'In-Doors',
] as const

export const CLIENT_PAYMENT_PACKETS = [
  'Yearly Savings',
  'Monthly Savings',
  'Weekly Savings',
  'Daily Savings',
] as const

export const CLIENT_PAYMENT_META = ['Tier Selection', 'Payment Terms'] as const

export const CLIENT_TRUST_POINTS = [
  'Best sustainability standards on every hire',
  'Health and safety–minded verified providers',
  'Modern matching methods with GPS awareness',
  'Certified technicians and licensed trades',
] as const
