import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PATHS, networkArticlePath, networkProfilePath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import {
  FacebookIcon,
  LinkedInIcon,
  XTwitterIcon,
} from '@/features/network/components/community/SocialPlatformIcons'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_ARTICLES, getArticle } from '@/features/network/data/community'
import { getMember } from '@/features/network/data/members'
import type { NetworkArticle } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

const BLOG_CATEGORIES = [
  { label: 'Residential', match: ['Residential', 'Inspections', 'Design', 'Value-add'] },
  { label: 'Commercial', match: ['Multifamily', 'Markets', 'Ops'] },
  { label: 'Capital & lending', match: ['Capital', 'Remote'] },
  { label: 'Networking', match: ['Network', 'Intros', 'Partnerships', 'Trust'] },
  { label: 'Marketing', match: ['Marketing'] },
  { label: 'Education', match: ['Education', 'Career', 'Tech', 'Data'] },
] as const

const DEFAULT_TAKEAWAYS = [
  'Read a deal-focused profile before you ask for an intro.',
  'Put your buy box on the cover so partners can filter you.',
  'Verify documents before anyone wires capital.',
  'Graduate warm threads into referrals without leaving RE Networking.',
  'Keep roles clear — who brings capital, ops, and tenants.',
  'Update your rate sheet and calendar every quarter.',
]

const DEFAULT_REQUIREMENTS = [
  'A clear buy box or service area for the Central Valley.',
  'No prior RE Networking experience required.',
  'Willingness to share honest deal notes with verified members.',
]

function categoryFor(article: NetworkArticle) {
  for (const category of BLOG_CATEGORIES) {
    if (article.tags.some((tag) => category.match.some((key) => key.toLowerCase() === tag.toLowerCase()))) {
      return category.label
    }
  }
  return article.tags[0] ?? 'Networking'
}

