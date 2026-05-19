/* global AudioWorkletProcessor, registerProcessor */
class PlaybackWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
  /** @type {Float32Array[]} */
    this.chunks = []
    this.offset = 0

    this.port.onmessage = (ev) => {
      const { type } = ev.data ?? {}
      if (type === 'flush') {
        this.chunks = []
        this.offset = 0
        return
      }
      if (type === 'append' && ev.data.samples) {
        this.chunks.push(new Float32Array(ev.data.samples))
      }
    }
  }

  process(_inputs, outputs) {
    const out = outputs[0]?.[0]
    if (!out) return true

    for (let i = 0; i < out.length; i++) {
      if (!this.chunks.length) {
        out[i] = 0
        continue
      }
      const head = this.chunks[0]
      out[i] = head[this.offset] ?? 0
      this.offset += 1
      if (this.offset >= head.length) {
        this.chunks.shift()
        this.offset = 0
      }
    }
    return true
  }
}

registerProcessor('playback-worklet-v1', PlaybackWorkletProcessor)
