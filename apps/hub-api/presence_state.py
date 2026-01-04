"""
Presence State Manager

Implements the presence state logic from the PRD:
- VACANT: No guest detected inside
- OCCUPIED: Guest detected inside
- TRANSITION: Door open or recent movement

State transitions:
- VACANT → OCCUPIED: Door opens AND occupancy detected within window
- OCCUPIED → OCCUPIED: Door opens AND occupancy remains
- OCCUPIED → VACANT: Door closes AND no occupancy for duration
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
from models import DoorEvent, PresenceEvent, PresenceStateEvent


class PresenceStateManager:
    """Manages presence state transitions based on door and presence events."""
    
    def __init__(
        self,
        arrival_window_seconds: int = 30,
        vacant_timeout_seconds: int = 300
    ):
        self.arrival_window_seconds = arrival_window_seconds
        self.vacant_timeout_seconds = vacant_timeout_seconds
        
        # Current state
        self.current_state: str = "VACANT"
        
        # Event tracking
        self.last_door_event: Optional[DoorEvent] = None
        self.last_presence_event: Optional[PresenceEvent] = None
        self.last_occupancy_time: Optional[datetime] = None
        
        # Timers
        self.vacant_timer: Optional[datetime] = None
    
    def handle_door_event(self, event: DoorEvent):
        """Process a door event and update state."""
        self.last_door_event = event
        
        if event.state == "open":
            # Door opened - check if we should transition to OCCUPIED
            if self.current_state == "VACANT":
                # Check if occupancy detected recently
                if self.last_occupancy_time:
                    event_time = datetime.fromisoformat(event.timestamp.replace("Z", "+00:00"))
                    time_since_occupancy = (event_time - self.last_occupancy_time).total_seconds()
                    if abs(time_since_occupancy) <= self.arrival_window_seconds:
                        self.current_state = "OCCUPIED"
                        self.vacant_timer = None
            elif self.current_state == "OCCUPIED":
                # Door opened but already occupied - stay OCCUPIED
                self.vacant_timer = None
            else:
                # TRANSITION state
                self.current_state = "TRANSITION"
        
        elif event.state == "closed":
            # Door closed - start vacant timer if no occupancy
            if self.current_state == "OCCUPIED":
                if not self.last_presence_event or self.last_presence_event.state == "vacant":
                    # Start timer for VACANT transition
                    self.vacant_timer = datetime.fromisoformat(
                        event.timestamp.replace("Z", "+00:00")
                    )
            elif self.current_state == "TRANSITION":
                self.current_state = "VACANT"
                self.vacant_timer = None
    
    def handle_presence_event(self, event: PresenceEvent):
        """Process a presence event and update state."""
        self.last_presence_event = event
        
        if event.state == "occupied":
            self.last_occupancy_time = datetime.fromisoformat(
                event.timestamp.replace("Z", "+00:00")
            )
            
            # If door is open or recently opened, transition to OCCUPIED
            if self.last_door_event and self.last_door_event.state == "open":
                if self.current_state == "VACANT" or self.current_state == "TRANSITION":
                    self.current_state = "OCCUPIED"
                    self.vacant_timer = None
            elif self.current_state == "OCCUPIED":
                # Already occupied, stay occupied
                self.vacant_timer = None
        
        elif event.state == "vacant":
            # No occupancy detected
            if self.current_state == "OCCUPIED":
                # Check if door is closed and start vacant timer
                if self.last_door_event and self.last_door_event.state == "closed":
                    if not self.vacant_timer:
                        self.vacant_timer = datetime.fromisoformat(
                            event.timestamp.replace("Z", "+00:00")
                        )
    
    def get_current_state(self) -> Optional[PresenceStateEvent]:
        """Get current presence state as an event."""
        # Check vacant timer
        if self.vacant_timer and self.current_state == "OCCUPIED":
            now = datetime.now(timezone.utc)
            if self.vacant_timer.tzinfo is None:
                # If timer is naive, assume UTC
                elapsed = (now - self.vacant_timer.replace(tzinfo=timezone.utc)).total_seconds()
            else:
                elapsed = (now - self.vacant_timer).total_seconds()
            if elapsed >= self.vacant_timeout_seconds:
                self.current_state = "VACANT"
                self.vacant_timer = None
        
        trigger = {}
        if self.last_door_event:
            trigger["door_event"] = self.last_door_event.model_dump()
        if self.last_presence_event:
            trigger["presence_event"] = self.last_presence_event.model_dump()
        
        return PresenceStateEvent(
            state=self.current_state,
            timestamp=datetime.utcnow().isoformat() + "Z",
            trigger=trigger if trigger else None
        )

