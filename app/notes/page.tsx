import { readFile } from 'node:fs/promises'
import { notesHtmlPath } from '@/lib/project-paths'

export default async function NotesPage() {
  const html = await readFile(notesHtmlPath(), 'utf8')

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)]">
        Transparent dev diary mirrored from{' '}
        <code className="text-[var(--accent)]">implementation-notes.html</code>. Decisions not demanded by the
        external prompt wording.
      </p>
      <div className="h-[calc(100vh-14rem)] min-h-[480px] overflow-hidden rounded-2xl border border-[var(--line-soft)] shadow-[var(--shadow)]">
        {/* eslint-disable-next-line react/no-danger */}
        <iframe className="h-full w-full bg-[var(--bg)]" sandbox="" title="Implementation notes HTML" srcDoc={html} />
      </div>
      <p className="text-xs text-[var(--muted)]">
        Sandbox keeps scripts disabled; styling is authored inline alongside the markup.
      </p>
    </div>
  )
}
