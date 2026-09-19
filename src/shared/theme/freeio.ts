/**
 * Freeio color constants for rare JS/inline needs (e.g. dynamic SVG, canvas).
 * Prefer Tailwind theme classes in JSX: `bg-freeio`, `text-freeio-ink`, etc.
 */
export const FREEIO_GREEN = 'var(--color-freeio)'
export const FREEIO_GREEN_SOFT = 'var(--color-freeio-soft)'
export const FREEIO_PEACH = 'var(--color-freeio-peach)'

/** Hex fallbacks when a real color string is required (maps, third-party APIs). */
export const FREEIO_GREEN_HEX = '#5BBB7B'
export const FREEIO_GREEN_SOFT_HEX = '#E7F6ED'
export const FREEIO_PEACH_HEX = '#FFF1ED'
