/**
 * Referrals data access boundary.
 * UI/hooks should call these functions — not import mock arrays from `data/`.
 * Swap implementations here when a real API is available.
 */
import type { Employer } from '@/entities/employer/types'
import type { Provider, ProviderType, Review, Service, ServiceFaq } from '@/entities/provider/types'
import { REFERRAL_CATEGORIES } from '@/features/referrals/data/categories'
import {
  EMPLOYERS,
  EMPLOYER_CATEGORY_OPTIONS,
  EMPLOYER_LOCATION_OPTIONS,
  getEmployerById as findEmployerById,
  categoryLabel,
} from '@/features/referrals/data/employers'
import { getFeaturedAdProviderById } from '@/features/referrals/data/profileResultAds'
import { PROVIDERS } from '@/features/referrals/data/providers'
import { REVIEWS } from '@/features/referrals/data/reviews'
import { SERVICE_FAQS, SERVICES } from '@/features/referrals/data/services'

export type { Employer, Provider, Review, Service, ServiceFaq }

/** Return a shallow copy so callers cannot mutate the mock store. */
function copyList<T>(items: readonly T[]): T[] {
  return [...items]
}

// —— Providers ——

export function listProviders(): Provider[] {
  return copyList(PROVIDERS)
}

export function getProviderById(id: string): Provider | undefined {
  return (
    PROVIDERS.find((provider) => provider.id === id) ?? getFeaturedAdProviderById(id)
  )
}

export function listProvidersByType(type: ProviderType, limit?: number): Provider[] {
  const list = PROVIDERS.filter((provider) => provider.type === type)
  return limit == null ? copyList(list) : copyList(list.slice(0, limit))
}

export function listRelatedProviders(excludeId: string, limit = 4): Provider[] {
  return copyList(PROVIDERS.filter((provider) => provider.id !== excludeId).slice(0, limit))
}

// —— Services ——

export function listServices(): Service[] {
  return copyList(SERVICES)
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id)
}

export function getServicesByProvider(providerId: string): Service[] {
  return copyList(SERVICES.filter((service) => service.providerId === providerId))
}

export function getProviderForService(service: Service): Provider | undefined {
  return getProviderById(service.providerId)
}

export function listPopularServices(limit = 6): Service[] {
  return copyList(SERVICES.slice(0, limit))
}

export function getDefaultServiceFaqs(): ServiceFaq[] {
  return SERVICE_FAQS.map((faq) => ({ ...faq }))
}

// —— Reviews ——

export function listReviews(): Review[] {
  return copyList(REVIEWS)
}

export function listReviewsForDisplay(limit?: number): Review[] {
  if (limit == null) return listReviews()
  return copyList(REVIEWS.slice(0, Math.max(0, limit)))
}

// —— Categories ——

export function listReferralCategories() {
  return copyList(REFERRAL_CATEGORIES)
}

// —— Employers ——

export function listEmployers(): Employer[] {
  return copyList(EMPLOYERS)
}

export function getEmployerById(id: string): Employer | undefined {
  return findEmployerById(id)
}

export function getEmployerLocationOptions() {
  return EMPLOYER_LOCATION_OPTIONS
}

export function getEmployerCategoryOptions() {
  return EMPLOYER_CATEGORY_OPTIONS
}

export function getEmployerCategoryLabel(value: string): string {
  return categoryLabel(value)
}
