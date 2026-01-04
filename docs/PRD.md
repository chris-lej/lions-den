# Lion's Lair Concierge – Product Requirements Document (PRD)

## OVERVIEW
Lion's Lair Concierge is a tablet-based, Airbnb-compliant in-unit concierge system.
It delivers a premium guest welcome and guidance experience using local sensors,
a Raspberry Pi hub, and a kiosk web application, with optional cloud extensions.

## PRIMARY GOALS
- Detect guest arrival and departure reliably without smart locks or cameras
- Provide a delightful, automated welcome experience
- Operate offline-first with graceful cloud enhancement
- Be extensible toward PMS, AI concierge, and voice features

## NON-GOALS (MVP)
- No facial recognition
- No indoor cameras
- No always-listening audio devices
- No PMS or Airbnb API integration
- No AI-generated concierge responses

## ARCHITECTURE SUMMARY
Local-first hybrid system:
- Raspberry Pi hub running Home Assistant and a local web server
- Zigbee sensors for door and occupancy detection
- Tablet locked in kiosk mode to a local web application
- Optional cloud service for content sync and future features

## SENSOR & PRESENCE MODEL
The system uses a state-based presence model rather than strict directional tracking.

### Sensors:
- Door contact sensor on entry door
- Primary occupancy sensor (mmWave preferred) covering living area
- Optional PIR sensor in entry/foyer

### Presence States:
- **VACANT**: No guest detected inside
- **OCCUPIED**: Guest detected inside
- **TRANSITION**: Door open or recent movement

### State Transitions:
- **VACANT → OCCUPIED:**
  Door opens AND occupancy detected within configurable time window
  Trigger: Full welcome experience
- **OCCUPIED → OCCUPIED:**
  Door opens AND occupancy remains
  Trigger: Subtle "Welcome back" or no action
- **OCCUPIED → VACANT:**
  Door closes AND no occupancy detected for configurable duration
  Trigger: Departure logic (checkout reminders if applicable)

This model prioritizes guest experience reliability over perfect directional accuracy.

## MVP FEATURES
1. Arrival Detection (door + occupancy)
2. Tablet Wake and Welcome Screen
3. Manual Guest Name Entry
4. House Manual (rules, how-to, emergency info)
5. Wi-Fi Information
6. Local Area Guide
7. Checkout Instructions
8. Offline-first operation

## USER EXPERIENCE (MVP)
- Guest opens door → tablet wakes
- Welcome screen with optional name entry
- Persistent access to concierge menu
- No repeated greetings during short exits/entries

## TECHNICAL COMPONENTS (MVP)
- Raspberry Pi 3 or newer
- Home Assistant
- Zigbee USB coordinator
- Local web server hosting concierge app
- Android tablet in kiosk mode

## FUTURE ROADMAP
### Stage 2:
- QR token-based guest identification
- Cloud-based content management
- Usage analytics

### Stage 3:
- PMS integration (Airbnb-compatible via approved providers)
- Text-based AI concierge

### Stage 4:
- Voice concierge (guest-initiated, opt-in)
- Optional outdoor doorbell camera (disclosed)

## AIRBNB COMPLIANCE PRINCIPLES
- No indoor cameras
- No audio recording or hot-mic behavior
- Clear disclosure of smart devices
- Guest control over interactions

## SUCCESS METRICS
- Successful arrival detection rate
- Reduction in host-guest support messages
- Guest engagement with concierge features
- Zero Airbnb policy violations

