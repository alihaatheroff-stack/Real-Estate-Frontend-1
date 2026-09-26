export type CallMode = 'voice' | 'video'

export type CallMedia = {
  stream: MediaStream
  mode: CallMode
  notice?: string
}

export function requestCallMedia(mode: CallMode) {
  return acquireCallMedia(mode)
}

export function primeCallAudio() {
  const Ctx =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return null
  const ctx = new Ctx()
  void ctx.resume()
  return ctx
}

export function stopMedia(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}

async function acquireCallMedia(mode: CallMode): Promise<CallMedia> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw Object.assign(new Error('unsupported'), { name: 'unsupported' })
  }

  const audio = { echoCancellation: true, noiseSuppression: true }
  if (mode === 'voice') {
    return {
      mode: 'voice',
      stream: await navigator.mediaDevices.getUserMedia({ audio, video: false }),
    }
  }

  try {
    return {
      mode: 'video',
      stream: await navigator.mediaDevices.getUserMedia({
        audio,
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      }),
    }
  } catch (error) {
    const name = error instanceof DOMException ? error.name : ''
    if (name !== 'NotFoundError' && name !== 'OverconstrainedError' && name !== 'DevicesNotFoundError') {
      throw error
    }
    return {
      mode: 'voice',
      notice: 'No camera was found, so this is a voice call.',
      stream: await navigator.mediaDevices.getUserMedia({ audio, video: false }),
    }
  }
}

export function describeMediaError(error: unknown, video: boolean) {
  const name = error instanceof DOMException ? error.name : error instanceof Error ? error.name : ''
  const device = video ? 'camera and microphone' : 'microphone'
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return `Allow ${device} access in the browser prompt, then try again.`
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return video
      ? 'No camera or microphone was found on this device.'
      : 'No microphone was found on this device.'
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return `Your ${device} is already in use by another app.`
  }
  if (name === 'unsupported') {
    return 'This browser cannot access a microphone or camera.'
  }
  return `Could not start the ${video ? 'video' : 'voice'} call.`
}

/** Short descending hang-up tone. Uses its own context so ending the call does not cut it off. */
export function playEndCallTone() {
  const Ctx =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return
  const ctx = new Ctx()
  void ctx.resume()

  const tone = (frequency: number, when: number, duration: number, peak: number) => {
    const osc = ctx.createOscillator()
    const harmonic = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    harmonic.type = 'triangle'
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + when)
    harmonic.frequency.setValueAtTime(frequency * 2, ctx.currentTime + when)
    const start = ctx.currentTime + when
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    const body = ctx.createGain()
    body.gain.value = 0.28
    osc.connect(gain)
    harmonic.connect(body)
    body.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    harmonic.start(start)
    osc.stop(start + duration + 0.02)
    harmonic.stop(start + duration + 0.02)
  }

  tone(740, 0, 0.14, 0.22)
  tone(494, 0.16, 0.26, 0.2)

  window.setTimeout(() => {
    void ctx.close().catch(() => undefined)
  }, 800)
}

export function bindRingtone(ctx: AudioContext) {
  let timer = 0
  let stopped = false
  const oscillators = new Set<OscillatorNode>()

  const tone = (frequency: number, when: number) => {
    if (ctx.state === 'closed') return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency
    const start = ctx.currentTime + when
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.2)
    oscillators.add(osc)
    osc.onended = () => oscillators.delete(osc)
  }

  const ring = () => {
    if (stopped || ctx.state === 'closed') return
    tone(480, 0)
    tone(440, 0.22)
    timer = window.setTimeout(ring, 2600)
  }

  if (ctx.state === 'suspended') void ctx.resume()
  ring()

  return () => {
    stopped = true
    window.clearTimeout(timer)
    oscillators.forEach((osc) => {
      try {
        osc.stop()
      } catch {
        /* already stopped */
      }
    })
  }
}
