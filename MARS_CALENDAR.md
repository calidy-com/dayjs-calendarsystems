# Mars Calendar System (Darian Calendar)

## Overview

The Mars Calendar System implements the **Darian calendar**, a proposed timekeeping system for Mars designed by aerospace engineer Thomas Gangale in 1985. This calendar is based on the Martian sol (solar day) and the Martian vernal equinox year, making it ideal for future human settlers on Mars.

## Key Facts

### Time Units
- **Sol (Martian day)**: 24 hours, 39 minutes, 35.244 seconds (Earth time) = 88,775.244 seconds
- **Conversion factor**: 1 sol = 1.0274912517 Earth days
- **Mars year**: 668.5907 sols = 686.9711 Earth days

### Calendar Structure
- **24 months per year** (alternating Latin/Sanskrit zodiac constellation names)
- **Most months**: 28 sols
- **Short months**: 27 sols (months 6, 12, 18, and 24)
- **Leap years**: 669 sols (month 24 has 28 sols instead of 27)
- **Non-leap years**: 668 sols

### Epoch
- **Date**: December 29, 1873 at 12:09 UTC
- **Mars Year**: 0
- **Significance**: Chosen to align with historical Mars observations

## Month Names

The Darian calendar uses 24 months with names alternating between Latin and Sanskrit names of zodiac constellations:

| # | Latin Name | Sanskrit Name | Sols (Normal) | Sols (Leap*) |
|---|------------|---------------|---------------|--------------|
| 1 | Sagittarius | — | 28 | 28 |
| 2 | — | Dhanus | 28 | 28 |
| 3 | Capricornus | — | 28 | 28 |
| 4 | — | Makara | 28 | 28 |
| 5 | Aquarius | — | 28 | 28 |
| 6 | — | Kumbha | **27** | **27** |
| 7 | Pisces | — | 28 | 28 |
| 8 | — | Mina | 28 | 28 |
| 9 | Aries | — | 28 | 28 |
| 10 | — | Mesha | 28 | 28 |
| 11 | Taurus | — | 28 | 28 |
| 12 | — | Rishabha | **27** | **27** |
| 13 | Gemini | — | 28 | 28 |
| 14 | — | Mithuna | 28 | 28 |
| 15 | Cancer | — | 28 | 28 |
| 16 | — | Karka | 28 | 28 |
| 17 | Leo | — | 28 | 28 |
| 18 | — | Simha | **27** | **27** |
| 19 | Virgo | — | 28 | 28 |
| 20 | — | Kanya | 28 | 28 |
| 21 | Libra | — | 28 | 28 |
| 22 | — | Tula | 28 | 28 |
| 23 | Scorpius | — | 28 | 28 |
| 24 | — | Vrishika | **27** | **28** |

\* In leap years, Vrishika (month 24) has 28 sols instead of 27.

## Leap Year Rules

A Mars year is a leap year if:
- The year is **odd-numbered** (1, 3, 5, 7, ...), OR
- The year is **divisible by 10** (10, 20, 30, ...)
- **EXCEPT** years divisible by 100 (unless also divisible by 500)

### Examples
- Year 1: **Leap** (odd)
- Year 2: Not leap (even, not divisible by 10)
- Year 10: **Leap** (divisible by 10)
- Year 100: Not leap (divisible by 100, not by 500)
- Year 500: **Leap** (divisible by 500)

## Installation & Usage

### Basic Setup

```javascript
import dayjs from 'dayjs';
import calendarSystems from '@calidy/dayjs-calendarsystems';
import MarsCalendarSystem from '@calidy/dayjs-calendarsystems/calendarSystems/MarsCalendarSystem';

// Initialize plugins
dayjs.extend(calendarSystems);

// Register Mars calendar
dayjs.registerCalendarSystem('mars', new MarsCalendarSystem());
```

### Convert Current Date to Mars

```javascript
const now = dayjs();
const marsDate = now.toCalendarSystem('mars');

console.log(`Mars Year: ${marsDate.$y}`);
console.log(`Mars Month: ${marsDate.$M + 1}`); // +1 because 0-indexed
console.log(`Mars Sol: ${marsDate.$D}`);
console.log(`Formatted: ${marsDate.format('YYYY-MM-DD')}`);
```

### Convert Specific Dates

```javascript
// Convert January 1, 2024 to Mars calendar
const earthDate = dayjs('2024-01-01');
const marsDate = earthDate.toCalendarSystem('mars');

console.log(marsDate.format('YYYY-MM-DD')); // e.g., "0119-07-12"
```

### Convert Mars Date to Earth Date

```javascript
// Create a Mars date and convert to Gregorian
const marsDate = dayjs.fromCalendarSystem('mars', 100, 5, 15); // Year 100, Month 6, Sol 15
const earthDate = marsDate.toCalendarSystem('gregory');

console.log(earthDate.format('YYYY-MM-DD'));
```

### Get Month Names

```javascript
const marsCalendar = dayjs.getRegisteredCalendarSystem('mars');
const monthNames = marsCalendar.monthNames();

console.log(monthNames[0]);  // "Sagittarius"
console.log(monthNames[23]); // "Vrishika"
```

### Check Leap Years

