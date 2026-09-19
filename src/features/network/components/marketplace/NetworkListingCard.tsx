import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { networkProfilePath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  networkListingFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import { getMember } from '@/features/network/data/members'
import type { NetworkListing } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

export function NetworkListingCard({
  listing,
  compact = false,
}: {
  listing: NetworkListing
  compact?: boolean
}) {
  const seller = getMember(listing.sellerId)
  const draft = useMemo(() => networkListingFavoriteDraft(listing), [listing])
  const favorite = useFavoriteToggle(draft)

  if (compact) {
    return (
      <article className="flex gap-3 rounded-xl bg-white p-3 shadow-sm">
        <img src={listing.image} alt="" className="h-20 w-24 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{listing.title}</p>
          <p className="text-xs text-muted">
            {listing.price} · {listing.location}
          </p>
        </div>
        <button
          type="button"
          onClick={favorite.toggleSave}
          className="self-start rounded-full p-1.5 text-muted hover:bg-mist"
          aria-label={favorite.saved ? 'Unsave listing' : 'Save listing'}
          aria-pressed={favorite.saved}
        >
          <Bookmark className={cn('h-4 w-4', favorite.saved && 'fill-brand text-brand')} />
        </button>
        <FavoriteActionDialogs favorite={favorite} />
      </article>
    )
  }

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04]">
      <div className="relative">
        <img src={listing.image} alt="" className="h-44 w-full object-cover" />
        <button
          type="button"
          onClick={favorite.toggleSave}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-muted shadow-sm transition hover:text-brand"
          aria-label={favorite.saved ? 'Unsave listing' : 'Save listing'}
          aria-pressed={favorite.saved}
        >
          <Bookmark className={cn('h-4 w-4', favorite.saved && 'fill-brand text-brand')} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">{listing.category}</p>
        <h2 className="mt-1 font-semibold">{listing.title}</h2>
        <p className="mt-1 text-lg font-semibold text-ink">{listing.price}</p>
        <p className="text-sm text-muted">{listing.location}</p>
        {seller ? (
          <Link to={networkProfilePath(seller.id)} className="mt-3 block text-xs font-semibold text-brand hover:underline">
            Listed by {seller.name}
          </Link>
        ) : null}
      </div>
      <FavoriteActionDialogs favorite={favorite} />
    </article>
  )
}
