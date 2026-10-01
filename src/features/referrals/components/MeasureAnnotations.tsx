import { useMemo } from 'react'
import { CircleMarker, Tooltip } from 'react-leaflet'
import {
  formatRoofSqFt,
  measureEdgeLabels,
  polygonCentroid,
  pitchedAreaSqMeters,
} from '@/features/referrals/lib/roofMeasure'
import { polygonAreaSqMeters, type LatLngTuple } from '@/features/referrals/lib/mapMeasure'

type MeasureAnnotationsProps = {
  points: LatLngTuple[]
  /** Close the shape (area / roof facet). Open path for distance. */
  closed?: boolean
  showArea?: boolean
  /** When set, area label shows pitch-corrected surface + flat. */
  pitchRise?: number
  pathKey?: string
}

const HIDDEN_VERTEX = {
  opacity: 0,
  fillOpacity: 0,
  weight: 0,
}

export function MeasureAnnotations({
  points,
  closed = false,
  showArea = false,
  pitchRise,
  pathKey = 'measure',
}: MeasureAnnotationsProps) {
  const { edges, area } = useMemo(() => {
    const edgeLabels = measureEdgeLabels(points, pathKey, closed && points.length >= 3)
    if (!showArea || points.length < 3) return { edges: edgeLabels, area: null }

    const flat = polygonAreaSqMeters(points)
    if (flat <= 0) return { edges: edgeLabels, area: null }

    const hasPitch = pitchRise != null && pitchRise > 0
    const surface = hasPitch ? pitchedAreaSqMeters(flat, pitchRise) : flat
    return {
      edges: edgeLabels,
      area: {
        key: `${pathKey}-area`,
        position: polygonCentroid(points),
        primary: formatRoofSqFt(surface),
        secondary: hasPitch ? `flat ${formatRoofSqFt(flat)}` : undefined,
      },
    }
  }, [closed, pathKey, pitchRise, points, showArea])

  return (
    <>
      {edges.map((label) => (
        <CircleMarker
          key={label.key}
          center={label.position}
          radius={1}
          pathOptions={HIDDEN_VERTEX}
          interactive={false}
        >
          <Tooltip
            permanent
            direction="center"
            offset={[0, 0]}
            opacity={1}
            className="roof-measure-edge-tooltip"
          >
            {label.text}
          </Tooltip>
        </CircleMarker>
      ))}
      {area ? (
        <CircleMarker
          key={area.key}
          center={area.position}
          radius={1}
          pathOptions={HIDDEN_VERTEX}
          interactive={false}
        >
          <Tooltip
            permanent
            direction="center"
            offset={[0, 0]}
            opacity={1}
            className="roof-measure-area-tooltip"
          >
            <span className="roof-measure-area-stack">
              <strong>{area.primary}</strong>
              {area.secondary ? <span className="roof-measure-area-flat">{area.secondary}</span> : null}
            </span>
          </Tooltip>
        </CircleMarker>
      ) : null}
    </>
  )
}
