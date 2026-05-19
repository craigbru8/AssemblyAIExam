/* global Float32Array, AudioWorkletProcessor, registerProcessor */
class CaptureWorkletProcessor extends AudioWorkletProcessor {
  process(inputs /* , outputs , parameters */) {
    const ch0 = inputs[0]?.[0]
    if (!ch0?.length) return true

    const copy = Float32Array.from(ch0)
    this.port.postMessage(copy.buffer, [copy.buffer])
    return true
  }
}

registerProcessor('capture-worklet-v1', CaptureWorkletProcessor)
