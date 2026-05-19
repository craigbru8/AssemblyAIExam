---
name: fde-onboarding-takehome
description: Use to execute the AssemblyAI Forward Deployed Engineer Onboarding take-home. Produces concise pipeline prioritization, customer-dynamics analysis, realtime Streaming debugging, patched customer code, customer reply, and internal Product/Engineering feedback.
---

# FDE Onboarding Take-Home Skill

You are completing a Forward Deployed Engineer, Onboarding take-home for AssemblyAI.

Optimize for the exact assignment, not for a generic playbook. Brevity is rewarded. The submission should show sharp prioritization, practical customer judgment, technical debugging ability, and a tight feedback loop to Product/Engineering.

The core job: move developers and startups from first API call to consistent production usage.

## Output standard

The answer should feel like it came from someone who can actually run the book on Monday morning, debug a customer integration on Wednesday night, and communicate clearly to customers, Sales, Product, and Engineering.

Prioritize:
- Clear judgment.
- Specific evidence.
- Customer dynamics.
- Technical correctness.
- Direct next actions.
- Concise writing.
- No generic sales language.

Avoid:
- Long theoretical frameworks in the final submission.
- “Just checking in” outreach.
- Treating every lead equally.
- Rewriting the customer’s entire system when a small patch fixes the core bug.
- Overclaiming facts not proven by the prompt.
- Using slides-like language when the customer asked for data/code.

## Required submission structure

Use this final answer structure unless explicitly told otherwise:

```markdown
# Forward Deployed Engineer Take-Home

## Part 1 — Monday Morning Pipeline

### Summary priority order

| Rank | Lead | Priority | Why |
|---|---|---|---|

### Lead-by-lead read and next moves

#### 1. Plexus Health
- Read:
- Next moves:

#### 2. Telegraph Studio
- Read:
- Next moves:

#### 3. Veridis Routing
- Read:
- Next moves:

#### 4. Northwell Bioacoustics
- Read:
- Next moves:

#### 5. Aniline Interpretation
- Read:
- Next moves:

### How I would order the day

Concise schedule with reasoning.

### Outreach I would send

Pick one lead. Write the actual email/Slack message.

## Part 2 — DriveLine AI

### What went wrong

Concise diagnosis.

### Patched code

Code block.

### Reply to Marco

Customer-facing reply.

### Internal note to Product / Engineering

Structured internal feedback.
```

## Global decision rules

Use these rules throughout the take-home.

### Rule 1: Production risk beats speculative pipeline

A paying production customer with declining usage is urgent even if another lead is exciting.

### Rule 2: Hard deadlines beat vague urgency

If a customer expects a deliverable before a scheduled call, start the work immediately or create a recovery plan.

### Rule 3: Usage beats words

Actual API usage is stronger evidence than positive discovery calls.

### Rule 4: Silence after usage is a signal

When a technical user ramps usage and then stops, assume something happened: integration failure, product mismatch, internal reprioritization, competitor, or an unreported blocker.

### Rule 5: Hiring signal matters

Speech infrastructure / Voice AI hiring can mean:

* They are scaling usage.
* They are bringing expertise in-house.
* They are evaluating replacements.
* They are dissatisfied with current vendor experience.
  Do not assume one; use it to sharpen outreach.

### Rule 6: FDE time goes where intervention changes the outcome

Do not spend deep debugging time on low-fit, unfunded, no-usage accounts. Use lightweight nurture.

### Rule 7: The final answer must show portfolio judgment

The take-home is not asking for five independent mini-plans. It is testing how to allocate scarce time across a portfolio.

## Part 1 framework

For each lead, classify:

```markdown
State:
- Production at risk
- High-intent self-serve stalled
- Active deal stalled
- Low-signal nurture
- Hot competitive evaluation

Core diagnosis:
- What is probably happening?

FDE leverage:
- Can I materially change the outcome today?

Next 1-2 moves:
- Concrete action, with why.
```

