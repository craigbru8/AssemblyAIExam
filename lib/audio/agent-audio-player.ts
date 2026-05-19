import { int16PCMToFloat32, resampleLinear } from '@/lib/audio/pcm'

/** Schedule decoded reply.audio PCM chunks at nominal Voice Agent PCM rate (~24 kHz). */
export class AgentAudioPlayer {
  private ctx?: AudioContext
  /** Active playback nodes — stopped on interruptions */
  private active: AudioBufferSourceNode[] = []
  constructor(private readonly nominalRate = 24000) {}

  private ctxOrThrow(): AudioContext {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext({ sampleRate: this.nominalRate })
      } catch {
        this.ctx = new AudioContext()
      }
    }
    return this.ctx
  }

  async resumeIfSuspended() {
    const c = this.ctxOrThrow()
    if (c.state === 'suspended') await c.resume()
  }

  private audioSeconds = 0

  enqueueInt16PCM(pcm24: Int16Array) {
    const ctx = this.ctxOrThrow()
    if (pcm24.length === 0) return

    void this.resumeIfSuspended()

    const fNominal = int16PCMToFloat32(pcm24)
    const floats =
      ctx.sampleRate === this.nominalRate
        ? fNominal
        : resampleLinear(fNominal, this.nominalRate, ctx.sampleRate)

    const buffer = ctx.createBuffer(1, floats.length, ctx.sampleRate)
    buffer.copyToChannel(new Float32Array(floats), 0)

    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.connect(ctx.destination)

    const startAt = Math.max(ctx.currentTime, this.audioSeconds)
    src.start(startAt)
    const doneAt = startAt + buffer.duration
    this.audioSeconds = doneAt
    this.active.push(src)

    src.onended = () => {
      this.active = this.active.filter((n) => n !== src)
    }
  }

  /** Stop stale agent playback after user barges-in. */
  flushInterrupted() {
    for (const node of this.active) {
      try {
        node.stop()
        node.disconnect()
      } catch {
        /* noop */
      }
    }
    this.active = []

    const c = this.ctx
    if (c) this.audioSeconds = c.currentTime
  }

  dispose() {
    try {
      this.flushInterrupted()
      void this.ctx?.close()
    } catch {
      /* noop */
    }
    this.ctx = undefined
    this.audioSeconds = 0
  }
}
