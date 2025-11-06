<p align="center">
  <a href="https://calidy.com/engineering">
    <img src="https://calidy.com/wp-content/uploads/sites/14/2023/05/dayjs-calendarsystems-plugin-logo.png" alt="Dayjs Calendar Systems" width="448px" style="max-width:100%;"/>
  </a>
</p>

<p align="center">
  <a href="#installation"><b>Install</b></a>
  | <a href="LICENSE.md">License</a>
  | <a href="#usage">Usage</a>
  | <a href="CONTRIBUTING.md">Contributing</a>
</p>

---


Day.js Calendar Systems Plugin extends Day.js library to allow the use of different non-gregorian calendar systems like:

* Persian (a.k.a.: Jalaali, Shamsi, Khorshidi),
* Arabic (a.k.a: Hijri, Islamic, Umalqura, Ghamari),
* Hebrew (a.k.a: Jewish),
* Amazigh (a.k.a: Berber),
* **Mars (Darian Calendar)** - 🔴 For future Mars settlers and space enthusiasts!
* and more to come (PRs are welcome).

With this plugin, Day.js will be available to more than 200 million additional users worldwide (Estimated number of non-gregorian calendar users).

With the `@calidy/dayjs-calendarsystems` plugin, we bring the capacity to run and use all non-gregorian calendar systems to Dayjs.


---


## Features

- Register and use different calendar systems.
- Typescript exports and definitions.
- Compatible with all official Dayjs plugins.
- No need for hacks, use dayjs apis in the standard way.
- Small and light plugin, no overhead.
- Convert between different calendar systems.
- 🌍 🗓️ 📅 Default Gregorian calendar system included.
- 🌍 🗓️ 🇮🇷 Persian Calendar system available.
- 🌍 🗓️ 🇸🇦 Islamic (Hijri, Umalqura) Calendar system. Note: we will use the default "islamic-umalqura" calendar system for "islamic" calendar system.
- 🌍 🗓️ 🇮🇱 Hebrew (Jewish) Calendar system.
- 🌍 🗓️ ⵣ Amazigh (Berber) Calendar system.
- 🔴 🗓️ 🚀 **Mars (Darian)** Calendar system - Perfect for space missions and future Mars colonization!
- 🌍 🗓️ 🇪🇹 Ethiopian Calendar system.
- 🌍 🗓️ 🇨🇳 Chinese Calendar system.
- 🌍 🗓️ 🇮🇳 **[TODO]** Indian Calendar system.
- 🌍 ✅ Fixes translations of month names in Dayjs for non-gregorian and gregorian calendar systems (This is based on my knowledge, please PR to add more fixes).
- **[TODO]** Parse date strings from different calendar systems
- **[TODO]** Add more tests for all Dayjs Plugins

### API
All API operations and Dayjs plugins may be used as instructed by Dayjs with the specific calendar system when this plugin is used, for more information checkout [Dayjs Documentation](https://day.js.org/docs/en/installation/installation)

## Installation

**NPM**
```bash
npm install --save @calidy/dayjs-calendarsystems
```

**YARN**
```bash
yarn add --save @calidy/dayjs-calendarsystems
```


## Usage
```javascript
import dayjs from "dayjs";
import calendarSystems from "@calidy/dayjs-calendarsystems";

// Note: Gregorian Calendar System is included by default,
//       so there is no need to import the `GregoryCalendarSystem` file here.

import PersianCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/PersianCalendarSystem";

// ...
// ALL YOU OTHER dayjs.extend() calls
// ...
// After all other dayjs plugins are initialized, extend dayjs with our calendar systems plugin:
dayjs.extend(calendarSystems);

// Register new calendar system
dayjs.registerCalendarSystem("persian", new PersianCalendarSystem());

// Set default dayjs config (for all following instances) to a specific calendar system:
// dayjs.toCalendarSystem("persian");

// Convert a dayjs instance to a specific calendar system.
let date = dayjs().toCalendarSystem("persian");

// Convert a date from a specific calendar system without initializing a dayjs instance.
date = dayjs.fromCalendarSystem('persian', 1402, 2, 17);

```

## Adding Custom Calendar Systems
This plugin allows you to add your own custom calendar systems. Each calendar system must be an object with the following properties:

* `convertToGregorian(year: number, month: number, day: number): { year: number; month: number; day: number; } | void`: a function that converts a date from the current calendar system to the Gregorian calendar.
* `convertFromGregorian(date: Date | string | number | undefined | null): { year: number; month: number; day: number; } | void`: a function that converts a Gregorian date to the current calendar system.

## License
This project is DUAL LICENSED.

* For non-commercial use, this project uses the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) licence.
* For commercial use (when you or your company earns revenue directly or indirectly using this project), a valid commercial licensed is required.

