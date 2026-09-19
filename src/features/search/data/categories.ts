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
  percentageShare: string
  willingToTrain: string
  motive: string
  language: string
  referral: string
  zip: string
  radius: string
  clientExperience: string
  vacancy: string
  propertyTitle: string
  saleType: string
  govAgencies: string
  yourExperience: string
  formOfPayment: string
  educationArchive: string
  arMeasurementTools: string
  paymentPacket: string
  tierSelection: string
  paymentMethods: string
  paymentTerms: string
  cardNumber: string
  expirationDate: string
  securityCode: string
  stripeLink: string
  paypalLink: string
  squareLink: string
  venmoLink: string
  zelleEmail: string
  zellePhone: string
  cashAppLink: string
  chequeSameAsBusiness: string
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
  find: '',
  pspCategory: '',
  representation: '',
  financing: '',
  field: '',
  condition: '',
  priceBand: '',
  subField: '',
  percentageShare: '',
  willingToTrain: '',
  motive: '',
  language: '',
  referral: '',
  zip: '',
  radius: '',
  clientExperience: '',
  vacancy: '',
  propertyTitle: '',
  saleType: '',
  govAgencies: '',
  yourExperience: '',
  formOfPayment: '',
  educationArchive: '',
  arMeasurementTools: '',
  paymentPacket: '',
  tierSelection: '',
  paymentMethods: '',
  paymentTerms: '',
  cardNumber: '',
  expirationDate: '',
  securityCode: '',
  stripeLink: '',
  paypalLink: '',
  squareLink: '',
  venmoLink: '',
  zelleEmail: '',
  zellePhone: '',
  cashAppLink: '',
  chequeSameAsBusiness: '',
  datePosted: '',
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
  { label: 'Office', value: 'agency' },
]

export const PSP_CATEGORIES: FilterOption[] = [
  { label: 'Architect', value: 'architect' },
  { label: 'Agent', value: 'agent' },
  { label: 'Builder', value: 'builder' },
  { label: 'Broker', value: 'broker' },
  { label: 'Transaction Coordinator', value: 'coordinator' },
  { label: 'Appraiser', value: 'appraiser' },
  { label: 'Attorney', value: 'attorney' },
  { label: 'Mortgage Consultant', value: 'mortgage' },
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
  { label: 'Luxury', value: 'luxury' },
  { label: 'Mid', value: 'mid' },
  { label: 'Economic', value: 'economic' },
]

export const PERCENTAGE_SHARE_OPTIONS: FilterOption[] = [
  { label: '10%', value: '10' },
  { label: '20%', value: '20' },
  { label: '30%', value: '30' },
  { label: '40%', value: '40' },
  { label: '50%', value: '50' },
  { label: 'Negotiable', value: 'negotiable' },
]

export const WILLING_TO_TRAIN_OPTIONS: FilterOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Maybe', value: 'maybe' },
]

/** Drawer/register order (Yes → Maybe → no). Differs from WILLING_TO_TRAIN_OPTIONS. */
export const WILLING_TO_TRAIN_FILTER_OPTIONS: FilterOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'Maybe', value: 'maybe' },
  { label: 'no', value: 'no' },
]

export const MOTIVE_OPTIONS: FilterOption[] = [
  { label: 'Serious', value: 'serious' },
  { label: 'Wasting time', value: 'wasting-time' },
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
  { label: 'Low', value: 'Low' },
  { label: 'Middle', value: 'Middle' },
  { label: 'High', value: 'High' },

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
  { label: 'Hindi', value: 'hi' },
  { label: 'Mandarin', value: 'zh' },
  { label: 'Spanish', value: 'es' },
  { label: 'Urdu', value: 'ur' },
]

export const PROPERTY_FIELDS = [
  {
    id: 'commercial',
    title: 'Commercial',
    image: '/images/fields/commercial.png',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    image: '/images/fields/industrial.png',
  },
  {
    id: 'multi-unit',
    title: 'Multi-Unit',
    image: '/images/fields/multi-unit.png',
  },
  {
    id: 'agricultural',
    title: 'Agricultural',
    image: '/images/fields/agricultural.png',
  },
  {
    id: 'residential',
    title: 'Residential',
    image: '/images/fields/residential.png',
  },
  {
    id: 'mixed-use',
    title: 'Mixed-Use',
    image: '/images/fields/mixed-use.png',
  },
] as const
