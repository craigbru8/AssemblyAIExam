#!/usr/bin/env tsx
/**
 * Optional helper: prints excerpt of implementation-notes.html <section>s for a slug.
 *
 * Usage: npm run brain:draft -- [--section id]
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const html = readFileSync(join(root, 'implementation-notes.html'), 'utf8')
const ix = process.argv.indexOf('--section')
const slug = ix >= 0 ? (process.argv[ix + 1] ?? '') : ''

if (!slug || slug.startsWith('-')) {
  console.error(
    ['Usage:', 'npm run brain:draft -- --section part-1-aniline'].join('\n'),
  )
  process.exitCode = 1
} else {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`<section[^>]*id="${escaped}"[\\s\\S]*?<\\/section>`, 'i')
  const m = html.match(re)
  if (!m?.[0]) {
    console.error(`No section matched id="${slug}"`)
    process.exitCode = 1
  } else console.log(`<!-- excerpt for ${slug} -->\n${m[0]}`)
}
