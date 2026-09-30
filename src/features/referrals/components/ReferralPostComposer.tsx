import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ImagePlus,
  Film,
  FileText,
  Upload,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { getCurrentMember } from '@/features/network/data/members'
import { ResultsFilterButton } from '@/features/referrals/components/ResultsSplitView'
import {
  EDITOR_LIST_STYLE_CLASSES,
  ReferralPostFormatToolbar,
} from '@/features/referrals/components/ReferralPostFormatToolbar'
import { ServiceFiltersDrawer } from '@/features/referrals/components/ServiceFiltersDrawer'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'
import {
  MAX_ATTACHMENTS,
  saveReferralPost,
  type ReferralAttachment,
  type ReferralAttachmentKind,
} from '@/features/referrals/model/referralPosts'
import { useProviderFilters } from '@/features/search'
import { cn } from '@/shared/lib/cn'

const PAGE_TITLE = 'Create Referral post'
const PAGE_SUBTITLE = 'Share an update with your referral circle.'
const MEDIA_ACCEPT = 'image/*,video/*,application/pdf,.pdf'

function attachmentKindForFile(file: File): ReferralAttachmentKind | null {
  if (file.type.startsWith('image/')) return 'photo'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) return 'pdf'
  return null
}

function plainTextFromHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .trim()
}

