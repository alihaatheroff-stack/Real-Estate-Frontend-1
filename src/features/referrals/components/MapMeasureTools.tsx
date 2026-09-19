import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CircleMarker, Polygon, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { LandPlot, Map, Mountain, MountainSnow, Ruler, Satellite, Spline, X } from 'lucide-react'
import { fetchElevationsMeters } from '@/features/referrals/lib/elevation'
import {
  MAP_BASEMAP_OPTIONS,
  setMapBasemap,
  useMapBasemap,
  type MapBasemapId,
} from '@/features/referrals/lib/mapBasemap'
import {
  formatAreaDetail,
  formatDistanceDetail,
  formatElevation,
  loadMeasureUnits,
  pathLengthMeters,
  polygonAreaSqMeters,
  saveMeasureUnits,
  type LatLngTuple,
  type MeasureTool,
  type MeasureUnitSystem,
} from '@/features/referrals/lib/mapMeasure'
import { cn } from '@/shared/lib/cn'

const LINE_STYLE = { color: '#1b6b4f', weight: 3, opacity: 0.95 }
const FILL_STYLE = { color: '#1b6b4f', weight: 3, opacity: 0.95, fillColor: '#1b6b4f', fillOpacity: 0.18 }
const VERTEX_STYLE = { color: '#ffffff', weight: 2, fillColor: '#1b6b4f', fillOpacity: 1 }
const PREVIEW_STYLE = { color: '#1b6b4f', weight: 3, opacity: 0.55, dashArray: '6 6' }

function vertices(points: LatLngTuple[]) {
  return points.map((point, index) => (
    <CircleMarker
      key={`${point[0]}-${point[1]}-${index}`}
      center={point}
      radius={5}
      pathOptions={VERTEX_STYLE}
      interactive={false}
    />
  ))
}

