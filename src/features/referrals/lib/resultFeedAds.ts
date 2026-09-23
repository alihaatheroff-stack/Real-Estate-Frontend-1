/** Visible cards per results page (organic listings + sponsored ads). */
export const RESULTS_PAGE_CARD_COUNT = 10
/** Minimum sponsored cards mixed into each non-empty page. */
export const RESULTS_ADS_PER_PAGE = 2
export const RESULTS_ORGANIC_PAGE_SIZE = RESULTS_PAGE_CARD_COUNT - RESULTS_ADS_PER_PAGE

export type ResultFeedItem<TItem, TAd> =
  | { kind: 'item'; item: TItem }
  | { kind: 'ad'; ad: TAd }

function mulberry32(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value + 0x6d2b79f5) >>> 0
    let next = Math.imul(value ^ (value >>> 15), value | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

/** Shuffle a copy with a page-seeded RNG so pagination does not reshuffle on re-render. */
export function pickPageAds<T>(pool: readonly T[], page: number, count = RESULTS_ADS_PER_PAGE): T[] {
  if (pool.length === 0 || count <= 0) return []
  const rng = mulberry32(page * 1597334677 + pool.length * 97)
  const order = [...pool]
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(rng() * (index + 1))
    ;[order[index], order[swapWith]] = [order[swapWith]!, order[index]!]
  }
  return Array.from({ length: Math.min(count, order.length) }, (_, index) => order[index]!)
}

/** Mix ads into random slots so a full page stays at organic + ads length. */
export function insertAdsIntoFeed<TItem, TAd>(
  organic: TItem[],
  ads: TAd[],
  page: number,
): ResultFeedItem<TItem, TAd>[] {
  if (organic.length === 0) return []
  if (ads.length === 0) {
    return organic.map((item) => ({ kind: 'item', item }))
  }

  const rng = mulberry32(page * 2246822519 + ads.length * 13)
  const total = organic.length + ads.length
  const adSlots = new Set<number>()
  let attempts = 0
  while (adSlots.size < ads.length && attempts < total * 4) {
    adSlots.add(Math.floor(rng() * total))
    attempts += 1
  }
  for (let slot = 0; adSlots.size < ads.length && slot < total; slot += 1) {
    adSlots.add(slot)
  }

  const assigned = [...adSlots].sort((left, right) => left - right)
  const adBySlot = new Map<number, TAd>()
  assigned.forEach((slot, index) => {
    const ad = ads[index]
    if (ad) adBySlot.set(slot, ad)
  })

  const feed: ResultFeedItem<TItem, TAd>[] = []
  let organicIndex = 0
  for (let slot = 0; slot < total; slot += 1) {
    const ad = adBySlot.get(slot)
    if (ad) {
      feed.push({ kind: 'ad', ad })
      continue
    }
    const item = organic[organicIndex]
    if (item !== undefined) {
      feed.push({ kind: 'item', item })
      organicIndex += 1
    }
  }
  return feed
}

export function mergePageAds<T extends { id: string }>(items: T[], ads: T[]): T[] {
  // An empty result set has no list cards; don't leave sponsored pins on the map.
  if (items.length === 0) return []
  const extra = ads.filter((ad) => !items.some((item) => item.id === ad.id))
  return extra.length === 0 ? items : [...items, ...extra]
}
