import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  CategoryGrid,
  ServiceCard,
  PROVIDERS,
  SERVICES,
  ProviderCard,
} from '@/features/referrals'
import { PATHS } from '@/app/router/paths'
import { ProviderFilters, useProviderFilters } from '@/features/search'

export function ReferralsHomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { filters, updateFilter, resetFilters, toSearchParams } = useProviderFilters()
  const popular = SERVICES.slice(0, 6)
  const topPros = PROVIDERS.filter((p) => p.type === 'professional').slice(0, 3)
  const topTrades = PROVIDERS.filter((p) => p.type === 'trade')

  function onSearch(e: FormEvent) {
    e.preventDefault()
    const params = toSearchParams()
    if (query.trim()) params.set('q', query.trim())
    const target =
      filters.find === 'agency'
        ? PATHS.employerResults
        : filters.find === 'profile'
          ? PATHS.profileResults
          : PATHS.results
    navigate(`${target}?${params.toString()}`)
  }

  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(180deg,rgb(27_107_79/0.08),transparent)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Referrals marketplace
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Find Property Service Providers like you find talent on Fiverr
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Packaged services, clear scopes, ZIP-radius matching, and referral-ready badges.
          </p>
          <form onSubmit={onSearch} className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row">
            <Input
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, specialties, or providers…"
              className="bg-paper"
              aria-label="Search services"
            />
            <Button type="submit" size="lg" leftIcon={<Search className="h-4 w-4" />}>
              Search
            </Button>
          </form>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Categories"
          title="Browse talent by specialty"
          description="Professionals and trades — filters refine once you hit results."
        />
        <CategoryGrid />
      </Section>

      <Section className="bg-mist/60">
        <SectionHeading
          eyebrow="Filters"
          title="Narrow by field, motive, and referral terms"
          description="Same filter system as the landing hero — results stay consistent."
        />
        <ProviderFilters
          filters={filters}
          onChange={updateFilter}
          onReset={resetFilters}
          toSearchParams={toSearchParams}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Popular services"
          title="Most hired this month"
          action={
            <Link to={PATHS.results}>
              <Button variant="outline">View all</Button>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <Section className="bg-mist/60">
        <SectionHeading eyebrow="Professionals" title="Office-ready specialists" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topPros.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
        {topTrades.length > 0 ? (
          <div className="mt-10">
            <SectionHeading eyebrow="Trades" title="Field-ready tradespeople" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topTrades.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  )
}
