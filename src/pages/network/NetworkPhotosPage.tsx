import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { NETWORK_STORIES } from '@/features/network/data/feed'
import { getCurrentMember } from '@/features/network/data/members'

export function NetworkPhotosPage() {
  const { posts } = useNetworkSocial()
  const me = getCurrentMember()
  const shots = [
    me.cover,
    me.avatar,
    ...NETWORK_STORIES.map((story) => story.image),
    ...posts.flatMap((post) => post.images ?? (post.image ? [post.image] : [])),
  ]

  return (
    <NetworkPageFrame hideRight>
      <NetworkCard className="mb-4">
        <h1 className="font-display text-3xl font-semibold">Photos</h1>
        <p className="mt-1 text-sm text-muted">Listings, site walks, and stories from the people you work with.</p>
      </NetworkCard>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {shots.map((src, index) => (
          <img key={`${src}-${index}`} src={src} alt="" className="aspect-square w-full rounded-lg object-cover" />
        ))}
      </div>
    </NetworkPageFrame>
  )
}
