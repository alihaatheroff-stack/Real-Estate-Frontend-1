import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  Eye,
  Heart,
  Languages,
  MapPin,
  Share2,
  Star,
  TriangleAlert,
  Minus,
  Plus,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import {
  PackageSelector,
  ReviewsList,
  SERVICE_FAQS,
  getMinDeliveryDays,
  getProviderForService,
  getRelatedServices,
  getServiceAddons,
  getServiceById,
  getServiceGallery,
  getServiceProvidedList,
  getServiceTagGroups,
  REVIEWS,
} from '@/features/referrals'
import { ServiceGallery } from '@/features/referrals/components/ServiceGallery'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { PATHS, providerPath, servicePath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'
import type { Service } from '@/entities/provider/types'

function FaqItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
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
        className="flex w-full items-center justify-between gap-4 px-3 py-3 text-left sm:px-4"
      >
        <span className="font-semibold text-ink">{question}</span>
        {open ? (
          <Minus className="h-5 w-5 shrink-0 text-ink" />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-ink" />
        )}
      </button>
      {open ? (
        <p className="px-4 pb-4 text-sm leading-relaxed text-ink-soft">{answer}</p>
      ) : null}
    </div>
  )
}

function RelatedServiceCard({ service }: { service: Service }) {
  const provider = getProviderForService(service)
  const [saved, setSaved] = useState(false)
  const featured = service.featured ?? false

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line/80 bg-paper shadow-[0_6px_18px_rgb(15_31_26/0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]">
      <Link to={servicePath(service.id)} className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {featured ? (
          <span className="absolute -left-8 top-4 w-28 -rotate-45 bg-brand py-1 text-center text-[10px] font-bold uppercase tracking-wide text-white">
            Featured
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Save"
          onClick={(event) => {
            event.preventDefault()
            setSaved((value) => !value)
          }}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-muted shadow-sm"
        >
          <Heart className={cn('h-4 w-4', saved && 'fill-brand text-brand')} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {service.category}
        </p>
        <Link
          to={servicePath(service.id)}
          className="line-clamp-2 min-h-[2.75rem] text-[15px] font-bold leading-snug text-ink group-hover:text-brand"
        >
          {service.title}
        </Link>
        <div className="inline-flex items-center gap-1 text-sm text-ink">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold">{formatRating(service.rating)}</span>
          <span className="text-muted">({service.reviewCount} Reviews)</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 border-t border-line/70 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            {provider ? (
              <>
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <Link
                  to={providerPath(provider.id)}
                  className="truncate text-sm font-medium text-ink hover:text-brand"
                >
                  {provider.name}
                </Link>
              </>
            ) : null}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-muted">Starting at:</p>
            <p className="text-base font-bold text-ink">
              {formatCurrency(service.startingPrice)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ServiceDetailPage() {
  const { id = '' } = useParams()
  const service = getServiceById(id)
  const [saved, setSaved] = useState(false)

  if (!service) {
    return (
      <Section containerClassName="max-w-none px-5 sm:px-8 lg:px-10">
        <h1 className="font-display text-2xl font-bold">Service not found</h1>
        <Link to={PATHS.results} className="mt-4 inline-block text-brand hover:underline">
          Back to results
        </Link>
      </Section>
    )
  }

  const provider = getProviderForService(service)
  const deliveryDays = getMinDeliveryDays(service)
  const englishLevel = service.englishLevel ?? provider?.englishLevel ?? 'Fluent'
  const faqs = service.faqs ?? SERVICE_FAQS
  const gallery = getServiceGallery(service)
  const addons = getServiceAddons(service)
  const provided = getServiceProvidedList(service)
  const tagGroups = getServiceTagGroups(service)
  const related = getRelatedServices(service.id)
  const priceSuffix = service.startingPrice < 50 ? '/ sq ft' : undefined

  return (
    <div className="pb-10">
      <div className="relative">
        {/* Cream hero band — pricing card overlaps this on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[200px] overflow-hidden bg-[#f7f5f0] sm:h-[220px] lg:h-[280px]"
        >
          <div className="absolute -left-16 -top-6 h-44 w-44 rounded-[42%] bg-[#f0c27a]/35 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-[48%] bg-[#e8a87c]/25 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#d5ddd8_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
        </div>

        <Section
          className="relative py-3 sm:py-4"
          containerClassName="max-w-none px-5 sm:px-8 lg:px-10"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 lg:mb-4">
            <nav className="flex flex-wrap items-center gap-1 text-xs text-muted sm:text-sm">
              <Link to={PATHS.referrals} className="hover:text-brand">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={PATHS.results} className="hover:text-brand">
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="line-clamp-1 max-w-[200px] text-ink sm:max-w-md">
                {service.title}
              </span>
            </nav>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-paper px-3 text-xs font-medium text-ink transition hover:border-brand sm:h-9 sm:px-3.5 sm:text-sm"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-paper px-3 text-xs font-medium text-ink transition hover:border-brand sm:h-9 sm:px-3.5 sm:text-sm"
              >
                <Heart className={cn('h-3.5 w-3.5', saved && 'fill-brand text-brand')} />
                Save
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper text-accent transition hover:border-accent sm:h-9 sm:w-9"
                aria-label="Report service"
              >
                <TriangleAlert className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-x-7 xl:gap-x-8">
            {/* Title + seller meta — shares row with pricing card on desktop */}
            <div className="min-w-0">
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-snug">
                {service.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-base sm:text-lg">
                {provider ? (
                  <Link
                    to={providerPath(provider.id)}
                    className="inline-flex items-center gap-2.5 font-semibold text-ink hover:text-brand"
                  >
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
                    />
                    {provider.name}
                    {provider.verified ? <BadgeCheck className="h-5 w-5 text-brand" /> : null}
                  </Link>
                ) : null}
                <span className="inline-flex items-center gap-1.5 text-ink">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {formatRating(service.rating)} ({service.reviewCount} Review
                  {service.reviewCount === 1 ? '' : 's'})
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <Eye className="h-4 w-4" />
                  {(service.views ?? 4300).toLocaleString()} Views
                </span>
              </div>
            </div>

            <aside className="space-y-3 lg:row-span-2 lg:sticky lg:top-20 lg:self-start">
              <PackageSelector
                basePrice={service.startingPrice}
                addons={addons}
                priceSuffix={priceSuffix}
              />

              {provider ? (
                <>
                  <div className="rounded-2xl border border-line bg-paper p-4 shadow-soft sm:p-5">
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                      About The Seller
                    </h3>
                    <Link
                      to={providerPath(provider.id)}
                      className="mt-3 flex items-start gap-3 transition hover:opacity-90"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        {provider.verified ? (
                          <span className="absolute -left-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                            <BadgeCheck className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{provider.name}</p>
                        <p className="text-sm text-muted">{provider.title}</p>
                        <p className="mt-1 inline-flex items-center gap-1 text-sm text-ink">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          {formatRating(provider.rating)} ({provider.reviewCount} Reviews)
                        </p>
                      </div>
                    </Link>
                    <div className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3 text-left text-sm">
                      <div>
                        <p className="text-muted">Location</p>
                        <p className="mt-0.5 font-medium text-ink">
                          {provider.city}, {provider.state}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted">Rate</p>
                        <p className="mt-0.5 font-medium text-ink">
                          {provider.hourlyRateMin && provider.hourlyRateMax
                            ? `$${provider.hourlyRateMin} - $${provider.hourlyRateMax} / hr`
                            : 'Contact for rate'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={providerPath(provider.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand bg-paper px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
                  >
                    Contact Me
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </>
              ) : null}
            </aside>

            {/* Stats + gallery + body — fills left column under the hero */}
            <div className="min-w-0">
              <div className="grid grid-cols-1 gap-5 border-y border-line/80 py-5 sm:grid-cols-3 sm:items-center sm:gap-6 lg:py-6">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eee6]">
                    <CalendarCheck className="h-6 w-6 stroke-[1.6] text-ink" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight text-ink sm:text-lg">
                      Delivery Time
                    </p>
                    <p className="mt-1 text-[15px] leading-tight text-ink-soft sm:text-base">
                      {deliveryDays} Day{deliveryDays === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eee6]">
                    <Languages className="h-6 w-6 stroke-[1.6] text-ink" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight text-ink sm:text-lg">
                      English level
                    </p>
                    <p className="mt-1 text-[15px] leading-tight text-ink-soft sm:text-base">
                      {englishLevel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eee6]">
                    <MapPin className="h-6 w-6 stroke-[1.6] text-ink" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-tight text-ink sm:text-lg">
                      Location
                    </p>
                    <p className="mt-1 truncate text-[15px] leading-tight text-ink-soft sm:text-base">
                      {provider ? `${provider.city}, ${provider.state}` : 'Central Valley, CA'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-7 lg:mt-6 lg:space-y-8">
                <ServiceGallery images={gallery} title={service.title} />

                <div>
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    Service Description
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {service.description}
                  </p>

                  {provided.length > 0 ? (
                    <>
                      <p className="mt-3.5 text-sm font-semibold text-ink sm:text-base">
                        Services I provide:
                      </p>
                      <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm text-ink-soft sm:text-base">
                        {provided.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    </>
                  ) : null}

                  {service.descriptionExtra ? (
                    <p className="mt-3.5 text-sm leading-relaxed text-ink-soft sm:text-base">
                      {service.descriptionExtra}
                    </p>
                  ) : (
                    <p className="mt-3.5 text-sm leading-relaxed text-ink-soft sm:text-base">
                      Clear scope, documented deliverables, and referral-friendly packaging so
                      partners know exactly what they are sending clients into.
                    </p>
                  )}

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {tagGroups.map((group) => (
                      <div key={group.label}>
                        <h3 className="text-sm font-semibold text-ink">{group.label}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {group.values.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    Frequently Asked Questions
                  </h2>
                  <div className="mt-2.5 space-y-1.5">
                    {faqs.map((faq) => (
                      <FaqItem
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-line pt-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-ink sm:text-2xl">
                    {Math.min(service.reviewCount, REVIEWS.length)} Review
                    {Math.min(service.reviewCount, REVIEWS.length) === 1 ? '' : 's'}
                  </h2>
                  <ReviewsList
                    reviews={REVIEWS.slice(
                      0,
                      Math.max(1, Math.min(service.reviewCount, REVIEWS.length)),
                    )}
                    averageRating={service.rating}
                    reviewCount={service.reviewCount}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-8 lg:mt-10">
            <h2 className="mb-4 font-display text-xl font-bold text-ink sm:text-2xl">
              Related Services
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <RelatedServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
