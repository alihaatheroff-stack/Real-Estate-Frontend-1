import { Composer } from '@/features/network/components/feed/Composer'
import { FeedMobileAdStrip } from '@/features/network/components/feed/FeedAdCard'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { NetworkLeftRail } from '@/features/network/components/shell/NetworkLeftRail'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { FEED_LEFT_ADS, FEED_RIGHT_ADS } from '@/features/network/data/feedAds'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'

export function NetworkFeedPage() {
  const { posts } = useNetworkSocial()

  return (
    <NetworkPageFrame left={<NetworkLeftRail />}>
      <div className="mx-auto w-full max-w-[920px] space-y-4">
        <FeedMobileAdStrip ads={[FEED_LEFT_ADS[0]!, FEED_RIGHT_ADS[0]!]} />
        <Composer />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </NetworkPageFrame>
  )
}