export function MapMeasureTools() {
  const map = useMap()
  const menuRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [unitsOpen, setUnitsOpen] = useState(false)
  const [units, setUnits] = useState<MeasureUnitSystem>(() => loadMeasureUnits())
  const [tool, setTool] = useState<MeasureTool | null>(null)
  const [points, setPoints] = useState<LatLngTuple[]>([])
  const [cursor, setCursor] = useState<LatLngTuple | null>(null)
  const [finished, setFinished] = useState(false)
  const [elevations, setElevations] = useState<number[]>([])
  const [elevationError, setElevationError] = useState<string | null>(null)
  const [elevationLoading, setElevationLoading] = useState(false)
  const basemap = useMapBasemap()

  const active = tool != null && !finished
  const previewPoints = useMemo(() => {
    if (!active || !cursor || points.length === 0) return points
    return [...points, cursor]
  }, [active, cursor, points])

  const selectTool = useCallback((next: MeasureTool) => {
    setTool((current) => {
      const turningOff = current === next
      if (turningOff) {
        setPoints([])
        setCursor(null)
        setFinished(false)
        setElevations([])
        setElevationError(null)
        setElevationLoading(false)
        return null
      }
      setPoints([])
      setCursor(null)
      setFinished(false)
      setElevations([])
      setElevationError(null)
      setElevationLoading(false)
      setUnitsOpen(false)
      return next
    })
    setMenuOpen(true)
  }, [])

  const clearDrawing = useCallback(() => {
    setPoints([])
    setCursor(null)
    setFinished(false)
    setElevations([])
    setElevationError(null)
    setElevationLoading(false)
  }, [])

  const finishDrawing = useCallback(() => {
    setCursor(null)
    setFinished(true)
  }, [])

  const setUnitSystem = useCallback((next: MeasureUnitSystem) => {
    setUnits(next)
    saveMeasureUnits(next)
  }, [])

  useEffect(() => {
    const container = map.getContainer()
    container.classList.toggle('map-measuring', tool != null)
    container.classList.toggle('map-measure-drawing', active)
    if (active) {
      map.doubleClickZoom.disable()
    } else {
      map.doubleClickZoom.enable()
    }
    return () => {
      container.classList.remove('map-measuring')
      container.classList.remove('map-measure-drawing')
      map.doubleClickZoom.enable()
    }
  }, [active, map, tool])

  useLayoutEffect(() => {
    const nodes = [menuRef.current, readoutRef.current].filter(
      (node): node is HTMLDivElement => node != null,
    )
    nodes.forEach((node) => {
      L.DomEvent.disableClickPropagation(node)
      L.DomEvent.disableScrollPropagation(node)
    })
  }, [menuOpen, tool, points, finished, unitsOpen])

  useEffect(() => {
    if (tool !== 'elevation' || points.length === 0) return
    const controller = new AbortController()
    setElevationLoading(true)
    setElevationError(null)
    fetchElevationsMeters(points, controller.signal)
      .then((heights) => {
        setElevations(heights)
        setElevationLoading(false)
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof DOMException && error.name === 'AbortError') return
        setElevationLoading(false)
        setElevationError(error instanceof Error ? error.message : 'Elevation lookup failed')
      })
    return () => controller.abort()
  }, [points, tool])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (points.length > 0 || finished) {
          clearDrawing()
          return
        }
        setTool(null)
        setMenuOpen(false)
        return
      }
      if (event.key === 'Enter' && tool && points.length > 0 && !finished) {
        if (tool === 'distance' && points.length < 2) return
        if (tool === 'area' && points.length < 3) return
        finishDrawing()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [clearDrawing, finishDrawing, finished, points.length, tool])

  useMapEvents({
    click(event) {
      if (!tool) return
      const next: LatLngTuple = [event.latlng.lat, event.latlng.lng]
      if (finished) {
        setPoints([next])
        setFinished(false)
        setCursor(null)
        setElevations([])
        setElevationError(null)
        return
      }
      if (tool === 'area' && points.length >= 3) {
        const first = L.latLng(points[0][0], points[0][1])
        if (map.latLngToContainerPoint(first).distanceTo(map.latLngToContainerPoint(event.latlng)) < 16) {
          finishDrawing()
          return
        }
      }
      setPoints((current) => [...current, next])
    },
    dblclick(event) {
      if (!tool || finished) return
      L.DomEvent.stop(event)
      if (tool === 'distance' && points.length < 2) return
      if (tool === 'area' && points.length < 3) return
      finishDrawing()
    },
    mousemove(event) {
      if (!tool || finished || points.length === 0) {
        setCursor(null)
        return
      }
      setCursor([event.latlng.lat, event.latlng.lng])
    },
  })

  const canFinish =
    Boolean(tool) &&
    !finished &&
    ((tool === 'distance' && points.length >= 2) ||
      (tool === 'area' && points.length >= 3) ||
      (tool === 'elevation' && points.length >= 1))

  const distanceMeters = pathLengthMeters(previewPoints)
  const areaSqMeters = polygonAreaSqMeters(
    tool === 'area' && previewPoints.length >= 3 ? previewPoints : points,
  )

  const readout = (() => {
    if (!tool) return null
    if (tool === 'distance') {
      if (points.length === 0) return 'Click the map to measure distance.'
      return `Distance: ${formatDistanceDetail(distanceMeters, units)}`
    }
    if (tool === 'area') {
      if (points.length < 3) return 'Click a shape to get acres and hectares. Add at least 3 points.'
      return `Area: ${formatAreaDetail(areaSqMeters, units)}`
    }
    if (elevationLoading && elevations.length === 0) return 'Looking up elevation…'
    if (elevationError) return elevationError
    if (elevations.length === 0) return 'Click a point to read elevation.'
    if (elevations.length === 1) return `Elevation: ${formatElevation(elevations[0], units)}`
    const start = elevations[0]
    const end = elevations[elevations.length - 1]
    const delta = end - start
    const changeSign = delta > 0 ? '+' : delta < 0 ? '−' : ''
    return `Start ${formatElevation(start, units)} · End ${formatElevation(end, units)} · ${changeSign}${formatElevation(Math.abs(delta), units)} · ${formatDistanceDetail(pathLengthMeters(points), units)}`
  })()

  const hint =
    tool && !finished
      ? tool === 'elevation'
        ? 'Click more points for a path, or press Done.'
        : 'Double-click, press Enter, or tap Done to finish.'
      : tool && finished
        ? 'Click the map to start a new measurement.'
        : null

  const overlay = (
    <>
      <div ref={menuRef} className="pointer-events-auto absolute right-3 top-3 z-[1100] sm:right-4 sm:top-4">
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label="Map layers and measure tools"
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-soft transition',
            menuOpen || tool
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-paper text-ink hover:border-brand hover:text-brand',
          )}
        >
          <Ruler className="h-4 w-4" strokeWidth={2} />
        </button>

        {menuOpen ? (
          <div className="mt-2 w-[220px] overflow-hidden rounded-2xl border border-line bg-paper/95 shadow-panel backdrop-blur">
            <p className="px-3 pb-1 pt-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
              Measure
            </p>
            <button
              type="button"
              onClick={() => setUnitsOpen((open) => !open)}
              className={cn(
                'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-mist',
                unitsOpen ? 'bg-mist/80 text-ink' : 'text-ink',
              )}
            >
              <Ruler className="h-4 w-4 shrink-0 text-muted" />
              <span className="flex-1 font-medium">Units</span>
              <span className="text-xs text-muted">{units === 'imperial' ? 'ft, ac first' : 'm, ha first'}</span>
            </button>
            {unitsOpen ? (
              <div className="border-y border-line bg-mist/50 px-2 py-1.5">
                {(['imperial', 'metric'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setUnitSystem(option)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm',
                      units === option ? 'bg-white font-semibold text-brand' : 'text-ink hover:bg-white/70',
                    )}
                  >
                    {option === 'imperial' ? 'Imperial first (ft, ac)' : 'Metric first (m, ha)'}
                    {units === option ? <span aria-hidden>✓</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
            <ToolRow
              icon={<Spline className="h-4 w-4 shrink-0" />}
              label="Distance"
              hint="mi, km"
              active={tool === 'distance'}
              onClick={() => selectTool('distance')}
            />
            <ToolRow
              icon={<LandPlot className="h-4 w-4 shrink-0" />}
              label="Area"
              hint="ac, ha"
              active={tool === 'area'}
              onClick={() => selectTool('area')}
            />
            <ToolRow
              icon={<Mountain className="h-4 w-4 shrink-0" />}
              label="Elevation"
              hint="ft, m"
              active={tool === 'elevation'}
              onClick={() => selectTool('elevation')}
            />
            <p className="border-t border-line px-3 pb-1 pt-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
              Map view
            </p>
            {MAP_BASEMAP_OPTIONS.map((id) => (
              <ToolRow
                key={id}
                icon={basemapIcon(id)}
                label={basemapLabel(id)}
                hint={basemap === id ? '✓' : ''}
                active={basemap === id}
                onClick={() => setMapBasemap(id)}
              />
            ))}
          </div>
        ) : null}
      </div>

      {tool && readout ? (
        <div
          ref={readoutRef}
          className="pointer-events-auto absolute bottom-8 left-1/2 z-[1100] w-[min(94%,28rem)] -translate-x-1/2 rounded-2xl border border-line bg-paper/95 p-3 shadow-panel backdrop-blur sm:bottom-10"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold leading-snug text-ink">{readout}</p>
            <button
              type="button"
              aria-label="Close measurement"
              onClick={() => {
                clearDrawing()
                setTool(null)
              }}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-ink hover:bg-line"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearDrawing}
              disabled={points.length === 0 && !finished}
              className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink disabled:opacity-40"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={finishDrawing}
              disabled={!canFinish}
              className="rounded-lg bg-brand px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  )

  return (
    <>
      {tool === 'area' && previewPoints.length >= 2 ? (
        previewPoints.length >= 3 ? (
          <Polygon positions={previewPoints} pathOptions={FILL_STYLE} interactive={false} />
        ) : (
          <Polyline positions={previewPoints} pathOptions={active ? PREVIEW_STYLE : LINE_STYLE} interactive={false} />
        )
      ) : null}
      {(tool === 'distance' || tool === 'elevation') && previewPoints.length >= 2 ? (
        <Polyline
          positions={previewPoints}
          pathOptions={active && !finished ? { ...LINE_STYLE, ...PREVIEW_STYLE } : LINE_STYLE}
          interactive={false}
        />
      ) : null}
      {vertices(points)}
      {createPortal(overlay, map.getContainer())}
    </>
  )
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

function ToolRow({
  icon,
  label,
  hint,
  active,
  onClick,
}: {
  icon: ReactNode
  label: string
  hint: string
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
      {hint ? (
        <span className={cn('text-xs font-normal', active ? 'text-brand/80' : 'text-muted')}>{hint}</span>
      ) : null}
    </button>
  )
}
