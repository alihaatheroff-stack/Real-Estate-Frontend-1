import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { Map, MountainSnow, Satellite } from 'lucide-react'
import {
  MAP_BASEMAP_OPTIONS,
  setMapBasemap,
  useMapBasemap,
  type MapBasemapId,
} from '@/features/referrals/lib/mapBasemap'
import { cn } from '@/shared/lib/cn'

export function MapBasemapControl() {
  const map = useMap()
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const basemap = useMapBasemap()

  useLayoutEffect(() => {
    const node = menuRef.current
    if (!node) return
    L.DomEvent.disableClickPropagation(node)
    L.DomEvent.disableScrollPropagation(node)
  }, [menuOpen])

  const overlay = (
    <div ref={menuRef} className="pointer-events-auto absolute left-3 top-3 z-[1100] sm:left-4 sm:top-4">
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-label="Map view"
        onClick={() => setMenuOpen((open) => !open)}
        className={cn(
          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-soft transition',
          menuOpen
            ? 'border-brand bg-brand text-white'
            : 'border-line bg-paper text-ink hover:border-brand hover:text-brand',
        )}
      >
        <Satellite className="h-4 w-4" strokeWidth={2} />
      </button>

      {menuOpen ? (
        <div className="mt-2 w-[200px] overflow-hidden rounded-2xl border border-line bg-paper/95 shadow-panel backdrop-blur">
          <p className="px-3 pb-1 pt-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
            Map view
          </p>
          {MAP_BASEMAP_OPTIONS.map((id) => (
            <BasemapRow
              key={id}
              icon={basemapIcon(id)}
              label={basemapLabel(id)}
              active={basemap === id}
              onClick={() => {
                setMapBasemap(id)
                setMenuOpen(false)
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  )

  return createPortal(overlay, map.getContainer())
}

function basemapLabel(id: MapBasemapId) {
  if (id === 'satellite') return 'Satellite'
  if (id === 'terrain') return 'Terrain'
  return 'Map'
}

function basemapIcon(id: MapBasemapId) {
  if (id === 'satellite') return <Satellite className="h-4 w-4 shrink-0" />
  if (id === 'terrain') return <MountainSnow className="h-4 w-4 shrink-0" />
  return <Map className="h-4 w-4 shrink-0" />
}

function BasemapRow({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition last:pb-2.5',
        active ? 'bg-brand-light text-brand' : 'text-ink hover:bg-mist',
      )}
    >
      <span className={active ? 'text-brand' : 'text-muted'}>{icon}</span>
      <span className="flex-1">{label}</span>
      {active ? <span className="text-xs text-brand/80">✓</span> : null}
    </button>
  )
}
