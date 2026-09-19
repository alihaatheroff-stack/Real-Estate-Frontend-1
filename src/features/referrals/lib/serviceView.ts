import type { Service } from '@/entities/provider/types'
import { listServices } from '@/features/referrals/api/repository'

const GALLERY_FALLBACKS = [
  '/images/stock/photo-1486406146926-c627a92ad1ab.jpg',
  '/images/stock/photo-1560518883-ce09059eeffa.jpg',
  '/images/stock/photo-1600585154340-be6161a56a0c.jpg',
]

export function getMinDeliveryDays(service: Service) {
  return Math.min(...service.packages.map((pkg) => pkg.deliveryDays))
}

export function getServiceGallery(service: Service) {
  if (service.gallery?.length) return service.gallery
  return [service.image, ...GALLERY_FALLBACKS].slice(0, 4)
}

export function getServiceAddons(service: Service) {
  if (service.addons?.length) return service.addons
  return service.packages.slice(1).map((pkg) => ({
    id: pkg.id,
    title: `${pkg.name} upgrade (+${pkg.deliveryDays} days)`,
    description: pkg.description,
    price: Math.max(pkg.price - service.startingPrice, 0) || pkg.price,
    extraDays: pkg.deliveryDays,
  }))
}

export function getServiceProvidedList(service: Service) {
  if (service.servicesProvided?.length) return service.servicesProvided
  return service.packages[0]?.includes ?? []
}

export function getServiceTagGroups(service: Service) {
  if (service.tagGroups?.length) return service.tagGroups
  return [
    { label: 'Category', values: [service.category, service.subcategory] },
    { label: 'Field', values: [service.field] },
    {
      label: 'Delivery',
      values: [`From ${getMinDeliveryDays(service)} day(s)`],
    },
  ]
}

export function getRelatedServices(serviceId: string, limit = 4) {
  const services = listServices()
  const current = services.find((s) => s.id === serviceId)
  if (!current) return services.slice(0, limit)
  return services
    .filter((s) => s.id !== serviceId)
    .sort((a, b) => {
      const sameCategory =
        Number(b.category === current.category) - Number(a.category === current.category)
      if (sameCategory !== 0) return sameCategory
      return b.rating - a.rating
    })
    .slice(0, limit)
}
