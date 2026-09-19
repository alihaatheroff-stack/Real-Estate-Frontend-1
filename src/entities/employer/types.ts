import type { Review } from '@/entities/provider/types'

export type EmployerProject = {
  id: string
  title: string
  city: string
  category: string
  postedAgo: string
  proposals: number
  description: string
  skills: string[]
  budgetMin: number
  budgetMax: number
  budgetType: 'Fixed' | 'Hourly'
  /** Optional project thumbnail — attach later if needed */
  image?: string
}

export type EmployerPosition = {
  id: string
  title: string
  salaryMin: number
  salaryMax: number
  salaryPeriod: 'month' | 'week' | 'day' | 'hour' | 'year'
  category: string
  employmentType: string
  city: string
  experience?: string
  industry?: string
  qualification?: string
  /** Optional job image — attach later if needed */
  image?: string
}

export type EmployerEmployee = {
  id: string
  name: string
  role: string
  /** Optional profile photo */
  avatar?: string
}

export type Employer = {
  id: string
  name: string
  /** Two-letter company mark shown as the logo */
  logoInitials: string
  /** Brand color for the logo mark */
  logoColor: string
  /** Optional real logo image URL (SVG/PNG). Prefer over initials when set. */
  logoUrl?: string
  /** Optional hero/cover photo for detail page */
  coverImage?: string
  tagline: string
  category: string
  categories: string[]
  city: string
  state: string
  lat: number
  lng: number
  rating: number
  reviewCount: number
  openProjects: number
  foundedYear: number
  /** Display range shown in About Me, e.g. "10-20" */
  employees: string
  /** Individual team members listed on the employees page */
  team: EmployerEmployee[]
  email: string
  phone: string
  about: string
  aboutExtra?: string
  whoWeAre?: string
  whatWeDo?: string
  projects: EmployerProject[]
  positions: EmployerPosition[]
  reviews: Review[]
}
