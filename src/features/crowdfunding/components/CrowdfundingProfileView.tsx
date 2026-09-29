import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  ChevronRight,
  Heart,
  HeartHandshake,
  Landmark,
  MapPin,
  Share2,
  Vote,
  Eye,
  ListChecks,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  crowdfundingProfileFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import {
  crowdfundingPledgeLabel,
  crowdfundingVerticalLabel,
  getCrowdfundingProfileVenues,
  type CrowdfundingProfile,
  type CrowdfundingPledgeStatus,
} from '@/features/crowdfunding/data/crowdfundingProfiles'
import { cn } from '@/shared/lib/cn'

const PAGE_PAD = 'max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6'

function statusTone(status: CrowdfundingPledgeStatus) {
  if (status === 'pledged') return 'bg-brand/10 text-brand'
  if (status === 'watching') return 'bg-mist text-ink'
  return 'bg-amber-50 text-amber-800'
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Vote
  label: string
  value: string | number
}) {
  return (
    <div className="flex min-w-[9rem] flex-1 items-center gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-ink">{value}</p>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      </div>
    </div>
  )
}

export function CrowdfundingProfileView({ profile }: { profile: CrowdfundingProfile }) {
  const draft = useMemo(() => crowdfundingProfileFavoriteDraft(profile), [profile])
  const favorite = useFavoriteToggle(draft)
  const venues = useMemo(() => getCrowdfundingProfileVenues(profile), [profile])

  return (
    <div className="bg-paper pb-16">
      <div className="relative overflow-hidden border-b border-line bg-white">
        <div className="relative h-44 w-full sm:h-56 lg:h-64">
          <img src={profile.cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent" />
        </div>

        <Section className="relative py-0 sm:py-0" containerClassName={PAGE_PAD}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 pt-5">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <Link to={PATHS.home} className="hover:text-ink">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={PATHS.crowdfunding} className="hover:text-ink">
                Crowdfund
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-ink">{profile.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-mist"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                onClick={favorite.toggleSave}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-mist"
                aria-pressed={favorite.saved}
              >
                <Heart
                  className={cn('h-4 w-4', favorite.saved && 'fill-rose-500 text-rose-500')}
                  strokeWidth={2.2}
                />
                {favorite.saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-8 sm:flex-row sm:items-end sm:gap-6">
            <div className="relative -mt-16 h-[7.5rem] w-[7.5rem] shrink-0 sm:-mt-20 sm:h-36 sm:w-36">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full rounded-full object-cover ring-4 ring-white shadow-sm"
              />
              {profile.verified ? (
                <span className="absolute -left-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white shadow">
                  <BadgeCheck className="h-4 w-4" strokeWidth={2.5} />
                </span>
              ) : null}
            </div>

            <div className="min-w-0 flex-1 pb-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                Crowdfund profile
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.15rem]">
                {profile.name}
              </h1>
              <p className="mt-1 text-base text-muted">
                {profile.role} · {profile.company}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand" />
                  {profile.city} · {profile.region}
                </span>
                <span>{profile.handle}</span>
                <span>Joined {profile.joined}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pb-1">
              <Link to={PATHS.crowdfunding}>
                <Button size="md">Vote on venues</Button>
              </Link>
              <Link to={PATHS.lcreCrowdfunding}>
                <Button size="md" variant="secondary">
                  View LCRE
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>

      <Section className="py-8 sm:py-10" containerClassName={PAGE_PAD}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="min-w-0 space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 rounded-2xl border border-line bg-white px-5 py-6 shadow-sm sm:px-7">
              <StatCard icon={Vote} label="Votes cast" value={profile.votesCast} />
              <StatCard
                icon={HeartHandshake}
                label="Pledges signaled"
                value={profile.pledgesSignaled}
              />
              <StatCard icon={Eye} label="Venues watching" value={profile.venuesWatching} />
              <StatCard
                icon={ListChecks}
                label="Interest list"
                value={profile.interestListJoined ? 'Joined' : 'Open'}
              />
            </div>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">About this backer</h2>
              <div className="mt-4 space-y-3 text-[15px] leading-7 text-muted">
                <p className="text-ink">{profile.bio}</p>
                <p>{profile.thesis}</p>
                <p>Languages: {profile.languages.join(', ')}.</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Preferred recreation focus
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.preferredGeographies.map((geo) => (
                  <span
                    key={geo}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    {geo}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.preferredVerticals.map((vertical) => (
                  <span
                    key={vertical}
                    className="rounded-full bg-brand/10 px-3 py-1.5 text-sm font-semibold text-brand"
                  >
                    {crowdfundingVerticalLabel(vertical)}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">Venues they back</h2>
                  <p className="mt-1 text-sm text-muted">
                    Votes, pledges, and watchlist items tied to community recreation builds.
                  </p>
                </div>
                <Link
                  to={PATHS.crowdfunding}
                  className="shrink-0 text-sm font-semibold text-brand hover:underline"
                >
                  Explore all
                </Link>
              </div>

              {venues.length === 0 ? (
                <p className="text-sm text-muted">No venues linked yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {venues.map(({ venue, status, note }) => (
                    <article
                      key={venue.id}
                      className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
                    >
                      <img
                        src={venue.image}
                        alt=""
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <div className="space-y-2 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-ink">{venue.title}</h3>
                            <p className="text-xs text-muted">{venue.role}</p>
                          </div>
                          <span
                            className={cn(
                              'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
                              statusTone(status),
                            )}
                          >
                            {crowdfundingPledgeLabel(status)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted">{note ?? venue.text}</p>
                        <p className="text-xs font-medium text-ink">
                          Raise {venue.raise} · Target ROI {venue.roi}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Pledge activity</h2>
              <ol className="mt-5 space-y-4">
                {profile.activity.map((item, index) => (
                  <li key={item.id} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'mt-1 h-3 w-3 rounded-full ring-4 ring-paper',
                          item.status === 'pledged' ? 'bg-brand' : 'bg-line',
                        )}
                      />
                      {index < profile.activity.length - 1 ? (
                        <span className="mt-1 w-px flex-1 bg-line" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1 rounded-xl border border-line bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold text-ink">{item.label}</h3>
                        <time className="text-xs text-muted">{item.date}</time>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <p className="rounded-xl border border-dashed border-line bg-mist/50 px-4 py-3 text-xs leading-relaxed text-muted">
              Not an offer to sell securities. Crowdfund profile activity reflects interest-list
              signals, venue votes, and community demand until offerings are qualified.
            </p>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-ink">Participation</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted">Interest list</dt>
                  <dd className="font-semibold text-ink">
                    {profile.interestListJoined ? 'Active' : 'Not joined'}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted">Board interest</dt>
                  <dd className="font-semibold text-ink">
                    {profile.boardInterest ? 'Expressed' : 'None'}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted">Votes</dt>
                  <dd className="font-semibold text-ink">{profile.votesCast}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-muted">Pledges</dt>
                  <dd className="font-semibold text-ink">{profile.pledgesSignaled}</dd>
                </div>
              </dl>

              <div className="mt-5 space-y-2">
                <Link to={PATHS.crowdfunding} className="block">
                  <Button className="w-full" size="md">
                    Cast a vote
                  </Button>
                </Link>
                <Link to={PATHS.lcreCrowdfunding} className="block">
                  <Button className="w-full" size="md" variant="secondary">
                    Read LCRE path
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-semibold text-ink">Reg A+ readiness</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {profile.firstName} is on the interest list for faith-aligned recreation offerings.
                Participation depends on regulatory approval and offering documents.
              </p>
            </div>

            {profile.boardInterest ? (
              <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-brand" />
                  <h2 className="text-lg font-semibold text-ink">Board invite</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Interested in helping shape venue direction with the Board of Directors —
                  acknowledgements completed on the LCRE path.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      <FavoriteActionDialogs favorite={favorite} />
    </div>
  )
}
