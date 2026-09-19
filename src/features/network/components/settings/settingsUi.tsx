import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, ChevronDown, ChevronUp, Globe2, Plus, Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export function SettingsPanelHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  )
}

export function SettingsToggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string
  hint: string
  on: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex w-full items-start justify-between gap-4 rounded-2xl px-1 py-3 text-left"
    >
      <span>
        <span className="block text-[15px] font-semibold">{label}</span>
        <span className="text-sm text-muted">{hint}</span>
      </span>
      <span className={cn('relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition', on ? 'bg-brand' : 'bg-line')}>
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
            on ? 'left-5' : 'left-0.5',
          )}
        />
      </span>
    </button>
  )
}

/** Language → country where it is primarily spoken (flagcdn ISO codes). */
const LANGUAGE_COUNTRY: Record<string, string> = {
  aa: 'et',
  ab: 'ge',
  ae: 'ir',
  af: 'za',
  ak: 'gh',
  am: 'et',
  an: 'es',
  ar: 'sa',
  as: 'in',
  av: 'ru',
  ay: 'bo',
  az: 'az',
  ba: 'ru',
  be: 'by',
  bg: 'bg',
  bi: 'vu',
  bm: 'ml',
  bn: 'bd',
  bo: 'cn',
  br: 'fr',
  bs: 'ba',
  ca: 'es',
  ce: 'ru',
  ch: 'gu',
  co: 'fr',
  cr: 'ca',
  cs: 'cz',
  cu: 'ru',
  cv: 'ru',
  cy: 'gb',
  da: 'dk',
  de: 'de',
  dv: 'mv',
  dz: 'bt',
  ee: 'gh',
  el: 'gr',
  en: 'gb',
  eo: 'eu',
  es: 'es',
  et: 'ee',
  eu: 'es',
  fa: 'ir',
  ff: 'sn',
  fi: 'fi',
  fj: 'fj',
  fo: 'fo',
  fr: 'fr',
  fy: 'nl',
  ga: 'ie',
  gd: 'gb',
  gl: 'es',
  gn: 'py',
  gu: 'in',
  gv: 'im',
  ha: 'ng',
  he: 'il',
  hi: 'in',
  ho: 'pg',
  hr: 'hr',
  ht: 'ht',
  hu: 'hu',
  hy: 'am',
  hz: 'na',
  ia: 'eu',
  id: 'id',
  ie: 'eu',
  ig: 'ng',
  ii: 'cn',
  ik: 'us',
  io: 'eu',
  is: 'is',
  it: 'it',
  iu: 'ca',
  ja: 'jp',
  jv: 'id',
  ka: 'ge',
  kg: 'cd',
  ki: 'ke',
  kj: 'na',
  kk: 'kz',
  kl: 'gl',
  km: 'kh',
  kn: 'in',
  ko: 'kr',
  kr: 'ne',
  ks: 'in',
  ku: 'iq',
  kv: 'ru',
  kw: 'gb',
  ky: 'kg',
  la: 'it',
  lb: 'lu',
  lg: 'ug',
  li: 'nl',
  ln: 'cd',
  lo: 'la',
  lt: 'lt',
  lu: 'cd',
  lv: 'lv',
  mg: 'mg',
  mh: 'mh',
  mi: 'nz',
  mk: 'mk',
  ml: 'in',
  mn: 'mn',
  mr: 'in',
  ms: 'my',
  mt: 'mt',
  my: 'mm',
  na: 'nr',
  nb: 'no',
  nd: 'zw',
  ne: 'np',
  ng: 'na',
  nl: 'nl',
  nn: 'no',
  no: 'no',
  nr: 'za',
  nv: 'us',
  ny: 'mw',
  oc: 'fr',
  oj: 'ca',
  om: 'et',
  or: 'in',
  os: 'ru',
  pa: 'pk',
  pi: 'lk',
  pl: 'pl',
  ps: 'af',
  pt: 'pt',
  qu: 'pe',
  rm: 'ch',
  rn: 'bi',
  ro: 'ro',
  ru: 'ru',
  rw: 'rw',
  sa: 'in',
  sc: 'it',
  sd: 'pk',
  se: 'no',
  sg: 'cf',
  si: 'lk',
  sk: 'sk',
  sl: 'si',
  sm: 'ws',
  sn: 'zw',
  so: 'so',
  sq: 'al',
  sr: 'rs',
  ss: 'sz',
  st: 'ls',
  su: 'id',
  sv: 'se',
  sw: 'ke',
  ta: 'in',
  te: 'in',
  tg: 'tj',
  th: 'th',
  ti: 'er',
  tk: 'tm',
  tl: 'ph',
  tn: 'bw',
  to: 'to',
  tr: 'tr',
  ts: 'za',
  tt: 'ru',
  tw: 'gh',
  ty: 'pf',
  ug: 'cn',
  uk: 'ua',
  ur: 'pk',
  uz: 'uz',
  ve: 'za',
  vi: 'vn',
  vo: 'eu',
  wa: 'be',
  wo: 'sn',
  xh: 'za',
  yi: 'il',
  yo: 'ng',
  yue: 'hk',
  za: 'cn',
  zh: 'cn',
  zu: 'za',
}

