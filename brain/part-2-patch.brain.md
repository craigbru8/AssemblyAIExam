# Brain: DriveLine patch strategy

**Source:** implementation-notes.html, section `part-2-patch`
**Take-home ref:** Part 2: code

## What I concluded

Minimal patch attaches deterministic cleanup (`disconnect(terminate=True)`) guarded by connectivity flag; tightens idle safety margin; sanitizes zero-length frames feeding streaming client.

## Decisions not in the spec

- Keep POS hook as stub referencing integration seam; avoids speculative queue architecture.

## Things I changed or assumed

- SDK method naming `disconnect(terminate=True)` per AssemblyAI Streaming v3 sample semantics. Validate against pinned SDK minor.

## Tradeoffs

- Shorter idle window could close sessions if kiosk flaky pause. Monitors should watch false premature termination rates.

## Surprises / open questions

- If underlying `3006` tied to malformed control frames after abrupt disconnect reordering. Second-phase investigation post patch.

## If the interviewer asks…

- **Why not rewrite async bridge?** Time-to-relief vs risk envelope for pilot nearing launch horizon.
