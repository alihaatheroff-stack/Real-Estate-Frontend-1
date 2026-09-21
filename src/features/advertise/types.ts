export type AdImage = {
  id: string
  file: File
  previewUrl: string
}

export type AdvertisementDraft = {
  title: string
  description: string
  cta: string
  images: AdImage[]
}

export const EMPTY_ADVERTISEMENT_DRAFT: AdvertisementDraft = {
  title: '',
  description: '',
  cta: '',
  images: [],
}
