export type ListSortKey = 'default' | 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'random'

export type ProviderSortKey = ListSortKey

export type EmployerSortKey =
  | 'default'
  | 'newest'
  | 'oldest'
  | 'projects-asc'
  | 'projects-desc'
  | 'random'

export type ServiceSortKey =
  | 'latest'
  | 'price-asc'
  | 'price-desc'
  | 'referrals'
  | 'referral-desc'
  | 'referral-asc'
  | 'referral-50'
  | 'referral-40'
  | 'referral-30'
  | 'referral-20'
  | 'referral-10'
  | 'referral-0'
  | 'willing-to-train'
  | 'train-yes'
  | 'train-maybe'
  | 'train-no'

export const LIST_SORT_OPTIONS: { value: ListSortKey; label: string }[] = [
  { value: 'default', label: 'Sort by (Default)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Low to High' },
  { value: 'price-desc', label: 'High to Low' },
  { value: 'random', label: 'Random' },
]

export const PROVIDER_SORT_OPTIONS: { value: ProviderSortKey; label: string }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Low to High', value: 'price-asc' },
  { label: 'High to Low', value: 'price-desc' },
  { label: 'Random', value: 'random' },
]

export const EMPLOYER_SORT_OPTIONS: { value: EmployerSortKey; label: string }[] = [
  { value: 'default', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'projects-asc', label: 'Low to High' },
  { value: 'projects-desc', label: 'High to Low' },
  { value: 'random', label: 'Random' },
]
