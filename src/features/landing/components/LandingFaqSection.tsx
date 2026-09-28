import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { LANDING_FAQS } from '@/features/landing/data/landingFaq'
import { cn } from '@/shared/lib/cn'

function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string
  answer: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        'rounded-xl transition',
        open ? 'bg-brand-light/70' : 'bg-transparent',
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-3 py-3 text-left sm:px-4"
      >
        <span className="font-semibold text-ink">{question}</span>
        {open ? (
          <Minus className="h-5 w-5 shrink-0 text-ink" aria-hidden />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-ink" aria-hidden />
        )}
      </button>
      {open ? (
        <p className="px-4 pb-4 text-sm leading-relaxed text-ink-soft">{answer}</p>
      ) : null}
    </div>
  )
}

export function LandingFaqSection() {
  return (
    <Section
      id="faq"
      className="scroll-mt-24 bg-mist/50 pt-4 pb-12 sm:pt-6 sm:pb-16"
      containerClassName="max-w-none"
    >
      <ScrollReveal>
        <SectionHeading
          title="Frequently Asked Questions"
          className="mb-6 w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
        />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <div className="w-full space-y-1.5">
          {LANDING_FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}
