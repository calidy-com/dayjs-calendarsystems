/**
 * Comprehensive Example Using All Calendar Systems
 *
 * This demonstrates converting dates between all available calendar systems
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import calendarSystems from '../src/index.js';

// Import all calendar systems
import PersianCalendarSystem from '../src/calendarSystems/PersianCalendarSystem.js';
import HijriCalendarSystem from '../src/calendarSystems/HijriCalendarSystem.js';
import HebrewCalendarSystem from '../src/calendarSystems/HebrewCalendarSystem.js';
import AmazighCalendarSystem from '../src/calendarSystems/AmazighCalendarSystem.js';
import EthiopianCalendarSystem from '../src/calendarSystems/EthiopianCalendarSystem.js';
import MarsCalendarSystem from '../src/calendarSystems/MarsCalendarSystem.js';

// Initialize plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(calendarSystems);

// Register all calendar systems
dayjs.registerCalendarSystem('persian', new PersianCalendarSystem());
dayjs.registerCalendarSystem('hijri', new HijriCalendarSystem());
dayjs.registerCalendarSystem('hebrew', new HebrewCalendarSystem());
dayjs.registerCalendarSystem('amazigh', new AmazighCalendarSystem());
dayjs.registerCalendarSystem('ethiopian', new EthiopianCalendarSystem());
dayjs.registerCalendarSystem('mars', new MarsCalendarSystem());

console.log('🌍 All Calendar Systems Example\n');
console.log('═'.repeat(70));

// Example 1: Today's date in all calendars
console.log('\n📅 Example 1: Today\'s Date in All Calendar Systems');
console.log('─'.repeat(70));

const today = dayjs();
console.log(`Gregorian: ${today.format('YYYY-MM-DD')}`);

const calendars = ['persian', 'hijri', 'hebrew', 'amazigh', 'ethiopian', 'mars'];
const calendarNames = {
  persian: 'Persian (Jalali)',
  hijri: 'Hijri (Islamic)',
  hebrew: 'Hebrew (Jewish)',
  amazigh: 'Amazigh (Berber)',
  ethiopian: 'Ethiopian (Ge\'ez)',
  mars: 'Mars (Darian)'
};

calendars.forEach(calendar => {
  const converted = today.toCalendarSystem(calendar);
  console.log(`${calendarNames[calendar].padEnd(20)}: ${converted.$y}-${(converted.$M + 1).toString().padStart(2, '0')}-${converted.$D.toString().padStart(2, '0')}`);
});

// Example 2: A specific historical date in all calendars
console.log('\n🎊 Example 2: January 1, 2024 in All Calendars');
console.log('─'.repeat(70));

const specificDate = dayjs('2024-01-01');
console.log(`Gregorian: ${specificDate.format('YYYY-MM-DD')}`);

calendars.forEach(calendar => {
  const converted = specificDate.toCalendarSystem(calendar);
  console.log(`${calendarNames[calendar].padEnd(20)}: Year ${converted.$y}, Month ${converted.$M + 1}, Day ${converted.$D}`);
});

// Example 3: New Year dates across calendars
console.log('\n🎉 Example 3: New Year Celebrations');
console.log('─'.repeat(70));

const newYearDates = [
  { calendar: 'Gregorian', date: '2024-01-01', name: 'New Year\'s Day' },
  { calendar: 'Persian', date: '2024-03-20', name: 'Nowruz' },
  { calendar: 'Hijri', date: '2024-07-07', name: 'Islamic New Year 1446' },
  { calendar: 'Hebrew', date: '2024-10-03', name: 'Rosh Hashanah 5785' },
  { calendar: 'Ethiopian', date: '2024-09-11', name: 'Enkutatash' },
  { calendar: 'Amazigh', date: '2024-01-12', name: 'Yennayer' },
];

newYearDates.forEach(({ calendar, date, name }) => {
  console.log(`${calendar.padEnd(12)}: ${date} - ${name}`);
});

// Example 4: Cross-calendar conversion chain
console.log('\n🔄 Example 4: Cross-Calendar Conversion Chain');
console.log('─'.repeat(70));

const startDate = dayjs('2024-03-20'); // Persian New Year
console.log(`Starting with Gregorian: ${startDate.format('YYYY-MM-DD')}`);

let currentDate = startDate;
const conversionChain = ['persian', 'hijri', 'hebrew', 'ethiopian', 'mars', 'gregory'];

conversionChain.forEach((calendar, index) => {
  currentDate = currentDate.toCalendarSystem(calendar);
  console.log(`${index + 1}. Convert to ${calendar.padEnd(10)}: ${currentDate.$y}/${currentDate.$M + 1}/${currentDate.$D}`);
});

// Example 5: Leap year comparison
console.log('\n📆 Example 5: Leap Year Comparison (Year 2024)');
console.log('─'.repeat(70));

const leapYearDate = dayjs('2024-02-29'); // Gregorian leap year
console.log('Is 2024 a leap year in each calendar?');

const calendarSystems_list = {
  gregory: dayjs.getRegisteredCalendarSystem('gregory'),
  persian: dayjs.getRegisteredCalendarSystem('persian'),
  hijri: dayjs.getRegisteredCalendarSystem('hijri'),
  hebrew: dayjs.getRegisteredCalendarSystem('hebrew'),
  ethiopian: dayjs.getRegisteredCalendarSystem('ethiopian'),
  mars: dayjs.getRegisteredCalendarSystem('mars')
};

Object.entries(calendarSystems_list).forEach(([name, system]) => {
  const converted = leapYearDate.toCalendarSystem(name);
  const year = converted.$y;
  const isLeap = system.isLeapYear(year);
  console.log(`${name.padEnd(12)}: Year ${year} is ${isLeap ? 'a LEAP year' : 'NOT a leap year'}`);
});

// Example 6: Month comparison
console.log('\n📊 Example 6: Number of Months in Each Calendar');
console.log('─'.repeat(70));

const monthCounts = {
  'Gregorian': 12,
  'Persian': 12,
  'Hijri': 12,
  'Hebrew': '12 or 13 (leap year)',
  'Amazigh': 12,
  'Ethiopian': 13,
  'Mars': 24
};

Object.entries(monthCounts).forEach(([calendar, count]) => {
  console.log(`${calendar.padEnd(12)}: ${count} months`);
});

// Example 7: Year offset comparison
console.log('\n🔢 Example 7: Year Offsets from Gregorian');
console.log('─'.repeat(70));

const referenceDate = dayjs('2024-01-01');
console.log(`Reference: Gregorian ${referenceDate.format('YYYY')}`);

calendars.forEach(calendar => {
  const converted = referenceDate.toCalendarSystem(calendar);
  const offset = 2024 - converted.$y;
  const direction = offset > 0 ? 'behind' : (offset < 0 ? 'ahead' : 'same');
  console.log(`${calendarNames[calendar].padEnd(20)}: Year ${converted.$y} (${Math.abs(offset)} years ${direction})`);
});

// Example 8: Real-world application - Multi-calendar event planner
console.log('\n📝 Example 8: Multi-Calendar Event Planner');
console.log('─'.repeat(70));

const event = {
  name: 'International Conference',
  gregorianDate: '2024-06-15'
};

console.log(`Event: ${event.name}`);
console.log(`Date: ${event.gregorianDate}\n`);
console.log('Dates in various calendars for attendees:');

const eventDate = dayjs(event.gregorianDate);
calendars.forEach(calendar => {
  const converted = eventDate.toCalendarSystem(calendar);
  console.log(`  ${calendarNames[calendar].padEnd(20)}: ${converted.$y}/${converted.$M + 1}/${converted.$D}`);
});

// Example 9: Duration calculation across calendars
console.log('\n⏱️  Example 9: Duration Calculation');
console.log('─'.repeat(70));

const startEvent = dayjs('2024-01-01');
const endEvent = dayjs('2024-12-31');

console.log(`Start: ${startEvent.format('YYYY-MM-DD')}`);
console.log(`End: ${endEvent.format('YYYY-MM-DD')}`);
console.log(`\nDuration in different units:`);
console.log(`  Days: ${endEvent.diff(startEvent, 'day')}`);
console.log(`  Weeks: ${endEvent.diff(startEvent, 'week')}`);
console.log(`  Months: ${endEvent.diff(startEvent, 'month')}`);

// Example 10: Calendar features summary
console.log('\n📋 Example 10: Calendar System Features Summary');
console.log('─'.repeat(70));

console.log(`
Persian (Jalali):
  • Used in Iran and Afghanistan
  • Solar calendar
  • New Year: Spring equinox (Nowruz)
  • 12 months, leap years every 4-5 years

Hijri (Islamic):
  • Lunar calendar
  • Used in Islamic countries
  • 12 months, 354-355 days per year
  • About 11 days shorter than solar year

Hebrew (Jewish):
  • Lunisolar calendar
  • 12 or 13 months (leap year)
  • 19-year cycle
  • Used for Jewish holidays

Amazigh (Berber):
  • Agricultural calendar
  • Used in North Africa
  • 12 months
  • New Year: Yennayer (January 12)

Ethiopian (Ge'ez):
  • Solar calendar
  • 13 months (12 × 30 days + 5-6 days)
  • About 7-8 years behind Gregorian
  • Used in Ethiopia and Eritrea

Mars (Darian):
  • Martian calendar
  • 24 months per Mars year
  • 668-669 sols per year
  • For future Mars colonies!
`);

console.log('═'.repeat(70));
console.log('🌍 End of All Calendars Example\n');