**Please see the [LICENSE.md](LICENSE.md) file for details.**


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

**Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details.**
**Please see the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for details.**

## Support
If you have any issues or feature requests, please file issues and feature requests on the GitHub repo.

## Acknowledgements
* Day.js, for the amazing date library.
* [Dayjs-Jalali-Plugin](https://github.com/zoomit-org/Dayjs-Jalali-Plugin) and [Jalaliday Plugin](https://github.com/alibaba-aero/jalaliday.git), for inspiring this project's Persian calendar integration.

### Mars Calendar System
The Mars calendar system implements the **Darian calendar**, designed for future human settlers on Mars. It's based on the Martian sol (solar day, 24h 39m 35s) and features 24 months per Mars year.

```javascript
import MarsCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/MarsCalendarSystem";

// Register Mars calendar
dayjs.registerCalendarSystem("mars", new MarsCalendarSystem());

// Convert today's date to Mars
let marsDate = dayjs().toCalendarSystem("mars");
console.log(marsDate.format('YYYY-MM-DD')); // e.g., "0224-15-18"

// Calculate sols since Perseverance landing
const landing = dayjs('2021-02-18').toCalendarSystem('mars');
const solsSinceLanding = marsDate.diff(landing, 'day');
console.log(`Sols since landing: ${solsSinceLanding}`);
```

📖 **[Read the complete Mars Calendar documentation](MARS_CALENDAR.md)**

Key features:
- 🔴 24 months per year (alternating Latin/Sanskrit zodiac names)
- 📅 668 or 669 sols per year (leap years)
- 🚀 Perfect for Mars missions and space exploration
- ⏱️ Accurate conversions between Earth and Mars time
- 📊 Complete leap year calculations

### Ethiopian Calendar System
The Ethiopian calendar system (also called Ge'ez calendar) is the principal calendar used in Ethiopia and Eritrea. It is based on the Coptic calendar with different year numbering.

```javascript
import EthiopianCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/EthiopianCalendarSystem";

// Register Ethiopian calendar
dayjs.registerCalendarSystem("ethiopian", new EthiopianCalendarSystem());

// Convert today's date to Ethiopian
let ethiopianDate = dayjs().toCalendarSystem("ethiopian");
console.log(ethiopianDate.format('YYYY-MM-DD')); // e.g., "2016-03-15"

// Create date from Ethiopian calendar
const enkutatash = dayjs.fromCalendarSystem('ethiopian', 2016, 1, 1); // Ethiopian New Year
console.log(enkutatash.format('MMMM D, YYYY')); // Meskerem 1, 2016
```

Key features:
- 🇪🇹 13 months per year (12 months of 30 days + Pagumen with 5-6 days)
- 📅 365 days (regular) or 366 days (leap years)
- 🗓️ Approximately 7-8 years behind the Gregorian calendar
- 🎊 New Year (Enkutatash) on September 11 (or 12 in leap years)
- ⛪ Used officially in Ethiopia and Eritrea
- 📊 Leap year when (year + 1) % 4 == 0
- 🌞 Solar calendar with seasons aligned

### Chinese Calendar System
The Chinese calendar is a lunisolar calendar that has been in continuous use for over 2000 years. It combines lunar month cycles with solar year calculations and is used throughout East Asia.

```javascript
import ChineseCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/ChineseCalendarSystem";

// Register Chinese calendar
dayjs.registerCalendarSystem("chinese", new ChineseCalendarSystem());

// Convert today's date to Chinese
let chineseDate = dayjs().toCalendarSystem("chinese");
console.log(chineseDate.format('YYYY-MM-DD')); // e.g., "4721-03-15"

// Get zodiac animal for a year
const calendar = new ChineseCalendarSystem();
const zodiac = calendar.getZodiacAnimal(4721);
console.log(zodiac); // "Dragon"

// Get sexagenary cycle information
const cycle = calendar.getSexagenaryCycle(4721);
console.log(cycle.cycleName); // e.g., "Jiǎ-Chén"
```

Key features:
- 🇨🇳 Lunisolar calendar (lunar months + solar year alignment)
- 📅 12 or 13 months per year (leap months ~7 times in 19 years)
- 🌙 29 or 30 days per month (based on lunar cycle)
- 🐉 12 zodiac animals rotating each year
- 🔄 60-year sexagenary cycle (Heavenly Stems + Earthly Branches)
- 🎊 New Year (Spring Festival) between January 21 and February 20
- 🌾 24 solar terms guide agricultural activities
- 🌏 Used by over 1.5 billion people worldwide
- 🎉 Determines traditional Chinese festivals and holidays

