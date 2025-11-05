/**
 * Hebrew Calendar System - Usage Examples
 *
 * The Hebrew calendar is a lunisolar calendar used predominantly for Jewish religious observances.
 * It determines the dates for Jewish holidays and the appropriate public reading of Torah portions,
 * yahrzeits (dates to commemorate the death of a relative), and daily Psalm readings, among many
 * ceremonial uses.
 *
 * Features:
 * - Lunisolar calendar (based on moon phases and solar year)
 * - 12 months in regular years, 13 months in leap years
 * - Leap years follow a 19-year cycle (Metonic cycle)
 * - Years 3, 6, 8, 11, 14, 17, and 19 of each cycle are leap years
 * - Week starts on Saturday
 * - Era begins at creation (approximately 3761 BCE in Gregorian calendar)
 *
 * @file hebrew-calendar-example.js
 * @requires dayjs
 * @requires dayjs-calendarsystems
 */

const dayjs = require('dayjs');
require('../src/index'); // Load the calendar systems plugin

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Hebrew Calendar System - Comprehensive Usage Examples');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ============================================================================
// Example 1: Get Today's Date in Hebrew Calendar
// ============================================================================
console.log('Example 1: Today\'s Date in Hebrew Calendar');
console.log('─'.repeat(70));

const today = dayjs();
const todayHebrew = today.calendar('hebrew');

console.log(`Gregorian Date: ${today.format('MMMM D, YYYY (dddd)')}`);
console.log(`Hebrew Date: ${todayHebrew.format('MMMM D, YYYY')}`);
console.log(`Hebrew Year: ${todayHebrew.year()}`);
console.log(`Hebrew Month: ${todayHebrew.format('MMMM')} (index: ${todayHebrew.month()})`);
console.log(`Hebrew Day: ${todayHebrew.date()}`);
console.log(`Day of Week: ${todayHebrew.format('dddd')}`);
console.log();

// ============================================================================
// Example 2: Jewish Holidays and Important Dates
// ============================================================================
console.log('Example 2: Jewish Holidays and Important Dates');
console.log('─'.repeat(70));

// Rosh Hashanah (Jewish New Year) - Tishri 1
const roshHashanah2024 = dayjs('2024-09-16');
const roshHashanahHebrew = roshHashanah2024.calendar('hebrew');
console.log(`Rosh Hashanah 5785:`);
console.log(`  Gregorian: ${roshHashanah2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${roshHashanahHebrew.format('MMMM D, YYYY')}`);
console.log();

// Yom Kippur (Day of Atonement) - Tishri 10
const yomKippur2024 = dayjs('2024-09-25');
const yomKippurHebrew = yomKippur2024.calendar('hebrew');
console.log(`Yom Kippur 5785:`);
console.log(`  Gregorian: ${yomKippur2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${yomKippurHebrew.format('MMMM D, YYYY')}`);
console.log();

// Hanukkah (Festival of Lights) - Kislev 25
const hanukkah2024 = dayjs('2024-12-25');
const hanukkahHebrew = hanukkah2024.calendar('hebrew');
console.log(`First Day of Hanukkah 5785:`);
console.log(`  Gregorian: ${hanukkah2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${hanukkahHebrew.format('MMMM D, YYYY')}`);
console.log();

// Purim - Adar 14 (or Adar II 14 in leap years)
const purim2024 = dayjs('2024-03-24');
const purimHebrew = purim2024.calendar('hebrew');
console.log(`Purim 5784:`);
console.log(`  Gregorian: ${purim2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${purimHebrew.format('MMMM D, YYYY')}`);
console.log();

// Passover (Pesach) - Nisan 15
const passover2024 = dayjs('2024-04-23');
const passoverHebrew = passover2024.calendar('hebrew');
console.log(`First Day of Passover 5784:`);
console.log(`  Gregorian: ${passover2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${passoverHebrew.format('MMMM D, YYYY')}`);
console.log();

