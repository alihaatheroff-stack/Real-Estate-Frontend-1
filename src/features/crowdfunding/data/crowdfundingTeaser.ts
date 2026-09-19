export type CrowdfundingTeaserIcon = 'Target' | 'Landmark' | 'Building2' | 'ShieldCheck'

export const CROWDFUNDING_TEASER_ITEMS: {
  icon: CrowdfundingTeaserIcon
  title: string
  text: string
}[] = [
  {
    icon: 'Target',
    title: 'Pledge',
    text: 'Signal demand for faith-aligned recreational projects before offerings go live.',
  },
  {
    icon: 'Landmark',
    title: 'Fund',
    text: 'Track legal and Reg A+ progress toward qualified investment opportunities.',
  },
  {
    icon: 'Building2',
    title: 'Build',
    text: 'Back venues designed for community impact — not speculative noise.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Comply',
    text: 'Interest lists only until SEC approval. Not an offer to sell securities.',
  },
]
