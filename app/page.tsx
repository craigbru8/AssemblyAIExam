import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="border-b border-[#1f2937] pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Executive readout
        </p>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-[var(--fg)]">
          A concise FDE submission: prioritize the Monday portfolio, patch DriveLine&apos;s streaming
          lifecycle, and make the reasoning inspectable.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#cbd5e1]">
          The answer is intentionally short; the extra surface exists to show how I work under the hood.
          The Voice Agent is a live walkthrough grounded in the same notes, with the API key kept
          server-side.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#bef8ff]"
            href="/part-1"
          >
            Read Part 1
          </Link>
          <Link
            className="rounded-lg border border-[#374151] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            href="/part-2"
          >
            Read Part 2
          </Link>
          <Link
            className="rounded-lg border border-[#374151] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            href="/brain"
          >
            Open Voice Agent
          </Link>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        <div className="border-l border-[#243244] pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Monday first move
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">
            Start Aniline&apos;s eval audio immediately, then escalate Plexus with telemetry in hand.
          </p>
        </div>
        <div className="border-l border-[#243244] pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            DriveLine fix
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">
            Explicitly terminate Streaming sessions; stop billing tails from masquerading as model risk.
          </p>
        </div>
        <div className="border-l border-[#243244] pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Creative layer
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">
            A Voice Agent explains the tradeoffs candidly, grounded only in the submitted notes.
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold">Review path</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#cbd5e1]">
          Start with Parts 1 and 2 for the canonical submission. Use the Voice Agent and implementation
          notes only if you want the reasoning trail, tradeoffs, and product-feedback loop behind the
          written answer.
        </p>
      </section>
    </div>
  )
}
