import type { LatLngTuple } from '@/features/referrals/lib/mapMeasure'

const cache = new Map<string, number>()

function cacheKey(point: LatLngTuple) {
  return `${point[0].toFixed(5)},${point[1].toFixed(5)}`
}

async function requestElevations(
  points: LatLngTuple[],
  signal?: AbortSignal,
): Promise<number[]> {
  const lats = points.map((point) => point[0].toFixed(6)).join(',')
  const lngs = points.map((point) => point[1].toFixed(6)).join(',')
  const url = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lngs}`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error('Elevation lookup failed')
  const data = (await response.json()) as { elevation?: Array<number | null> }
  if (!data.elevation || data.elevation.length !== points.length) {
    throw new Error('Elevation lookup failed')
  }
  return data.elevation.map((value, index) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error(`No elevation for point ${index + 1}`)
    }
    return value
  })
}

/** Heights in meters for each lat/lng, cached per ~1 m grid. */
export async function fetchElevationsMeters(
  points: LatLngTuple[],
  signal?: AbortSignal,
): Promise<number[]> {
  if (points.length === 0) return []

  const results = new Array<number>(points.length)
  const missing: { index: number; point: LatLngTuple }[] = []

  points.forEach((point, index) => {
    const cached = cache.get(cacheKey(point))
    if (cached != null) {
      results[index] = cached
      return
    }
    missing.push({ index, point })
  })

  const batchSize = 80
  for (let start = 0; start < missing.length; start += batchSize) {
    const batch = missing.slice(start, start + batchSize)
    const heights = await requestElevations(
      batch.map((item) => item.point),
      signal,
    )
    batch.forEach((item, offset) => {
      cache.set(cacheKey(item.point), heights[offset])
      results[item.index] = heights[offset]
    })
  }

  return results
}
