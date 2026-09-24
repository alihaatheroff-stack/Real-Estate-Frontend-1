export type AdImage = {
  id: string
  file: File
  previewUrl: string
}

export type AdvertisementDraft = {
  title: string
  description: string
  cta: string
  /** Image or video media for the ad. */
  images: AdImage[]
}

export const EMPTY_ADVERTISEMENT_DRAFT: AdvertisementDraft = {
  title: '',
  description: '',
  cta: '',
  images: [],
}

export function isAdVideo(media: AdImage) {
  return media.file.type.startsWith('video/')
}
