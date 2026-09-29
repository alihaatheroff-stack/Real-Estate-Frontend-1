import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ProfileViewAsBanner({ onExit }: { onExit: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 bg-amber-50 px-3 py-2.5 sm:px-4 lg:px-5">
      <p className="inline-flex items-center gap-2 text-sm font-medium text-ink">
        <Eye className="h-4 w-4 shrink-0 text-amber-700" />
        Viewing your profile as a visitor — this is the public <span className="font-semibold">Profile</span> view.
      </p>
      <Button
        variant="ghost"
        className="h-9 rounded-lg border border-amber-300 bg-white px-3 text-sm hover:bg-amber-50"
        onClick={onExit}
      >
        Back to Personal view
      </Button>
    </div>
  )
}
