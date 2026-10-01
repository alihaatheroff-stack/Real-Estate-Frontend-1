export type HeaderTourStep = {
  id: string
  /** Matches `data-tour-id` on the header control. Omit for the final centered card. */
  targetId?: string
  title: string
  body: string
  /** Lucide icon key used in the tour card illustration. */
  icon:
    | 'newspaper'
    | 'pen'
    | 'star'
    | 'video'
    | 'learn'
    | 'messages'
    | 'bell'
    | 'heart'
    | 'package'
    | 'dashboard'
    | 'user'
    | 'bot'
    | 'sparkles'
}

export const HEADER_TOUR_STEPS: readonly HeaderTourStep[] = [
  {
    id: 'news',
    targetId: 'header-news',
    title: 'News & Updates',
    body: 'Stay on top of platform announcements, market updates, and member news from here.',
    icon: 'newspaper',
  },
  {
    id: 'writing',
    targetId: 'header-writing',
    title: 'Post',
    body: 'Create Post so that PSPs can send you offers.',
    icon: 'pen',
  },
  {
    id: 'advertise',
    targetId: 'header-advertise',
    title: 'Advertise',
    body: 'Promote your services across the network with placements that match your goals.',
    icon: 'star',
  },
  {
    id: 'calls',
    targetId: 'header-calls',
    title: 'Calls',
    body: 'See scheduled video and voice calls across modules, and jump into the right conversation.',
    icon: 'video',
  },
  {
    id: 'learn',
    targetId: 'header-learn',
    title: 'Learn',
    body: 'Open learning resources and guides that help you get more from the RE Network.',
    icon: 'learn',
  },
  {
    id: 'messages',
    targetId: 'header-messages',
    title: 'Messages',
    body: 'Your inbox lives here — messages from clients, providers, and network contacts.',
    icon: 'messages',
  },
  {
    id: 'notifications',
    targetId: 'header-notifications',
    title: 'Notifications',
    body: 'Alerts for activity that needs your attention: replies, invites, orders, and more.',
    icon: 'bell',
  },
  {
    id: 'favorites',
    targetId: 'header-favorites',
    title: 'Favorites',
    body: 'Save profiles, posts, and opportunities into folders so you can return to them quickly.',
    icon: 'heart',
  },
  {
    id: 'orders',
    targetId: 'header-orders',
    title: 'Orders',
    body: 'Track active and past orders across marketplace and service modules.',
    icon: 'package',
  },
  {
    id: 'dashboard',
    targetId: 'header-dashboard',
    title: 'Dashboard',
    body: 'Your control center for account activity, listings, and day-to-day management.',
    icon: 'dashboard',
  },
  {
    id: 'profile',
    targetId: 'header-profile',
    title: 'Your Profile',
    body: 'Open your account menu for profile settings, billing, support, and sign out.',
    icon: 'user',
  },
  {
    id: 'assistant',
    targetId: 'landing-assistant',
    title: 'Chat Assistant',
    body: 'Meet your LCRE Assistant — the friendly robot in the corner. Tap it anytime to ask questions about getting started, payments, membership, and more.',
    icon: 'bot',
  },
  {
    id: 'finish',
    title: "You're on your own now",
    body: 'That covers the main tools. Explore at your own pace — if you need any help, chat with our assistant or contact us anytime.',
    icon: 'sparkles',
  },
]
