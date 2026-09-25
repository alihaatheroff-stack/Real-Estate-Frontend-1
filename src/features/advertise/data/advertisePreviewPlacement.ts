/** Temporary preview-context filters — separate from targeting / Ad-Type options. */

export type PreviewPageId = 'Network > Newsfeed'

export type NetworkPlacementId = 'top-left' | 'top-right' | 'in-between-posts'

export type PreviewPlacementId = NetworkPlacementId

export type PreviewPageGroup = {
  label: string
  pages: { value: PreviewPageId; label: string }[]
}

export type PreviewPlacementOption = {
  value: PreviewPlacementId
  label: string
}

/** Nested page groups for the Choose Page dropdown (parent → sub-pages). */
export const PREVIEW_PAGE_GROUPS: PreviewPageGroup[] = [
  {
    label: 'Network',
    pages: [{ value: 'Network > Newsfeed', label: 'Newsfeed' }],
  },
]

export const PREVIEW_PLACEMENTS_BY_PAGE: Record<
  PreviewPageId,
  PreviewPlacementOption[]
> = {
  'Network > Newsfeed': [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'in-between-posts', label: 'In Between Posts' },
  ],
}

export function placementsForPage(page: string): PreviewPlacementOption[] {
  if (page in PREVIEW_PLACEMENTS_BY_PAGE) {
    return PREVIEW_PLACEMENTS_BY_PAGE[page as PreviewPageId]
  }
  return []
}

export function isPreviewPageId(value: string): value is PreviewPageId {
  return value in PREVIEW_PLACEMENTS_BY_PAGE
}

export function isNetworkNewsfeedPage(value: string): boolean {
  return value === 'Network > Newsfeed'
}

export function isNetworkPlacementId(value: string): value is NetworkPlacementId {
  return PREVIEW_PLACEMENTS_BY_PAGE['Network > Newsfeed'].some(
    (option) => option.value === value,
  )
}

export function previewPageLabel(page: string): string {
  if (page === 'Network > Newsfeed') return 'Network · Newsfeed'
  return page
}

export function previewPlacementLabel(placement: string): string {
  if (placement === 'top-left') return 'Top Left'
  if (placement === 'top-right') return 'Top Right'
  if (placement === 'in-between-posts') return 'In Between Posts'
  return placement
}
