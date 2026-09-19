import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import {
  getVoteVenueLocation,
  type VoteVenue,
} from '@/features/crowdfunding/data/crowdfundingVote'
import { MapMeasureTools } from '@/features/referrals/components/MapMeasureTools'
import { MapBasemapLayer } from '@/features/referrals/components/MapBasemapLayer'
import { createCircleMarkerIcon, type MarkerVisualState } from '@/features/referrals/lib/mapIcons'
import { isMapSized, MapFlyTo, MapInvalidateSize } from '@/features/referrals/lib/mapCamera'

type VenueMarker = {
  venue: VoteVenue
  position: [number, number]
}

type CrowdfundingVenuesMapProps = {
  venues: VoteVenue[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

const DEFAULT_CENTER: [number, number] = [23.6345, -102.5528]

function MapBounds({ markers }: { markers: VenueMarker[] }) {
  const map = useMap()

  useEffect(() => {
    if (markers.length === 0 || !isMapSized(map)) return
    if (markers.length === 1) {
      map.setView(markers[0].position, 12)
      return
    }
    const bounds = L.latLngBounds(markers.map((marker) => marker.position))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 })
  }, [map, markers])

  return null
}

function markerStateFor(
  venueId: string,
  selectedId: string | null,
  hoveredId: string | null,
): MarkerVisualState {
  if (selectedId === venueId) return 'selected'
  if (hoveredId === venueId) return 'hover'
  return 'default'
}

function VenueMarkerPin({
  marker,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  marker: VenueMarker
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}) {
  const { venue, position } = marker
  const visualState = markerStateFor(venue.id, selectedId, hoveredId)
  const icon = useMemo(
    () => createCircleMarkerIcon(venue.image, visualState, { withPin: true, animated: false }),
    [venue.image, visualState],
  )

  return (
    <Marker
      position={position}
      icon={icon}
      zIndexOffset={visualState === 'selected' ? 1000 : visualState === 'hover' ? 500 : 0}
      eventHandlers={{
        click: (event) => {
          L.DomEvent.stopPropagation(event.originalEvent)
          onSelect(venue.id)
        },
        mouseover: () => onHover(venue.id),
        mouseout: () => onHover(null),
      }}
    />
  )
}

export function CrowdfundingVenuesMap({
  venues,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: CrowdfundingVenuesMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const markers = useMemo(
    () =>
      venues.map((venue) => {
        const location = getVoteVenueLocation(venue.id)
        return {
          venue,
          position: [location.lat, location.lng] as [number, number],
        }
      }),
    [venues],
  )

  const flyTarget = useMemo(() => {
    const targetId = selectedId ?? hoveredId
    if (!targetId) return null
    const marker = markers.find((item) => item.venue.id === targetId)
    return marker?.position ?? null
  }, [hoveredId, markers, selectedId])

  if (!mounted) {
    return <div className="h-full w-full animate-pulse bg-mist" aria-hidden />
  }

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={5}
      className="services-map h-full w-full"
      scrollWheelZoom
    >
      <MapBasemapLayer />
      <MapMeasureTools />
      <MapInvalidateSize />
      <MapBounds markers={markers} />
      <MapFlyTo
        position={flyTarget}
        enabled={Boolean(selectedId || hoveredId)}
        focusKey={selectedId ?? hoveredId}
      />
      {markers.map((marker) => (
        <VenueMarkerPin
          key={marker.venue.id}
          marker={marker}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </MapContainer>
  )
}
