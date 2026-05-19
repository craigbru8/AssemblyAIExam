import { BRAIN_PROMPT_SECTIONS_ORDER } from './brain-order'

/** Ordered brain files concatenated into Voice Agent grounding context */
export type BrainPromptResult = {
  systemPrompt: string
  greeting: string
  sections: string[]
  truncated: boolean
}

const MAX_TOTAL_CHARS = 95_000

const BASE_RULES = `You are the spoken "brain" explaining Craig's Forward Deployed Engineer take-home for AssemblyAI.
Ground every answer ONLY in the context documents supplied below (submission answers + brain methodology notes).

Rules:
- Be concise. This is live interview pacing: lead with judgment, then evidence from the docs.
- Sound like Craig at the whiteboard: candid, warm, technically precise, allergic to slideware, and comfortable saying "fair push" before defending a tradeoff.
- Show personality through judgment and plain speech, not jokes or filler. If challenged, answer directly and name the risk.
- If something is unknown or not documented, say so and propose what you would investigate (Datadog/session IDs/FDE principles).
- For Part 2 (DriveLine): emphasize explicit graceful termination vs relying on large inactivity_timeout; differentiate session_duration vs audio_duration metering. Do NOT claim close code 3006 is fully explained unless session-level evidence appears in the docs.
- For Part 1: reference portfolio scarcity, deadlines, revenue risk, activation saves, gated nurture patterns when relevant.
`.trim()

const GREETING =
  'Hi, I\'m the walkthrough voice for Craig\'s FDE submission. Ask about Monday pipeline ordering, individual leads, the DriveLine streaming lifecycle bug and patch, outreach choices, or the internal Product feedback loop.'

function trimToLimit(body: string, budget: number) {
  if (body.length <= budget) return { text: body, truncated: false }
  return {
    text: `${body.slice(0, budget)}\n\n…[truncated context for Voice Agent sizing]`,
    truncated: true,
  }
}

export function buildBrainPrompt(args: {
  brainChunks: Record<string, string>
  submissionPart1Snippet: string
  submissionPart2Snippet: string
}): BrainPromptResult {
  const sections: string[] = []
  const blocks: string[] = []

  for (const section of BRAIN_PROMPT_SECTIONS_ORDER) {
    const body = args.brainChunks[section.file]
    if (!body?.trim()) continue
    sections.push(section.id)
    blocks.push(`## BRAIN SECTION: ${section.title}\n\n${body.trim()}`)
  }

  const submission = [
    '# SUBMISSION (Part 1 excerpt)',
    args.submissionPart1Snippet.trim(),
    '',
    '# SUBMISSION (Part 2 excerpt)',
    args.submissionPart2Snippet.trim(),
    '',
  ].join('\n')

  const fused = [...blocks, submission].join('\n\n')

  const budgetAfterRules = MAX_TOTAL_CHARS - BASE_RULES.length - 2048

  let truncated = false
  let fusedTrimmed = fused
  if (fused.length > budgetAfterRules) {
    const r = trimToLimit(fused, budgetAfterRules)
    fusedTrimmed = r.text
    truncated = r.truncated
  }

  const systemPrompt = `${BASE_RULES}

<context>
${fusedTrimmed}
</context>`

  return { systemPrompt, greeting: GREETING, sections, truncated }
}
