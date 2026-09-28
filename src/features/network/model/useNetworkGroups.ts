import { useContext } from 'react'
import { NetworkGroupsContext } from '@/features/network/model/groupsContext'

export function useNetworkGroups() {
  const value = useContext(NetworkGroupsContext)
  if (!value) {
    throw new Error('useNetworkGroups must be used within NetworkGroupsProvider')
  }
  return value
}
