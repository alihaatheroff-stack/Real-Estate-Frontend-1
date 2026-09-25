import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  NetworkVerticalFilterRail,
  NetworkVerticalFilterStack,
} from '@/features/network/components/filters/NetworkVerticalFilterRail'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import {
  BLOG_CATEGORIES,
  type BlogCategoryLabel,
} from '@/features/network/data/articleCategories'
import { NETWORK_ARTICLES } from '@/features/network/data/community'
import {
  DEFAULT_FORUM_FILTERS,
  type ForumFiltersState,
} from '@/features/network/data/forumFilters'
import { useContentRoutes } from '@/features/network/model/contentRoutes'
import { cn } from '@/shared/lib/cn'

function ArticlesGrid({ category }: { category: BlogCategoryLabel | null }) {
  const { articlePath } = useContentRoutes()
  const articles = useMemo(() => {
    if (!category) return NETWORK_ARTICLES
    const selected = BLOG_CATEGORIES.find((item) => item.label === category)
    if (!selected) return NETWORK_ARTICLES
    return NETWORK_ARTICLES.filter((article) =>
      article.tags.some((tag) =>
        selected.match.some((key) => key.toLowerCase() === tag.toLowerCase()),
      ),
    )
  }, [category])

  const visible = articles.length > 0 ? articles : NETWORK_ARTICLES

  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
      {visible.map((article) => (
        <Link
          key={article.id}
          to={articlePath(article.id)}
          className="group block min-w-0"
        >
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
  )
}

function ArticlesCategoryTabs({
  category,
  onChange,
}: {
  category: BlogCategoryLabel | null
  onChange: (next: BlogCategoryLabel | null) => void
}) {
  return (
    <div className="border-b border-line/60">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 px-4 pb-4 sm:px-5">
        {BLOG_CATEGORIES.map((item) => {
          const active = category === item.label
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() =>
                  onChange(category === item.label ? null : item.label)
                }
                className={cn(
                  'text-[15px] transition',
                  active
                    ? 'font-semibold text-brand'
                    : 'font-medium text-[#6B7280] hover:text-ink',
                )}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Articles listing with the same vertical filter rail as Forums. */
export function ArticlesBrowseView() {
  const { articlesTitle } = useContentRoutes()
  const [filters, setFilters] = useState<ForumFiltersState>(DEFAULT_FORUM_FILTERS)
  const [category, setCategory] = useState<BlogCategoryLabel | null>(null)

  return (
    <NetworkPageFrame hideRight fill>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(15,31,26,0.04)] xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
        <div className="grid items-stretch xl:h-full xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(230px,21rem)_minmax(0,1fr)] xl:grid-rows-[minmax(0,1fr)]">
          <NetworkVerticalFilterRail filters={filters} onChange={setFilters} />

          <div className="flex min-w-0 flex-col xl:h-full xl:min-h-0 xl:overflow-hidden">
            <header className="shrink-0 px-4 pb-2 pt-4 sm:px-5 sm:pb-2.5">
              <h1 className="font-display text-3xl font-semibold">
                {articlesTitle}
              </h1>
            </header>

            <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
              <NetworkVerticalFilterStack filters={filters} onChange={setFilters} />

              <ArticlesCategoryTabs category={category} onChange={setCategory} />

              <div className="px-4 py-6 sm:px-5 sm:py-8">
                <ArticlesGrid category={category} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NetworkPageFrame>
  )
}
