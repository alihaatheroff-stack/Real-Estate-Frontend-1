import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

/** Moves Leaflet's default zoom control to the bottom-left corner. */
export function MapZoomPosition() {
  const map = useMap()

  useEffect(() => {
    const control = map.zoomControl
    if (!control) return
    control.setPosition('bottomleft')
  }, [map])

  return null
}
