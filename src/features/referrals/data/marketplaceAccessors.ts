/**
 * Back-compat accessors — prefer `@/features/referrals/api/repository`.
 * Kept so existing relative imports keep working during the migration.
 */
export {
  getProviderById,
  getServiceById,
  getServicesByProvider,
  getProviderForService,
  listProviders,
  listServices,
  listReviews,
  listRelatedProviders,
  listPopularServices,
  listProvidersByType,
  getDefaultServiceFaqs,
  listReviewsForDisplay,
  listReferralCategories,
  listEmployers,
  getEmployerById,
  getEmployerLocationOptions,
  getEmployerCategoryOptions,
  getEmployerCategoryLabel,
} from '@/features/referrals/api/repository'
