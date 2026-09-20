import { countryToVoteRegion } from '@/features/crowdfunding/data/countriesByLetter'
import { getFeaturedAdVenueLocation } from '@/features/crowdfunding/data/voteResultAds'

export type VoteVertical =
  | 'water'
  | 'indoor'
  | 'outdoor'
  | 'wildlife'
  | 'sports'
  | 'community'

export type VoteVenueLocation = {
  lat: number
  lng: number
  city: string
}

export type VoteVenue = {
  id: string
  title: string
  text: string
  image: string
  role: string
  raise: string
  roi: string
  geographies: string[]
  vertical: VoteVertical
}

export const VOTE_GEOGRAPHIES = [
  { value: 'mexico', label: 'Mexico' },
  { value: 'united-states', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'central-america', label: 'Central America' },
  { value: 'caribbean', label: 'Caribbean' },
] as const

export const VOTE_VERTICALS: { value: VoteVertical; label: string }[] = [
  { value: 'water', label: 'Water recreation' },
  { value: 'indoor', label: 'Indoor entertainment' },
  { value: 'outdoor', label: 'Outdoor adventure' },
  { value: 'wildlife', label: 'Wildlife & nature' },
  { value: 'sports', label: 'Sports & play' },
  { value: 'community', label: 'Community venues' },
]

export type VoteSort = 'all' | 'price-desc' | 'price-asc' | 'listed-desc' | 'listed-asc'
export type VoteSortIcon = 'price' | 'date'

export const VOTE_SORTS: { value: VoteSort; label: string; icon?: VoteSortIcon }[] = [
  { value: 'price-desc', label: 'Price: Highest To Lowest', icon: 'price' },
  { value: 'price-asc', label: 'Price: Lowest To Highest', icon: 'price' },
  { value: 'listed-desc', label: 'Date Listed: Newest To Oldest', icon: 'date' },
  { value: 'listed-asc', label: 'Date Listed: Oldest To Newest', icon: 'date' },
]

export const VOTE_ASSIST_OPTIONS = [
  { value: 'vote', label: 'Vote on a venue' },
  { value: 'location', label: 'Request a location' },
  { value: 'partnership', label: 'Partnerships' },
  { value: 'pledge', label: 'Pledge / interest list' },
  { value: 'other', label: 'Something else' },
] as const

export const VOTE_PHONE_CODES = [
  { value: '+52', label: 'MX +52' },
  { value: '+1', label: 'US/CA +1' },
  { value: '+502', label: 'GT +502' },
  { value: '+504', label: 'HN +504' },
] as const

export const VOTE_COPY = {
  registerCta: 'Register To Vote',
  registerHere: 'Here',
  sortBy: 'Sort By:',
  geography: 'Country:',
  geographyPlaceholder: 'Ex. (Mexico, United States, etc.)',
  state: 'State:',
  region: 'Region:',
  county: 'County:',
  city: 'City:',
  searchCountry: 'Search country...',
  searchState: 'Search state...',
  searchRegion: 'Search region...',
  searchCounty: 'Search county...',
  searchCity: 'Search city...',
  verticals: 'Environment:',
  verticalPlaceholder: 'Ex. (Water recreation, etc.)',
  venue: 'Venue:',
  venuePlaceholder: 'Ex. (Ropes courses, Indoor play, etc.)',
  assistPlaceholder: 'Ex. (Vote on a venue, etc.)',
  formTitle: 'Submit Request:',
  formLead:
    "Fill in the form below to let us know which service you're interested in and how we can help — we'll get back to you as soon as possible.",
  firstName: 'First name',
  lastName: 'Last name',
  phone: 'Phone number',
  assist: 'How may LCRE assist you',
  message: 'Add a message or tell us more about what you need',
  send: 'Send Request',
  formSuccessTitle: 'Request sent',
  formSuccessBody: "Thanks — we'll follow up as soon as possible.",
  filterTitle: 'Filters',
  filterReset: 'Reset all',
  filterApply: 'Apply filters',
} as const

const MX = ['mexico']
const MX_US = ['mexico', 'united-states']
const MX_CA = ['mexico', 'canada']
const MX_CA_US = ['mexico', 'canada', 'united-states']

