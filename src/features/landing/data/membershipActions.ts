export type MembershipActionIcon = 'Zap' | 'UserPlus' | 'Link2'

export const MEMBERSHIP_ACTIONS: {
  icon: MembershipActionIcon
  title: string
  text: string
  cta: string
}[] = [
  {
    icon: 'Zap',
    title: 'Upgrade membership',
    text: 'Unlock deeper filters, awards visibility, and priority placement.',
    cta: 'Upgrade',
  },
  {
    icon: 'UserPlus',
    title: 'Invite someone',
    text: 'Bring a trusted PSP or client into RE Network with your intro.',
    cta: 'Invite',
  },
  {
    icon: 'Link2',
    title: 'Affiliate link',
    text: 'Share your personal link and track referrals from your network.',
    cta: 'Copy link',
  },
]
