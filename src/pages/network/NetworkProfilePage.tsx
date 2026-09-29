import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { PATHS, networkProfilePath, networkSettingsPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  networkProfileFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import { Composer } from '@/features/network/components/feed/Composer'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { ProfileHeaderActions } from '@/features/network/components/profile/ProfileHeaderActions'
import { ProfileViewAsBanner } from '@/features/network/components/profile/ProfileViewAsBanner'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { VerifiedName } from '@/features/network/components/shared/VerifiedName'
import {
  CURRENT_MEMBER_ID,
  getCurrentMember,
  getFollowers,
  getFollowing,
  getMember,
} from '@/features/network/data/members'
import {
  filterPostsForProfileView,
  getMutualFriends,
  resolveProfileRelationship,
  resolveProfileViewMode,
} from '@/features/network/model/profileView'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'

const TABS = ['Posts', 'About', 'Friends', 'Photos'] as const

export function NetworkProfilePage() {
  const { memberId } = useParams()
  const member = getMember(memberId ?? '')
  const me = getCurrentMember()
  const {
    posts,
    chats,
    followingIds,
    sentFriendRequestIds,
    sendFriendRequest,
    cancelFriendRequest,
    toggleFollow,
  } = useNetworkSocial()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Posts')
  const [viewAsPublic, setViewAsPublic] = useState(false)

  const isOwner = member?.id === CURRENT_MEMBER_ID
  const viewingAsVisitor = Boolean(isOwner && viewAsPublic)
  const viewMode = resolveProfileViewMode({
    memberId: member?.id ?? '',
    viewAsPublic: viewingAsVisitor,
  })
  // "View as" simulates a stranger: no friendship privileges.
  const relationship = viewingAsVisitor
    ? 'none'
    : resolveProfileRelationship({
        memberId: member?.id ?? '',
        followingIds,
        sentFriendRequestIds,
      })

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

  const memberPosts = useMemo(() => {
    const owned = posts.filter((post) => post.memberId === member?.id)
    return filterPostsForProfileView(owned, { viewMode, relationship })
  }, [posts, member?.id, viewMode, relationship])

  const friends = useMemo(
    () => (member?.friendIds ?? []).map((id) => getMember(id)).filter((item) => item != null),
    [member],
  )

  const mutualFriends = useMemo(() => {
    if (!member || viewMode === 'personal') return []
    return getMutualFriends(member, me.friendIds)
  }, [member, me.friendIds, viewMode])

  const photos = useMemo(() => {
    const fromPosts = memberPosts.flatMap((post) => post.images ?? (post.image ? [post.image] : []))
    if (fromPosts.length > 0 || !member) return fromPosts
    return [member.cover, member.avatar]
  }, [member, memberPosts])

  const messageChatId = useMemo(() => {
    if (!member) return undefined
    return chats.find((chat) => chat.kind === 'direct' && chat.memberId === member.id)?.id
  }, [chats, member])

  const hiddenFriendsCount =
    viewMode === 'profile' && relationship !== 'friends'
      ? Math.max(0, friends.length - Math.min(friends.length, 6))
      : 0

  const visibleFriends =
    viewMode === 'profile' && relationship !== 'friends' ? friends.slice(0, 6) : friends

  if (!member) return <Navigate to={PATHS.networkFeed} replace />

  return (
    <div className="pb-20">
      {isOwner && viewAsPublic ? (
        <ProfileViewAsBanner
          onExit={() => {
            setViewAsPublic(false)
            setTab('Posts')
          }}
        />
      ) : null}

      <div className="bg-white shadow-sm">
        <div className="w-full px-3 sm:px-4 lg:px-5">
          <div className="relative overflow-hidden rounded-b-xl">
            <img src={member.cover} alt="" className="h-48 w-full object-cover sm:h-72 lg:h-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            {viewMode === 'personal' ? (
              <Link
                to={networkSettingsPath('profile')}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow"
              >
                <Camera className="h-4 w-4" />
                Edit cover
              </Link>
            ) : null}
            <span
              className={cn(
                'absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow',
                viewMode === 'personal'
                  ? 'bg-brand text-white'
                  : 'bg-white/95 text-ink ring-1 ring-black/5',
              )}
            >
              {viewMode === 'personal' ? 'Personal view' : 'Profile view'}
            </span>
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
              {viewMode === 'profile' && mutualFriends.length > 0 ? (
                <p className="mt-1 text-sm font-medium text-brand">
                  {mutualFriends.length} mutual friend{mutualFriends.length === 1 ? '' : 's'}
                  {mutualFriends.length <= 3
                    ? ` · ${mutualFriends.map((friend) => friend.firstName).join(', ')}`
                    : ` · ${mutualFriends
                        .slice(0, 2)
                        .map((friend) => friend.firstName)
                        .join(', ')} +${mutualFriends.length - 2}`}
                </p>
              ) : null}
              <div className="mt-3 flex -space-x-2">
                {(viewMode === 'profile' && mutualFriends.length > 0
                  ? mutualFriends
                  : friends
                )
                  .slice(0, 8)
                  .map((friend) => (
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
            <ProfileHeaderActions
              viewMode={viewMode}
              relationship={relationship}
              isOwner={Boolean(isOwner)}
              viewAsPublic={viewAsPublic}
              onViewAsPublic={() => setViewAsPublic(true)}
              onExitViewAs={() => setViewAsPublic(false)}
              onAddFriend={() => sendFriendRequest(member.id)}
              onCancelRequest={() => cancelFriendRequest(member.id)}
              onUnfriend={() => toggleFollow(member.id)}
              messageChatId={messageChatId}
              favorite={favorite}
            />
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
                {tab === item ? (
                  <span className="absolute inset-x-2 bottom-0 h-[3px] rounded-t-full bg-brand" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid w-full gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:px-5">
        <aside className="space-y-4 lg:sticky lg:top-[4.5rem] lg:self-start">
          <NetworkCard>
            <h2 className="text-lg font-semibold">
              {viewMode === 'personal' ? 'Intro' : `About ${member.firstName}`}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink">{member.bio}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Buy box</dt>
                <dd className="mt-0.5 text-ink">{member.buyBox}</dd>
              </div>
              <div className="text-muted">
                Lives in {member.city}, {member.state}
              </div>
              <div className="text-muted">Joined {member.joined}</div>
              {viewMode === 'personal' || relationship === 'friends' ? (
                <>
                  <div className="text-muted">{member.languages.join(' · ')}</div>
                  <div className="text-muted">{member.handle}</div>
                </>
              ) : (
                <div className="rounded-lg bg-mist px-3 py-2 text-xs text-muted">
                  Languages and handle are visible to connections only.
                </div>
              )}
            </dl>
            {viewMode === 'personal' ? (
              <Link
                to={networkSettingsPath('profile')}
                className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
              >
                Edit details
              </Link>
            ) : null}
          </NetworkCard>

          {viewMode === 'profile' && mutualFriends.length > 0 ? (
            <NetworkCard>
              <h2 className="text-lg font-semibold">Mutual friends</h2>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {mutualFriends.slice(0, 6).map((friend) => (
                  <Link key={friend.id} to={networkProfilePath(friend.id)} className="min-w-0">
                    <img
                      src={friend.avatar}
                      alt=""
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <span className="mt-1 block truncate text-[12px] font-semibold">{friend.name}</span>
                  </Link>
                ))}
              </div>
            </NetworkCard>
          ) : null}

          <NetworkCard>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {viewMode === 'personal' ? 'Your friends' : 'Friends'}
              </h2>
              <Link
                to={viewMode === 'personal' ? PATHS.networkFriends : `#`}
                onClick={
                  viewMode === 'profile'
                    ? (event) => {
                        event.preventDefault()
                        setTab('Friends')
                      }
                    : undefined
                }
                className="text-sm font-semibold text-brand"
              >
                See all
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {visibleFriends.slice(0, 9).map((friend) => (
                <Link key={friend.id} to={networkProfilePath(friend.id)} className="min-w-0">
                  <img
                    src={friend.avatar}
                    alt=""
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                  <span className="mt-1 block truncate text-[12px] font-semibold">{friend.name}</span>
                </Link>
              ))}
            </div>
            {hiddenFriendsCount > 0 ? (
              <p className="mt-3 text-xs text-muted">
                +{hiddenFriendsCount} more friends hidden until you connect.
              </p>
            ) : null}
          </NetworkCard>
        </aside>

        <div className="space-y-4">
          {tab === 'Posts' ? (
            <>
              {viewMode === 'personal' ? <Composer /> : null}
              {viewMode === 'profile' && relationship !== 'friends' ? (
                <NetworkCard className="border border-dashed border-line bg-mist/40">
                  <p className="text-sm text-muted">
                    Some posts are only shared with friends. Connect to see the full timeline.
                  </p>
                </NetworkCard>
              ) : null}
              {memberPosts.length ? (
                memberPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <NetworkCard>
                  <p className="text-sm text-muted">
                    No posts from {member.firstName} yet. The feed is waiting.
                  </p>
                </NetworkCard>
              )}
            </>
          ) : null}

          {tab === 'About' ? (
            <NetworkCard>
              <h2 className="text-lg font-semibold">About {member.firstName}</h2>
              <p className="mt-3 text-sm leading-relaxed">{member.bio}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.buyBox}</p>
              {viewMode === 'personal' || relationship === 'friends' ? (
                <dl className="mt-4 space-y-2 text-sm text-muted">
                  <div>Languages: {member.languages.join(', ')}</div>
                  <div>Handle: {member.handle}</div>
                </dl>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  Full contact details are limited on Profile view until you are friends.
                </p>
              )}
            </NetworkCard>
          ) : null}

          {tab === 'Friends' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {(viewMode === 'profile' && relationship !== 'friends'
                ? friends.slice(0, 6)
                : friends
              ).map((friend) => (
                <Link
                  key={friend.id}
                  to={networkProfilePath(friend.id)}
                  className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                >
                  <MemberAvatar name={friend.name} src={friend.avatar} size="lg" />
                  <span>
                    <span className="block font-semibold">{friend.name}</span>
                    <span className="text-xs text-muted">{friend.title}</span>
                    {mutualFriends.some((item) => item.id === friend.id) ? (
                      <span className="mt-0.5 block text-[11px] font-semibold text-brand">Mutual</span>
                    ) : null}
                  </span>
                </Link>
              ))}
              {viewMode === 'profile' && relationship !== 'friends' && friends.length > 6 ? (
                <NetworkCard className="sm:col-span-2">
                  <p className="text-sm text-muted">
                    Add {member.firstName} as a friend to browse their full friends list.
                  </p>
                </NetworkCard>
              ) : null}
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