// Shavuot (Feast of Weeks) - Sivan 6
const shavuot2024 = dayjs('2024-06-12');
const shavuotHebrew = shavuot2024.calendar('hebrew');
console.log(`Shavuot 5784:`);
console.log(`  Gregorian: ${shavuot2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${shavuotHebrew.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 3: Hebrew Month Names
// ============================================================================
console.log('Example 3: Hebrew Month Names');
console.log('─'.repeat(70));

const hebrewMonths = [
  'Nisan', 'Iyar', 'Sivan', 'Tamuz', 'Av', 'Elul',
  'Tishri', 'Heshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar'
];

console.log('Hebrew calendar months (in religious order):');
hebrewMonths.forEach((month, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${month}`);
});
console.log('\nNote: In leap years, there are 13 months (Adar I and Adar II)');
console.log();

// ============================================================================
// Example 4: Leap Year Detection
// ============================================================================
console.log('Example 4: Leap Year Detection');
console.log('─'.repeat(70));

console.log('Hebrew leap years follow a 19-year cycle (Metonic cycle).');
console.log('Years 3, 6, 8, 11, 14, 17, and 19 of each cycle are leap years.\n');

const yearsToCheck = [5783, 5784, 5785, 5786, 5787, 5788];
yearsToCheck.forEach(year => {
  // Create a date in that Hebrew year
  const testDate = dayjs().calendar('hebrew').year(year).month(0).date(1);
  const isLeap = testDate.calendarSystem.isLeapYear(year);
  const positionInCycle = ((year - 1) % 19) + 1;

  console.log(`Year ${year}:`);
  console.log(`  Position in cycle: ${positionInCycle}/19`);
  console.log(`  Is leap year: ${isLeap ? 'Yes (13 months)' : 'No (12 months)'}`);
  console.log();
});

// ============================================================================
// Example 5: Converting Between Calendars
// ============================================================================
console.log('Example 5: Converting Between Calendars');
console.log('─'.repeat(70));

// Gregorian to Hebrew
const gregorianDate = dayjs('2024-01-01');
const hebrewDate = gregorianDate.calendar('hebrew');
console.log('Gregorian → Hebrew:');
console.log(`  ${gregorianDate.format('MMMM D, YYYY')} → ${hebrewDate.format('MMMM D, YYYY')}`);
console.log();

// Hebrew to Gregorian (setting a specific Hebrew date)
const specificHebrew = dayjs().calendar('hebrew').year(5784).month(6).date(1); // Tishri 1, 5784
const backToGregorian = specificHebrew.calendar('gregory');
console.log('Hebrew → Gregorian:');
console.log(`  Tishri 1, 5784 → ${backToGregorian.format('MMMM D, YYYY')}`);
console.log();

// Chain conversions: Gregorian → Hebrew → Persian
const gregorianStart = dayjs('2024-03-21');
const viaHebrew = gregorianStart.calendar('hebrew');
const toPersian = viaHebrew.calendar('persian');
console.log('Gregorian → Hebrew → Persian:');
console.log(`  ${gregorianStart.format('YYYY-MM-DD')} (Gregorian)`);
console.log(`  → ${viaHebrew.format('MMMM D, YYYY')} (Hebrew)`);
console.log(`  → ${toPersian.format('MMMM D, YYYY')} (Persian)`);
console.log();

// ============================================================================
// Example 6: Historical Events in Hebrew Calendar
// ============================================================================
console.log('Example 6: Historical Events in Hebrew Calendar');
console.log('─'.repeat(70));

// Israeli Declaration of Independence - Iyar 5, 5708
const independence = dayjs('1948-05-14');
const independenceHebrew = independence.calendar('hebrew');
console.log('Israeli Declaration of Independence:');
console.log(`  Gregorian: ${independence.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${independenceHebrew.format('MMMM D, YYYY')}`);
console.log();

