/** Instant scroll — bypasses `html { scroll-behavior: smooth }`. */
export function scrollWindowToInstant(y: number) {
  const top = Math.max(0, y)
  const html = document.documentElement

  // Keep `auto` through the scroll settle. Restoring `smooth` in the same
  // tick lets Chrome animate the jump via CSSOM scroll APIs.
  html.style.setProperty('scroll-behavior', 'auto', 'important')
  html.scrollTop = top
  document.body.scrollTop = top
  window.scrollTo({ top, left: 0, behavior: 'instant' })

  window.requestAnimationFrame(() => {
    html.scrollTop = top
    document.body.scrollTop = top
    window.requestAnimationFrame(() => {
      html.style.removeProperty('scroll-behavior')
    })
  })
}

/** Matches Tailwind `scroll-mt-24` (6rem). */
const SECTION_OFFSET_PX = 96

export function scrollToSectionInstant(id: string, offsetPx = SECTION_OFFSET_PX) {
  const el = document.getElementById(id)
  if (!el) return false

  const y = el.getBoundingClientRect().top + window.scrollY - offsetPx
  scrollWindowToInstant(y)
  return true
}
