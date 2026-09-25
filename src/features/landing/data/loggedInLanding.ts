import { PATHS } from '@/app/router/paths'

export type NewsTabId = 'features' | 'referrals' | 'crowdfunding' | 'networking' | 'shop'

export type NewsBullet = {
  text: string
  children?: string[]
}

export type NewsTab = {
  id: NewsTabId
  label: string
  heading: string
  href?: string
  bullets: NewsBullet[]
}

export const NEWS_TABS: NewsTab[] = [
  {
    id: 'features',
    label: 'ALL:',
    heading: '',
    bullets: [
      {
        text: "GPS. Perhapp's previously you been second-guessing or delaying. Be Certained your PSP is on their way.",
      },
      {
        text: "Newbie Professional's and Tradespeople:",
        children: ['Reffer; while learning and getting paid.'],
      },
      {
        text: "Experienced Professional's and Tradespeople:",
        children: [
          "Experienced Professional's and Tradespeople See more of your benefit's here.",
        ],
      },
      { text: "Us compared to other's." },
    ],
  },
  {
    id: 'referrals',
    label: "1. REFERRAL'S:",
    heading: "Referral's:",
    href: PATHS.results,
    bullets: [
      { text: 'Deal closed this month' },
      { text: 'Deals closed this week' },
      { text: 'Deals closed this day' },
    ],
  },
  {
    id: 'crowdfunding',
    label: '2. CROWDFUNDING:',
    heading: 'Crowdfunding:',
    href: PATHS.crowdfunding,
    bullets: [
      { text: 'Track recreational project interest by jurisdiction.' },
      { text: "Review your investment's, high's, and low's." },
      { text: 'Follow CF# listings before offerings go live.' },
    ],
  },
  {
    id: 'networking',
    label: '3. NETWORKING:',
    heading: 'Networking:',
    href: PATHS.networkFeed,
    bullets: [
      { text: "Jump into forum's, group's, and deal-focused feeds." },
      { text: 'Greet new members and introduce your specialty.' },
      { text: "Follow hot topic's that turn into referrals and JV intros." },
    ],
  },
  {
    id: 'shop',
    label: '4. SHOP:',
    heading: 'Shop:',
    href: PATHS.shop,
    bullets: [
      { text: 'Tools, templates, and resources for PSP workflows.' },
      { text: 'Advertise placements and featured placements.' },
      { text: 'Order history and pending order tracking.' },
    ],
  },
]

export const MEMBER_ACTIVITY_TABS = [
  {
    id: 'recently-viewed',
    label: 'Recently viewed:',
    panelLabel: 'My recently viewed:',
  },
  {
    id: 'favorites',
    label: 'Saved/favorites:',
    panelLabel: 'My saved/favorites:',
  },
  {
    id: 'recommendations',
    label: 'Recommendations:',
    panelLabel: 'Recommendations for you:',
  },
  {
    id: 'think-tank',
    label: 'Think tank:',
    panelLabel: 'Think tank:',
  },
  {
    id: 'master-mind',
    label: 'Mastermind:',
    panelLabel: 'Mastermind:',
  },
] as const

export type MemberActivityTabId = (typeof MEMBER_ACTIVITY_TABS)[number]['id']

export const NETWORK_MEMBER_HUBS = [
  {
    id: 'forums',
    title: "My forum's",
    links: ['My post(s)', 'My saved', "I'm following", 'Followed by', 'My commented'],
  },
  {
    id: 'groups',
    title: "My group's",
    links: ['Joined', 'Suggested', 'Invites', 'Hosting'],
  },
  {
    id: 'articles',
    title: "My article's (blog's)",
    links: ['Published', 'Drafts', 'Saved', 'Following'],
  },
] as const

export const NETWORK_HOT_TOPICS = [
  {
    id: 'city-leader',
    title: 'Become a city leader',
    text: 'Own local deal flow and greet new members in your market.',
    image: '/images/landing/2.png',
  },
  {
    id: 'host-events',
    title: "Host event's",
    text: 'Run meetups that turn conversations into referrals and JV intros.',
    image: '/images/landing/5.png',
  },
  {
    id: 'improve-value',
    title: 'Improve value',
    text: 'Sharpen your profile, buy box, and verified credentials.',
    image: '/images/landing/3.png',
  },
] as const