// Jerusalem Day - Iyar 28
const jerusalemDay2024 = dayjs('2024-06-05');
const jerusalemDayHebrew = jerusalemDay2024.calendar('hebrew');
console.log('Jerusalem Day 5784:');
console.log(`  Gregorian: ${jerusalemDay2024.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${jerusalemDayHebrew.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 7: Calculate Age in Hebrew Calendar
// ============================================================================
console.log('Example 7: Calculate Age in Hebrew Calendar');
console.log('─'.repeat(70));

const birthDate = dayjs('1990-07-15');
const birthDateHebrew = birthDate.calendar('hebrew');
const currentHebrew = dayjs().calendar('hebrew');

const ageInYears = currentHebrew.year() - birthDateHebrew.year();

console.log(`Birth Date:`);
console.log(`  Gregorian: ${birthDate.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${birthDateHebrew.format('MMMM D, YYYY')}`);
console.log();
console.log(`Current Date:`);
console.log(`  Gregorian: ${today.format('MMMM D, YYYY')}`);
console.log(`  Hebrew: ${currentHebrew.format('MMMM D, YYYY')}`);
console.log();
console.log(`Age: Approximately ${ageInYears} Hebrew years`);
console.log();

// ============================================================================
// Example 8: Working with Sabbath (Shabbat)
// ============================================================================
console.log('Example 8: Working with Sabbath (Shabbat)');
console.log('─'.repeat(70));

// Find next Shabbat (Saturday)
const nextShabbat = dayjs().day(6); // 6 = Saturday
if (nextShabbat.isBefore(dayjs())) {
  nextShabbat.add(7, 'day');
}
const nextShabbatHebrew = nextShabbat.calendar('hebrew');

console.log('Next Shabbat:');
console.log(`  Gregorian: ${nextShabbat.format('dddd, MMMM D, YYYY')}`);
console.log(`  Hebrew: ${nextShabbatHebrew.format('MMMM D, YYYY')}`);
console.log();

console.log('Note: Hebrew days begin at sunset, so Shabbat actually begins');
console.log('Friday evening and ends Saturday evening.');
console.log();

// ============================================================================
// Example 9: Torah Reading Portions (Parashat Hashavua)
// ============================================================================
console.log('Example 9: Working with Weekly Torah Portions');
console.log('─'.repeat(70));

// Torah readings follow a weekly cycle starting after Simchat Torah
const sampleSaturdays = [
  dayjs('2024-10-26'), // Bereishit (Genesis 1:1-6:8)
  dayjs('2024-11-02'), // Noach (Genesis 6:9-11:32)
  dayjs('2024-11-09'), // Lech-Lecha (Genesis 12:1-17:27)
];

console.log('Sample Torah reading dates (actual portions may vary):');
sampleSaturdays.forEach((saturday, index) => {
  const hebrewSaturday = saturday.calendar('hebrew');
  console.log(`  ${saturday.format('MMMM D, YYYY')} (${hebrewSaturday.format('MMMM D, YYYY')})`);
});
console.log();

// ============================================================================
// Example 10: Date Arithmetic in Hebrew Calendar
// ============================================================================
console.log('Example 10: Date Arithmetic in Hebrew Calendar');
console.log('─'.repeat(70));

const startHebrew = dayjs().calendar('hebrew');

// Add days
const plus30Days = startHebrew.add(30, 'day');
console.log('Add 30 days:');
console.log(`  Start: ${startHebrew.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus30Days.format('MMMM D, YYYY')}`);
console.log();

// Add months
const plus3Months = startHebrew.add(3, 'month');
console.log('Add 3 months:');
console.log(`  Start: ${startHebrew.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus3Months.format('MMMM D, YYYY')}`);
console.log();

// Add years
const plus1Year = startHebrew.add(1, 'year');
console.log('Add 1 year:');
console.log(`  Start: ${startHebrew.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus1Year.format('MMMM D, YYYY')}`);
console.log();

// Calculate days between two dates
const roshHashanah = dayjs('2024-09-16').calendar('hebrew');
const yomKippur = dayjs('2024-09-25').calendar('hebrew');
const daysBetween = yomKippur.diff(roshHashanah, 'day');
console.log('Days between Rosh Hashanah and Yom Kippur:');
console.log(`  ${daysBetween} days (the "Days of Awe")`);
console.log();

// ============================================================================
// Summary
// ============================================================================
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Summary: Hebrew Calendar Key Features');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('');
console.log('✓ Lunisolar calendar system');
console.log('✓ 12 months in regular years, 13 in leap years');
console.log('✓ Leap years follow 19-year Metonic cycle');
console.log('✓ Used for Jewish religious observances and holidays');
console.log('✓ Days begin at sunset (not midnight)');
console.log('✓ Week starts on Saturday (Shabbat)');
console.log('✓ Era begins at creation (~3761 BCE)');
console.log('✓ Months alternate between 29 and 30 days');
console.log('✓ Year length: 353-355 days (regular) or 383-385 days (leap)');
console.log('');
console.log('For more information:');
console.log('• https://en.wikipedia.org/wiki/Hebrew_calendar');
console.log('• https://www.hebcal.com/');
console.log('');
