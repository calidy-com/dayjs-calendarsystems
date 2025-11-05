/**
 * Hijri (Islamic) Calendar System - Usage Examples
 *
 * The Hijri calendar, also known as the Islamic or Lunar Hijri calendar, is a lunar calendar
 * consisting of 12 lunar months in a year of 354 or 355 days. It is used to determine the
 * proper days of Islamic holidays and rituals.
 *
 * Features:
 * - Lunar calendar based on moon phases
 * - 12 months of 29 or 30 days each
 * - Year is approximately 11 days shorter than solar year
 * - Months drift through seasons over a 33-year cycle
 * - Era begins with Hijrah (Prophet Muhammad's migration to Medina in 622 CE)
 * - Uses Umm al-Qura calculation (official Saudi Arabian calendar)
 *
 * @file hijri-calendar-example.js
 * @requires dayjs
 * @requires dayjs-calendarsystems
 */

const dayjs = require('dayjs');
require('../src/index');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Hijri (Islamic) Calendar System - Comprehensive Usage Examples');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ============================================================================
// Example 1: Today's Date in Hijri Calendar
// ============================================================================
console.log('Example 1: Today\'s Date in Hijri Calendar');
console.log('─'.repeat(70));

const today = dayjs();
const todayHijri = today.calendar('hijri');

console.log(`Gregorian: ${today.format('MMMM D, YYYY (dddd)')}`);
console.log(`Hijri: ${todayHijri.format('MMMM D, YYYY')}`);
console.log(`Hijri Year: ${todayHijri.year()} AH`);
console.log(`Hijri Month: ${todayHijri.format('MMMM')}`);
console.log(`Hijri Day: ${todayHijri.date()}`);
console.log();

// ============================================================================
// Example 2: Islamic Holy Months and Holidays
// ============================================================================
console.log('Example 2: Islamic Holy Months and Holidays');
console.log('─'.repeat(70));

// Ramadan (9th month)
console.log('Ramadan (Month of Fasting):');
console.log('  • 9th month of the Islamic calendar');
console.log('  • Month of fasting from dawn to sunset');
console.log('  • One of the Five Pillars of Islam');
console.log();

// Dhul Hijjah (12th month)
console.log('Dhul Hijjah (Month of Hajj):');
console.log('  • 12th and final month of the Islamic calendar');
console.log('  • Month of the Hajj pilgrimage');
console.log('  • Contains Eid al-Adha (Day 10)');
console.log();

// Muharram (1st month)
console.log('Muharram (Sacred Month):');
console.log('  • 1st month of the Islamic calendar');
console.log('  • One of the four sacred months');
console.log('  • Contains Ashura (Day 10)');
console.log();

// ============================================================================
// Example 3: Hijri Month Names
// ============================================================================
console.log('Example 3: Hijri Month Names');
console.log('─'.repeat(70));

const hijriMonths = [
  'Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani',
  'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhul Qi\'dah', 'Dhul Hijjah'
];

console.log('Islamic calendar months:');
hijriMonths.forEach((month, index) => {
  console.log(`  ${(index + 1).toString().padStart(2)}. ${month}`);
});
console.log();

// ============================================================================
// Example 4: Converting Between Calendars
// ============================================================================
console.log('Example 4: Converting Between Calendars');
console.log('─'.repeat(70));

// Gregorian to Hijri
const ramadan2024Start = dayjs('2024-03-11');
const ramadan2024Hijri = ramadan2024Start.calendar('hijri');
console.log('Start of Ramadan 1445:');
console.log(`  Gregorian: ${ramadan2024Start.format('MMMM D, YYYY')}`);
console.log(`  Hijri: ${ramadan2024Hijri.format('MMMM D, YYYY')}`);
console.log();