## Priority scoring

Score mentally using these dimensions:

| Dimension          | High score means                                     |
| ------------------ | ---------------------------------------------------- |
| Revenue / upside   | Current spend, pilot volume, strategic expansion     |
| Urgency            | Deadline, usage drop, active evaluation, launch date |
| Technical leverage | FDE can debug, tune, benchmark, or unblock           |
| Customer access    | Known champion, active founder, Slack/email channel  |
| Risk               | Churn, competitor, silence, declining usage          |
| Evidence quality   | Usage data and concrete asks beat vague intent       |

Use the score to rank, but do not show a mechanical scoring table unless useful. The final answer should explain reasoning in prose.

## Expected Part 1 reads

Use these as the default interpretation of the five leads.

### Plexus Health

State: Production customer at churn/replacement risk.

Read:

* $18k/month production account with repeated health alerts and 35% volume decline.
* Champion silence after prior responsiveness is a major risk signal.
* CTO posting a Speech Infrastructure Engineer role suggests either scaling internal ownership, replacing vendor dependency, or debugging unresolved speech infrastructure problems.
* This is not a normal check-in. It needs a hypothesis-driven rescue motion and multi-threading.

Best moves:

1. Inspect account/session health before outreach: error rates, latency, termination patterns, model/config changes, endpoint usage, volume by clinic/location, support tickets, billing anomalies.
2. Multi-thread beyond the silent VP Eng: VP Eng + CTO + any known technical owner. Message should say usage is down, alerts are recurring, and you want to isolate whether this is technical, workflow, or vendor-strategy driven.
3. Internally flag Sales/CS because this is real revenue at risk.

Do not write:

* “Just checking in.”

### Telegraph Studio

State: High-intent self-serve lead that vanished.

Read:

* 80k calls in week two and 14k peak daily calls is not casual docs browsing.
* Zero traffic for 14 days after a spike usually means evaluation ended, integration broke, credits/billing hit, quality/latency disappointed, or they picked another vendor.
* No human relationship exists, so this is a classic FDE activation save.

Best moves:

1. Send fast usage-based outreach to the engineer: “noticed the ramp then drop; common blockers are latency, session close, audio format, or model config.”
2. Inspect logs by date around Apr 19 peak and the last active day: errors, close codes, request mix, model choice, session duration, invalid messages, rate limits.
3. If the engineer is unreachable, attempt light multi-thread through founder/engineering leadership only if the company fit is strong.

### Veridis Routing

State: Stalled active deal / stagnant contracted usage.

Read:

* They are on contract but stuck at ~50 hrs/day and have not engaged with U3 Pro migration.
* Repeated unanswered follow-ups plus new Voice AI hires and a Speech Infrastructure Engineer req suggest they may be building internal expertise, evaluating alternatives, or deprioritizing this vendor.
* The issue is not just technical; it is relationship/control loss.

Best moves:

1. Stop sending normal follow-ups. Send a sharper migration/risk note tied to their use case: call routing, latency, accuracy, U2 vs U3 Pro.
2. Multi-thread to the new voice hires or technical leadership with an offer to benchmark U3 Pro against their routing workload.
3. Internally align with Sales on whether this is expansion, save, or dormant.

### Northwell Bioacoustics

State: Low-signal nurture / likely not worth FDE depth today.

Read:

* Three discovery calls, five rescheduled technical calls, no API key, no test calls, no security review.
* Launch keeps slipping and is now tied to a Series A that is not externally evident.
* Deal size is modest even if it launches.
* This is not a Monday morning priority.

Best moves:

1. Move to nurture with a clear requalification gate: “reach back out when funding closes / technical owner is ready / API testing starts.”
2. Offer async starter materials or a 30-minute integration slot only after they create an API key or provide a concrete launch date.
3. Do not spend deep technical time.

### Aniline Interpretation

