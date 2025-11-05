/**
 * Ethiopian Calendar System - Usage Examples
 *
 * The Ethiopian calendar is the principal calendar used in Ethiopia and Eritrea. It is based on
 * the Coptic calendar but with different year numbers. The calendar has 13 months: 12 months of
 * 30 days each, plus a 13th month (Pagumen) of 5 or 6 days.
 *
 * Features:
 * - 13 months (12 × 30 days + Pagumen 5-6 days)
 * - Approximately 7-8 years behind Gregorian calendar
 * - New Year (Enkutatash) on September 11 (or 12 in leap years)
 * - Leap year when (year + 1) % 4 == 0
 * - Solar calendar like Gregorian
 * - Used officially in Ethiopia and Eritrea
 *
 * @file ethiopian-calendar-example.js
 * @requires dayjs
 * @requires dayjs-calendarsystems
 */

const dayjs = require('dayjs');
require('../src/index');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Ethiopian Calendar System - Comprehensive Usage Examples');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ============================================================================
// Example 1: Today's Date in Ethiopian Calendar
// ============================================================================
console.log('Example 1: Today\'s Date in Ethiopian Calendar');
console.log('─'.repeat(70));

const today = dayjs();
const todayEthiopian = today.calendar('ethiopian');

console.log(`Gregorian: ${today.format('MMMM D, YYYY (dddd)')}`);
console.log(`Ethiopian: ${todayEthiopian.format('MMMM D, YYYY')}`);
console.log(`Ethiopian Year: ${todayEthiopian.year()}`);
console.log(`Ethiopian Month: ${todayEthiopian.format('MMMM')}`);
console.log(`Ethiopian Day: ${todayEthiopian.date()}`);
console.log();

// ============================================================================
// Example 2: Ethiopian New Year (Enkutatash)
// ============================================================================
console.log('Example 2: Ethiopian New Year (Enkutatash)');
console.log('─'.repeat(70));

const enkutatash2024 = dayjs('2024-09-11');
const enkutatash2024Ethiopian = enkutatash2024.calendar('ethiopian');

console.log('Enkutatash 2017 (Ethiopian New Year):');
console.log(`  Gregorian: ${enkutatash2024.format('MMMM D, YYYY')}`);
console.log(`  Ethiopian: ${enkutatash2024Ethiopian.format('MMMM D, YYYY')}`);
console.log();

console.log('Cultural Significance:');
console.log('  • Marks the end of rainy season');
console.log('  • Beginning of the harvest season');
console.log('  • Celebrated with singing, dancing, and flowers');
console.log('  • Public holiday in Ethiopia');
console.log('  • Name means "gift of jewels"');
console.log();

// ============================================================================
// Example 3: The 13 Months
// ============================================================================
console.log('Example 3: The 13 Months of Ethiopian Calendar');
console.log('─'.repeat(70));

const ethiopianMonths = [
  { name: 'Meskerem', days: 30, gregorian: 'Sep 11 - Oct 10' },
  { name: 'Tikimt', days: 30, gregorian: 'Oct 11 - Nov 9' },
  { name: 'Hidar', days: 30, gregorian: 'Nov 10 - Dec 9' },
  { name: 'Tahsas', days: 30, gregorian: 'Dec 10 - Jan 8' },
  { name: 'Tir', days: 30, gregorian: 'Jan 9 - Feb 7' },
  { name: 'Yekatit', days: 30, gregorian: 'Feb 8 - Mar 9' },
  { name: 'Megabit', days: 30, gregorian: 'Mar 10 - Apr 8' },
  { name: 'Miazia', days: 30, gregorian: 'Apr 9 - May 8' },
  { name: 'Genbot', days: 30, gregorian: 'May 9 - Jun 7' },
  { name: 'Sene', days: 30, gregorian: 'Jun 8 - Jul 7' },
  { name: 'Hamle', days: 30, gregorian: 'Jul 8 - Aug 6' },
  { name: 'Nehasse', days: 30, gregorian: 'Aug 7 - Sep 5' },
  { name: 'Pagumen', days: '5-6', gregorian: 'Sep 6 - Sep 10/11' },
];

