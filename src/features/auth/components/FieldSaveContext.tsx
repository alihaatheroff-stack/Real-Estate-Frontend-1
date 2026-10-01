import {
  createContext,
  useContext,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Check, Save } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type FieldSaveContextValue = {
  saveField: (fieldId: string) => void
  savedFieldId: string | null
}

const FieldSaveContext = createContext<FieldSaveContextValue | null>(null)

export function FieldSaveProvider({
  saveField,
  savedFieldId,
  children,
}: FieldSaveContextValue & { children: ReactNode }) {
  return (
    <FieldSaveContext.Provider value={{ saveField, savedFieldId }}>
      {children}
    </FieldSaveContext.Provider>
  )
}

export function useFieldSave() {
  return useContext(FieldSaveContext)
}

/**
 * Compact save control next to a field label (same footprint as the QA info mark).
 * Only renders inside {@link FieldSaveProvider} (Account Settings edit mode).
 */
export function FieldSaveMark({
  fieldId,
  className,
}: {
  fieldId: string
  className?: string
}) {
  const ctx = useFieldSave()
  if (!ctx) return null

  const saved = ctx.savedFieldId === fieldId

  function stop(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm transition',
        saved
          ? 'text-[#1dbf73]'
          : 'text-muted hover:text-brand focus-visible:text-brand',
        'relative z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
        className,
      )}
      aria-label={saved ? `${fieldId} saved` : `Save ${fieldId}`}
      title={saved ? 'Saved' : 'Save this field'}
      onMouseDown={stop}
      onClick={(event) => {
        stop(event)
        ctx.saveField(fieldId)
      }}
    >
      {saved ? (
        <Check className="h-full w-full" strokeWidth={2.5} aria-hidden />
      ) : (
        <Save className="h-full w-full" strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}
