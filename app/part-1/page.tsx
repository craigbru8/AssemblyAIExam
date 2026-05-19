import { readdirSync } from 'node:fs'
import MarkdownContent from '@/components/markdown-content'
import { brainDir } from '@/lib/project-paths'
import { loadContentFile } from '@/lib/project-paths'

export default async function Part1Page() {
  const md = loadContentFile('part-1.md')
  const brainFiles = readdirSync(brainDir()).filter((f) => f.startsWith('part-1') && f.endsWith('.brain.md'))

  return (
    <div className="space-y-8">
      <p className="text-sm text-[var(--muted)]">
        Supporting methodology files live in <code className="text-[var(--accent)]">/brain</code>. Each lead and
        ordering decision has a matching <code>*.brain.md</code>.
      </p>
      <MarkdownContent markdown={md} />
      <section className="rounded-lg border border-dashed border-[#374151] p-5">
        <h2 className="text-lg font-semibold text-[var(--fg)]">Brain companions (Part 1)</h2>
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
