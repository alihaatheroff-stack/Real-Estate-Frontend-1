import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Star, X } from 'lucide-react'
import type { Employer } from '@/entities/employer/types'
import { AdTopBanner } from '@/features/referrals/components/FeaturedAgentAdCard'
import type { EmployerResultAd } from '@/features/referrals/data/employerResultAds'
import {
  createCircleMarkerIcon,
  createInitialsMarkerIcon,
  PINNED_MARKER_OPTIONS,
  type MarkerVisualState,
} from '@/features/referrals/lib/mapIcons'
import { MapMeasureTools } from '@/features/referrals/components/MapMeasureTools'
import { MapBasemapLayer } from '@/features/referrals/components/MapBasemapLayer'
import {
  LOCATION_ZOOM,
  MapFlyTo,
  MapInvalidateSize,
} from '@/features/referrals/lib/mapCamera'
import { formatRating } from '@/shared/lib/format'
import { employerPath } from '@/app/router/paths'

type EmployerMarker = {
  employer: Employer
  position: [number, number]
  ad?: EmployerResultAd
}

type EmployersMapProps = {
  employers: Employer[]
  adsByEmployerId?: Record<string, EmployerResultAd>
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

const DEFAULT_CENTER: [number, number] = [36.7378, -119.7871]

function MapBounds({ markers }: { markers: EmployerMarker[] }) {
  const map = useMap()

  useEffect(() => {
    if (markers.length === 0) return
    if (markers.length === 1) {
      map.setView(markers[0].position, LOCATION_ZOOM)
      return
    }
    const bounds = L.latLngBounds(markers.map((marker) => marker.position))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: LOCATION_ZOOM })
  }, [map, markers])

  return null
}

function markerStateFor(
  employerId: string,
  selectedId: string | null,
  hoveredId: string | null,
): MarkerVisualState {
  if (selectedId === employerId) return 'selected'
  if (hoveredId === employerId) return 'hover'
  return 'default'
}

function EmployerMarkerPin({
  marker,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  marker: EmployerMarker
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}) {
  const { employer, position, ad } = marker
  const visualState = markerStateFor(employer.id, selectedId, hoveredId)
  const markerRef = useRef<L.Marker | null>(null)
  const isAd = Boolean(ad)
  const icon = useMemo(() => {
    if (employer.logoUrl) {
      return createCircleMarkerIcon(employer.logoUrl, visualState, PINNED_MARKER_OPTIONS)
    }
    return createInitialsMarkerIcon(
      employer.logoInitials,
      employer.logoColor,
      visualState,
      PINNED_MARKER_OPTIONS,
    )
  }, [employer.logoColor, employer.logoInitials, employer.logoUrl, visualState])

  useEffect(() => {
    const leafletMarker = markerRef.current
    if (!leafletMarker) return
    if (selectedId === employer.id) {
      leafletMarker.openPopup()
    } else {
      leafletMarker.closePopup()
    }
  }, [employer.id, selectedId])

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      zIndexOffset={visualState === 'selected' ? 1000 : visualState === 'hover' ? 500 : 0}
      eventHandlers={{
        click: (event) => {
          L.DomEvent.stopPropagation(event.originalEvent)
          onSelect(employer.id)
        },
        mouseover: () => onHover(employer.id),
        mouseout: () => onHover(null),
        popupclose: () => {
          if (selectedId === employer.id) onSelect(null)
        },
      }}
    >
      <Popup
        className={isAd ? 'employer-map-card-popup employer-map-card-popup--ad' : 'employer-map-card-popup'}
        closeButton={false}
        offset={[0, -8]}
        maxWidth={260}
        minWidth={240}
        autoPan={false}
      >
        <div
          className={
            isAd
              ? 'employer-map-popup-card overflow-hidden rounded-xl border border-[#b7d8f0] bg-[#eef7fd] shadow-lg'
              : 'employer-map-popup-card rounded-xl border border-freeio-border-soft bg-white shadow-lg'
          }
        >
          {isAd ? <AdTopBanner /> : null}
          <div className="relative flex items-center gap-3 border-b border-freeio-border-soft p-3">
            {employer.logoUrl ? (
              <img
                src={employer.logoUrl}
                alt={`${employer.name} logo`}
                className="h-12 w-12 rounded-xl object-contain"
              />
            ) : (
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: employer.logoColor }}
              >
                {employer.logoInitials}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <Link
                to={employerPath(employer.id)}
                className="line-clamp-2 text-sm font-bold leading-snug text-freeio hover:underline"
              >
                {employer.name}
              </Link>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-freeio-muted">
                <MapPin className="h-3 w-3" />
                {employer.city}, {employer.state}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onSelect(null)
                markerRef.current?.closePopup()
              }}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-freeio-hover text-freeio-ink transition hover:bg-freeio-border-soft"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2 p-3">
            <div className="inline-flex items-center gap-1 text-xs text-freeio-ink">
              <Star className="h-3.5 w-3.5 fill-freeio-star text-freeio-star" />
              <span className="font-semibold">{formatRating(employer.rating)}</span>
              <span className="text-freeio-muted">
                ({employer.reviewCount} {employer.reviewCount === 1 ? 'Review' : 'Reviews'})
              </span>
            </div>
            <p className="text-xs font-medium text-freeio-ink">
              {employer.openProjects === 1 ? 'Open Project' : 'Open Projects'} -{' '}
              {employer.openProjects}
            </p>
            <Link
              to={employerPath(employer.id)}
              className="inline-flex text-xs font-semibold text-freeio hover:underline"
            >
              View company profile
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export function EmployersMap({
  employers,
  adsByEmployerId,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: EmployersMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const markers = useMemo(
    () =>
      employers.map((employer) => ({
        employer,
        position: [employer.lat, employer.lng] as [number, number],
        ad: adsByEmployerId?.[employer.id],
      })),
    [adsByEmployerId, employers],
  )

  const flyTarget = useMemo(() => {
    const targetId = selectedId ?? hoveredId
    if (!targetId) return null
    const marker = markers.find((item) => item.employer.id === targetId)
    return marker?.position ?? null
  }, [hoveredId, markers, selectedId])

  if (!mounted) {
    return <div className="h-full w-full animate-pulse bg-freeio-hover" aria-hidden />
  }

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={10}
      className="employers-map h-full w-full"
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
        <EmployerMarkerPin
          key={marker.employer.id}
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
