'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/part-1', label: 'Part 1 · Pipeline' },
  { href: '/part-2', label: 'Part 2 · DriveLine' },
  { href: '/brain', label: 'Talk to my brain' },
  { href: '/notes', label: 'Implementation notes (HTML)' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link rounded px-2 py-1 transition-colors ${active ? 'text-[var(--accent)] underline decoration-[var(--accent)] underline-offset-4' : 'text-[var(--muted)]'}`}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
