import {
  NetworkArticleDetailPage,
  NetworkArticlesPage,
  NetworkForumThreadPage,
  NetworkForumsPage,
} from '@/pages/network'
import {
  CROWDFUNDING_CONTENT_ROUTES,
  ModuleContentShell,
  REFERRALS_CONTENT_ROUTES,
} from '@/features/network/model/contentRoutes'

export function ReferralsArticlesPage() {
  return (
    <ModuleContentShell routes={REFERRALS_CONTENT_ROUTES}>
      <NetworkArticlesPage />
    </ModuleContentShell>
  )
}

export function ReferralsArticleDetailPage() {
  return (
    <ModuleContentShell routes={REFERRALS_CONTENT_ROUTES}>
      <NetworkArticleDetailPage />
    </ModuleContentShell>
  )
}

export function ReferralsForumsPage() {
  return (
    <ModuleContentShell routes={REFERRALS_CONTENT_ROUTES}>
      <NetworkForumsPage />
    </ModuleContentShell>
  )
}

export function ReferralsForumThreadPage() {
  return (
    <ModuleContentShell routes={REFERRALS_CONTENT_ROUTES}>
      <NetworkForumThreadPage />
    </ModuleContentShell>
  )
}

export function CrowdfundingArticlesPage() {
  return (
    <ModuleContentShell routes={CROWDFUNDING_CONTENT_ROUTES}>
      <NetworkArticlesPage />
    </ModuleContentShell>
  )
}

export function CrowdfundingArticleDetailPage() {
  return (
    <ModuleContentShell routes={CROWDFUNDING_CONTENT_ROUTES}>
      <NetworkArticleDetailPage />
    </ModuleContentShell>
  )
}

export function CrowdfundingForumsPage() {
  return (
    <ModuleContentShell routes={CROWDFUNDING_CONTENT_ROUTES}>
      <NetworkForumsPage />
    </ModuleContentShell>
  )
}

export function CrowdfundingForumThreadPage() {
  return (
    <ModuleContentShell routes={CROWDFUNDING_CONTENT_ROUTES}>
      <NetworkForumThreadPage />
    </ModuleContentShell>
  )
}
