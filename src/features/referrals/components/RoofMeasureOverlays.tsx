import { CircleMarker, Polygon, Polyline } from 'react-leaflet'
import { MeasureAnnotations } from '@/features/referrals/components/MeasureAnnotations'
import type { RoofFacet } from '@/features/referrals/lib/roofMeasure'
import type { LatLngTuple } from '@/features/referrals/lib/mapMeasure'

const ROOF_LINE = { color: '#c62828', weight: 2.5, opacity: 0.95 }
const ROOF_FILL = {
  color: '#c62828',
  weight: 2.5,
  opacity: 0.95,
  fillColor: '#c62828',
  fillOpacity: 0.12,
}
const ROOF_PREVIEW = { color: '#c62828', weight: 2.5, opacity: 0.55, dashArray: '6 6' }
const ROOF_VERTEX = { color: '#ffffff', weight: 2, fillColor: '#c62828', fillOpacity: 1 }

function vertices(points: LatLngTuple[], keyPrefix: string) {
  return points.map((point, index) => (
    <CircleMarker
      key={`${keyPrefix}-${point[0]}-${point[1]}-${index}`}
      center={point}
      radius={5}
      pathOptions={ROOF_VERTEX}
      interactive={false}
    />
  ))
}

type RoofMeasureOverlaysProps = {
  facets: RoofFacet[]
  draftPoints: LatLngTuple[]
  previewPoints: LatLngTuple[]
  pitchRise: number
  drawing: boolean
}

export function RoofMeasureOverlays({
  facets,
  draftPoints,
  previewPoints,
  pitchRise,
  drawing,
}: RoofMeasureOverlaysProps) {
  return (
    <>
      {facets.map((facet) => (
        <Polygon key={facet.id} positions={facet.points} pathOptions={ROOF_FILL} interactive={false} />
      ))}

      {previewPoints.length >= 2 ? (
        previewPoints.length >= 3 ? (
          <Polygon
            positions={previewPoints}
            pathOptions={drawing ? { ...ROOF_FILL, dashArray: '6 6', fillOpacity: 0.08 } : ROOF_FILL}
            interactive={false}
          />
        ) : (
          <Polyline
            positions={previewPoints}
            pathOptions={drawing ? ROOF_PREVIEW : ROOF_LINE}
            interactive={false}
          />
        )
      ) : null}

      {vertices(draftPoints, 'draft')}
      {facets.flatMap((facet) => vertices(facet.points, facet.id))}

      {facets.map((facet) => (
        <MeasureAnnotations
          key={`${facet.id}-labels`}
          points={facet.points}
          closed
          showArea
          pitchRise={pitchRise}
          pathKey={facet.id}
        />
      ))}

      {previewPoints.length >= 2 ? (
        <MeasureAnnotations
          points={previewPoints}
          closed={previewPoints.length >= 3}
          showArea={previewPoints.length >= 3}
          pitchRise={pitchRise}
          pathKey="draft"
        />
      ) : null}
    </>
  )
}