/** Visual order matches https://crowdfunnding.wixsite.com/lcredesign/ii-vote */
export const VOTE_VENUES: VoteVenue[] = [
  {
    id: 'ropes-course',
    title: 'Ropes courses',
    text: 'Tree-to-tree challenge courses and canopy walks.',
    image: '/images/crowdfunding/09-obstacle-course.jpeg',
    role: 'Obstacle Course #8',
    raise: '$2.4M',
    roi: '18%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'indoor-play',
    title: 'Indoor play',
    text: 'Climate-controlled courts, foam pits, and youth programming.',
    image: '/images/crowdfunding/01-3169093_web1_IMG_5825.jpg',
    role: 'Indoor Play #44',
    raise: '$2.1M',
    roi: '15%',
    geographies: MX,
    vertical: 'indoor',
  },
  {
    id: 'zip-line',
    title: 'Zip lines',
    text: 'Canopy rides linking outdoor recreation hubs.',
    image: '/images/crowdfunding/10-198.jpg',
    role: 'Zip Line #12',
    raise: '$3.2M',
    roi: '17%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'bike-park',
    title: 'Bike parks',
    text: 'Wooden pump tracks and forest trail circuits.',
    image: '/images/crowdfunding/06-195.jpg',
    role: 'Bike Trails #8898',
    raise: '$2.8M',
    roi: '16%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'paintball',
    title: 'Paintball',
    text: 'Outdoor arenas and tactical recreation fields.',
    image: '/images/crowdfunding/05-88_edited.jpg',
    role: 'Paintball Arena #27',
    raise: '$1.5M',
    roi: '19%',
    geographies: MX,
    vertical: 'sports',
  },
  {
    id: 'ice-rink',
    title: 'Ice rinks',
    text: 'Year-round skating, hockey, and arena events.',
    image: '/images/crowdfunding/02-288.jpg',
    role: 'Ice Rink #3',
    raise: '$6.4M',
    roi: '10%',
    geographies: MX_US,
    vertical: 'sports',
  },
  {
    id: 'roller-rink',
    title: 'Roller rinks',
    text: 'Skate floors, lights, and community parties.',
    image: '/images/crowdfunding/03-185.jpg',
    role: 'Roller Rink #31',
    raise: '$1.5M',
    roi: '17%',
    geographies: MX,
    vertical: 'indoor',
  },
  {
    id: 'bowling',
    title: 'Bowling alleys',
    text: 'League nights, party bookings, and food courts.',
    image: '/images/crowdfunding/04-karla-rivera.jpg',
    role: 'Bowling Alley #19',
    raise: '$2.7M',
    roi: '13%',
    geographies: MX,
    vertical: 'indoor',
  },
  {
    id: 'go-karts',
    title: 'Go-kart tracks',
    text: 'Electric and outdoor tracks for family race nights.',
    image: '/images/crowdfunding/07-188.jpg',
    role: 'Go-Kart Track #41',
    raise: '$2.8M',
    roi: '14%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'atv-trails',
    title: 'ATV trails',
    text: 'Guided off-road recreation and youth motocross.',
    image: '/images/crowdfunding/08-appic.jpg',
    role: 'ATV Trails #22',
    raise: '$1.9M',
    roi: '18%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'wildlife-park',
    title: 'Wildlife parks',
    text: 'Nature habitats and conservation encounters.',
    image: '/images/crowdfunding/11-306.jpg',
    role: 'Wildlife Park #5',
    raise: '$4.6M',
    roi: '11%',
    geographies: MX_CA,
    vertical: 'wildlife',
  },
  {
    id: 'duck-pond',
    title: 'Duck ponds',
    text: 'Family shoreline parks and waterfowl habitats.',
    image: '/images/crowdfunding/12-28.jpg',
    role: 'Duck Pond #16',
    raise: '$980K',
    roi: '14%',
    geographies: MX_CA,
    vertical: 'wildlife',
  },
  {
    id: 'swan-lake',
    title: 'Swan lakes',
    text: 'Quiet water parks for walking and wildlife viewing.',
    image: '/images/crowdfunding/13-download-1.jpg',
    role: 'Swan Lake #9',
    raise: '$1.3M',
    roi: '13%',
    geographies: MX_CA,
    vertical: 'wildlife',
  },
  {
    id: 'boat-rides',
    title: 'Boat rides',
    text: 'Rowing, paddle, and lakeside recreation.',
    image: '/images/crowdfunding/14-48.jpg',
    role: 'Boat Rides #34',
    raise: '$2.0M',
    roi: '15%',
    geographies: MX,
    vertical: 'water',
  },
  {
    id: 'swimming-hole',
    title: 'Swimming holes',
    text: 'Natural swim spots and rope-swing parks.',
    image: '/images/crowdfunding/15-kid-lake.jpg',
    role: 'Swimming Hole #18',
    raise: '$1.1M',
    roi: '16%',
    geographies: MX,
    vertical: 'water',
  },
  {
    id: 'aquarium',
    title: 'Aquariums',
    text: 'Discovery tanks and educational exhibits.',
    image: '/images/crowdfunding/16-aquarium.jpg',
    role: 'Aquarium #5',
    raise: '$7.5M',
    roi: '9%',
    geographies: MX_US,
    vertical: 'wildlife',
  },
  {
    id: 'zoo',
    title: 'Zoological parks',
    text: 'Habitats, conservation programs, and encounters.',
    image: '/images/crowdfunding/17-zoological.jpg',
    role: 'Zoological Park #2',
    raise: '$8.9M',
    roi: '8%',
    geographies: MX,
    vertical: 'wildlife',
  },
  {
    id: 'science-center',
    title: 'Science centers',
    text: 'Hands-on discovery halls for school and family visits.',
    image: '/images/crowdfunding/18-screenshot-4.jpg',
    role: 'Science Center #7',
    raise: '$4.8M',
    roi: '11%',
    geographies: MX,
    vertical: 'community',
  },
  {
    id: 'theater',
    title: 'Theaters',
    text: 'Live performance and community arts venues.',
    image: '/images/crowdfunding/29-21awf20.jpg',
    role: 'Community Theater #15',
    raise: '$4.0M',
    roi: '10%',
    geographies: MX,
    vertical: 'community',
  },
  {
    id: 'laser-tag',
    title: 'Laser tag',
    text: 'Arena adventures and birthday packages.',
    image: '/images/crowdfunding/30-screenshot-3.jpg',
    role: 'Laser Tag Arena #9',
    raise: '$1.4M',
    roi: '20%',
    geographies: MX,
    vertical: 'indoor',
  },
  {
    id: 'rc-track',
    title: 'RC tracks',
    text: 'Indoor hobby tracks and family race pits.',
    image: '/images/crowdfunding/21-maxresdefault.jpg',
    role: 'RC Track #48',
    raise: '$1.2M',
    roi: '18%',
    geographies: MX,
    vertical: 'sports',
  },
  {
    id: 'mini-golf',
    title: 'Mini golf',
    text: 'Themed putting courses for all ages.',
    image: '/images/crowdfunding/22-mini-golf.jpg',
    role: 'Mini Golf #52',
    raise: '$890K',
    roi: '21%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'horse-rides',
    title: 'Horse rides',
    text: 'Carriage routes and equestrian recreation.',
    image: '/images/crowdfunding/23-ride-horse.jpg',
    role: 'Horse Trails #28',
    raise: '$1.3M',
    roi: '14%',
    geographies: MX,
    vertical: 'outdoor',
  },
  {
    id: 'indoor-market',
    title: 'Indoor markets',
    text: 'Vendor halls and community marketplace venues.',
    image: '/images/crowdfunding/24-indoor-market.jpg',
    role: 'Indoor Market #11',
    raise: '$2.0M',
    roi: '13%',
    geographies: MX,
    vertical: 'community',
  },
  {
    id: 'city-pool',
    title: 'City pools',
    text: 'Public swim facilities with lesson programs.',
    image: '/images/crowdfunding/25-city-pool.jpg',
    role: 'City Pool #36',
    raise: '$2.9M',
    roi: '12%',
    geographies: MX_CA_US,
    vertical: 'water',
  },
  {
    id: 'water-slides',
    title: 'Water slides',
    text: 'Slide towers with cabanas and food courts.',
    image: '/images/crowdfunding/20-168.jpg',
    role: 'Water Slides #16',
    raise: '$3.6M',
    roi: '15%',
    geographies: MX,
    vertical: 'water',
  },
  {
    id: 'amusement-park',
    title: 'Amusement parks',
    text: 'Ride midways, seasonal fairs, and festival grounds.',
    image: '/images/crowdfunding/27-amuse-parks.jpg',
    role: 'Amusement Park #1',
    raise: '$12M',
    roi: '9%',
    geographies: MX_US,
    vertical: 'outdoor',
  },
  {
    id: 'fairground',
    title: 'Fairgrounds',
    text: 'Carnival rides and community celebration spaces.',
    image: '/images/crowdfunding/28-170.jpg',
    role: 'Fairground #22',
    raise: '$3.3M',
    roi: '14%',
    geographies: MX,
    vertical: 'community',
  },
  {
    id: 'aqua-park',
    title: 'Aqua parks',
    text: 'Family splash pads and slide complexes.',
    image: '/images/crowdfunding/26-174.jpg',
    role: 'Aqua Park #4',
    raise: '$5.6M',
    roi: '16%',
    geographies: MX,
    vertical: 'water',
  },
  {
    id: 'sports-complex',
    title: 'Sports complexes',
    text: 'Stadiums and multi-court venues for leagues and camps.',
    image: '/images/crowdfunding/19-250.jpg',
    role: 'Sports Complex #55',
    raise: '$5.1M',
    roi: '12%',
    geographies: MX_US,
    vertical: 'sports',
  },
  {
    id: 'terminals',
    title: 'Transit hubs',
    text: 'Visitor arrival and destination gateways.',
    image: '/images/crowdfunding/31-terminals.jpg',
    role: 'Transit Hub #10',
    raise: '$9.2M',
    roi: '7%',
    geographies: MX_US,
    vertical: 'community',
  },
  {
    id: 'mono-rail',
    title: 'Monorails',
    text: 'Park transit linking recreational destinations.',
    image: '/images/crowdfunding/32-mono.webp',
    role: 'Monorail Link #18',
    raise: '$11.5M',
    roi: '8%',
    geographies: MX,
    vertical: 'community',
  },
]

