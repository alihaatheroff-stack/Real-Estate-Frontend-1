import type { ModulePlatformRow } from '@/components/layout/ModulePlatformMenu'

const MODULES = ['Referral', 'Crowdfund', 'Network', 'Shop'] as const

function withDemoSummary(summary: string, demo: boolean) {
  return demo ? `Demo: ${summary}` : summary
}

export function buildMessagePlatforms(demo = false): ModulePlatformRow[] {
  return [
    {
      id: 'referrals',
      label: 'Referral',
      summary: withDemoSummary('2 people messaged you', demo),
      timeAgo: '2 Min',
      unreadCount: demo ? 0 : 1,
      items: [
        {
          id: 'r1',
          title: 'Aisha Rahman',
          subtitle: 'New referral match ready for review in Fresno.',
          timeAgo: '2m',
          avatarSrc: '/images/profile/F_1.jpg',
        },
        {
          id: 'r2',
          title: 'Jordan Blake',
          subtitle: 'Can you take this buyer intro this week?',
          timeAgo: '1h',
          avatarSrc: '/images/profile/m1.jpg',
        },
      ],
    },
    {
      id: 'crowdfunding',
      label: 'Crowdfund',
      summary: withDemoSummary('3 people messaged you', demo),
      timeAgo: '5h',
      unreadCount: demo ? 0 : 3,
      items: [
        {
          id: 'c1',
          title: 'Sofia Ramirez',
          subtitle: 'Pledge update on the Visalia recreational project.',
          timeAgo: '5h',
          avatarSrc: '/images/profile/F_2.jpg',
        },
        {
          id: 'c2',
          title: 'Ethan Cole',
          subtitle: 'Investor Q&A starts Friday — want the invite?',
          timeAgo: '6h',
          avatarSrc: '/images/profile/m2.jpg',
        },
      ],
    },
    {
      id: 'network',
      label: 'Network',
      summary: withDemoSummary('2 people messaged you', demo),
      timeAgo: '35m',
      unreadCount: demo ? 0 : 2,
      items: [
        {
          id: 'n1',
          title: 'Marcus Webb',
          subtitle: 'New forum reply in your Groups thread.',
          timeAgo: '35m',
          avatarSrc: '/images/profile/m3.jpg',
        },
        {
          id: 'n2',
          title: 'Maya Chen',
          subtitle: 'Someone requested to connect on Network.',
          timeAgo: '2h',
          avatarSrc: '/images/avatars/avatar-12.jpg',
        },
      ],
    },
    {
      id: 'shop',
      label: 'Shop',
      summary: withDemoSummary('1 person messaged you', demo),
      timeAgo: '1d',
      unreadCount: demo ? 0 : 1,
      items: [
        {
          id: 's1',
          title: 'RE Shop Support',
          subtitle: 'Your order was shipped — tracking is ready.',
          timeAgo: '1d',
          avatarSrc: '/images/avatars/avatar-5.jpg',
        },
      ],
    },
  ]
}

export function buildNotificationPlatforms(demo = false): ModulePlatformRow[] {
  return MODULES.map((label, index) => {
    const counts = [2, 1, 3, 1]
    const times = ['1h', '3h', '12m', '2d']
    return {
      id: label.toLowerCase(),
      label,
      summary: withDemoSummary(
        `${counts[index]} ${counts[index] === 1 ? 'alert' : 'alerts'} for you`,
        demo,
      ),
      timeAgo: times[index],
      unreadCount: demo ? 0 : counts[index],
      items: [
        {
          id: `${label}-1`,
          title: demo ? `Example ${label} alert` : `${label} update`,
          subtitle: demo
            ? `Demo notification for ${label} — sign in to get live alerts.`
            : `New activity in ${label} needs your attention.`,
          timeAgo: times[index],
          avatarSrc: '/images/profile/F_1.jpg',
        },
        {
          id: `${label}-2`,
          title: demo ? `Sample ${label} reminder` : `${label} reminder`,
          subtitle: demo
            ? `Example reminder content for ${label}.`
            : `Follow up on your latest ${label} activity.`,
          timeAgo: '1d',
          avatarSrc: '/images/profile/m1.jpg',
        },
      ],
    }
  })
}

