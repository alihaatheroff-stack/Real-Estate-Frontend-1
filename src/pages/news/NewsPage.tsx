import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PATHS, networkProfilePath } from '@/app/router/paths'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { NEWS_TABS, type NewsTabId } from '@/features/landing/data/loggedInLanding'
import { NETWORK_MEMBERS } from '@/features/network/data/members'
import { cn } from '@/shared/lib/cn'

const NEW_MEMBERS = NETWORK_MEMBERS.slice(0, 4)

/** One photograph per dispatch, matched to what the update is about. */
const STORY_MEDIA: Record<string, { image: string; alt: string }> = {
  'features-0': {
    image: '/images/hire/gps.jpg',
    alt: 'Map view used to track a provider on the way',
  },
  'features-1': {
    image: '/images/hire/education.jpg',
    alt: 'Newer professional studying a project',
  },
  'features-2': {
    image: '/images/hire/verified-pro.jpg',
    alt: 'Experienced trades professional on a job site',
  },
  'features-3': {
    image: '/images/stock/photo-1454165804606-c3d57bc86b40.jpg',
    alt: 'People comparing options across a work table',
  },
  'referrals-0': {
    image: '/images/stock/photo-1560518883-ce09059eeffa.jpg',
    alt: 'House keys after a deal closed this month',
  },
  'referrals-1': {
    image: '/images/stock/photo-1600596542815-ffad4c1539a9.jpg',
    alt: 'Home that closed this week',
  },
  'referrals-2': {
    image: '/images/stock/photo-1564013799919-ab600027ffc6.jpg',
    alt: 'Property that closed today',
  },
  'crowdfunding-0': {
    image: '/images/crowdfunding/27-amuse-parks.jpg',
    alt: 'Amusement park used to track recreational project interest',
  },
  'crowdfunding-1': {
    image: '/images/stock/photo-1450101499163-c8848c66ca85.jpg',
    alt: 'Notes used to review investment highs and lows',
  },
  'crowdfunding-2': {
    image: '/images/crowdfunding/01-3169093_web1_IMG_5825.jpg',
    alt: 'Crowdfunding project followed before it goes live',
  },
  'networking-0': {
    image: '/images/stock/photo-1521791055366-0d553872125f.jpg',
    alt: 'Members in a deal-focused conversation',
  },
  'networking-1': {
    image: '/images/landing/5.png',
    alt: 'New members meeting to introduce their specialty',
  },
  'networking-2': {
    image: '/images/landing/2.png',
    alt: 'Local members whose topics turn into referrals',
  },
  'shop-0': {
    image: '/images/hire/measure-tools.jpg',
    alt: 'Measuring tools and templates for property work',
  },
  'shop-1': {
    image: '/images/hire/site.jpg',
    alt: 'Active project used for a featured placement',
  },
  'shop-2': {
    image: '/images/hire/payment-packets.jpg',
    alt: 'Packets standing in for orders and tracking',
  },
}

type Story = {
  id: string
  tabId: NewsTabId
  category: string
  text: string
  children?: string[]
  href?: string
  image: string
  alt: string
  stamp: { time: string; day: string }
}

function formatStamp(date: Date) {
  const time = date
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
    .toUpperCase()
  const day = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
  return { time, day }
}

function categoryLabel(tabId: NewsTabId) {
  const tab = NEWS_TABS.find((item) => item.id === tabId)
  if (!tab || tab.id === 'features') return 'Platform'
  return tab.heading.replace(/:$/, '')
}