State: Hot competitive technical evaluation with a hard deadline.

Read:

* Strong team, fresh seed funding, large pilot, possible 5x expansion, and active competitor bakeoff.
* They asked for “data, not slides” and requested applied AI / multilingual VAD expertise.
* 2GB of de-identified hospital audio is already in the inbox; transcripts are expected before Tuesday 11am.
* This is urgent because there is a concrete deliverable and direct founder engagement.

Best moves:

1. Immediately start the evaluation workflow: ingest audio, generate transcripts, capture latency/WER/code-switching/noise observations, and prepare a compact evidence-based readout.
2. Pull in the applied AI lead / multilingual VAD expert early, not right before the call.
3. Reply to Sara with a data-first plan and what will be ready by Tuesday.
4. Be honest if any metrics cannot be completed rigorously overnight; bring partial data and methodology rather than marketing claims.

## Recommended Part 1 day order

Default rank:

1. Aniline Interpretation
2. Plexus Health
3. Telegraph Studio
4. Veridis Routing
5. Northwell Bioacoustics

Reasoning:

* Aniline has the most time-sensitive concrete deliverable: audio in hand, Tuesday 11am call, active competitor evaluation, high pilot upside.
* Plexus is a real production customer with revenue at risk and repeated health alerts. It cannot be ignored, but the immediate first action can be a targeted rescue note plus internal account inspection.
* Telegraph has high self-serve activation signal and may be recoverable with one timely technical outreach.
* Veridis is meaningful but already cold after multiple unanswered touches; it needs a sharper multi-thread/migration play, not deep Monday morning work.
* Northwell has no usage, weak timing, repeated reschedules, and modest upside. Defer.

45-minute pre-call action plan:

1. Start Aniline transcript/eval processing and pull in applied AI/multilingual VAD help.
2. Send Sara a short confirmation that the team is analyzing the audio and will bring data.
3. Inspect Plexus usage/health and send a hypothesis-driven escalation to VP Eng + CTO.
4. Send Telegraph a short usage-drop note if time remains.
5. Defer Veridis/Northwell to later blocks.

## Outreach selection guidance

For the assignment, the strongest outreach choices are usually:

* Plexus: shows production-save judgment.
* Aniline: shows competitive, data-first enterprise evaluation judgment.
* Telegraph: shows self-serve activation instincts.

Avoid choosing Northwell unless making a point about disciplined disqualification.

## Outreach template: Plexus

```text
Subject: Plexus streaming usage drop — worth debugging this week

Hi [VP Eng] and [CTO] —

Flagging because we’ve now seen the third usage health alert in the last 60 days, and Plexus streaming volume is down ~35% over the last 8 weeks.

That pattern usually means one of three things: a production workflow changed, a technical issue is causing traffic to route differently, or the team is rethinking part of the speech infrastructure path.

I’d like to help isolate which it is before this becomes harder to unwind. If you can point me to the current owner of the scribe integration, I can come prepared with the session-level trend, recent error/latency view, and any config changes that may explain the drop.

Would 20 minutes this week be useful?
```

## Outreach template: Aniline

```text
Subject: Re: Tuesday eval

Sara — understood on “data, not slides.”

We’re going to treat the 2GB sample as an eval, not a demo. For Tuesday I’ll bring:

- transcript outputs on the provided audio
- notes on hospital-noise failure modes
- code-switching observations across English/Spanish/Mandarin
- latency implications for the realtime path
- where we are confident vs where we need a tighter benchmark

I’m also pulling in someone with applied AI / multilingual VAD context so we can go deeper than vendor claims.

One clarification that would make the readout sharper: for the 8-metric doc, do you want us to optimize for your exact p95 latency target first, or accuracy/code-switching first if there is a tradeoff?
```

## Outreach template: Telegraph

