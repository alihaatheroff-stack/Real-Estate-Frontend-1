import { useState } from 'react'
import { useProviderFilters } from '@/features/search'
import { HeroSlideshow } from '@/features/landing/components/HeroSlideshow'
import { HeroAdRails } from '@/features/landing/components/HeroAdRails'
import { HeroFilterPanel } from '@/features/landing/components/HeroFilterPanel'

export function LandingHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { filters, updateFilter, toSearchParams } = useProviderFilters()

  return (
    <section className="relative h-[min(92vh,820px)] min-h-[560px] w-full overflow-hidden border-b border-line">
      <HeroSlideshow activeIndex={activeIndex} onChange={setActiveIndex} />
      <HeroAdRails />

      <div className="absolute inset-y-0 left-0 z-[7] flex items-center px-3 py-8 sm:px-4 lg:pl-[clamp(8rem,12vw,12rem)] xl:px-[clamp(8.5rem,12vw,12.5rem)]">
        <HeroFilterPanel
          filters={filters}
          onChange={updateFilter}
          toSearchParams={toSearchParams}
          className="w-full max-w-[20rem] sm:max-w-[22rem]"
        />
      </div>
    </section>
  )
}
