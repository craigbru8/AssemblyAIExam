---
name: assemblyai-integration
description: >-
  Guides discovery, planning, and production-ready integration of AssemblyAI
  Speech-to-Text (pre-recorded, real-time streaming STT, Voice Agent API, LLM
  Gateway). Use when the user asks to integrate, transcribe, stream, diarize,
  redact PII, build voice agents, or mentions AssemblyAI, universal-3-pro,
  streaming WebSocket, or assemblyai SDK.
---

# AssemblyAI Integration

You are helping a developer integrate AssemblyAI's Speech-to-Text API into their application. Understand their context through discovery, produce a concrete implementation plan, get their approval, then write correct, production-ready code.

This is a public API. The developer creates their own key at [assemblyai.com/dashboard/api-keys](https://www.assemblyai.com/dashboard/api-keys).

## Cursor + Codex

This skill lives at `.agents/skills/assemblyai-integration/` and is discovered by **both** Cursor and Codex from `.agents/skills/`.

| Tool | Invoke | Project docs hook |
|------|--------|-------------------|
| **Cursor** | Type `/assemblyai-integration` in Agent chat, or let the agent auto-select from the description | Add live-docs lines to `AGENTS.md` or `.cursor/rules/` (see below) |
| **Codex** | `$assemblyai-integration` or pick **AssemblyAI Integration** from the skill list | Same lines in repo `AGENTS.md` if present |

**Official documentation** (use both — they layer):

1. **Every prompt** — add to `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, or equivalent:

   ```
   Always fetch https://www.assemblyai.com/docs/llms.txt before writing AssemblyAI code.
   The API has changed — do not rely on memorized parameter names.
   ```

   `llms.txt` is the structured index. For full content use `llms-full.txt`; narrow with `?lang=python` or `?lang=typescript`, or add `?excludeSpec=true` to skip the API spec.

2. **On-demand lookups (MCP)** — `https://mcp.assemblyai.com/docs` (Streamable HTTP). Tools: `search_docs`, `get_pages`, `list_sections`, `get_api_reference`.

   ```bash
   # Codex CLI
   codex mcp add assemblyai-docs --transport http https://mcp.assemblyai.com/docs

   # Claude Code
   claude mcp add assemblyai-docs --transport http https://mcp.assemblyai.com/docs
   ```

   Cursor: add the same URL in **Settings → MCP** (HTTP transport). See [Coding agent prompts](https://www.assemblyai.com/docs/coding-agent-prompts).

Before recommending parameters or writing code, fetch live docs per Operating Rule 12 below.

**Deep reference:** [reference.md](reference.md) — feature matrix, endpoints, SDK samples, Voice Agent API, browser patterns, errors, gotchas.

---

## 0. Operating rules

1. **Discovery first, code later.** Do not write code until the developer has answered enough of Section 1 for you to make a specific recommendation.
2. **One question per message.** Never batch discovery questions. Wait for an answer before asking the next one.
3. **Plan before you build.** After discovery, present a written recommendation (see Section 2) and wait for explicit approval before generating implementation code.
4. **Prefer the official SDKs.** Use `assemblyai` (Python) or `assemblyai` (Node/JS) unless the developer has a specific reason not to. The SDKs handle polling, upload streaming, WebSocket lifecycle, and session termination correctly — which is where most hand-rolled integrations fail.
5. **Never expose the API key in client-side code.** For browser or mobile streaming, always mint a temporary token server-side. For pre-recorded, proxy uploads and submissions through your server.
6. **Authorization header is the raw key — no `Bearer` prefix.** This trips up everyone. **One exception:** the Voice Agent API (Section 10 in reference) requires `Authorization: Bearer YOUR_API_KEY`. Don't generalize either rule across products.
7. **`speech_models` is required on every pre-recorded request.** There is no default. Recommended value: `["universal-3-pro", "universal-2"]` (see reference Section 5).
8. **Always terminate streaming sessions explicitly.** An abandoned WebSocket keeps accruing charges until the 3-hour cap.
9. **Do not use deprecated transcript params:** `auto_chapters`, `summarization`, `summary_model`, `summary_type`. Use LLM Gateway instead (reference Section 8).
10. **If the developer's answers are inconsistent, stop and surface the conflict.** Example conflicts: "browser-only, no backend" + "streaming"; "phone call audio" + "upload a file"; "real-time" + "need speaker diarization with full names." Don't paper over these — ask.
11. **Be flexible.** If something the developer says doesn't match the shape of the API (e.g., they describe a use case that isn't supported — reference Section 13), say so directly and propose the closest supported alternative.
12. **Verify parameters against live docs before recommending.** This file is a snapshot — features move between beta and GA, model-specific behaviors change, and new knobs ship regularly. Before posting the Section 2 recommendation, confirm each parameter you plan to use is supported for the chosen **mode** (pre-recorded vs streaming) *and* **model** (U3 Pro, U2, U3 Pro Streaming, Universal-Streaming, Whisper-Streaming). Do not assume a pre-recorded flag works on streaming, or that a parameter supported on U2 still behaves the same on U3 Pro. Pull the current reference rather than memorizing. Primary sources, in order of preference:
    - `https://www.assemblyai.com/docs/llms-full.txt` — the canonical machine-readable reference
    - Per-mode docs: `/docs/pre-recorded-audio/*` (pre-recorded) and `/docs/streaming/*` (streaming), including the model-specific overview page (e.g., `/docs/streaming/universal-3-pro` and `/docs/streaming/select-the-speech-model`) which lists *exactly* which parameters are honored/ignored by that model
    - The OpenAPI-backed API reference at `/docs/api-reference/*` for request/response schemas
    - For LLM Gateway: `/docs/llm-gateway/overview` lists the current valid `model` strings — don't guess short names like `claude-sonnet-4`

  If a flag you remembered isn't in the current docs (or is marked beta / deprecated / ignored for the chosen model), flag it in the recommendation's "Open questions / assumptions" block and ask the developer before proceeding.

---

## 1. Discovery questions

Ask these **one at a time**, in order. Skip any question already answered in the conversation. Adapt wording to sound natural, but cover the substance of each.

1. **What are you building, and are you adding AssemblyAI to an existing project or starting fresh?** (A short description of the product is usually enough.)
2. **What do you need: pre-recorded transcription, real-time streaming STT, or a managed voice agent?**
   - Pre-recorded: uploaded files, URLs, batch processing, post-call analytics. → reference Section 6.
   - Streaming STT: live transcripts only (you bring your own LLM/TTS). Live captioning, voice-agent STT, meeting notetaking, dictation. → reference Section 9.
   - Voice Agent API (managed): full-duplex speech-in/speech-out — STT + LLM + TTS + turn detection + tool calling, all in one WebSocket. Right answer when "I want to talk to an AI" is the whole product. → reference Section 10.
3. **Where is your audio coming from?** (e.g., uploaded files, public URLs, browser microphone, mobile app, Twilio/Telnyx phone numbers, SIP trunks.)
4. **What language and framework are you using?** (e.g., Python + FastAPI, Node + Next.js, Go, Ruby, Swift, Kotlin, browser-only, LiveKit, Pipecat, Vapi, Vocode, Retell.)
5. **Do you already have an AssemblyAI API key, or do you need to create one?** (If needed: [assemblyai.com/dashboard/api-keys](https://www.assemblyai.com/dashboard/api-keys).)
6. **Do you have a data residency requirement?** (US vs EU — this changes the base URL.)
7. **Anything beyond a plain transcript?** Don't read off a checklist. Use everything they've told you so far — the product description from Q1, the audio source from Q3, the framework from Q4 — to **infer which features are plausibly applicable**, then ask in plain language about *those*. The point is to surface things the developer might not know to ask for, not to make them choose from a menu.

   The authoritative catalog of available features and their parameters is in the live docs (see Operating Rule 12) — consult it, don't rely on memory. reference Section 3 is a starting reference, not the final word.

   Calibrate to mode and use case. Examples:
   - Customer-support call analytics (pre-recorded) → speaker diarization and PII redaction are almost certainly relevant; sentiment may be; chapters via LLM Gateway often is. Ask about those, not about live-streaming features.
   - Browser live-captioning (streaming) → ask about multilingual support and domain vocabulary; don't bring up PII redaction or summaries-during-session (neither applies to streaming).
   - Voice agent (streaming) → keyterms prompting and turn-detection tuning matter; speaker diarization usually doesn't.
   - Medical scribe → medical domain mode is the headline feature; ask about it explicitly.

   Don't ask about things the user gets automatically with no toggle (word-level timestamps and confidence on `words[]`, streaming `SpeechStarted` events). Mention them in the recommendation as capabilities they'll have, but don't make them a choice.

   If you're confident from context that a feature is needed (e.g., they said "show who said what" → `speaker_labels`), include it in the recommendation directly with a one-line rationale rather than asking again.

---

## 2. Recommendation template (after discovery)

Before writing code, post a plan with all of the following. Get explicit approval.

````
## Recommendation

**Use case:** <one-sentence summary of what they're building>
**Mode:** <pre-recorded / streaming / both>
**Region:** <US or EU base URL>

**Model:**
- <model name> — <one-line rationale>
- <fallback model, if applicable>

**Endpoints:**
- <endpoint 1>
- <endpoint 2>

**Parameters enabled:** (before filling this in, verify each parameter is supported on the chosen mode + model per Operating Rule 12)
- `param_name`: <value> — <why>
- ...

**Auth pattern:**
<server-side key / temp token / proxied uploads — and where the key lives>

**Termination & error handling:**
<how streaming sessions are closed; how errors / retries are handled>

**Code skeleton:**
<2–6 bullet points describing the files/functions you'll generate>

**Open questions / assumptions:**
<anything you inferred that they should confirm>

Ready to proceed?
````

If they say yes, write the code. If they push back on any piece, revise the plan — don't just start coding around objections.

**While implementing:** follow the `spec-implementation` skill — maintain `implementation-notes.md` from the first line of code through handoff (decisions, deviations, tradeoffs). See root `AGENTS.md`.

---

## Implementation reference

| Topic | Where |
|-------|--------|
| Feature → parameter mapping | [reference.md §3](reference.md) |
| API URLs, auth, core endpoints | [reference.md §4](reference.md) |
| `speech_models` fallback semantics | [reference.md §5](reference.md) |
| Pre-recorded quick start (SDK + HTTP) | [reference.md §6](reference.md) |
| Webhooks | [reference.md §7](reference.md) |
| LLM Gateway (chapters, summaries) | [reference.md §8](reference.md) |
| Streaming STT (U3 Pro) | [reference.md §9](reference.md) |
| Voice Agent API (managed) | [reference.md §10](reference.md) |
| Framework configs (LiveKit, Pipecat, …) | [reference.md §11](reference.md) |
| Browser patterns | [reference.md §12](reference.md) |
| Not supported / alternatives | [reference.md §13](reference.md) |
| Error handling | [reference.md §14](reference.md) |
| Quick-reference gotchas | [reference.md §15](reference.md) |
