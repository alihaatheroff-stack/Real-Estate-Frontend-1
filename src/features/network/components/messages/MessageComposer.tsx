import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  Camera,
  Check,
  Circle,
  FileText,
  ImagePlus,
  Mic,
  Paperclip,
  Pause,
  PenLine,
  Send,
  Smile,
  SwitchCamera,
  Trash2,
  Video,
  X,
} from 'lucide-react'
import { EMOJI_CATEGORIES } from '@/features/network/components/messages/emojiCategories'
import type { ChatAttachment } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

type Picker = 'none' | 'emoji' | 'attach'

type FileInputMode = 'image' | 'video' | 'file' | 'camera'

type VoiceRecording = {
  status: 'recording' | 'preview'
  elapsedMs: number
  url?: string
  blob?: Blob
  error?: string
}

export function MessageComposer({
  draft,
  onDraft,
  onSend,
}: {
  draft: string
  onDraft: (value: string) => void
  onSend: (payload: { text: string; attachments: ChatAttachment[] }) => void
}) {
  const [picker, setPicker] = useState<Picker>('none')
  const [emojiTab, setEmojiTab] = useState<(typeof EMOJI_CATEGORIES)[number]['id']>('smileys')
  const [pending, setPending] = useState<ChatAttachment[]>([])
  const [voice, setVoice] = useState<VoiceRecording | null>(null)
  const [videoNoteOpen, setVideoNoteOpen] = useState(false)
  const [eSignOpen, setESignOpen] = useState(false)
  const rootRef = useRef<HTMLFormElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const startedAtRef = useRef(0)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setPicker('none')
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setPicker('none')
        if (!videoNoteOpen) setVoice(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [videoNoteOpen])

  useEffect(() => {
    return () => {
      stopVoiceTracks()
      if (timerRef.current != null) window.clearInterval(timerRef.current)
      pending.forEach((file) => {
        if (file.url) URL.revokeObjectURL(file.url)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup on unmount only
  }, [])

  function toggle(next: Picker) {
    setPicker((current) => (current === next ? 'none' : next))
  }

  function insertEmoji(emoji: string) {
    onDraft(`${draft}${emoji}`)
    inputRef.current?.focus()
  }

  function openFiles(mode: FileInputMode) {
    setPicker('none')
    const input = fileRef.current
    if (!input) return
    input.accept =
      mode === 'image' || mode === 'camera'
        ? 'image/*'
        : mode === 'video'
          ? 'video/*'
          : '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip'
    input.multiple = mode !== 'camera'
    if (mode === 'camera') input.setAttribute('capture', 'environment')
    else input.removeAttribute('capture')
    input.click()
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return
    const next = files.map((file) => fileToAttachment(file))
    setPending((current) => [...current, ...next])
  }

  function removePending(id: string) {
    setPending((current) => {
      const target = current.find((item) => item.id === id)
      if (target?.url) URL.revokeObjectURL(target.url)
      return current.filter((item) => item.id !== id)
    })
  }

  function stopVoiceTracks() {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    mediaRecorderRef.current = null
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop())
    mediaStreamRef.current = null
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  async function startVoiceNote() {
    setPicker('none')
    if (!navigator.mediaDevices?.getUserMedia) {
      setVoice({ status: 'preview', elapsedMs: 0, error: 'Voice notes are not supported in this browser.' })
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      chunksRef.current = []
      const mimeType = pickMimeType(['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'])
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        const url = URL.createObjectURL(blob)
        const elapsedMs = Date.now() - startedAtRef.current
        setVoice({ status: 'preview', elapsedMs, url, blob })
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop())
        mediaStreamRef.current = null
      }
      startedAtRef.current = Date.now()
      setVoice({ status: 'recording', elapsedMs: 0 })
      recorder.start()
      timerRef.current = window.setInterval(() => {
        setVoice((current) =>
          current?.status === 'recording'
            ? { ...current, elapsedMs: Date.now() - startedAtRef.current }
            : current,
        )
      }, 200)
    } catch {
      setVoice({
        status: 'preview',
        elapsedMs: 0,
        error: 'Microphone permission is required for voice notes.',
      })
    }
  }

  function stopVoiceNote() {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    } else {
      stopVoiceTracks()
      setVoice(null)
    }
  }

  function cancelVoiceNote() {
    stopVoiceTracks()
    if (voice?.url) URL.revokeObjectURL(voice.url)
    setVoice(null)
  }

  function sendVoiceNote() {
    if (!voice?.blob || !voice.url) return
    const attachment: ChatAttachment = {
      id: `voice-${Date.now()}`,
      name: 'Voice note',
      kind: 'audio',
      url: voice.url,
      sizeLabel: formatDuration(voice.elapsedMs),
      durationMs: voice.elapsedMs,
    }
    onSend({ text: '', attachments: [attachment] })
    setVoice(null)
    setPending([])
    setPicker('none')
  }

  function sendVideoNote(attachment: ChatAttachment) {
    onSend({ text: '', attachments: [attachment] })
    setVideoNoteOpen(false)
    setPending([])
    setPicker('none')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text && pending.length === 0) return
    onSend({ text, attachments: pending })
    setPending([])
    setPicker('none')
  }

  const canSend = Boolean(draft.trim() || pending.length)

  return (
    <>
      <form
        ref={rootRef}
        onSubmit={submit}
        className="relative shrink-0 border-t border-black/[0.04] bg-white px-3 py-3 sm:px-4"
      >
        <input ref={fileRef} type="file" className="sr-only" onChange={onFiles} />

        {picker === 'attach' ? (
          <div className="absolute bottom-[calc(100%-8px)] left-3 z-20 w-[236px] overflow-hidden rounded-2xl bg-white py-1 shadow-[0_16px_40px_rgba(15,31,26,0.14)] ring-1 ring-black/[0.06]">
            <AttachOption icon={Video} label="Videos" hint="MP4, MOV" onClick={() => openFiles('video')} />
            <AttachOption icon={Camera} label="Camera" hint="Take a photo" onClick={() => openFiles('camera')} />
            <AttachOption icon={ImagePlus} label="Photos" hint="JPG, PNG, WEBP" onClick={() => openFiles('image')} />
            <AttachOption icon={FileText} label="Documents" hint="PDF, Word, Excel" onClick={() => openFiles('file')} />
            <AttachOption
              icon={PenLine}
              label="E-sign"
              hint="Draw & send a signature"
              onClick={() => {
                setPicker('none')
                setESignOpen(true)
              }}
            />
          </div>
        ) : null}

        {picker === 'emoji' ? (
          <div className="absolute right-3 bottom-[calc(100%-8px)] left-3 z-20 overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(15,31,26,0.14)] ring-1 ring-black/[0.06] sm:left-auto sm:w-[340px]">
            <div className="flex gap-1 border-b border-black/[0.06] px-2 pt-2">
              {EMOJI_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setEmojiTab(category.id)}
                  className={cn(
                    'h-8 rounded-full px-3 text-xs font-semibold',
                    emojiTab === category.id ? 'bg-brand text-white' : 'text-muted hover:bg-mist',
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="network-thin-scroll grid max-h-52 grid-cols-8 gap-1 overflow-y-auto p-2">
              {EMOJI_CATEGORIES.find((category) => category.id === emojiTab)?.emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="grid size-9 place-items-center rounded-lg text-lg hover:bg-mist"
                  onClick={() => insertEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {pending.length > 0 ? (
          <ul className="network-hide-scroll mb-2 flex gap-2 overflow-x-auto pb-1">
            {pending.map((file) => (
              <li
                key={file.id}
                className="relative flex min-w-0 shrink-0 items-center gap-2 rounded-2xl bg-[#F3F6F4] py-1.5 pr-8 pl-1.5 ring-1 ring-black/[0.04]"
              >
                {file.kind === 'image' && file.url ? (
                  <img src={file.url} alt="" className="size-10 rounded-xl object-cover" />
                ) : file.kind === 'video-note' && file.url ? (
                  <span className="relative size-10 overflow-hidden rounded-full bg-ink">
                    <video src={file.url} className="size-full object-cover" muted />
                  </span>
                ) : (
                  <span className="grid size-10 place-items-center rounded-xl bg-white text-brand">
                    {file.kind === 'audio' ? (
                      <Mic className="size-4" />
                    ) : file.kind === 'video' || file.kind === 'video-note' ? (
                      <Video className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </span>
                )}
                <span className="max-w-[120px]">
                  <span className="block truncate text-xs font-semibold text-ink">{file.name}</span>
                  <span className="block text-[11px] text-muted">{file.sizeLabel}</span>
                </span>
                <button
                  type="button"
                  className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-white text-muted hover:text-ink"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removePending(file.id)}
                >
                  <X className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {voice ? (
          <div className="mb-2 flex items-center gap-2 rounded-2xl bg-[#F3F6F4] px-3 py-2.5 ring-1 ring-black/[0.04]">
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-red-600"
              aria-label="Cancel voice note"
              onClick={cancelVoiceNote}
            >
              <Trash2 className="size-4" />
            </button>
            <div className="min-w-0 flex-1">
              {voice.error ? (
                <p className="text-sm text-red-600">{voice.error}</p>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'size-2 rounded-full',
                        voice.status === 'recording' ? 'animate-pulse bg-red-500' : 'bg-brand',
                      )}
                    />
                    <span className="text-sm font-semibold tabular-nums text-ink">
                      {formatDuration(voice.elapsedMs)}
                    </span>
                    <span className="text-xs text-muted">
                      {voice.status === 'recording' ? 'Recording…' : 'Voice note ready'}
                    </span>
                  </div>
                  {voice.status === 'preview' && voice.url ? (
                    <audio src={voice.url} controls className="mt-2 h-8 w-full max-w-full" />
                  ) : (
                    <div className="mt-2 flex h-2 items-center gap-0.5">
                      {Array.from({ length: 28 }).map((_, index) => (
                        <span
                          key={index}
                          className="w-1 rounded-full bg-brand/40"
                          style={{ height: `${6 + ((index * 7) % 14)}px` }}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            {voice.status === 'recording' ? (
              <button
                type="button"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white"
                aria-label="Stop recording"
                onClick={stopVoiceNote}
              >
                <Pause className="size-[18px]" fill="currentColor" />
              </button>
            ) : voice.error ? null : (
              <button
                type="button"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white"
                aria-label="Send voice note"
                onClick={sendVoiceNote}
              >
                <Check className="size-[18px]" strokeWidth={2.5} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-full transition',
                picker === 'attach' ? 'bg-brand-light text-brand' : 'text-muted hover:bg-mist hover:text-ink',
              )}
              aria-label="Attach file"
              aria-expanded={picker === 'attach'}
              onClick={() => toggle('attach')}
            >
              <Paperclip className="size-[18px]" />
            </button>
            <div className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => onDraft(event.target.value)}
                placeholder="Type a message..."
                className="h-12 w-full rounded-full bg-[#F3F6F4] py-2 pr-12 pl-4 text-sm outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-brand/30"
              />
              <button
                type="button"
                className={cn(
                  'absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full',
                  picker === 'emoji' ? 'bg-white text-brand' : 'text-muted hover:bg-white hover:text-ink',
                )}
                aria-label="Emoji"
                aria-expanded={picker === 'emoji'}
                onClick={() => toggle('emoji')}
              >
                <Smile className="size-[18px]" />
              </button>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full text-ink/70 transition hover:bg-mist hover:text-ink"
                aria-label="Record video note"
                title="Video note"
                onClick={() => setVideoNoteOpen(true)}
              >
                <Video className="size-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full text-ink/70 transition hover:bg-mist hover:text-ink"
                aria-label="Record voice note"
                title="Voice note"
                onClick={startVoiceNote}
              >
                <Mic className="size-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="submit"
                disabled={!canSend}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-mist disabled:text-muted"
                aria-label="Send message"
              >
                <Send className="size-[18px]" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        )}
      </form>

      {videoNoteOpen ? (
        <VideoNoteRecorder onCancel={() => setVideoNoteOpen(false)} onSend={sendVideoNote} />
      ) : null}

      {eSignOpen ? (
        <ESignPad
          onCancel={() => setESignOpen(false)}
          onDone={(attachment) => {
            setPending((current) => [...current, attachment])
            setESignOpen(false)
          }}
        />
      ) : null}
    </>
  )
}

function ESignPad({
  onCancel,
  onDone,
}: {
  onCancel: () => void
  onDone: (attachment: ChatAttachment) => void
}) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const trimmed = name.trim()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function saveSignature() {
    if (!trimmed) return

    // Ensure cursive font is ready before rasterizing.
    try {
      await document.fonts.load('700 48px "Dancing Script"')
    } catch {
      // fall through with system cursive
    }

    const canvas = document.createElement('canvas')
    const width = 640
    const height = 220
    const ratio = window.devicePixelRatio || 1
    canvas.width = width * ratio
    canvas.height = height * ratio
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(ratio, ratio)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#0F1F1A'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '700 52px "Dancing Script", "Segoe Script", "Apple Chancery", cursive'
    ctx.fillText(trimmed, width / 2, height / 2)

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        onDone({
          id: `esign-${Date.now()}`,
          name: 'E-signature.png',
          kind: 'image',
          url,
          sizeLabel: 'Signature',
        })
      },
      'image/png',
    )
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-3 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
          <button type="button" className="text-sm font-medium text-muted hover:text-ink" onClick={onCancel}>
            Cancel
          </button>
          <p className="text-sm font-semibold text-ink">E-sign</p>
          <button
            type="button"
            className="text-sm font-semibold text-brand disabled:text-muted"
            disabled={!trimmed}
            onClick={() => void saveSignature()}
          >
            Done
          </button>
        </div>

        <div className="space-y-3 px-4 pt-4 pb-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Type your name</span>
            <input
              ref={inputRef}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className="h-11 w-full rounded-xl border border-line bg-[#F7FAF8] px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <div
            ref={previewRef}
            className="flex min-h-[140px] items-center justify-center rounded-2xl border border-dashed border-line bg-white px-4 py-6"
          >
            {trimmed ? (
              <p
                className="max-w-full break-words text-center text-[42px] leading-tight text-ink"
                style={{ fontFamily: '"Dancing Script", "Segoe Script", "Apple Chancery", cursive' }}
              >
                {name}
              </p>
            ) : (
              <p
                className="text-center text-[28px] text-muted/50"
                style={{ fontFamily: '"Dancing Script", "Segoe Script", "Apple Chancery", cursive' }}
              >
                Your signature
              </p>
            )}
          </div>
          <p className="text-xs text-muted">Whatever you type appears above in cursive signature style.</p>
        </div>

        <div className="flex items-center justify-between gap-2 px-4 pt-1 pb-4">
          <button
            type="button"
            className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-mist hover:text-ink"
            onClick={() => setName('')}
          >
            Clear
          </button>
          <button
            type="button"
            disabled={!trimmed}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white disabled:bg-mist disabled:text-muted"
            onClick={() => void saveSignature()}
          >
            <PenLine className="size-4" />
            Attach signature
          </button>
        </div>
      </div>
    </div>
  )
}

function VideoNoteRecorder({
  onCancel,
  onSend,
}: {
  onCancel: () => void
  onSend: (attachment: ChatAttachment) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const startedAtRef = useRef(0)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
  const [status, setStatus] = useState<'booting' | 'ready' | 'recording' | 'preview' | 'error'>('booting')
  const [elapsedMs, setElapsedMs] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function boot() {
      setStatus('booting')
      setError(null)
      try {
        streamRef.current?.getTracks().forEach((track) => track.stop())
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 720 },
            height: { ideal: 720 },
          },
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => undefined)
        }
        setStatus('ready')
      } catch {
        if (!cancelled) {
          setError('Camera permission is required for video notes.')
          setStatus('error')
        }
      }
    }

    void boot()

    return () => {
      cancelled = true
      if (timerRef.current != null) window.clearInterval(timerRef.current)
      recorderRef.current?.state === 'recording' && recorderRef.current.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [facingMode])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function startRecording() {
    const stream = streamRef.current
    if (!stream) return
    chunksRef.current = []
    const mimeType = pickMimeType([
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
    ])
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
    recorderRef.current = recorder
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data)
    }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'video/webm' })
      const url = URL.createObjectURL(blob)
      setPreviewBlob(blob)
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current)
        return url
      })
      setElapsedMs(Date.now() - startedAtRef.current)
      setStatus('preview')
      if (videoRef.current) {
        videoRef.current.srcObject = null
        videoRef.current.src = url
        videoRef.current.controls = true
        void videoRef.current.play().catch(() => undefined)
      }
    }
    startedAtRef.current = Date.now()
    setElapsedMs(0)
    setStatus('recording')
    recorder.start()
    timerRef.current = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current)
    }, 200)
  }

  function stopRecording() {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }

  function retake() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setPreviewBlob(null)
    setElapsedMs(0)
    if (videoRef.current && streamRef.current) {
      videoRef.current.controls = false
      videoRef.current.removeAttribute('src')
      videoRef.current.srcObject = streamRef.current
      void videoRef.current.play().catch(() => undefined)
      setStatus('ready')
      return
    }
    setStatus('booting')
    setFacingMode((mode) => mode)
  }

  function send() {
    if (!previewBlob || !previewUrl) return
    onSend({
      id: `video-note-${Date.now()}`,
      name: 'Video note',
      kind: 'video-note',
      url: previewUrl,
      sizeLabel: formatDuration(elapsedMs),
      durationMs: elapsedMs,
    })
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="relative flex w-full max-w-sm flex-col items-center gap-4 rounded-[28px] bg-[#0F1F1A] p-5 text-white shadow-2xl">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            className="rounded-full p-2 text-white/80 hover:bg-white/10"
            aria-label="Close video note"
            onClick={onCancel}
          >
            <X className="size-5" />
          </button>
          <p className="text-sm font-semibold">Video note</p>
          <button
            type="button"
            className="rounded-full p-2 text-white/80 hover:bg-white/10 disabled:opacity-40"
            aria-label="Flip camera"
            disabled={status === 'recording' || status === 'preview'}
            onClick={() => setFacingMode((mode) => (mode === 'user' ? 'environment' : 'user'))}
          >
            <SwitchCamera className="size-5" />
          </button>
        </div>

        <div className="relative size-[min(72vw,280px)] overflow-hidden rounded-full bg-black ring-4 ring-white/15">
          <video
            ref={videoRef}
            className={cn(
              'size-full object-cover',
              facingMode === 'user' && status !== 'preview' && 'scale-x-[-1]',
            )}
            playsInline
            muted={status !== 'preview'}
            autoPlay={status !== 'preview'}
          />
          {status === 'recording' ? (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold tabular-nums">
              {formatDuration(elapsedMs)}
            </span>
          ) : null}
        </div>

        {error ? <p className="text-center text-sm text-red-300">{error}</p> : null}

        <div className="flex items-center gap-4">
          {status === 'preview' ? (
            <>
              <button
                type="button"
                className="grid size-12 place-items-center rounded-full bg-white/10"
                aria-label="Retake"
                onClick={retake}
              >
                <Trash2 className="size-5" />
              </button>
              <button
                type="button"
                className="grid size-16 place-items-center rounded-full bg-brand"
                aria-label="Send video note"
                onClick={send}
              >
                <Check className="size-7" strokeWidth={2.5} />
              </button>
            </>
          ) : status === 'recording' ? (
            <button
              type="button"
              className="grid size-16 place-items-center rounded-full bg-red-500"
              aria-label="Stop recording"
              onClick={stopRecording}
            >
              <Pause className="size-7" fill="currentColor" />
            </button>
          ) : (
            <button
              type="button"
              className="grid size-16 place-items-center rounded-full bg-brand disabled:opacity-50"
              aria-label="Start recording"
              disabled={status !== 'ready'}
              onClick={startRecording}
            >
              <Circle className="size-8" fill="currentColor" />
            </button>
          )}
        </div>
        <p className="text-center text-xs text-white/60">
          {status === 'recording'
            ? 'Recording… tap to stop'
            : status === 'preview'
              ? 'Preview your note, then send'
              : 'Tap to record a circular video note'}
        </p>
      </div>
    </div>
  )
}

function AttachOption({
  icon: Icon,
  label,
  hint,
  onClick,
}: {
  icon: typeof ImagePlus
  label: string
  hint: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-mist"
    >
      <span className="grid size-9 place-items-center rounded-full bg-brand-light text-brand">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="block text-[11px] text-muted">{hint}</span>
      </span>
    </button>
  )
}

function fileToAttachment(file: File): ChatAttachment {
  const kind: ChatAttachment['kind'] = file.type.startsWith('image/')
    ? 'image'
    : file.type.startsWith('video/')
      ? 'video'
      : file.type.startsWith('audio/')
        ? 'audio'
        : 'file'
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    kind,
    url: kind === 'image' || kind === 'video' || kind === 'audio' ? URL.createObjectURL(file) : undefined,
    sizeLabel: formatSize(file.size),
  }
}

function pickMimeType(candidates: string[]) {
  if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return undefined
  return candidates.find((type) => MediaRecorder.isTypeSupported(type))
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.round(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}