console.log('Ethiopian calendar months:');
ethiopianMonths.forEach((month, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${month.name.padEnd(10)} - ${month.days.toString().padStart(2)} days (${month.gregorian})`);
});
console.log();
console.log('Note: Pagumen has 5 days in regular years, 6 days in leap years');
console.log();

// ============================================================================
// Example 4: Year Offset (7-8 Years Behind)
// ============================================================================
console.log('Example 4: Understanding the Year Offset');
console.log('─'.repeat(70));

const currentYear = dayjs().year();
const currentEthiopianYear = todayEthiopian.year();
const yearDiff = currentYear - currentEthiopianYear;

console.log('Year Conversion:');
console.log(`  Gregorian Year: ${currentYear}`);
console.log(`  Ethiopian Year: ${currentEthiopianYear}`);
console.log(`  Difference: ${yearDiff} years`);
console.log();

console.log('Why the difference?');
console.log('  • Different calculation of Jesus\' birth year');
console.log('  • Ethiopian tradition dates Annunciation to 9 BC');
console.log('  • Gregorian tradition dates it to 1 AD');
console.log('  • Results in 7-8 year offset');
console.log();

// ============================================================================
// Example 5: Leap Year Logic
// ============================================================================
console.log('Example 5: Leap Year Logic');
console.log('─'.repeat(70));

console.log('Ethiopian leap year rule: (year + 1) % 4 == 0');
console.log();

const yearsToCheck = [2014, 2015, 2016, 2017, 2018, 2019];
yearsToCheck.forEach(year => {
  const testDate = dayjs().calendar('ethiopian').year(year).month(0).date(1);
  const isLeap = testDate.calendarSystem.isLeapYear(year);
  const pagumenDays = isLeap ? 6 : 5;

  console.log(`Ethiopian Year ${year}:`);
  console.log(`  Leap year: ${isLeap ? 'Yes' : 'No'}`);
  console.log(`  Pagumen days: ${pagumenDays}`);
  console.log();
});

// ============================================================================
// Example 6: Converting Between Calendars
// ============================================================================
console.log('Example 6: Converting Between Calendars');
console.log('─'.repeat(70));

// Gregorian to Ethiopian
const christmas2024 = dayjs('2024-12-25');
const christmas2024Ethiopian = christmas2024.calendar('ethiopian');
console.log('Western Christmas → Ethiopian Calendar:');
console.log(`  Gregorian: ${christmas2024.format('MMMM D, YYYY')}`);
console.log(`  Ethiopian: ${christmas2024Ethiopian.format('MMMM D, YYYY')}`);
console.log();

// Ethiopian Christmas (Genna) - Tahsas 29
const ethiopianChristmas2024 = dayjs('2025-01-07'); // January 7 in Gregorian
const ethiopianChristmas2024Eth = ethiopianChristmas2024.calendar('ethiopian');
console.log('Ethiopian Christmas (Genna) - Tahsas 29:');
console.log(`  Gregorian: ${ethiopianChristmas2024.format('MMMM D, YYYY')}`);
console.log(`  Ethiopian: ${ethiopianChristmas2024Eth.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 7: Important Ethiopian Holidays
// ============================================================================
console.log('Example 7: Important Ethiopian Holidays');
console.log('─'.repeat(70));

const holidays = [
  { name: 'Enkutatash (New Year)', date: '2024-09-11', ethiopianDate: 'Meskerem 1' },
  { name: 'Meskel (Finding of the True Cross)', date: '2024-09-27', ethiopianDate: 'Meskerem 17' },
  { name: 'Genna (Ethiopian Christmas)', date: '2025-01-07', ethiopianDate: 'Tahsas 29' },
  { name: 'Timkat (Epiphany)', date: '2025-01-19', ethiopianDate: 'Tir 11' },
  { name: 'Fasika (Ethiopian Easter)', date: '2024-05-05', ethiopianDate: 'Varies (lunar)' },
];

console.log('Major Ethiopian Holidays:');
holidays.forEach(holiday => {
  const gregDate = dayjs(holiday.date);
  const ethDate = gregDate.calendar('ethiopian');
  console.log(`\n${holiday.name}:`);
  console.log(`  Gregorian: ${gregDate.format('MMMM D, YYYY')}`);
  console.log(`  Ethiopian: ${ethDate.format('MMMM D, YYYY')} (${holiday.ethiopianDate})`);
});
console.log();

// ============================================================================
// Example 8: Time System (12-hour cycle twice)
// ============================================================================
console.log('Example 8: Ethiopian Time System');
console.log('─'.repeat(70));

console.log('Ethiopia uses a unique time system:');
console.log('  • Day starts at sunrise (around 6 AM Gregorian)');
console.log('  • 1:00 Ethiopian time = 7:00 AM Gregorian');
console.log('  • 6:00 Ethiopian time = 12:00 PM Gregorian (noon)');
console.log('  • 12:00 Ethiopian time = 6:00 PM Gregorian');
console.log('  • Night starts at sunset');
console.log();
console.log('Example conversions:');
console.log('  • 3:00 Ethiopian = 9:00 AM Gregorian');
console.log('  • 9:00 Ethiopian = 3:00 PM Gregorian');
console.log('  • 2:00 Ethiopian night = 8:00 PM Gregorian');
console.log();

// ============================================================================
// Example 9: Date Arithmetic
// ============================================================================
console.log('Example 9: Date Arithmetic in Ethiopian Calendar');
console.log('─'.repeat(70));

const startEthiopian = dayjs().calendar('ethiopian');

// Add 30 days (one month)
const plus30Days = startEthiopian.add(30, 'day');
console.log('Add 30 days (one Ethiopian month):');
console.log(`  Start: ${startEthiopian.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus30Days.format('MMMM D, YYYY')}`);
console.log();

// Add 13 months
const plus13Months = startEthiopian.add(13, 'month');
console.log('Add 13 months (full Ethiopian year):');
console.log(`  Start: ${startEthiopian.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus13Months.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 10: Cultural Context
// ============================================================================
console.log('Example 10: Cultural Context');
console.log('─'.repeat(70));

console.log('Where is the Ethiopian calendar used?');
console.log();

console.log('Ethiopia:');
console.log('  • Official calendar of the country');
console.log('  • Population: ~120 million');
console.log('  • Used in government, media, daily life');
console.log('  • Coexists with Gregorian for international purposes');
console.log();

console.log('Eritrea:');
console.log('  • Also uses Ethiopian calendar');
console.log('  • Population: ~6 million');
console.log('  • Shared cultural and historical heritage');
console.log();

console.log('Ethiopian Orthodox Church:');
console.log('  • One of the oldest Christian churches');
console.log('  • Uses Ethiopian calendar for liturgical purposes');
console.log('  • Different from Western Christian calendar');
console.log();

// ============================================================================
// Summary
// ============================================================================
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Summary: Ethiopian Calendar Key Features');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('');
console.log('✓ 13 months (12 × 30 days + Pagumen 5-6 days)');
console.log('✓ 7-8 years behind Gregorian calendar');
console.log('✓ New Year on September 11 (Meskerem 1)');
console.log('✓ Leap year: (year + 1) % 4 == 0');
console.log('✓ 365 days (regular) or 366 days (leap)');
console.log('✓ Solar calendar (seasons aligned)');
console.log('✓ Official calendar of Ethiopia and Eritrea');
console.log('✓ Unique 12-hour time system starting at sunrise');
console.log('✓ Based on Coptic calendar');
console.log('✓ Used by Ethiopian Orthodox Church');
console.log('');
console.log('For more information:');
console.log('• https://en.wikipedia.org/wiki/Ethiopian_calendar');
console.log('• https://en.wikipedia.org/wiki/Enkutatash');
console.log('');
