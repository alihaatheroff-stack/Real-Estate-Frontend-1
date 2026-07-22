import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Star, X } from 'lucide-react'
import type { Provider } from '@/entities/provider/types'
import { createCircleMarkerIcon, type MarkerVisualState } from '@/features/referrals/lib/mapIcons'
import { formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'

type ProviderMarker = {
  provider: Provider
  position: [number, number]
}

type ProvidersMapProps = {
  providers: Provider[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

const DEFAULT_CENTER: [number, number] = [36.7378, -119.7871]

function MapBounds({ markers }: { markers: ProviderMarker[] }) {
  const map = useMap()

  useEffect(() => {
    if (markers.length === 0) return
    if (markers.length === 1) {
      map.setView(markers[0].position, 11)
      return
    }
    const bounds = L.latLngBounds(markers.map((m) => m.position))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 })
  }, [map, markers])

  return null
}

function MapFlyTo({
  position,
  enabled,
}: {
  position: [number, number] | null
  enabled: boolean
}) {
  const map = useMap()

  useEffect(() => {
    if (!enabled || !position) return
    map.flyTo(position, Math.max(map.getZoom(), 12), { duration: 0.45 })
  }, [enabled, map, position])

  return null
}

function markerStateFor(
  providerId: string,
  selectedId: string | null,
  hoveredId: string | null,
): MarkerVisualState {
  if (selectedId === providerId) return 'selected'
  if (hoveredId === providerId) return 'hover'
  return 'default'
}

function rateLabel(provider: Provider) {
  if (provider.hourlyRateMin != null && provider.hourlyRateMax != null) {
    return `$${provider.hourlyRateMin} - $${provider.hourlyRateMax} / hr`
  }
  return 'Rate on request'
}

function ProviderMarkerPin({
  marker,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  marker: ProviderMarker
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}) {
  const { provider, position } = marker
  const visualState = markerStateFor(provider.id, selectedId, hoveredId)
  const markerRef = useRef<L.Marker | null>(null)
  const icon = useMemo(
    () => createCircleMarkerIcon(provider.image, visualState),
    [provider.image, visualState],
  )

  useEffect(() => {
    const leafletMarker = markerRef.current
    if (!leafletMarker) return
    if (selectedId === provider.id) {
      leafletMarker.openPopup()
    } else {
      leafletMarker.closePopup()
    }
  }, [selectedId, provider.id])

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      zIndexOffset={visualState === 'selected' ? 1000 : visualState === 'hover' ? 500 : 0}
      eventHandlers={{
        click: (event) => {
          L.DomEvent.stopPropagation(event.originalEvent)
          onSelect(provider.id)
        },
        mouseover: () => onHover(provider.id),
        mouseout: () => onHover(null),
        popupclose: () => {
          if (selectedId === provider.id) onSelect(null)
        },
      }}
    >
      <Popup
        className="service-map-card-popup"
        closeButton={false}
        offset={[0, -8]}
        maxWidth={260}
        minWidth={240}
        autoPan
        autoPanPadding={[24, 24]}
      >
        <div className="service-map-popup-card">
          <div className="relative flex items-center gap-3 border-b border-line/70 p-3">
            <Link to={providerPath(provider.id)} className="shrink-0">
              <img
                src={provider.image}
                alt={provider.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                to={providerPath(provider.id)}
                className="block truncate text-sm font-bold text-brand hover:underline"
              >
                {provider.name}
              </Link>
              <p className="truncate text-xs text-muted">{provider.title}</p>
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
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition hover:bg-line"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2 p-3">
            <div className="inline-flex items-center gap-1 text-xs text-ink">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-semibold">{formatRating(provider.rating)}</span>
              <span className="text-muted">
                ({provider.reviewCount} {provider.reviewCount === 1 ? 'Review' : 'Reviews'})
              </span>
            </div>

            <p className="inline-flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" />
              {provider.city}, {provider.state}
            </p>

            <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2">
              <span className="text-xs font-semibold text-ink">{rateLabel(provider)}</span>
              <Link
                to={providerPath(provider.id)}
                className="text-xs font-semibold text-brand hover:underline"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export function ProvidersMap({
  providers,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: ProvidersMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const markers = useMemo(
    () =>
      providers.map((provider) => ({
        provider,
        position: [provider.lat, provider.lng] as [number, number],
      })),
    [providers],
  )

  const flyTarget = useMemo(() => {
    const targetId = selectedId ?? hoveredId
    if (!targetId) return null
    const marker = markers.find((m) => m.provider.id === targetId)
    return marker?.position ?? null
  }, [hoveredId, markers, selectedId])

  if (!mounted) {
    return <div className="h-full w-full animate-pulse bg-mist" aria-hidden />
  }

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={10}
      className="services-map h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBounds markers={markers} />
      <MapFlyTo position={flyTarget} enabled={Boolean(selectedId)} />
      {markers.map((marker) => (
        <ProviderMarkerPin
          key={marker.provider.id}
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
