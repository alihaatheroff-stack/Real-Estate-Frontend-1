export type NetworkPreviewIcon = 'Users' | 'MessagesSquare' | 'FileText' | 'Newspaper'

export const NETWORK_PREVIEW_ITEMS: {
  icon: NetworkPreviewIcon
  title: string
  text: string
}[] = [
  {
    icon: 'Users',
    title: 'Groups',
    text: 'Find your tribe by strategy, geography, or role and stay deal-focused.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Forums',
    text: 'Threaded strategy talks with clear topics — not scattered group chaos.',
  },
  {
    icon: 'FileText',
    title: 'Articles',
    text: 'Long-form insights, case studies, and market takes from people in the field.',
  },
  {
    icon: 'Newspaper',
    title: 'Newsfeed',
    text: 'Deal-oriented posts from trades, investors, and PSPs — not endless scrolling.',
  },
]
