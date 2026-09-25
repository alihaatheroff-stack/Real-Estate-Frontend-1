import { createContext, useContext, type ReactNode } from 'react'
import {
  crowdfundingArticlePath,
  crowdfundingForumPath,
  networkArticlePath,
  networkForumPath,
  PATHS,
  referralsArticlePath,
  referralsForumPath,
} from '@/app/router/paths'

export type ContentRoutes = {
  articlesList: string
  articlePath: (articleId: string) => string
  forumsList: string
  forumPath: (forumId: string) => string
  forumsTitle: string
  articlesTitle: string
}

export const NETWORK_CONTENT_ROUTES: ContentRoutes = {
  articlesList: PATHS.networkArticles,
  articlePath: networkArticlePath,
  forumsList: PATHS.networkForums,
  forumPath: networkForumPath,
  forumsTitle: 'Forums: Commercial Real Estate Agents',
  articlesTitle: 'Articles: Commercial Real Estate Agents',
}

export const REFERRALS_CONTENT_ROUTES: ContentRoutes = {
  articlesList: PATHS.referralsArticles,
  articlePath: referralsArticlePath,
  forumsList: PATHS.referralsForums,
  forumPath: referralsForumPath,
  forumsTitle: 'Forums: Referrals',
  articlesTitle: 'Articles: Referrals',
}

export const CROWDFUNDING_CONTENT_ROUTES: ContentRoutes = {
  articlesList: PATHS.crowdfundingArticles,
  articlePath: crowdfundingArticlePath,
  forumsList: PATHS.crowdfundingForums,
  forumPath: crowdfundingForumPath,
  forumsTitle: 'Forums: LCRE Crowdfunding',
  articlesTitle: 'Articles: LCRE Crowdfunding.',
}

const ContentRoutesContext = createContext<ContentRoutes>(NETWORK_CONTENT_ROUTES)

export function ContentRoutesProvider({
  value,
  children,
}: {
  value: ContentRoutes
  children: ReactNode
}) {
  return (
    <ContentRoutesContext.Provider value={value}>
      {children}
    </ContentRoutesContext.Provider>
  )
}

export function useContentRoutes() {
  return useContext(ContentRoutesContext)
}

/** Same articles/forums chrome as Network, but under SiteHeader (no Network sidebar). */
export function ModuleContentShell({
  routes,
  children,
}: {
  routes: ContentRoutes
  children: ReactNode
}) {
  return (
    <ContentRoutesProvider value={routes}>
      <div className="min-h-0 flex-1 bg-[#F0F2F5]">{children}</div>
    </ContentRoutesProvider>
  )
}
