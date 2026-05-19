import { int16PCMToFloat32, resampleLinear } from '@/lib/audio/pcm'

/**
 * Drain agent reply.audio at the AudioContext clock (not wall-clock scheduling).
 * Matches Voice Agent guidance: write PCM into a buffer the OS/worklet drains at 24 kHz.
 */
export class AgentAudioPlayer {
  private ctx?: AudioContext
  private node?: AudioWorkletNode
  private ready?: Promise<void>
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

  private ensureWorklet(): Promise<void> {
    if (!this.ready) {
      this.ready = (async () => {
        const ctx = this.ctxOrThrow()
        await ctx.audioWorklet.addModule('/playback-worklet.js')
        const node = new AudioWorkletNode(ctx, 'playback-worklet-v1')
        node.connect(ctx.destination)
        this.node = node
      })()
    }
    return this.ready
  }

  async resumeIfSuspended() {
    const c = this.ctxOrThrow()
    if (c.state === 'suspended') await c.resume()
    await this.ensureWorklet()
  }

  async enqueueInt16PCM(pcm24: Int16Array) {
    if (pcm24.length === 0) return

    const ctx = this.ctxOrThrow()
    await this.resumeIfSuspended()
    const node = this.node
    if (!node) return

    const fNominal = int16PCMToFloat32(pcm24)
    const floats =
      ctx.sampleRate === this.nominalRate
        ? fNominal
        : resampleLinear(fNominal, this.nominalRate, ctx.sampleRate)

    const copy = Float32Array.from(floats)
    node.port.postMessage({ type: 'append', samples: copy.buffer }, [copy.buffer])
  }

  /** Stop stale agent playback after user barges-in. */
  flushInterrupted() {
    this.node?.port.postMessage({ type: 'flush' })
  }

  dispose() {
    try {
      this.flushInterrupted()
      this.node?.disconnect()
      void this.ctx?.close()
    } catch {
      /* noop */
    }
    this.node = undefined
    this.ctx = undefined
    this.ready = undefined
  }
}
