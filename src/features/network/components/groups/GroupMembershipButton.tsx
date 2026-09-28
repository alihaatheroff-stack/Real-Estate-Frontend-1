import { Button } from '@/components/ui/Button'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'
import { cn } from '@/shared/lib/cn'

type GroupMembershipButtonProps = {
  groupId: string
  size?: 'sm' | 'md'
  className?: string
  /** When true, show Leave instead of Joined for active members. */
  allowLeave?: boolean
}

export function GroupMembershipButton({
  groupId,
  size = 'md',
  className,
  allowLeave = false,
}: GroupMembershipButtonProps) {
  const { myMembership, joinGroup, leaveGroup, cancelRequest, getGroup } = useNetworkGroups()
  const group = getGroup(groupId)
  const membership = myMembership(groupId)

  if (!group || group.archived) return null

  if (membership.status === 'pending') {
    return (
      <Button
        size={size}
        variant="outline"
        className={cn('rounded-lg', className)}
        onClick={() => cancelRequest(groupId)}
      >
        Pending · Cancel
      </Button>
    )
  }

  if (membership.status === 'active') {
    if (allowLeave) {
      return (
        <Button
          size={size}
          variant="outline"
          className={cn('rounded-lg', className)}
          onClick={() => leaveGroup(groupId)}
        >
          Leave
        </Button>
      )
    }
    return (
      <Button
        size={size}
        variant="secondary"
        className={cn('rounded-lg', className)}
        disabled
      >
        Joined
      </Button>
    )
  }

  return (
    <Button
      size={size}
      className={cn('rounded-lg', className)}
      onClick={() => joinGroup(groupId)}
    >
      {group.privacy === 'Private' ? 'Request to Join' : 'Join'}
    </Button>
  )
}
