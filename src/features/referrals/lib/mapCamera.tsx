import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

/** Street / neighborhood detail when focusing a single pin. */
export const LOCATION_ZOOM = 17

/**
 * Keep the popup on-screen above the pin without pushing the marker below
 * the visible map panel.
 */
const POPUP_CENTER_OFFSET_Y = 110

/** Leaflet project/unproject returns NaN when the map is display:none or 0×0. */
export function isMapContainerVisible(map: L.Map) {
  const container = map.getContainer()
  if (!container.isConnected) return false
  const rect = container.getBoundingClientRect()
  return rect.width >= 2 && rect.height >= 2
}

export function isMapSized(map: L.Map) {
  if (!isMapContainerVisible(map)) return false
  const size = map.getSize()
  return size.x >= 2 && size.y >= 2 && Number.isFinite(size.x) && Number.isFinite(size.y)
}

export function latLngForVisibleMapCenter(
  map: L.Map,
  position: [number, number],
  zoom: number,
): L.LatLng | null {
  if (!isMapSized(map)) return null
  const container = map.getContainer()
  const rect = container.getBoundingClientRect()
  const fullSize = map.getSize()
  const visibleTop = Math.max(0, -rect.top)
  const visibleBottom = Math.min(fullSize.y, window.innerHeight - rect.top)
  const visibleHeight = Math.max(1, visibleBottom - visibleTop)
  const popupOffset = Math.min(POPUP_CENTER_OFFSET_Y, Math.round(visibleHeight * 0.16))
  const targetScreenY = visibleTop + visibleHeight / 2 + popupOffset
  const shiftFromMapCenter = targetScreenY - fullSize.y / 2
  const markerPoint = map.project(position, zoom)
  const centerPoint = markerPoint.subtract([0, shiftFromMapCenter])
  const center = map.unproject(centerPoint, zoom)
  if (!Number.isFinite(center.lat) || !Number.isFinite(center.lng)) return null
  return center
}

export function MapInvalidateSize() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    const sync = () => {
      if (!isMapContainerVisible(map)) {
        map.stop()
        return
      }
      map.invalidateSize({ animate: false })
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(container)
    window.addEventListener('resize', sync)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [map])

  return null
}

export function MapFlyTo({
  position,
  enabled,
  focusKey,
}: {
  position: [number, number] | null
  enabled: boolean
  focusKey?: string | null
}) {
  const map = useMap()

  useEffect(() => {
    if (!enabled || !position) return
    if (map.getContainer().classList.contains('map-measuring')) return
    if (!isMapContainerVisible(map)) {
      map.stop()
      return
    }
    map.invalidateSize({ animate: false })
    if (!isMapSized(map)) {
      map.stop()
      return
    }
    const zoom = Math.max(map.getZoom(), LOCATION_ZOOM)
    const center = latLngForVisibleMapCenter(map, position, zoom)
    if (!center) return
    map.flyTo(center, zoom, { duration: 0.45 })
  }, [enabled, focusKey, map, position])

  return null
}
