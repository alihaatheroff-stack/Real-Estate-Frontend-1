import { PATHS } from '@/app/router/paths'
import { RECREATIONAL_VENUES } from '@/features/crowdfunding/data/recreationalVenues'
import {
  BENEFIT_AUDIENCES,
  CROWDFUNDING_INTRO,
  CROWDFUNDING_QA,
  DIFFERENTIATORS,
  PLEDGE_SECTION,
} from '@/features/crowdfunding/data/loggedInCrowdfunding'
import { CROWDFUNDING_TEASER_ITEMS } from '@/features/crowdfunding/data/crowdfundingTeaser'

export const GUEST_CROWDFUNDING_HERO_IMAGE =
  RECREATIONAL_VENUES.find((v) => v.id === 'sports-complex')?.image ??
  RECREATIONAL_VENUES[0]?.image ??
  '/images/crowdfunding/07-188.jpg'

/** Keep the clearer CTA photo (previous ice-rink asset was blurry). */
export const GUEST_CROWDFUNDING_SIDE_IMAGE =
  RECREATIONAL_VENUES.find((v) => v.id === 'city-pool')?.image ??
  '/images/crowdfunding/25-city-pool.jpg'

export const GUEST_CROWDFUNDING_PLEDGE_IMAGE =
  RECREATIONAL_VENUES.find((v) => v.id === 'community-plaza')?.image ??
  '/images/crowdfunding/04-karla-rivera.jpg'

export const GUEST_CROWDFUNDING_HERO = {
  brand: 'LCREC',
  eyebrow: 'Life Coordination Real Estate Crowdfunding',
  greeting: 'Dear; visitor, potential investor and Property Service Provider (PSP).',
  welcome: 'Hello and welcome to Life Coordination Real Estate Crowdfunding (LCREC).',
  tagline: CROWDFUNDING_INTRO.headline,
  lead: CROWDFUNDING_INTRO.body,
  complimentaryLabel: 'LCREC is complimentary to:',
  complimentaryLines: [
    'LC Out-doors. for LCREC',
    'LC Careers for LCRER',
    'Acts 4:34-35 for LCREH',
    'LC Sphere. for LCREN',
    'LC Systems. for Character.',
  ],
  filterLabel: 'At LCREC filter; through:',
  filterValue: 'Community votes, pledges & recreational venues',
} as const

export const GUEST_CROWDFUNDING_STEPS = CROWDFUNDING_TEASER_ITEMS

/** Original first gallery set (same order as before). */
export const GUEST_CROWDFUNDING_VENUES = RECREATIONAL_VENUES.slice(0, 6)

export const GUEST_CROWDFUNDING_PLEDGE = PLEDGE_SECTION

export const GUEST_CROWDFUNDING_DIFFERENTIATORS = DIFFERENTIATORS

export const GUEST_CROWDFUNDING_BENEFITS = BENEFIT_AUDIENCES

export const GUEST_CROWDFUNDING_QA = CROWDFUNDING_QA

export const GUEST_CROWDFUNDING_CTA = {
  eyebrow: 'Ready to Crowdfund',
  title: 'Invest with purpose. Build legacy.',
  body: 'Join the interest list to signal demand for faith-aligned recreational projects — and be first when offerings go live after SEC qualification.',
  primaryLabel: 'Create an Account',
  primaryHref: PATHS.register,
  secondaryLabel: 'LCRE Crowdfunding',
  secondaryHref: PATHS.lcreCrowdfunding,
  signInLabel: 'Already a member? Sign in',
  signInHref: PATHS.signIn,
} as const

export const GUEST_CROWDFUNDING_SEC_NOTICE =
  'Not an offer to sell securities. All investment activity is contingent on SEC approval and offering documents.'
