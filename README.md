# FDE take-home dashboard (Next.js + Voice Agent)

## Local setup

```bash
cp .env.example .env.local
```

Add `ASSEMBLYAI_API_KEY` from https://www.assemblyai.com/dashboard/api-keys

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Vercel deploy

1. Push this repo to GitHub/GitLab linked to Vercel.
2. Configure Production env var `ASSEMBLYAI_API_KEY` (never commit it).
3. Framework preset: Next.js defaults.
4. `npm run build` must succeed locally (`next build`).
5. Smoke test **`/brain`**: `/api/agent/token` returns `{ token }`, mic permission succeeds.

## Artifact map

| Path | Contents |
|---|---|
| `/content/part-*.md` | Canonical written answers |
| `/brain/*.brain.md` | Per-question methodology for Voice grounding |
| `implementation-notes.html` | Running implementation diary |
| `/api/agent/token` | Voice Agent ephemeral token (Bearer upstream) |
| `/api/brain/context` | Assembled `system_prompt` + greeting JSON |