// Example: Eid al-Fitr
const eidFitr2024 = dayjs('2024-04-10');
const eidFitr2024Hijri = eidFitr2024.calendar('hijri');
console.log('Eid al-Fitr 1445:');
console.log(`  Gregorian: ${eidFitr2024.format('MMMM D, YYYY')}`);
console.log(`  Hijri: ${eidFitr2024Hijri.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 5: Historical Event - The Hijrah
// ============================================================================
console.log('Example 5: Historical Event - The Hijrah');
console.log('─'.repeat(70));

console.log('The Hijrah (Migration to Medina):');
console.log('  • Date: July 16, 622 CE (approximately)');
console.log('  • Marks the beginning of the Islamic calendar');
console.log('  • Prophet Muhammad migrated from Mecca to Medina');
console.log('  • This event is Year 1 in the Hijri calendar');
console.log();

// ============================================================================
// Example 6: Islamic New Year
// ============================================================================
console.log('Example 6: Islamic New Year (Muharram 1)');
console.log('─'.repeat(70));

const islamicNewYear2024 = dayjs('2024-07-07'); // Approximate
const islamicNewYear2024Hijri = islamicNewYear2024.calendar('hijri');
console.log('Islamic New Year 1446:');
console.log(`  Gregorian: ${islamicNewYear2024.format('MMMM D, YYYY')}`);
console.log(`  Hijri: ${islamicNewYear2024Hijri.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 7: Lunar Month Length
// ============================================================================
console.log('Example 7: Understanding Lunar Month Lengths');
console.log('─'.repeat(70));

console.log('Hijri months are based on lunar cycles:');
console.log('  • Each month begins with the sighting of the new moon');
console.log('  • Months are either 29 or 30 days long');
console.log('  • Exact dates may vary by region and moon sighting');
console.log('  • This implementation uses Umm al-Qura calculation');
console.log('  • Year length: 354 or 355 days');
console.log();

// ============================================================================
// Example 8: Date Arithmetic
// ============================================================================
console.log('Example 8: Date Arithmetic in Hijri Calendar');
console.log('─'.repeat(70));

const startHijri = dayjs().calendar('hijri');

// Add 30 days
const plus30 = startHijri.add(30, 'day');
console.log('Add 30 days:');
console.log(`  Start: ${startHijri.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus30.format('MMMM D, YYYY')}`);
console.log();

// Add months
const plus3Months = startHijri.add(3, 'month');
console.log('Add 3 months:');
console.log(`  Start: ${startHijri.format('MMMM D, YYYY')}`);
console.log(`  Result: ${plus3Months.format('MMMM D, YYYY')}`);
console.log();

// ============================================================================
// Example 9: Sacred Months
// ============================================================================
console.log('Example 9: The Four Sacred Months');
console.log('─'.repeat(70));

console.log('The four sacred months in Islam:');
console.log('  1. Muharram (Month 1) - Month of Allah');
console.log('  2. Rajab (Month 7) - Month of respect');
console.log('  3. Dhul Qi\'dah (Month 11) - Month of rest');
console.log('  4. Dhul Hijjah (Month 12) - Month of pilgrimage');
console.log();
console.log('During these months:');
console.log('  • Warfare is traditionally forbidden');
console.log('  • Good deeds are especially rewarded');
console.log('  • Time for increased worship and reflection');
console.log();

// ============================================================================
// Example 10: Comparison with Gregorian Calendar
// ============================================================================
console.log('Example 10: Comparison with Gregorian Calendar');
console.log('─'.repeat(70));

console.log('Key Differences:');
console.log();

console.log('Gregorian Calendar:');
console.log('  • Solar calendar');
console.log('  • 365/366 days per year');
console.log('  • Months fixed to seasons');
console.log('  • Started 1 CE');
console.log();

console.log('Hijri Calendar:');
console.log('  • Lunar calendar');
console.log('  • 354/355 days per year');
console.log('  • Months drift through seasons');
console.log('  • Started 622 CE (1 AH)');
console.log();

console.log('Drift:');
console.log('  • Hijri calendar moves ~11 days earlier each Gregorian year');
console.log('  • Ramadan cycles through all seasons over ~33 years');
console.log('  • 33 Hijri years ≈ 32 Gregorian years');
console.log();

// ============================================================================
// Summary
// ============================================================================
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('  Summary: Hijri Calendar Key Features');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log('');
console.log('✓ Lunar calendar based on moon phases');
console.log('✓ 12 months of 29-30 days (354-355 days/year)');
console.log('✓ Started with Hijrah in 622 CE');
console.log('✓ Used for Islamic religious observances');
console.log('✓ Uses Umm al-Qura calculation (Saudi standard)');
console.log('✓ Months drift ~11 days earlier each year');
console.log('✓ Four sacred months with special significance');
console.log('✓ Ramadan (9th month) is month of fasting');
console.log('✓ Dhul Hijjah (12th month) is month of Hajj');
console.log('');
console.log('For more information:');
console.log('• https://en.wikipedia.org/wiki/Islamic_calendar');
console.log('• https://www.ummulqura.org.sa/');
console.log('');
