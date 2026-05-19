import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import MarkdownContent from '@/components/markdown-content'
import VoiceAgentPanel from '@/components/voice-agent/voice-agent-panel'
import { brainDir } from '@/lib/project-paths'

export default function BrainHubPage() {
  const brains = readdirSync(brainDir())
    .filter((f) => f.endsWith('.brain.md'))
    .sort()

  const items = brains.map((file) => ({
    id: encodeURIComponent(file),
    file,
    md: readFileSync(join(brainDir(), file), 'utf8'),
  }))

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold text-[var(--fg)]">Methodology dossier + live voice tutor</h2>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)] leading-relaxed">
          Each collapsible appendix distills reasoning for a subsection of Parts 1–2. Voice Agent consumes
          the same markdown plus submission excerpts assembled server-side at{' '}
          <code className="text-[var(--accent)]">GET /api/brain/context</code>.
        </p>
      </div>

      <VoiceAgentPanel />

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--fg)]">Brain appendices (.brain.md)</h3>
        <p className="text-sm text-[var(--muted)]">
          Anchors mirror filenames so links from Parts 1/2 resolve here (e.g.{' '}
          <code>part-1-aniline.brain.md</code>).
        </p>
        <div className="space-y-3">
          {items.map(({ id, file, md }) => (
            <details
              key={file}
              id={id}
              className="group rounded-xl border border-[#1f2937] bg-[#0f1623]/80 px-5 py-3"
            >
              <summary className="cursor-pointer list-none py-2 text-sm font-medium text-[var(--accent)] marker:content-none">
                <span className="underline decoration-[#334155] decoration-2 underline-offset-4 group-open:decoration-[var(--accent)]">
                  {file}
                </span>
              </summary>
              <div className="border-t border-[#1f2937] pb-4 pt-4">
                <MarkdownContent markdown={md} />
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