```text
Subject: Saw the realtime traffic spike, then stop

Hi [Name] —

I noticed Telegraph ramped streaming usage pretty quickly in April, then traffic dropped to zero over the last two weeks.

When that happens after a real spike, it’s usually one of a few things: session handling, latency, audio format, model config, or an eval that hit a quality bar issue.

If you’re still evaluating realtime AI, send me a failing session ID or the rough architecture and I can help isolate whether this is an integration issue or a model/config fit issue.
```

## Part 2 diagnosis framework

The DriveLine bug is primarily a session lifecycle / billing bug.

Customer symptoms:

* Transcripts are accurate.
* End-of-turn works during orders.
* The issue occurs after the customer is done.
* Sessions take 5+ minutes to close.
* Bill doubled while order volume grew only ~20%.
* Code sets `inactivity_timeout=300`.
* Code catches kiosk `WebSocketDisconnect` but does not explicitly terminate the AssemblyAI session.

Primary diagnosis:

* The kiosk WebSocket closes when the car/order ends.
* The FastAPI handler exits the receive loop.
* The code logs the kiosk disconnect.
* But it never sends a graceful termination to AssemblyAI.
* Because `inactivity_timeout=300`, each AssemblyAI session can remain open for roughly 5 extra minutes after the order ends.
* That extra session duration plausibly explains billing growth outpacing order growth.

Important nuance:

* Do not confidently say `3006` itself means inactivity timeout.
* In current docs, `3006` is associated with invalid message / invalid JSON / invalid message type.
* Ask Marco for raw close reasons/session IDs if needed.
* But the code-level billing/session-duration bug is clear regardless: they rely on inactivity timeout instead of explicit termination.

## Part 2 patch requirements

Patch minimally.

Must include:

1. Explicitly terminate the AAI session in `finally`.
2. Do not rely on `inactivity_timeout` for normal order completion.
3. Keep `inactivity_timeout` only as a safety backstop, preferably shorter than 300 for this use case.
4. Log both audio duration and session duration.
5. Avoid sending audio after termination.
6. Handle non-kiosk exceptions and still close the AAI session.
7. Add comments explaining why termination matters for billing/session duration.

Do not:

* Rewrite the whole service.
* Introduce complex queues unless flagged as future production hardening.
* Pretend this solves every possible `3006` without confirming raw close reason.
* Blame the customer.

## Part 2 patch template

Use a patch like this as the base. Adjust names/comments if needed.

