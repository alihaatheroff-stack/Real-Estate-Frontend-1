import {
  ExperienceLevelScale,
  parseExperienceLevel,
} from '@/components/ui/ExperienceLevelScale'
import type { HeroFiltersState } from '@/features/search'
import { LANGUAGE_BY_LETTER, splitCsv } from '@/features/search'
import { RegisterFilterMenuProvider } from '@/features/search/components/HeroFilterSelect'
import { FormSection } from './registerUi'
import { RegisterFilterSelect } from './serviceProfileControls'

export function LanguageAndLevelBlock({
  step,
  profileFilters,
  setProfileFilterList,
}: {
  step?: number
  profileFilters: HeroFiltersState
  setProfileFilterList: (key: keyof HeroFiltersState, next: string[]) => void
}) {
  const languages = splitCsv(profileFilters.language)
  const level = parseExperienceLevel(splitCsv(profileFilters.experienceLevel))

  return (
    <FormSection title="Language & level" step={step} divided={false}>
      <RegisterFilterMenuProvider>
        <div className="flex flex-col gap-4">
          <RegisterFilterSelect
            label="Languages spoken:"
            placeholder="Ex. (English, Mandarin, Spanish, etc)"
            optionsByLetter={LANGUAGE_BY_LETTER}
            showLetterSuggest
            letterHeading="underline"
            value={languages}
            onChange={(next) => setProfileFilterList('language', next)}
          />

          <ExperienceLevelScale
            label="Level:"
            name="clientLanguageLevel"
            value={level}
            onChange={(next) =>
              setProfileFilterList(
                'experienceLevel',
                next == null ? [] : [String(next)],
              )
            }
          />
        </div>
      </RegisterFilterMenuProvider>
    </FormSection>
  )
}
