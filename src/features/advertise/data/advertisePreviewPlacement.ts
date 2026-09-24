/** Temporary preview-context filters — separate from targeting / Ad-Type options. */

export type PreviewPageId = 'network'

export type NetworkPlacementId = 'top-left' | 'top-right' | 'in-between-posts'

export type PreviewPlacementId = NetworkPlacementId

export type PreviewPageOption = {
  value: PreviewPageId
  label: string
}

export type PreviewPlacementOption = {
  value: PreviewPlacementId
  label: string
}

export const PREVIEW_PAGE_OPTIONS: PreviewPageOption[] = [
  { value: 'network', label: 'Network' },
]

export const PREVIEW_PLACEMENTS_BY_PAGE: Record<
  PreviewPageId,
  PreviewPlacementOption[]
> = {
  network: [
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
  return PREVIEW_PAGE_OPTIONS.some((option) => option.value === value)
}

export function isNetworkPlacementId(value: string): value is NetworkPlacementId {
  return PREVIEW_PLACEMENTS_BY_PAGE.network.some((option) => option.value === value)
}