/** Proposed venue pins — scattered across Mexico recreation markets. */
export const VOTE_VENUE_LOCATIONS: Record<string, VoteVenueLocation> = {
  'ropes-course': { lat: 18.9242, lng: -99.2216, city: 'Cuernavaca' },
  'indoor-play': { lat: 19.4194, lng: -99.145, city: 'Mexico City' },
  'zip-line': { lat: 20.6534, lng: -105.2253, city: 'Puerto Vallarta' },
  'bike-park': { lat: 20.6767, lng: -103.3475, city: 'Guadalajara' },
  paintball: { lat: 21.125, lng: -101.686, city: 'León' },
  'ice-rink': { lat: 25.6866, lng: -100.3161, city: 'Monterrey' },
  'roller-rink': { lat: 19.0414, lng: -98.2063, city: 'Puebla' },
  bowling: { lat: 20.5888, lng: -100.3899, city: 'Querétaro' },
  'go-karts': { lat: 32.5149, lng: -117.0382, city: 'Tijuana' },
  'atv-trails': { lat: 22.8905, lng: -109.9167, city: 'Cabo San Lucas' },
  'wildlife-park': { lat: 21.1619, lng: -86.8515, city: 'Cancún' },
  'duck-pond': { lat: 20.9674, lng: -89.5926, city: 'Mérida' },
  'swan-lake': { lat: 17.0732, lng: -96.7266, city: 'Oaxaca' },
  'boat-rides': { lat: 20.2838, lng: -103.1895, city: 'Chapala' },
  'swimming-hole': { lat: 20.9144, lng: -100.7452, city: 'San Miguel de Allende' },
  aquarium: { lat: 19.1738, lng: -96.1342, city: 'Veracruz' },
  zoo: { lat: 20.7267, lng: -103.31, city: 'Guadalajara' },
  'science-center': { lat: 19.4042, lng: -99.1926, city: 'Mexico City' },
  theater: { lat: 19.427, lng: -99.1276, city: 'Mexico City' },
  'laser-tag': { lat: 25.6515, lng: -100.2895, city: 'Monterrey' },
  'rc-track': { lat: 21.8853, lng: -102.2916, city: 'Aguascalientes' },
  'mini-golf': { lat: 20.6296, lng: -87.0739, city: 'Playa del Carmen' },
  'horse-rides': { lat: 20.933, lng: -100.76, city: 'San Miguel de Allende' },
  'indoor-market': { lat: 17.0605, lng: -96.7254, city: 'Oaxaca' },
  'city-pool': { lat: 19.355, lng: -99.162, city: 'Mexico City' },
  'water-slides': { lat: 16.8531, lng: -99.8237, city: 'Acapulco' },
  'amusement-park': { lat: 19.295, lng: -99.208, city: 'Mexico City' },
  fairground: { lat: 20.655, lng: -103.325, city: 'Guadalajara' },
  'aqua-park': { lat: 20.211, lng: -87.4654, city: 'Tulum' },
  'sports-complex': { lat: 25.669, lng: -100.309, city: 'Monterrey' },
  terminals: { lat: 19.4363, lng: -99.0721, city: 'Mexico City' },
  'mono-rail': { lat: 19.446, lng: -99.181, city: 'Mexico City' },
}

