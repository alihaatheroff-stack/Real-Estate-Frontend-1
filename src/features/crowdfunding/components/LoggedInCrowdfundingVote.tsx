import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftToLine, Globe, Heart, Search } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AuthRequiredDialog, useIsAuthenticated } from '@/features/auth'
import { CrowdfundingVenuesMap } from '@/features/crowdfunding/components/CrowdfundingVenuesMap'
import {
  filterVoteVenues,
  getVoteVenueCount,
  getVoteVenueLocation,
  venueMatchesGeography,
  VOTE_ASSIST_OPTIONS,
  VOTE_COPY as C,
  VOTE_PHONE_CODES,
  VOTE_SORTS,
  VOTE_VENUES,
  VOTE_VERTICALS,
  type VoteVenue,
} from '@/features/crowdfunding/data/crowdfundingVote'
import { COUNTRIES_BY_LETTER, getCountryFlagCode } from '@/features/crowdfunding/data/countriesByLetter'
import {
  getCitiesForCounties,
  getCountiesForRegions,
  getRegionsForStates,
  getStatesForCountries,
  groupLabelsByLetter,
  impliedCitiesForSelection,
} from '@/features/crowdfunding/data/geoHierarchy'
import {
  ResultsFilterButton,
  ResultsSplitView,
} from '@/features/referrals/components/ResultsSplitView'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { SaveToFolderDialog } from '@/features/favorites/SaveToFolderDialog'
import { removeFavoriteItem, useFavorites } from '@/features/favorites/store'
import { cn } from '@/shared/lib/cn'

type FilterOption = { value: string; label: string; icon?: 'price' | 'date' }

function SortPriceIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <path
        d="M8 2.6v10.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.85 5.2C10.4 4.25 9.3 3.65 8 3.65 6.3 3.65 5.15 4.55 5.15 5.85c0 1.2.9 1.8 2.95 2.3 2 .48 3.05 1.2 3.05 2.6 0 1.5-1.4 2.55-3.2 2.55-1.45 0-2.6-.65-3.05-1.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SortDateIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <rect
        x="2.25"
        y="3.4"
        width="11.5"
        height="10.35"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M2.25 6.7h11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5.2 2.4v2.35M10.8 2.4v2.35"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5.35 9.2h.02M8 9.2h.02M10.65 9.2h.02M5.35 11.45h.02M8 11.45h.02"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FilterOptionLabel({ option }: { option: FilterOption }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {option.icon === 'price' ? <SortPriceIcon /> : null}
      {option.icon === 'date' ? <SortDateIcon /> : null}
      <span>{option.label}</span>
    </span>
  )
}

function CountryFlag({ country }: { country: string }) {
  const code = getCountryFlagCode(country)
  return (
    <span className="settings-lang-flag" aria-hidden>
      <img
        src={`https://flagcdn.com/w80/${code}.png`}
        srcSet={`https://flagcdn.com/w40/${code}.png 1x, https://flagcdn.com/w80/${code}.png 2x`}
        alt=""
        loading="lazy"
        decoding="async"
        className="settings-lang-flag-img"
      />
    </span>
  )
}