function buildStories(now: Date): Story[] {
  return NEWS_TABS.flatMap((tab, tabIndex) =>
    tab.bullets.map((bullet, index) => {
      const date = new Date(now)
      date.setMinutes(date.getMinutes() - (tabIndex * 17 + index * 4))
      const id = `${tab.id}-${index}`
      const media = STORY_MEDIA[id]
      return {
        id,
        tabId: tab.id,
        category: categoryLabel(tab.id),
        text: bullet.text,
        children: bullet.children,
        href: tab.href && tab.href !== PATHS.news ? tab.href : undefined,
        image: media?.image ?? '/images/hire/site.jpg',
        alt: media?.alt ?? '',
        stamp: formatStamp(date),
      }
    }),
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export function NewsPage() {
  const now = useClock()
  const clock = formatStamp(now)
  const edition = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const [activeId, setActiveId] = useState<NewsTabId>('features')
  const [tickerPaused, setTickerPaused] = useState(false)
  const [photosPaused, setPhotosPaused] = useState(false)
  const stories = useMemo(() => buildStories(new Date()), [])
  const visible = stories.filter((story) =>
    activeId === 'features' ? true : story.tabId === activeId,
  )
  const lead = visible[0]
  const rest = visible.slice(1)
  const photoStories = visible.filter((story) => story.image)
  const photoLoop = [...photoStories, ...photoStories]

  return (
    <div className="bg-paper text-ink">
      <div className="border-b border-ink">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-accent">
                The desk
              </p>
              <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
                News & Updates
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-display text-2xl font-semibold tabular-nums tracking-tight underline decoration-ink/30 underline-offset-4 sm:text-3xl">
                {clock.time}
              </p>
              <p className="mt-1 text-sm font-semibold text-muted">{edition}</p>
            </div>
          </div>

          <div className="h-0.5 w-24 bg-accent" />

          <div className="flex flex-col items-center gap-3">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-muted">
              Filter by module
            </p>
            <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-line bg-white px-2 py-2 shadow-[0_10px_30px_rgba(11,31,58,0.08)]">
              {NEWS_TABS.map((tab) => {
                const active = tab.id === activeId
                const label = tab.label.replace(/:$/, '').replace(/^\d+\.\s*/, '')
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveId(tab.id)}
                    className={cn(
                      'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition',
                      active
                        ? 'bg-freeio-navy text-white shadow-[0_6px_16px_rgba(11,31,58,0.25)]'
                        : 'text-ink hover:bg-accent hover:text-ink',
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="news-marquee overflow-hidden border-b border-white/10 bg-freeio-navy text-white"
        data-paused={tickerPaused ? 'true' : 'false'}
        onMouseEnter={() => setTickerPaused(true)}
        onMouseLeave={() => setTickerPaused(false)}
      >
        <div className="flex items-stretch">
          <p className="shrink-0 bg-accent px-3 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink">
            Live
          </p>
          <div className="min-w-0 flex-1 overflow-hidden py-2.5">
            <div className="news-ticker__track flex w-max items-center">
              {[0, 1].map((copy) => (
                <p
                  key={copy}
                  className="flex items-center px-4 text-sm font-medium"
                  aria-hidden={copy === 1 || undefined}
                >
                  {stories.map((story) => (
                    <span key={`${copy}-${story.id}`} className="inline-flex items-center">
                      <span className="text-accent">{story.category}</span>
                      <span className="mx-2 text-white/35">/</span>
                      <span className="whitespace-nowrap">{story.text}</span>
                      <span className="mx-4 text-accent" aria-hidden>
                        ◆
                      </span>
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:px-8 lg:py-12">
        <div className="min-w-0">
          {lead ? <LeadStory story={lead} /> : null}

          {rest.length ? (
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {rest.map((story, index) => (
                <li key={story.id}>
                  <ScrollReveal delay={Math.min(index, 6) * 50}>
                    <WireItem story={story} />
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          ) : null}
        </div>

        <aside className="space-y-8 lg:pt-1">
          <ScrollReveal>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
              New members
            </p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {NEW_MEMBERS.map((member) => (
                <li key={member.id}>
                  <Link
                    to={networkProfilePath(member.id)}
                    className="group flex items-center gap-3 py-3"
                  >
                    <img
                      src={member.avatar}
                      alt=""
                      className="h-11 w-11 shrink-0 object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">
                        {member.name}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {member.title} · {member.city}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
              Open a section
            </p>
            <ul className="mt-3 space-y-1">
              {NEWS_TABS.filter((tab) => tab.href && tab.href !== PATHS.news).map((tab) => (
                <li key={tab.id}>
                  <Link
                    to={tab.href!}
                    className="group flex items-center justify-between gap-3 border-b border-line py-2.5 text-sm font-semibold text-ink"
                  >
                    <span>{tab.heading.replace(/:$/, '')}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </aside>
      </div>

      <section
        className="news-marquee overflow-hidden border-t border-line bg-freeio-navy py-8 sm:py-10"
        data-paused={photosPaused ? 'true' : 'false'}
        onMouseEnter={() => setPhotosPaused(true)}
        onMouseLeave={() => setPhotosPaused(false)}
        aria-label="Updates in pictures"
      >
        <div className="mb-5 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent">
              In pictures
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              The desk, frame by frame
            </h2>
          </div>
        </div>
        <div className="news-marquee__track flex w-max gap-4 px-4 sm:px-6 lg:px-8">
          {(photosPaused ? photoStories : photoLoop).map((story, index) => {
            const clone = index >= photoStories.length
            return (
              <figure
                key={`${story.id}-${index}`}
                aria-hidden={clone || undefined}
                className="group relative h-64 w-72 shrink-0 overflow-hidden sm:h-72 sm:w-80"
              >
                <img
                  src={story.image}
                  alt={clone ? '' : story.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-freeio-navy via-freeio-navy/25 to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition duration-500 group-hover:scale-x-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent">
                    {story.category}
                  </p>
                  <p className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-snug text-white">
                    {story.text}
                  </p>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function LeadStory({ story }: { story: Story }) {
  return (
    <ScrollReveal>
      <article>
        <div className="relative aspect-[16/9] overflow-hidden bg-freeio-navy">
          <img
            src={story.image}
            alt={story.alt}
            className="news-lead-photo absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {story.category}
          </p>
          <p className="text-sm font-semibold tabular-nums underline decoration-ink/30 underline-offset-4">
            {story.stamp.time}
          </p>
          <p className="text-sm font-semibold underline decoration-ink/30 underline-offset-4">
            {story.stamp.day}
          </p>
        </div>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {story.text}
        </h2>
        {story.children?.length ? (
          <ul className="mt-4 max-w-2xl space-y-2 border-l-2 border-accent pl-4">
            {story.children.map((child) => (
              <li key={child} className="text-base leading-relaxed text-muted">
                {child}
              </li>
            ))}
          </ul>
        ) : null}
        {story.href ? (
          <Link
            to={story.href}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-ink underline underline-offset-4 transition hover:text-brand"
          >
            Read more
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </article>
    </ScrollReveal>
  )
}

function WireItem({ story }: { story: Story }) {
  const body = (
    <div className="flex gap-4 py-4">
      <img
        src={story.image}
        alt={story.alt}
        className="h-20 w-24 shrink-0 object-cover sm:h-24 sm:w-32"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent">
            {story.category}
          </p>
          <p className="text-xs font-semibold tabular-nums text-muted">{story.stamp.time}</p>
          <p className="text-xs font-semibold text-muted">{story.stamp.day}</p>
        </div>
        <p className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight text-ink transition group-hover:text-brand">
          {story.text}
        </p>
        {story.children?.length ? (
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">
            {story.children.join(' ')}
          </p>
        ) : null}
      </div>
    </div>
  )

  if (!story.href) return <div className="group">{body}</div>

  return (
    <Link to={story.href} className="group block">
      {body}
    </Link>
  )
}
