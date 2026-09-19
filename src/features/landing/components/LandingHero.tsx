import { useState } from 'react'
import { useProviderFilters } from '@/features/search'
import { HeroSlideshow } from '@/features/landing/components/HeroSlideshow'
import { HeroAdRails } from '@/features/landing/components/HeroAdRails'
import { HeroFilterPanel } from '@/features/landing/components/HeroFilterPanel'

export function LandingHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { filters, updateFilter, toSearchParams } = useProviderFilters()

  return (
    <section className="relative h-[600px] w-full overflow-hidden border-b border-line sm:h-[620px]">
      <HeroSlideshow activeIndex={activeIndex} onChange={setActiveIndex} />
      <HeroAdRails />

      <div className="absolute bottom-0 left-0 top-0 z-[7] flex items-start px-2 pb-[4.75rem] pt-1.5 sm:px-3 sm:pb-20 lg:left-[clamp(7.5rem,11vw,11rem)] lg:px-2 xl:right-[clamp(7.5rem,11vw,11rem)]">
        <HeroFilterPanel
          filters={filters}
          onChange={updateFilter}
          toSearchParams={toSearchParams}
          className="h-auto max-h-full w-full max-w-[16.2rem] sm:max-w-[18rem]"
        />
      </div>
    </section>
  )
}
