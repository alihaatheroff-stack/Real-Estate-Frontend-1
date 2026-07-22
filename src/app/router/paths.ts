export const PATHS = {
  home: '/',
  referrals: '/referrals',
  results: '/referrals/results',
  profileResults: '/referrals/profile-results',
  employerResults: '/referrals/employer-results',
  employerProjects: '/referrals/employers/:id/projects',
  employerJobs: '/referrals/employers/:id/jobs',
  employerDetail: '/referrals/employers/:id',
  serviceDetail: '/referrals/services/:id',
  providerProfile: '/referrals/providers/:id',
  providerServices: '/referrals/providers/:id/services',
  postOffer: '/referrals/post',
  crowdfunding: '/crowdfunding',
  networkFeed: '/network/feed',
  shop: '/shop',
  signIn: '/auth/sign-in',
  registerPsp: '/auth/register/psp',
  registerCustomer: '/auth/register/customer',
  dashboard: '/dashboard',
  about: '/about',
  contact: '/contact',
  advertise: '/advertise',
} as const

export function servicePath(id: string) {
  return `/referrals/services/${id}`
}

export function providerPath(id: string) {
  return `/referrals/providers/${id}`
}

export function providerServicesPath(id: string) {
  return `/referrals/providers/${id}/services`
}

export function employerPath(id: string) {
  return `/referrals/employers/${id}`
}

export function employerProjectsPath(id: string) {
  return `/referrals/employers/${id}/projects`
}

export function employerJobsPath(id: string) {
  return `/referrals/employers/${id}/jobs`
}
