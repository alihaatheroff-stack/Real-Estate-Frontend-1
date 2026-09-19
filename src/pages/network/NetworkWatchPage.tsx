import { Play } from 'lucide-react'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { VerifiedName } from '@/features/network/components/shared/VerifiedName'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { getMember } from '@/features/network/data/members'

export function NetworkWatchPage() {
  const { posts } = useNetworkSocial()
  const videos = posts.filter((post) => post.videoLabel || post.image)

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Watch</h1>
          <p className="mt-1 text-sm text-muted">Site walks, breakfast rooms, and deal film — not endless scrolling.</p>
        </NetworkCard>
        <div className="grid gap-4">
          {videos.map((post) => {
            const author = getMember(post.memberId)
            if (!author || !post.image) return null
            return (
              <article key={post.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-3 px-4 py-3">
                  <MemberAvatar name={author.name} src={author.avatar} memberId={author.id} />
                  <div>
                    <VerifiedName name={author.name} memberId={author.id} verified={author.verified} />
                    <p className="text-xs text-muted">{post.timeAgo}</p>
                  </div>
                </div>
                <p className="px-4 pb-3 text-sm leading-relaxed">{post.text}</p>
                <div className="relative bg-ink">
                  <img src={post.image} alt="" className="max-h-[480px] w-full object-cover opacity-95" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg">
                      <Play className="h-7 w-7 fill-brand" />
                    </span>
                  </span>
                  {post.videoLabel ? (
                    <span className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2 py-1 text-xs font-semibold text-white">
                      {post.videoLabel}
                    </span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </NetworkPageFrame>
  )
}
