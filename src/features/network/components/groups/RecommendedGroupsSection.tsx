import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { GroupCard } from '@/features/network/components/groups/GroupCard'
import { recommendGroups } from '@/features/network/data/groups'
import { CURRENT_MEMBER_GROUP_PREFS } from '@/features/network/data/groupCategories'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'
import { cn } from '@/shared/lib/cn'

export function RecommendedGroupsSection({ className }: { className?: string }) {
  const { groups, joinedGroups, pendingGroups } = useNetworkGroups()
  const joinedIds = new Set([
    ...joinedGroups.map((g) => g.id),
    ...pendingGroups.map((g) => g.id),
  ])
  const recommended = recommendGroups(groups, joinedIds, 4)

  if (recommended.length === 0) return null

  return (
    <section className={cn('space-y-3', className)}>
      <NetworkCard>
        <h2 className="font-display text-xl font-semibold">Recommended Groups</h2>
        <p className="mt-0.5 text-sm text-muted">
          Based on your role ({CURRENT_MEMBER_GROUP_PREFS.professionalRole}), industry (
          {CURRENT_MEMBER_GROUP_PREFS.industry}), and geography ({CURRENT_MEMBER_GROUP_PREFS.geography}
          ).
        </p>
      </NetworkCard>
      <div className="grid gap-3 sm:grid-cols-2">
        {recommended.map((group) => (
          <GroupCard key={group.id} group={group} compact />
        ))}
      </div>
    </section>
  )
}
