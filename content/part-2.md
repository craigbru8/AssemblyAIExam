# Part 2 — DriveLine AI

## What went wrong

Marco's kiosk WebSocket shuts down when each order completes, but AssemblyAI Streaming sessions never receive an explicit graceful terminate — the handler logs `WebSocketDisconnect` then relies entirely on `inactivity_timeout=300`. That treats every order as needing up to five minutes of idle-paid session tail after usable audio stops, ballooning **`session_duration_seconds` vs `audio_duration_seconds`** relative to nominal order throughput. Billing growing ~2× vs ~20% order growth is consistent with long session tails amortized across throughput.

**Close code `3006` is not confidently mapped** solely from this symptom — docs typically tie that family to malformed/invalid realtime messages — so Marco should share raw websocket close payloads + session identifiers after patching to separate telemetry noise from lifecycle drift.

---

## Patched code

The canonical file is `content/part-2-patch.py`, and the full module is rendered below on this page.

Highlights versus Marco's version:

1. **`try` / `except` / `finally`** ensures `disconnect(terminate=True)` always runs once `connect()` succeeded — kiosk disconnect becomes an immediate graceful terminate upstream.
2. **`inactivity_timeout` trimmed** to ~15 seconds as a defensive backstop, not primary shutdown.
3. **Empty audio frames skipped** before `stream(...)`.

> Deployers swap in their real `send_to_pos_system` integration.

---

## Reply to Marco

**Slack `#aai-driveline` thread**

```text
Marco — dug in tonight.

What’s biting you is lifecycle, not transcription quality:

When the kiosk WebSocket drops (`WebSocketDisconnect`), we log but never gracefully terminate AssemblyAI Streaming. Combined with `inactivity_timeout=300`, each ride-up can linger ~5 paid minutes past the utterances you care about. That easily makes `session_duration` look like multiples of realistic `audio_duration`, which squares with invoices doubling despite ~20% order growth.

Attached patch:
- terminates every session (`disconnect(terminate=True)`) in `finally`
- trims inactivity_timeout to short safety margin if someone leaves the kiosk socket open silently
- drops empty PCM fluff before streaming upstream

Canary guidance:
1. Plot `session_duration_seconds - audio_duration_seconds` distributions pre/post deploy.
2. Watch Datadog websocket close taxonomy after rollout.

On `close_code 3006`: I’m not going to retrofit a story without raw close reason text + IDs — please grab a handful of offending session IDs tomorrow and we’ll correlate.

This doesn’t change model / turn-taking configuration, so conversational accuracy expectation stays flat.

If anything looks rollback-worthy, ping me and I’ll stay close to the metrics while you soak the canary.

— Craig
```

---

## Internal note to Product / Engineering

```markdown
## Internal note — DriveLine kiosk proxy lifecycle

### Summary

Customer proxy leaves AssemblyAI Streaming sessions drifting after kiosk disconnect because handler omits terminate & depends on minute-scale inactivity. Model behavior solid; SaaS metering + instrumentation looked broken.

### Why a strong engineer drifted here

Examples emphasize streaming ingestion loops; terminating sessions in server-mediated fan-out setups is quieter than it should be. `inactivity_timeout` reads like “how we close” versus “circuit breaker tail.” Billing metrics (`audio_duration_seconds` vs `session_duration_seconds`) aren’t surfaced as first-class integration guardrails early.

### Recommendations

1. Ship authoritative **server WebSocket bridge** cookbook with `try/finally: disconnect(terminate=True)` front-and-center (Python + Node).
2. Clarify wording: `inactivity_timeout` === safety hatch, normal completion must actively terminate upstream.
3. SDK ergonomic: scoped context mgr / decorator emitting guaranteed cleanup hook.
4. Dashboard + docs: alerting recipe for **`session_tail = session_duration - audio_duration`** at P95/P99.
5. Close-code playbook — cross-link raw close payloads with remediation matrix (lifecycle vs malformed frames vs auth).

Impact: Competitive noise when economics look mysterious even if transcripts crisp — preempt with lifecycle clarity defaults.
```
