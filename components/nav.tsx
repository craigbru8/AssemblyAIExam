'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/part-1', label: 'Part 1 · Pipeline' },
  { href: '/part-2', label: 'Part 2 · DriveLine' },
  { href: '/brain', label: 'Talk to my brain' },
  { href: '/notes', label: 'Implementation notes (HTML)' },
]

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    for (const { href } of links) {
      router.prefetch(href)
    }
  }, [router])

  return (
    <nav className="site-nav">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link ${active ? 'is-active' : ''}`}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
