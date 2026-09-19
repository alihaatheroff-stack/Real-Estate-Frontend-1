import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Camera, MessageCircle, Bookmark, UserPlus } from 'lucide-react'
import { PATHS, networkProfilePath, networkSettingsPath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  networkProfileFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import { Composer } from '@/features/network/components/feed/Composer'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { VerifiedName } from '@/features/network/components/shared/VerifiedName'
import { CURRENT_MEMBER_ID, getFollowers, getFollowing, getMember } from '@/features/network/data/members'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'

const TABS = ['Posts', 'About', 'Friends', 'Photos'] as const

export function NetworkProfilePage() {
  const { memberId } = useParams()
  const member = getMember(memberId ?? '')
  const { posts } = useNetworkSocial()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Posts')
  const isMe = member?.id === CURRENT_MEMBER_ID
  const profileDraft = useMemo(
    () =>
      member
        ? networkProfileFavoriteDraft(member)
        : networkProfileFavoriteDraft({
            id: '',
            name: '',
            title: '',
            company: '',
            avatar: '',
          }),
    [member],
  )
  const favorite = useFavoriteToggle(profileDraft)

  const memberPosts = useMemo(
    () => posts.filter((post) => post.memberId === member?.id),
    [posts, member?.id],
  )

  const friends = useMemo(
    () => (member?.friendIds ?? []).map((id) => getMember(id)).filter((item) => item != null),
    [member],
  )

  const photos = useMemo(() => {
    const fromPosts = memberPosts.flatMap((post) => post.images ?? (post.image ? [post.image] : []))
    if (fromPosts.length > 0 || !member) return fromPosts
    return [member.cover, member.avatar]
  }, [member, memberPosts])

  if (!member) return <Navigate to={PATHS.networkFeed} replace />

  return (
    <div className="pb-20">
      <div className="bg-white shadow-sm">
        <div className="w-full px-3 sm:px-4 lg:px-5">
          <div className="relative overflow-hidden rounded-b-xl">
            <img src={member.cover} alt="" className="h-48 w-full object-cover sm:h-72 lg:h-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            {isMe ? (
              <button
                type="button"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow"
              >
                <Camera className="h-4 w-4" />
                Edit cover
              </button>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 pb-3 sm:flex-row sm:items-end sm:gap-5">
            <div className="-mt-16 shrink-0 sm:-mt-20">
              <MemberAvatar
                name={member.name}
                src={member.avatar}
                size="xl"
                framed
                className="h-36 w-36 sm:h-44 sm:w-44"
              />
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <VerifiedName
                name={member.name}
                memberId={member.id}
                verified={member.verified}
                className="font-display text-3xl"
              />
              <p className="mt-1 text-sm font-medium text-muted">
                {member.title} · {member.company}
              </p>
              <p className="text-sm text-muted">
                {getFollowers(member.id).length} followers · {getFollowing(member).length} following ·{' '}
                {member.city}, {member.state}
              </p>
              <div className="mt-3 flex -space-x-2">
                {friends.slice(0, 8).map((friend) => (
                  <MemberAvatar
                    key={friend.id}
                    name={friend.name}
                    src={friend.avatar}
                    memberId={friend.id}
                    size="sm"
                    className="ring-2 ring-white"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pb-3">
              {isMe ? (
                <Link
                  to={networkSettingsPath('profile')}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
                >
                  Edit profile
                </Link>
              ) : (
                <>
                  <Button className="rounded-lg" leftIcon={<UserPlus className="h-4 w-4" />}>
                    Add friend
                  </Button>
                  <Link
                    to={PATHS.networkMessages}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-black bg-mist px-4 text-sm font-semibold text-ink hover:border-brand"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Link>
                  <Button
                    variant="ghost"
                    className={cn(
                      'h-11 w-11 shrink-0 rounded-full border border-black bg-mist p-0 px-0 hover:bg-mist/80',
                      favorite.saved && 'bg-brand/10 text-brand hover:bg-brand/15',
                    )}
                    aria-label={favorite.saved ? 'Unsave profile' : 'Save profile'}
                    aria-pressed={favorite.saved}
                    onClick={favorite.toggleSave}
                  >
                    <Bookmark className={cn('h-5 w-5', favorite.saved && 'fill-brand text-brand')} />
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-t border-line network-hide-scroll">
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={cn(
                  'relative px-4 py-3 text-sm font-semibold',
                  tab === item ? 'text-brand' : 'text-muted hover:bg-mist',
                )}
              >
                {item}
                {tab === item ? <span className="absolute inset-x-2 bottom-0 h-[3px] rounded-t-full bg-brand" /> : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid w-full gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:px-5">
        <aside className="space-y-4 lg:sticky lg:top-[4.5rem] lg:self-start">
          <NetworkCard>
            <h2 className="text-lg font-semibold">Intro</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink">{member.bio}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Buy box</dt>
                <dd className="mt-0.5 text-ink">{member.buyBox}</dd>
              </div>
              <div className="text-muted">Lives in {member.city}, {member.state}</div>
              <div className="text-muted">Joined {member.joined}</div>
              <div className="text-muted">{member.languages.join(' · ')}</div>
              <div className="text-muted">{member.handle}</div>
            </dl>
          </NetworkCard>

          <NetworkCard>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Friends</h2>
              <Link to={PATHS.networkFriends} className="text-sm font-semibold text-brand">
                See all
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {friends.slice(0, 9).map((friend) => (
                <Link key={friend.id} to={networkProfilePath(friend.id)} className="min-w-0">
                  <img src={friend.avatar} alt="" className="aspect-square w-full rounded-lg object-cover" />
                  <span className="mt-1 block truncate text-[12px] font-semibold">{friend.name}</span>
                </Link>
              ))}
            </div>
          </NetworkCard>
        </aside>

        <div className="space-y-4">
          {tab === 'Posts' ? (
            <>
              {isMe ? <Composer /> : null}
              {memberPosts.length ? (
                memberPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <NetworkCard>
                  <p className="text-sm text-muted">No posts from {member.firstName} yet. The feed is waiting.</p>
                </NetworkCard>
              )}
            </>
          ) : null}

          {tab === 'About' ? (
            <NetworkCard>
              <h2 className="text-lg font-semibold">About {member.firstName}</h2>
              <p className="mt-3 text-sm leading-relaxed">{member.bio}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.buyBox}</p>
            </NetworkCard>
          ) : null}

          {tab === 'Friends' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {friends.map((friend) => (
                <Link
                  key={friend.id}
                  to={networkProfilePath(friend.id)}
                  className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                >
                  <MemberAvatar name={friend.name} src={friend.avatar} size="lg" />
                  <span>
                    <span className="block font-semibold">{friend.name}</span>
                    <span className="text-xs text-muted">{friend.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          {tab === 'Photos' ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {photos.map((src) => (
                <img key={src} src={src} alt="" className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <FavoriteActionDialogs favorite={favorite} />
    </div>
  )
}
