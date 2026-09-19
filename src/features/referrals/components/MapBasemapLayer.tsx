import { useEffect } from 'react'
import { TileLayer, useMap } from 'react-leaflet'
import { MAP_BASEMAPS, useMapBasemap } from '@/features/referrals/lib/mapBasemap'

export function MapBasemapLayer() {
  const map = useMap()
  const basemap = useMapBasemap()
  const config = MAP_BASEMAPS[basemap]
  const maxZoom = Math.max(...config.layers.map((layer) => layer.maxZoom))

  useEffect(() => {
    if (map.getZoom() > maxZoom) map.setZoom(maxZoom)
  }, [map, maxZoom])

  return (
    <>
      {config.layers.map((layer) => (
        <TileLayer
          key={`${basemap}-${layer.url}`}
          attribution={layer.attribution}
          url={layer.url}
          maxZoom={layer.maxZoom}
          opacity={layer.opacity ?? 1}
        />
      ))}
    </>
  )
}
