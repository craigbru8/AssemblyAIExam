import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { BrainPromptResult } from './brain-context'
import { buildBrainPrompt } from './brain-context'
import { brainDir, loadContentFile } from './project-paths'

function loadBrainsMap() {
  const dir = brainDir()
  const map: Record<string, string> = {}
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.brain.md')) continue
    map[name] = readFileSync(join(dir, name), 'utf8')
  }
  return map
}

function snippet(markdown: string, maxChars: number) {
  const t = markdown.trim()
  if (t.length <= maxChars) return t
  return `${t.slice(0, maxChars)}\n…[snippet truncated; full prose on Parts pages]`
}

export function assembleBrainPromptForApi(): BrainPromptResult {
  const brainChunks = loadBrainsMap()

  const full1 = loadContentFile('part-1.md')
  const full2 = loadContentFile('part-2.md')

  return buildBrainPrompt({
    brainChunks,
    submissionPart1Snippet: snippet(full1, 4200),
    submissionPart2Snippet: snippet(full2, 5200),
  })
}
