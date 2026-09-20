import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Star, X } from 'lucide-react'
import type { Service } from '@/entities/provider/types'
import { getProviderForService } from '@/features/referrals/api/repository'
import { AdTopBanner } from '@/features/referrals/components/FeaturedAgentAdCard'
import { MapMeasureTools } from '@/features/referrals/components/MapMeasureTools'
import { MapBasemapLayer } from '@/features/referrals/components/MapBasemapLayer'
import type { ServiceResultAd } from '@/features/referrals/data/serviceResultAds'
import { createCircleMarkerIcon, PINNED_MARKER_OPTIONS, type MarkerVisualState } from '@/features/referrals/lib/mapIcons'
import {
  LOCATION_ZOOM,
  MapFlyTo,
  MapInvalidateSize,
} from '@/features/referrals/lib/mapCamera'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath, servicePath } from '@/app/router/paths'

type ServiceMarker = {
  service: Service
  position: [number, number]
  ad?: ServiceResultAd
}

type ServicesMapProps = {
  services: Service[]
  adsByServiceId?: Record<string, ServiceResultAd>
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

const DEFAULT_CENTER: [number, number] = [36.7378, -119.7871]
const FALLBACK_IMAGE =
  '/images/stock/photo-1560518883-ce09059eeffa.jpg'

function MapBounds({ markers }: { markers: ServiceMarker[] }) {
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
  serviceId: string,
  selectedId: string | null,
  hoveredId: string | null,
): MarkerVisualState {
  if (selectedId === serviceId) return 'selected'
  if (hoveredId === serviceId) return 'hover'
  return 'default'
}

function ServiceMarkerPin({
  marker,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  marker: ServiceMarker
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}) {
  const { service, position, ad } = marker
  const provider = getProviderForService(service)
  const visualState = markerStateFor(service.id, selectedId, hoveredId)
  const markerRef = useRef<L.Marker | null>(null)
  const [imageSrc, setImageSrc] = useState(service.image)
  const icon = useMemo(
    () => createCircleMarkerIcon(service.image, visualState, PINNED_MARKER_OPTIONS),
    [service.image, visualState],
  )
  const isAd = Boolean(ad)

  useEffect(() => {
    const leafletMarker = markerRef.current
    if (!leafletMarker) return
    if (selectedId === service.id) {
      leafletMarker.openPopup()
    } else {
      leafletMarker.closePopup()
    }
  }, [selectedId, service.id])

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      zIndexOffset={visualState === 'selected' ? 1000 : visualState === 'hover' ? 500 : 0}
      eventHandlers={{
        click: (event) => {
          L.DomEvent.stopPropagation(event.originalEvent)
          onSelect(service.id)
        },
        mouseover: () => onHover(service.id),
        mouseout: () => onHover(null),
        popupclose: () => {
          if (selectedId === service.id) onSelect(null)
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
        <div className={isAd ? 'service-map-popup-card overflow-hidden bg-[#eef7fd]' : 'service-map-popup-card'}>
          {isAd ? <AdTopBanner /> : null}
          <div className="relative overflow-hidden rounded-t-xl">
            <Link to={servicePath(service.id)} className="block">
              <img
                src={imageSrc}
                alt={service.title}
                className="aspect-[4/3] w-full object-cover"
                onError={() => setImageSrc(FALLBACK_IMAGE)}
              />
            </Link>
            <button
              type="button"
              aria-label="Close"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onSelect(null)
                markerRef.current?.closePopup()
              }}
              className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition hover:bg-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2 p-3">
            <Link
              to={servicePath(service.id)}
              className="line-clamp-2 text-sm font-bold leading-snug text-brand hover:underline"
            >
              {service.title}
            </Link>

            <div className="inline-flex items-center gap-1 text-xs text-ink">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-semibold">{formatRating(service.rating)}</span>
              <span className="text-muted">({service.reviewCount} Reviews)</span>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2">
              {provider ? (
                <Link
                  to={providerPath(provider.id)}
                  className="flex min-w-0 items-center gap-2 hover:opacity-90"
                >
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                  />
                  <span className="truncate text-xs font-medium text-ink">{provider.name}</span>
                </Link>
              ) : (
                <span />
              )}
              <div className="shrink-0 text-right">
                <p className="text-[10px] leading-none text-muted">Starting at:</p>
                <p className="text-sm font-bold text-ink">
                  {formatCurrency(service.startingPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export function ServicesMap({
  services,
  adsByServiceId,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: ServicesMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const markers = useMemo(
    () =>
      services.flatMap((service) => {
        const provider = getProviderForService(service)
        if (!provider) return []
        return [{
          service,
          position: [provider.lat, provider.lng] as [number, number],
          ad: adsByServiceId?.[service.id],
        }]
      }),
    [adsByServiceId, services],
  )

  const flyTarget = useMemo(() => {
    const targetId = selectedId ?? hoveredId
    if (!targetId) return null
    const marker = markers.find((m) => m.service.id === targetId)
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
        <ServiceMarkerPin
          key={marker.service.id}
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
