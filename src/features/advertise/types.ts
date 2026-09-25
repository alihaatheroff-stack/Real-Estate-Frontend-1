export type AdImage = {
  id: string
  file: File
  previewUrl: string
}

/** Where advertiser / broker info appears relative to the ad image. */
export type AdRolePlacement = 'above-image' | 'below-image'

export type AdvertisementDraft = {
  title: string
  description: string
  cta: string
  /** Image or video media for the ad. */
  images: AdImage[]
  /** Broker name shown on the ad. */
  advertiserName: string
  /** PSP / professional role shown on the ad. */
  role: string
  /** Place broker block above or below the creative image. */
  rolePlacement: AdRolePlacement
  /** Name of community-related service / office. */
  brokerage: string
  /** Service offered (e.g. ABC Pool Service). */
  service: string
  /** Broker / DRE license number. */
  brokerLicense: string
  /** Street address. */
  address: string
  /** City. */
  city: string
  /** Zip / postal code. */
  zipcode: string
  /** Contact phone. */
  phone: string
  /** Offer a referral split on this ad. */
  offerReferral: boolean
  /** Referral percentage shown on the starburst badge (e.g. "50"). */
  referralPercent: string
}

export const EMPTY_ADVERTISEMENT_DRAFT: AdvertisementDraft = {
  title: '',
  description: '',
  cta: '',
  images: [],
  advertiserName: '',
  role: '',
  rolePlacement: 'below-image',
  brokerage: '',
  service: '',
  brokerLicense: '',
  address: '',
  city: '',
  zipcode: '',
  phone: '',
  offerReferral: false,
  referralPercent: '',
}

export function isAdVideo(media: AdImage) {
  return Boolean(media?.file?.type?.startsWith('video/'))
}

/** Normalize referral % for the ad badge (safe for empty/undefined). */
export function resolveReferralPercent(value: string | number | null | undefined) {
  const cleaned = String(value ?? '')
    .replace(/[^\d.]/g, '')
    .trim()
  if (!cleaned) return ''
  const n = Number(cleaned)
  if (!Number.isFinite(n) || n <= 0) return ''
  return String(Math.min(100, Math.round(n)))
}
