import { NextResponse } from 'next/server'

import { assembleBrainPromptForApi } from '@/lib/brain-prompt-assembler'

/** Assembled Voice Agent grounding (server-only; never exposes API key). */
export async function GET() {
  try {
    const result = assembleBrainPromptForApi()
    return NextResponse.json({
      systemPrompt: result.systemPrompt,
      greeting: result.greeting,
      sections: result.sections,
      truncated: result.truncated,
    })
  } catch (e) {
    return NextResponse.json({ error: 'brain_context_failed', detail: `${e}` }, { status: 500 })
  }
}
