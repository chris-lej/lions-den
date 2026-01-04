"""
Event models matching the Event Contract in docs/process/EVENTS.md
"""

from pydantic import BaseModel, Field
from typing import Literal, Optional


class DoorEvent(BaseModel):
    """Door sensor event."""
    type: Literal["door"] = "door"
    sensor_id: str = Field(..., description="Sensor identifier, e.g., 'entry_door'")
    state: Literal["open", "closed"] = Field(..., description="Door state")
    timestamp: str = Field(..., description="ISO 8601 timestamp")


class PresenceEvent(BaseModel):
    """Occupancy sensor event."""
    type: Literal["presence"] = "presence"
    sensor_id: str = Field(..., description="Sensor identifier, e.g., 'living_area_mmwave'")
    state: Literal["occupied", "vacant"] = Field(..., description="Occupancy state")
    timestamp: str = Field(..., description="ISO 8601 timestamp")


class PresenceStateEvent(BaseModel):
    """Computed presence state of the unit."""
    type: Literal["presence_state"] = "presence_state"
    state: Literal["VACANT", "OCCUPIED", "TRANSITION"] = Field(..., description="Presence state")
    timestamp: str = Field(..., description="ISO 8601 timestamp")
    trigger: Optional[dict] = Field(None, description="Triggering events (door/presence)")


# Union type for event publishing
Event = DoorEvent | PresenceEvent

