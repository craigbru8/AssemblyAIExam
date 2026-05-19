import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'FDE Take-Home — Pipeline + DriveLine',
  description:
    'Forward Deployed Engineer onboarding submission with Voice Agent Brain explainer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-14 pt-6 sm:px-6 lg:px-8">
          <header className="mb-10 border-b border-[#1f2937] pb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              AssemblyAI — FDE take-home (demo dashboard)
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Portfolio triage · Streaming lifecycle · Voice brain
            </h1>
            <Nav />
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-[#1f2937] pt-6 text-xs text-[var(--muted)]">
            Voice Agent uses ephemeral tokens minted server-side; key stays in{' '}
            <code>Vercel</code>/<code>.env.local</code> only.
          </footer>
        </div>
      </body>
    </html>
  )
}
