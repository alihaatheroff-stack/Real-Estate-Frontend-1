export type MessagePlatformId =
  | 'referrals'
  | 'crowdfunding'
  | 'network'
  | 'shop'

export type DummyInboxThread = {
  id: string
  name: string
  handle: string
  preview: string
  timeAgo: string
  avatarSrc: string
  online?: boolean
  unreadCount?: number
}

export type DummyInboxPlatform = {
  id: MessagePlatformId
  label: string
  peopleCount: number
  timeAgo: string
  unreadCount: number
  threads: DummyInboxThread[]
}

export const DUMMY_INBOX_PLATFORMS: DummyInboxPlatform[] = [
  {
    id: 'referrals',
    label: 'Referral',
    peopleCount: 2,
    timeAgo: '2 Min',
    unreadCount: 1,
    threads: [
      {
        id: 'r1',
        name: 'Aisha Rahman',
        handle: '@aisha.psp',
        preview: 'New referral match ready for review in Fresno.',
        timeAgo: '2m',
        avatarSrc: '/images/profile/F_1.jpg',
        unreadCount: 1,
        online: true,
      },
      {
        id: 'r2',
        name: 'Jordan Blake',
        handle: '@jblake_mortgage',
        preview: 'Can you take this buyer intro this week?',
        timeAgo: '1h',
        avatarSrc: '/images/profile/m1.jpg',
      },
    ],
  },
  {
    id: 'crowdfunding',
    label: 'Crowdfund',
    peopleCount: 3,
    timeAgo: '5h',
    unreadCount: 3,
    threads: [
      {
        id: 'c1',
        name: 'Sofia Ramirez',
        handle: '@sofia.shots',
        preview: 'Pledge update on the Visalia recreational project.',
        timeAgo: '5h',
        avatarSrc: '/images/profile/F_2.jpg',
        unreadCount: 2,
        online: true,
      },
      {
        id: 'c2',
        name: 'Ethan Cole',
        handle: '@ethan.inspect',
        preview: 'Investor Q&A starts Friday — want the invite?',
        timeAgo: '6h',
        avatarSrc: '/images/profile/m2.jpg',
        unreadCount: 1,
      },
      {
        id: 'c3',
        name: 'Priya Nair',
        handle: '@priya.invest',
        preview: 'Shared the comps spreadsheet for the multi-unit.',
        timeAgo: '1d',
        avatarSrc: '/images/profile/F3.jpg',
        online: true,
      },
    ],
  },
  {
    id: 'network',
    label: 'Network',
    peopleCount: 2,
    timeAgo: '35m',
    unreadCount: 2,
    threads: [
      {
        id: 'n1',
        name: 'Marcus Webb',
        handle: '@marcus.appraise',
        preview: 'New forum reply in your Groups thread.',
        timeAgo: '35m',
        avatarSrc: '/images/profile/m3.jpg',
        unreadCount: 2,
      },
      {
        id: 'n2',
        name: 'Maya Chen',
        handle: '@maya.cre',
        preview: 'Someone requested to connect on Network.',
        timeAgo: '2h',
        avatarSrc: '/images/avatars/avatar-12.jpg',
        online: true,
      },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    peopleCount: 1,
    timeAgo: '1d',
    unreadCount: 1,
    threads: [
      {
        id: 's1',
        name: 'RE Shop Support',
        handle: '@shop.support',
        preview: 'Your order was shipped — tracking is ready.',
        timeAgo: '1d',
        avatarSrc: '/images/avatars/avatar-5.jpg',
        unreadCount: 1,
      },
    ],
  },
]

export const INBOX_UNREAD_TOTAL = DUMMY_INBOX_PLATFORMS.reduce(
  (sum, platform) => sum + platform.unreadCount,
  0,
)

/** @deprecated Prefer DUMMY_INBOX_PLATFORMS */
export const DUMMY_INBOX_THREADS: DummyInboxThread[] = DUMMY_INBOX_PLATFORMS.flatMap(
  (platform) => platform.threads,
)
