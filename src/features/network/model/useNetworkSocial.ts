import { useContext } from 'react'
import { NetworkSocialContext } from '@/features/network/model/socialContext'

export function useNetworkSocial() {
  const ctx = useContext(NetworkSocialContext)
  if (!ctx) {
    throw new Error('useNetworkSocial must be used within NetworkSocialProvider')
  }
  return ctx
}
