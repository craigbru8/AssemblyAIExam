import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import MarkdownContent from '@/components/markdown-content'
import { brainDir, contentPath } from '@/lib/project-paths'
import { loadContentFile } from '@/lib/project-paths'

export default async function Part2Page() {
  const md = loadContentFile('part-2.md')
  const code = readFileSync(contentPath('part-2-patch.py'), 'utf8')
  const brainFiles = readdirSync(brainDir()).filter((f) => f.startsWith('part-2') && f.endsWith('.brain.md'))

  return (
    <div className="space-y-8">
      <MarkdownContent markdown={md} />
      <section>
        <h2 className="text-lg font-semibold text-[var(--fg)]">
          Full patched Python module (<code className="text-[#fbbf24]">drive_thru_transcriber.py</code>)
        </h2>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-[#1f2937] bg-[var(--surface)] p-5 text-[13px] leading-relaxed text-[#dbeafe]">
          <code>{code}</code>
        </pre>
      </section>
      <section className="rounded-lg border border-dashed border-[#374151] p-5">
        <h2 className="text-lg font-semibold text-[var(--fg)]">Brain companions (Part 2)</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-xs">
          {brainFiles.sort().map((f) => (
            <li key={f}>
              <a
                className="rounded border border-[#1f2937] bg-[#0f1623] px-2 py-1 text-[var(--accent)]"
                href={`/brain#${encodeURIComponent(f)}`}
              >
                {f}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
