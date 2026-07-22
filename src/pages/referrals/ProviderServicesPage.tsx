import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Play, SlidersHorizontal } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ServiceCard, getProviderById, getServicesByProvider } from '@/features/referrals'
import { PATHS, providerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_PEACH = '#FFF1ED'

type SortKey = 'default' | 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'random'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'Sort by (Default)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'price-desc', label: 'Highest Price' },
  { value: 'random', label: 'Random' },
]

export function ProviderServicesPage() {
  const { id = '' } = useParams()
  const provider = getProviderById(id)
  const [sort, setSort] = useState<SortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const pagePad = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

  const services = useMemo(() => {
    if (!provider) return []
    const list = [...getServicesByProvider(provider.id)]
    switch (sort) {
      case 'newest':
        return list.reverse()
      case 'oldest':
        return list
      case 'price-asc':
        return list.sort((a, b) => a.startingPrice - b.startingPrice)
      case 'price-desc':
        return list.sort((a, b) => b.startingPrice - a.startingPrice)
      case 'random':
        return list.sort(() => Math.random() - 0.5)
      default:
        return list
    }
  }, [provider, sort])

  if (!provider) {
    return (
      <Section containerClassName={pagePad}>
        <h1 className="font-display text-2xl font-bold">Provider not found</h1>
        <Link to={PATHS.referrals} className="mt-4 inline-block text-brand hover:underline">
          Back to referrals
        </Link>
      </Section>
    )
  }

  const categoryLabel = provider.specialty || provider.title
  const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Sort by (Default)'

  return (
    <div className="bg-white pb-16">
      <div
        className="relative overflow-hidden border-b border-[#f0e4df]"
        style={{ backgroundColor: FREEIO_PEACH }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 55c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 25c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />

        <Section className="relative py-6 sm:py-8" containerClassName={pagePad}>
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#6b7280]">
            <Link to={PATHS.referrals} className="hover:text-[#222]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={providerPath(provider.id)} className="hover:text-[#222]">
              {provider.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#222]">Services</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-4xl lg:text-[2.5rem]">
              {categoryLabel}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              {provider.about}
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#222] transition hover:opacity-80"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md"
                style={{ backgroundColor: FREEIO_GREEN }}
              >
                <Play className="h-4 w-4 fill-white" />
              </span>
              How RE NETWORK Works
            </button>
          </div>
        </Section>
      </div>

      <Section className="py-6 sm:py-8" containerClassName={pagePad}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280] sm:text-base">
            Showing all{' '}
            <span className="font-semibold text-[#222]">{services.length}</span> results
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#222] transition hover:border-[#5BBB7B] hover:text-[#5BBB7B]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                className="inline-flex h-11 min-w-[11rem] items-center justify-between gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#222] transition hover:border-[#5BBB7B]"
              >
                <span className="truncate">{sortLabel}</span>
                <ChevronDown className={cn('h-4 w-4 shrink-0 transition', sortOpen && 'rotate-180')} />
              </button>
              {sortOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-[#eee] bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSort(option.value)
                        setSortOpen(false)
                      }}
                      className={cn(
                        'block w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f6f7f9]',
                        sort === option.value ? 'font-semibold text-[#5BBB7B]' : 'text-[#222]',
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {services.length === 0 ? (
          <p className="rounded-xl border border-[#eee] bg-[#fafafa] px-6 py-10 text-center text-[#6b7280]">
            No services listed yet.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="marketplace" />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}
