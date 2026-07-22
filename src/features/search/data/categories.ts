export type FilterOption = {
  label: string
  value: string
}

export type HeroFiltersState = {
  find: string
  pspCategory: string
  representation: string
  financing: string
  field: string
  condition: string
  priceBand: string
  subField: string
  motive: string
  language: string
  referral: string
  zip: string
  radius: string
  datePosted: string
  responseTime: string
  deliveryTime: string
  priceFrom: string
  priceTo: string
  englishLevel: string
  region: string
  gender: string
  freelancerType: string
}

export const SERVICE_BUDGET_MIN = 0
export const SERVICE_BUDGET_MAX = 6000
export const SERVICE_BUDGET_DEFAULT_TO = 6000
export const SERVICE_DISTANCE_MIN = 1
export const SERVICE_DISTANCE_MAX = 100
export const SERVICE_DISTANCE_DEFAULT = 50

export const DEFAULT_FILTERS: HeroFiltersState = {
  find: 'service',
  pspCategory: '',
  representation: '',
  financing: '',
  field: '',
  condition: '',
  priceBand: '',
  subField: '',
  motive: '',
  language: '',
  referral: '',
  zip: '',
  radius: '',
  datePosted: 'all',
  responseTime: '',
  deliveryTime: '',
  priceFrom: String(SERVICE_BUDGET_MIN),
  priceTo: String(SERVICE_BUDGET_DEFAULT_TO),
  englishLevel: '',
  region: '',
  gender: '',
  freelancerType: '',
}

export const FIND_OPTIONS: FilterOption[] = [
  { label: 'Service', value: 'service' },
  { label: 'Profile', value: 'profile' },
  { label: 'Agency', value: 'agency' },
]

export const PSP_CATEGORIES: FilterOption[] = [
  { label: 'Real Estate Agent', value: 'agent' },
  { label: 'Broker', value: 'broker' },
  { label: 'Transaction Coordinator', value: 'coordinator' },
  { label: 'Appraiser', value: 'appraiser' },
  { label: 'Attorney', value: 'attorney' },
  { label: 'Mortgage Consultant', value: 'mortgage' },
  { label: 'Architect', value: 'architect' },
  { label: 'Insurance', value: 'insurance' },
  { label: 'Flooring (Trade)', value: 'flooring' },
  { label: 'Locksmith (Trade)', value: 'locksmith' },
  { label: 'Lawn Service (Trade)', value: 'lawn' },
]

export const REPRESENTATION_OPTIONS: FilterOption[] = [
  { label: 'Selling', value: 'selling' },
  { label: 'Sell-to-Buy', value: 'sell-to-buy' },
  { label: 'Buying', value: 'buying' },
  { label: 'Buy-to-Sell', value: 'buy-to-sell' },
  { label: 'Leasing', value: 'leasing' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'All', value: 'all' },
]

export const FIELD_OPTIONS: FilterOption[] = [
  { label: 'Commercial', value: 'commercial' },
  { label: 'Industrial', value: 'industrial' },
  { label: 'Multi-Unit', value: 'multi-unit' },
  { label: 'Agricultural', value: 'agricultural' },
  { label: 'Residential', value: 'residential' },
  { label: 'Mixed-Use', value: 'mixed-use' },
  { label: 'Recreational', value: 'recreational' },
  { label: 'Other', value: 'other' },
]

export const CONDITION_OPTIONS: FilterOption[] = [
  { label: 'New Construction', value: 'new' },
  { label: 'Passes Inspection', value: 'inspection' },
  { label: 'Distressed', value: 'distressed' },
  { label: 'TLC', value: 'tlc' },
  { label: 'Un-livable', value: 'unlivable' },
]

export const PRICE_OPTIONS: FilterOption[] = [
  { label: 'High Luxury', value: 'luxury' },
  { label: 'Mid', value: 'mid' },
  { label: 'Economic', value: 'economic' },
]

export const MOTIVE_OPTIONS: FilterOption[] = [
  { label: 'Has to right now', value: 'urgent' },
  { label: '3–6 months', value: 'planned' },
  { label: 'Maybe if convinced', value: 'maybe' },
  { label: 'Exploring', value: 'explore' },
]

export const REFERRAL_OPTIONS: FilterOption[] = [
  { label: 'Yes — Send', value: 'send' },
  { label: 'Yes — Receive', value: 'receive' },
  { label: 'No referral', value: 'no' },
]

export const RADIUS_OPTIONS: FilterOption[] = [
  { label: '10 miles', value: '10' },
  { label: '25 miles', value: '25' },
  { label: '50 miles', value: '50' },
  { label: '100 miles', value: '100' },
]

