import { useState } from 'react'
import { useIsAuthenticated } from '@/features/auth/session'
import type { SaveFavoriteDraft } from '@/features/favorites/SaveToFolderDialog'
import { removeFavoriteItem, useFavorites } from '@/features/favorites/store'

export function referralServiceFavoriteDraft(
  service: { id: string; title: string; category: string; image: string },
  provider?: { name: string; image: string } | null,
): SaveFavoriteDraft {
  return {
    itemId: service.id,
    module: 'referral',
    title: provider?.name ?? service.title,
    subtitle: provider ? service.title : service.category,
    image: provider?.image ?? service.image,
  }
}

export function referralProviderFavoriteDraft(provider: {
  id: string
  name: string
  title: string
  image: string
}): SaveFavoriteDraft {
  return {
    itemId: `provider:${provider.id}`,
    module: 'referral',
    title: provider.name,
    subtitle: provider.title,
    image: provider.image,
  }
}

export function networkPostFavoriteDraft(
  post: { id: string; text: string; image?: string; images?: string[] },
  author?: { name: string; avatar: string } | null,
): SaveFavoriteDraft {
  const photo = post.images?.[0] ?? post.image ?? author?.avatar ?? ''
  return {
    itemId: `post:${post.id}`,
    module: 'network',
    title: author?.name ?? 'Network post',
    subtitle: post.text.replace(/\s+/g, ' ').trim().slice(0, 90),
    image: photo,
  }
}

export function networkProfileFavoriteDraft(member: {
  id: string
  name: string
  title: string
  company: string
  avatar: string
}): SaveFavoriteDraft {
  return {
    itemId: `profile:${member.id}`,
    module: 'network',
    title: member.name,
    subtitle: [member.title, member.company].filter(Boolean).join(' · '),
    image: member.avatar,
  }
}

export function networkListingFavoriteDraft(listing: {
  id: string
  title: string
  price: string
  location: string
  image: string
}): SaveFavoriteDraft {
  return {
    itemId: `listing:${listing.id}`,
    module: 'network',
    title: listing.title,
    subtitle: `${listing.price} · ${listing.location}`,
    image: listing.image,
  }
}

export function useFavoriteToggle(draft: SaveFavoriteDraft) {
  const isAuthenticated = useIsAuthenticated()
  const { isSaved } = useFavorites()
  const [saveOpen, setSaveOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const saved = isSaved(draft.module, draft.itemId)

  function toggleSave() {
    if (!isAuthenticated) {
      setAuthOpen(true)
      return
    }
    if (saved) removeFavoriteItem(draft.module, draft.itemId)
    else setSaveOpen(true)
  }

  return {
    saved,
    saveOpen,
    authOpen,
    draft,
    toggleSave,
    closeSave: () => setSaveOpen(false),
    closeAuth: () => setAuthOpen(false),
  }
}
