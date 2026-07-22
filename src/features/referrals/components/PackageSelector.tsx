import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'
import type { ServiceAddon } from '@/entities/provider/types'

type PackageSelectorProps = {
  basePrice: number
  addons?: ServiceAddon[]
  priceSuffix?: string
}

export function PackageSelector({
  basePrice,
  addons = [],
  priceSuffix,
}: PackageSelectorProps) {
  const [selected, setSelected] = useState<string[]>([])

  const total = useMemo(() => {
    const extras = addons
      .filter((addon) => selected.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0)
    return basePrice + extras
  }, [addons, basePrice, selected])

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-4 shadow-[0_10px_36px_rgb(15_31_26/0.12)] sm:p-5">
      <p className="font-display text-3xl font-bold tracking-tight text-ink">
        {formatCurrency(basePrice)}
        {priceSuffix ? (
          <span className="ml-1 text-sm font-medium text-muted">{priceSuffix}</span>
        ) : null}
      </p>

      {addons.length > 0 ? (
        <div className="mt-3 divide-y divide-line">
          {addons.map((addon) => {
            const checked = selected.includes(addon.id)
            return (
              <label
                key={addon.id}
                className="flex cursor-pointer items-start gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(addon.id)}
                  className="mt-1 h-4 w-4 rounded border-line accent-[var(--color-brand)]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink">
                    {addon.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{addon.description}</span>
                </span>
                <span
                  className={cn(
                    'shrink-0 text-sm font-semibold',
                    checked ? 'text-brand' : 'text-ink',
                  )}
                >
                  {formatCurrency(addon.price)}
                </span>
              </label>
            )
          })}
        </div>
      ) : null}

      <Button className="mt-3.5 w-full" size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
        Buy Now {formatCurrency(total)}
      </Button>
    </div>
  )
}
