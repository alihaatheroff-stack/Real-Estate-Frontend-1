export type MembershipPlan = {
  id: string
  price: string
  name: string
  description: string
  features: readonly string[]
  featured?: boolean
}

/** Tiers for RE Network: referrals, office, ads, and the full brokerage stack. */
export const MEMBERSHIP_PLANS: readonly MembershipPlan[] = [
  {
    id: 'basic',
    price: '$49',
    name: 'Basic',
    description: 'Get on the network with a profile and one service.',
    features: [
      '1 service listing',
      'Profile',
      'Referral marketplace',
      'Subscription maintenance',
    ],
  },
  {
    id: 'pro',
    price: '$99',
    name: 'Pro',
    description: 'Be found in search and place referrals between results.',
    features: [
      'Highlighted in search',
      'Customer profiles',
      'Between results',
      'Office associate discount',
    ],
    featured: true,
  },
  {
    id: 'premium',
    price: '$199',
    name: 'Premium',
    description: 'Advertise on the landing page, network, and crowdfunding.',
    features: [
      'Landing page banners',
      'Newsfeed, groups, and forums',
      'Articles and videos',
      'Crowdfunding ads',
      'Demographics and locations',
    ],
  },
  {
    id: 'enterprise',
    price: '$399',
    name: 'Enterprise',
    description: 'The office plan: team seats, tools, assistants, and every placement.',
    features: [
      'Office and affiliate seats',
      'All placements at a low rate',
      'Credit and background check',
      'Lead tools',
      'Virtual assistants',
    ],
  },
]
