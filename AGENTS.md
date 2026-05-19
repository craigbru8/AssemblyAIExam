# Agent instructions (Cursor + Codex)

## Implementing specs and new features

Whenever you implement a spec, ticket, PRD, or approved plan:

1. **Follow** the `.agents/skills/spec-implementation/` skill (`/spec-implementation` in Cursor, `$spec-implementation` in Codex).
2. **Maintain** a running `implementation-notes.md` at the project root (or the path the spec names). Start it before code; append decisions, deviations, tradeoffs, and surprises as they happen — not in one dump at the end.

Prompt shape to honor:

> Implement \<SPEC\> and while you do, keep a running implementation-notes file with decisions that weren't in the spec, things you had to change, tradeoffs, and anything else I should know.

## AssemblyAI integration

When integrating AssemblyAI Speech-to-Text:

1. Use `.agents/skills/assemblyai-integration/` — discovery first, one question per message, plan before code.
2. Before writing AssemblyAI code, fetch https://www.assemblyai.com/docs/llms.txt (API changes often; do not rely on memorized parameters).
3. Optional MCP: `https://mcp.assemblyai.com/docs` (`search_docs`, `get_pages`, `list_sections`, `get_api_reference`).
