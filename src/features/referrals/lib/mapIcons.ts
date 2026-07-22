import L from 'leaflet'

export type MarkerVisualState = 'default' | 'hover' | 'selected'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function createCircleMarkerIcon(imageUrl: string, state: MarkerVisualState) {
  const size = state === 'selected' ? 54 : state === 'hover' ? 48 : 42
  const ring =
    state === 'hover' || state === 'selected'
      ? '0 0 0 3px #ffffff, 0 0 0 7px #d4a017, 0 8px 20px rgb(15 31 26 / 0.22)'
      : '0 0 0 3px #ffffff, 0 6px 16px rgb(15 31 26 / 0.18)'

  return L.divIcon({
    className: 'service-map-marker',
    html: `<div class="service-map-marker__shell" style="width:${size}px;height:${size}px;box-shadow:${ring}">
      <img src="${escapeHtml(imageUrl)}" alt="" />
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}
