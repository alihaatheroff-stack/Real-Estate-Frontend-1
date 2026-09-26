import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react'
import { formatCallDuration } from '@/features/network/components/messages/callLog'
import {
  bindRingtone,
  describeMediaError,
  playEndCallTone,
  requestCallMedia,
  stopMedia,
  type CallMedia,
  type CallMode,
} from '@/features/network/components/messages/callMedia'
import { cn } from '@/shared/lib/cn'

export type CallEndResult = {
  mode: CallMode
  outcome: 'completed' | 'cancelled' | 'failed'
  durationSec: number
}

type Phase = 'requesting' | 'ringing' | 'connected' | 'error'

export function CallSession({
  mode,
  title,
  subtitle,
  avatarSrc,
  audio,
  media,
  onEnd,
}: {
  mode: CallMode
  title: string
  subtitle?: string
  avatarSrc?: string
  audio: AudioContext | null
  media: Promise<CallMedia>
  onEnd: (result: CallEndResult) => void
}) {
  const titleId = useId()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const endedRef = useRef(false)
  const secondsRef = useRef(0)
  const modeRef = useRef<CallMode>(mode)
  const phaseRef = useRef<Phase>('requesting')
  const mutedRef = useRef(false)
  const onEndRef = useRef(onEnd)
  const requestGeneration = useRef(0)

  const [request, setRequest] = useState(media)
  const [phase, setPhase] = useState<Phase>('requesting')
  const [activeMode, setActiveMode] = useState<CallMode>(mode)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraOn, setCameraOn] = useState(mode === 'video')
  const [muted, setMuted] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [level, setLevel] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [cameraBusy, setCameraBusy] = useState(false)

  onEndRef.current = onEnd
  phaseRef.current = phase
  mutedRef.current = muted
  modeRef.current = activeMode

  useEffect(() => {
    const token = ++requestGeneration.current
    let active = true
    let owned: MediaStream | null = null

    setPhase('requesting')
    setError(null)
    void request
      .then((result) => {
        if (!active) {
          if (requestGeneration.current === token) stopMedia(result.stream)
          return
        }
        owned = result.stream
        streamRef.current = result.stream
        modeRef.current = result.mode
        setStream(result.stream)
        setActiveMode(result.mode)
        setCameraOn(result.mode === 'video')
        setNotice(result.notice ?? null)
        setPhase('ringing')
      })
      .catch((caught: unknown) => {
        if (!active) return
        setError(describeMediaError(caught, mode === 'video'))
        setPhase('error')
      })

    return () => {
      active = false
      if (!owned) return
      stopMedia(owned)
      if (streamRef.current === owned) streamRef.current = null
    }
  }, [mode, request])

  useEffect(() => {
    if (phase !== 'ringing' || !audio) return
    return bindRingtone(audio)
  }, [audio, phase])

  useEffect(() => {
    if (phase !== 'connected') return
    const id = window.setInterval(() => {
      secondsRef.current += 1
      setSeconds(secondsRef.current)
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'ringing') return
    const id = window.setTimeout(() => setPhase('connected'), 1800)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (!audio || !stream || phase === 'requesting' || phase === 'error') return
    let source: MediaStreamAudioSourceNode
    try {
      source = audio.createMediaStreamSource(stream)
    } catch {
      return
    }
    const analyser = audio.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    const bins = new Uint8Array(analyser.frequencyBinCount)
    let frame = 0
    let last = 0
    const tick = () => {
      try {
        analyser.getByteFrequencyData(bins)
      } catch {
        return
      }
      let sum = 0
      for (const value of bins) sum += value
      const next = mutedRef.current ? 0 : sum / bins.length / 255
      if (Math.abs(next - last) > 0.03 || (last !== 0 && next === 0)) {
        last = next
        setLevel(next)
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(frame)
      try {
        source.disconnect()
      } catch {
        /* context already closed */
      }
    }
  }, [audio, phase, stream])

  const showVideo = activeMode === 'video' && cameraOn && Boolean(stream) && phase !== 'error'

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (!showVideo || !stream) {
      el.srcObject = null
      return
    }
    if (el.srcObject !== stream) el.srcObject = stream
    void el.play().catch(() => undefined)
  }, [showVideo, stream])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') hangUp()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    return () => {
      void audio?.close().catch(() => undefined)
    }
  }, [audio])

  function hangUp(forced?: 'failed') {
    if (endedRef.current) return
    endedRef.current = true
    const current = phaseRef.current
    const outcome: CallEndResult['outcome'] =
      forced ?? (current === 'error' ? 'failed' : current === 'connected' ? 'completed' : 'cancelled')
    if (outcome !== 'failed') playEndCallTone()
    void audio?.close().catch(() => undefined)
    stopMedia(streamRef.current)
    streamRef.current = null
    onEndRef.current({
      mode: modeRef.current,
      outcome,
      durationSec: secondsRef.current,
    })
  }

  function toggleMute() {
    const next = !mutedRef.current
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !next
    })
    mutedRef.current = next
    setMuted(next)
    if (next) setLevel(0)
  }

  function disableCamera() {
    const media = streamRef.current
    if (!media) return
    media.getVideoTracks().forEach((track) => {
      media.removeTrack(track)
      track.stop()
    })
    setStream(new MediaStream(media.getTracks()))
    setCameraOn(false)
  }

  async function enableCamera() {
    const media = streamRef.current
    if (!media || cameraBusy) return
    setCameraBusy(true)
    try {
      const extra = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      const track = extra.getVideoTracks()[0]
      if (!track || !streamRef.current) {
        stopMedia(extra)
        return
      }
      streamRef.current.addTrack(track)
      modeRef.current = 'video'
      setStream(new MediaStream(streamRef.current.getTracks()))
      setActiveMode('video')
      setCameraOn(true)
      setNotice(null)
    } catch (caught) {
      setNotice(describeMediaError(caught, true))
    } finally {
      setCameraBusy(false)
    }
  }

  const status =
    phase === 'requesting'
      ? mode === 'video'
        ? 'Allow camera and microphone to start the call'
        : 'Allow microphone access to start the call'
      : phase === 'ringing'
        ? 'Calling…'
        : phase === 'connected'
          ? activeMode === 'video'
            ? 'Video call'
            : 'Voice call'
          : 'Call failed'

  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#07131f] text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full -scale-x-100 object-cover"
          autoPlay
          playsInline
          muted
        />
      ) : null}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          showVideo
            ? 'bg-gradient-to-b from-black/55 via-transparent to-black/70'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(27,79,138,0.45),transparent_58%)]',
        )}
      />

      <header className="relative z-10 px-6 pt-8 text-center">
        <p className="text-sm font-medium text-white/75">{status}</p>
        <h2 id={titleId} className="mt-1 truncate text-2xl font-semibold">
          {title}
        </h2>
        {subtitle && phase !== 'error' ? (
          <p className="mt-1 truncate text-sm text-white/60">{subtitle}</p>
        ) : null}
        {phase === 'connected' ? (
          <p className="mt-3 font-mono text-lg tabular-nums text-white/90">{formatCallDuration(seconds)}</p>
        ) : null}
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        {showVideo ? (
          <span className="absolute bottom-6 left-6 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            You
          </span>
        ) : phase === 'error' ? (
          <div className="max-w-sm text-center">
            <p className="text-sm leading-relaxed text-white/80">{error}</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"
                onClick={() => setRequest(requestCallMedia(mode))}
              >
                Try again
              </button>
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
                onClick={() => hangUp('failed')}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="relative grid place-items-center">
            {phase === 'ringing' || phase === 'connected' ? (
              <span
                className="absolute size-40 rounded-full bg-brand/30 transition-transform duration-100"
                style={{ transform: `scale(${1.05 + level * 0.85})` }}
              />
            ) : null}
            {phase === 'ringing' ? (
              <span className="absolute size-44 animate-ping rounded-full bg-brand/25" />
            ) : null}
            <span className="relative grid size-36 place-items-center overflow-hidden rounded-full bg-brand-dark text-3xl font-semibold ring-4 ring-white/15">
              {avatarSrc ? (
                <img src={avatarSrc} alt="" className="size-full object-cover object-[center_18%]" />
              ) : (
                initials || '?'
              )}
            </span>
          </div>
        )}
        {notice && phase !== 'error' ? (
          <p className="mt-6 max-w-sm text-center text-sm text-white/75">{notice}</p>
        ) : null}
        {phase === 'connected' && !muted ? (
          <div className="mt-6 flex h-6 items-end gap-1" aria-hidden>
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                key={index}
                className="w-1.5 rounded-full bg-white/80"
                style={{ height: `${6 + Math.round(level * (8 + ((index * 7) % 16)))}px` }}
              />
            ))}
          </div>
        ) : null}
      </div>

      {phase !== 'error' ? (
        <footer className="relative z-10 flex items-end justify-center gap-6 px-6 pb-10">
          <CallControl
            label={muted ? 'Unmute' : 'Mute'}
            active={muted}
            disabled={phase === 'requesting'}
            onClick={toggleMute}
          >
            {muted ? <MicOff className="size-6" /> : <Mic className="size-6" />}
          </CallControl>
          <CallControl
            label={cameraOn ? 'Stop video' : 'Start video'}
            active={!cameraOn && activeMode === 'video'}
            disabled={phase === 'requesting' || cameraBusy}
            onClick={() => {
              if (cameraOn) disableCamera()
              else void enableCamera()
            }}
          >
            {cameraOn ? <Video className="size-6" /> : <VideoOff className="size-6" />}
          </CallControl>
          <CallControl label="End call" danger onClick={() => hangUp()}>
            <PhoneOff className="size-6" />
          </CallControl>
        </footer>
      ) : null}
      <span className="sr-only">
        {phase === 'connected' ? `Connected for ${formatCallDuration(seconds)}` : status}
        {muted ? ' Microphone muted.' : ''}
      </span>
    </div>
  )
}

function CallControl({
  label,
  children,
  onClick,
  active,
  danger,
  disabled,
}: {
  label: string
  children: ReactNode
  onClick: () => void
  active?: boolean
  danger?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      className="flex w-16 flex-col items-center gap-2 disabled:opacity-40"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={cn(
          'grid size-14 place-items-center rounded-full transition',
          danger
            ? 'bg-red-500 text-white hover:bg-red-600'
            : active
              ? 'bg-white text-ink'
              : 'bg-white/15 text-white hover:bg-white/25',
        )}
      >
        {children}
      </span>
      <span className="text-[11px] font-medium text-white/80">{label}</span>
    </button>
  )
}

