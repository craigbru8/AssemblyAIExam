/**
 * Concatenation order for Voice Agent context — prioritized per plan Part 2 then hot Part 1.
 */
export const BRAIN_PROMPT_SECTIONS_ORDER = [
  { id: 'part-2-diagnosis', file: 'part-2-diagnosis.brain.md', title: 'DriveLine diagnosis' },
  { id: 'part-2-patch', file: 'part-2-patch.brain.md', title: 'DriveLine patch rationale' },
  { id: 'part-2-marco-reply', file: 'part-2-marco-reply.brain.md', title: 'Marco customer reply strategy' },
  { id: 'part-2-internal-note', file: 'part-2-internal-note.brain.md', title: 'Internal Product/Engineering feedback' },
  { id: 'part-1-priority-order', file: 'part-1-priority-order.brain.md', title: 'Monday portfolio ordering' },
  { id: 'part-1-aniline', file: 'part-1-aniline.brain.md', title: 'Aniline competitive eval' },
  { id: 'part-1-plexus', file: 'part-1-plexus.brain.md', title: 'Plexus rescue' },
  { id: 'part-1-telegraph', file: 'part-1-telegraph.brain.md', title: 'Telegraph activation cliff' },
  { id: 'part-1-veridis', file: 'part-1-veridis.brain.md', title: 'Veridis stalled deal' },
  { id: 'part-1-northwell', file: 'part-1-northwell.brain.md', title: 'Northwell gated nurture' },
  { id: 'part-1-outreach', file: 'part-1-outreach.brain.md', title: 'Outreach selection rationale' },
] as const
