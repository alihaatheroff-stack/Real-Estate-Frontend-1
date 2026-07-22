import { PATHS } from '@/app/router/paths'

export const SITE = {
  name: 'RE Network',
  tagline: 'Where Property Connections Come Alive',
  description:
    'Referrals, crowdfunding, and professional networking built for property service providers.',
} as const

export const MARKETING_NAV = [
  { label: 'Referrals', href: PATHS.referrals, hasDropdown: true },
  { label: 'Crowdfunding', href: PATHS.crowdfunding },
  { label: 'Network', href: PATHS.networkFeed },
  { label: 'About', href: PATHS.about },
  { label: 'Contact', href: PATHS.contact },
] as const

/** Matches Wix “1. REFERRAL'S” hover menu, mapped to app routes */
export const REFERRALS_MENU = [
  { label: 'Service Results', href: PATHS.results },
  { label: 'Profile Results', href: PATHS.profileResults },
  { label: 'Service Selected', href: '/referrals/services/s1' },
  { label: 'Profile', href: '/referrals/providers/p1' },
  { label: 'Employer Results', href: PATHS.employerResults },
  { label: 'Dashboard', href: PATHS.dashboard },
  { label: 'Index', href: PATHS.referrals },
] as const

export const FOOTER_LINKS = {
  account: [
    { label: 'Sign In', href: PATHS.signIn },
    { label: 'Register as Provider', href: PATHS.registerPsp },
    { label: 'Register as Customer', href: PATHS.registerCustomer, soon: true },
    { label: 'Post / Receive Offers', href: PATHS.postOffer },
  ],
  legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
} as const
