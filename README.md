# Lion's Lair Concierge

A tablet-based, Airbnb-compliant in-unit concierge system that delivers a premium guest welcome and guidance experience.

## Overview

Lion's Lair Concierge is a local-first hybrid system that:
- Detects guest arrival and departure reliably without smart locks or cameras
- Provides a delightful, automated welcome experience
- Operates offline-first with graceful cloud enhancement
- Is extensible toward PMS, AI concierge, and voice features

## Architecture

- **Frontend**: Angular + Nebular kiosk UI (`apps/kiosk-ui`)
- **Backend**: Python local hub API (`apps/hub-api`)
- **Shared**: Common libraries and types (`libs/shared`)
- **Hardware**: Raspberry Pi hub with Zigbee sensors (mocked during development)

## Development Strategy

**Software-first approach**: Build MVP software end-to-end WITHOUT hardware by mocking door/presence events. Deploy to Raspberry Pi after software is complete.

## Repository Structure

```
lions-den-concierge/
├── apps/
│   ├── kiosk-ui/          # Angular + Nebular frontend
│   └── hub-api/           # Python backend
├── libs/
│   └── shared/            # Shared code and types
├── docs/                  # Documentation
│   ├── agents/           # Agent definitions
│   └── process/          # Process docs (EVENTS, ACCEPTANCE, etc.)
└── scripts/             # Build and deployment scripts
```

## Documentation

- **[PRD](./docs/PRD.md)**: Product Requirements Document
- **[Execution Packet](./docs/execution-packet.md)**: Implementation contract and build plan
- **[Agent Definitions](./docs/agents/)**: Multi-agent architecture definitions
- **[Process Docs](./docs/process/)**: Event contracts, acceptance criteria, decisions log

## Getting Started

> **Note**: This is a greenfield project. Implementation begins with Slice 1.

See the [Execution Packet](./docs/execution-packet.md) for detailed milestones and build instructions.

## Non-Negotiables

- ✅ Airbnb compliant: no cameras, no facial recognition, no recording
- ✅ Presence model: VACANT / OCCUPIED / TRANSITION only
- ✅ Offline-first UI
- ✅ Tablet kiosk loads local URL in production

## License

[To be determined]

