"""
Lion's Lair Concierge - Hub API

Python FastAPI backend that:
- Receives door and presence sensor events (mocked initially)
- Publishes events via SSE stream to kiosk-ui
- Provides simulator endpoints for testing without hardware
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import asyncio
from datetime import datetime
from typing import AsyncGenerator, Union
import json

from models import DoorEvent, PresenceEvent, PresenceStateEvent
from presence_state import PresenceStateManager

app = FastAPI(
    title="Lion's Lair Concierge Hub API",
    description="Local hub API for door and presence event streaming",
    version="0.1.0"
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to tablet IP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global presence state manager
state_manager = PresenceStateManager()

# Event queue for SSE streaming
event_queue: asyncio.Queue = asyncio.Queue()


async def event_generator() -> AsyncGenerator[str, None]:
    """Generate SSE events from the event queue."""
    while True:
        try:
            # Wait for events with timeout to keep connection alive
            event = await asyncio.wait_for(event_queue.get(), timeout=30.0)
            yield f"event: {event['event_type']}\ndata: {json.dumps(event['data'])}\n\n"
        except asyncio.TimeoutError:
            # Send keepalive comment
            yield ": keepalive\n\n"


@app.get("/api/events/stream")
async def stream_events():
    """
    SSE endpoint for streaming door and presence events to kiosk-ui.
    
    Returns Server-Sent Events stream with:
    - door events
    - presence events  
    - presence_state events
    """
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


@app.post("/api/events/publish")
async def publish_event(event: Union[DoorEvent, PresenceEvent]):
    """
    Publish a door or presence event.
    
    Used by:
    - Hardware integration (future)
    - Simulator endpoints
    """
    # Add to event queue for SSE streaming
    await event_queue.put({
        "event_type": event.type,
        "data": event.model_dump()
    })
    
    # Update presence state manager
    if isinstance(event, DoorEvent):
        state_manager.handle_door_event(event)
    elif isinstance(event, PresenceEvent):
        state_manager.handle_presence_event(event)
    
    # Check if presence state changed
    new_state = state_manager.get_current_state()
    if new_state:
        await event_queue.put({
            "event_type": "presence_state",
            "data": new_state.model_dump()
        })
    
    return {"status": "published", "event_type": event.type}


@app.post("/api/simulator/door/open")
async def simulate_door_open():
    """Simulate entry door opening."""
    event = DoorEvent(
        sensor_id="entry_door",
        state="open",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    return await publish_event(event)


@app.post("/api/simulator/door/close")
async def simulate_door_close():
    """Simulate entry door closing."""
    event = DoorEvent(
        sensor_id="entry_door",
        state="closed",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    return await publish_event(event)


@app.post("/api/simulator/presence/occupied")
async def simulate_presence_occupied():
    """Simulate occupancy detected."""
    event = PresenceEvent(
        sensor_id="living_area_mmwave",
        state="occupied",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    return await publish_event(event)


@app.post("/api/simulator/presence/vacant")
async def simulate_presence_vacant():
    """Simulate no occupancy detected."""
    event = PresenceEvent(
        sensor_id="living_area_mmwave",
        state="vacant",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    return await publish_event(event)


@app.post("/api/simulator/arrival")
async def simulate_arrival():
    """Simulate guest arrival (door open + occupancy)."""
    door_event = DoorEvent(
        sensor_id="entry_door",
        state="open",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    await publish_event(door_event)
    
    # Wait a moment, then detect occupancy
    await asyncio.sleep(1)
    presence_event = PresenceEvent(
        sensor_id="living_area_mmwave",
        state="occupied",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    return await publish_event(presence_event)


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    current_state = state_manager.get_current_state()
    return {
        "status": "healthy",
        "service": "hub-api",
        "current_state": current_state if current_state else "UNKNOWN"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

