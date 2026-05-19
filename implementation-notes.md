# Implementation notes

**Spec / request:** [FDE_Onboarding_Take_Home_(2026)_(3).md](FDE_Onboarding_Take_Home_(2026)_(3).md) + dashboard Voice Agent plan  
**Started:** 2026-05-19

Structured HTML log: [implementation-notes.html](implementation-notes.html) (authoritative running notes with `data-brain` section mapping).

---

<!-- Mirror key entries here only if you maintain both; primary is implementation-notes.html -->

## 2026-05-19: Methodology, Thin Harness, Fat Skills

**Operating principle:** This project was built around the Garry Tan / YC-inspired idea that the new agentic workflow is **thin harness, fat skills**: keep the app shell small and inspectable, then invest in reusable skills, grounding, artifacts, and review loops that make the work better over time.

**Presentation belief:** HTML and dashboard-style artifacts are a strong medium for human-agent collaboration because they are navigable, inspectable, deployable, and easy to hand to both an interviewer and an AI reviewer. This follows the pattern recently popularized by Claude-style artifact workflows: the artifact is not just a document, it is the working surface.

**Workflow used:**

1. Created agent skills in Cursor using the new Composer 2.5 model available on May 19, 2026, then grounded those skills in AssemblyAI, the product surface, and the FDE onboarding context.
2. Provided the original PDF instructions and converted them to Markdown so the assignment could be versioned, searched, and reused as structured context.
3. Had the agent execute the exam end-to-end while I completed my own pass independently. I required running implementation notes so every material change, assumption, and tradeoff could be traced back.
4. Cross-referenced the agent output against my independent answer, compared reasoning, and iterated toward the final response.
5. Ran a second pass with Codex GPT-5.5 for pushback, challenge, and stress testing of correctness, presentation, and customer judgment.
6. For fun, built the AssemblyAI Voice Agent layer so reviewers can "talk to my brain" and interrogate the methodology directly.
7. Published the work as a public GitHub repo for deeper inspection: [craigbru8/AssemblyAIExam](https://github.com/craigbru8/AssemblyAIExam), then deployed the dashboard to Vercel for submission.
8. Finished with final tweaks, polish, copy edits, production fixes, and verification passes.

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

## 2026-05-19: AssemblyAI-inspired visual polish

**Context:** Final polish request to make the dashboard feel closer to AssemblyAI's current website: near-black surfaces, Assembly-blue CTAs, technical product panels, and compact infrastructure copy.  
**Decision:** Centralize brand tokens and motion in `app/globals.css`, then move the shell, navigation, homepage, markdown, and Voice Agent panel onto those shared classes.  
**Tradeoff:** Borrowed the brand language without copying the public homepage structure or assets; kept the take-home as an operational dashboard rather than a marketing page.

## 2026-05-19: Navigation responsiveness

**Context:** Section navigation did not feel reactive enough when clicking between pages, especially in local dev where route compilation can pause before the next page appears.  
**Decision:** Add a small global route feedback component that responds on internal link press, shows an Assembly-blue progress sweep and loading label, then settles after the pathname changes. Also sharpened pressed states on buttons and nav links.  
**Tradeoff:** This is perceived-performance feedback rather than a data prefetch rewrite; it keeps the app simple and gives the user an immediate signal.  
**Build note:** Disabled Next's Webpack build worker because local builds were intermittently producing stale chunk/page-manifest misses during page-data collection after style/client-shell changes.

## 2026-05-19: Voice Agent methodology grounding

**Context:** Reviewers asked whether the voice agent knows Cursor/Codex workflow from implementation notes. Only Part 1/2 `.brain.md` files were in `BRAIN_PROMPT_SECTIONS_ORDER`; the HTML `methodology` section was not.  
**Decision:** Added `brain/methodology.brain.md` (distilled from `#methodology`) and prepended it to voice context assembly.  
**Surprise:** `implementation-notes.md` itself is still not injected — only ordered brain files + submission snippets.

## 2026-05-19: Remove route feedback UI; prefetch nav routes

**Context:** The global "Opening …" banner made slow first navigations feel worse, and first clicks in `next dev` were still waiting on on-demand route compilation (e.g. ~4s for `/part-1` in terminal logs).  
**Decision:** Removed `NavigationFeedback` and related CSS. Prefetch all nav `href`s on mount via `router.prefetch` so dev/prod warm route payloads in the background after the shell loads.  
**Surprise:** The banner was masking the real cause (dev compile-on-first-visit), not fixing it; production `next start` should feel snappy after build.
