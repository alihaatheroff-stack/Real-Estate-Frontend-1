import { Composer } from '@/features/network/components/feed/Composer'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { StoriesRow } from '@/features/network/components/feed/StoriesRow'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'

export function NetworkFeedPage() {
  const { posts } = useNetworkSocial()

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <StoriesRow />
        <Composer />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </NetworkPageFrame>
  )
}
