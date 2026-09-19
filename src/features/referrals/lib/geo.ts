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
}

export function getCityCoords(cityOrSlug: string): [number, number] | null {
  const key = cityOrSlug.trim().toLowerCase().replaceAll('-', ' ')
  return CITY_COORDS[key] ?? null
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
