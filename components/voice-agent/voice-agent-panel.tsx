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
    <section className="rounded-xl border border-[#1f2937] bg-[var(--surface)] p-6 shadow-lg shadow-black/30">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl space-y-2">
          <h2 className="text-xl font-semibold text-[var(--fg)]">Talk to my brain · Voice Agent</h2>
          <p className="text-sm text-[var(--muted)]">
            Powered by AssemblyAI Voice Agent API (<code>?token</code>&nbsp;minted securely on this
            server). Allow microphone permission after the websocket reports ready — audio is PCM mono
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
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black disabled:opacity-40"
          >
            {busy ? 'Connecting…' : status === 'connected' ? 'Reconnect' : 'Connect'}
          </button>
          <button
            type="button"
            onClick={() => disconnect()}
            className="rounded-lg border border-[#374151] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:border-[#f97316] hover:text-[#fdba74]"
          >
            Disconnect
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Suggested prompts</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(q).catch(() => {})
              }}
              className="rounded border border-dashed border-[#374151] px-3 py-1 text-[11px] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              title="Click to copy to clipboard — paste after connecting"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            You · live transcript
          </h3>
          <pre className="mt-2 min-h-[140px] overflow-auto rounded-lg border border-[#1f2937] bg-[#0b111a] p-3 text-xs text-[#d1fae5] whitespace-pre-wrap">
            {userTranscript || '(waiting for mic + speech…)'}
          </pre>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Agent brain · transcript
          </h3>
          <pre className="mt-2 min-h-[140px] overflow-auto rounded-lg border border-[#1f2937] bg-[#0b111a] p-3 text-xs text-[#dbeafe] whitespace-pre-wrap">
            {agentTranscript || '(agent replies render here…)'}
          </pre>
        </div>
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-[var(--muted)]">Session debug tail</summary>
        <pre className="mt-3 max-h-48 overflow-auto rounded-lg border border-[#1f2937] bg-black/40 p-3 text-[10px] leading-relaxed text-[#93c5fd]">
          {log.length ? log.join('\n') : 'No instrumentation yet.'}
        </pre>
      </details>
    </section>
  )
}
