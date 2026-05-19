import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Repository root containing `content/`, `brain/`, Next `app/`, etc. */
export function repoRoot() {
  return process.cwd()
}

export function contentPath(rel: string) {
  return join(repoRoot(), 'content', rel)
}

export function brainDir() {
  return join(repoRoot(), 'brain')
}

export function notesHtmlPath() {
  return join(repoRoot(), 'implementation-notes.html')
}

export function loadUtf8(relFromRoot: string) {
  return readFileSync(join(repoRoot(), relFromRoot), 'utf8')
}

export function loadContentFile(name: string) {
  return readFileSync(contentPath(name), 'utf8')
}