function SlideFilterSelect({
  label,
  showAll = false,
  className,
  value,
  onChange,
  options = [],
  optionsByLetter,
  name,
  showFlags = false,
  searchPlaceholder = 'Search...',
  closeOnSelect = false,
}: {
  label?: string
  showAll?: boolean
  className?: string
  value: string[]
  onChange: (value: string[]) => void
  options?: readonly FilterOption[]
  optionsByLetter?: Record<string, string[]>
  name?: string
  showFlags?: boolean
  searchPlaceholder?: string
  closeOnSelect?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const letterEntries = useMemo(
    () => (optionsByLetter ? Object.entries(optionsByLetter) : null),
    [optionsByLetter],
  )
  const letterOptions = letterEntries
    ? letterEntries.flatMap(([, letterItems]) => letterItems.map((item) => ({ value: item, label: item })))
    : [...options]
  const items = showAll ? [{ value: 'all', label: 'All' }, ...letterOptions] : letterOptions
  const selectedValues = value.filter(Boolean)
  const isAll = selectedValues.length === 0 || selectedValues.includes('all')
  const selectedLabels = items
    .filter((option) => option.value !== 'all' && selectedValues.includes(option.value))
    .map((option) => option.label)
  const summary =
    isAll || selectedLabels.length === 0
      ? 'All'
      : selectedLabels.length === 1
        ? selectedLabels[0]
        : `${selectedLabels[0]} +${selectedLabels.length - 1}`
  const visibleLetterEntries = useMemo(() => {
    if (!letterEntries) return null
    const needle = query.trim().toLowerCase()
    if (!needle) return letterEntries
    if (needle.length === 1) {
      return letterEntries.filter(([letter]) => letter.toLowerCase() === needle)
    }
    return letterEntries
      .map(([letter, letterItems]) => [
        letter,
        letterItems.filter((item) => item.toLowerCase().includes(needle)),
      ] as const)
      .filter(([, letterItems]) => letterItems.length > 0)
  }, [letterEntries, query])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    const focusTimer = window.setTimeout(() => searchRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.clearTimeout(focusTimer)
    }
  }, [open])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  function toggle(next: string) {
    if (next === 'all') {
      onChange(['all'])
      if (closeOnSelect) setOpen(false)
      return
    }
    const current = selectedValues.filter((item) => item !== 'all')
    const updated = current.includes(next)
      ? current.filter((item) => item !== next)
      : [...current, next]
    onChange(updated.length === 0 ? ['all'] : updated)
    if (closeOnSelect) setOpen(false)
  }

  function isChecked(optionValue: string) {
    return optionValue === 'all' ? isAll : selectedValues.includes(optionValue)
  }

  return (
    <div className={cn('flex w-full flex-col gap-1.5 text-sm', className)}>
      {label ? <span className="font-semibold text-ink">{label}</span> : null}
      {name ? <input type="hidden" name={name} value={selectedValues.join(',')} /> : null}
      <div
        ref={rootRef}
        className={cn('vote-select w-full', open && 'is-open', closeOnSelect && 'vote-select--manual')}
      >
        <button
          type="button"
          className="vote-select-selected"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="vote-select-selected-label">
            {showFlags && !isAll && selectedLabels[0] ? <CountryFlag country={selectedLabels[0]} /> : null}
            {summary}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="vote-select-arrow" aria-hidden>
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>
        <div
          className={cn('vote-select-options', letterEntries && 'vote-select-options--letters')}
          role="listbox"
          aria-multiselectable
          aria-label={label}
        >
          {letterEntries ? (
            <>
              <div
                className="settings-lang-search"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <Search className="settings-lang-search-icon" strokeWidth={2.2} />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => event.stopPropagation()}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
              {visibleLetterEntries?.length === 0 ? (
                <p className="settings-lang-empty">No countries found.</p>
              ) : null}
              {visibleLetterEntries?.map(([letter, letterItems]) => (
                <div key={letter} className="vote-select-letter settings-lang-group">
                  <div className="vote-select-letter-heading settings-lang-heading">{letter}</div>
                  <div className="vote-select-letter-items settings-lang-items">
                    {letterItems.map((item) => {
                      const checked = isChecked(item)
                      return (
                        <label
                          key={item}
                          className="vote-select-option"
                          role="option"
                          aria-selected={checked}
                        >
                          <input
                            type="checkbox"
                            className="register-check"
                            checked={checked}
                            onChange={() => toggle(item)}
                          />
                          {showFlags ? <CountryFlag country={item} /> : null}
                          <span>{item}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </>
          ) : (
            items.map((option) => {
              const checked = isChecked(option.value)
              return (
                <label
                  key={option.value}
                  className="vote-select-option"
                  role="option"
                  aria-selected={checked}
                >
                  <input
                    type="checkbox"
                    className="register-check"
                    checked={checked}
                    onChange={() => toggle(option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  placeholder,
  showAll = false,
  className,
  value,
  onChange,
  options,
  name,
  inline = false,
  variant = 'paste',
}: {
  label?: string
  placeholder?: string
  showAll?: boolean
  className?: string
  value: string
  onChange: (value: string) => void
  options: readonly FilterOption[]
  name?: string
  inline?: boolean
  variant?: 'paste' | 'underline'
}) {
  const items = showAll ? [{ value: 'all', label: 'All' }, ...options] : [...options]
  const selected = items.find((option) => option.value === value)
  const showPlaceholder = Boolean(placeholder) && (value === '' || value === 'all')
  const underline = variant === 'underline'
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; minWidth: number } | null>(
    null,
  )

  useEffect(() => {
    if (!underline || !open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function syncMenuPos() {
      const trigger = rootRef.current?.querySelector('button')
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const minWidth = Math.max(rect.width, 272)
      const left = Math.min(rect.left, window.innerWidth - minWidth - 8)
      setMenuPos({ top: rect.bottom + 4, left: Math.max(8, left), minWidth })
    }
    syncMenuPos()
    document.addEventListener('mousedown', onPointerDown)
    window.addEventListener('resize', syncMenuPos)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('resize', syncMenuPos)
    }
  }, [underline, open])

  function pick(next: string) {
    onChange(next)
    if (underline) setOpen(false)
  }

  return (
    <div
      className={cn(
        'flex w-full text-sm',
        inline ? 'flex-row items-center gap-1.5' : 'flex-col gap-1.5',
        className,
      )}
    >
      {label ? (
        <span className={cn('shrink-0 font-semibold text-ink', inline && 'whitespace-nowrap')}>
          {label}
        </span>
      ) : null}
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <div
        ref={rootRef}
        className={cn(
          underline ? 'relative z-20 w-auto min-w-0' : 'settings-paste min-w-0',
          !underline && (inline ? 'flex-1' : 'w-full'),
        )}
      >
        <button
          type="button"
          className={
            underline
              ? 'inline-flex min-w-24 items-center justify-between gap-1.5 border-0 border-b-2 border-ink/35 bg-transparent py-0.5 text-left text-sm font-semibold leading-none text-ink outline-none transition hover:border-brand'
              : 'settings-paste-trigger !min-w-0 flex-nowrap'
          }
          aria-haspopup="listbox"
          aria-expanded={underline ? open : undefined}
          aria-label={label}
          onClick={underline ? () => setOpen((current) => !current) : undefined}
        >
          <span className={cn('min-w-0 truncate', showPlaceholder && 'font-medium !text-ink/55')}>
            {showPlaceholder ? placeholder : selected ? <FilterOptionLabel option={selected} /> : ''}
          </span>
          <span
            className={cn(
              'shrink-0',
              underline ? 'mb-0.5 text-[9px] leading-none transition' : 'settings-paste-caret',
              underline && open && 'rotate-180',
            )}
            aria-hidden
          >
            ▼
          </span>
        </button>
        <div
          className={cn(
            'settings-paste-menu network-thin-scroll max-h-56 overflow-y-auto',
            underline && 'settings-paste-menu--underline',
            underline && (open ? 'is-open z-[60]' : 'pointer-events-none'),
          )}
          style={
            underline && menuPos
              ? {
                  position: 'fixed',
                  top: menuPos.top,
                  left: menuPos.left,
                  minWidth: menuPos.minWidth,
                  width: 'auto',
                }
              : undefined
          }
          role="listbox"
        >
          {items.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              data-active={option.value === value ? 'true' : undefined}
              onClick={() => pick(option.value)}
              className={underline ? 'whitespace-nowrap' : undefined}
            >
              <FilterOptionLabel option={option} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function VoteFiltersDrawer({
  open,
  onClose,
  onReset,
  geography,
  onGeographyChange,
  states,
  onStatesChange,
  regions,
  onRegionsChange,
  counties,
  onCountiesChange,
  cities,
  onCitiesChange,
  vertical,
  onVerticalChange,
  venueId,
  onVenueIdChange,
  submitted,
  onSubmit,
  phoneCode,
  onPhoneCodeChange,
  assist,
  onAssistChange,
}: {
  open: boolean
  onClose: () => void
  onReset: () => void
  geography: string[]
  onGeographyChange: (value: string[]) => void
  states: string[]
  onStatesChange: (value: string[]) => void
  regions: string[]
  onRegionsChange: (value: string[]) => void
  counties: string[]
  onCountiesChange: (value: string[]) => void
  cities: string[]
  onCitiesChange: (value: string[]) => void
  vertical: string[]
  onVerticalChange: (value: string[]) => void
  venueId: string[]
  onVenueIdChange: (value: string[]) => void
  submitted: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  phoneCode: string
  onPhoneCodeChange: (value: string) => void
  assist: string
  onAssistChange: (value: string) => void
}) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, open])

  if (!open) return null

  const selectedCountries = geography.filter((item) => item && item !== 'all')
  const stateOptions = getStatesForCountries(selectedCountries)
  const regionOptions = getRegionsForStates(selectedCountries, states)
  const countyOptions = getCountiesForRegions(selectedCountries, states, regions)
  const cityOptions = getCitiesForCounties(selectedCountries, states, regions, counties)

  return (
    <div className="fixed inset-0 z-[1100] flex">
      <aside
        className="relative flex h-full w-full max-w-[360px] flex-col bg-paper shadow-2xl animate-drawer-in"
        aria-label={C.filterTitle}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex min-w-0 items-baseline gap-3">
            <h2 className="text-lg font-bold text-ink">{C.filterTitle}</h2>
            <button
              type="button"
              onClick={onReset}
              className="text-[13px] font-medium text-muted hover:text-brand hover:underline"
            >
              {C.filterReset}
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-muted transition hover:text-brand"
            aria-label="Close filters"
          >
            <ArrowLeftToLine className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <SlideFilterSelect
            label={C.geography}
            name="geography"
            value={geography}
            showFlags
            closeOnSelect
            searchPlaceholder={C.searchCountry}
            onChange={(next) => {
              onGeographyChange(next)
              onStatesChange([])
              onRegionsChange([])
              onCountiesChange([])
              onCitiesChange([])
              onVenueIdChange(['all'])
            }}
            optionsByLetter={COUNTRIES_BY_LETTER}
          />

          {stateOptions.length > 0 ? (
            <SlideFilterSelect
              label={C.state}
              name="state"
              value={states}
              closeOnSelect
              searchPlaceholder={C.searchState}
              onChange={(next) => {
                onStatesChange(next)
                onRegionsChange([])
                onCountiesChange([])
                onCitiesChange([])
                onVenueIdChange(['all'])
              }}
              optionsByLetter={groupLabelsByLetter(stateOptions)}
            />
          ) : null}

          {regionOptions.length > 0 ? (
            <SlideFilterSelect
              label={C.region}
              name="region"
              value={regions}
              closeOnSelect
              searchPlaceholder={C.searchRegion}
              onChange={(next) => {
                onRegionsChange(next)
                onCountiesChange([])
                onCitiesChange([])
                onVenueIdChange(['all'])
              }}
              optionsByLetter={groupLabelsByLetter(regionOptions)}
            />
          ) : null}

          {countyOptions.length > 0 ? (
            <SlideFilterSelect
              label={C.county}
              name="county"
              value={counties}
              closeOnSelect
              searchPlaceholder={C.searchCounty}
              onChange={(next) => {
                onCountiesChange(next)
                onCitiesChange([])
                onVenueIdChange(['all'])
              }}
              optionsByLetter={groupLabelsByLetter(countyOptions)}
            />
          ) : null}

          {cityOptions.length > 0 ? (
            <SlideFilterSelect
              label={C.city}
              name="city"
              value={cities}
              closeOnSelect
              searchPlaceholder={C.searchCity}
              onChange={(next) => {
                onCitiesChange(next)
                onVenueIdChange(['all'])
              }}
              optionsByLetter={groupLabelsByLetter(cityOptions)}
            />
          ) : null}

          <SlideFilterSelect
            label={C.verticals}
            name="vertical"
            showAll
            value={vertical}
            onChange={onVerticalChange}
            options={VOTE_VERTICALS}
          />

          <SlideFilterSelect
            label={C.venue}
            name="venue"
            showAll
            value={venueId}
            onChange={onVenueIdChange}
            options={VOTE_VENUES.filter((venue) => venueMatchesGeography(venue, geography)).map(
              (venue) => ({ value: venue.id, label: venue.title }),
            )}
          />

          <div className="pt-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-brand">
              {C.formTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{C.formLead}</p>

            {submitted ? (
              <div className="mt-5 rounded-2xl border border-brand/20 bg-brand-light/50 px-4 py-4">
                <p className="font-display text-base font-semibold text-ink">{C.formSuccessTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{C.formSuccessBody}</p>
              </div>
            ) : (
              <form className="mt-5 space-y-3" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <Input label={`${C.firstName} *`} name="firstName" autoComplete="given-name" required />
                  <Input label={`${C.lastName} *`} name="lastName" autoComplete="family-name" required />
                </div>

                <label className="flex w-full flex-col gap-1.5 text-sm">
                  <span className="font-bold text-ink">{C.phone} *</span>
                  <span className="flex gap-2">
                    <div className="settings-paste settings-paste--compact w-[7.5rem] shrink-0">
                      <input type="hidden" name="phoneCode" value={phoneCode} />
                      <button
                        type="button"
                        className="settings-paste-trigger min-w-0 !px-2.5 !text-xs"
                        aria-haspopup="listbox"
                        aria-label="Country code"
                      >
                        <span className="inline-flex min-w-0 items-center gap-1 truncate">
                          <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {VOTE_PHONE_CODES.find((code) => code.value === phoneCode)?.label}
                        </span>
                        <span className="settings-paste-caret" aria-hidden>
                          ▼
                        </span>
                      </button>
                      <div className="settings-paste-menu" role="listbox">
                        {VOTE_PHONE_CODES.map((code) => (
                          <button
                            key={code.value}
                            type="button"
                            role="option"
                            aria-selected={code.value === phoneCode}
                            data-active={code.value === phoneCode ? 'true' : undefined}
                            onClick={() => onPhoneCodeChange(code.value)}
                          >
                            {code.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </span>
                </label>

                <FilterSelect
                  label={C.assist}
                  name="assist"
                  placeholder={C.assistPlaceholder}
                  value={assist}
                  onChange={onAssistChange}
                  options={VOTE_ASSIST_OPTIONS}
                />

                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-bold text-ink">{C.message} *</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>

                <Button type="submit" className="w-full">
                  {C.send}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-line px-6 py-4">
          <Button className="h-12 w-full rounded-xl text-base" onClick={onClose}>
            {C.filterApply}
          </Button>
        </div>
      </aside>

      <button
        type="button"
        className="flex-1 bg-ink/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Close filters"
      />
    </div>
  )
}

function VoteVenueCard({
  venue,
  voted,
  focused,
  hovered,
  onFocus,
  onHover,
  onToggleVote,
  cardRef,
}: {
  venue: VoteVenue
  voted: boolean
  focused: boolean
  hovered: boolean
  onFocus: () => void
  onHover: (id: string | null) => void
  onToggleVote: () => void
  cardRef: (el: HTMLButtonElement | null) => void
}) {
  const { isSaved } = useFavorites()
  const saved = isSaved('crowdfunding', venue.id)
  const [saveOpen, setSaveOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authAction, setAuthAction] = useState('vote or save')
  const isAuthenticated = useIsAuthenticated()
  const location = getVoteVenueLocation(venue.id)

  function requireAuth(actionLabel: string, next: () => void) {
    if (isAuthenticated) {
      next()
      return
    }
    setAuthAction(actionLabel)
    setAuthOpen(true)
  }

  function toggleSave() {
    requireAuth('save favorites', () => {
      if (saved) removeFavoriteItem('crowdfunding', venue.id)
      else setSaveOpen(true)
    })
  }

  function handleVoteChange() {
    requireAuth('vote', onToggleVote)
  }

  return (
    <article
      className={cn(
        'rounded-xl border-2 border-ink/35 bg-paper p-1.5 transition hover:border-brand hover:ring-2 hover:ring-brand/30',
        (voted || focused || hovered) && 'border-brand ring-2 ring-brand/30',
      )}
      onMouseEnter={() => onHover(venue.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative">
        <button
          ref={cardRef}
          type="button"
          onClick={onFocus}
          aria-label={`Focus ${venue.title} on map`}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-mist outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <img
            src={venue.image}
            alt={venue.title}
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            toggleSave()
          }}
          aria-label={saved ? `Remove ${venue.title} from favorites` : `Add ${venue.title} to favorites`}
          aria-pressed={saved}
          className="absolute right-2 top-2 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
        >
          <Heart
            className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className="space-y-1.5 px-1 pb-1.5 pt-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-ink">
            <input
              type="checkbox"
              checked={voted}
              onChange={handleVoteChange}
              className="register-check"
            />
            <span>Vote</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-ink">
            <input
              type="checkbox"
              checked={saved}
              onChange={toggleSave}
              className="register-check"
            />
            <span>Save</span>
          </label>
        </div>

        <div className="space-y-0.5">
          <p className="text-xs font-semibold leading-snug text-ink sm:text-sm">
            <span className="font-medium text-muted">Role:</span> {venue.role}
          </p>
          <p className="text-xs leading-snug text-muted sm:text-sm">{location.city}</p>
          <p className="text-xs leading-snug text-ink sm:text-sm">
            <span className="font-medium text-muted">Raise:</span>{' '}
            <span className="font-semibold">{venue.raise}</span>
          </p>
          <p className="text-xs leading-snug text-ink sm:text-sm">
            <span className="font-medium text-muted">ROI:</span>{' '}
            <span className="font-semibold">{venue.roi}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <p className="text-xs font-medium leading-none text-muted underline decoration-ink/35 underline-offset-2 sm:text-sm">
            Votes: {getVoteVenueCount(venue.id) + (voted ? 1 : 0)}
          </p>
          <button
            type="button"
            onClick={onFocus}
            className="text-xs font-semibold text-brand underline decoration-brand/35 underline-offset-2 transition hover:text-brand-dark hover:decoration-brand sm:text-sm"
          >
            Learn More
          </button>
        </div>
      </div>
      <SaveToFolderDialog
        open={saveOpen}
        draft={{
          itemId: venue.id,
          module: 'crowdfunding',
          title: venue.role || venue.title,
          subtitle: location.city,
          image: venue.image,
        }}
        onClose={() => setSaveOpen(false)}
      />
      <AuthRequiredDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        action={authAction}
      />
    </article>
  )
}

export function LoggedInCrowdfundingVote() {
  const isAuthenticated = useIsAuthenticated()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [geography, setGeography] = useState<string[]>(['Mexico'])
  const [states, setStates] = useState<string[]>([])
  const [regions, setRegions] = useState<string[]>([])
  const [counties, setCounties] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [vertical, setVertical] = useState<string[]>(['all'])
  const [venueId, setVenueId] = useState<string[]>(['all'])
  const [sort, setSort] = useState('all')
  const [registered, setRegistered] = useState(false)
  const [votedIds, setVotedIds] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [phoneCode, setPhoneCode] = useState('+52')
  const [assist, setAssist] = useState('')

  const venues = useMemo(
    () =>
      filterVoteVenues({
        geography,
        cities: impliedCitiesForSelection({
          countries: geography,
          states,
          regions,
          counties,
          cities,
        }),
        vertical,
        venueId,
        sort,
      }),
    [geography, states, regions, counties, cities, vertical, venueId, sort],
  )
  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(venues)
  const [mapOpen, setMapOpen] = useState(true)

  function registerToVote() {
    if (!isAuthenticated) return
    setRegistered(true)
  }

  function toggleVote(id: string) {
    if (!registered) setRegistered(true)
    setVotedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    setSelectedId(id)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  function resetFilters() {
    setGeography(['Mexico'])
    setStates([])
    setRegions([])
    setCounties([])
    setCities([])
    setVertical(['all'])
    setVenueId(['all'])
    setSort('all')
  }

  function focusVenue(id: string | null) {
    setSelectedId(id)
  }

  function hoverVenue(id: string | null) {
    setHoveredId(id)
    if (id) setSelectedId(id)
  }

  const hereClassName =
    'border-b-2 border-ink/35 font-semibold text-ink no-underline transition hover:border-brand hover:text-brand'

  return (
    <div className="crowdfunding-vote-shell flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <h1 className="sr-only">Crowdfunding vote</h1>
      <ResultsSplitView
        rootClassName="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
        splitRowClassName="flex min-h-0 flex-1 overflow-hidden"
        asideClassName="bg-paper lg:w-1/2"
        stickyToolbar
        toolbarClassName="z-40 flex shrink-0 flex-col bg-paper px-4 py-4 shadow-none sm:px-5"
        showMapBarClassName="border-t border-line p-3 lg:hidden"
        mapPanelClassName="min-w-0 lg:w-1/2"
        mapInnerClassName="absolute inset-0 overflow-hidden bg-mist"
        collapsibleMap
        mapOpen={mapOpen}
        onMapOpenChange={setMapOpen}
        toolbarStart={
          <div className="flex w-full min-w-0 flex-col gap-3">
            <p className="inline-flex w-fit items-center gap-1.5 self-start font-display text-sm font-semibold tracking-tight text-ink sm:text-base">
              <span>{C.registerCta}</span>
              <span aria-hidden>👉🏻</span>
              <span>:</span>
              {isAuthenticated ? (
                <button type="button" onClick={registerToVote} className={hereClassName}>
                  {C.registerHere}
                </button>
              ) : (
                <Link to={PATHS.registerPsp} className={hereClassName}>
                  {C.registerHere}
                </Link>
              )}
            </p>
            <div className="grid grid-cols-3 items-center gap-3">
              <div className="justify-self-start">
                <ResultsFilterButton variant="underline" onClick={() => setFiltersOpen(true)} />
              </div>
              <p className="justify-self-center text-center text-sm text-muted sm:text-base">
                {venues.length === 0 ? (
                  'No venues'
                ) : (
                  <>
                    Showing <span className="font-semibold text-ink">{venues.length}</span>{' '}
                    {venues.length === 1 ? 'venue' : 'venues'}
                  </>
                )}
              </p>
              <FilterSelect
                label={C.sortBy}
                name="sort"
                placeholder=" "
                value={sort}
                onChange={setSort}
                options={VOTE_SORTS}
                inline
                variant="underline"
                className="w-auto justify-self-end"
              />
            </div>
            <div className="mx-auto h-px w-1/2 bg-[var(--color-line)]" />
          </div>
        }
        toolbarEnd={null}
        list={
          venues.length === 0 ? (
            <p className="rounded-2xl border border-line bg-mist/40 px-4 py-8 text-sm text-muted">
              No venues match these filters. Try another geography or vertical.
            </p>
          ) : (
            <ul
              className={cn(
                'grid gap-3 sm:gap-3.5',
                mapOpen
                  ? 'grid-cols-2 sm:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
              )}
            >
              {venues.map((venue) => {
                const voted = votedIds.includes(venue.id)
                const focused = selectedId === venue.id
                const hovered = hoveredId === venue.id
                return (
                  <li key={venue.id}>
                    <VoteVenueCard
                      venue={venue}
                      voted={voted}
                      focused={focused}
                      hovered={hovered}
                      onFocus={() => focusVenue(venue.id)}
                      onHover={hoverVenue}
                      onToggleVote={() => toggleVote(venue.id)}
                      cardRef={(el) => {
                        itemRefs.current[venue.id] = el
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          )
        }
        map={
          <CrowdfundingVenuesMap
            venues={venues}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={focusVenue}
            onHover={setHoveredId}
          />
        }
        drawer={
          <VoteFiltersDrawer
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onReset={resetFilters}
            geography={geography}
            onGeographyChange={setGeography}
            states={states}
            onStatesChange={setStates}
            regions={regions}
            onRegionsChange={setRegions}
            counties={counties}
            onCountiesChange={setCounties}
            cities={cities}
            onCitiesChange={setCities}
            vertical={vertical}
            onVerticalChange={setVertical}
            venueId={venueId}
            onVenueIdChange={setVenueId}
            submitted={submitted}
            onSubmit={onSubmit}
            phoneCode={phoneCode}
            onPhoneCodeChange={setPhoneCode}
            assist={assist}
            onAssistChange={setAssist}
          />
        }
      />
    </div>
  )
}