```python
"""
drive_thru_transcriber.py
FastAPI backend that opens an AssemblyAI streaming session per
drive-thru order. Each kiosk opens a WebSocket to /order when
a car pulls up; audio flows in, transcripts go to the POS system.
"""
import logging
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from assemblyai.streaming.v3 import (
    BeginEvent,
    StreamingClient,
    StreamingClientOptions,
    StreamingError,
    StreamingEvents,
    StreamingParameters,
    TerminationEvent,
    TurnEvent,
)

API_KEY = os.environ["AAI_API_KEY"]
app = FastAPI()
logger = logging.getLogger(__name__)

# Normal drive-thru order completion should terminate immediately.
# This is only a safety backstop for cases where the kiosk connection
# stays open but stops sending audio.
AAI_INACTIVITY_TIMEOUT_SECONDS = 15


def send_to_pos_system(transcript: str) -> None:
    # Existing implementation omitted.
    ...


def on_begin(self, event: BeginEvent):
    logger.info(f"Session started: {event.id}")


def on_turn(self, event: TurnEvent):
    if event.end_of_turn and event.transcript:
        logger.info(f"Order utterance: {event.transcript}")
        send_to_pos_system(event.transcript)


def on_terminated(self, event: TerminationEvent):
    logger.info(
        f"Session terminated. "
        f"Audio: {event.audio_duration_seconds}s, "
        f"Session: {event.session_duration_seconds}s"
    )


def on_error(self, error: StreamingError):
    logger.error(f"Streaming error: {error}")


def make_streaming_client() -> StreamingClient:
    client = StreamingClient(StreamingClientOptions(api_key=API_KEY))
    client.on(StreamingEvents.Begin, on_begin)
    client.on(StreamingEvents.Turn, on_turn)
    client.on(StreamingEvents.Termination, on_terminated)
    client.on(StreamingEvents.Error, on_error)
    return client


@app.websocket("/order")
async def transcribe_order(websocket: WebSocket):
    """One WebSocket per car at the drive-thru."""
    await websocket.accept()

    aai_client = make_streaming_client()
    aai_connected = False

    try:
        aai_client.connect(
            StreamingParameters(
                speech_model="u3-rt-pro",
                sample_rate=16000,
                format_turns=True,
                min_turn_silence=800,
                # Backstop only. Do not rely on this for normal order close.
                inactivity_timeout=AAI_INACTIVITY_TIMEOUT_SECONDS,
            )
        )
        aai_connected = True

        while True:
            audio_chunk = await websocket.receive_bytes()

            # Defensive guard: do not forward empty frames as audio.
            # Empty frames can create confusing downstream close/error behavior.
            if not audio_chunk:
                logger.debug("Ignoring empty audio frame from kiosk")
                continue

            aai_client.stream(audio_chunk)

    except WebSocketDisconnect:
        # Customer drove off / kiosk closed its WebSocket. This is the normal
        # end-of-order path, so we should immediately terminate the AAI session
        # instead of waiting for inactivity_timeout.
        logger.info("Drive-thru session ended: kiosk disconnected")

    except Exception:
        # Even on unexpected application errors, close the paid streaming session.
        logger.exception("Unexpected error during drive-thru streaming session")
        raise

    finally:
        if aai_connected:
            try:
                # Sends a graceful Terminate to AssemblyAI so session_duration
                # stops when the order ends. This prevents 5+ minute tail sessions
                # and billing drift when the kiosk has already disconnected.
                aai_client.disconnect(terminate=True)
            except Exception:
                logger.exception("Failed to gracefully terminate AAI streaming session")
```

## Part 2 patch explanation

Explain changes in 3-5 bullets:

* Added a `finally` block that always terminates the AssemblyAI session once the kiosk session ends.
* Stopped relying on `inactivity_timeout=300` as the normal close path.
* Reduced inactivity timeout to a short safety backstop.
* Ignored empty audio frames defensively.
* Preserved existing transcript/end-of-turn behavior because quality was not the reported problem.

## Reply to Marco requirements

Tone:

* Calm.
* Direct.
* Partner-like.
* No defensiveness.
* Explain the bug and business impact.
* Give him the patch and what to measure.
* Acknowledge competitor pressure without sounding threatened.
* Ask for raw close reasons/session IDs only for the remaining `3006` question.

Customer reply should include:

1. “I found the likely issue.”
2. “Your code handles kiosk disconnect but does not terminate the AAI stream.”
3. “With `inactivity_timeout=300`, sessions can stay open ~5 minutes after orders.”
4. “That explains bill growth exceeding order growth.”
5. “Patch attached/below.”
6. “After deploy, watch session_duration vs audio_duration.”
7. “If 3006 remains, send session IDs/raw close reason; current patch addresses the lifecycle bug.”
8. “This should not affect transcription quality.”

## Marco reply template

