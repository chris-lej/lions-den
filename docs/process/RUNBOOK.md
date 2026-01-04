# Runbook

## Development Setup

### Prerequisites
- Node.js 22+ (for Angular)
- Python 3.9+ (for hub-api)
- npm (comes with Node.js)

### Hub API Setup

1. Navigate to hub-api directory:
```bash
cd apps/hub-api
```

2. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

### Kiosk UI Setup

1. Navigate to kiosk-ui directory:
```bash
cd apps/kiosk-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The app will be available at `http://localhost:4201`

## Testing the Event Stream

### 1. Start Hub API
```bash
cd apps/hub-api
source venv/bin/activate
python main.py
```

### 2. Start Kiosk UI
```bash
cd apps/kiosk-ui
npm start
```

### 3. Test Simulator Endpoints

Using curl or Postman:

```bash
# Simulate guest arrival
curl -X POST http://localhost:8000/api/simulator/arrival

# Simulate door opening
curl -X POST http://localhost:8000/api/simulator/door/open

# Simulate door closing
curl -X POST http://localhost:8000/api/simulator/door/close

# Simulate occupancy detected
curl -X POST http://localhost:8000/api/simulator/presence/occupied

# Simulate no occupancy
curl -X POST http://localhost:8000/api/simulator/presence/vacant
```

### 4. Verify Event Stream

Open the kiosk UI at `http://localhost:4201` and check the browser console. You should see:
- "Connected to event stream"
- Presence state changes when you trigger simulator endpoints

## Production Deployment (Future - Slice 5)

TBD - Will be documented in Slice 5: Packaging for Pi
