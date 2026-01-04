# Hub API

Python FastAPI backend for Lion's Lair Concierge hub.

## Setup

1. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Event Streaming
- `GET /api/events/stream` - SSE stream of all events

### Event Publishing
- `POST /api/events/publish` - Publish a door or presence event

### Simulator Endpoints
- `POST /api/simulator/door/open` - Simulate door opening
- `POST /api/simulator/door/close` - Simulate door closing
- `POST /api/simulator/presence/occupied` - Simulate occupancy detected
- `POST /api/simulator/presence/vacant` - Simulate no occupancy
- `POST /api/simulator/arrival` - Simulate guest arrival

### Health
- `GET /api/health` - Health check

## Event Contract

See `/docs/process/EVENTS.md` for the complete event contract.

## Development

The API runs on `http://localhost:8000` by default.

API docs available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

