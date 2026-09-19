const CITY_COORDS: Record<string, [number, number]> = {
  'los angeles': [34.0522, -118.2437],
  'new york': [40.7128, -74.006],
  fresno: [36.7378, -119.7871],
  miami: [25.7617, -80.1918],
  boston: [42.3601, -71.0589],
  clovis: [36.8252, -119.7029],
  florida: [27.6648, -81.5158],
  seattle: [47.6062, -122.3321],
  austin: [30.2672, -97.7431],
  'san diego': [32.7157, -117.1611],
  madera: [36.9613, -120.0607],
  orlando: [28.5383, -81.3792],
}

/** Mock ZIP centroids aligned with catalog provider locations. */
const ZIP_COORDS: Record<string, [number, number]> = {
  '93721': [36.7378, -119.7871],
  '93728': [36.7378, -119.7871],
  '93611': [36.8252, -119.7029],
  '98101': [47.6062, -122.3321],
  '93710': [36.8229, -119.7677],
  '33130': [25.7617, -80.1918],
  '93704': [36.8092, -119.8121],
  '93619': [36.8485, -119.6856],
  '78701': [30.2672, -97.7431],
  '90012': [34.0522, -118.2437],
  '92101': [32.7157, -117.1611],
  '93711': [36.8372, -119.8334],
  '93637': [36.9613, -120.0607],
  '93230': [36.3275, -119.6457],
}

type GeoPoint = {
  lat: number
  lng: number
  zip?: string
  radiusMiles?: number
}

export function getCityCoords(cityOrSlug: string): [number, number] | null {
  const key = cityOrSlug.trim().toLowerCase().replaceAll('-', ' ')
  return CITY_COORDS[key] ?? null
}

export function resolveSearchOrigin(zipOrCity: string): [number, number] | null {
  const trimmed = zipOrCity.trim()
  if (!trimmed) return null
  return ZIP_COORDS[trimmed.replace(/\s+/g, '')] ?? getCityCoords(trimmed)
}

function parseRadiusMiles(radius: string): number | null {
  const miles = Number(radius)
  return !Number.isNaN(miles) && miles > 0 ? miles : null
}

/** True when a catalog point falls inside the ZIP/city search circle (and its own coverage). */
export function matchesZipRadius(point: GeoPoint, zip: string, radius: string): boolean {
  const origin = resolveSearchOrigin(zip)
  const miles = parseRadiusMiles(radius)

  if (origin && miles != null) {
    const distance = milesBetween(origin, [point.lat, point.lng])
    if (distance > miles) return false
    if (point.radiusMiles != null && distance > point.radiusMiles) return false
    return true
  }

  const wanted = zip.trim().replace(/\s+/g, '')
  return Boolean(point.zip && point.zip.replace(/\s+/g, '') === wanted)
}

/** Approximate distance in miles between two lat/lng points. */
export function milesBetween(a: [number, number], b: [number, number]): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const [lat1, lng1] = a
  const [lat2, lng2] = b
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h =
    sinLat * sinLat +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * sinLng * sinLng
  return 3958.8 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

/** Deterministic jitter around a city center for employer map pins. */
export function employerCoords(city: string, id: string): [number, number] {
  const base = CITY_COORDS[city.toLowerCase()] ?? [36.7378, -119.7871]
  const hash = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const latOffset = ((hash % 20) - 10) * 0.008
  const lngOffset = (((hash * 7) % 20) - 10) * 0.008
  return [base[0] + latOffset, base[1] + lngOffset]
}
