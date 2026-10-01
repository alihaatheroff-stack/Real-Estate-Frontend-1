import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'

export function PolicySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-3">
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-ink/80 sm:text-base">{children}</div>
    </section>
  )
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 font-display text-base font-semibold text-ink sm:text-lg">{children}</h3>
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function PolicyTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink/15">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-mist/80">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-ink/10 px-3 py-2.5 font-display font-semibold text-ink"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')} className="border-b border-ink/10 last:border-b-0">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`} className="px-3 py-2.5 align-top text-ink/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Display date stamped on all compliance documents (month/day/year). */
export const POLICY_TODAY = '10/1/2026'

export const BUSINESS_ADDRESS = 'PO BOX 591, Firebaugh CA 93622, North America'

export const POLICY_CONTACT_EMAIL = 'Myteamleadgenerator@Gmail.com'

type PolicyDocLayoutProps = {
  title: string
  effectiveDate?: string
  lastUpdated?: string
  contactLines?: string[]
  children: ReactNode
  footerNote?: string
}

export function PolicyDocLayout({
  title,
  effectiveDate = POLICY_TODAY,
  lastUpdated = POLICY_TODAY,
  contactLines = [
    'Life Coordination Real Estate Network ("LCRE," "we," "us," or "our")',
    BUSINESS_ADDRESS,
    POLICY_CONTACT_EMAIL,
  ],
  children,
  footerNote,
}: PolicyDocLayoutProps) {
  const resolvedFooter = footerNote?.replaceAll('[DATE]', POLICY_TODAY)

  return (
    <div className="w-full bg-white">
      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mb-6">
          <Link
            to={PATHS.compliance}
            className="text-sm font-medium text-brand underline-offset-2 hover:underline"
          >
            ← All compliance documents
          </Link>
        </div>

        <header className="border-b border-ink/15 pb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink/70 sm:text-base">
            Effective Date: {effectiveDate}
            <br />
            Last Updated: {lastUpdated}
          </p>
          <div className="mt-4 space-y-1 text-sm leading-relaxed text-ink/80 sm:text-base">
            {contactLines.map((line, index) => (
              <p key={line} className={index === 0 ? 'font-medium text-ink' : undefined}>
                {line}
              </p>
            ))}
          </div>
        </header>

        <div className="mt-10 space-y-10">
          {children}
          {resolvedFooter ? (
            <footer className="border-t border-ink/15 pt-6 text-sm text-ink/70 sm:text-base">
              <p>{resolvedFooter}</p>
            </footer>
          ) : null}
        </div>
      </article>
    </div>
  )
}
