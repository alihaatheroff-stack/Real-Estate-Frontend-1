import { useEffect, useMemo, useState } from 'react'

/** Page slice + page-number chrome helpers for map result lists. */
export function useResultsPagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)
  const count = items.length
  const totalPages = Math.max(1, Math.ceil(count / pageSize))
  const pageStart = count === 0 ? 0 : (page - 1) * pageSize + 1
  const pageEnd = Math.min(page * pageSize, count)

  const pagedItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize],
  )

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    setPage(1)
  }, [items])

  return {
    page,
    setPage,
    totalPages,
    pageStart,
    pageEnd,
    pagedItems,
  }
}
