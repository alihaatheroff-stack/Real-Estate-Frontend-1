import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import {
  ProviderCard,
  ReviewsList,
  ServiceCard,
  PROVIDERS,
  getProviderById,
  getServicesByProvider,
  REVIEWS,
} from '@/features/referrals'
import { formatRating } from '@/shared/lib/format'
import { PATHS, providerServicesPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_PEACH = '#FFF1ED'
const FREEIO_TAG = '#FFEDE8'
const FREEIO_CREAM = '#F6F0E6'

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: LucideIcon
}) {
  return (
    <div className="flex min-w-[10.5rem] flex-1 items-center gap-4">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-[4.75rem] sm:w-[4.75rem]">
        <span
          aria-hidden
          className="absolute left-1 top-2 h-[3.25rem] w-[3.25rem] rounded-full sm:h-14 sm:w-14"
          style={{ backgroundColor: FREEIO_CREAM }}
        />
        <Icon className="relative h-9 w-9 text-[#222222]" strokeWidth={1.4} />
      </div>
      <div className="min-w-0">
        <p className="text-[15px] text-[#6b7280] sm:text-base">{label}</p>
        <p className="mt-0.5 text-2xl font-bold leading-none text-[#222222] sm:text-[1.75rem]">
          {value}
        </p>
      </div>
    </div>
  )
}

