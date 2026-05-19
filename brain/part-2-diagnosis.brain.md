# Brain: DriveLine diagnosis

**Source:** implementation-notes.html, section `part-2-diagnosis`
**Take-home ref:** Part 2: streaming lifecycle

## What I concluded

Kiosk teardown path omits upstream streaming termination → sessions idle-billed until lengthy inactivity window elapses → session_duration greatly exceeds audio-bearing duration. Bill inflation decouples from qualitative transcript behavior.

## Decisions not in the spec

- Explicitly firewall narrative around `close_code 3006` correlation. Avoid over-attribution pending raw evidence.

## Things I changed or assumed

- Interpreted doubling bill signal as metering skew primary hypothesis. Acknowledges other pricing factors possible but unstoppable without data.

## Tradeoffs

- Deeper PCAP-level forensics omitted for brevity. Invite IDs post-fix.

## Surprises / open questions

- Whether POS side also keeps sockets half-open unknowingly. Future dual-side logging ask.

## If the interviewer asks…

- **Prove billing mechanism?** Contrast aggregates of idle tail duration pre/post terminate patch.
- **Could model changes cause duplicates?** Unlikely given transcript fidelity reported. Focus metering path.
