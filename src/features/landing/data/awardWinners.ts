export type AwardWinner = {
  id: string
  name: string
  title: string
  image: string
  city: string
  state: string
  award: string
  year: string
  verified: boolean
  /** Display rank, e.g. "1 of 2.4M" */
  rank: string
  /** Referral percentage share offered */
  percentageShare: number
  hourlyRateMin: number
  hourlyRateMax: number
}

/** Dummy profiles for the landing Referrals → Awards strip. */
export const AWARD_WINNERS: AwardWinner[] = [
  {
    id: 'p1',
    name: 'Maya Chen',
    title: 'Commercial Real Estate Agent',
    image: '/images/profile/F_1.jpg',
    city: 'Fresno',
    state: 'CA',
    award: 'Top Commercial Producer',
    year: '2023',
    verified: true,
    rank: '1 of 2.4M',
    percentageShare: 50,
    hourlyRateMin: 85,
    hourlyRateMax: 140,
  },
  {
    id: 'p2',
    name: 'Jordan Blake',
    title: 'Mortgage Consultant',
    image: '/images/profile/m1.jpg',
    city: 'Clovis',
    state: 'CA',
    award: 'Referral Volume Leader',
    year: '2023',
    verified: true,
    rank: '2 of 2.4M',
    percentageShare: 40,
    hourlyRateMin: 70,
    hourlyRateMax: 110,
  },
  {
    id: 'p3',
    name: 'Sofia Ramirez',
    title: 'Property Photographer',
    image: '/images/profile/F_2.jpg',
    city: 'Fresno',
    state: 'CA',
    award: 'Creative Partner of the Year',
    year: '2022',
    verified: true,
    rank: '3 of 2.4M',
    percentageShare: 50,
    hourlyRateMin: 60,
    hourlyRateMax: 95,
  },
  {
    id: 'p4',
    name: 'Ethan Cole',
    title: 'Home Inspector',
    image: '/images/profile/m2.jpg',
    city: 'Madera',
    state: 'CA',
    award: 'Trusted Trade Award',
    year: '2023',
    verified: true,
    rank: '4 of 2.4M',
    percentageShare: 50,
    hourlyRateMin: 75,
    hourlyRateMax: 120,
  },
  {
    id: 'p5',
    name: 'Priya Nair',
    title: 'Investment Advisor',
    image: '/images/profile/F3.jpg',
    city: 'Visalia',
    state: 'CA',
    award: 'Mentor of the Year',
    year: '2022',
    verified: true,
    rank: '5 of 2.4M',
    percentageShare: 50,
    hourlyRateMin: 100,
    hourlyRateMax: 175,
  },
  {
    id: 'p6',
    name: 'Marcus Webb',
    title: 'Appraiser',
    image: '/images/profile/m3.jpg',
    city: 'Hanford',
    state: 'CA',
    award: 'Accuracy Excellence',
    year: '2023',
    verified: false,
    rank: '6 of 2.4M',
    percentageShare: 50,
    hourlyRateMin: 80,
    hourlyRateMax: 130,
  },
]
