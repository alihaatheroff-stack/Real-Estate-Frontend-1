import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChartColumnIncreasing,
  ChevronRight,
  FileClock,
  FileText,
  Flag,
  Globe,
  Goal,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  UserRound,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralProviderFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import { ProviderCard } from '@/features/referrals/components/ProviderCard'
import { ReviewsList } from '@/features/referrals/components/ReviewsList'
import { ServiceCard } from '@/features/referrals/components/ServiceCard'
import {
  getServicesByProvider,
  listRelatedProviders,
  listReviews,
} from '@/features/referrals/api/repository'
import type { Provider } from '@/entities/provider/types'
import { formatRating } from '@/shared/lib/format'
import { PATHS, providerServicesPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'
import {
  ProviderSidebarRow,
  ProviderStatCard,
  ProviderTimelineItem,
} from '@/features/referrals/components/providerProfileParts'

export function ProviderProfileView({ provider }: { provider: Provider }) {
  const draft = useMemo(() => referralProviderFavoriteDraft(provider), [provider])
  const favorite = useFavoriteToggle(draft)
  const pagePad = MARKETPLACE_PAGE_PAD

  const services = getServicesByProvider(provider.id)
  const relatedProviders = listRelatedProviders(provider.id, 4)
  const typeLabel =
    provider.type === 'trade' ? 'Trade Professional' : 'New Rising Talent'
  const education = provider.education?.length
    ? provider.education
    : [
        {
          period: '2005-2006',
          degree: 'Bachlors in Fine Arts',
          school: 'Modern College',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
          period: '2006-2009',
          degree: 'Computer Science',
          school: 'Harvartd University',
          description:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        },
      ]
  const experience = provider.experience?.length
    ? provider.experience
    : [
        {
          period: '2019 - 2022',
          role: 'UX Designer',
          company: 'Dropbox',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
          period: '2022 - 2023',
          role: 'Art Director',
          company: 'TechCompany',
          description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et.',
        },
      ]
  const awards = provider.awards?.length
    ? provider.awards
    : [
        {
          year: '2021',
          title: 'Professional Design',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
          year: '2022',
          title: 'Creative Design',
          description:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        },
      ]

  return (
    <div className="bg-freeio-surface pb-16">
      {/* Peach hero */}
      <div
        className="relative overflow-hidden border-b border-freeio-peach-line bg-freeio-peach"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 55c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 25c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />

        <Section className="relative pb-0 pt-6 sm:pb-0 sm:pt-8" containerClassName={pagePad}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-freeio-muted">
              <Link to={PATHS.home} className="hover:text-freeio-ink">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={PATHS.results} className="hover:text-freeio-ink">
                Freelancers
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-freeio-ink">{provider.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-freeio-ink transition hover:bg-white/60"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                onClick={favorite.toggleSave}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-freeio-ink transition hover:bg-white/60"
                aria-pressed={favorite.saved}
              >
                <Heart
                  className={cn('h-4 w-4', favorite.saved && 'fill-rose-500 text-rose-500')}
                  strokeWidth={2.2}
                />
                {favorite.saved ? 'Saved' : 'Save'}
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-accent transition hover:bg-white/60"
                aria-label="Report provider"
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-6 sm:flex-row sm:items-center sm:gap-6 lg:pb-8 lg:pr-[23.5rem]">
            <div className="relative h-[7.5rem] w-[7.5rem] shrink-0 sm:h-36 sm:w-36">
              <img
                src={provider.image}
                alt={provider.name}
                className="h-full w-full rounded-full object-cover ring-4 ring-white"
              />
              {provider.verified ? (
                <span
                  className="absolute -left-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full text-white shadow bg-freeio"
                >
                  <BadgeCheck className="h-4 w-4" strokeWidth={2.5} />
                </span>
              ) : null}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-freeio-ink sm:text-[2.15rem]">
                {provider.name}
              </h1>
              <p className="mt-1 text-base text-freeio-muted sm:text-lg">{provider.title}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-freeio-gray">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-freeio-star text-freeio-star" />
                  <span className="font-medium text-freeio-ink">
                    {formatRating(provider.rating)}
                  </span>
                  <span className="text-freeio-muted">
                    ({provider.reviewCount} Reviews)
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-freeio" />
                  {provider.city}
                </span>
                {provider.joinedDate ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-freeio" />
                    {provider.joinedDate}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section className="relative py-0 sm:py-0" containerClassName={pagePad}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0 space-y-12">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-y border-freeio-border-soft bg-white py-8 sm:py-10">
              <ProviderStatCard
                icon={Goal}
                label="Project Success"
                value={provider.projectSuccess ?? provider.dealsClosed}
              />
              <ProviderStatCard
                icon={ChartColumnIncreasing}
                label="Total Service"
                value={provider.totalServices ?? services.length}
              />
              <ProviderStatCard
                icon={Goal}
                label="Completed Service"
                value={provider.completedServices ?? provider.dealsClosed}
              />
              <ProviderStatCard
                icon={FileClock}
                label="In Queue service"
                value={provider.inQueueServices ?? 0}
              />
            </div>

            <section>
              <h2 className="text-2xl font-bold text-freeio-ink">About Freelancer</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-freeio-muted">
                <p>{provider.about}</p>
                <p>
                  Specialty: {provider.specialty}. Languages: {provider.languages.join(', ')}.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-freeio-ink">Education</h2>
              <div className="mt-7">
                {education.map((item, index) => (
                  <ProviderTimelineItem
                    key={`${item.period}-${item.degree}`}
                    letter={(item.degree[0] || item.school[0] || 'E').toUpperCase()}
                    period={item.period}
                    title={item.degree}
                    subtitle={item.school}
                    description={item.description}
                    isLast={index === education.length - 1}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-freeio-ink">Work & Experience</h2>
              <div className="mt-7">
                {experience.map((item, index) => (
                  <ProviderTimelineItem
                    key={`${item.period}-${item.role}`}
                    letter={(item.role[0] || item.company[0] || 'W').toUpperCase()}
                    period={item.period}
                    title={item.role}
                    subtitle={item.company}
                    description={item.description}
                    isLast={index === experience.length - 1}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-freeio-ink">Awards</h2>
              <div className="mt-7">
                {awards.map((item, index) => (
                  <ProviderTimelineItem
                    key={`${item.year}-${item.title}`}
                    letter={(item.title[0] || 'A').toUpperCase()}
                    period={item.year}
                    title={item.title}
                    description={item.description}
                    isLast={index === awards.length - 1}
                  />
                ))}
              </div>
            </section>

            <section className="border-t border-freeio-border-soft pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-freeio-ink">Services</h2>
                <Link
                  to={providerServicesPath(provider.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline text-freeio"
                >
                  Browse Full List
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              {services.length === 0 ? (
                <p className="text-freeio-muted">No services listed yet.</p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {services.slice(0, 3).map((service) => (
                    <ServiceCard key={service.id} service={service} variant="marketplace" />
                  ))}
                </div>
              )}
            </section>

            <section className="border-t border-freeio-border-soft pt-10">
              <h2 className="mb-5 text-2xl font-bold text-freeio-ink">
                {provider.reviewCount} Reviews
              </h2>
              <ReviewsList
                reviews={listReviews()}
                averageRating={provider.rating}
                reviewCount={provider.reviewCount}
              />
            </section>
          </div>

          <aside className="space-y-5 lg:-mt-40 lg:sticky lg:top-24 lg:self-start">
            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-95 bg-freeio"
              >
                Download CV
              </button>
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-95 bg-freeio"
              >
                Message
              </button>
            </div>

            <div className="rounded-2xl border border-freeio-border-soft bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              {provider.hourlyRateMin && provider.hourlyRateMax ? (
                <p className="text-[1.75rem] font-bold leading-tight text-freeio-ink">
                  ${provider.hourlyRateMin} - ${provider.hourlyRateMax}
                  <span className="text-base font-medium text-freeio-muted"> / hr</span>
                </p>
              ) : null}

              <ul className="mt-3">
                <ProviderSidebarRow
                  icon={MapPin}
                  label="Location"
                  value={provider.city}
                />
                <ProviderSidebarRow icon={FileText} label="Type" value={typeLabel} />
                {provider.englishLevel ? (
                  <ProviderSidebarRow
                    icon={Globe}
                    label="English Level"
                    value={provider.englishLevel}
                  />
                ) : null}
                {provider.gender ? (
                  <ProviderSidebarRow icon={UserRound} label="Gender" value={provider.gender} />
                ) : null}
                {provider.email ? (
                  <ProviderSidebarRow
                    icon={Mail}
                    label="Email"
                    value={provider.email}
                    href={`mailto:${provider.email}`}
                  />
                ) : null}
                {provider.phone ? (
                  <ProviderSidebarRow icon={Phone} label="Phone Number" value={provider.phone} />
                ) : null}
              </ul>
            </div>

            {provider.skills?.length ? (
              <div className="rounded-2xl border border-freeio-border-soft bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <h3 className="text-lg font-bold text-freeio-ink">My Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {provider.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md px-3.5 py-2 text-sm font-medium text-freeio-ink bg-freeio-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 bg-white text-base font-semibold transition hover:bg-freeio-soft-green border-freeio text-freeio"
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </aside>
        </div>

        {relatedProviders.length ? (
          <section className="mt-16 border-t border-freeio-border-soft pt-12">
            <h2 className="text-2xl font-bold text-freeio-ink">Related Freelancers</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProviders.map((item) => (
                <ProviderCard key={item.id} provider={item} variant="marketplace" />
              ))}
            </div>
          </section>
        ) : null}
      </Section>
      <FavoriteActionDialogs favorite={favorite} />
    </div>
  )
}
