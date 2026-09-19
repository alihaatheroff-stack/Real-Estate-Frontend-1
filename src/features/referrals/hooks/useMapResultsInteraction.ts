import { useEffect, useRef, useState } from 'react'

type Identifiable = { id: string }

/** Shared list↔map selection, hover, and scroll-into-view sync. */
export function useMapResultsInteraction(items: Identifiable[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (!hoveredId) return
    itemRefs.current[hoveredId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [hoveredId])

  useEffect(() => {
    if (selectedId && !items.some((item) => item.id === selectedId)) {
      setSelectedId(null)
    }
  }, [selectedId, items])

  return {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    itemRefs,
  }
}
