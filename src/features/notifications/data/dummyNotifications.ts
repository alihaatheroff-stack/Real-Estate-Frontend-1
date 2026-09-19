export type NotificationKind = 'order' | 'reminder' | 'offer' | 'message'

export type DummyNotification = {
  id: string
  kind: NotificationKind
  /** Bold lead (name or "Reminder:") */
  lead: string
  /** Rest of the sentence after the lead */
  body: string
  timeAgo: string
  unread?: boolean
  /** User photo; omit for system icons (reminder / offer) */
  avatarSrc?: string
  online?: boolean
  /** Right-side order thumbnail */
  thumbSrc?: string
  /** Right-side mail icon instead of thumb */
  showMail?: boolean
}

export const DUMMY_NOTIFICATIONS: DummyNotification[] = [
  {
    id: 'n1',
    kind: 'order',
    lead: 'Aisha Rahman',
    body: 'placed an order: Contract review for referral deals',
    timeAgo: '2d',
    avatarSrc: '/images/profile/F_1.jpg',
    online: true,
    thumbSrc: '/images/stock/photo-1450101499163-c8848c66ca85.jpg',
  },
  {
    id: 'n2',
    kind: 'reminder',
    lead: 'Reminder:',
    body: 'Complete your pending referral order with Jordan Blake',
    timeAgo: '2d',
    unread: true,
    showMail: true,
  },
  {
    id: 'n3',
    kind: 'order',
    lead: 'Jordan Blake',
    body: 'placed an order: Mortgage pre-approval package',
    timeAgo: '1 week',
    avatarSrc: '/images/profile/m1.jpg',
    online: true,
    thumbSrc: '/images/stock/photo-1560518883-ce09059eeffa.jpg',
  },
  {
    id: 'n4',
    kind: 'order',
    lead: 'Sofia Ramirez',
    body: 'placed an order: Property photography session',
    timeAgo: '1 week',
    avatarSrc: '/images/profile/F_2.jpg',
    thumbSrc: '/images/stock/photo-1600585154340-be6161a56a0c.jpg',
  },
  {
    id: 'n5',
    kind: 'offer',
    lead: 'Custom Offer',
    body: 'from Ethan Cole: Home inspection package — awaiting your reply',
    timeAgo: '3 weeks',
    unread: true,
    showMail: true,
  },
  {
    id: 'n6',
    kind: 'order',
    lead: 'Priya Nair',
    body: 'placed an order: Investment advisory consult',
    timeAgo: '3 weeks',
    avatarSrc: '/images/profile/F3.jpg',
    online: true,
    thumbSrc: '/images/stock/photo-1486406146926-c627a92ad1ab.jpg',
  },
  {
    id: 'n7',
    kind: 'message',
    lead: 'Marcus Webb',
    body: 'sent you a message about appraisal turnaround',
    timeAgo: '1 month',
    avatarSrc: '/images/profile/m3.jpg',
    showMail: true,
  },
]

export const UNREAD_NOTIFICATION_COUNT = DUMMY_NOTIFICATIONS.filter((n) => n.unread).length
