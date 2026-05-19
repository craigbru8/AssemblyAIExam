# Implementation notes

**Spec / request:** [FDE_Onboarding_Take_Home_(2026)_(3).md](FDE_Onboarding_Take_Home_(2026)_(3).md) + dashboard Voice Agent plan  
**Started:** 2026-05-19

Structured HTML log: [implementation-notes.html](implementation-notes.html) (authoritative running notes with `data-brain` section mapping).

---

<!-- Mirror key entries here only if you maintain both; primary is implementation-notes.html -->

## 2026-05-19: HTML as source of truth

**Context:** Prefer `implementation-notes.html` for rich browsing in browser.  
**Decision:** Keep markdown pointer for agents that expect `implementation-notes.md`.

## 2026-05-19: Audit polish pass

**Context:** Post-audit request to patch correctness, creativity, and presentation risks before submission.  
**Decision:** Treat the canonical written answer as solid; focus changes on first-impression executive framing, broken rendered links, Voice Agent reliability/UX, and copy tone.  
**Tradeoff:** Keep scope tight rather than redesigning the app; this preserves the take-home's brevity while making the creative wrapper safer to demo.

## 2026-05-19: Voice Agent reliability and framing

**Context:** Audit found the Voice Agent could be memorable but risky if the mic graph was not actively pulled or the prompt chips implied a missing text input.  
**Decision:** Connect the capture worklet through a zero-gain sink so the browser keeps processing mic frames without local playback; relabel prompt chips as spoken suggestions; sharpen the system prompt toward candid FDE personality.  
**Tradeoff:** Kept the interaction voice-first instead of adding unsupported text entry to the Voice Agent websocket.

## 2026-05-19: Copy tone

**Context:** Submission prose leaned on em dashes in almost every sentence.  
**Decision:** Use colons in headings, commas and periods in body copy, and keep em dashes only on email signatures (`— Craig`).

## 2026-05-19: Summary

**Shipped:** Executive-readout homepage, clearer Part 1 sequencing language, safer customer-facing wording, fixed Part 2 markdown/link presentation, stronger Voice Agent personality prompt, and active mic worklet wiring.  
**Verified:** `npm run build`, `npm run lint`, and local browser smoke checks for `/` and `/brain`.  
**Deferred:** Full live Voice Agent mic/token conversation was not exercised in this pass.

## 2026-05-19: Vercel brain context file tracing

**Context:** Production `/api/brain/context` failed with `ENOENT: no such file or directory, scandir '/var/task/brain'` even though local `.env.local` flow worked.  
**Decision:** Add Next.js `outputFileTracingIncludes` for the brain context API route so Vercel bundles `brain/` and `content/` markdown files into the serverless function.  
**Tradeoff:** This keeps the current filesystem-backed prompt assembly instead of moving the brain corpus into generated TypeScript or public assets.  
**Verified:** `npm run build`, `npm run lint`, and `.next/server/app/api/brain/context/route.js.nft.json` now includes the `brain/*.brain.md` and `content/*.md` files.
