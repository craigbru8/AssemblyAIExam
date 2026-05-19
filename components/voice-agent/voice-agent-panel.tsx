'use client'

import { useVoiceAgent } from '@/components/voice-agent/use-voice-agent'

const SUGGESTED = [
  'Why rank Aniline first if Plexus is larger revenue?',
  'What would you ask Marco for if 3006 close codes persist after the patch?',
  'How does Telegraph differ from Plexus tactically?',
  'Explain session_duration_seconds vs audio_duration_seconds for DriveLine.',
]

export default function VoiceAgentPanel() {
  const { status, connect, disconnect, userTranscript, agentTranscript, log } = useVoiceAgent()

  const busy =
    status === 'loading-context' || status === 'connecting' || status === 'awaiting-session'

  return (
    <section className="aai-panel">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl space-y-2">
          <h2 className="brand-headline text-xl">Talk to my brain · Voice Agent</h2>
          <p className="text-sm text-[var(--muted)]">
            Powered by AssemblyAI Voice Agent API (<code>?token</code>&nbsp;minted securely on this
            server). Allow microphone permission after the websocket reports ready. Audio is PCM mono
            @&nbsp;~24&nbsp;kHz.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Status:{' '}
            <span className="font-semibold text-[var(--accent)] capitalize">
              {status.split('-').join(' ')}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void connect()}
            disabled={busy}
            className="brand-button disabled:opacity-40"
          >
            {busy ? 'Connecting…' : status === 'connected' ? 'Reconnect' : 'Connect'}
          </button>
          <button
            type="button"
            onClick={() => disconnect()}
            className="secondary-button hover:border-[var(--warn)] hover:text-[var(--warn)]"
          >
            Disconnect
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Try saying these</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(q).catch(() => {})
              }}
              className="prompt-chip"
              title="Click to copy this exact phrase"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-[11px] font-semibold uppercase text-[var(--muted)]">
            You · live transcript
          </h3>
          <pre className="transcript-box mt-2 text-[var(--success)]">
            {userTranscript || '(waiting for mic + speech…)'}
          </pre>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold uppercase text-[var(--muted)]">
            Agent brain · transcript
          </h3>
          <pre className="transcript-box mt-2 text-[var(--code)]">
            {agentTranscript || '(agent replies render here…)'}
          </pre>
        </div>
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-[var(--muted)]">Session debug tail</summary>
        <pre className="transcript-box mt-3 max-h-48 min-h-0 text-[10px] text-[var(--code)]">
          {log.length ? log.join('\n') : 'No instrumentation yet.'}
        </pre>
      </details>
    </section>
  )
}
