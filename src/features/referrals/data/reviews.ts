import type { Review } from '@/entities/provider/types'

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Admin',
    rating: 4,
    date: 'November 9, 2022',
    comment:
      'Clear communication and the learning session after the referral was genuinely useful. Scope was exactly as described.',
    avatar: '/images/avatars/avatar-12.jpg',
  },
  {
    id: 'r2',
    author: 'Priya N.',
    rating: 5,
    date: 'February 12, 2026',
    comment: 'Felt like Fiverr-level packaging but built for real property work. Would hire again.',
    avatar: '/images/avatars/avatar-5.jpg',
  },
  {
    id: 'r3',
    author: 'Chris D.',
    rating: 4,
    date: 'January 3, 2026',
    comment: 'Strong within the 50-mile radius. Pricing packages made scope decisions easy.',
    avatar: '/images/avatars/avatar-33.jpg',
  },
]
