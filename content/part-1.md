# Forward Deployed Engineer Take-Home

## Part 1 — Monday Morning Pipeline

### Summary priority order

| Rank | Lead               | Priority     | Why |
|------|--------------------|--------------|-----|
| 1    | Aniline Interpretation | Tuesday deliverable | 2GB eval audio in inbox, competitive bake-off, Sara asked for data before Tuesday 11am with founders |
| 2    | Plexus Health      | Rescue       | Production ~$18k/mo U-3 streaming, recurring health alerts + 35% volume drop over 8 weeks, champion silence |
| 3    | Telegraph Studio   | Activate     | Sharp self-serve ramp (~80k calls week two) then 14-day silence — salvageable activation save |
| 4    | Veridis Routing    | Recover / sharper wedge | Contracted ~50 hrs/day flat on U2, cold follow-ups — needs migration/value story, not another ping |
| 5    | Northwell Bioacoustics | Nurture gated | Repeated reschedules, no API key or security path; upside modest until funding + technical readiness clear |

### Lead-by-lead read and next moves

#### 1. Plexus Health
- **Read:** Paying clinic scribe workload with shrinking traffic and repeatable Datadog health signals suggests something changed in routing, rollout, latency, billing unease — or intentional vendor diversification. Quiet champion after responsiveness is churn/replacement-risk, not benign busy.
- **Next moves:** (1) Inspect account/session telemetry (latency, termination mix, clinics, anomalies) before the multi-thread outreach. (2) Email VP Eng + CTO together with concrete usage drop framing and ask for current integration owner — offer a crisp working session vs "check-in."

#### 2. Telegraph Studio
- **Read:** The April spike proves real evaluation, not dabbling — then abrupt zero implies integration/config failure, disappointment, competitor pick, billing/credit snag, or internal deprioritization. No relational equity; speed of technical outreach beats executive theater.
- **Next moves:** (1) Lightweight usage-based email to signup identity referencing peak day + cliff; offer session IDs/architecture diagnosis. (2) If reachable, skim error/close telemetry around tail of traffic for hypotheses.

#### 3. Veridis Routing
- **Read:** Stable contracted volume stuck on legacy model with unanswered emails plus fresh voice/speech infra hiring reads as evaluating paths forward — migrate, augment, or walk — not stalled because they forgot vendors exist.
- **Next moves:** (1) Replace generic follow-ups with U3 migration + routing-latency value note tied to their dispatch reality. (2) Multi-thread new voice hires with benchmark offer aligned to Sales stance (save vs expand).

#### 4. Northwell Bioacoustics
- **Read:** Discovery momentum without tooling progress and funding storyline mismatching public data suggests low readiness this quarter regardless of optimism in email.
- **Next moves:** (1) Gentle nurture boundary: reopen when Series A clears or API/testing starts. (2) Async starter checklist only — no bespoke deep build time pre-key.

#### 5. Aniline Interpretation
- **Read:** Serious team, freshly funded pilots, multilingual clinical noise constraints, parallel competitor eval — they need defensible transcripts + conversational depth on tradeoffs rather than reassurance.
- **Next moves:** (1) Immediately queue audio processing + bilingual applied-AI collaborator for multilingual VAD context. (2) Email Sara outlining deliverable realism for Tuesday metrics + clarification on latency vs accuracy priority if constrained.

### How I would order the day (~45 minutes pre-first-call block)

Kick Aniline ingestion first because the work is asynchronous and the Tuesday 11am deliverable is the least recoverable miss. In parallel, skim Plexus account health for anomalies and flag Sales/CS that a production account is at risk. Send Plexus escalation once numbers are in hand — even if skeletal, point to inspecting session tails and alert cadence.

Next, fire Telegraph salvage note referencing observed ramp/drop specifics. Draft sharper Veridis message for scheduling after Aniline+Plexus if time slips (do not mass-send low-signal follow-ups).

Northwell: single-line nurture hold — no calendar chase.

### Outreach I would send

**Channel:** Email to Sara @ Aniline (Tuesday eval thread)

```text
Subject: Re: Tuesday eval — plan on the 2GB sample

Sara — understood on “data, not slides.”

We’re treating the 2GB set as an eval, not a deck. For Tuesday I’ll bring:
- transcripts on the provided audio batch
- failure-mode notes tuned to noisy hospital environments
- code-switching observations (English / Spanish / Mandarin) with honest limits on what overnight coverage can prove
- how this maps to realtime latency expectations vs your <300 ms p95 target
- gaps where we need longer runs / labeled sets to tighten WER

I’m aligning someone with multilingual VAD + applied realtime context so Tuesday isn’t slideware.

Quick calibration: If Tuesday forces a tradeoff between hard p95 realtime and multilingual accuracy, which should we optimize for first?

— Craig
```

---

_Full methodology for each block is summarized in the **Brain** files linked from `/brain` and in `implementation-notes.html`._
