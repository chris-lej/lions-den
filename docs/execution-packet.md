# Lion's Lair Concierge – Cursor Execution Packet

## Objective
Build MVP software end-to-end WITHOUT hardware by mocking door/presence events.
Architecture: Angular + Nebular kiosk UI + Python local hub (SSE/WebSocket) on a laptop first, then deploy same to Raspberry Pi.

## Non-Negotiables
- Airbnb compliant: no cameras, no facial recognition, no recording.
- Presence model: VACANT / OCCUPIED / TRANSITION only.
- Offline-first UI for manual + Wi-Fi + checkout.
- Tablet kiosk loads local URL in production.

## Monorepo Structure (GitHub)
- `/apps/kiosk-ui`
- `/apps/hub-api`
- `/libs/shared`
- `/docs`
- `/scripts`

## Event Contract
Single source of truth for door and presence events.

## Hub API
SSE stream, publish endpoint, simulator endpoints.

## Kiosk UI
Welcome, Name Entry, Menu, Manual, Wi-Fi, Guide, Checkout, Admin Panel.

## Milestones
- **Slice 1**: Skeleton + Event Plumbing
- **Slice 2**: Presence-driven Welcome
- **Slice 3**: Concierge Content
- **Slice 4**: Admin Simulator Panel
- **Slice 5**: Packaging for Pi

## Acceptance Criteria
- Guest arrival triggers welcome.
- Delivery door open does not.
- Offline works.
- Admin panel hidden.

