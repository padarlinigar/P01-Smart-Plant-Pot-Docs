# P01-Smart-Plant-Pot-Docs
Documentation, UI/UX wireframes, and test plans for Group 17
---

## 1. System Test Plan (v1.0) & Verification Matrix
**Author:** Nigar Padarli(Student ID: 220218365, Software Engineering)
**Phase:** Week 2 - Requirements & Concept Design

### Scope & Overview
The P01 Smart Plant Pot is an autonomous indoor plant care system combining sensor telemetry, dual-threshold autonomous irrigation logic executed locally on an ESP32 microcontroller, PostgreSQL database storage, and a responsive view-only web dashboard.

### Verification Matrix
- **TC-01 (ADC Pin Conflict):** Capacitive soil moisture sensor wired to ESP32 ADC1 pins (GPIO32–GPIO39). Reads telemetry without Wi-Fi radio conflicts.
- **TC-02 (Percentage Mapping):** Analog readings (0-4095) map accurately to normalized 0% - 100% soil moisture range.
- **TC-03 (Dual-Threshold Activation):** When moisture drops below 30%, pump turns on automatically via relay.
- **TC-04 (Dual-Threshold Cutoff):** When moisture reaches 45%, pump immediately cuts off.
- **TC-05 (Max Run Time Safety):** Pump is forced OFF after 10 seconds timeout to prevent overflow.
- **TC-06 (Cooldown Window):** Pump reactivation is blocked during the waiting cooldown period.
- **TC-07 (Daily Water Cap):** Cumulative daily volume limit strictly locks pump out when exceeded.
- **TC-08 (Empty Reservoir Failsafe):** Float switch opens when tank is dry; pump locked out, alert code sent to server.
- **TC-09 (Wi-Fi Resilience):** Local irrigation continues offline; telemetry buffered in ESP32 memory and transmitted upon reconnect.
- **TC-10 (PostgreSQL Ingestion):** Backend commits telemetry JSON packet into database without errors.
- **TC-11 (View-Only Constraint):** Web interface contains zero manual actuation buttons (no "Water Now" button).
- **TC-12 (Alert Banner):** Tank empty or sensor fault state triggers persistent high-visibility alert banner.

---

## 2. Dashboard Wireframes & Design Specification
**Lead Designer:** Nigar Padarova | **Front-End Developer:** Faris Abu Mahfuz

### Design Specifications
- **View-Only Architecture:** Completely hands-free display without control toggles.
- **Theme Palette:**
  - Primary Dark Green: `#1B4332`
  - Accent Green: `#2D6A4F` / `#52B788`
  - Neutral Background: `#F8F9FA`
  - Alert Crimson: `#D90429` (Exclusive to tank empty / sensor fault states)

### Desktop View Wireframe (>= 1024px)
```text
=========================================================================================================
[ P01 SMART PLANT POT - GROUP 17 ]           Status: [ ONLINE ]            Last Sync: 14:32:05
=========================================================================================================
[! ALERT BANNER: Water Reservoir Empty! Pump locked out. Please refill tank. ] <-- (Only when empty)
---------------------------------------------------------------------------------------------------------
  LIVE SENSOR TELEMETRY CARDS (3-COLUMN GRID)
  +---------------------------------+  +---------------------------------+  +---------------------------+
  |  SOIL MOISTURE                  |  |  AMBIENT TEMPERATURE          |  |  LIGHT & TANK LEVEL       |
  |                                 |  |                                 |  |                           |
  |              38 %               |  |            22.4 C               |  | Light:  850 Lux (Optimal) |
  | Optimal Range: 30% - 45%        |  | Plant Status: Optimal           |  | Tank:   [ NORMAL ]        |
  | Status: [ NORMAL ]              |  | Status: [ NORMAL ]              |  | Status: [ HEALTHY ]       |
  +---------------------------------+  +---------------------------------+  +---------------------------+

---------------------------------------------------------------------------------------------------------
  7-DAY HISTORICAL MOISTURE TREND
  +-----------------------------------------------------------------------------------------------------+
  | 50% |                                      /\                                                       |
  | 45% | - - - - - - - - - - - - - - - - - - /  \ - - - - - - - - - - - - - - - [Upper Threshold: 45%] |
  | 40% |                  /\                /    \                  /\                                 |
  | 35% |                 /  \              /      \                /  \                                |
  | 30% | - - - - - - - -/- - \ - - - - - -/- - - - \ - - - - - - -/- - \ - - - [Lower Threshold: 30%] |
  | 25% |               /      \__________/          \____________/      \                              |
  |     +-----------------------------------------------------------------------------------------------+
  |            Mon            Tue            Wed            Thu            Fri            Sat           |
  |            [WATER]                       [WATER]                       [WATER]                      |
  +-----------------------------------------------------------------------------------------------------+

---------------------------------------------------------------------------------------------------------
  RECENT AUTOMATED IRRIGATION LOG (VIEW-ONLY)
  +---------------------+-----------------------+---------------------+---------------------------------+
  | Timestamp           | Soil Moisture Level   | Pump Duration (s)   | Execution Status                |
  +---------------------+-----------------------+---------------------+---------------------------------+
  | 2026-11-09 08:30:12 | 28% (Below 30% Limit) | 4.5 seconds         | [ COMPLETED SUCCESSFULLY ]      |
  | 2026-11-07 14:15:00 | 29% (Below 30% Limit) | 4.2 seconds         | [ COMPLETED SUCCESSFULLY ]      |
  | 2026-11-05 19:45:22 | 27% (Below 30% Limit) | 5.0 seconds         | [ COMPLETED SUCCESSFULLY ]      |
  +---------------------+-----------------------+---------------------+---------------------------------+
  
  +---------------------------------------+
|  SMART PLANT POT (G17)                |
| Status: [ ONLINE ]   Sync: 14:32      |
+---------------------------------------+
| [! Water Tank Empty! Please Refill]   |
+---------------------------------------+
| +-----------------------------------+ |
| |  SOIL MOISTURE: 38 % (Optimal)    | |
| +-----------------------------------+ |
| +-----------------------------------+ |
| |  AMBIENT TEMPERATURE: 22.4 C      | |
| +-----------------------------------+ |
| +-----------------------------------+ |
| |  LIGHT: 850 Lux | TANK: NORMAL    | |
| +-----------------------------------+ |
| 7-DAY MOISTURE TREND                  |
| +-----------------------------------+ |
| | [ Line Chart: 30% - 45% Range ]   | |
| +-----------------------------------+ |
| WATERING HISTORY LOG                  |
| +-----------------------------------+ |
| | - 09.11 08:30 | 28% Moist | 4.5s  | |
| | - 07.11 14:15 | 29% Moist | 4.2s  | |
| +-----------------------------------+ |
+---------------------------------------+