export const DATE_POSTED_OPTIONS: FilterOption[] = [
  { label: 'Last Hour', value: 'hour' },
  { label: 'Last 24 hours', value: 'day' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Last 14 days', value: 'two-weeks' },
  { label: 'Last 30 days', value: 'month' },
  { label: 'All', value: 'all' },
]

export const RESPONSE_TIME_OPTIONS: FilterOption[] = [
  { label: 'Any response time', value: '' },
  { label: '1 Hour', value: '1' },
  { label: '2 Hours', value: '2' },
  { label: '3 Hours', value: '3' },
  { label: '4 Hours', value: '4' },
  { label: '5 Hours', value: '5' },
  { label: '6 Hours', value: '6' },
  { label: '7 Hours', value: '7' },
]

export const DELIVERY_TIME_OPTIONS: FilterOption[] = [
  { label: 'Any delivery time', value: '' },
  { label: '1 Day', value: '1' },
  { label: '2 Days', value: '2' },
  { label: '3 Days', value: '3' },
  { label: '4 Days', value: '4' },
  { label: '5 Days', value: '5' },
  { label: '6 Days', value: '6' },
  { label: '7 Days', value: '7' },
]

export const ENGLISH_LEVEL_OPTIONS: FilterOption[] = [
  { label: 'Basic', value: 'basic' },
  { label: 'Conversational', value: 'conversational' },
  { label: 'Fluent', value: 'fluent' },
  { label: 'Native Or Bilingual', value: 'native' },
  { label: 'Professional', value: 'professional' },
]

export const REGIONS_OPTIONS: FilterOption[] = [
  { label: 'Fresno', value: 'fresno' },
  { label: 'Clovis', value: 'clovis' },
  { label: 'Madera', value: 'madera' },
  { label: 'Visalia', value: 'visalia' },
  { label: 'Central Valley', value: 'central-valley' },
]

/** Freeio freelancer layout filter options (profile results) */
export const FREELANCER_CATEGORY_OPTIONS: FilterOption[] = [
  { label: 'Business', value: 'business' },
  { label: 'Digital Marketing', value: 'digital-marketing' },
  { label: 'Graphics & Design', value: 'graphics-design' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Music & Audio', value: 'music-audio' },
  { label: 'Programming & Tech', value: 'programming-tech' },
  { label: 'Trending', value: 'trending' },
  { label: 'Video & Animation', value: 'video-animation' },
  { label: 'Writing & Translation', value: 'writing-translation' },
]

export const FREELANCER_REGION_OPTIONS: FilterOption[] = [
  { label: 'Boston', value: 'boston' },
  { label: 'Florida', value: 'florida' },
  { label: 'Los Angeles', value: 'los-angeles' },
  { label: 'Miami', value: 'miami' },
  { label: 'New York', value: 'new-york' },
  { label: 'Fresno', value: 'fresno' },
  { label: 'Clovis', value: 'clovis' },
  { label: 'Madera', value: 'madera' },
  { label: 'Visalia', value: 'visalia' },
]

export const FREELANCER_TYPE_OPTIONS: FilterOption[] = [
  { label: 'Agency Freelancers', value: 'agency' },
  { label: 'Independent Freelancers', value: 'independent' },
  { label: 'New Rising Talent', value: 'rising' },
]

export const GENDER_OPTIONS: FilterOption[] = [
  { label: 'Both', value: 'both' },
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
]

export const FINANCING_OPTIONS: FilterOption[] = [
  { label: 'Cash', value: 'cash' },
  { label: 'Mortgage', value: 'mortgage' },
  { label: 'Either', value: 'either' },
]

export const SUB_FIELD_OPTIONS: FilterOption[] = [
  { label: 'Water Park', value: 'water-park' },
  { label: 'Bowling Alley', value: 'bowling' },
  { label: 'Ice Rink', value: 'ice-rink' },
  { label: 'Retail', value: 'retail' },
  { label: 'Office', value: 'office' },
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Other', value: 'other' },
]

export const LANGUAGE_OPTIONS: FilterOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'Mandarin', value: 'zh' },
  { label: 'Urdu', value: 'ur' },
  { label: 'Hindi', value: 'hi' },
]

export const PROPERTY_FIELDS = [
  {
    id: 'commercial',
    title: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'multi-unit',
    title: 'Multi-Unit',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'agricultural',
    title: 'Agricultural',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'residential',
    title: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mixed-use',
    title: 'Mixed-Use',
    image:
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80',
  },
] as const
