import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[#1f2937] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--fg)]">What this site is</h2>
        <p className="mt-3 text-[#cbd5e1] leading-relaxed">
          A compact submission surface for AssemblyAI&apos;s Forward Deployed Engineer onboarding
          take-home: Part 1 (Monday portfolio triage), Part 2 (DriveLine streaming lifecycle), plus a
          Voice Agent that narrates methodology using the distilled <code>.brain.md</code> corpus and
          your written answers — without ever shipping an API key to the browser.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#bef8ff]"
            href="/brain"
          >
            Open Voice Agent hub
          </Link>
          <Link
            className="rounded-lg border border-[#374151] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            href="/part-1"
          >
            Jump to Part 1
          </Link>
          <Link
            className="rounded-lg border border-[#374151] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            href="/part-2"
          >
            Jump to Part 2
          </Link>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold">Contents</h2>
        <ul className="mt-3 space-y-2 text-sm text-[#cbd5e1]">
          <li>
            <strong className="text-[var(--fg)]">Part 1:</strong> lead reads, prioritized day plan,
            Aniline-facing outreach snippet.
          </li>
          <li>
            <strong className="text-[var(--fg)]">Part 2:</strong> Lifecycle diagnosis vs{' '}
            <code>close_code 3006</code> nuance, patched Python, Slack reply, Product note.
          </li>
          <li>
            <strong className="text-[var(--fg)]">Talk to my brain:</strong> AssemblyAI Voice Agent
            websocket with server-minted token + grounding documents.
          </li>
          <li>
            <strong className="text-[var(--fg)]">Implementation notes:</strong> Transparent HTML dev
            diary showing tradeoffs unrelated to canonical prompt wording.
          </li>
        </ul>
      </section>
    </div>
  )
}
