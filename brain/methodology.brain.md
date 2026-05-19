# Brain: Methodology — thin harness, fat skills (Cursor + Codex)

**Source:** implementation-notes.html, section `methodology` (2026-05-19)  
**Take-home ref:** How this submission was built and reviewed (meta, not Part 1/2 answers)

## Operating principle

This project follows **thin harness, fat skills**: keep the app shell small and inspectable; invest in reusable skills, grounding, artifacts, and review loops that compound over time.

HTML/dashboard artifacts are the working surface: navigable, inspectable, deployable, and easy to hand to both an interviewer and an AI reviewer (Claude-style artifact pattern).

## Workflow: Cursor → independent pass → Codex stress-test

1. **Cursor (Composer 2.5, May 2026):** Created agent skills grounded in AssemblyAI product surface and FDE onboarding context (`.agents/skills/` — spec-implementation, assemblyai-integration, fde-onboarding-takehome).
2. **Structured assignment:** PDF → Markdown so the prompt is versioned, searchable, and reusable as context.
3. **Dual execution:** Agent ran the exam end-to-end while Craig completed an independent pass in parallel. **Running implementation notes** (`implementation-notes.html`) recorded every material decision, assumption, and tradeoff — not a post-hoc dump.
4. **Reconciliation:** Cross-referenced agent output vs independent answer; iterated on reasoning and final prose.
5. **Codex (GPT-5.5):** Second pass for pushback — challenge correctness, presentation, and customer judgment.
6. **Voice Agent layer:** AssemblyAI Voice Agent so reviewers can interrogate methodology and submission reasoning live (`GET /api/brain/context` assembles grounding).
7. **Ship:** Public repo [craigbru8/AssemblyAIExam](https://github.com/craigbru8/AssemblyAIExam), Vercel deploy, final polish and production fixes.

## What the voice agent should say when asked

- **Cursor vs Codex:** Cursor did primary implementation with skills + implementation notes; Codex was the adversarial reviewer, not a second author.
- **Why implementation notes:** Traceability for interviewers and for this brain — Part 1/2 `.brain.md` files distill section-level reasoning from the HTML log.
- **Skills location:** Repo `.agents/skills/`; Cursor invokes via `/skill-name`, Codex via `$skill-name` (see root `AGENTS.md`).

## If the interviewer asks…

- **Why not one agent end-to-end?** Portfolio and customer judgment need a human pass; agents accelerate draft + structure, not replace accountability.
- **What would you add next?** Deeper Datadog/session evidence for DriveLine close codes; live mic demo with token mint in prod.
