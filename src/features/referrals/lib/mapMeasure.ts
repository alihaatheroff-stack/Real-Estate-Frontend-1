export type MeasureUnitSystem = 'imperial' | 'metric'
export type MeasureTool = 'distance' | 'area' | 'elevation'

export type LatLngTuple = [number, number]

const METERS_PER_MILE = 1609.344
const SQ_METERS_PER_ACRE = 4046.8564224
const FEET_PER_METER = 3.280839895
const SQ_FEET_PER_SQ_METER = 10.76391041671
const EARTH_RADIUS_M = 6378137
const UNITS_STORAGE_KEY = 'map-measure-units'

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

function formatNumber(value: number, maxDigits: number) {
  return value.toLocaleString(undefined, { maximumFractionDigits: maxDigits })
}

export function metersBetween(a: LatLngTuple, b: LatLngTuple): number {
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const lat1 = toRad(a[0])
  const lat2 = toRad(b[0])
  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng
  return 2 * EARTH_RADIUS_M * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

export function pathLengthMeters(points: LatLngTuple[]): number {
  let total = 0
  for (let i = 1; i < points.length; i += 1) {
    total += metersBetween(points[i - 1], points[i])
  }
  return total
}

/** Spherical polygon area in square meters (OpenLayers geodesic formula). */
export function polygonAreaSqMeters(points: LatLngTuple[]): number {
  if (points.length < 3) return 0
  let area = 0
  for (let i = 0; i < points.length; i += 1) {
    const p1 = points[i]
    const p2 = points[(i + 1) % points.length]
    area += toRad(p2[1] - p1[1]) * (2 + Math.sin(toRad(p1[0])) + Math.sin(toRad(p2[0])))
  }
  return Math.abs((area * EARTH_RADIUS_M * EARTH_RADIUS_M) / 2)
}

function acresLabel(sqMeters: number): string {
  const acres = sqMeters / SQ_METERS_PER_ACRE
  const digits = acres >= 10 ? 1 : acres >= 1 ? 2 : 3
  return `${formatNumber(acres, digits)} ac`
}

function hectaresLabel(sqMeters: number): string {
  const hectares = sqMeters / 10_000
  const digits = hectares >= 10 ? 1 : hectares >= 1 ? 2 : 3
  return `${formatNumber(hectares, digits)} ha`
}

function joinPair(imperial: string, metric: string, units: MeasureUnitSystem) {
  return units === 'metric' ? `${metric} · ${imperial}` : `${imperial} · ${metric}`
}

export function formatDistance(meters: number, units: MeasureUnitSystem): string {
  if (units === 'metric') {
    if (meters < 1000) return `${formatNumber(meters, 0)} m`
    return `${formatNumber(meters / 1000, meters < 10_000 ? 2 : 1)} km`
  }
  const feet = meters * FEET_PER_METER
  const miles = meters / METERS_PER_MILE
  if (miles < 0.1) return `${formatNumber(feet, 0)} ft`
  return `${formatNumber(miles, miles < 10 ? 2 : 1)} mi`
}

/** Always includes both imperial and metric. */
export function formatDistanceDetail(meters: number, units: MeasureUnitSystem): string {
  const feet = `${formatNumber(meters * FEET_PER_METER, 0)} ft`
  const miles = meters / METERS_PER_MILE
  const imperial =
    miles >= 0.1 ? `${formatNumber(miles, miles < 10 ? 2 : 1)} mi (${feet})` : feet
  const metric =
    meters < 1000
      ? `${formatNumber(meters, 0)} m`
      : `${formatNumber(meters / 1000, meters < 10_000 ? 2 : 1)} km (${formatNumber(meters, 0)} m)`
  return joinPair(imperial, metric, units)
}

export function formatArea(sqMeters: number, units: MeasureUnitSystem): string {
  if (units === 'metric') return hectaresLabel(sqMeters)
  return acresLabel(sqMeters)
}

/** Always includes acres and hectares, plus sq ft and m². */
export function formatAreaDetail(sqMeters: number, units: MeasureUnitSystem): string {
  const land = joinPair(acresLabel(sqMeters), hectaresLabel(sqMeters), units)
  const sqFeet = `${formatNumber(sqMeters * SQ_FEET_PER_SQ_METER, 0)} sq ft`
  const metricArea = `${formatNumber(sqMeters, 0)} m²`
  return `${land} (${sqFeet} / ${metricArea})`
}

/** Always includes feet and meters. */
export function formatElevation(meters: number, units: MeasureUnitSystem): string {
  const feet = `${formatNumber(meters * FEET_PER_METER, 0)} ft`
  const metric = `${formatNumber(meters, 0)} m`
  return joinPair(feet, metric, units)
}

export function loadMeasureUnits(): MeasureUnitSystem {
  try {
    const stored = localStorage.getItem(UNITS_STORAGE_KEY)
    if (stored === 'metric' || stored === 'imperial') return stored
  } catch {
    /* ignore */
  }
  return 'imperial'
}

export function saveMeasureUnits(units: MeasureUnitSystem) {
  try {
    localStorage.setItem(UNITS_STORAGE_KEY, units)
  } catch {
    /* ignore */
  }
}
