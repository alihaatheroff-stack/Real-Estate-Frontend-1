import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { glossaryEntries } from '@/features/glossary/glossary'
import { cn } from '@/shared/lib/cn'

export function GlossaryPage() {
  const { hash } = useLocation()
  const entries = glossaryEntries()
  const activeId = hash ? decodeURIComponent(hash.slice(1)) : ''
  const grouped = new Map<string, typeof entries>()
  for (const entry of entries) {
    const list = grouped.get(entry.letter) ?? []
    list.push(entry)
    grouped.set(entry.letter, list)
  }
  const letters = [...grouped.keys()].sort((a, b) => {
    if (a === '#') return -1
    if (b === '#') return 1
    return a.localeCompare(b)
  })

  function letterAnchor(letter: string) {
    return letter === '#' ? 'glossary-num' : `glossary-${letter}`
  }

  useEffect(() => {
    if (!activeId) return
    const el = document.getElementById(activeId)
    if (!el) return
    const frame = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [activeId])

  return (
    <div className="w-full bg-white">
      <div className="w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-12 xl:px-16">
        <header className="border-b border-ink/15 pb-5">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Glossary
          </h1>
          <p className="mt-2 max-w-4xl text-base leading-relaxed text-ink/70">
            Why each landing-page filter is asked, listed A to Z. Choose a letter, or open
            Learn more on a question to land on that entry.
          </p>
        </header>

        <nav
          aria-label="Glossary letters"
          className="sticky top-[4.75rem] z-30 -mx-5 mt-4 flex flex-wrap gap-1 border-b border-ink/10 bg-white/95 px-5 py-3 backdrop-blur-sm sm:top-[5.5rem] sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16"
        >
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#${letterAnchor(letter)}`}
              className="inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2.5 font-display text-base font-semibold text-ink hover:bg-mist"
            >
              {letter}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-12">
          {letters.map((letter) => (
            <section key={letter} aria-labelledby={letterAnchor(letter)}>
              <h2
                id={letterAnchor(letter)}
                className="scroll-mt-40 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              >
                {letter}
              </h2>
              <div className="mt-4 border-l border-ink/20 pl-4 sm:pl-8 lg:pl-10">
                {(grouped.get(letter) ?? []).map((entry) => {
                  const active = entry.id === activeId
                  return (
                    <article
                      key={entry.id}
                      id={entry.id}
                      className={cn(
                        'scroll-mt-44 border-b border-ink/10 py-4 pr-2 last:border-b-0 sm:py-5',
                        active && 'rounded-r-lg border-l-4 border-l-ink bg-[#fff6cc] px-4 sm:px-6',
                      )}
                    >
                      <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
                        {entry.question}
                      </h3>
                      <p className="mt-2 pl-4 text-sm leading-relaxed text-ink/75 sm:pl-8 sm:text-base">
                        {entry.answer}
                      </p>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