const FALLBACK_VENUE_LOCATION: VoteVenueLocation = {
  lat: 19.4326,
  lng: -99.1332,
  city: 'Mexico City',
}

export function getVoteVenueLocation(id: string): VoteVenueLocation {
  return (
    VOTE_VENUE_LOCATIONS[id] ?? getFeaturedAdVenueLocation(id) ?? FALLBACK_VENUE_LOCATION
  )
}

const VOTE_VENUE_COUNTS: Record<string, number> = {
  'ropes-course': 86,
  'indoor-play': 142,
  'zip-line': 217,
  'bike-park': 94,
  paintball: 63,
  'ice-rink': 178,
  'roller-rink': 51,
  bowling: 109,
  'go-karts': 133,
  'atv-trails': 77,
  'wildlife-park': 201,
  'duck-pond': 44,
  'swan-lake': 58,
  'boat-rides': 91,
  'swimming-hole': 72,
  aquarium: 246,
  zoo: 312,
  'science-center': 88,
  theater: 67,
  'laser-tag': 154,
  'rc-track': 39,
  'mini-golf': 121,
  'horse-rides': 48,
  'indoor-market': 82,
  'city-pool': 165,
  'water-slides': 193,
  'amusement-park': 428,
  fairground: 116,
  'aqua-park': 187,
  'sports-complex': 234,
  terminals: 29,
  'mono-rail': 41,
}

