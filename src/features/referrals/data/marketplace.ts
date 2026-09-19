/** Marketplace helpers + repository re-exports (no raw mock arrays). */
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
} from '@/features/referrals/api/repository'
export {
  getMinDeliveryDays,
  getServiceGallery,
  getServiceAddons,
  getServiceProvidedList,
  getServiceTagGroups,
  getRelatedServices,
} from '@/features/referrals/lib/serviceView'
