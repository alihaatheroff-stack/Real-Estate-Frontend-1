import { useMemo } from 'react'
import { Composer } from '@/features/network/components/feed/Composer'
import { FeedAdCard, FeedMobileAdStrip } from '@/features/network/components/feed/FeedAdCard'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { NetworkLeftRail } from '@/features/network/components/shell/NetworkLeftRail'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { buildNewsFeed, FEED_LEFT_ADS, FEED_RIGHT_ADS } from '@/features/network/data/feedAds'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'

export function NetworkFeedPage() {
  const { posts } = useNetworkSocial()
  const feed = useMemo(() => {
    const fresh = posts.filter((post) => post.id.startsWith('local-'))
    const older = posts.filter((post) => !post.id.startsWith('local-'))
    return [
      ...fresh.map((post) => ({ kind: 'post' as const, post })),
      ...buildNewsFeed(older),
    ]
  }, [posts])

  return (
    <NetworkPageFrame left={<NetworkLeftRail />}>
      <div className="mx-auto w-full max-w-[920px] space-y-4">
        <FeedMobileAdStrip ads={[FEED_LEFT_ADS[0]!, FEED_RIGHT_ADS[0]!]} />
        <Composer />
        {feed.map((entry, index) =>
          entry.kind === 'ad' ? (
            <FeedAdCard key={`${entry.ad.id}-${index}`} ad={entry.ad} variant="feed" />
          ) : (
            <PostCard key={entry.post.id} post={entry.post} />
          ),
        )}
      </div>
    </NetworkPageFrame>
  )
}
