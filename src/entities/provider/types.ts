export type UserRole = 'customer' | 'psp' | 'admin'

export type ProviderType = 'professional' | 'trade'

export type ProviderEducation = {
  period: string
  degree: string
  school: string
  description: string
}

export type ProviderExperience = {
  period: string
  role: string
  company: string
  description: string
}

export type ProviderAward = {
  year: string
  title: string
  description: string
}

export type Provider = {
  id: string
  name: string
  title: string
  company?: string
  licenseNo?: string
  dreNo?: string
  type: ProviderType
  specialty: string
  city: string
  state: string
  country?: string
  zip: string
  lat: number
  lng: number
  radiusMiles: number
  rating: number
  reviewCount: number
  salesVolume: number
  dealsClosed: number
  referralShare: number
  learningIncluded: boolean
  image: string
  verified: boolean
  about: string
  languages: string[]
  englishLevel?: string
  hourlyRateMin?: number
  hourlyRateMax?: number
  joinedDate?: string
  skills?: string[]
  education?: ProviderEducation[]
  experience?: ProviderExperience[]
  awards?: ProviderAward[]
  gender?: string
  email?: string
  phone?: string
  projectSuccess?: number
  totalServices?: number
  completedServices?: number
  inQueueServices?: number
}

export type ServicePackage = {
  id: string
  name: 'Basic' | 'Standard' | 'Premium'
  price: number
  deliveryDays: number
  description: string
  includes: string[]
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServiceTagGroup = {
  label: string
  values: string[]
}

export type ServiceAddon = {
  id: string
  title: string
  description: string
  price: number
  extraDays: number
}

export type Service = {
  id: string
  providerId: string
  title: string
  category: string
  subcategory: string
  field: string
  description: string
  image: string
  rating: number
  reviewCount: number
  startingPrice: number
  badges: string[]
  packages: ServicePackage[]
  views?: number
  englishLevel?: string
  faqs?: ServiceFaq[]
  tagGroups?: ServiceTagGroup[]
  featured?: boolean
  gallery?: string[]
  addons?: ServiceAddon[]
  servicesProvided?: string[]
  descriptionExtra?: string
}

export type Review = {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  avatar?: string
}
