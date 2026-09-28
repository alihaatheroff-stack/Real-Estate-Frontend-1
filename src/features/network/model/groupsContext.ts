import { createContext } from 'react'
import type { GroupMemberRole, NetworkGroup } from '@/features/network/data/types'

export type GroupEditInput = {
  name?: string
  description?: string
  about?: string
  cover?: string
  category?: string
  industry?: string
  professionalRole?: string
  geography?: string
  strategy?: string
  interest?: string
  tags?: string[]
  rules?: string[]
  privacy?: 'Public' | 'Private'
}

export type GroupCreateInput = {
  name: string
  description: string
  about?: string
  cover?: string
  category?: string
  industry: string
  professionalRole: string
  geography: string
  strategy: string
  interest: string
  tags?: string[]
  rules?: string[]
  privacy: 'Public' | 'Private'
}

export type NetworkGroupsValue = {
  groups: NetworkGroup[]
  loading: boolean
  error: string | null
  getGroup: (id: string) => NetworkGroup | undefined
  myMembership: (groupId: string) => {
    status: 'none' | 'active' | 'pending'
    role: GroupMemberRole | null
  }
  joinedGroups: NetworkGroup[]
  managedGroups: NetworkGroup[]
  pendingGroups: NetworkGroup[]
  createGroup: (input: GroupCreateInput) => { ok: boolean; message: string; id?: string }
  joinGroup: (groupId: string) => { ok: boolean; message: string }
  leaveGroup: (groupId: string) => { ok: boolean; message: string }
  cancelRequest: (groupId: string) => { ok: boolean; message: string }
  approveRequest: (groupId: string, memberId: string) => { ok: boolean; message: string }
  declineRequest: (groupId: string, memberId: string) => { ok: boolean; message: string }
  setMemberRole: (
    groupId: string,
    memberId: string,
    role: GroupMemberRole,
  ) => { ok: boolean; message: string }
  removeMember: (groupId: string, memberId: string) => { ok: boolean; message: string }
  updateGroup: (groupId: string, input: GroupEditInput) => { ok: boolean; message: string }
  archiveGroup: (groupId: string) => { ok: boolean; message: string }
  deleteGroup: (groupId: string) => { ok: boolean; message: string }
}

export const NetworkGroupsContext = createContext<NetworkGroupsValue | null>(null)