function LanguageFlag({ code }: { code: string }) {
  const country = LANGUAGE_COUNTRY[code] ?? 'un'

  return (
    <img
      src={`https://flagcdn.com/w80/${country}.png`}
      srcSet={`https://flagcdn.com/w40/${country}.png 1x, https://flagcdn.com/w80/${country}.png 2x`}
      alt=""
      loading="lazy"
      decoding="async"
      className="settings-lang-flag-img"
    />
  )
}

function groupOptionsByLetter(options: { value: string; label: string }[]) {
  return Object.entries(
    options.reduce<Record<string, { value: string; label: string }[]>>((acc, option) => {
      const letter = option.label.trim().charAt(0).toUpperCase() || '#'
      ;(acc[letter] ??= []).push(option)
      return acc
    }, {}),
  )
    .map(([letter, items]) => [letter, [...items].sort((a, b) => a.label.localeCompare(b.label))] as const)
    .sort(([a], [b]) => a.localeCompare(b))
}

export function SettingsPasteDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
  compact = false,
  groupByLetter = false,
}: {
  label: string
  value?: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder?: string
  compact?: boolean
  groupByLetter?: boolean
}) {
  const selected = options.find((option) => option.value === value)?.label ?? placeholder ?? value
  const showAdd = !value && Boolean(placeholder)

  if (groupByLetter) {
    return (
      <SettingsLanguagePicker
        label={label}
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        compact={compact}
        showAdd={showAdd}
        selectedLabel={typeof selected === 'string' ? selected : placeholder}
      />
    )
  }

  return (
    <div className={cn('settings-paste shrink-0', compact ? 'settings-paste--compact w-auto' : 'w-full sm:w-[220px]')}>
      <button type="button" className="settings-paste-trigger" aria-haspopup="listbox" aria-label={label}>
        {showAdd ? (
          <span className="inline-flex items-center gap-2">
            <Plus className="size-4" strokeWidth={2.4} />
            {placeholder}
          </span>
        ) : (
          selected
        )}
        <span className="settings-paste-caret" aria-hidden>
          ▼
        </span>
      </button>
      <div className="settings-paste-menu" role="listbox">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={option.value === value}
            data-active={option.value === value ? 'true' : undefined}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function SettingsLanguagePicker({
  label,
  value,
  options,
  onChange,
  placeholder,
  compact = false,
  showAdd = false,
  selectedLabel,
}: {
  label: string
  value?: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder?: string
  compact?: boolean
  showAdd?: boolean
  selectedLabel?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  )

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return options

    // Single letter → languages starting with that letter (A → Arabic, Abkhazian, …)
    if (needle.length === 1 && /^[a-z]$/i.test(needle)) {
      return options.filter((option) => option.label.trim().toLowerCase().startsWith(needle))
    }

    // Full / partial name → match anywhere in the language name or code
    return options.filter((option) => {
      const name = option.label.trim().toLowerCase()
      const code = option.value.toLowerCase()
      return name.startsWith(needle) || name.includes(needle) || code.includes(needle)
    })
  }, [options, query])

  const letterGroups = useMemo(() => groupOptionsByLetter(filtered), [filtered])
  const searching = query.trim().length > 0

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setCollapsed({})
      return
    }
    const id = window.setTimeout(() => searchRef.current?.focus(), 0)
    return () => window.clearTimeout(id)
  }, [open])

  function toggleLetter(letter: string) {
    setCollapsed((current) => ({ ...current, [letter]: !current[letter] }))
  }

  function pick(next: string) {
    onChange(next)
    setOpen(false)
  }

  const triggerLabel = selectedOption?.label ?? selectedLabel ?? placeholder

  return (
    <div
      ref={rootRef}
      className={cn(
        'settings-lang shrink-0',
        compact ? 'settings-lang--compact w-auto' : 'w-full sm:w-[300px]',
        open && 'is-open',
      )}
    >
      <button
        type="button"
        className="settings-lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="settings-lang-trigger-main">
          {showAdd && !selectedOption ? (
            <>
              <span className="settings-lang-globe">
                <Plus className="size-3.5" strokeWidth={2.4} />
              </span>
              <span>{placeholder}</span>
            </>
          ) : (
            <>
              <span className="settings-lang-flag settings-lang-trigger-flag" aria-hidden>
                {selectedOption ? (
                  <LanguageFlag code={selectedOption.value} />
                ) : (
                  <Globe2 className="size-3.5 text-brand" strokeWidth={2.2} />
                )}
              </span>
              <span>{triggerLabel}</span>
            </>
          )}
        </span>
        {open ? (
          <ChevronUp className="size-4 shrink-0 text-brand" strokeWidth={2.4} />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-brand" strokeWidth={2.4} />
        )}
      </button>

      {open ? (
        <div className="settings-lang-menu" role="listbox">
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
              placeholder="Search language..."
              aria-label="Search language"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          <div className="settings-lang-list">
            {letterGroups.length === 0 ? (
              <p className="settings-lang-empty">No languages found.</p>
            ) : (
              letterGroups.map(([letter, items]) => {
                const isCollapsed = searching ? false : Boolean(collapsed[letter])
                return (
                  <div key={letter} className="settings-lang-group">
                    <button
                      type="button"
                      className="settings-lang-heading"
                      aria-expanded={!isCollapsed}
                      onClick={() => toggleLetter(letter)}
                    >
                      <span>{letter}</span>
                      {isCollapsed ? (
                        <ChevronDown className="size-3.5" strokeWidth={2.4} />
                      ) : (
                        <ChevronUp className="size-3.5" strokeWidth={2.4} />
                      )}
                    </button>
                    {!isCollapsed ? (
                      <div className="settings-lang-items">
                        {items.map((option) => {
                          const active = option.value === value
                          return (
                            <button
                              key={option.value}
                              type="button"
                              role="option"
                              aria-selected={active}
                              className={cn('settings-lang-option', active && 'is-active')}
                              onClick={() => pick(option.value)}
                            >
                              <span className="settings-lang-flag" aria-hidden>
                                <LanguageFlag code={option.value} />
                              </span>
                              <span className="settings-lang-name">{option.label}</span>
                              {active ? (
                                <span className="settings-lang-check" aria-hidden>
                                  <Check className="size-3" strokeWidth={3} />
                                </span>
                              ) : null}
                            </button>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function SettingsSelectRow({
  label,
  hint,
  value,
  options,
  onChange,
  groupByLetter = false,
}: {
  label: string
  hint?: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  groupByLetter?: boolean
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-black/[0.05] py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold">{label}</span>
        {hint ? <span className="text-sm text-muted">{hint}</span> : null}
      </span>
      <SettingsPasteDropdown
        label={label}
        value={value}
        options={options}
        onChange={onChange}
        groupByLetter={groupByLetter}
      />
    </div>
  )
}

export function SettingsField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
    </label>
  )
}

export const settingsInputClass =
  'mt-1 h-11 w-full rounded-xl border border-line px-3 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20'
