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
# This is only a safety backstop when the kiosk connection stays open without audio.
AAI_INACTIVITY_TIMEOUT_SECONDS = 15


def send_to_pos_system(transcript: str) -> None:
    """Deliver finalized utterance transcripts to downstream POS/order logic."""
    # Existing implementation omitted in take-home scaffold.
    _ = transcript


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

            # Defensive: empty frames confuse downstream telemetry.
            if not audio_chunk:
                logger.debug("Ignoring empty audio frame from kiosk")
                continue

            aai_client.stream(audio_chunk)

    except WebSocketDisconnect:
        # Normal path: kiosk closed when customer leaves — terminate upstream session now.
        logger.info("Drive-thru session ended: kiosk disconnected")

    except Exception:
        logger.exception("Unexpected error during drive-thru streaming session")
        raise

    finally:
        if aai_connected:
            try:
                # Graceful termination stops paid session_duration from tailing idle minutes.
                aai_client.disconnect(terminate=True)
            except Exception:
                logger.exception("Failed to gracefully terminate AAI streaming session")
