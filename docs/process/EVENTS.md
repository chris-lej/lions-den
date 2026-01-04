# Event Contract

> **Status**: Active - Single source of truth for door and presence events
> 
> This file defines the event schema and contract between hub-api and kiosk-ui.

## Event Types

### Door Event
Represents a door sensor state change.

```typescript
interface DoorEvent {
  type: 'door';
  sensor_id: string;        // e.g., "entry_door"
  state: 'open' | 'closed';
  timestamp: string;         // ISO 8601 timestamp
}
```

### Presence Event
Represents occupancy sensor state change.

```typescript
interface PresenceEvent {
  type: 'presence';
  sensor_id: string;         // e.g., "living_area_mmwave"
  state: 'occupied' | 'vacant';
  timestamp: string;         // ISO 8601 timestamp
}
```

### Presence State Event
Represents the computed presence state of the unit (derived from door + presence events).

```typescript
interface PresenceStateEvent {
  type: 'presence_state';
  state: 'VACANT' | 'OCCUPIED' | 'TRANSITION';
  timestamp: string;         // ISO 8601 timestamp
  trigger?: {
    door_event?: DoorEvent;
    presence_event?: PresenceEvent;
  };
}
```

## Event Stream Protocol

### SSE Endpoint
- **Path**: `/api/events/stream`
- **Method**: GET
- **Content-Type**: `text/event-stream`
- **Format**: Server-Sent Events (SSE)

### Event Format
Each event is sent as an SSE message:

```
event: door
data: {"type":"door","sensor_id":"entry_door","state":"open","timestamp":"2024-01-04T18:00:00Z"}

event: presence
data: {"type":"presence","sensor_id":"living_area_mmwave","state":"occupied","timestamp":"2024-01-04T18:00:01Z"}

event: presence_state
data: {"type":"presence_state","state":"OCCUPIED","timestamp":"2024-01-04T18:00:02Z","trigger":{...}}
```

## Event Publishing

### Publish Endpoint
- **Path**: `/api/events/publish`
- **Method**: POST
- **Content-Type**: `application/json`
- **Body**: DoorEvent or PresenceEvent

Used by:
- Hardware integration (future)
- Simulator endpoints (for testing)

## Presence State Logic

The hub-api computes presence state from door and presence events:

1. **VACANT → OCCUPIED**: 
   - Door opens AND presence detected within configurable window (default: 30 seconds)
   - Emits `presence_state` event with state `OCCUPIED`

2. **OCCUPIED → OCCUPIED**:
   - Door opens AND presence remains detected
   - Emits `presence_state` event with state `OCCUPIED` (no welcome trigger)

3. **OCCUPIED → VACANT**:
   - Door closes AND no presence detected for configurable duration (default: 5 minutes)
   - Emits `presence_state` event with state `VACANT`

4. **TRANSITION**:
   - Door is open OR recent movement detected but state is uncertain
   - Temporary state during transitions

## Simulator Endpoints

For testing without hardware:

- **POST** `/api/simulator/door/open` - Simulate door open
- **POST** `/api/simulator/door/close` - Simulate door close
- **POST** `/api/simulator/presence/occupied` - Simulate occupancy detected
- **POST** `/api/simulator/presence/vacant` - Simulate no occupancy
- **POST** `/api/simulator/arrival` - Simulate guest arrival (door open + occupancy)

## Configuration

Default timing values (configurable):
- `arrival_window_seconds`: 30 (door open to occupancy detection window)
- `vacant_timeout_seconds`: 300 (5 minutes of no occupancy before VACANT)
