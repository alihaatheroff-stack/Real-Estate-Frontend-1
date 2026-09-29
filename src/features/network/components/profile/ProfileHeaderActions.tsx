import { Link } from 'react-router-dom'
import { Bookmark, Check, Eye, MessageCircle, UserMinus, UserPlus, UserX } from 'lucide-react'
import { networkMessagesPath, networkSettingsPath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import type { ProfileRelationship, ProfileViewMode } from '@/features/network/model/profileView'
import { cn } from '@/shared/lib/cn'

type FavoriteToggle = {
  saved: boolean
  toggleSave: () => void
}

export function ProfileHeaderActions({
  viewMode,
  relationship,
  isOwner,
  viewAsPublic,
  onViewAsPublic,
  onExitViewAs,
  onAddFriend,
  onCancelRequest,
  onUnfriend,
  messageChatId,
  favorite,
}: {
  viewMode: ProfileViewMode
  relationship: ProfileRelationship
  isOwner: boolean
  viewAsPublic: boolean
  onViewAsPublic: () => void
  onExitViewAs: () => void
  onAddFriend: () => void
  onCancelRequest: () => void
  onUnfriend: () => void
  messageChatId?: string
  favorite: FavoriteToggle
}) {
  if (viewMode === 'personal') {
    return (
      <div className="flex flex-wrap gap-2 pb-3">
        <Link
          to={networkSettingsPath('profile')}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
        >
          Edit profile
        </Link>
        <Button
          variant="ghost"
          className="h-11 rounded-lg border border-black bg-mist px-4 hover:bg-mist/80"
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={onViewAsPublic}
        >
          View as
        </Button>
      </div>
    )
  }

  if (isOwner && viewAsPublic) {
    return (
      <div className="flex flex-wrap gap-2 pb-3">
        <Button className="rounded-lg" onClick={onExitViewAs}>
          Exit view as
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 pb-3">
      {relationship === 'friends' ? (
        <Button
          variant="ghost"
          className="rounded-lg border border-black bg-mist hover:bg-mist/80"
          leftIcon={<UserMinus className="h-4 w-4" />}
          onClick={onUnfriend}
        >
          Friends
        </Button>
      ) : relationship === 'pending' ? (
        <Button
          variant="ghost"
          className="rounded-lg border border-black bg-mist hover:bg-mist/80"
          leftIcon={<UserX className="h-4 w-4" />}
          onClick={onCancelRequest}
        >
          Cancel request
        </Button>
      ) : (
        <Button className="rounded-lg" leftIcon={<UserPlus className="h-4 w-4" />} onClick={onAddFriend}>
          Add friend
        </Button>
      )}

      <Link
        to={networkMessagesPath(messageChatId)}
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

      {relationship === 'friends' ? (
        <span className="inline-flex h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted">
          <Check className="h-3.5 w-3.5 text-brand" />
          Connected
        </span>
      ) : null}
    </div>
  )
}
