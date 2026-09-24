import { useState } from 'react'
import { Check } from 'lucide-react'
import { PlanCards } from '@/pages/about/PlanCards'
import { ABOUT_NOTES, type AboutNoteBlock } from '@/pages/about/aboutNotes'
import { cn } from '@/shared/lib/cn'

function NoteBlock({
  block,
  nested = false,
}: {
  block: AboutNoteBlock
  nested?: boolean
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  return (
    <section>
      <h2
        className={
          nested
            ? 'font-display text-lg font-semibold tracking-tight text-ink'
            : 'font-display text-xl font-semibold tracking-tight text-ink underline decoration-ink underline-offset-4 sm:text-2xl'
        }
      >
        {block.heading}
      </h2>
      {block.children?.map((child) => (
        <div key={child.heading} className="mt-5 pl-4 sm:pl-6">
          <NoteBlock block={child} nested />
        </div>
      ))}
      {block.lines.length > 0 ? (
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink sm:text-base">
          {block.lines.map((line, index) => {
            const isChecked = Boolean(checked[index])
            return (
              <li key={`${block.heading}-${index}`}>
                <label className="flex cursor-pointer items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition',
                      isChecked
                        ? 'border-brand bg-brand text-white'
                        : 'border-ink/45 bg-white text-transparent hover:border-brand',
                    )}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={(event) =>
                      setChecked((current) => ({
                        ...current,
                        [index]: event.target.checked,
                      }))
                    }
                  />
                  <span>{line}</span>
                </label>
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )
}

export function AboutPage() {
  return (
    <div className="bg-[#f7f8f7]">
      <PlanCards />
      <div className="mx-auto max-w-3xl space-y-8 px-4 pb-14 sm:px-6">
        {ABOUT_NOTES.map((block) => (
          <NoteBlock key={block.heading} block={block} />
        ))}
      </div>
    </div>
  )
}