```text
Marco — I found the likely issue.

Your order audio path is working, but the session lifecycle is leaking time after the kiosk disconnects. In the current handler, when the customer drives off the kiosk WebSocket raises `WebSocketDisconnect`, you log it, and then rely on `inactivity_timeout=300` to close the AssemblyAI session.

That means a normal completed order can leave the paid streaming session open for roughly five extra minutes after useful audio has stopped. If your average order is much shorter than that, it would explain why the AAI bill grew much faster than order volume even though transcript quality and end-of-turn behavior looked fine.

The fix is to explicitly terminate the AAI stream in a `finally` block when the kiosk session ends:

[patch/code]

I’d deploy this behind a small canary and watch two numbers:
1. `session_duration_seconds - audio_duration_seconds`
2. sessions with abnormal close codes after explicit termination

Expected result: session duration should collapse toward actual order/audio duration, and billing should normalize relative to order volume.

One nuance: I don’t want to overclaim the `3006` until I see raw close reasons/session IDs. The lifecycle bug is clear from the code, but if 3006 continues after this patch, send me a few affected session IDs and I’ll trace that separately.

This does not change the model, transcript handling, or end-of-turn settings, so I would not expect accuracy or order-taking behavior to regress.
```

## Internal Product / Engineering note requirements

The internal note must show the FDE feedback loop.

It should not only say “customer forgot to close session.” It should ask why a good lead engineer wrote it this way.

Frame:

* Docs/examples may overemphasize live transcription loop and underemphasize lifecycle cleanup in server-mediated WebSocket patterns.
* `inactivity_timeout` is easy to misread as the right way to end sessions, especially with drive-thru/order-style sessions.
* SDK/API should make session lifecycle harder to misuse.
* Onboarding should include billing guardrails around `audio_duration_seconds` vs `session_duration_seconds`.

Recommendations:

1. Add a “server proxy / one customer session per WebSocket” example.
2. Show `try/finally: disconnect(terminate=True)` prominently.
3. Label `inactivity_timeout` as a backstop, not normal close.
4. Add dashboard/datadog metric: session tail time = session_duration - audio_duration.
5. Alert on high session tail time.
6. Add SDK helper/context manager if feasible.
7. Improve close-code docs / logging examples.

## Internal note template

```markdown
## Internal note — DriveLine session lifecycle issue

### Summary

DriveLine’s transcripts and turn detection were fine, but their server-mediated Streaming integration did not explicitly terminate the AAI session when the kiosk WebSocket disconnected. Because they set `inactivity_timeout=300`, normal completed orders could leave sessions open for ~5 extra minutes, creating billing drift and confusing close-code telemetry.

### Why the customer wrote it this way

This is an understandable integration mistake:
- Their mental model was “kiosk WebSocket closed = order session is over.”
- The code comment shows they believed `inactivity_timeout` was the intended close mechanism.
- Our examples/docs can make the streaming loop obvious but the lifecycle/billing boundary less obvious for server-proxy architectures.
- For order-based workloads, the important metric is not only audio duration; it is tail time after useful audio stops.

### Product/docs recommendations

1. Add a dedicated server-side WebSocket proxy example for one-session-per-order/call patterns.
2. Put `disconnect(terminate=True)` / `Terminate` in a `finally` block in every long-lived Streaming example.
3. Reword `inactivity_timeout` as a safety backstop, not normal shutdown.
4. Add an onboarding checklist item: monitor `session_duration_seconds - audio_duration_seconds`.
5. Add a billing guardrail doc: “if bill grows faster than usage, inspect session tail time.”
6. Consider SDK ergonomics: context manager or helper that guarantees termination on scope exit.
7. Improve close-code troubleshooting examples with raw close reason + session ID logging.

### Impact

This is exactly the kind of issue that can derail a high-value pilot despite good model performance. The product worked during the order, but lifecycle ambiguity created cost anxiety six weeks before launch and gave competitors an opening.
```

## Final quality bar

Before finalizing the take-home response, check:

* Is Part 1 concise enough to read quickly?
* Does every lead have a real diagnosis, not a paraphrase?
* Is the day order defensible?
* Does the chosen outreach avoid generic checking-in?
* Does Part 2 patch the actual lifecycle bug?
* Does the Marco reply explain bill impact in plain English?
* Does the internal note identify a product/docs/onboarding improvement?
* Does the answer show FDE judgment across technical, customer, and commercial dimensions?
* Does it avoid unnecessary volume?
