import { Link } from 'react-router-dom'
import { AlignLeft } from 'lucide-react'
import { COMPLIANCE_DOCS } from '@/pages/legal/data/complianceDocs'

export function CompliancePage() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <header className="mb-8 border-b border-ink/15 pb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Compliance
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
            Legal policies and statements for Life Coordination Real Estate Network.
          </p>
        </header>

        <nav aria-label="Compliance documents">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {COMPLIANCE_DOCS.map((doc) => (
              <li key={doc.id}>
                <Link
                  to={doc.href}
                  className="group flex items-center gap-3 py-4 transition hover:bg-mist/40 sm:gap-4 sm:py-5"
                >
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand text-white sm:h-9 sm:w-9"
                    aria-hidden
                  >
                    <AlignLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold uppercase tracking-wide text-ink group-hover:text-brand sm:text-base">
                    {doc.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
