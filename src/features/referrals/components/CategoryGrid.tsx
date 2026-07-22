import { Link } from 'react-router-dom'
import {
  Building2,
  ClipboardList,
  CreditCard,
  HardHat,
  Landmark,
  Ruler,
  Scale,
  Shield,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { REFERRAL_CATEGORIES } from '@/features/referrals/data/marketplace'

const ICONS = {
  agent: Building2,
  mortgage: CreditCard,
  attorney: Scale,
  appraiser: Ruler,
  coordinator: ClipboardList,
  trade: HardHat,
  insurance: Shield,
  architect: Landmark,
} as const

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {REFERRAL_CATEGORIES.map((category) => {
        const Icon = ICONS[category.id as keyof typeof ICONS] ?? Building2
        return (
          <Link
            key={category.id}
            to={`${PATHS.results}?pspCategory=${category.id}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-paper px-3 py-4 text-center transition hover:border-brand hover:bg-brand-light/40"
          >
            <span className="inline-flex rounded-xl bg-mist p-2.5 text-brand">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-ink">{category.title}</span>
            <span className="text-xs text-muted">{category.count}</span>
          </Link>
        )
      })}
    </div>
  )
}