export function NetworkArticlesPage() {
  const [category, setCategory] = useState<(typeof BLOG_CATEGORIES)[number]['label'] | null>(null)

  const articles = useMemo(() => {
    if (!category) return NETWORK_ARTICLES
    const selected = BLOG_CATEGORIES.find((item) => item.label === category)
    if (!selected) return NETWORK_ARTICLES
    return NETWORK_ARTICLES.filter((article) =>
      article.tags.some((tag) => selected.match.some((key) => key.toLowerCase() === tag.toLowerCase())),
    )
  }, [category])

  const visible = articles.length > 0 ? articles : NETWORK_ARTICLES

  return (
    <NetworkPageFrame hideRight>
      <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04] sm:px-8 sm:py-8">
        <header>
          <h1 className="font-display text-[2.5rem] font-semibold leading-none tracking-tight text-ink sm:text-[2.75rem]">
            Articles (Blogs)
          </h1>
        </header>

        <div className="mt-8 border-b border-[#E9EEF2]">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pb-4">
            {BLOG_CATEGORIES.map((item) => {
              const active = category === item.label
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setCategory((current) => (current === item.label ? null : item.label))}
                    className={cn(
                      'text-[15px] transition',
                      active ? 'font-semibold text-brand' : 'font-medium text-[#6B7280] hover:text-ink',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((article) => (
            <Link key={article.id} to={networkArticlePath(article.id)} className="group block min-w-0">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={article.cover}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-sm text-[#9CA3AF]">{article.published}</p>
              <h2 className="mt-2 text-lg font-bold leading-snug text-ink transition group-hover:text-brand">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </NetworkPageFrame>
  )
}

export function NetworkArticleDetailPage() {
  const { articleId } = useParams()
  const article = getArticle(articleId ?? '')
  const author = article ? getMember(article.authorId) : undefined
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saveInfo, setSaveInfo] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  if (!article || !author) return <Navigate to={PATHS.networkArticles} replace />

  const index = NETWORK_ARTICLES.findIndex((item) => item.id === article.id)
  const previous = index > 0 ? NETWORK_ARTICLES[index - 1] : undefined
  const next = index >= 0 && index < NETWORK_ARTICLES.length - 1 ? NETWORK_ARTICLES[index + 1] : undefined
  const category = categoryFor(article)
  const takeaways = article.takeaways?.length ? article.takeaways : DEFAULT_TAKEAWAYS
  const requirements = article.requirements?.length ? article.requirements : DEFAULT_REQUIREMENTS
  const related = NETWORK_ARTICLES.filter(
    (item) => item.id !== article.id && item.tags.some((tag) => article.tags.includes(tag)),
  ).slice(0, 3)
  const relatedFallback =
    related.length > 0
      ? related
      : NETWORK_ARTICLES.filter((item) => item.id !== article.id).slice(0, 3)

  function onComment(event: FormEvent) {
    event.preventDefault()
    if (!comment.trim() || !name.trim() || !email.trim()) return
    setSubmitted(true)
    setComment('')
    if (!saveInfo) {
      setName('')
      setEmail('')
    }
    window.setTimeout(() => setSubmitted(false), 2200)
  }

  const mid = Math.ceil(takeaways.length / 2)
  const takeawayCols = [takeaways.slice(0, mid), takeaways.slice(mid)]

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-6">
        <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04]">
          <img src={article.cover} alt="" className="h-64 w-full object-cover sm:h-[22rem]" />
          <div className="px-5 py-7 sm:px-10 sm:py-9">
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              {article.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <Link
                to={networkProfilePath(author.id)}
                className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand"
              >
                <MemberAvatar name={author.name} src={author.avatar} size="sm" />
                {author.name}
              </Link>
              <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-semibold text-ink">{category}</span>
              <span>{article.published}</span>
              <span>{article.readTime} read</span>
            </div>

            <h2 className="mt-8 text-xl font-bold text-ink">{article.excerpt}</h2>

            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-[#4B5563]">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-8 border-l-4 border-brand bg-mist/70 px-5 py-4 text-[15px] leading-relaxed text-ink">
              <p>“{article.body[0]}”</p>
              <footer className="mt-3 text-sm font-semibold text-muted">— {author.name}</footer>
            </blockquote>

            <h3 className="mt-10 text-xl font-bold text-ink">What you’ll learn</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {takeawayCols.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-2.5">
                  {column.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#4B5563]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-bold text-ink">Requirements</h3>
            <ul className="mt-4 space-y-2.5">
              {requirements.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#4B5563]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-[#E9EEF2] py-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-ink">Share post</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: 'Facebook', Icon: FacebookIcon },
                  { label: 'X', Icon: XTwitterIcon },
                  { label: 'LinkedIn', Icon: LinkedInIcon },
                ].map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`Share on ${label}`}
                    className="grid size-10 place-items-center rounded-full bg-mist text-ink transition hover:bg-brand hover:text-white"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4 rounded-2xl bg-mist/80 p-5">
              <MemberAvatar name={author.name} src={author.avatar} size="lg" memberId={author.id} />
              <div className="min-w-0">
                <Link
                  to={networkProfilePath(author.id)}
                  className="text-lg font-bold text-ink hover:text-brand"
                >
                  {author.name}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {author.title} · {author.company}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">{author.bio}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 border-t border-[#E9EEF2] pt-6 sm:grid-cols-2">
              {previous ? (
                <Link
                  to={networkArticlePath(previous.id)}
                  className="rounded-2xl border border-line px-4 py-4 transition hover:border-brand hover:bg-mist/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Previous post</p>
                  <p className="mt-1 font-semibold text-ink">{previous.title}</p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={networkArticlePath(next.id)}
                  className="rounded-2xl border border-line px-4 py-4 text-right transition hover:border-brand hover:bg-mist/50 sm:justify-self-end"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Next post</p>
                  <p className="mt-1 font-semibold text-ink">{next.title}</p>
                </Link>
              ) : null}
            </div>

            <section className="mt-10 border-t border-[#E9EEF2] pt-8">
              <h3 className="text-2xl font-bold text-ink">Leave a comment</h3>
              <form onSubmit={onComment} className="mt-5 space-y-4">
                <label className="block text-sm font-semibold text-ink">
                  Comment
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    rows={5}
                    required
                    className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2.5 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-ink">
                    Name
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="mt-1.5 h-11 w-full rounded-xl border border-line bg-paper px-3 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-ink">
                    Email
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="mt-1.5 h-11 w-full rounded-xl border border-line bg-paper px-3 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </label>
                </div>
                <label className="flex items-start gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(event) => setSaveInfo(event.target.checked)}
                    className="mt-1"
                  />
                  Save my name and email in this browser for the next time I comment.
                </label>
                <Button type="submit" className="rounded-lg">
                  {submitted ? 'Comment posted' : 'Post comment'}
                </Button>
              </form>
            </section>
          </div>
        </article>

        <section className="rounded-[28px] bg-white px-5 py-7 shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04] sm:px-8">
          <h3 className="text-2xl font-bold text-ink">Related posts</h3>
          <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {relatedFallback.map((item) => (
              <Link key={item.id} to={networkArticlePath(item.id)} className="group block min-w-0">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.cover}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-sm text-[#9CA3AF]">{item.published}</p>
                <h4 className="mt-1.5 text-base font-bold leading-snug text-ink transition group-hover:text-brand">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-sm text-[#6B7280]">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </NetworkPageFrame>
  )
}
