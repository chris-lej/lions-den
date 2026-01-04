# Kiosk UI

Angular + Nebular frontend for Lion's Lair Concierge tablet interface.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

The app will be available at `http://localhost:4200`

## Development

- **Angular**: 21.x
- **Nebular UI**: Latest
- **Hub API**: Connects to `http://localhost:8000` by default

## Event Stream

The app connects to the hub-api SSE stream at `/api/events/stream` to receive:
- Door events
- Presence events
- Presence state events

See `src/app/services/event-stream.service.ts` for the event stream implementation.

## Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── event-stream.service.ts  # SSE connection to hub-api
│   ├── app.ts                       # Root component
│   ├── app.html                     # Root template
│   └── app.routes.ts                # Routing configuration
└── styles.scss                      # Global styles + Nebular theme
```

## Next Steps (Slice 2+)

- Welcome screen component
- Name entry component
- Concierge menu
- House manual
- Wi-Fi information
- Local area guide
- Checkout instructions
