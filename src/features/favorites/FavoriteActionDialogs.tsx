import { AuthRequiredDialog } from '@/features/auth'
import { SaveToFolderDialog } from '@/features/favorites/SaveToFolderDialog'
import type { useFavoriteToggle } from '@/features/favorites/useFavoriteToggle'

export function FavoriteActionDialogs({
  favorite,
}: {
  favorite: ReturnType<typeof useFavoriteToggle>
}) {
  return (
    <>
      <SaveToFolderDialog
        open={favorite.saveOpen}
        draft={favorite.draft}
        onClose={favorite.closeSave}
      />
      <AuthRequiredDialog
        open={favorite.authOpen}
        onClose={favorite.closeAuth}
        action="save favorites"
      />
    </>
  )
}
