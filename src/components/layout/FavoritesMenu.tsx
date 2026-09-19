import { useMemo } from 'react'
import { Heart } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import { buildFavoritesPlatforms } from '@/features/header/data/modulePlatformMenus'
import {
  formatFavoriteTimeAgo,
  useFavorites,
  type FavoriteModule,
} from '@/features/favorites/store'

const LIVE_MODULES = new Set<FavoriteModule>(['referral', 'crowdfunding', 'network'])

function isLiveModule(id: string): id is FavoriteModule {
  return LIVE_MODULES.has(id as FavoriteModule)
}

export function FavoritesMenu({
  className,
  triggerClassName,
  locked = false,
}: {
  className?: string
  triggerClassName?: string
  locked?: boolean
}) {
  const { items, folderNameById } = useFavorites()

  const platforms = useMemo(() => {
    const base = buildFavoritesPlatforms(false)

    return base.map((platform) => {
      if (!isLiveModule(platform.id)) {
        return {
          ...platform,
          summary: '0 saved items',
          timeAgo: '',
          unreadCount: 0,
          items: [],
        }
      }

      const moduleItems = items
        .filter((item) => item.module === platform.id)
        .slice()
        .sort((a, b) => b.savedAt - a.savedAt)

      const latest = moduleItems[0]
      const count = moduleItems.length
      return {
        ...platform,
        summary:
          count === 0
            ? '0 saved items'
            : `${count} saved ${count === 1 ? 'item' : 'items'}`,
        timeAgo: latest ? formatFavoriteTimeAgo(latest.savedAt) : '',
        unreadCount: 0,
        items: moduleItems.map((item) => {
          const folderName = folderNameById.get(item.folderId)
          return {
            id: item.id,
            title: item.title,
            subtitle: folderName
              ? `${folderName} · ${item.subtitle}`
              : item.subtitle,
            timeAgo: formatFavoriteTimeAgo(item.savedAt),
            avatarSrc: item.image,
          }
        }),
      }
    })
  }, [folderNameById, items])

  const savedCount = locked ? 0 : items.length

  return (
    <ModulePlatformMenu
      className={className}
      triggerClassName={triggerClassName}
      TriggerIcon={Heart}
      HeaderIcon={Heart}
      triggerLabel="Favorites"
      panelTitle="Favorites"
      panelSubtitle={
        savedCount > 0
          ? 'Your saved items, grouped by platform.'
          : 'Choose a platform to browse your saved items.'
      }
      footerLabel="See all favorites"
      platforms={platforms}
      badgeCount={savedCount}
      locked={locked}
    />
  )
}
