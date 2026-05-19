'use client'

import { useCallback, useRef, useState } from 'react'

import { AgentAudioPlayer } from '@/lib/audio/agent-audio-player'
import { base64PCM16ToInt16, pcm16ToBase64, downsampleFloat32ToPCM16 } from '@/lib/audio/pcm'

const AGENT_WS = 'wss://agents.assemblyai.com/v1/ws'
/** ~50 ms of mono PCM16 audio at Voice Agent ingress rate (~24 kHz) */
const TARGET_SEND_SAMPLES = 1200

type VoiceStatus =
  | 'idle'
  | 'loading-context'
  | 'connecting'
  | 'awaiting-session'
  | 'connected'
  | 'error'

type BrainContextResp = {
  systemPrompt: string
  greeting: string
}

function concatInt16(a: Int16Array, b: Int16Array) {
  const out = new Int16Array(a.length + b.length)
  out.set(a)
  out.set(b, a.length)
  return out
}

export function useVoiceAgent() {
  const [status, setStatus] = useState<VoiceStatus>('idle')
  const [userTranscript, setUserTranscript] = useState('')
  const [agentTranscript, setAgentTranscript] = useState('')
  const [log, setLog] = useState<string[]>([])
  const playerRef = useRef<AgentAudioPlayer | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const captureCtxRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<AudioWorkletNode | null>(null)
  const silentSinkRef = useRef<GainNode | null>(null)
  const pcmQueueRef = useRef<Int16Array>(new Int16Array(0))
  const micSampleRateRef = useRef(48000)

  const pushLog = useCallback((line: string) => {
    setLog((p) => [...p.slice(-60), `[${new Date().toISOString().slice(11, 23)}] ${line}`])
  }, [])

  const teardownCapture = useCallback(() => {
    try {
      processorRef.current?.disconnect()
      silentSinkRef.current?.disconnect()
    } catch {
      /* noop */
    }
    processorRef.current = null
    silentSinkRef.current = null
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop())
    mediaStreamRef.current = null
    pcmQueueRef.current = new Int16Array(0)
    captureCtxRef.current?.close().catch(() => {})
    captureCtxRef.current = null
  }, [])

  const flushOutgoingAudio = useCallback(() => {
    const ws = wsRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return

    while (pcmQueueRef.current.length >= TARGET_SEND_SAMPLES) {
      const frame = pcmQueueRef.current.slice(0, TARGET_SEND_SAMPLES)
      pcmQueueRef.current = pcmQueueRef.current.slice(TARGET_SEND_SAMPLES)
      const audio = pcm16ToBase64(frame)
      ws.send(JSON.stringify({ type: 'input.audio', audio }))
    }
  }, [])

  const feedMicSamples = useCallback(
    (floatChunk: Float32Array) => {
      if (floatChunk.length === 0) return

      const sr = micSampleRateRef.current

      /** Per-chunk resample keeps buffering simple for this harness. */
      const pcmPiece = downsampleFloat32ToPCM16(floatChunk, sr, 24000)
      if (pcmPiece.length === 0) return

      pcmQueueRef.current = concatInt16(pcmQueueRef.current, pcmPiece)
      flushOutgoingAudio()
    },
    [flushOutgoingAudio],
  )

  const startMicAfterReady = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    })

    mediaStreamRef.current = stream
    const captureCtx = new AudioContext()
    captureCtxRef.current = captureCtx
    micSampleRateRef.current = captureCtx.sampleRate
    await captureCtx.resume()
    await captureCtx.audioWorklet.addModule('/capture-worklet.js')

    const mic = captureCtx.createMediaStreamSource(stream)
    const processor = new AudioWorkletNode(captureCtx, 'capture-worklet-v1')
    processor.port.onmessage = (ev: MessageEvent<ArrayBuffer>) => {
      try {
        const chunk = new Float32Array(ev.data)
        feedMicSamples(chunk)
      } catch (e) {
        pushLog(`mic processor error ${e}`)
      }
    }
    mic.connect(processor)

    // Keep the worklet in the active audio graph without playing mic audio locally.
    const silentSink = captureCtx.createGain()
    silentSink.gain.value = 0
    processor.connect(silentSink)
    silentSink.connect(captureCtx.destination)
    processorRef.current = processor
    silentSinkRef.current = silentSink

    pcmQueueRef.current = new Int16Array(0)
    pushLog(`microphone armed @ ~${captureCtx.sampleRate}Hz capture → ~24 kHz egress`)
  }, [feedMicSamples, pushLog])

  const handleAgentEvent = useCallback(
    async (payload: Record<string, unknown>) => {
      const t = typeof payload.type === 'string' ? payload.type : ''

      if (
        (t === 'transcript.user.delta' || t === 'transcript.user.partial') &&
        (typeof payload.text === 'string' || typeof payload.delta === 'string')
      ) {
        const delta =
          (typeof payload.text === 'string' && payload.text) ||
          (typeof payload.delta === 'string' ? payload.delta : '') ||
          ''
        if (delta) setUserTranscript((p) => p + delta)
        return
      }

      if (
        (t === 'transcript.agent.delta' || t === 'transcript.agent.partial') &&
        (typeof payload.text === 'string' || typeof payload.delta === 'string')
      ) {
        const delta =
          (typeof payload.text === 'string' && payload.text) ||
          (typeof payload.delta === 'string' ? payload.delta : '') ||
          ''
        if (delta) setAgentTranscript((p) => p + delta)
        return
      }

      switch (t) {
        case 'session.ready':
          pushLog(`session.ready id=${payload.session_id ?? '(unknown)'}`)
          setStatus('connected')
          try {
            await startMicAfterReady()
          } catch (e) {
            setStatus('error')
            pushLog(`mic failure ${String(e)}`)
          }
          return
        case 'transcript.user': {
          const text = typeof payload.text === 'string' ? payload.text : ''
          if (text.trim()) setUserTranscript(text)
          return
        }
        case 'transcript.agent': {
          const text = typeof payload.text === 'string' ? payload.text : ''
          if (text.trim()) setAgentTranscript(text)
          return
        }
        case 'reply.audio': {
          const payloadData = typeof payload.data === 'string' ? payload.data : null
          if (!payloadData) return
          playerRef.current ??= new AgentAudioPlayer()
          const pcm16 = base64PCM16ToInt16(payloadData)
          await playerRef.current.resumeIfSuspended()
          playerRef.current.enqueueInt16PCM(pcm16)
          return
        }
        case 'reply.done': {
          if (payload.status === 'interrupted') {
            playerRef.current?.flushInterrupted()
          }
          return
        }
        default:
          if (t.endsWith('.error')) {
            setStatus('error')
            pushLog(`agent pipeline error payload=${JSON.stringify(payload)}`)
          }
      }
    },
    [pushLog, startMicAfterReady],
  )

  const shutdownTransport = useCallback(() => {
    teardownCapture()
    try {
      wsRef.current?.close()
    } catch {
      /* noop */
    }
    wsRef.current = null
    playerRef.current?.dispose()
    playerRef.current = null
  }, [teardownCapture])

  const disconnect = useCallback(() => {
    shutdownTransport()
    setStatus('idle')
    pushLog('disconnected cleanly')
  }, [pushLog, shutdownTransport])

  const connect = useCallback(async () => {
    if (typeof window === 'undefined') return

    shutdownTransport()

    setUserTranscript('')
    setAgentTranscript('')
    setLog([])
    setStatus('loading-context')

    try {
      const ctxRes = await fetch('/api/brain/context')
      if (!ctxRes.ok) throw new Error(`brain/context ${ctxRes.status}`)
      const ctxJson = (await ctxRes.json()) as BrainContextResp | { error?: unknown }

      if (!('systemPrompt' in ctxJson) || typeof ctxJson.systemPrompt !== 'string') {
        throw new Error('brain context malformed')
      }

      const tokenRes = await fetch('/api/agent/token')
      if (!tokenRes.ok) throw new Error(`token mint ${tokenRes.status}`)
      const tokJson = (await tokenRes.json()) as { token?: string }

      const token = tokJson.token ? String(tokJson.token) : ''
      if (!token) throw new Error('missing token payload')

      setStatus('connecting')
      pushLog(`connecting websocket (token len=${token.length})`)

      const wsUrl = `${AGENT_WS}?token=${encodeURIComponent(token)}`

      await new Promise<void>((resolve, reject) => {
        let settled = false

        function settleErr(err: Error) {
          if (settled) return
          settled = true
          reject(err)
        }

        function settleOk() {
          if (settled) return
          settled = true
          resolve()
        }

        const ws = new WebSocket(wsUrl)
        wsRef.current = ws

        ws.binaryType = 'blob'

        ws.onopen = () => {
          const sessionPayload = {
            type: 'session.update',
            session: {
              system_prompt: ctxJson.systemPrompt,
              greeting: typeof ctxJson.greeting === 'string' ? ctxJson.greeting : undefined,
              input: {
                format: { encoding: 'audio/pcm' },
                keyterms: [
                  'Aniline Interpretation',
                  'Plexus Health',
                  'DriveLine AI',
                  'Marco',
                  'inactivity_timeout',
                  'disconnect(terminate=True)',
                  'Universal-3',
                ],
                turn_detection: {
                  vad_threshold: 0.5,
                  min_silence: 200,
                  max_silence: 1000,
                  interrupt_response: true,
                },
              },
              output: {
                voice: 'ivy',
                format: { encoding: 'audio/pcm' },
              },
            },
          }
          ws.send(JSON.stringify(sessionPayload))
          pushLog('session.update sent')
          settleOk()
        }

        ws.onmessage = async (evt) => {
          try {
            const text = typeof evt.data === 'string' ? evt.data : await blobToUtf8(evt.data as Blob)
            const payloadUnknown: unknown = JSON.parse(text)

            await handleAgentEvent(payloadUnknown as Record<string, unknown>)
          } catch (e) {
            pushLog(`onmessage failure ${String(e)}`)
          }
        }

        ws.onerror = () => {
          setStatus('error')
          settleErr(new Error('websocket error'))
          pushLog('WebSocket emitted error — verify ASSEMBLYAI_API_KEY server env + token route')
        }

        ws.onclose = () => {
          teardownCapture()
          playerRef.current?.dispose()
          playerRef.current = null
          if (wsRef.current === ws) wsRef.current = null
          pushLog('WebSocket closed')
          setStatus((prev) => (prev === 'error' ? prev : 'idle'))
        }
      })

      setStatus('awaiting-session')
    } catch (e) {
      setStatus('error')
      pushLog(`connection failure ${String(e)}`)
      shutdownTransport()
    }
  }, [handleAgentEvent, pushLog, shutdownTransport, teardownCapture])

  return {
    status,
    connect,
    disconnect,
    userTranscript,
    agentTranscript,
    log,
  }
}

async function blobToUtf8(blob: Blob) {
  return await blob.text()
}