export function ReferralPostComposer() {
  const navigate = useNavigate()
  const me = getCurrentMember()
  const titleId = useId()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState('')
  const [attachments, setAttachments] = useState<ReferralAttachment[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({})
  const { filters, updateFilter, resetFilters } = useProviderFilters({ find: 'service' })

  const plainText = plainTextFromHtml(html)
  const canPost = plainText.length > 0 || attachments.length > 0
  const slotsLeft = MAX_ATTACHMENTS - attachments.length
  const placeholder = `What’s happening in your referral network, ${me.firstName}?`
  const showPlaceholder = plainText.length === 0

  function syncActiveFormats() {
    const selection = window.getSelection()
    const node = selection?.anchorNode
    const element =
      node instanceof Element ? node : node?.parentElement ?? null
    const inChecklist = Boolean(element?.closest('[data-checklist="true"]'))

    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strike: document.queryCommandState('strikeThrough'),
      bullets: document.queryCommandState('insertUnorderedList') && !inChecklist,
      numbers: document.queryCommandState('insertOrderedList'),
      quote: document.queryCommandValue('formatBlock').toLowerCase() === 'blockquote',
      checklist: inChecklist,
    })
  }

  function syncHtmlFromEditor() {
    const next = editorRef.current?.innerHTML ?? ''
    setHtml(next === '<br>' ? '' : next)
    syncActiveFormats()
  }

  function focusEditor() {
    editorRef.current?.focus()
  }

  function onMediaFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0 || slotsLeft <= 0) return

    const accepted = files
      .map((file) => ({ file, kind: attachmentKindForFile(file) }))
      .filter((item): item is { file: File; kind: ReferralAttachmentKind } => item.kind != null)
      .slice(0, slotsLeft)

    accepted.forEach(({ file, kind }) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result !== 'string') return
        const next: ReferralAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          kind,
          name: file.name,
          url: reader.result,
          mimeType: file.type || (kind === 'pdf' ? 'application/pdf' : file.type),
        }
        setAttachments((current) =>
          current.length >= MAX_ATTACHMENTS ? current : [...current, next],
        )
      }
      reader.readAsDataURL(file)
    })
  }

  function removeAttachment(id: string) {
    setAttachments((current) => current.filter((item) => item.id !== id))
  }

  function publish() {
    if (!canPost) return
    saveReferralPost({
      text: plainText.length > 0 ? html.trim() : '',
      attachments,
      authorId: me.id,
      authorName: me.name,
    })
    navigate(PATHS.referrals)
  }

  useEffect(() => {
    focusEditor()
  }, [])

  return (
    <div
      className={cn(
        'w-full bg-paper',
        filtersOpen
          ? 'grid min-h-0 grid-cols-1 items-stretch sm:grid-cols-[minmax(260px,360px)_minmax(0,1fr)]'
          : 'flex min-h-0 flex-1',
      )}
    >
      <ServiceFiltersDrawer
        open={filtersOpen}
        layout="push"
        title={PAGE_TITLE}
        subtitle={PAGE_SUBTITLE}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={updateFilter}
        onReset={resetFilters}
        onApply={() => setFiltersOpen(false)}
      />

      <div
        className={cn(
          'flex min-w-0 flex-col transition-[padding] duration-280',
          filtersOpen ? 'min-h-0' : 'min-h-0 flex-1',
          MARKETPLACE_PAGE_PAD,
        )}
      >
        {!filtersOpen ? (
          <div className="py-4">
            <h1 id={titleId} className="font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
              {PAGE_TITLE}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-xs text-muted sm:text-sm">{PAGE_SUBTITLE}</p>
              <ResultsFilterButton variant="underline" onClick={() => setFiltersOpen(true)} />
            </div>
          </div>
        ) : null}

        <div className={cn('flex-1', filtersOpen ? 'py-5 sm:py-6' : 'pb-5 sm:pb-6')}>
          <div className="flex items-center gap-3">
            <MemberAvatar name={me.name} src={me.avatar} />
            <div>
              <p className="text-sm font-semibold text-ink">{me.name}</p>
              <p className="text-xs text-muted">Posting in Referral</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-line bg-white" onClick={focusEditor}>
            <ReferralPostFormatToolbar
              editorRef={editorRef}
              activeFormats={activeFormats}
              onChange={syncHtmlFromEditor}
              onSyncActive={syncActiveFormats}
            />

            <div className="relative">
              {showPlaceholder ? (
                <p className="pointer-events-none absolute inset-x-4 top-4 text-[17px] leading-relaxed text-muted/70 sm:text-lg">
                  {placeholder}
                </p>
              ) : null}
              <div
                ref={editorRef}
                contentEditable
                role="textbox"
                aria-multiline
                aria-labelledby={filtersOpen ? undefined : titleId}
                aria-label={filtersOpen ? PAGE_TITLE : undefined}
                suppressContentEditableWarning
                onInput={syncHtmlFromEditor}
                onKeyUp={syncActiveFormats}
                onMouseUp={syncActiveFormats}
                onBlur={syncHtmlFromEditor}
                className={cn(
                  'min-h-[12rem] w-full resize-y overflow-y-auto px-4 py-4 text-[17px] leading-relaxed text-ink outline-none sm:text-lg',
                  EDITOR_LIST_STYLE_CLASSES,
                  '[&_blockquote]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-line [&_blockquote]:pl-3 [&_blockquote]:text-muted',
                  '[&_a]:text-brand [&_a]:underline',
                  '[&_b]:font-bold [&_strong]:font-bold',
                  '[&_i]:italic [&_em]:italic',
                )}
                onClick={(event) => {
                  const target = event.target
                  if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return
                  event.stopPropagation()
                  if (target.checked) target.setAttribute('checked', '')
                  else target.removeAttribute('checked')
                  syncHtmlFromEditor()
                }}
              />
            </div>
          </div>

          <input
            ref={photoInputRef}
            type="file"
            accept={MEDIA_ACCEPT}
            multiple
            className="sr-only"
            onChange={onMediaFiles}
          />

          {attachments.length > 0 ? (
            <div
              className={cn(
                'mt-4 grid gap-3',
                attachments.length === 1 && 'grid-cols-1 sm:grid-cols-2',
                attachments.length === 2 && 'grid-cols-2',
                attachments.length >= 3 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
              )}
            >
              {attachments.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-xl border border-line bg-mist/40"
                >
                  {item.kind === 'photo' ? (
                    <img src={item.url} alt="" className="aspect-[4/3] h-full w-full object-cover" />
                  ) : null}
                  {item.kind === 'video' ? (
                    <video
                      src={item.url}
                      controls
                      className="aspect-[4/3] h-full w-full object-cover bg-ink"
                    />
                  ) : null}
                  {item.kind === 'pdf' ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex aspect-[4/3] h-full w-full flex-col items-center justify-center gap-2 px-3 text-center"
                    >
                      <FileText className="h-8 w-8 text-brand" />
                      <span className="line-clamp-2 text-xs font-semibold text-ink">{item.name}</span>
                      <span className="text-[11px] text-muted">PDF</span>
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => removeAttachment(item.id)}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow"
                    aria-label={`Remove ${item.kind}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-5 rounded-xl border border-line px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-ink">Add photo, video, or PDF</p>
                <p className="mt-0.5 text-xs text-muted">
                  Up to {MAX_ATTACHMENTS} files · {attachments.length}/{MAX_ATTACHMENTS} added
                </p>
              </div>
              <button
                type="button"
                disabled={slotsLeft <= 0}
                onClick={() => photoInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-mist px-3 py-2 text-sm font-semibold text-ink transition hover:bg-line disabled:pointer-events-none disabled:opacity-50"
              >
                <Upload className="h-4 w-4 text-emerald-600" />
                Upload
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1 text-xs font-medium text-muted">
                <ImagePlus className="h-3.5 w-3.5 text-emerald-600" />
                Photo
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1 text-xs font-medium text-muted">
                <Film className="h-3.5 w-3.5 text-sky-600" />
                Video
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1 text-xs font-medium text-muted">
                <FileText className="h-3.5 w-3.5 text-brand" />
                PDF
              </span>
            </div>

            {slotsLeft > 0 ? (
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-brand/35 bg-brand/5 px-4 py-8 text-sm font-semibold text-brand transition hover:bg-brand/10"
              >
                <Upload className="h-6 w-6" />
                Choose photos, videos, or PDFs
              </button>
            ) : null}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-line bg-paper py-4">
          <Button className="w-full rounded-lg" disabled={!canPost} onClick={publish}>
            Post to Referral
          </Button>
        </div>
      </div>
    </div>
  )
}
