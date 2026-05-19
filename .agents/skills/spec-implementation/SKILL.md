---
name: spec-implementation
description: >-
  Implements specs and features while maintaining a running implementation-notes
  file (markdown or HTML) for decisions, deviations, tradeoffs, and surprises.
  Use when implementing any spec, RFC, ticket, PRD, design doc, or user request
  to "implement X", "build Y", or add new functionality — including AssemblyAI
  integrations after plan approval.
---

# Spec Implementation

When implementing **any** spec, feature, ticket, or approved plan — not only AssemblyAI work — follow this workflow in addition to the spec itself.

## Required: running implementation notes

Create or update **`implementation-notes.md`** at the **project root** (or next to the feature if the spec names a path). Use **`implementation-notes.html`** only if the user or spec asks for HTML.

**Start the file before writing code.** Append as you go; do not batch at the end.

### What to log (immediately when it happens)

- Decisions the spec did not specify (library choice, file layout, naming)
- Deviations from the spec and why
- Tradeoffs (performance vs simplicity, scope cuts, tech debt accepted)
- Blockers, assumptions, and open questions
- Anything the user should know when reviewing the diff

### Entry format

Each entry gets a timestamp and short title:

```markdown
## 2026-05-19 — Used polling instead of webhooks

**Context:** Spec said "notify when done" but did not specify mechanism.
**Decision:** Poll every 3s from the API route; no public URL in local dev.
**Tradeoff:** Simpler setup; higher API usage until webhooks are configured.
```

### Template (create on first edit)

```markdown
# Implementation notes: <spec or feature name>

**Spec / request:** <one-line link or summary>
**Started:** <date>

---

<!-- Append new sections below, newest at bottom -->
```

## Workflow

1. **Read the spec** — identify explicit requirements vs gaps.
2. **Create `implementation-notes.md`** — copy the template; note initial assumptions.
3. **Implement** — log each non-obvious choice as you make it.
4. **Finish** — add a short **Summary** section: what shipped, what was deferred, how to test.
5. **Tell the user** where the notes file lives when handing off.

## Rules

- If the spec and reality conflict, **follow the spec only after asking** — or document the override in the notes and proceed if the user already approved that direction.
- Do not delete prior note entries; add corrections as new dated sections.
- Prefer markdown unless HTML is required for a deliverable.
- This skill stacks with domain skills (e.g. `assemblyai-integration`): discovery and recommendation first, then spec-implementation during the build phase.

## Cursor + Codex

| Tool | Invoke |
|------|--------|
| **Cursor** | `/spec-implementation` or automatic when implementing a spec |
| **Codex** | `$spec-implementation` |

Project-wide reminder lives in root **`AGENTS.md`**.