export function getVoteVenueCount(id: string): number {
  return VOTE_VENUE_COUNTS[id] ?? 0
}

function filterList(value: string | string[]) {
  return (Array.isArray(value) ? value : [value]).filter(Boolean)
}

function isAllFilter(value: string | string[]) {
  const list = filterList(value)
  return list.length === 0 || list.includes('all')
}

export function venueMatchesGeography(venue: VoteVenue, geography: string | string[]) {
  const selected = filterList(geography)
  if (isAllFilter(selected)) return true
  return selected.some((item) => venue.geographies.includes(countryToVoteRegion(item)))
}

function parseMoneyAmount(value: string): number {
  const compact = value.replace(/[$,\s]/g, '').toUpperCase()
  const match = compact.match(/^([\d.]+)([KMB])?$/)
  if (!match) return 0
  const amount = Number(match[1])
  if (!Number.isFinite(amount)) return 0
  if (match[2] === 'K') return amount * 1_000
  if (match[2] === 'M') return amount * 1_000_000
  if (match[2] === 'B') return amount * 1_000_000_000
  return amount
}

function getVoteVenueListedAt(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return Date.UTC(2026, 8, 19) - (hash % 90) * 86_400_000
}

function venueSortValue(venue: VoteVenue, sort: VoteSort): number {
  if (sort.startsWith('listed')) return getVoteVenueListedAt(venue.id)
  return parseMoneyAmount(venue.raise)
}

export function filterVoteVenues({
  geography,
  cities,
  vertical,
  venueId,
  sort,
}: {
  geography: string | string[]
  cities?: string | string[]
  vertical: string | string[]
  venueId: string | string[]
  sort: string
}): VoteVenue[] {
  const verticals = filterList(vertical)
  const venueIds = filterList(venueId)
  const cityList = filterList(cities ?? [])

  const filtered = VOTE_VENUES.filter((venue) => {
    if (!venueMatchesGeography(venue, geography)) return false
    if (!isAllFilter(cityList) && !cityList.includes(getVoteVenueLocation(venue.id).city)) {
      return false
    }
    if (!isAllFilter(verticals) && !verticals.includes(venue.vertical)) return false
    if (!isAllFilter(venueIds) && !venueIds.includes(venue.id)) return false
    return true
  })

  if (!sort || sort === 'all') return filtered

  const direction = sort.endsWith('-asc') ? 1 : -1
  return [...filtered].sort((a, b) => {
    const delta = venueSortValue(a, sort as VoteSort) - venueSortValue(b, sort as VoteSort)
    if (delta === 0) return 0
    return delta * direction
  })
}
