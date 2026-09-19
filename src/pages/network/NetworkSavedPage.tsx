import { Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { networkProfilePath } from '@/app/router/paths'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { NetworkListingCard } from '@/features/network/components/marketplace/NetworkListingCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_LISTINGS } from '@/features/network/data/community'
import { getMember } from '@/features/network/data/members'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { removeFavoriteItem, useFavorites } from '@/features/favorites/store'

export function NetworkSavedPage() {
  const { posts } = useNetworkSocial()
  const { items, isSaved } = useFavorites()
  const networkItems = items.filter((item) => item.module === 'network')
  const savedPosts = posts.filter((post) => isSaved('network', `post:${post.id}`))
  const savedListings = NETWORK_LISTINGS.filter((listing) =>
    isSaved('network', `listing:${listing.id}`),
  )
  const savedProfiles = networkItems
    .filter((item) => item.itemId.startsWith('profile:'))
    .map((item) => getMember(item.itemId.slice('profile:'.length)))
    .filter((member) => member != null)

  const isEmpty =
    savedPosts.length === 0 && savedListings.length === 0 && savedProfiles.length === 0

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Saved</h1>
          <p className="mt-1 text-sm text-muted">
            Posts, profiles, and listings you marked to come back to.
          </p>
        </NetworkCard>

        {isEmpty ? (
          <NetworkCard>
            <div className="flex flex-col items-center py-10 text-center">
              <Bookmark className="h-10 w-10 text-muted" />
              <p className="mt-3 font-semibold text-ink">Nothing saved yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted">
                Bookmark a post, listing, or profile. It will show up here and under Network in the
                header heart menu.
              </p>
            </div>
          </NetworkCard>
        ) : null}

        {savedProfiles.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {savedProfiles.map((member) => (
              <article
                key={member.id}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
              >
                <MemberAvatar name={member.name} src={member.avatar} memberId={member.id} size="lg" />
                <div className="min-w-0 flex-1">
                  <Link
                    to={networkProfilePath(member.id)}
                    className="block truncate font-semibold text-ink hover:underline"
                  >
                    {member.name}
                  </Link>
                  <p className="truncate text-xs text-muted">
                    {member.title} · {member.company}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFavoriteItem('network', `profile:${member.id}`)}
                  className="rounded-full p-1.5 text-muted hover:bg-mist"
                  aria-label={`Unsave ${member.name}`}
                >
                  <Bookmark className="h-4 w-4 fill-brand text-brand" />
                </button>
              </article>
            ))}
          </div>
        ) : null}

        {savedListings.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {savedListings.map((listing) => (
              <NetworkListingCard key={listing.id} listing={listing} compact />
            ))}
          </div>
        ) : null}

        {savedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </NetworkPageFrame>
  )
}
