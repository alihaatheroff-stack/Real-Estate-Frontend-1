import L from 'leaflet'

export type MarkerVisualState = 'default' | 'hover' | 'selected'

export const PINNED_MARKER_OPTIONS = { withPin: true, animated: false } as const

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function markerSizeFor(state: MarkerVisualState) {
  return state === 'selected' ? 54 : state === 'hover' ? 48 : 42
}

function pinMetrics(size: number) {
  const inner = Math.round(size * 0.72)
  const tipExtra = Math.round(size * 0.22)
  const shadowExtra = 10
  const totalHeight = size + tipExtra + shadowExtra
  const pinAnchorY = size / 2 + size / Math.SQRT2
  return { inner, totalHeight, pinAnchorY }
}

function pinShadowFor(state: MarkerVisualState) {
  return state === 'hover' || state === 'selected'
    ? '0 0 0 4px #ffffff, 0 6px 16px rgb(15 31 26 / 0.28)'
    : '0 0 0 3px #ffffff, -1px 2px 5px rgb(0 0 0 / 0.28)'
}

function circleRingFor(state: MarkerVisualState) {
  return state === 'hover' || state === 'selected'
    ? '0 0 0 3px #ffffff, 0 0 0 7px #d4a017, 0 8px 20px rgb(15 31 26 / 0.22)'
    : '0 0 0 3px #ffffff, 0 6px 16px rgb(15 31 26 / 0.18)'
}

function pinnedMarkerHtml(size: number, inner: number, totalHeight: number, shadow: string, innerContent: string) {
  return `<div class="service-map-marker__pin-wrap" style="width:${size}px;height:${totalHeight}px">
      <div class="service-map-marker__body">
        <div class="service-map-marker__pin" style="width:${size}px;height:${size}px;box-shadow:${shadow}">
          <div class="service-map-marker__shell" style="width:${inner}px;height:${inner}px">
            ${innerContent}
          </div>
        </div>
      </div>
      <span class="service-map-marker__shadow" aria-hidden="true"></span>
    </div>`
}

function pinnedDivIcon(size: number, totalHeight: number, pinAnchorY: number, html: string, animated: boolean) {
  return L.divIcon({
    className: [
      'service-map-marker',
      'service-map-marker--pinned',
      animated ? '' : 'service-map-marker--static',
    ]
      .filter(Boolean)
      .join(' '),
    html,
    iconSize: [size, totalHeight],
    iconAnchor: [size / 2, pinAnchorY],
    popupAnchor: [0, -pinAnchorY],
  })
}

export function createInitialsMarkerIcon(
  initials: string,
  color: string,
  state: MarkerVisualState,
  options?: { withPin?: boolean; animated?: boolean },
) {
  const size = markerSizeFor(state)
  const withPin = Boolean(options?.withPin)
  const animated = options?.animated !== false
  const label = `<span>${escapeHtml(initials)}</span>`

  if (withPin) {
    const { inner, totalHeight, pinAnchorY } = pinMetrics(size)
    const html = pinnedMarkerHtml(
      size,
      inner,
      totalHeight,
      pinShadowFor(state),
      `<div class="service-map-marker__initials" style="background-color:${escapeHtml(color)}">${label}</div>`,
    )
    return pinnedDivIcon(size, totalHeight, pinAnchorY, html, animated)
  }

  return L.divIcon({
    className: 'employer-map-marker',
    html: `<div class="employer-map-marker__shell" style="width:${size}px;height:${size}px;background-color:${escapeHtml(color)};box-shadow:${circleRingFor(state)}">
      ${label}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

export function createCircleMarkerIcon(
  imageUrl: string,
  state: MarkerVisualState,
  options?: { withPin?: boolean; animated?: boolean },
) {
  const size = markerSizeFor(state)
  const withPin = Boolean(options?.withPin)
  const animated = options?.animated !== false
  const image = `<img src="${escapeHtml(imageUrl)}" alt="" />`

  if (withPin) {
    const { inner, totalHeight, pinAnchorY } = pinMetrics(size)
    const html = pinnedMarkerHtml(size, inner, totalHeight, pinShadowFor(state), image)
    return pinnedDivIcon(size, totalHeight, pinAnchorY, html, animated)
  }

  return L.divIcon({
    className: ['service-map-marker', animated ? '' : 'service-map-marker--static']
      .filter(Boolean)
      .join(' '),
    html: `<div class="service-map-marker__shell" style="width:${size}px;height:${size}px;box-shadow:${circleRingFor(state)}">
      ${image}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

