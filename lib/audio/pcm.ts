/** Downsample microphone Float32 PCM to PCM16 mono at target rate */
export function downsampleFloat32ToPCM16(
  samples: Float32Array,
  inputSampleRate: number,
  outputSampleRate: number,
): Int16Array {
  if (samples.length === 0) return new Int16Array(0)
  if (inputSampleRate <= 0 || outputSampleRate <= 0) {
    throw new Error('sample rates must be positive')
  }

  const ratio = inputSampleRate / outputSampleRate
  const outLen = Math.max(1, Math.floor(samples.length / ratio))
  const out = new Int16Array(outLen)

  for (let i = 0; i < outLen; i++) {
    const srcPos = i * ratio
    const i0 = Math.floor(srcPos)
    const frac = srcPos - i0
    const s0 = samples[i0] ?? 0
    const s1 = samples[i0 + 1] ?? s0
    const interp = s0 * (1 - frac) + s1 * frac
    const clipped = Math.max(-1, Math.min(1, interp))
    out[i] = clipped < 0 ? clipped * 0x8000 : clipped * 0x7fff
  }

  return out
}

export function pcm16ToBase64(pcm16: Int16Array): string {
  const bytes = new Uint8Array(pcm16.buffer.slice(pcm16.byteOffset, pcm16.byteOffset + pcm16.byteLength))
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!)
  return btoa(binary)
}

export function base64PCM16ToInt16(base64: string): Int16Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const i16buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
  const len = Math.floor(bytes.byteLength / 2)
  return new Int16Array(i16buf, 0, len)
}

export function int16PCMToFloat32(pcm16: Int16Array): Float32Array {
  const out = new Float32Array(pcm16.length)
  const scale = 1 / 32768
  for (let i = 0; i < pcm16.length; i++) out[i] = pcm16[i]! * scale
  return out
}

/** Linear-ish resampler for aligning Agent nominal 24k buffers to device-rate AudioContext playback. */
export function resampleLinear(input: Float32Array, sampleRateIn: number, sampleRateOut: number) {
  if (sampleRateIn === sampleRateOut) return Float32Array.from(input)
  if (sampleRateIn <= 0 || sampleRateOut <= 0) throw new Error('invalid sample rates')
  const ratio = sampleRateOut / sampleRateIn
  const outLen = Math.max(1, Math.floor(input.length * ratio))
  const out = new Float32Array(outLen)
  for (let i = 0; i < outLen; i++) {
    const pos = i / ratio
    const i0 = Math.floor(pos)
    const frac = pos - i0
    const s0 = input[i0] ?? 0
    const s1 = input[i0 + 1] ?? s0
    out[i] = s0 * (1 - frac) + s1 * frac
  }
  return out
}
