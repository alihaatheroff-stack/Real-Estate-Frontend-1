import {
  metersBetween,
  polygonAreaSqMeters,
  type LatLngTuple,
} from '@/features/referrals/lib/mapMeasure'

const FEET_PER_METER = 3.280839895
const SQ_FEET_PER_SQ_METER = 10.76391041671
const PITCH_STORAGE_KEY = 'map-roof-pitch-rise'

/** Common roof pitches as rise over 12" run. */
export const ROOF_PITCH_OPTIONS = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12] as const

export type RoofPitchRise = (typeof ROOF_PITCH_OPTIONS)[number]

export type RoofFacet = {
  id: string
  points: LatLngTuple[]
}

/** Multiplier: flat plan area → slope surface area. */
export function pitchFactor(rise: number, run = 12): number {
  if (rise <= 0 || run <= 0) return 1
  return Math.sqrt(1 + (rise / run) ** 2)
}

export function pitchedAreaSqMeters(flatSqMeters: number, rise: number, run = 12): number {
  return flatSqMeters * pitchFactor(rise, run)
}

export function formatFeetInches(meters: number): string {
  const totalInches = Math.max(0, meters * FEET_PER_METER * 12)
  let feet = Math.floor(totalInches / 12)
  let inches = Math.round(totalInches % 12)
  if (inches === 12) {
    feet += 1
    inches = 0
  }
  return `${feet}' ${inches}"`
}

export function formatRoofSqFt(sqMeters: number): string {
  const sqft = sqMeters * SQ_FEET_PER_SQ_METER
  return `${sqft.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })} sqft`
}

export function formatPitchLabel(rise: number, run = 12): string {
  if (rise <= 0) return 'Flat (0/12)'
  return `${rise}/${run}`
}

export function polygonCentroid(points: LatLngTuple[]): LatLngTuple {
  if (points.length === 0) return [0, 0]
  let lat = 0
  let lng = 0
  for (const point of points) {
    lat += point[0]
    lng += point[1]
  }
  return [lat / points.length, lng / points.length]
}

export function segmentMidpoint(a: LatLngTuple, b: LatLngTuple): LatLngTuple {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}

export type RoofEdgeLabel = {
  key: string
  position: LatLngTuple
  text: string
}

export function measureEdgeLabels(
  points: LatLngTuple[],
  pathKey: string,
  closed = false,
): RoofEdgeLabel[] {
  if (points.length < 2) return []
  const edgeCount = closed && points.length >= 3 ? points.length : points.length - 1
  const labels: RoofEdgeLabel[] = []
  for (let i = 0; i < edgeCount; i += 1) {
    const a = points[i]
    const b = points[(i + 1) % points.length]
    const meters = metersBetween(a, b)
    if (meters < 0.15) continue
    labels.push({
      key: `${pathKey}-e${i}`,
      position: segmentMidpoint(a, b),
      text: formatFeetInches(meters),
    })
  }
  return labels
}

/** Per-side lengths joined for readout panels, e.g. `12' 3" · 40' 1" · 15' 6"`. */
export function formatSideLengthsList(points: LatLngTuple[], closed = false): string {
  return measureEdgeLabels(points, 'sides', closed)
    .map((label) => label.text)
    .join(' · ')
}

export function sumFacetFlatArea(facets: RoofFacet[]): number {
  return facets.reduce((total, facet) => total + polygonAreaSqMeters(facet.points), 0)
}

export function loadRoofPitchRise(): RoofPitchRise {
  try {
    const stored = Number(localStorage.getItem(PITCH_STORAGE_KEY))
    if (ROOF_PITCH_OPTIONS.includes(stored as RoofPitchRise)) return stored as RoofPitchRise
  } catch {
    /* ignore */
  }
  return 6
}

export function saveRoofPitchRise(rise: RoofPitchRise) {
  try {
    localStorage.setItem(PITCH_STORAGE_KEY, String(rise))
  } catch {
    /* ignore */
  }
}

export function createFacetId() {
  return `facet-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
