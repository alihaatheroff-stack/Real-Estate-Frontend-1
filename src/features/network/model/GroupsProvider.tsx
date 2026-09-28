import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  NETWORK_GROUPS,
  canManageGroup,
  syncGroupDerived,
} from '@/features/network/data/groups'
import { CURRENT_MEMBER_ID } from '@/features/network/data/members'
import type { GroupMemberRole, NetworkGroup } from '@/features/network/data/types'
import {
  NetworkGroupsContext,
  type GroupCreateInput,
  type GroupEditInput,
  type NetworkGroupsValue,
} from '@/features/network/model/groupsContext'

const STORAGE_KEY = 're-network-groups-state-v2'

type StoredState = {
  groups: NetworkGroup[]
}

function readStored(): NetworkGroup[] | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredState
    if (!Array.isArray(parsed.groups)) return null
    return parsed.groups.map(syncGroupDerived)
  } catch {
    return null
  }
}

function writeStored(groups: NetworkGroup[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ groups }))
  } catch {
    /* ignore quota */
  }
}

function fail(message: string) {
  return { ok: false as const, message }
}

function ok(message: string) {
  return { ok: true as const, message }
}

export function NetworkGroupsProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<NetworkGroup[]>(NETWORK_GROUPS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = readStored()
      if (stored) setGroups(stored)
      setError(null)
    } catch {
      setError('Could not load your Groups state. Showing defaults.')
      setGroups(NETWORK_GROUPS)
    } finally {
      setLoading(false)
    }
  }, [])

  const commit = useCallback((updater: (current: NetworkGroup[]) => NetworkGroup[]) => {
    setGroups((current) => {
      const next = updater(current).map(syncGroupDerived)
      writeStored(next)
      return next
    })
  }, [])

  const getGroup = useCallback((id: string) => groups.find((group) => group.id === id), [groups])

  const myMembership = useCallback(
    (groupId: string) => {
      const group = groups.find((g) => g.id === groupId)
      const row = group?.memberships.find((m) => m.memberId === CURRENT_MEMBER_ID)
      if (!row) return { status: 'none' as const, role: null }
      return { status: row.status, role: row.role }
    },
    [groups],
  )

  const joinedGroups = useMemo(
    () =>
      groups.filter(
        (group) =>
          !group.archived &&
          group.memberships.some(
            (m) => m.memberId === CURRENT_MEMBER_ID && m.status === 'active',
          ),
      ),
    [groups],
  )

  const managedGroups = useMemo(
    () =>
      groups.filter((group) => {
        if (group.archived) return false
        const row = group.memberships.find(
          (m) => m.memberId === CURRENT_MEMBER_ID && m.status === 'active',
        )
        return canManageGroup(row?.role)
      }),
    [groups],
  )

  const pendingGroups = useMemo(
    () =>
      groups.filter(
        (group) =>
          !group.archived &&
          group.memberships.some(
            (m) => m.memberId === CURRENT_MEMBER_ID && m.status === 'pending',
          ),
      ),
    [groups],
  )

  const createGroup = useCallback(
    (input: GroupCreateInput) => {
      const name = input.name.trim()
      const description = input.description.trim()
      if (!name) return fail('Group name is required.')
      if (!description) return fail('Short description is required.')
      if (!input.industry || !input.professionalRole || !input.geography) {
        return fail('Industry, role, and geography are required.')
      }
      if (!input.strategy || !input.interest) {
        return fail('Strategy and interest are required.')
      }

      const id = `g-local-${Date.now()}`
      const now = Date.now()
      const cover =
        input.cover?.trim() ||
        '/images/stock/photo-1486406146926-c627a92ad1ab.jpg'
      const tags = (input.tags ?? []).map((tag) => tag.trim()).filter(Boolean)
      const rules = (input.rules ?? []).map((rule) => rule.trim()).filter(Boolean)
      const about = input.about?.trim() || description

      const next: NetworkGroup = syncGroupDerived({
        id,
        name,
        cover,
        privacy: input.privacy,
        category: input.category?.trim() || input.industry,
        description,
        about,
        lastActive: 'Just now',
        lastActiveAt: now,
        createdAt: now,
        industry: input.industry,
        professionalRole: input.professionalRole,
        geography: input.geography,
        strategy: input.strategy,
        interest: input.interest,
        tags,
        rules:
          rules.length > 0
            ? rules
            : ['Be respectful.', 'Stay on topic.', 'No spam or solicitation.'],
        members: 1,
        memberIds: [CURRENT_MEMBER_ID],
        memberships: [
          {
            memberId: CURRENT_MEMBER_ID,
            role: 'owner',
            status: 'active',
            joinedAt: now,
          },
        ],
      })

      commit((current) => [next, ...current])
      return { ok: true as const, message: 'Group created.', id }
    },
    [commit],
  )

  const joinGroup = useCallback(
    (groupId: string) => {
      const group = groups.find((g) => g.id === groupId)
      if (!group || group.archived) return fail('Group not found.')
      const existing = group.memberships.find((m) => m.memberId === CURRENT_MEMBER_ID)
      if (existing?.status === 'active') return fail('You are already a member.')
      if (existing?.status === 'pending') return fail('Request already pending.')

      const status = group.privacy === 'Private' ? 'pending' : 'active'
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          const without = g.memberships.filter((m) => m.memberId !== CURRENT_MEMBER_ID)
          return {
            ...g,
            members: status === 'active' ? g.members + 1 : g.members,
            lastActive: 'Just now',
            lastActiveAt: Date.now(),
            memberships: [
              ...without,
              {
                memberId: CURRENT_MEMBER_ID,
                role: 'member' as const,
                status,
                joinedAt: Date.now(),
              },
            ],
          }
        }),
      )
      return ok(status === 'pending' ? 'Membership request sent.' : 'You joined the group.')
    },
    [commit, groups],
  )

  const leaveGroup = useCallback(
    (groupId: string) => {
      const group = groups.find((g) => g.id === groupId)
      if (!group) return fail('Group not found.')
      const row = group.memberships.find(
        (m) => m.memberId === CURRENT_MEMBER_ID && m.status === 'active',
      )
      if (!row) return fail('You are not a member of this group.')
      if (row.role === 'owner') {
        const otherOwners = group.memberships.filter(
          (m) => m.status === 'active' && m.role === 'owner' && m.memberId !== CURRENT_MEMBER_ID,
        )
        if (otherOwners.length === 0) {
          return fail('Transfer ownership before leaving as the sole owner.')
        }
      }
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          return {
            ...g,
            members: Math.max(0, g.members - 1),
            memberships: g.memberships.filter((m) => m.memberId !== CURRENT_MEMBER_ID),
          }
        }),
      )
      return ok('You left the group.')
    },
    [commit, groups],
  )

  const cancelRequest = useCallback(
    (groupId: string) => {
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          return {
            ...g,
            memberships: g.memberships.filter(
              (m) => !(m.memberId === CURRENT_MEMBER_ID && m.status === 'pending'),
            ),
          }
        }),
      )
      return ok('Request cancelled.')
    },
    [commit],
  )

  const approveRequest = useCallback(
    (groupId: string, memberId: string) => {
      const mine = myMembership(groupId)
      if (!canManageGroup(mine.role)) return fail('Only owners and admins can approve requests.')
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          const hadPending = g.memberships.some(
            (m) => m.memberId === memberId && m.status === 'pending',
          )
          if (!hadPending) return g
          return {
            ...g,
            members: g.members + 1,
            lastActive: 'Just now',
            lastActiveAt: Date.now(),
            memberships: g.memberships.map((m) =>
              m.memberId === memberId && m.status === 'pending'
                ? { ...m, status: 'active' as const, joinedAt: Date.now() }
                : m,
            ),
          }
        }),
      )
      return ok('Member approved.')
    },
    [commit, myMembership],
  )

  const declineRequest = useCallback(
    (groupId: string, memberId: string) => {
      const mine = myMembership(groupId)
      if (!canManageGroup(mine.role)) return fail('Only owners and admins can decline requests.')
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          return {
            ...g,
            memberships: g.memberships.filter(
              (m) => !(m.memberId === memberId && m.status === 'pending'),
            ),
          }
        }),
      )
      return ok('Request declined.')
    },
    [commit, myMembership],
  )

  const setMemberRole = useCallback(
    (groupId: string, memberId: string, role: GroupMemberRole) => {
      const mine = myMembership(groupId)
      if (!canManageGroup(mine.role)) return fail('Only owners and admins can change roles.')
      if (role === 'owner' && mine.role !== 'owner') {
        return fail('Only the owner can assign ownership.')
      }
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          return {
            ...g,
            memberships: g.memberships.map((m) => {
              if (m.memberId !== memberId || m.status !== 'active') return m
              return { ...m, role }
            }),
          }
        }),
      )
      return ok('Role updated.')
    },
    [commit, myMembership],
  )

  const removeMember = useCallback(
    (groupId: string, memberId: string) => {
      const mine = myMembership(groupId)
      if (!canManageGroup(mine.role)) return fail('Only owners and admins can remove members.')
      const group = groups.find((g) => g.id === groupId)
      const target = group?.memberships.find((m) => m.memberId === memberId)
      if (!target || target.status !== 'active') return fail('Member not found.')
      if (target.role === 'owner') return fail('Cannot remove the owner.')
      if (target.role === 'admin' && mine.role !== 'owner') {
        return fail('Only the owner can remove admins.')
      }
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          return {
            ...g,
            members: Math.max(0, g.members - 1),
            memberships: g.memberships.filter((m) => m.memberId !== memberId),
          }
        }),
      )
      return ok('Member removed.')
    },
    [commit, groups, myMembership],
  )

  const updateGroup = useCallback(
    (groupId: string, input: GroupEditInput) => {
      const mine = myMembership(groupId)
      if (!canManageGroup(mine.role)) return fail('Only owners and admins can edit this group.')
      commit((current) =>
        current.map((g) => {
          if (g.id !== groupId) return g
          return {
            ...g,
            name: input.name?.trim() || g.name,
            description: input.description?.trim() || g.description,
            about: input.about?.trim() || g.about,
            cover: input.cover?.trim() || g.cover,
            category: input.category?.trim() || g.category,
            industry: input.industry || g.industry,
            professionalRole: input.professionalRole || g.professionalRole,
            geography: input.geography || g.geography,
            strategy: input.strategy || g.strategy,
            interest: input.interest || g.interest,
            tags: input.tags ?? g.tags,
            rules: input.rules ?? g.rules,
            privacy: input.privacy ?? g.privacy,
            lastActive: 'Just now',
            lastActiveAt: Date.now(),
          }
        }),
      )
      return ok('Group updated.')
    },
    [commit, myMembership],
  )

  const archiveGroup = useCallback(
    (groupId: string) => {
      const mine = myMembership(groupId)
      if (mine.role !== 'owner' && mine.role !== 'admin') {
        return fail('Only owners and admins can archive this group.')
      }
      commit((current) =>
        current.map((g) => (g.id === groupId ? { ...g, archived: true } : g)),
      )
      return ok('Group archived.')
    },
    [commit, myMembership],
  )

  const deleteGroup = useCallback(
    (groupId: string) => {
      const mine = myMembership(groupId)
      if (mine.role !== 'owner') return fail('Only the owner can delete this group.')
      commit((current) => current.filter((g) => g.id !== groupId))
      return ok('Group deleted.')
    },
    [commit, myMembership],
  )

  const value = useMemo<NetworkGroupsValue>(
    () => ({
      groups,
      loading,
      error,
      getGroup,
      myMembership,
      joinedGroups,
      managedGroups,
      pendingGroups,
      createGroup,
      joinGroup,
      leaveGroup,
      cancelRequest,
      approveRequest,
      declineRequest,
      setMemberRole,
      removeMember,
      updateGroup,
      archiveGroup,
      deleteGroup,
    }),
    [
      groups,
      loading,
      error,
      getGroup,
      myMembership,
      joinedGroups,
      managedGroups,
      pendingGroups,
      createGroup,
      joinGroup,
      leaveGroup,
      cancelRequest,
      approveRequest,
      declineRequest,
      setMemberRole,
      removeMember,
      updateGroup,
      archiveGroup,
      deleteGroup,
    ],
  )

  return (
    <NetworkGroupsContext.Provider value={value}>{children}</NetworkGroupsContext.Provider>
  )
}
