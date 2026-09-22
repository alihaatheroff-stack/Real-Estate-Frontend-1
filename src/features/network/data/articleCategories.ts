export const BLOG_CATEGORIES = [
  { label: 'Residential', match: ['Residential', 'Inspections', 'Design', 'Value-add'] },
  { label: 'Commercial', match: ['Multifamily', 'Markets', 'Ops'] },
  { label: 'Capital & lending', match: ['Capital', 'Remote'] },
  { label: 'Networking', match: ['Network', 'Intros', 'Partnerships', 'Trust'] },
  { label: 'Marketing', match: ['Marketing'] },
  { label: 'Education', match: ['Education', 'Career', 'Tech', 'Data'] },
] as const

export type BlogCategoryLabel = (typeof BLOG_CATEGORIES)[number]['label']

export function categoryForArticle(tags: string[]): string {
  for (const category of BLOG_CATEGORIES) {
    if (
      tags.some((tag) =>
        category.match.some((key) => key.toLowerCase() === tag.toLowerCase()),
      )
    ) {
      return category.label
    }
  }
  return tags[0] ?? 'Networking'
}
