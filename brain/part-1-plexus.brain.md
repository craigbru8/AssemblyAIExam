# Brain — Plexus Health (production rescue)

**Source:** implementation-notes.html — `part-1-plexus`  
**Take-home ref:** Lead 1

## What I concluded

Plexus exhibits classic production-at-risk fingerprints: shrinking streaming volume concurrent with escalating automated health signals plus champion radio silence — needs hypothesis-led rescue, not a quarterly catch-up cadence.

## Decisions not in the spec

- Multi-thread CTO concurrently with historically responsive VP Eng to avoid single-thread stall.
- Pre-read internal dashboards before emailing to cite specifics (latency, tails, churn of termination codes).

## Things I changed or assumed

- Interpreted Speech Infrastructure JD as ambiguous intentionally — narrative stays open until data lands.

## Tradeoffs

- Faster email after partial analytics vs slower but airtight note — pragmatic default is fast with acknowledged follow-up datapoints risk.

## Surprises / open questions

- Exact clinic-level regression unknown — outreach invites them to nominate owner + share recent deploy window.

## If the interviewer asks…

- **Churn playbook?** Pair quantitative anomaly explanation with proactive integration seniority on call.
- **If CTO ignores?** Route via clinical operator champion or escalate CS leadership per account governance norms.