function TimelineItem({
  letter,
  period,
  title,
  subtitle,
  description,
  isLast,
}: {
  letter: string
  period: string
  title: string
  subtitle?: string
  description: string
  isLast?: boolean
}) {
  return (
    <div className="relative flex gap-5 pb-9 last:pb-0 sm:gap-6 sm:pb-11">
      {!isLast ? (
        <span
          aria-hidden
          className="absolute bottom-0 left-[15px] top-9 border-l border-dashed border-[#5BBB7B]/70"
        />
      ) : null}
      <div className="relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E8F6EF] text-sm font-semibold text-[#5BBB7B]">
        {letter}
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full bg-[#FFEDE8] px-3 py-1 text-xs font-medium text-[#C35A4A]">
          {period}
        </span>
        <h3 className="mt-3 text-lg font-bold text-[#222222] sm:text-xl">{title}</h3>
        {subtitle ? (
          <p className="mt-1.5 text-base font-medium text-[#5BBB7B]">{subtitle}</p>
        ) : null}
        <p className="mt-2.5 max-w-2xl text-[15px] leading-7 text-[#6b7280]">{description}</p>
      </div>
    </div>
  )
}

function SidebarRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}) {
  return (
    <li className="flex items-center gap-3 border-b border-[#eee] py-3.5 last:border-b-0">
      <Icon className="h-[18px] w-[18px] shrink-0 text-[#9ca3af]" strokeWidth={1.6} />
      <span className="text-[15px] text-[#6b7280]">{label}</span>
      {href ? (
        <a
          href={href}
          className="ml-auto truncate text-right text-[15px] font-medium text-[#222222] hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="ml-auto text-right text-[15px] font-medium text-[#222222]">{value}</span>
      )}
    </li>
  )
}

export function ProviderProfilePage() {
  const { id = '' } = useParams()
  const provider = getProviderById(id)
  const [saved, setSaved] = useState(false)
  const pagePad = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

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

  const services = getServicesByProvider(provider.id)
  const relatedProviders = PROVIDERS.filter((item) => item.id !== provider.id).slice(0, 4)
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
    <div className="bg-[#fafafa] pb-16">
      {/* Peach hero */}
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

        <Section className="relative pb-0 pt-6 sm:pb-0 sm:pt-8" containerClassName={pagePad}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[#6b7280]">
              <Link to={PATHS.referrals} className="hover:text-[#222]">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={PATHS.results} className="hover:text-[#222]">
                Freelancers
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#222]">{provider.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#222] transition hover:bg-white/60"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#222] transition hover:bg-white/60"
              >
                <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
                Save
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#d4a017] transition hover:bg-white/60"
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
                  className="absolute -left-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full text-white shadow"
                  style={{ backgroundColor: FREEIO_GREEN }}
                >
                  <BadgeCheck className="h-4 w-4" strokeWidth={2.5} />
                </span>
              ) : null}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#222] sm:text-[2.15rem]">
                {provider.name}
              </h1>
              <p className="mt-1 text-base text-[#6b7280] sm:text-lg">{provider.title}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#4b5563]">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-[#f5b100] text-[#f5b100]" />
                  <span className="font-medium text-[#222]">
                    {formatRating(provider.rating)}
                  </span>
                  <span className="text-[#6b7280]">
                    ({provider.reviewCount} Reviews)
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
                  {provider.city}
                </span>
                {provider.joinedDate ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" style={{ color: FREEIO_GREEN }} />
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
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-y border-[#eee] bg-white py-8 sm:py-10">
              <StatCard
                icon={Goal}
                label="Project Success"
                value={provider.projectSuccess ?? provider.dealsClosed}
              />
              <StatCard
                icon={ChartColumnIncreasing}
                label="Total Service"
                value={provider.totalServices ?? services.length}
              />
              <StatCard
                icon={Goal}
                label="Completed Service"
                value={provider.completedServices ?? provider.dealsClosed}
              />
              <StatCard
                icon={FileClock}
                label="In Queue service"
                value={provider.inQueueServices ?? 0}
              />
            </div>

            <section>
              <h2 className="text-2xl font-bold text-[#222]">About Freelancer</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#6b7280]">
                <p>{provider.about}</p>
                <p>
                  Specialty: {provider.specialty}. Languages: {provider.languages.join(', ')}.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#222]">Education</h2>
              <div className="mt-7">
                {education.map((item, index) => (
                  <TimelineItem
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
              <h2 className="text-2xl font-bold text-[#222]">Work & Experience</h2>
              <div className="mt-7">
                {experience.map((item, index) => (
                  <TimelineItem
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
              <h2 className="text-2xl font-bold text-[#222]">Awards</h2>
              <div className="mt-7">
                {awards.map((item, index) => (
                  <TimelineItem
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

            <section className="border-t border-[#eee] pt-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-[#222]">Services</h2>
                <Link
                  to={providerServicesPath(provider.id)}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  style={{ color: FREEIO_GREEN }}
                >
                  Browse Full List
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              {services.length === 0 ? (
                <p className="text-[#6b7280]">No services listed yet.</p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {services.slice(0, 3).map((service) => (
                    <ServiceCard key={service.id} service={service} variant="marketplace" />
                  ))}
                </div>
              )}
            </section>

            <section className="border-t border-[#eee] pt-10">
              <h2 className="mb-5 text-2xl font-bold text-[#222]">
                {provider.reviewCount} Reviews
              </h2>
              <ReviewsList
                reviews={REVIEWS}
                averageRating={provider.rating}
                reviewCount={provider.reviewCount}
              />
            </section>
          </div>

          <aside className="space-y-5 lg:-mt-40 lg:sticky lg:top-24 lg:self-start">
            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-95"
                style={{ backgroundColor: FREEIO_GREEN }}
              >
                Download CV
              </button>
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-95"
                style={{ backgroundColor: FREEIO_GREEN }}
              >
                Message
              </button>
            </div>

            <div className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              {provider.hourlyRateMin && provider.hourlyRateMax ? (
                <p className="text-[1.75rem] font-bold leading-tight text-[#222]">
                  ${provider.hourlyRateMin} - ${provider.hourlyRateMax}
                  <span className="text-base font-medium text-[#6b7280]"> / hr</span>
                </p>
              ) : null}

              <ul className="mt-3">
                <SidebarRow
                  icon={MapPin}
                  label="Location"
                  value={provider.city}
                />
                <SidebarRow icon={FileText} label="Type" value={typeLabel} />
                {provider.englishLevel ? (
                  <SidebarRow
                    icon={Globe}
                    label="English Level"
                    value={provider.englishLevel}
                  />
                ) : null}
                {provider.gender ? (
                  <SidebarRow icon={UserRound} label="Gender" value={provider.gender} />
                ) : null}
                {provider.email ? (
                  <SidebarRow
                    icon={Mail}
                    label="Email"
                    value={provider.email}
                    href={`mailto:${provider.email}`}
                  />
                ) : null}
                {provider.phone ? (
                  <SidebarRow icon={Phone} label="Phone Number" value={provider.phone} />
                ) : null}
              </ul>
            </div>

            {provider.skills?.length ? (
              <div className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <h3 className="text-lg font-bold text-[#222]">My Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {provider.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md px-3.5 py-2 text-sm font-medium text-[#222]"
                      style={{ backgroundColor: FREEIO_TAG }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 bg-white text-base font-semibold transition hover:bg-[#f3fbf6]"
              style={{ borderColor: FREEIO_GREEN, color: FREEIO_GREEN }}
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </aside>
        </div>

        {relatedProviders.length ? (
          <section className="mt-16 border-t border-[#eee] pt-12">
            <h2 className="text-2xl font-bold text-[#222]">Related Freelancers</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProviders.map((item) => (
                <ProviderCard key={item.id} provider={item} variant="marketplace" />
              ))}
            </div>
          </section>
        ) : null}
      </Section>
    </div>
  )
}