```javascript
const marsDate = dayjs('2024-01-01').toCalendarSystem('mars');
const isLeap = marsDate.isLeapYear();

console.log(`Mars year ${marsDate.$y} is ${isLeap ? 'a leap year' : 'not a leap year'}`);
```

### Calculate Sols Between Dates

```javascript
// Calculate sols since Mars Perseverance landing
const landing = dayjs('2021-02-18').toCalendarSystem('mars');
const today = dayjs().toCalendarSystem('mars');

const solsSinceLanding = today.diff(landing, 'day');
console.log(`Sols since landing: ${solsSinceLanding}`);
```

## Real-World Examples

### Mars Mission Dates

```javascript
const missions = [
  { name: 'Viking 1', date: '1976-07-20' },
  { name: 'Curiosity', date: '2012-08-06' },
  { name: 'Perseverance', date: '2021-02-18' },
];

missions.forEach(mission => {
  const marsDate = dayjs(mission.date).toCalendarSystem('mars');
  console.log(`${mission.name} landed on Mars Year ${marsDate.$y}, ` +
              `Month ${marsDate.$M + 1}, Sol ${marsDate.$D}`);
});
```

### Plan a Mars Mission

```javascript
// Plan a mission for 2030
const missionDate = dayjs('2030-06-15').toCalendarSystem('mars');

console.log(`Mission Date (Earth): June 15, 2030`);
console.log(`Mission Date (Mars): Year ${missionDate.$y}, ` +
            `${missionDate.$locale().months[missionDate.$M]} ${missionDate.$D}`);
```

### Calculate Mission Duration

```javascript
const launchDate = dayjs('2026-08-01').toCalendarSystem('mars');
const returnDate = dayjs('2028-10-15').toCalendarSystem('mars');

const missionDurationSols = returnDate.diff(launchDate, 'day');
const missionDurationYears = returnDate.diff(launchDate, 'year');

console.log(`Mission duration: ${missionDurationSols} sols (${missionDurationYears} Mars years)`);
```

## Cross-Calendar Conversions

```javascript
// Convert between different calendar systems via Mars
const gregorianDate = dayjs('2024-03-20');

// Gregorian -> Mars
const marsDate = gregorianDate.toCalendarSystem('mars');

// Mars -> Persian
const persianDate = marsDate.toCalendarSystem('persian');

// Mars -> Hijri
const hijriDate = marsDate.toCalendarSystem('hijri');

console.log('Gregorian:', gregorianDate.format('YYYY-MM-DD'));
console.log('Mars:', marsDate.format('YYYY-MM-DD'));
console.log('Persian:', persianDate.format('YYYY-MM-DD'));
console.log('Hijri:', hijriDate.format('YYYY-MM-DD'));
```

## Technical Details

### Mars Sol Date (MSD)

The Mars Sol Date is a running count of sols since the epoch, similar to Julian Day Numbers for Earth.

**Formula**:
```
MSD = (JD − 2451549.5) / 1.0274912517 + 44796.0 − 0.0009626
```

Where:
- `JD` = Julian Day Number (Terrestrial Time)
- `MSD` = Mars Sol Date

### Darian Calendar Conversion

The implementation uses the MSD as an intermediary:

1. **Gregorian → Mars**: Gregorian → Julian Day → MSD → Darian Calendar
2. **Mars → Gregorian**: Darian Calendar → MSD → Julian Day → Gregorian

### Accuracy

- Round-trip conversions (Gregorian → Mars → Gregorian) are accurate within 1-2 days
- MSD calculations are accurate to within 0.001 sol
- Leap year calculations follow the official Darian calendar specification

## References

- **Gangale, T. (2006)**: "The Architecture of Time, Part 2: The Darian System for Mars"
- **Wikipedia**: [Darian calendar](https://en.wikipedia.org/wiki/Darian_calendar)
- **Wikipedia**: [Timekeeping on Mars](https://en.wikipedia.org/wiki/Timekeeping_on_Mars)
- **NASA GISS**: Mars24 Sunclock Technical Notes
- **Ops-Alaska**: The Darian Calendar for Mars

## Weekdays on Mars

The Darian calendar includes a 7-day week cycle with Latin day names:

- **Sol Solis** - Sunday equivalent
- **Sol Lunae** - Monday equivalent
- **Sol Martis** - Tuesday equivalent (Mars day!)
- **Sol Mercurii** - Wednesday equivalent
- **Sol Jovis** - Thursday equivalent
- **Sol Veneris** - Friday equivalent
- **Sol Saturni** - Saturday equivalent

## Fun Facts

🔴 A person who is 30 years old on Earth would be about **16 Mars years old**!

🌅 A "day" (sol) on Mars is only 2.75% longer than an Earth day, making it easy to adapt to.

📅 The Darian calendar's epoch was chosen to coincide with the birth date of astronomer Carl Otto Lampland, who made significant observations of Mars.

🚀 NASA missions to Mars often use "Sol" numbering, counting from landing day as Sol 0.

⏰ Mars has seasons like Earth, but each season is nearly twice as long because a Mars year is 687 Earth days.

## Contributing

If you have suggestions for improving the Mars calendar implementation or want to add features like:
- Mars time zones (based on longitude)
- Seasonal markers
- Opposition dates
- Solar longitude calculations

Please submit a pull request or open an issue!

## License

See the main project [LICENSE.md](LICENSE.md) file for license information.