export function buildCallsPlatforms(demo = false): ModulePlatformRow[] {
  return MODULES.map((label, index) => {
    const counts = [1, 2, 1, 0]
    const times = ['10m', '2h', '1d', '4d']
    return {
      id: label.toLowerCase(),
      label,
      summary: withDemoSummary(
        counts[index] === 0
          ? 'No recent calls'
          : `${counts[index]} ${counts[index] === 1 ? 'call' : 'calls'} scheduled`,
        demo,
      ),
      timeAgo: times[index],
      unreadCount: demo ? 0 : counts[index],
      items:
        counts[index] === 0
          ? [
              {
                id: `${label}-empty`,
                title: demo ? 'Demo call slot' : 'No calls yet',
                subtitle: demo
                  ? `Example ${label} call preview for guests.`
                  : `Schedule a ${label} call when you are ready.`,
                timeAgo: times[index],
              },
            ]
          : [
              {
                id: `${label}-1`,
                title: demo ? `Demo ${label} call` : `${label} video call`,
                subtitle: demo
                  ? `Example upcoming call in ${label}.`
                  : `Upcoming video session for ${label}.`,
                timeAgo: times[index],
                avatarSrc: '/images/profile/m2.jpg',
              },
            ],
    }
  })
}

const FAVORITE_PLATFORM_IDS = ['referral', 'crowdfunding', 'network', 'shop'] as const

export function buildFavoritesPlatforms(demo = false): ModulePlatformRow[] {
  return MODULES.map((label, index) => {
    const counts = [3, 2, 4, 1]
    const times = ['20m', '6h', '1d', '3d']
    return {
      id: FAVORITE_PLATFORM_IDS[index],
      label,
      summary: withDemoSummary(
        `${counts[index]} saved ${counts[index] === 1 ? 'item' : 'items'}`,
        demo,
      ),
      timeAgo: times[index],
      unreadCount: 0,
      items: [
        {
          id: `${label}-fav-1`,
          title: demo ? `Demo favorite in ${label}` : `Saved ${label} profile`,
          subtitle: demo
            ? `Example favorite for ${label} — sign in to keep your list.`
            : `You saved this from ${label}.`,
          timeAgo: times[index],
          avatarSrc: '/images/profile/F_2.jpg',
        },
        {
          id: `${label}-fav-2`,
          title: demo ? `Sample ${label} save` : `${label} shortlist`,
          subtitle: demo
            ? `Demo shortlist entry for ${label}.`
            : `Added to your ${label} favorites.`,
          timeAgo: '2d',
          avatarSrc: '/images/profile/F3.jpg',
        },
      ],
    }
  })
}

export function buildOrdersPlatforms(demo = false): ModulePlatformRow[] {
  return MODULES.map((label, index) => {
    const counts = [2, 1, 1, 2]
    const times = ['45m', '4h', '2d', '5d']
    return {
      id: label.toLowerCase(),
      label,
      summary: withDemoSummary(
        `${counts[index]} ${counts[index] === 1 ? 'order' : 'orders'} active`,
        demo,
      ),
      timeAgo: times[index],
      unreadCount: demo ? 0 : Math.min(counts[index], 2),
      items: [
        {
          id: `${label}-o1`,
          title: demo ? `Demo ${label} order` : `${label} service order`,
          subtitle: demo
            ? `Example order in ${label} — sign in for live status.`
            : `In progress · ${label} marketplace order.`,
          timeAgo: times[index],
          avatarSrc: '/images/stock/photo-1450101499163-c8848c66ca85.jpg',
        },
        {
          id: `${label}-o2`,
          title: demo ? `Sample ${label} booking` : `${label} booking`,
          subtitle: demo
            ? `Demo booking preview for ${label}.`
            : `Awaiting confirmation in ${label}.`,
          timeAgo: '3d',
          avatarSrc: '/images/stock/photo-1560518883-ce09059eeffa.jpg',
        },
      ],
    }
  })
}

export function platformUnreadTotal(platforms: ModulePlatformRow[]) {
  return platforms.reduce((sum, p) => sum + p.unreadCount, 0)
}
