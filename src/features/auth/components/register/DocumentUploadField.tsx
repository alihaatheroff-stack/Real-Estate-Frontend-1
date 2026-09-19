import { useEffect, useId, useState, type DragEvent } from 'react'
import { Upload } from 'lucide-react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { cn } from '@/shared/lib/cn'
import { renderPdfFirstPagePreview } from '@/shared/lib/pdfPreview'
export const DOCUMENT_UPLOAD_ACCEPT = 'image/*,.pdf'
export const DOCUMENT_UPLOAD_EXTENSIONS_HINT =
  '.jpg, .jpeg, .png, .pdf'

function isAcceptedFile(file: File) {
  return (
    file.type.startsWith('image/') ||
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  )
}

export function DocumentUploadField({
  label,
  name,
  file,
  onChange,
  showLabel = true,
}: {
  label: string
  name: string
  file: File | null
  onChange: (file: File | null) => void
  showLabel?: boolean
}) {
  const inputId = useId()
  const [dragging, setDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewKind, setPreviewKind] = useState<'image' | 'pdf-image' | 'pdf-embed' | null>(
    null,
  )
  const [pdfPreviewLoading, setPdfPreviewLoading] = useState(false)
  const isPdf = Boolean(
    file &&
    (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')),
  )
  const showDocumentPreview = Boolean(previewUrl && previewKind)
  const hasPreview = showDocumentPreview || (isPdf && pdfPreviewLoading)

  useEffect(() => {
    let cancelled = false
    let objectUrl: string | null = null

    async function loadPreview() {
      if (!file) {
        setPreviewUrl(null)
        setPreviewKind(null)
        setPdfPreviewLoading(false)
        return
      }

      if (file.type.startsWith('image/')) {
        objectUrl = URL.createObjectURL(file)
        if (!cancelled) {
          setPreviewUrl(objectUrl)
          setPreviewKind('image')
          setPdfPreviewLoading(false)
        }
        return
      }

      if (
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf')
      ) {
        // Show the certificate immediately via native PDF embed, then upgrade
        // to a clean first-page image when pdf.js rendering succeeds.
        objectUrl = URL.createObjectURL(file)
        if (!cancelled) {
          setPreviewUrl(objectUrl)
          setPreviewKind('pdf-embed')
          setPdfPreviewLoading(true)
        }

        try {
          const dataUrl = await renderPdfFirstPagePreview(file)
          if (!cancelled) {
            setPreviewUrl(dataUrl)
            setPreviewKind('pdf-image')
            if (objectUrl) {
              URL.revokeObjectURL(objectUrl)
              objectUrl = null
            }
          }
        } catch (error) {
          console.error('PDF canvas preview failed, keeping embedded PDF:', error)
        } finally {
          if (!cancelled) setPdfPreviewLoading(false)
        }
      }
    }

    void loadPreview()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  function takeFile(next: File | null | undefined) {
    if (!next) {
      onChange(null)
      return
    }
    if (!isAcceptedFile(next)) return
    onChange(next)
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragging(false)
    takeFile(e.dataTransfer.files?.[0])
  }

  return (
    <div className="w-full space-y-2">
      {showLabel ? (
        <span className="inline-flex items-center gap-1 text-sm font-bold text-ink">
          {label}
          <FieldQaMark field={label} />
        </span>
      ) : null}
      <label
        htmlFor={inputId}
        onDragEnter={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragging(false)
        }}
        onDrop={handleDrop}
        className={cn(
          'relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed text-center transition',
          dragging
            ? 'border-brand bg-brand-light/30'
            : file
              ? 'border-brand/50 bg-paper'
              : 'border-line bg-paper hover:border-brand/40 hover:bg-brand-light/10',
          hasPreview
            ? 'h-auto gap-2 p-2'
            : 'h-[19.43rem] gap-3 px-3 py-[3.26rem] sm:h-[21.53rem] sm:py-[3.78rem]',
        )}
      >
        {showDocumentPreview ? (
          <>
            {previewKind === 'pdf-embed' ? (
              <iframe
                src={`${previewUrl!}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={file?.name ? `${file.name} preview` : 'Uploaded certificate preview'}
                className="pointer-events-none block h-[19.43rem] w-full rounded-lg border-0 bg-white sm:h-[21.53rem]"
              />
            ) : (
              <img
                src={previewUrl!}
                alt={file?.name ? `${file.name} preview` : 'Uploaded document preview'}
                className="block h-auto w-full rounded-lg bg-white"
              />
            )}
            <span className="text-sm font-semibold text-brand">Click to replace</span>
          </>
        ) : isPdf && pdfPreviewLoading ? (
          <span className="py-10 text-sm font-semibold text-muted">
            Loading certificate preview…
          </span>
        ) : (
          <>
            <Upload
              className={cn(
                'h-20 w-20 shrink-0 transition-colors',
                dragging || file ? 'text-brand' : 'text-muted',
              )}
              strokeWidth={1.5}
            />
            <span className="w-[92%] text-[1.65rem] font-semibold leading-snug text-ink sm:text-[1.85rem]">
              {file ? file.name : 'Drag and drop, or click to upload'}
            </span>
            <span className="w-[92%] text-[1.25rem] text-muted sm:text-[1.4rem]">
              {file ? 'Click to replace' : DOCUMENT_UPLOAD_EXTENSIONS_HINT}
            </span>
          </>
        )}
        <input
          id={inputId}
          key={file ? file.name + file.lastModified : 'empty'}
          type="file"
          name={name}
          accept={DOCUMENT_UPLOAD_ACCEPT}
          className="sr-only"
          aria-label={label}
          onChange={(e) => takeFile(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  )
}
