import { PATHS } from '@/app/router/paths'

export const REFERRALS_MENU = [
  { label: 'Service Results', href: PATHS.results },
  { label: 'Profile Results', href: PATHS.profileResults },
  { label: 'Service Selected', href: '/referrals/services/s1' },
  { label: 'Profile', href: '/referrals/providers/p1' },
  { label: 'Employer Results', href: PATHS.employerResults },
  { label: 'Dashboard', href: PATHS.dashboard },
] as const

/** Crowdfunding dropdown — mirrors Referrals subpage pattern */
export const CROWDFUNDING_MENU = [
  { label: 'Explore Priority Index', href: PATHS.crowdfunding },
  { label: 'LCRE Crowdfunding', href: PATHS.lcreCrowdfunding },
] as const

/** About dropdown — Contact lives under About, not as its own top-level nav item */
export const ABOUT_MENU = [
  { label: 'Advertisement', href: PATHS.advertise },
  { label: 'About', href: PATHS.about },
  { label: 'Contact', href: PATHS.contact },
] as const

export const MARKETING_NAV = [
  { label: 'Referral', href: PATHS.referrals, hasDropdown: true, menuOnly: true },
  { label: 'Crowdfund', href: PATHS.crowdfunding, hasDropdown: true },
  { label: 'Network', href: PATHS.networkFeed },
  { label: 'Shop', href: PATHS.shop },
  { label: 'About', href: PATHS.about, hasDropdown: true },
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
