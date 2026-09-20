import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Star, X } from 'lucide-react'
import type { Provider } from '@/entities/provider/types'
import type { ProfileResultAd } from '@/features/referrals/data/profileResultAds'
import { AdTopBanner } from '@/features/referrals/components/FeaturedAgentAdCard'
import { createCircleMarkerIcon, PINNED_MARKER_OPTIONS, type MarkerVisualState } from '@/features/referrals/lib/mapIcons'
import { MapMeasureTools } from '@/features/referrals/components/MapMeasureTools'
import { MapBasemapLayer } from '@/features/referrals/components/MapBasemapLayer'
import {
  LOCATION_ZOOM,
  MapFlyTo,
  MapInvalidateSize,
} from '@/features/referrals/lib/mapCamera'
import { formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'

type ProviderMarker = {
  provider: Provider
  position: [number, number]
  ad?: ProfileResultAd
}

type ProvidersMapProps = {
  providers: Provider[]
  /** Sponsored ads keyed by provider id — pins + popup banners. */
  adsByProviderId?: Record<string, ProfileResultAd>
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
      map.setView(markers[0].position, LOCATION_ZOOM)
      return
    }
    const bounds = L.latLngBounds(markers.map((m) => m.position))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: LOCATION_ZOOM })
  }, [map, markers])

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
  const { provider, position, ad } = marker
  const visualState = markerStateFor(provider.id, selectedId, hoveredId)
  const markerRef = useRef<L.Marker | null>(null)
  const icon = useMemo(
    () => createCircleMarkerIcon(provider.image, visualState, PINNED_MARKER_OPTIONS),
    [provider.image, visualState],
  )
  const isAd = Boolean(ad)

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
        className={isAd ? 'service-map-card-popup service-map-card-popup--ad' : 'service-map-card-popup'}
        closeButton={false}
        offset={[0, -8]}
        maxWidth={260}
        minWidth={240}
        autoPan={false}
      >
        <div
          className={
            isAd
              ? 'service-map-popup-card overflow-hidden bg-[#eef7fd]'
              : 'service-map-popup-card'
          }
        >
          {isAd ? <AdTopBanner /> : null}

          <div className="relative flex items-center gap-3 border-b border-line/70 p-3">
            <Link to={providerPath(provider.id)} className="shrink-0">
              <img
                src={provider.image}
                alt={provider.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              {ad ? (
                <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-[#2563eb]">
                  Sponsored · {ad.label}
                </p>
              ) : null}
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
  adsByProviderId,
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
      providers.map((provider) => {
        const ad = adsByProviderId?.[provider.id]
        return {
          provider,
          position: [provider.lat, provider.lng] as [number, number],
          ad,
        }
      }),
    [adsByProviderId, providers],
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
