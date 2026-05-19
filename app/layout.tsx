import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'FDE Take-Home: Pipeline + DriveLine',
  description:
    'Forward Deployed Engineer onboarding submission with Voice Agent Brain explainer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="app-shell mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-14 pt-6 sm:px-6 lg:px-8">
          <header className="site-header mb-10 border-b pb-6">
            <p className="brand-kicker">
              AssemblyAI · FDE take-home (demo dashboard)
            </p>
            <h1 className="brand-headline mt-3 text-3xl leading-tight sm:text-4xl">
              Portfolio triage · Streaming lifecycle · Voice brain
            </h1>
            <Nav />
          </header>
          <main className="flex-1">{children}</main>
          <footer className="site-footer mt-12 border-t pt-6 text-xs text-[var(--muted)]">
            Voice Agent uses ephemeral tokens minted server-side; key stays in{' '}
            <code>Vercel</code>/<code>.env.local</code> only.
          </footer>
        </div>
      </body>
    </html>
  )
}
