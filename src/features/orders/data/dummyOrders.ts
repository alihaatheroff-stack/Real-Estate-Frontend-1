export type OrderStatus = 'in-progress' | 'completed' | 'cancelled'

export type DummyOrder = {
  id: string
  title: string
  providerName: string
  providerHandle: string
  thumbSrc: string
  status: OrderStatus
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const ORDER_STATUS_CLASS: Record<OrderStatus, string> = {
  'in-progress': 'text-[#4a73e8]',
  completed: 'text-[#1dbf73]',
  cancelled: 'text-[#95979d]',
}

export const DUMMY_ORDERS: DummyOrder[] = [
  {
    id: 'o1',
    title: 'Contract review for referral deals and lease addenda',
    providerName: 'Aisha Rahman',
    providerHandle: '@aisha.psp',
    thumbSrc: '/images/stock/photo-1450101499163-c8848c66ca85.jpg',
    status: 'in-progress',
  },
  {
    id: 'o2',
    title: 'Mortgage strategy & pre-approval sprint for buyer clients',
    providerName: 'Jordan Blake',
    providerHandle: '@jblake_mortgage',
    thumbSrc: '/images/stock/photo-1560518883-ce09059eeffa.jpg',
    status: 'in-progress',
  },
  {
    id: 'o3',
    title: 'Full home inspection with same-day report package',
    providerName: 'Ethan Cole',
    providerHandle: '@ethan.inspect',
    thumbSrc: '/images/stock/photo-1600585154340-be6161a56a0c.jpg',
    status: 'cancelled',
  },
  {
    id: 'o4',
    title: 'Mixed-use investment package & underwriting review',
    providerName: 'Priya Nair',
    providerHandle: '@priya.invest',
    thumbSrc: '/images/stock/photo-1486406146926-c627a92ad1ab.jpg',
    status: 'completed',
  },
  {
    id: 'o5',
    title: 'Property photography session for listing launch',
    providerName: 'Sofia Ramirez',
    providerHandle: '@sofia.shots',
    thumbSrc: '/images/stock/photo-1564013799919-ab600027ffc6.jpg',
    status: 'cancelled',
  },
  {
    id: 'o6',
    title: 'Residential appraisal with rush option turnaround',
    providerName: 'Marcus Webb',
    providerHandle: '@marcus.appraise',
    thumbSrc: '/images/stock/photo-1545324418-cc1a3fa10c00.jpg',
    status: 'completed',
  },
  {
    id: 'o7',
    title: 'Commercial lease placement within 50 miles',
    providerName: 'Maya Chen',
    providerHandle: '@maya.cre',
    thumbSrc: '/images/stock/photo-1497366216548-37526070297c.jpg',
    status: 'in-progress',
  },
]
